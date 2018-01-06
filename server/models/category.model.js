var mongoose = require('mongoose');
const validator = require('validator');

var categorySchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlenth: 3,
    trim: true,
    unique: true,
  }
});


var Category = mongoose.model('Category', categorySchema);

module.exports = {
    Category
}
