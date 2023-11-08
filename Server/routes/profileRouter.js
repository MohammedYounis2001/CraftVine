const { Router } = require("express");
const profileController = require("../controllers/profileController");
const router = Router();

router.put(
  "/Update_Information_Profile",
  profileController.imageProfile,
  profileController.updateProfile
);
router.get(
  "/Get_Information_Profile",
  profileController.imageProfile,
  profileController.getProfile
);

module.exports = router;
