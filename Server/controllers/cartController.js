const pool = require("../models/db");

// إضافة المنتج إلى سلة التسوق
exports.addToCart = async (req, res) => {
  try {
    const { user_id, product_id, quantity } = req.body;

    // قم بالبحث عن سعر المنتج في قاعدة البيانات
    const priceQuery = "SELECT price FROM products WHERE product_id = $1";
    const priceResult = await pool.query(priceQuery, [product_id]);
    const price = priceResult.rows[0].price;

    const total_price = price * quantity;

    // قم بالبحث عن وجود المنتج في سلة التسوق
    const existingItemQuery =
      "SELECT * FROM cart WHERE user_id = $1 AND product_id = $2";
    const existingItemResult = await pool.query(existingItemQuery, [
      user_id,
      product_id,
    ]);

    if (existingItemResult.rows.length > 0) {
      // إذا وُجد المنتج، قم بتحديث الكمية والسعر الإجمالي
      const updateQuery =
        "UPDATE cart SET quantity = $1, total_price = $2 WHERE user_id = $3 AND product_id = $4";
      await pool.query(updateQuery, [
        quantity,
        total_price,
        user_id,
        product_id,
      ]);
    } else {
      // إذا لم يتم العثور على المنتج، قم بإدراجه في سلة التسوق
      const insertQuery =
        "INSERT INTO cart (user_id, product_id, quantity, price) VALUES ($1, $2, $3, $4)";
      await pool.query(insertQuery, [user_id, product_id, quantity, price]);
    }

    res
      .status(200)
      .send("The product has been added to the shopping cart successfully.");
  } catch (err) {
    console.error(err);
    res.status(500).send("error: " + err);
  }
};

// عرض سلة التسوق
exports.viewCart = async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM cart");
    const results = { results: result ? result.rows : null };
    res.status(200).json(results);
  } catch (err) {
    console.error(err);
    res.status(500).send("error: " + err);
  }
};

// إزالة منتج من سلة التسوق
exports.removeFromCart = async (req, res) => {
  try {
    const { user_id, product_id, quantity } = req.body;

    const findQuery =
      "SELECT quantity FROM cart WHERE user_id = $1 AND product_id = $2";
    const findResult = await pool.query(findQuery, [user_id, product_id]);

    if (findResult.rows.length > 0) {
      const currentQuantity = findResult.rows[0].quantity;

      if (quantity <= currentQuantity) {
        const newQuantity = currentQuantity - quantity;

        if (newQuantity > 0) {
          const updateQuery =
            "UPDATE cart SET quantity = $1 WHERE user_id = $2 AND product_id = $3";
          await pool.query(updateQuery, [newQuantity, user_id, product_id]);
        } else {
          const deleteQuery =
            "DELETE FROM cart WHERE user_id = $1 AND product_id = $2";
          await pool.query(deleteQuery, [user_id, product_id]);
        }

        res
          .status(200)
          .send("Reduce the amount of product from efficient shopping.");
      } else {
        res
          .status(400)
          .send(
            "The quantity ordered exceeds the quantity available in the shopping cart."
          );
      }
    } else {
      res
        .status(404)
        .send(
          "The shopping cart does not exist for the user or the product is not in the shopping cart."
        );
    }
  } catch (err) {
    console.error(err);
    res.status(500).send("error: " + err);
  }
};
