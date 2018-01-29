var mongoose = require('mongoose');
const validator = require('validator');

var shoppingCartSchema = mongoose.Schema({
  dateCreated: String,
  items: []
});


shoppingCartSchema.methods.updateShoppingCart = function (product) {
  var shoppingCart = this;

  return shoppingCart.update({
    $pull: {
      items: {
        product
      }
    }
  })
}

shoppingCartSchema.statics.findByCartId = function (cartId) {
  var ShoppingCart = this;

  return ShoppingCart.findOne({
    _id: cartId
  });
}

var ShoppingCart = mongoose.model('ShoppingCart', shoppingCartSchema);

module.exports = {
  ShoppingCart
}
