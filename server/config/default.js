require('dotenv').config()
const colorize = require('json-colorizer');
console.log('All config: ', colorize(process.env))
const devMode = process.env.NODE_ENV === 'development'
module.exports = {
  "title": {
    "en": process.env.TITLE_EN,
    "th": process.env.TITLE_TH,
  },
  "prefix_route": process.env.PREFIX_API_ROUTES,
  "oauth": {
    "client_id": process.env.OAUTH_CLIENT_ID,
    "client_secret": process.env.OAUTH_CLIENT_SECRET,
    "jwt_secret": process.env.OAUTH_JWT_SECRET,
    "diff": process.env.OAUTH_DIFF,
    "measurement": process.env.OAUTH_MEASUREMENT,
  },
  "token": {
    "expiresIn": process.env.TOKEN_EXPIRES_IN,
    "expiresRefresh": process.env.TOKEN_EXPIRES_REFRESH,
  },
  "mongodb": {
    "host": devMode ? process.env.MONGODB_DEV_HOST : process.env.MONGODB_HOST,
    "port": devMode ? process.env.MONGODB_DEV_PORT : process.env.MONGODB_PORT_INTERNAL,
    "database": devMode ? process.env.MONGODB_DEV_DBNAME : process.env.MONGODB_DBNAME,
    "username": devMode ? process.env.MONGODB_DEV_USERNAME : process.env.MONGODB_USERNAME,
    "password": devMode ? process.env.MONGODB_DEV_PASSWORD : process.env.MONGODB_PASSWORD,
  },
  "session": {
    "maxAge": process.env.SESSION_MAX_AGE || null,
    "secret": process.env.SESSION_SECRET,
    "domain": process.env.SESSION_DOMAIN,
    "cookie": process.env.SESSION_COOKIE,
  },
  "pagination": {
    "default_page": process.env.DEFAULT_PAGE,
    "default_limit": process.env.DEFAULT_LIMIT,
  },
}
