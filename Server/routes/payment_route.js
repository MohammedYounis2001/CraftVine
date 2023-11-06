const { Router } = require("express");
const paymentController = require("../controllers/payment");
const router = Router();

router.post("/cardcheck", paymentController.card_check);
router.get("/paymentdata", paymentController.paymentdata);
// router.post("/approvecard", paymentController.approvepayment);

module.exports = router;
