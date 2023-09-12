const _ = require("lodash")

module.exports = (req, res, next) => {
  if (_.isUndefined(res.data) && _.isUndefined(res.errors)) {
    next()
  }

  if (res.data) {
    // * Add fields
    if (req.query.fields) {
      req.query["fields"] = `code,message,data(${req.query["fields"]})`
    }

    const { limit, page } = req.common
    const { total } = res
    const maxPage = Math.ceil(total / limit)

    // * Add Headers
    if (total && limit && page) {
      res.setHeader("X-Pager-Total-Item", total)
      res.setHeader("X-Pager-First-Page", (total > 0) ? 1 : 0)
      res.setHeader("X-Pager-Last-Page", maxPage)
      res.setHeader("X-Pager-Limit-Per-Page", limit)
      res.setHeader("X-Pager-Previous-Page", (page > 0) ? page - 1 : 0)
      res.setHeader("X-Pager-Current-Page", page)
      res.setHeader("X-Pager-Next-Page", (page + 1 > maxPage) ? maxPage : page + 1)
    }

    res.code = 200
    res
      .status(200)
      .json({ code: 200, message: "Successfully.", data: res.data, aggregations: res.aggregations })
  }

  if (res.errors) {
    const { code, message, errors } = res.errors
    delete res.errors
    res.code = code
    res.status(200).json({ code, message, errors })
  }
}
