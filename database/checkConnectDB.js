const mongoose = require('mongoose');
const Promise = require('bluebird');
mongoose.Promise = Promise;
mongoose.connect('mongodb://admin:1q2w3e4r5t@mongodb:27200/demo_app_db', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const connection = mongoose.connection;
connection.once('open', () => {
  console.log("mongoDB database connection established successfully");
})
console.log("TEST");
