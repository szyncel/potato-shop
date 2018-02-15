var mongoose = require('mongoose');
const validator = require('validator');


var orderShema = mongoose.Schema({
  userId: String,
  datePlaced: String,
  shipping: {
    firstName: String,
    lastName: String,
    address: String,
    city: String,
    country: String,
    code: String
  },
  items: [],
  _creator: {
    type: mongoose.Schema.Types.ObjectId,
    required: true
  }
});


var Order = mongoose.model('Order', orderShema);

module.exports = {
  Order
}