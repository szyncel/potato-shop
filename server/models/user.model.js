var mongoose = require('mongoose');
const validator = require('validator');
const jwt = require('jsonwebtoken');
var bcrypt = require('bcryptjs');
const _ = require('lodash');
// var uniqueValidator = require('mongoose-unique-validator');

var userSchema = mongoose.Schema({
  email: {
    type: String,
    required: true,
    minlenth: 1,
    trim: true,
    unique: true,
    validate: {
      validator: (val) => {
        return validator.isEmail(val);
      },
      message: '{VALUE} is not a valid email!'
    }
  },
  password: {
    type: String,
    required: true,
    minlenth: 6
  },
  role:{
    type: String,
    required: true
  }
  // tokens: [{
  //   access: {
  //     type: String,
  //     required: true
  //   },
  //   token: {
  //     type: String,
  //     required: true
  //   }
  // }]
})


userSchema.methods.toJSON = function () {
  var user = this;
  var userObject = user.toObject();

  return _.pick(userObject, ['_id', 'email']);
}


userSchema.methods.generateAuthToken = function () {
  var user = this;
  var access = 'auth';
  var token = jwt.sign({
    _id: user._id.toHexString(),
    name: user.email,
    access: 'auth',
    role:user.role
  }, 'abc123');

  // user.tokens.push({
  //   access,
  //   token
  // });
  return user.save().then(() => {
    return token;
  });
}

userSchema.methods.removeToken = function (token) {
  var user = this;

  return user.update({
    $pull: {
      tokens: {
        token: token
      }
    }
  })
}


userSchema.statics.findByToken = function (token) {
  var User = this;
  var decoded;

  try {
    decoded = jwt.verify(token, 'abc123');
  } catch (e) {
    return Promise.reject();
  }

  return User.findOne({
    _id: decoded._id,
    // 'tokens.access': 'auth'
  });
}

userSchema.statics.findbyCredentials = function (email, password) {
  var User = this;

  return User.findOne({
    email
  }).then((user) => {
    if (!user) {
      return Promise.reject({
        error: 'User could not be found'
      });
    }

    return new Promise((resolve, reject) => {
      bcrypt.compare(password, user.password, function (err, res) {
        if (res) {
          resolve(user);
        } else {
          reject({
            error: 'Wrong password'
          });
        }
      });
    });
  });
}



userSchema.pre('save', function (next) {
  var user = this;
  if (user.isModified('password')) {
    bcrypt.genSalt(10, function (err, salt) {
      bcrypt.hash(user.password, salt, function (err, hash) {
        user.password = hash;
        next();
      });
    });
  } else {
    next();
  }
});


var User = mongoose.model('User', userSchema);

module.exports = {
  User
}
