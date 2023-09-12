const express = require('express');
const router  = express.Router();
// const passport = require("passport")
const oauthController = require('../controllers/oauthController');

// * Post Login
router.post("/login", oauthController.signin)

// * Register
// router.post('/register',oauthController.signup, function(req, res){});

// * Refreshtoken 
// router.post('/refreshtoken',oauthController.refreshtoken, function(req, res){});


module.exports = router;