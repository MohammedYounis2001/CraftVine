import React, { useState, useEffect } from 'react';
import ProductForm from '../ProductForm';
import ProductsTable from "../ProductsTable";
import axios from 'axios'


const ProductsList = () => {
    const [isFormOpen, setIsFormOpen] = useState(false);
  // State to manage products and edit mode
  const [products, setProducts] = useState([]);
  const [isEditMode, setIsEditMode] = useState(false);
  const [editProductId, setEditProductId] = useState(null);

  useEffect(() => {
    async function fetchProducts() {
      axios
        .get("http://localhost:5000/admin/all_product")
        .then((response) => {
          setProducts(response.data);
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    }
    fetchProducts();
  }, []);

  // Function to handle form submission
  const handleFormSubmit = (formData) => {
    if (isEditMode) {
      // Logic to update existing product
      const updatedProducts = products.map((product) =>
        product.id === editProductId ? { ...product, ...formData } : product
      );
      setProducts(updatedProducts);
      axios.post(`http://localhost:5000/admin/Update_Product_By_Id/${editProductId}`, formData)
      .then((response) => {
        handleCloseForm()
        setIsEditMode(false);
      setEditProductId(null);
    })
    .catch((error) => {
      console.error("Error:", error);
    });
      
    } else {
      // Logic to add new product
      const newProduct = {
        id: Date.now(), // Assign a unique ID (you can use a more robust method)
        ...formData,
      };
      setProducts([...products, newProduct]);
      axios.post("http://localhost:5000/admin/Add_New_product", formData)
    .then((response) => {
        handleCloseForm()
    })
    .catch((error) => {
      console.error("Error:", error);
    });
    }
  };

  // Function to handle product edit
  const handleEdit = (id) => {
    const productToEdit = products.find((product) => product.product_id === id);
    if (productToEdit) {
      setIsEditMode(true);
      setEditProductId(id);
    }
  };
  const handleCloseForm = () => {
    setIsFormOpen(false);
  };
  return (
    <div className="h-full">
      <div className="flex justify-center items-center">
        <div className="w-2/3 my-6 md:ml-24 px-10 py-5 rounded-lg">
          <button
          onClick={() => setIsFormOpen(true)}
           className={`${isFormOpen? 'hidden' : ''} w-auto py-2 px-3 bg-teal-600 text-white rounded-xl mt-2 flex items-end`}>
            Add New Product
          </button>
          <ProductForm
        isOpen={isFormOpen}
        initialProduct={products}
        onSubmit={handleFormSubmit}
        onClose={handleCloseForm}
      />
          <div className="w-full my-11">
            <ProductsTable handleEdit={handleEdit} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductsList;
