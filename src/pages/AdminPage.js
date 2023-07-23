import React, { useState, useEffect } from 'react';
import AdminProductForm from '../components/admin/ProductForm';
import AdminProductList from '../components/admin/ProductList';
import api from '../services/api';
import { useNavigate } from 'react-router-dom';
import './AdminPage.css';

const AdminPage = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem('token');
      console.log(token)
      const response = await api.get('/products', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setProducts(response.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddProduct = async (newProduct) => {
    try {
      const token = localStorage.getItem('token');
      const response = await api.post('/products', newProduct, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setProducts([...products, response.data]);
    } catch (error) {
      console.log(error);
    }
  };

  const handleUpdateProduct = async (product) => {
    try {
      const token = localStorage.getItem('token');
      const response = await api.put(`/products/${product._id}`, product, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const updatedProducts = products.map((p) =>
        p._id === product._id ? response.data : p
      );
      setProducts(updatedProducts);
    } catch (error) {
      console.log(error);
    }
  };

  const handleDeleteProduct = async (productId) => {
    try {
      const token = localStorage.getItem('token');
      await api.delete(`/products/${productId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const updatedProducts = products.filter((p) => p._id !== productId);
      setProducts(updatedProducts);
    } catch (error) {
      console.log(error);
    }
  };

  const handleLogout = () => {
    // Remove the token from local storage
    localStorage.removeItem('token');

    // Navigate back to the login page
    navigate('/login');
  };

  return (
    <div className="admin-page">
      <button className="logout-btn" onClick={handleLogout}>
        Logout
      </button>
      <div className="admin-form">
        <AdminProductForm onAddProduct={handleAddProduct} />
      </div>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="admin-list">
          <AdminProductList
            products={products}
            onUpdateProduct={handleUpdateProduct}
            onDeleteProduct={handleDeleteProduct}
          />
        </div>
      )}
    </div>
  );
};

export default AdminPage;
