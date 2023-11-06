import React, { useState } from 'react';
import ProductForm from './ProductForm';

const Change = () => {
  // State to manage products and edit mode
  const [products, setProducts] = useState([]);
  const [isEditMode, setIsEditMode] = useState(false);
  const [editProductId, setEditProductId] = useState(null);

  // Function to handle form submission
  const handleFormSubmit = (formData) => {
    if (isEditMode) {
      // Logic to update existing product
      const updatedProducts = products.map((product) =>
        product.id === editProductId ? { ...product, ...formData } : product
      );
      setProducts(updatedProducts);
      setIsEditMode(false);
      setEditProductId(null);
    } else {
      // Logic to add new product
      const newProduct = {
        id: Date.now(), // Assign a unique ID (you can use a more robust method)
        ...formData,
      };
      setProducts([...products, newProduct]);
    }
  };

  // Function to handle product edit
  const handleEdit = (productId) => {
    const productToEdit = products.find((product) => product.id === productId);
    if (productToEdit) {
      setIsEditMode(true);
      setEditProductId(productId);
    }
  };

  return (
    <div>
      {/* Render ProductForm component and pass onSubmit and initialProduct props */}
      <ProductForm
        onSubmit={handleFormSubmit}
        initialProduct={isEditMode ? products.find((product) => product.id === editProductId) : null}
      />

      {/* Render list of products */}
      <ul>
        {products.map((product) => (
          <li key={product.id}>
            {product.productName} - {product.price} {/* Display other product details */}
            <button onClick={() => handleEdit(product.id)}>Edit</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Change;