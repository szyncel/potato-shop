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

const {
  Category
} = require('../models/category.model');

const {
  Product
} = require('../models/product.model');





/* .............USERS............. */

router.post('/users', (req, res) => {
  var body = _.pick(req.body, ['email', 'password', 'name', 'surname']);
  var user = new User({
    name: body.name,
    surname: body.surname,
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
      title: 'Error',
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

/* .............CATEGORY............. */

router.get('/category', (req, res) => {
  Category.find().then((category) => {
    res.send({
      category
    });
  }, (e) => {
    res.status(400).send(e);
  });
});

/* .............PRODUCTS............. */

router.post('/product', (req, res) => {
  var body = _.pick(req.body, ['title', 'price', 'category', 'imgUrl']);
// console.log(body);
  var product = new Product({
    title:body.title,
    price:body.price,
    category:body.category,
    imgUrl:body.imgUrl
  })

  product.save().then((doc) => {
    res.send(doc);
  }, (e) => {
    res.status(400).send(e);
  });
})


router.get('/product', (req, res) => {
  Product.find().then((product) => {
    res.send({
      product
    });
  }, (e) => {
    res.status(400).send(e);
  });
});

router.get('/product/:id', (req, res) => {
  var id = req.params.id;
  if (!ObjectID.isValid(id)) {
    return res.status(404).send({
      info: "invalidId"
    });
  }

  Product.findById(id).then((product) => {
    if (!product) {
      return res.status(404).send({
        message:"Product not found"
      });
    }
    res.status(200).send({
      product
    });
  }).catch((e) => {
    res.status(400).send({});
  });
});


router.put('/product/:id', (req, res) => {
  var id = req.params.id;
  Product.findByIdAndUpdate(id, {
    $set: req.body
  }, {
    new: true
  }).then((product) => {
    if (!product) {
      return res.status(404).send();
    }
    res.send(product);
  }).catch((e) => {
    res.status(400).send({});
  });
});


module.exports = router;
