const {Router } = require("express");
const product_controller = require("../controllers/product_controller");

const router = Router();

router.get("/products",product_controller.getproducts);
router.post("/products",product_controller.addproducts);

module.exports = router;
