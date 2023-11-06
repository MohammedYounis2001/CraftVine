const pool = require("../models/db");
const multer = require("multer");
const path = require("path");

// Storage Image By Multer Start
let lastFileSequence = 0;
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "productImages"); 
  },
  filename: (req, file, cb) => {
    lastFileSequence++;
    const newFileName = `${Date.now()}_${lastFileSequence}${path.extname(file.originalname)}`;
    cb(null, newFileName);
  }
});

const addImage = multer({ storage: storage });
const imageProduct = addImage.array("images", 3);
// Storage Image By Multer End

// Get All Products Start
const allProducts = async (req, res) => {
  try {
    const result = await pool.query(
      "SELECT p.product_id, p.product_name, p.category, p.price, p.description, p.quantity, p.release_date, pi.image_name, pi.product_color " +
      "FROM products p " +
      "LEFT JOIN product_images pi ON p.product_id = pi.product_id"
    );
    const products = result.rows.map((product) => {
      const image_name = product.image_name;
      const image_url = image_name ? `http://localhost:5000/productImages/${image_name}` : null;
      return {
        product_id: product.product_id,
        product_name: product.product_name,
        category: product.category,
        price: product.price,
        description: product.description,
        quantity: product.quantity,
        release_date: product.release_date,
        image_url: image_url,
        product_color: product.product_color,
      };
    });
    if (products.length > 0) {
      res.status(200).json({ message: "Get All Products Successfully", data: products });
    } else {
      res.status(404).json({ error: "No products found" });
    }
  } catch (error) {
    console.error("An error occurred while fetching products:", error);
    res.status(500).json({ error: "An error occurred while fetching products" });
  }
}
// Get All Products End

// Get Product By ID For Details Page Start
const getBroductById = async (req, res) => {
  const product_id = parseInt(req.params.id);
  try {
    const productQuery = "SELECT p.product_id, p.product_name, p.category, p.price, p.description, p.quantity, p.release_date, pi.image_id, pi.image_name, pi.product_color " +
      "FROM products p " +
      "LEFT JOIN product_images pi ON p.product_id = pi.product_id " +
      "WHERE p.product_id = $1";
    
    const productResult = await pool.query(productQuery, [product_id]);
    
    if (productResult.rows.length > 0) {
      const product = productResult.rows[0];
      const images = productResult.rows.map((image) => {
        const image_name = image.image_name;
        const image_url = image_name ? `http://localhost:5000/ProductImages/${image_name}` : null;
        return { 
          image_id: image.image_id, 
          image_name: image.image_name, 
          product_color: image.product_color, 
          image_url: image_url 
        };
      });
      
      const productJSON = JSON.stringify({
        product_id: product.product_id,
        product_name: product.product_name,
        category: product.category,
        price: product.price,
        description: product.description,
        quantity: product.quantity,
        release_date: product.release_date,
      });
      const imagesJSON = JSON.stringify(images);

      res.status(200).json({ message: "Get Product By Id Successfully", data: JSON.parse(productJSON), images: JSON.parse(imagesJSON) });
    } else {
      res.status(404).json({ error: "Product not found" });
    }
  } catch (error) {
    console.error('An error occurred while fetching the product:', error);
    res.status(500).json({ error: "An error occurred while fetching the product" });
  }
}
// Get Product By ID For Details Page End

// Get Product By Category Start
const getProductsByCategory = async (req, res) => {
  const category = req.params.category; 
  
  try {
    const productQuery = "SELECT p.product_id, p.product_name, p.category, p.price, p.description, p.quantity, p.release_date, pi.image_id, pi.image_name, pi.product_color " +
      "FROM products p " +
      "LEFT JOIN product_images pi ON p.product_id = pi.product_id " +
      "WHERE p.category = $1"; 
  
    const productResult = await pool.query(productQuery, [category]);
    
    if (productResult.rows.length > 0) {
      const products = productResult.rows.map((product) => {
        const images = productResult.rows.map((image) => {
          const image_name = image.image_name;
          const image_url = image_name ? `http://localhost:5000/ProductImages/${image_name}` : null;
          return { 
            image_id: image.image_id, 
            image_name: image.image_name, 
            product_color: image.product_color, 
            image_url: image_url 
          };
        });

        return {
          product_id: product.product_id,
          product_name: product.product_name,
          category: product.category,
          price: product.price,
          description: product.description,
          quantity: product.quantity,
          release_date: product.release_date,
          images: images
        };
      });

      res.status(200).json({ message: "Get Products By Category Successfully", data: products });
    } else {
      res.status(404).json({ error: "No products found in this category" });
    }
  } catch (error) {
    console.error('An error occurred while fetching the products:', error);
    res.status(500).json({ error: "An error occurred while fetching the products" });
  }
}
// Get Product By Category End

// Add New Product Start
const addNewProduct = async (req, res) => {
  let { product_name, category, price, description, quantity, release_date, colors } = req.body;
  const images = req.files;
  colors = colors.split(',').map(color => color.trim());
  try {
    const productInsertQuery = "INSERT INTO products (product_name, category, price, description, quantity, release_date) VALUES ($1, $2, $3, $4, $5, $6) RETURNING product_id";
    const productResult = await pool.query(productInsertQuery, [product_name, category, price, description, quantity, release_date]);
    if (productResult.rows.length > 0) {
      const product_id = productResult.rows[0].product_id;
      for (let i = 0; i < images.length; i++) {
        const image_name = images[i] ? images[i].filename : null;
        const color = colors[i];       
        const productImagesInsertQuery = "INSERT INTO product_images (product_id, image_name, product_color) VALUES ($1, $2, $3)";
        await pool.query(productImagesInsertQuery, [product_id, image_name, color]);
      } 
      res.status(200).json({ message: "Add Product Successfully", product_id });
    } else {
      res.status(500).json({ error: "An error occurred while adding the product" });
    }
  } catch (error) {
    console.error('An error occurred while adding the product:', error);
    res.status(500).json({ error: "An error occurred while adding the product" });
  }
}
// Add New Product End

// Update Product By ID Start
const updateProductById = async (req, res) => {
  try {
    const product_id = parseInt(req.params.id);
    const { product_name, category, price, description, quantity, release_date, } = req.body;
    const images = req.files;
    let colors = req.body.colors; 
    colors = colors.split(',').map(color => color.trim());
    // Update product details
    const updateQuery = `
      UPDATE products
      SET product_name = $1, category = $2, price = $3, description = $4, quantity = $5, release_date = $6
      WHERE product_id = $7
    `;
    const result = await pool.query(updateQuery, [product_name, category, price, description, quantity, release_date, product_id]);

    if (result.rowCount === 0) {
      return res.status(404).json({ error: "Product not found" });
    }

    // Update product images
    if (images) {
      for (let i = 0; i < images.length; i++) {
        const image = images[i];
        const image_name = image ? image.filename : null;
        const color = colors[i];
        // Check if a record already exists with the same product_id and product_color
        const checkQuery = `
          SELECT COUNT(*) FROM product_images
          WHERE product_id = $1 AND product_color = $2
        `;
        const checkResult = await pool.query(checkQuery, [product_id, color]);

        if (checkResult.rows[0].count > 0) {
          // If a record exists, update the image_name
          const updateImageQuery = `
            UPDATE product_images
            SET image_name = $1
            WHERE product_id = $2 AND product_color = $3
          `;
          await pool.query(updateImageQuery, [image_name, product_id, color]);
        } else {
          // If no record exists, insert a new one
          const insertImageQuery = `
            INSERT INTO product_images (product_id, image_name, product_color)
            VALUES ($1, $2, $3)
          `;
          await pool.query(insertImageQuery, [product_id, image_name, color]);
        }
      }
    }

    res.status(200).json({ message: "Product updated successfully" });
  } catch (error) {
    console.error("An error occurred while updating the product:", error);
    res.status(500).json({ error: "An error occurred while updating the product" });
  }
}
// Update Product By ID End

// Delete Product By ID Start
const deleteProductById = async (req, res) => {
  try {
    const product_id = parseInt(req.params.id);
    const deleteImagesQuery = "DELETE FROM product_images WHERE product_id = $1";
    const imagesResult = await pool.query(deleteImagesQuery, [product_id]);
    const deleteProductQuery = "DELETE FROM products WHERE product_id = $1";
    const productResult = await pool.query(deleteProductQuery, [product_id]);
    if (productResult.rowCount > 0) {
      res.status(200).json({ message: "Product and related images deleted successfully" });
    } else {
      res.status(404).json({ error: "Product not found" });
    }
  } catch (error) {
    console.error("An error occurred while deleting the product:", error);
    res.status(500).json({ error: "An error occurred while deleting the product" });
  }
}
// Delete Product By ID End

module.exports = {
  allProducts,
  getBroductById,
  addNewProduct,
  imageProduct,
  updateProductById,
  deleteProductById,
  getProductsByCategory
}




