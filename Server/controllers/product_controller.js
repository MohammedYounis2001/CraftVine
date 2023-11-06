const express = require("express");
const db = require("../models/db");
const bodyParser = require("body-parser"); // Import body-parser

const app = express();



exports.getproducts =  async (req, res) => {
  try {
    const query = "SELECT * FROM products";
    const result = await db.query(query);
    res.json(result.rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

exports.addproducts = async (req, res) => {
    try {
      const { product_name, category, price, description, quantity } = req.body;
      const query = `
        INSERT INTO products (product_name, category, price, description, quantity)
        VALUES ($1, $2, $3, $4, $5)
        RETURNING product_id`;
      const values = [product_name, category, price, description, quantity];
      const result = await db.query(query, values);
      res.status(201).json({
        message: "product created successfully",
        productId: result.rows[0].product_id,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  };

// module.exports = app;
