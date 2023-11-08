// ecommerce/server/routes/cartRoutes.js
const express = require("express");
const router = express.Router();
const cartController = require("../controllers/cartController");

router.post("/add-to-cart", cartController.addToCart);
router.get("/cart", cartController.viewCart);
router.delete("/remove-from-cart", cartController.removeFromCart);

module.exports = router;
