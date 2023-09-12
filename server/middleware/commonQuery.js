const _ = require("lodash")
const i18n = require("i18n")
const config = require("../config")
const configPagination = config.pagination
const args = {
  fields: [],
  page: configPagination.default_page,
  limit: configPagination.default_limit
}

module.exports = (req, res, next) => {
  req.common = {}
  
  // * Language
  req.common.language = req.get("Accept-Language") || _.get(req, 'cookies.Accept-Language')
  if (_.isUndefined(req.common.language)) {
    req.common.language = "th"
  }
  i18n.setLocale(req.common.language)

  // * Set fields
  req.common.fields = args.fields
  if (req.query.fields) {
    req.body.fields = req.query.fields.split(",")
  }

  // * Set pagination
  req.common.page = args.page
  const page = req.query.page || req.body.page
  if (page) {
    req.common.page = Number(page) || args.page
  }
  req.common.limit = args.limit
  const limit = req.query.limit || req.body.limit
  if (limit) {
    req.common.limit = Number(limit) || args.limit
  }
  req.common.start = (req.common.page - 1) * req.common.limit
  next()
}