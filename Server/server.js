const express = require("express");
const app = express();
const session = require("express-session");
const passport = require("passport");
app.use(express.json());
var cors = require("cors");
app.use(cors());

const bodyParser = require("body-parser");
const path = require("path");

app.use(session({ secret: "cats", resave: false, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());

const user_router = require("./routes/users_route");
const google_router = require("./routes/google_route");
const payment_router = require("./routes/payment_route");

const products_Router = require("./routes/products_routes");
const admin_Router = require("./routes/admin_routes");
const orders_Router = require("./routes/orders_routes");
const Wishlist_Router = require("./routes/wishlist_routes");

const productsRouter = require("./routes/productsRouter ay");
const profileRouter = require("./routes/profileRouter");

// ---------------------------------------------------------------------

app.use(user_router);
app.use(google_router);
app.use(payment_router);

app.use(products_Router);
app.use(admin_Router);
app.use(orders_Router);
app.use(Wishlist_Router);

app.use(bodyParser.json());
app.use(productsRouter);
app.use(profileRouter);
app.use(
  "/productImages",
  express.static(path.join(__dirname, "productImages"))
);
app.use(
  "/profileImages",
  express.static(path.join(__dirname, "profileImages"))
);

// ---------------------------------------------------------------------------

app.listen(5000, () => {
  console.log("server running at http://localhost:5000");
});
