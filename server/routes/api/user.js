const express = require("express")
const router = express.Router()
const passport = require("passport")
const oauthController = require('../../controllers/oauthController')


// * Get Profile
router.get("/", 
  passport.authenticate("bearer", { session: false }),
  oauthController.getProfile
)

// * Get Profile By ID
router.get("/:id", 
  passport.authenticate("basic", { session: false }),
  oauthController.getProfileByID
)

module.exports = router
