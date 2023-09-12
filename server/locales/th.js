const _ = require('lodash')
const config = require('../config')

module.exports = {
  title: _.get(config, 'title.th'),
};