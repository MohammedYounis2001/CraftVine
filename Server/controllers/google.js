const db = require("../models/db");
const jwt = require("jsonwebtoken");
const passport = require("passport");
require("../middleware/auth");

function isLoggedIn(req, res, next) {
  req.user ? next() : res.sendStatus(401);
}

exports.getuser = (req, res) => {
  res.send('<a href="/auth/google">Authenticate with Google</a>');
};

exports.getauthenticate = passport.authenticate("google", {
  scope: ["email", "profile"],
});

exports.callback = passport.authenticate("google", {
  successRedirect: "/protected",
  failureRedirect: "/auth/google/failure",
});

exports.protected =
  (isLoggedIn,
  async (req, res) => {
    if (req.user) {
      try {
        const { displayName, emails, id } = req.user;

        const [first_name, last_name] = displayName.split(" ");
        const email = emails[0].value;
        const checkEmailQuery = "SELECT * FROM users WHERE email = $1";
        const emailCheck = await db.query(checkEmailQuery, [email]);

        if (emailCheck.rows.length > 0) {
          const payload = {
            first_name: first_name,
            last_name: last_name,
            email: email,
            role: emailCheck.rows[0].user_role,
            user_id: emailCheck.rows[0].user_id,
          };

          const secretKey = process.env.SECRET_KEY;
          const token = jwt.sign(payload, secretKey, { expiresIn: "1h" });
          res.status(200).json({
            message: "User added successfully",
            token: token,
          });
          // setTimeout(() => {
          //   res.redirect("http://localhost:3000/");
          // }, 0);
        } else {
          const user_role = "user";
          const created_at = new Date();
          const password = "No Access";
          const phone = "00000000";
          const query =
            "INSERT INTO users (first_name, last_name, email, user_role, password, created_at, phone) VALUES ($1, $2, $3, $4, $5, $6, $7)";
          const values = [
            first_name,
            last_name,
            email,
            user_role,
            password,
            created_at,
            phone,
          ];
          await db.query(query, values);
          const payload = {
            first_name: first_name,
            last_name: last_name,
            email: email,
            role: user_role,
            user_id: id,
          };

          const secretKey = process.env.SECRET_KEY;
          const token = jwt.sign(payload, secretKey, { expiresIn: "7d" });
          res.status(200).json({
            logmessage: "User added successfully",
            token: token,
          });
          // setTimeout(() => {
          //   res.redirect("http://localhost:3000/");
          // }, 0);
        }
      } catch (error) {
        console.error("Error saving user information to PostgreSQL:", error);
        res.status(500).send("Internal Server Error");
      }
    } else {
      res.sendStatus(401);
    }
  });

exports.logout = (req, res) => {
  req.logout(() => {
    req.session.destroy((err) => {
      if (err) {
        console.error("Error destroying session:", err);
      }
      res.send("Goodbye!");
    });
  });
};

exports.fail = (req, res) => {
  res.send("Failed to authenticate..");
};
