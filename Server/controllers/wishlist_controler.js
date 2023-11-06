const express = require("express");
const db = require("../models/db");
const bodyParser = require("body-parser"); // Import body-parser

const app = express();

exports.getWishlist = async (req, res) => {
    try {
      const userId = req.params.user_id; // Assuming you can access the user's ID from the request parameters
  
      // Specify the table name in the SQL query
      const query = `
          SELECT * FROM wishlist 
          inner join products on wishlist.product_id = products.product_id
          WHERE user_id = $1`;
  
      const result = await db.query(query, [userId]);
  
      if (result.rows.length > 0) {
        res.status(200).json(result.rows); // Return wishlist items
      } else {
        res.status(404).json({ message: "Wishlist is empty for this user" });
      }
    } catch (error) {
      res.status(500).json({ error: "Error fetching wishlist" });
    }
  };

  exports.addToWishlist = async (req, res) => {
    try {
      const userId = req.params.user_id; // Assuming you can access the user's ID from the request parameters
      const { product_id } = req.body; // Assuming you receive these details in the request body
  
      // Specify the table name in the SQL query
      const query = `
        INSERT INTO wishlist (user_id, product_id)
        VALUES ($1, $2)
        RETURNING product_id`;
  
      const values = [userId, product_id];
  
      const result = await db.query(query, values);
  
      if (result.rows.length > 0) {
        res.status(201).json({
          message: "Item added to wishlist successfully",
          product_id: result.rows[0].product_id,
        });
      } else {
        res.status(500).json({ error: "Error adding item to wishlist" });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal Server Error" });
    }
};

exports.removeFromWishlist = async (req, res) => {
    try {
      const userId = req.params.user_id; // Assuming you can access the user's ID from the request parameters
      const { product_id } = req.body; // Assuming you receive these details in the request body
  
      // Specify the table name in the SQL query
      const query = `
        DELETE FROM wishlist
        WHERE user_id = $1 AND product_id = $2
        RETURNING product_id`;
  
      const values = [userId, product_id];
  
      const result = await db.query(query, values);
  
      if (result.rows.length > 0) {
        res.status(200).json({
          message: "Item removed from wishlist successfully",
          product_id: result.rows[0].product_id,
        });
      } else {
        res.status(404).json({ message: "Item not found in the wishlist" });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  };