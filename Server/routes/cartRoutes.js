const express = require('express');
const cartController = require('../controllers/cartController');

const router = express.Router();

router.post('/add-to-cart', cartController.addToCart);
router.get('/custom-path', cartController.getCartItems);
router.delete('/remove-from-cart', cartController.removeFromCart);

module.exports = router;

