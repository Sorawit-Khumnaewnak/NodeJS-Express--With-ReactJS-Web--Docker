const _ = require("lodash")
const { errorLogFormat } = require("../utils/common")

module.exports = (err, req, res, next) => {
  const errMsg = _.get(err, "data.message", err.message)
  const errName = _.get(err, "data.name", "")
  errorLogFormat(err)
  res.status(200).json({
    code: err.status || 500,
    message: (errMsg + errName).replace('\nNoneodoo.exceptions.ValidationError', ''),
    errors: res.errors || []
  })
}
