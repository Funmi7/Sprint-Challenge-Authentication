const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const router = require('express').Router();
const Users = require('../users/users-model');

router.post('/register', (req, res) => {
  // implement registration
  let user = req.body;
  const hash = bcrypt.hashSync(user.password, 10)
  user.password = hash

  Users.add(user)
  .then(addedUser => {
    res.status(201).json(addedUser)
  })
  .catch(error => {
    res.status(500).json(error.message)
  });
});

router.post('/login', (req, res) => {
  // implement login
  let {username, password} = req.body;
  Users.findBy({ username })
  .first()
  .then(user => {
    if(user && bcrypt.compareSync(password, user.password)) {
      const token = generateToken(user);
      res.status(200).json({
        message: `Welcome ${user.username}`,
        token: token 
      })
    } else {
      res.status(401).json({
        message: 'Invalid credentials'
      })
      .catch(error => {
        res.status(500).json(error.message)
      })
    }
  })
});

function generateToken(user) {
  const payload = {
    subject: user.id,
    username: user.username
  }

  const options = {
    expiresIn: '1d'
  }

  const result = jwt.sign(
    payload,
    'THE SECRET',
    options
  )
  return result
}

module.exports = router;
