const { Router } = require("express");
const userController = require("../controllers/users");
const router = Router();

router.post("/registration", userController.registerUser);
router.post("/login", userController.loginUser);
router.get("/user", userController.getUserDetails);
router.put("/updateuser", userController.update_user);

module.exports = router;
