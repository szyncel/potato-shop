var mongoose = require('mongoose');
const validator = require('validator');
var uniqueValidator = require('mongoose-unique-validator');

var productSchema = mongoose.Schema({
  title: {
    type: String,
    required: true,
    minlenth: 3,
    trim: true,
    unique: true,
  },
  price: {
    type: Number,
    required: true
  },
  category: {
    type: String,
    required: true,
    minlenth: 3,
    trim: true
  },
  imgUrl: {
    type: String,
    required: true,
    validate: {
      validator: (val) => {
        return validator.isURL(val);
      },
      message: '{VALUE} is not a valid url!'
    }
  }
});
productSchema.plugin(uniqueValidator);

var Product = mongoose.model('Product', productSchema);

module.exports = {
  Product
}
