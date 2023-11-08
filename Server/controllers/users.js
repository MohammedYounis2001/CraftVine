const db = require("../models/db");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
require("dotenv").config();
// const crypto = require("crypto");
const Joi = require("joi");

// const secretKey1 = crypto.randomBytes(32).toString("hex");
// console.log(secretKey1);
// --------------------------------------------------Registration-------------------------------------------------------------

exports.registerUser = async (req, res) => {
  const { first_name, last_name, email, password, user_role, phone } = req.body;
  const created_at = new Date();

  try {
    const schema = Joi.object({
      first_name: Joi.string().alphanum().min(3).max(20).required(),
      last_name: Joi.string().alphanum().min(3).max(20).required(),
      email: Joi.string()
        .email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } })
        .required(),
      password: Joi.string()
        .pattern(
          new RegExp(
            "^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@#$%^&!])[A-Za-z\\d@#$%^&!]{6,30}$"
          )
        )
        .required(),
      phone: Joi.string()
        .pattern(/^[0-9]{7,12}$/)
        .required(),
    });
    const validate = schema.validate({
      first_name,
      last_name,
      email,
      password,
      phone,
    });
    if (validate.error) {
      res.status(405).json({ error: validate.error.details });
    } else {
      const checkEmailQuery = "SELECT user_id FROM users WHERE email = $1";
      const emailCheck = await db.query(checkEmailQuery, [email]);

      if (emailCheck.rows.length > 0) {
        res.status(400).json({ error: "Email already exists" });
      } else {
        const user_role = "user";
        const query = `INSERT INTO users (first_name, last_name, email, password, user_role, phone, created_at)
              VALUES ($1, $2, $3, $4, $5, $6, $7)
              RETURNING user_id`;
        const hashedPassword = await bcrypt.hash(password, 10);
        const values = [
          first_name,
          last_name,
          email,
          hashedPassword,
          user_role,
          phone,
          created_at,
        ];
        const user = await db.query(query, values);

        const payload = {
          first_name: values[0],
          last_name: values[1],
          email: values[2],
          role: values[4],
          user_id: user.rows[0].user_id,
        };

        const secretKey = process.env.SECRET_KEY;
        const token = jwt.sign(payload, secretKey, { expiresIn: "1h" });

        res.status(201).json({
          message: "User Added Successfully",
          user_id: user.rows.user_id,
          token: token,
        });
      }
    }
  } catch (err) {
    console.error(err);
    res.status(500).send("Failed to add user");
  }
};
// ------------------------------------------------------Login---------------------------------------------------------
exports.loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const checkeduser = `select * from users where email = $1`;
    const checked = await db.query(checkeduser, [email]);

    if (!checked.rows.length) {
      res.status(400).json({ error: "Invalid Email or Password" });
    } else {
      const storedHashedPassword = checked.rows[0].password;
      const matched_password = await bcrypt.compare(
        password,
        storedHashedPassword
      );
      if (!matched_password) {
        res.status(400).json({ message: "Email or password is invalid" });
        return;
      }
      const payload = {
        first_name: checked.rows[0].first_name,
        last_name: checked.rows[0].last_name,
        email: checked.rows[0].email,
        user_role: checked.rows[0].user_role,
        user_id: checked.rows[0].user_id,
      };
      const secretKey = process.env.SECRET_KEY;
      const token = jwt.sign(payload, secretKey, { expiresIn: "1h" });

      res.status(200).json({
        message: "Login Successfully",
        user_id: checked.rows.user_id,
        token: token,
      });
    }
  } catch (err) {
    console.error(err);
    res.status(500).send("Failed to Authenticate");
  }
};
// ----------------------------------------------------------------user details-----------------------------------------------
exports.getUserDetails = async (req, res) => {
  try {
    const user = await db.query(`select * from users where user_id = 
    5`);
    res.json(user.rows);
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
};

// ---------------------------------------------------------------- update user info --------------------------------------------

exports.update_user = async (req, res) => {
  const { user_id, first_name, last_name, email, phone } = req.body;

  try {
    const schema = Joi.object({
      first_name: Joi.string().alphanum().min(3).max(20).required(),
      last_name: Joi.string().alphanum().min(3).max(20).required(),
      email: Joi.string()
        .email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } })
        .required(),
      phone: Joi.string()
        .pattern(/^[0-9]{7,12}$/)
        .required(),
    });
    const validate = schema.validate({
      first_name,
      last_name,
      email,
      phone,
    });
    const user_id = 5;
    if (validate.error) {
      res.status(405).json({ error: validate.error.details });
    } else {
      const userQuery = "SELECT * FROM users WHERE user_id = $1";
      const user = await db.query(userQuery, [user_id]);

      if (!user.rows.length) {
        return res.status(404).json({ error: "User not found" });
      }

      const updateQuery = `
      UPDATE users
      SET
        first_name = $2,
        last_name = $3,
        email = $4,
        phone = $5
      WHERE user_id = $1
      RETURNING user_id`;

      const updatedUser = await db.query(updateQuery, [
        user_id,
        first_name,
        last_name,
        email,
        phone,
      ]);
      res.status(200).json({
        message: "User details updated successfully",
        user_id: updatedUser.rows[0].user_id,
      });
    }
  } catch (err) {
    console.error(err);
    res.status(500).send("Failed to update user details");
  }
};
