// src/data/products.js
export const products = [
  {
    id: '1',
    name: 'Premium Wireless Headphones',
    category: 'Electronics',
    price: 299.99,
    discount: 15,
    stock: 45,
    status: 'Active',
    images: ['https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400'],
    variants: [
      { color: '#000000', size: 'M', price: 299.99 },
      { color: '#ffffff', size: 'L', price: 319.99 },
    ],
    description: 'Noise-cancelling wireless headphones with premium sound quality.',
    createdAt: '2024-01-15',
  },
  // Add more products...
];

export const categories = [
  { id: '1', name: 'Electronics', productCount: 45, status: 'Active' },
  { id: '2', name: 'Clothing', productCount: 120, status: 'Active' },
  { id: '3', name: 'Home & Kitchen', productCount: 78, status: 'Active' },
  { id: '4', name: 'Books', productCount: 230, status: 'Active' },
  { id: '5', name: 'Sports', productCount: 56, status: 'Inactive' },
];