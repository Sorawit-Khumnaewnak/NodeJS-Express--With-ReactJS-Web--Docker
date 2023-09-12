const express = require('express');
const router = new express.Router();
const appController = new (require('./../controllers/AppController'));

// * Go index page
router.get('/', (req, res) => appController.index(req, res))

// * Get check status
router.get('/health_check', (req, res) => {
  res.json({
    "code": 200,
    "message": "Successfully.",
    "data": "API - Reday"
  })
})

module.exports = router;