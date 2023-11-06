const express = require("express");
const db = require("../models/db");
const bodyParser = require("body-parser"); // Import body-parser

const app = express();

// Define your routes for user management here
// Create a new admin user account
exports.creatadmin = async (req, res) => {
  try {
    const { user_role, first_name, last_name, email, password, phone } =
      req.body;

    // Specify the table name in the SQL query
    const query = `
        INSERT INTO users (user_role, first_name, last_name, email, password, phone)
        VALUES ($1, $2, $3, $4, $5, $6)
        RETURNING user_id`;

    const values = [user_role, first_name, last_name, email, password, phone];

    const result = await db.query(query, values);

    res.status(201).json({
      message: "User created successfully",
      user_Id: result.rows[0].user_id,
    });
  } catch (error) {
    res.status(500).json({ error: "Error creating user" });
  }
};

// Retrieve a list of all users
exports.all_users = async (req, res) => {
  try {
    const query =
      "SELECT user_role, first_name, last_name, email, created_at FROM users";
    const result = await db.query(query);
    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ error: "Error fetching users" });
  }
};

// Update User Role
exports.updateUserRole = async (req, res) => {
  try {
    const { user_id, new_role } = req.body;

    // Check if the new_role is a valid role (e.g., admin, customer)
    const validRoles = ["admin", "customer"]; // Define the valid roles
    if (!validRoles.includes(new_role)) {
      return res.status(400).json({ error: "Invalid role specified" });
    }

    // Update the user's role in the database
    const query = `
        UPDATE users
        SET user_role = $1
        WHERE user_id = $2
        RETURNING user_id, user_role`;

    const values = [new_role, user_id];

    const result = await db.query(query, values);

    if (result.rows.length === 0) {
      return res.status(404).json({ error: "User not found" });
    }

    res.json({
      message: "User role updated successfully",
      user_id: result.rows[0].user_id,
      new_role: result.rows[0].user_role,
    });
  } catch (error) {
    res.status(500).json({ error: "Error updating user role" });
  }
};

// Soft delete a user (set is_deleted to true)
exports.user_soft_delete = async (req, res) => {
  try {
    const userId = req.params.id;

    const result = await db.query(
      "UPDATE users SET is_deleted = true WHERE user_id = $1",
      [userId]
    );

    if (result.rowCount > 0) {
      res.json({ message: "User soft deleted successfully" });
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    res.status(500).json({ error: "Error soft deleting user" });
  }
};

// Restore a soft-deleted user (set is_deleted to false)
exports.restore_deleted_user = async (req, res) => {
  try {
    const userId = req.params.id;

    const result = await db.query(
      "UPDATE users SET is_deleted = false WHERE user_id = $1",
      [userId]
    );

    if (result.rowCount > 0) {
      res.json({ message: "User restored successfully" });
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    res.status(500).json({ error: "Error restoring user" });
  }
};

////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////

//  add product
exports.addproduct = async (req, res) => {
  try {
    const { product_name, category, price, description, quantity } = req.body;

    // Specify the table name in the SQL query
    const query = `
          INSERT INTO products (product_name, category, price, description, quantity)
          VALUES ($1, $2, $3, $4, $5)
          RETURNING product_id`;

    const values = [product_name, category, price, description, quantity];

    const result = await db.query(query, values);

    res.status(201).json({
      message: "product add successfully",
      product_id: result.rows[0].product_id,
    });
  } catch (error) {
    res.status(500).json({ error: "Error adding product" });
  }
};

// Retrieve a list of all product
exports.all_product = async (req, res) => {
  try {
    const query =
      "SELECT product_name, category, price, description FROM products";
    const result = await db.query(query);
    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ error: "Error fetching product" });
  }
};

// Update Product Data
exports.updateProductData = async (req, res) => {
  try {
    const { product_id, new_data } = req.body;

    // Ensure that new_data contains valid fields (e.g., price, description, quantity)
    const validFields = [
      "product_name",
      "category",
      "price",
      "description",
      "quantity",
    ]; // Define valid fields
    const updateValues = {};

    for (const field of validFields) {
      if (new_data[field] !== undefined) {
        updateValues[field] = new_data[field];
      }
    }

    // Check if there are any valid fields to update
    if (Object.keys(updateValues).length === 0) {
      return res.status(400).json({ error: "No valid fields to update" });
    }

    // Update the product data in the database
    const query = `
        UPDATE products
        SET ${Object.keys(updateValues)
          .map((field, index) => `${field} = $${index + 1}`)
          .join(", ")}
        WHERE product_id = $${Object.keys(updateValues).length + 1}
        RETURNING product_id`;

    const values = [...Object.values(updateValues), product_id];

    const result = await db.query(query, values);

    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Product not found" });
    }

    res.json({
      message: "Product data updated successfully",
      product_id: result.rows[0].product_id,
    });
  } catch (error) {
    res.status(500).json({ error: "Error updating product data" });
  }
};

// Add a discount to a product
exports.add_discount = async (req, res) => {
  try {
    const productId = req.params.id;
    const discountPercentage = req.body.discountPercentage;

    const result = await db.query(
      "UPDATE products SET discount_percentage = $1 WHERE product_id = $2",
      [discountPercentage, productId]
    );

    if (result.rowCount > 0) {
      res.json({ message: "Discount added successfully" });
    } else {
      res.status(404).json({ message: "Product not found" });
    }
  } catch (error) {
    res.status(500).json({ error: "Error adding discount to the product" });
  }
};

// Update the 'is_deleted' column to true for a product
exports.product_soft_delete = async (req, res) => {
    try {
      const productId = req.params.id;
      console.log("Product ID to be deleted:", productId);
  
      const updateIsDeletedQuery = `
        UPDATE products SET is_deleted = true WHERE product_id = $1
      `;
      
      const result = await db.query(updateIsDeletedQuery, [productId]);
      console.log("Result:", result.rows);
  
      if (result.rowCount > 0) {
        res.status(200).json({ message: "is_deleted updated to true for the product" });
      } else {
        res.status(404).json({ message: "Product not found" });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  };
  
  // Restore a soft-deleted product
exports.product_restore = async (req, res) => {
    try {
      const productId = req.params.id;
      console.log("Product ID to be restored:", productId);
  
      const restoreProductQuery = `
        UPDATE products SET is_deleted = false WHERE product_id = $1
      `;
      
      const result = await db.query(restoreProductQuery, [productId]);
      console.log("Result:", result.rows);
  
      if (result.rowCount > 0) {
        res.status(200).json({ message: "Product restored successfully" });
      } else {
        res.status(404).json({ message: "Product not found" });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  };

  
  // Express route to set best_seller to true for a product
exports.set_best_seller = async (req, res) => {
  try {
    const productId = req.params.product_id;

    // Run an SQL query to update the product's best_seller status
    const updateQuery = `
      UPDATE products
      SET best_seller = true
      WHERE product_id = $1
    `;

    const result = await db.query(updateQuery, [productId]);

    if (result.rowCount > 0) {
      res.status(200).json({ message: "best_seller status set to true for the product" });
    } else {
      res.status(404).json({ message: "Product not found" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// Express route to set best_seller to false for a product
exports.unset_best_seller = async (req, res) => {
  try {
    const productId = req.params.product_id;

    // Run an SQL query to update the product's best_seller status
    const updateQuery = `
      UPDATE products
      SET best_seller = false
      WHERE product_id = $1
    `;

    const result = await db.query(updateQuery, [productId]);

    if (result.rowCount > 0) {
      res.status(200).json({ message: "best_seller status set to false for the product" });
    } else {
      res.status(404).json({ message: "Product not found" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

  //////////////////////////////////////////////////////////////////
  //////////////////////////////////////////////////////////////////

// Retrieve all orders for all users
exports.all_orders = async (req, res) => {
    try {
        // Query to retrieve all orders with order details
        const retrieveOrdersQuery = `
            SELECT o.order_id, o.user_id, o.total_amount, o.shipping_address, od.product_id, od.quantity, od.price
            FROM orders o
            INNER JOIN order_details od ON o.order_id = od.order_id
        `;
      
        const result = await db.query(retrieveOrdersQuery);

        if (result.rows.length > 0) {
            res.status(200).json(result.rows); // Return all orders with details
        } else {
            res.status(404).json({ message: "No orders found" });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

// Retrieve the number of orders, number of clients with orders, and total sum of total_amount
exports.order_client_and_total_stats = async (req, res) => {
    try {
        // Query to get the number of orders, number of clients with orders, and total sum of total_amount
        const statsQuery = `
            SELECT COUNT(*) AS order_count, COUNT(DISTINCT user_id) AS client_count, SUM(price) AS total_amount
            from orders inner join order_details on orders.order_id = order_details.order_id
        `;
      
        const result = await db.query(statsQuery);

        if (result.rows.length > 0) {
            const stats = result.rows[0];
            res.status(200).json(stats);
        } else {
            res.status(404).json({ message: "No orders found" });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

  
  
  
  
  
