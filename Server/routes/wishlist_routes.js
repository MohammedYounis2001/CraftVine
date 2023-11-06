const { Router } = require("express");
const wishlistController = require("../controllers/wishlist_controler");
const router = Router();

router.get("/Wishlist/:user_id", wishlistController.getWishlist);
router.post("/addToWishlist/:user_id", wishlistController.addToWishlist);
router.delete("/removeFromWishlist/:user_id", wishlistController.removeFromWishlist);

module.exports = router;