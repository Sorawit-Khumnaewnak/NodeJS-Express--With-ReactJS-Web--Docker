const _ = require("lodash")
const oAuthModule = require("../modules/oauth")

module.exports = {
  signin: async (req, res, next) => {
    try {
      const email = _.get(req, 'body.email')
      const password = _.get(req, 'body.password')
      const client_id = _.get(req, 'body.client_id')
      const client_secret = _.get(req, 'body.client_secret')
      const grant_type = _.get(req, 'body.grant_type')
      if (_.isUndefined(email) && _.isUndefined(password)){
        throw Error ("The email & password not find.")
      }
      if (_.isUndefined(client_id) && _.isUndefined(client_secret)){
        throw Error ("The client_id & client_secret not find.")
      }
      if (grant_type !== "password"){
        throw Error ("The grantType not match.")
      }
      res.data = await oAuthModule.signin(email, password, client_id, client_secret)
      next()
    } catch (e) {
      next(e)
    }
  },

  getProfile: async (req, res, next) => {
    try {
      res.data = _.get(req, 'user')
      next()
    } catch (e) {
      next(e)
    }
  },

  getProfileByID: async (req, res, next) => {
    try {
      const userID = _.get(req, 'params.id')
      res.data = await oAuthModule.findByID(userID)
      next()
    } catch (e) {
      next(e)
    }
  },
}
