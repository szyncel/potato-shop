var mongoose = require('mongoose');
const validator = require('validator');


var wishlistShema = mongoose.Schema({
  items: [],
  _creator: {
    type: mongoose.Schema.Types.ObjectId,
    required: true
  }
});


var Wishlist = mongoose.model('Wishlist', wishlistShema);

module.exports = {
    Wishlist
}
