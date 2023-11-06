// routes/rateRoutes.js
const express = require('express');
const rateController = require('../controllers/rateController');
const router = express.Router();

router.post('/rate', rateController.submitRating);
router.put('/update-rating', rateController.updateRating);
router.get('/ratings', rateController.getRatings);

module.exports = router;
