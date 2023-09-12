const passport = require("passport")
const BearerStrategy = require("passport-http-bearer").Strategy
const AnonymousStrategy = require("passport-anonymous").Strategy
const { BasicStrategy } = require('passport-http');
const config = require('../config')
const oAuthModule = require('../modules/oauth')

passport.use(new BearerStrategy(
  { passReqToCallback: true }, async function (req, token, done) {
    try {
      const checkToken = await oAuthModule.checkToken(token)
      if (!checkToken) {
        throw Error("The token is invalid or expired.")
      }
      const user = await oAuthModule.findByID(checkToken._id)
      done(null, user)
    } catch (e) {
      e.status = 401
      done(e)
    }
  }
))

passport.use(new BasicStrategy(
  function (username, password, done) {
    try {
      if (username !== config.oauth.client_id || password !== config.oauth.client_secret) {
        throw Error("The 'client_id' or 'client_secret' is not valid.")
      }
      done(null, true);
    } catch (e) {
      e.status = 401
      done(e)
    }
  }
));

passport.use(new AnonymousStrategy())
