const express = require("express");
const db = require("../models/db");
const bodyParser = require("body-parser"); // Import body-parser

const app = express();

// Retrieve all orders for a user
exports.user_orders = async (req, res) => {
  try {
    const userId = req.params.user_id; // Replace with your method of getting the user's ID

    // Query to retrieve orders associated with the user
    const retrieveOrdersQuery = `
    select * from orders
    inner join order_details on orders.order_id = order_details.order_id
    WHERE user_id = $1
      `;

    const result = await db.query(retrieveOrdersQuery, [userId]);

    if (result.rows.length > 0) {
      res.status(200).json(result.rows); // Return all orders
    } else {
      res.status(404).json({ message: "No orders found for this user" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// Create a new order along with order details
exports.create_order = async (req, res) => {
  try {
    const {
      user_id,
      product_id,
      total_amount,
      shipping_address,
      order_details,
    } = req.body;

    // Start a database transaction
    await db.query("BEGIN");

    // Run an SQL query to insert the new order into the 'orders' table
    const createOrderQuery = `
        INSERT INTO orders (user_id, total_amount, shipping_address)
        VALUES ($1, $2, $3)
        RETURNING order_id;
      `;

    const orderResult = await db.query(createOrderQuery, [
      user_id,
      total_amount,
      shipping_address,
    ]);

    const newOrderId = orderResult.rows[0].order_id;

    // Now, let's insert order details into the 'order_details' table
    const orderDetailsQuery = `
        INSERT INTO order_details (order_id, product_id, quantity, price)
        VALUES ($1, $2, $3, $4)
      `;

    for (const product of order_details) {
      await db.query(orderDetailsQuery, [
        newOrderId,
        product.product_id,
        product.quantity,
        product.price,
      ]);
    }

    // Commit the transaction
    await db.query("COMMIT");

    res
      .status(201)
      .json({ message: "Order created successfully", order_id: newOrderId });
  } catch (error) {
    // If an error occurs, rollback the transaction
    await db.query("ROLLBACK");

    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// Delete an existing order and its related data
exports.delete_order = async (req, res) => {
  // const client = await db.connect();

  try {
    const orderId = req.params.order_id; // Get the order ID from the request parameters

    await db.query("BEGIN"); // Start a transaction

    // Run an SQL query to delete the order from the 'orders' table
    const deleteOrderQuery = `
            DELETE FROM orders
            WHERE order_id = $1
        `;

    // Run an SQL query to delete the related data from the 'order_details' table
    const deleteOrderDetailsQuery = `
            DELETE FROM order_details
            WHERE order_id = $1
        `;

    // Execute the queries with the same transaction
    await db.query(deleteOrderDetailsQuery, [orderId]);
    const result = await db.query(deleteOrderQuery, [orderId]);

    await db.query("COMMIT"); // Commit the transaction

    if (result.rowCount > 0) {
      res
        .status(200)
        .json({ message: "Order and related data deleted successfully" });
    } else {
      res.status(404).json({ message: "Order not found" });
    }
  } catch (error) {
    await db.query("ROLLBACK"); // Rollback the transaction in case of an error
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
  // finally {
  //     db.release(); // Release the client back to the connection pool
  // }
};

// // Edit an existing order
// exports.edit_order = async (req, res) => {
//     try {
//         const orderId = req.params.order_id; // Get the order ID from the request parameters
//         const updatedOrderData = req.body; // Updated order details

//         // Run an SQL query to update the order in the 'orders' table
//         const updateOrderQuery = `
//             UPDATE orders
//             SET total_amount = $1, shipping_address = $2
//             WHERE order_id = $3
//         `;

//         const result = await db.query(updateOrderQuery, [
//             updatedOrderData.total_amount,
//             updatedOrderData.shipping_address,
//             orderId
//         ]);

//         if (result.rowCount > 0) {
//             res.status(200).json({ message: "Order updated successfully" });
//         } else {
//             res.status(404).json({ message: "Order not found" });
//         }
//     } catch (error) {
//         console.error(error);
//         res.status(500).json({ message: "Internal Server Error" });
//     }
// };
