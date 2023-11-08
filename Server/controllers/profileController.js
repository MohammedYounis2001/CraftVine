const pool = require("../models/db");
const multer = require("multer");
const path = require("path");
// const jwt = require("jsonwebtoken");

// Storage Image By Multer Start
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "profileImages");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});
const addImage = multer({ storage: storage });
const imageProfile = addImage.single("image");
// Storage Image By Multer End

// Update Information Profile Start
const updateProfile = async (req, res) => {
  try {
    const { email, first_name, last_name, phone } = req.body;
    const profile_image_name = req.file ? req.file.filename : null;

    const userQuery = "SELECT * FROM users WHERE email = $1";
    const userResult = await pool.query(userQuery, [email]);

    if (userResult.rows.length === 0) {
      return res.status(404).json({ error: "User not found" });
    }

    const query =
      "UPDATE users SET first_name = $1, last_name = $2, profile_image_name = $3, phone = $4 WHERE email = $5";
    const result = await pool.query(query, [
      first_name,
      last_name,
      profile_image_name,
      phone,
      email,
    ]);

    if (result.rowCount > 0) {
      res.status(200).json({ message: "Profile updated successfully" });
    } else {
      res.status(500).json({ error: "Failed to update the profile" });
    }
  } catch (error) {
    console.error("An error occurred while updating the profile:", error);
    res
      .status(500)
      .json({ error: "An error occurred while updating the profile" });
  }
};
// Update Information Profile End

// Get Information Profile Start
const getProfile = async (req, res) => {
  const token = req.headers["authorization"];
  const secretKey = process.env.SECRET_KEY;
  const decodedToken = jwt.verify(token, secretKey);
  const user_id = decodedToken.user_id;
  try {
    const userQuery =
      "SELECT user_id, email, first_name, last_name, phone, profile_image_name FROM users WHERE user_id = $1";
    const userResult = await pool.query(userQuery, [user_id]);

    if (userResult.rows.length > 0) {
      const user = userResult.rows[0];
      const images = userResult.rows.map((image) => {
        const profile_image_name = image.profile_image_name;
        const image_url = profile_image_name
          ? `http://localhost:5000/ProductImages/${profile_image_name}`
          : null;
        return {
          profile_image_name: image.profile_image_name,
          image_url: image_url,
        };
      });
      res.status(200).json({
        message: "Get Profile Successfully",
        data: user,
        images: images,
      });
    } else {
      res.status(404).json({ error: "User not found" });
    }
  } catch (error) {
    console.error("An error occurred while fetching the profile:", error);
    res
      .status(500)
      .json({ error: "An error occurred while fetching the profile" });
  }
};
// Get Information Profile End

module.exports = {
  imageProfile,
  updateProfile,
  getProfile,
};
