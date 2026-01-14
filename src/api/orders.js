// src/api/orders.js
import axios from 'axios';

// Base URL setup
const API_BASE_URL = 'http://localhost:5000/api';

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const orderAPI = {
  // Get all orders
  getAllOrders: async () => {
    try {
      const response = await apiClient.get('/orders/all-orders');
      return response.data;
    } catch (error) {
      console.error('Error fetching orders:', error);
      throw error;
    }
  },

  // Get order details by ID
  getOrderDetails: async (orderId) => {
    try {
      const response = await apiClient.get(`/orders/${orderId}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching order details:', error);
      throw error;
    }
  },

  // Get user orders by email/phone
  getUserOrders: async (identifier) => {
    try {
      const response = await apiClient.get(`/orders/user/${identifier}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching user orders:', error);
      throw error;
    }
  },

  // Create new order
  createOrder: async (orderData) => {
    try {
      const response = await apiClient.post('/orders/create-order', orderData);
      return response.data;
    } catch (error) {
      console.error('Error creating order:', error);
      throw error;
    }
  },

  // Verify payment
  verifyPayment: async (paymentData) => {
    try {
      const response = await apiClient.post('/orders/verify-payment', paymentData);
      return response.data;
    } catch (error) {
      console.error('Error verifying payment:', error);
      throw error;
    }
  },
};