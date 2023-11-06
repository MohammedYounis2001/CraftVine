import React, { useState, useEffect } from 'react';

const ProductForm = ({ isOpen, onSubmit, initialProduct, onClose }) => {
  const [formData, setFormData] = useState({
    productName: '',
    description: '',
    price: '',
    category: '',
    quantity: '',
    imageFile: null,
  });

  useEffect(() => {
    if (isOpen && initialProduct) {
      setFormData(initialProduct);
    }
  }, [isOpen, initialProduct]);

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'file' ? files[0] : value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
    setFormData({
      productName: '',
      description: '',
      price: '',
      category: '',
      quantity: '',
      imageFile: null,
    });
    onClose(); 
  };

  const inputStyle = {
    width: '100%',
    padding: '8px',
    marginBottom: '10px',
    border: '1px solid #ccc',
    borderRadius: '4px',
    fontSize: '14px',
  };

  const buttonStyle = {
    backgroundColor: '#0000FF',
    color: 'white',
    padding: '10px 20px',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '16px',
  };

  return (
    <div className={`modal ${isOpen ? 'visible' : 'hidden'}`}>
      <div className="modal-content">
        <button className="close-button" onClick={onClose}>
          Close
        </button>
        <form onSubmit={handleSubmit}>
          <label>
            Product Name:
            <input
              type="text"
              name="productName"
              value={formData.productName}
              onChange={handleChange}
              style={inputStyle}
              required
            />
          </label>
          <label>
            Description:
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              style={{ ...inputStyle, height: '100px' }}
              required
            />
          </label>
          <label>
            Price:
            <input
              type="number"
              name="price"
              value={formData.price}
              onChange={handleChange}
              style={inputStyle}
              step="0.01"
              required
            />
          </label>
          <label>
            Category:
            <input
              type="text"
              name="category"
              value={formData.category}
              onChange={handleChange}
              style={inputStyle}
              required
            />
          </label>
          <label>
            Quantity:
            <input
              type="number"
              name="quantity"
              value={formData.quantity}
              onChange={handleChange}
              style={inputStyle}
              required
            />
          </label>
          <label>
            Upload Image:
            <input
              type="file"
              name="imageFile"
              onChange={handleChange}
              style={inputStyle}
              accept="image/*"
              required
            />
          </label>
          <button type="submit" style={buttonStyle}>
            Add Product
          </button>
        </form>
      </div>
    </div>
  );
};

export default ProductForm;