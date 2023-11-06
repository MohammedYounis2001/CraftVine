const {Router } = require("express");
const admin_controller = require("../controllers/admin_controller");

const router = Router();

router.post("/admin/create",admin_controller.creatadmin);
router.get("/admin/users",admin_controller.all_users);
router.put("/admin/update_role",admin_controller.updateUserRole);
router.put("/admin/users/soft_delete/:id",admin_controller.user_soft_delete);
router.put("/admin/users/restor_user/:id",admin_controller.restore_deleted_user);

// app.post("/admin/update-role", isAdmin, updateUserRole);

// admin product routes
router.get("/admin/all_product",admin_controller.all_product);
router.post("/admin/addproduct",admin_controller.addproduct);
router.put("/admin/update_product",admin_controller.updateProductData);

router.put("/admin/add_discount/:id",admin_controller.add_discount);

router.put("/admin/product/soft_delete/:id",admin_controller.product_soft_delete);
router.put("/admin/product/product_restore/:id",admin_controller.product_restore);

router.put("/admin/product/set_best_seller/:product_id",admin_controller.set_best_seller);
router.put("/admin/product/unset_best_seller/:product_id",admin_controller.unset_best_seller);


// admin order routes
router.get("/admin/all_orders",admin_controller.all_orders);
router.get("/admin/order_stats",admin_controller.order_client_and_total_stats);

module.exports = router;