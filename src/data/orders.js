// src/data/orders.js
export const orders = [
  {
    id: 'ORD-001',
    customerName: 'John Doe',
    email: 'john@example.com',
    products: [
      { name: 'Premium Headphones', quantity: 1, price: 299.99 },
    ],
    total: 299.99,
    paymentMethod: 'Credit Card',
    status: 'Pending',
    date: '2024-01-20',
    isNew: true,
  },
  // Add more orders...
];

export const orderStatuses = [
  { value: 'Pending', label: 'Pending', color: 'bg-yellow-100 text-yellow-800' },
  { value: 'Processing', label: 'Processing', color: 'bg-blue-100 text-blue-800' },
  { value: 'Shipped', label: 'Shipped', color: 'bg-purple-100 text-purple-800' },
  { value: 'Delivered', label: 'Delivered', color: 'bg-green-100 text-green-800' },
  { value: 'Cancelled', label: 'Cancelled', color: 'bg-red-100 text-red-800' },
];