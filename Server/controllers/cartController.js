const { Pool } = require('pg');

const pool = new Pool({
  user: 'postgres',
  password: '123',
  host: 'localhost',
  port: 5432,
  database: 'eco',
});

class CartController {
  async addToCart(req, res) {
    try {
      const { user_id, product_id, quantity } = req.body;

      const priceQuery = 'SELECT price FROM products WHERE product_id = $1';
      const priceResult = await pool.query(priceQuery, [product_id]);
      const price = priceResult.rows[0].price;

      const total_price = price * quantity;

      const existingItemQuery = 'SELECT * FROM cart WHERE user_id = $1 AND product_id = $2';
      const existingItemResult = await pool.query(existingItemQuery, [user_id, product_id]);

      if (existingItemResult.rows.length > 0) {
        const updateQuery = 'UPDATE cart SET quantity = $1, total_price = $2 WHERE user_id = $3 AND product_id = $4';
        await pool.query(updateQuery, [quantity, total_price, user_id, product_id]);
      } else {
        const insertQuery = 'INSERT INTO cart (user_id, product_id, quantity, price, total_price) VALUES ($1, $2, $3, $4, $5)';
        await pool.query(insertQuery, [user_id, product_id, quantity, price, total_price]);
      }

      res.status(200).send('Product added to the cart successfully.');
    } catch (error) {
      console.error('Error adding product to cart:', error);
      res.status(500).send('Error adding product to cart');
    }
  }

  async getCartItems(req, res) {
    try {
      const result = await pool.query('SELECT cart_id, user_id, product_id, quantity, price, created_at FROM cart');
      const results = { 'results': (result) ? result.rows : null };
      res.status(200).json(results);
    } catch (error) {
      console.error('Error getting cart items:', error);
      res.status(500).send('Error getting cart items');
    }
  }

  async removeFromCart(req, res) {
    try {
      const { user_id, product_id, quantity } = req.body;

      const findQuery = 'SELECT quantity FROM cart WHERE user_id = $1 AND product_id = $2';
      const findResult = await pool.query(findQuery, [user_id, product_id]);

      if (findResult.rows.length > 0) {
        const currentQuantity = findResult.rows[0].quantity;

        if (quantity <= currentQuantity) {
          const newQuantity = currentQuantity - quantity;

          if (newQuantity > 0) {
            const updateQuery = 'UPDATE cart SET quantity = $1 WHERE user_id = $2 AND product_id = $3';
            await pool.query(updateQuery, [newQuantity, user_id, product_id]);
          } else {
            const deleteQuery = 'DELETE FROM cart WHERE user_id = $1 AND product_id = $2';
            await pool.query(deleteQuery, [user_id, product_id]);
          }

          res.status(200).send('Product quantity removed from the cart successfully.');
        } else {
          res.status(400).send('Requested quantity exceeds available quantity in the cart.');
        }
      } else {
        res.status(404).send('Cart not found for the user or product not in the cart.');
      }
    } catch (error) {
      console.error('Error removing product from cart:', error);
      res.status(500).send('Error removing product from cart');
    }
  }
}

module.exports = new CartController();


