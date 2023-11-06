const {Router } = require("express");
const orders_controller = require("../controllers/orders_controller");
// const { user_orders } = require("../controllers/orders_controller");

const router = Router();

router.get("/profile/orders/:user_id",orders_controller.user_orders);
router.post("/orders/create_orders",orders_controller.create_order);
router.delete("/orders/delete_order/:order_id",orders_controller.delete_order);


module.exports = router;