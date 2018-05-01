const express = require('express'),
  cors = require('cors');
const router = express.Router();
const _ = require('lodash');
const {
  mongoose
} = require('../db/db');

const {
  ObjectID
} = require('mongodb');

const {
  User
} = require('../models/user.model');

const {
  authenticate
} = require('../middleware/authenticate');

const {
  Category
} = require('../models/category.model');

const {
  Product
} = require('../models/product.model');

const {
  ShoppingCart
} = require('../models/shoppingCart.model');

const {
  Order
} = require('../models/order.model');
const {
  Wishlist
} = require('../models/wishlist.model');

const moment = require('moment');




/* .............USERS............. */

router.post('/users', (req, res) => { //Register
  var body = _.pick(req.body, ['email', 'password', 'name', 'surname']);
  var user = new User({
    name: body.name,
    surname: body.surname,
    email: body.email,
    password: body.password,
    role: 'user'
  });

  user.save().then(() => {
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

router.post('/users/login', (req, res) => { //Login
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

router.delete('/users/me/token', authenticate, (req, res) => { //Logout
  req.user.removeToken(req.token).then(() => {
    res.status(200).send();
  }, () => {
    res.status(400).send();
  });
});


router.get('/users/me', authenticate, (req, res) => {
  var token = req.header('x-auth');
  User.findByToken(token).then((user) => {
    res.status(200).send(user);
  }).catch((e) => {
    res.status(400).send(e);
  });
});

router.put('/users/update', authenticate, (req, res) => {
  var body = _.pick(req.body, ['name', 'surname']);
  var token = req.header('x-auth');
  User.findByTokenAndUpdate(token, body).then((user) => {
    res.status(200).send(user);
  }).catch((e) => {
    res.status(400).send(e);
  });
});


router.put('/users/update-email', authenticate, async (req, res) => {
  var body = _.pick(req.body, ['email', 'password', 'newEmail']);
  try {
    var user = await User.findbyCredentials(body.email, body.password);
    var test = await User.findOneAndUpdate({
      email: body.email
    }, {
      $set: {
        email: body.newEmail
      }
    }, {
      new: true
    });
    res.status(200).send(test);
  } catch (e) {
    res.status(400).send(e);
  }
});

router.put('/users/update-password', authenticate, async (req, res) => {
  var body = _.pick(req.body, ['email', 'password', 'newPass']);
  try {
    var user = await User.findbyCredentials(body.email, body.password);
    var pass = await User.updatePassword({
      email: body.email,
      password: body.newPass
    });

    res.status(200).send({
      info: "Password changed"
    });
  } catch (e) {
    res.status(400).send(e);
  }
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
    title: body.title,
    price: body.price,
    category: body.category,
    imgUrl: body.imgUrl
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
        message: "Product not found"
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


router.delete('/product/:id', (req, res) => {
  var id = req.params.id;

  if (!ObjectID.isValid(id)) {
    return res.status(404).send({
      info: "invalidId"
    });
  }
  //remove todobyid
  Product.findByIdAndRemove(id).then((product) => {
    if (!product) {
      return res.status(404).send();
    }
    res.send(product);
  }).catch((e) => {
    res.status(400).send({});
  })
})

// ...........SHOPPING CART.....................//
router.post('/shopping-carts', (req, res) => { //Create shopping cart
  var shoppingCart = new ShoppingCart({
    dateCreated: req.body.dateCreated
  })
  console.log('testE');
  shoppingCart.save().then((doc) => {
    res.status(200).send(doc);
  }, (e) => {

    res.status(400).send(e);
  });
});

router.get('/shopping-carts/:id', (req, res) => { //get shopping cart?
  var cartId = req.params.id;
  if (!ObjectID.isValid(cartId)) {
    return res.status(404).send({
      info: "invalidId"
    });
  }
  console.log(cartId);
  ShoppingCart.findOne({
    _id: cartId
  }).then((shoppingCart) => {
    console.log(shoppingCart);
    // var id = shoppingCart._id;
    if (!shoppingCart) {
      return res.status(404).send({
        message: "shopping Cart not found"
      });
    }
    res.status(200).send({
      shoppingCart
    });

  }).catch((e) => {
    console.log('test');
    res.status(400).send({
      title: "Info",
      error: e
    });
  });

})

router.patch('/shopping-carts/add', async (req, res) => { //add product to shopping cart
  var shoppingCartId = req.body.id;
  var product = req.body.product;

  // console.log(`Test: `, product._id);

  //check if item exist
  const test = await ShoppingCart.find({
    _id: shoppingCartId,
    "items.product._id": product._id
  })
  if (test.length) {
    ShoppingCart.update({
      _id: shoppingCartId,
      "items.product._id": product._id
    }, {
      $inc: {
        "items.$.count": 1
      }
    }).then((cart) => {
      res.status(200).send({
        info: "added"
      });
    }).catch((e) => {
      res.status(400).send({
        e
      })
    })
  } else {

    ShoppingCart.update({ //should return item
      _id: shoppingCartId
    }, {
      $addToSet: {
        "items": {
          'product': product,
          'count': 1
        }
      }
    }).then((cart) => {
      res.status(200).send({
        info: "updated+1"
      });
    }).catch((e) => {
      res.status(400).send({
        e
      })
    });
  }
});


router.patch('/shopping-carts/delete', async (req, res) => { //Remove product from shopping card
  var cartId = req.body.id;
  var product = req.body.product;

  const test = await ShoppingCart.update({
    _id: cartId,
    // "items.product": product
  }, {
    $pull: {
      'items': {
        product: product
      }
    }
  })
  res.status(200).send({
    test
  });
})


router.patch('/shopping-carts/decrasse', async (req, res) => { //decrement item quantity in shopping card
  var cartId = req.body.id;
  var product = req.body.product;

  const quantity = await ShoppingCart.aggregate([ //działa!!!
    {
      $match: {
        _id: ObjectID(cartId)
      }
    },
    {
      $project: {
        items: {
          $filter: {
            input: '$items',
            as: 'item',
            cond: {
              $eq: ['$$item.product._id', product._id]
            }
          }
        },
        _id: 0
      }
    }
  ]);


  if (quantity[0].items[0].count == 1) {
    const test = await ShoppingCart.update({
      _id: cartId,
      // "items.product": product
    }, {
      $pull: {
        'items': {
          product: product
        }
      }
    })
    res.status(200).send({
      val: test,
      info: "Usunieto"
    });
  } else {
    const decrase = await ShoppingCart.update({
      _id: cartId,
      "items.product._id": product._id
    }, {
      $inc: {
        "items.$.count": -1
      }
    });
    res.status(200).send({
      ststus: "ok"
    });
  }
  ;


});

router.delete('/shopping-carts/:id', async (req, res) => {
  var cartId = req.params.id;
  const test = await ShoppingCart.update({
    _id: cartId,
  }, {
    $set: {
      'items': []
    }
  })
  res.status(200).send({
    val: test,
    info: "Czysto"
  });
})

// Orders

router.get('/admin-orders', (req, res) => { //all orders for admin
  Order.find({}).then((orders) => {
    res.status(200).send(orders);
  }).catch((e) => {
    res.status(400).send(e);
  });
});

router.get('/admin-orders/:id', (req, res) => { //get Single order for admin
  var id = req.params.id;
  Order.findOne({
    _id: id
  }).then((order) => {
    res.send({
      order
    });
  }, (e) => {
    res.status(400).send(e);
  })
})

router.put('/admin-orders/:id', authenticate, async (req, res) => { //change status of order
  const id = req.params.id;
  const body = _.pick(req.body, ['status']);
  try {
    const test = await Order.findOneAndUpdate({
      _id: id
    }, {
      $set: {
        status: body.status
      }
    }, {
      new: true
    });
    res.status(200).send({
      message: "Edycja przebiegła pomyślnie"
    });
  } catch (e) {
    res.status(400).send(e);
  }
})


router.post('/place-order', authenticate, (req, res) => {
  moment.locale('pl');
  var formattedDate = moment().format('DD/MM/YYYY');
  var order = new Order({
    _creator: req.user._id,
    datePlaced: formattedDate,
    status: req.body.status,
    totalOrderPrice: req.body.totalOrderPrice,
    shipping: {
      firstName: req.body.shipping.firstName,
      lastName: req.body.shipping.lastName,
      address: req.body.shipping.address,
      city: req.body.shipping.city,
      country: req.body.shipping.country,
      code: req.body.shipping.code
    },
    items: req.body.items
  });

  order.save().then(() => {
    res.status(200).json({
      message: 'Order saved',
      order
    });
  }).catch((e) => {
    res.status(400).json({
      title: 'Error',
      error: e
    });
  })


});

// My/Orders

router.get('/all-orders', authenticate, (req, res) => {
  Order.find({
    _creator: req.user._id
  }).sort({
    _id: -1
  }).then((orders) => {
    res.send({
      orders
    });
  }, (e) => {
    res.status(400).send(e);
  })
});


router.get('/last-orders', authenticate, async (req, res) => {
  try {
    var query = await Order.find({
      _creator: req.user._id
    }).sort({
      _id: -1
    }).limit(2);
    res.status(200).send(query);
  } catch (e) {
    res.status(400).send(e);
  }
});


router.get('/order/:id', authenticate, (req, res) => {
  var id = req.params.id;
  Order.findOne({
    _creator: req.user._id,
    _id: id
  }).then((orders) => {
    res.send({
      orders
    });
  }, (e) => {
    res.status(400).send(e);
  })
})


// .....................Wishlist..............//
router.post('/wishlist', authenticate, async (req, res) => { //Create wishlist

  console.log(req);
  var wishlist = new Wishlist({
    _creator: req.user._id
  });

  wishlist.save().then((wishlist) => {
    res.send(wishlist);
  }, (e) => {
    res.status(400).send(e);
  });
});


router.get('/wishlist', authenticate, async (req, res) => {

  var test = await Wishlist.find({
    _creator: req.user._id
  });

  Wishlist.find({
    _creator: req.user._id
  }).then((wishlist) => {
    res.status(200).send({
      wishlist
    });
  }).catch((e) => {
    res.status(400).send({});
  });

})


router.post('/wishlist/add', authenticate, async (req, res) => { //Add product to wishlist
  var product = req.body;

  //check if product exist
  const test = await Wishlist.find({
    _creator: req.user._id,
    "items.product._id": product._id
  });

  if (!test.length) {

    Wishlist.update({ //should return item
      _creator: req.user._id
    }, {
      $addToSet: {
        "items": {
          product
        }
      }
    }).then((prod) => {
      res.status(200).send({
        info: "item added"
      });
    }).catch((e) => {
      res.status(400).send({
        e
      })
    });
    //dodajemy
  } else {
    res.status(200).send({
      info: "item already exist"
    });
    //niedodajemy
  }
});

router.post('/wishlist/remove', authenticate, async (req, res) => { //Remove product from wishlist
  var product = req.body;

  const test = await Wishlist.update({
    _creator: req.user._id
  }, {
    $pull: {
      'items': {
        product
      }
    }
  })
  res.status(200).send({
    info: "item removed"
  });
});


module.exports = router;
