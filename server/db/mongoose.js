const mongoose = require('mongoose');
const Promise = require('bluebird');
const config = require("../config");
const MONGO_URL = `mongodb://${config.mongodb.username}:${config.mongodb.password}@${config.mongodb.host}:${config.mongodb.port}/${config.mongodb.database}`
mongoose.Promise = Promise;
mongoose.connect(MONGO_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

module.exports = {mongoose};
