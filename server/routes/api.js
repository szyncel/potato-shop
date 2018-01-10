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

const {
  ShoppingCart
} = require('../models/shoppingCart.model');





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
router.post('/shopping-carts', (req, res) => {
  var shoppingCart = new ShoppingCart({
    dateCreated: req.body.dateCreated
  })

  shoppingCart.save().then((doc) => {
    res.send(doc);
  }, (e) => {
    res.status(400).send(e);
  });
});

router.get('/shopping-carts/:id', (req, res) => {
  var cartId = req.params.id;
  if (!ObjectID.isValid(cartId)) {
    return res.status(404).send({
      info: "invalidId"
    });
  }

  ShoppingCart.findById(cartId).then((shoppingCart) => {
    var id = shoppingCart._id;
    if (!shoppingCart) {
      return res.status(404).send({
        message: "shopping Cart not found"
      });
    }
    res.status(200).send({
      id
    });
  }).catch((e) => {
    res.status(400).send({});
  });

})

router.patch('/shopping-carts/add', async(req, res) => { //add to shopping cart
  var shoppingCartId = req.body.id;
  var product = req.body.product;

  //check if item exist
  const test = await ShoppingCart.find({
    _id: shoppingCartId,
    "items.product": product
  })
  if (test.length) {
    ShoppingCart.update({
      _id: shoppingCartId,
      "items.product": product
    }, {
      $inc: {
        "items.$.price": 1
      }
    }).then((cart) => {
      res.status(200).send({
        cart
      });
    }).catch((e) => {
      res.status(400).send({
        e
      })
    })
  } else {

    ShoppingCart.update({
      _id: shoppingCartId
    }, {
      $addToSet: {
        "items": {
          'product': product,
          'price': 1
        }
      }
    }).then((cart) => {
      res.status(200).send({
        cart
      });
    }).catch((e) => {
      res.status(400).send({
        e
      })
    });
  }
})

//Remove product from shopping card
router.patch('/shopping-carts/delete', async(req, res) => {
  var cartId = req.body.id;
  var product = req.body.product;

  const test = await ShoppingCart.update({
    _id: cartId,
    // "items.product": product
  }, { $pull: { 'items': { product: product } } })
  res.status(200).send({
    test
  });
})

//decrement item quantity in shopping card
router.patch('/shopping-carts/decrasse', async (req,res) => {
  var cartId = req.body.id;
  var product = req.body.product;

  // 1.check quantity if(1 then delete) else decrase

  //check if price:1
  const test= await ShoppingCart.find({
    $and:[{_id: cartId},{items: {product:product,price:1}}]
  })
// var result= test.items;
  //decrase
// const test= await ShoppingCart.update({
//   _id: cartId,
//   "items.product": product
// },{
//   $inc: {
//     "items.$.price": -1
//   }
// })


if(test.length){
  res.status(200).send({info:"Trzeba usunąć"});
//delete
}else{
const decrase= await ShoppingCart.update({
  _id: cartId,
  "items.product": product
},{
  $inc: {
    "items.$.price": -1
  }
})
res.status(200).send({decrase});
}
console.log(test.length);

});


module.exports = router;
