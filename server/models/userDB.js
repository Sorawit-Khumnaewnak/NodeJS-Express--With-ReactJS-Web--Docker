const _ = require('lodash');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const moment = require('moment');
const config = require('../config');
const { userSchema } = require('../db/schemas/user');

userSchema.methods.generateAuthToken = async function () {
  const user = this;
  const access = 'auth';
  const expiredAt = moment().add(config.oauth.diff, config.oauth.measurement).format();

  const token = jwt.sign({
    _id: user._id.toHexString(),
    email: user.email,
    access,
    expiredAt
  }, config.oauth.jwt_secret).toString();

  const _tokens = user.tokens.filter((val) => {
    if (val && val.expiredAt && moment(val.expiredAt).diff(moment()) > 0) {
      return true;
    }
    return false;
  });

  user.tokens = _tokens;
  user.tokens.push({
    access,
    token,
    type: 'Bearer',
    expiredAt
  });
  await user.save();
  return token;
};

userSchema.statics.findByToken = async function (token) {
  let decoded = {};
  try {
    decoded = jwt.verify(token, config.oauth.jwt_secret);
  } catch (e) {
    throw new Error('Failed decode JWT token');
  }
  return await User.findOne({
    '_id': decoded._id,
    'email': decoded.email,
    'tokens.token': token,
    'tokens.access': decoded.access,
    'tokens.expiredAt': { $gte: moment() }
  });
};


const User = mongoose.model('account_users', userSchema);

// * You can use pagination
// const options = {
//   page: 1,
//   limit: 10,
// };
// User.paginate({}, options, function (err, result) {
  // result.docs
  // result.totalDocs = 100
  // result.limit = 10
  // result.page = 1
  // result.totalPages = 10
  // result.hasNextPage = true
  // result.nextPage = 2
  // result.hasPrevPage = false
  // result.prevPage = null
  // result.pagingCounter = 1
  // console.log("result : ", result);
// });
module.exports = { User };
