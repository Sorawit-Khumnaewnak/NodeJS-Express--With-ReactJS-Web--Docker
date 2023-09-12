require('dotenv').config()
const express = require('express');
const session = require("express-session")
const memoryStore = require('memorystore')(session)
const passport = require("passport")
const path = require('path');
const favicon = require('serve-favicon');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const i18n = require("i18n")

require('./server/db/mongoose');
const config = require("./server/config");
const routesApp = require('./server/routes/app');


const commonQuery = require("./server/middleware/commonQuery")
const commonResult = require("./server/middleware/commonResult")
const apiHandleError = require("./server/middleware/apiHandleError")

const { errorLogFormat } = require("./server/utils/common")

const app = express();

const corsOptions = {
  origin: '*',
  methods: ['POST', 'GET', 'PUT', 'PATCH', 'DELETE'],
  exposedHeaders: [
    'Authorization',
    'Accept-Language',
    'X-Pager-Total-Item',           // *จำนวน Items ทั้งหมด
    'X-Pager-First-Page',           // *หน้าแรก
    'X-Pager-Last-Page',            // *หน้าสุดท้าย
    'X-Pager-Limit-Per-Page',       // *จำนวน Items ต่อหน้า
    'X-Pager-Previous-Page',        // *หน้าที่แล้ว
    'X-Pager-Current-Page',         // *หน้าปัจจุบัน
    'X-Pager-Next-Page',            // *หน้าถัดไป
  ],
};
const cors = require('cors');
app.use(cors(corsOptions));

app.use(session({
  secret: config.session.secret,
  saveUninitialized: true,
  resave: true,
  key: config.session.cookie,
  cookie: {
    maxAge: config.session.maxAge,
    domain: config.session.domain,
  },
  store: new memoryStore({
    checkPeriod: 86400000 // prune expired entries every 24h
  }),
}))

app.use(logger('dev'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')))
app.use(express.static(path.join(__dirname, 'public')));
app.use(cookieParser());

app.use(passport.initialize())
app.use(passport.session())
require("./server/utils/passport")

i18n.configure({
  locales: ["en", "th"],
  directory: __dirname + "/server/locales",
  staticCatalog: {
    en: require('./server/locales/en'),
    th: require('./server/locales/th'),
  },
  defaultLocale: "th",
})
app.use(i18n.init)

// TODO: Routes API
app.use(commonQuery)
const routerAPI = express.Router();
const oauth = require('./server/routes/oauth');
const user = require('./server/routes/api/user');

routerAPI.use('/oauth', oauth);
routerAPI.use('/user', user);
app.use(config.prefix_route, routerAPI);
app.use(express.static(path.join(__dirname, 'client/build')));
app.use(express.static(path.join(__dirname, 'server/public')));
app.use('/', routesApp);

// * Handle Error & CommonResult ===================================
app.use(apiHandleError)
app.use(commonResult)

// * Catch 404 and forward to error handler
app.use(function (req, res, next) {
  const err = new Error("Not Found")
  err.status = 404
  next(err)
})

// * Error handler
app.use(function (err, req, res, next) {
  res.locals.message = err.message
  res.locals.error = err
  errorLogFormat(err)
  res.status(200).json({ code: err.status, message: err.message })
})
// * ===============================================================

module.exports = app;
