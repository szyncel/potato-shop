var mongoose = require('mongoose');
// mongoose.connect(process.env.MONGODB_URI);
// mongoose.Promise = global.Promise;
mongoose.Promise = global.Promise;
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('connection successful'))
  .catch((err) => console.error(err));
module.exports = {
  mongoose
};


