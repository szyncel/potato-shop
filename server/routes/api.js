var express = require('express');
var router = express.Router();
var _ = require('lodash');
var {
  mongoose
} = require('../db/db');

const {
  ObjectID
} = require('mongodb');

var {
  User
} = require('../models/user.model');

var {
  authenticate
} = require('../middleware/authenticate');


router.get('/', function(req, res, next) {
  res.send('Express REST API');
});


/* .............USERS............. */

router.post('/users', (req, res) => {
  var body = _.pick(req.body, ['email', 'password']);
  var user = new User({
    email: body.email,
    password: body.password,
    role: 'user'
  });

  user.save().then(() => {
    //return user.generateAuthToken();
    res.status(200).json({
      message: 'User created',
      user
    });
  }).catch((e) => {
    res.status(400).json({
      title: 'Error fucking',
      error: e
    });
  })
})

router.post('/users/login', (req, res) => {
  var body = _.pick(req.body, ['email', 'password']);

  User.findbyCredentials(body.email, body.password).then((user) => {
    return user.generateAuthToken().then((token) => {
      res.header('x-auth', token).send({
        message: 'Successfully logged in',
        token: token,
        userId: user._id
      });
    })
  }).catch((e) => {
    res.status(400).send(e);
  });

})

router.delete('/users/me/token', authenticate, (req, res) => {
  req.user.removeToken(req.token).then(() => {
    res.status(200).send();
  }, () => {
    res.status(400).send();
  });
});

module.exports = router;

