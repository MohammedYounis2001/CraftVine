const pool = require("../models/db");
const multer = require("multer");
const db = require("../models/db");
const path = require("path");

// Storage Image By Multer Start
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "images");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});
const addImage = multer({ storage: storage });
const imageProduct = addImage.single("image");
// Storage Image By Multer End

// Get All Products End
const allProducts = async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM products");
    const products = [];
    for (const product of result.rows) {
      const image_name = product.image_name;
      const image_url = `http://localhost:5000/images/${image_name}`;
      product.image_url = image_url;
      products.push(product);
    }
    if (products.length > 0) {
      res
        .status(200)
        .json({ message: "Get All Products Successfully", data: products });
    } else {
      res.status(404).json({ error: "No products found" });
    }
  } catch (error) {
    console.error("An error occurred while fetching products:", error);
    res
      .status(500)
      .json({ error: "An error occurred while fetching products" });
  }
};
// Get All Products End

// Get Product By ID For Details Page Start
const getBroductById = async (req, res) => {
  const product_id = parseInt(req.params.id);
  try {
    const result = await pool.query(
      "SELECT * FROM products WHERE product_id = $1",
      [product_id]
    );
    if (result.rows.length > 0) {
      const image_name = result.rows[0].image_name;
      const image_url = `http://localhost:5000/images/${image_name}`;
      result.rows[0].image_url = image_url;
      res
        .status(200)
        .json({ message: "Get Product By Id Successfully", data: result.rows });
    } else {
      res.status(404).json({ error: "Product not found" });
    }
  } catch (error) {
    res;
    console.error("An error occurred while fetching the product:", error);
    res
      .status(500)
      .json({ error: "An error occurred while fetching the product" });
  }
};
// Get Product By ID For Details Page End

// Add New Product Start
const addNewProduct = async (req, res) => {
  const {
    product_name,
    category,
    price,
    description,
    quantity,
    color,
    release_date,
  } = req.body;
  const image_name = req.file ? req.file.filename : null;
  const result = await pool.query(
    "INSERT INTO products (product_name, category, price, description, quantity, color, image_name, release_date) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)",
    [
      product_name,
      category,
      price,
      description,
      quantity,
      color,
      image_name,
      release_date,
    ],
    (error, result) => {
      if (result) {
        return result;
      } else {
        return error;
      }
    }
  );
  console.log(result);
  res.send("Add Product Seccessfully").json(result.rowCount);
};
// Add New Product End

// Update Product By ID For Details Page Start
const updateProductById = async (req, res) => {
  try {
    const product_id = parseInt(req.params.id);
    const image_name = req.file ? req.file.filename : null;
    const { product_name, category, price, description, quantity, color } =
      req.body;
    const query = `UPDATE products SET product_name = $1, category = $2, price = $3, description = $4, quantity = $5, color = $6, image_name = $7 WHERE product_id = $8`;
    const result = await pool.query(query, [
      product_name,
      category,
      price,
      description,
      quantity,
      color,
      image_name,
      product_id,
    ]);
    if (result.rowCount > 0) {
      res.status(200).json({ message: "Product updated successfully" });
    } else {
      res.status(404).json({ error: "Product not found" });
    }
  } catch (error) {
    console.error("An error occurred while updating the product:", error);
    res
      .status(500)
      .json({ error: "An error occurred while updating the product" });
  }
};
// Update Product By ID For Details Page End

// Delete Product By ID For Details Page Start
const deleteProductById = async (req, res) => {
  try {
    const product_id = parseInt(req.params.id);
    const query = `DELETE FROM products WHERE product_id = $1`;
    const result = await pool.query(query, [product_id]);
    if (result.rowCount > 0) {
      res.status(200).json({ message: "Product deleted successfully" });
    } else {
      res.status(404).json({ error: "Product not found" });
    }
  } catch (error) {
    console.error("An error occurred while deleting the product:", error);
    res
      .status(500)
      .json({ error: "An error occurred while deleting the product" });
  }
};
// Delete Product By ID For Details Page End

// Controller function to get products by discount percentage
const getProductsByDiscount = async (req, res) => {
  try {
    // const  discount_percent  = req.params;
    const discount_percent = parseInt(req.params.discount_percent);
    // Query the database to retrieve products with a discount percentage equal to or greater than the provided value
    const query = `
      SELECT * FROM  products
      WHERE discount_percentage >= $1
    `;

    const result = await db.query(query, [discount_percent]);
    console.log(discount_percent)
    if (result.rows.length > 0) {
      res.status(200).json(result.rows);
    } else {
      res
        .status(404)
        .json({
          message: "No products found with the specified discount percentage",
        });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Express route to get products with best_seller = true
const best_sellers = async (req, res) => {
  try {
    // Run an SQL query to select products with best_seller = true
    const selectQuery = `
      SELECT * FROM products
      WHERE best_seller = true
    `;

    const result = await db.query(selectQuery);

    if (result.rows.length > 0) {
      res.status(200).json(result.rows);
    } else {
      res.status(404).json({ message: "No best-selling products found" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = {
  addNewProduct,
  imageProduct,
  allProducts,
  getBroductById,
  updateProductById,
  deleteProductById,
  getProductsByDiscount,
  best_sellers,
};
