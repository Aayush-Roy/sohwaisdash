// // src/pages/Products.jsx
// //just changes tha name
// import React, { useState, useEffect } from 'react';
// import {
//   Plus,
//   Search,
//   Filter,
//   Edit,
//   Trash2,
//   Eye,
//   EyeOff,
//   ChevronDown,
// } from 'lucide-react';
// import Table from '../components/common/Table';
// import Modal from '../components/common/Modal';
// import Button from '../components/common/Button';
// import Input from '../components/common/Input';
// import { products, categories } from '../data/products';

// const Products = () => {
//   const [productList, setProductList] = useState([]);
//   const [isAddModalOpen, setIsAddModalOpen] = useState(false);
//   const [isEditModalOpen, setIsEditModalOpen] = useState(false);
//   const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
//   const [selectedProduct, setSelectedProduct] = useState(null);
//   const [searchTerm, setSearchTerm] = useState('');
//   const [selectedCategory, setSelectedCategory] = useState('all');
//   const [selectedStatus, setSelectedStatus] = useState('all');

//   useEffect(() => {
//     setProductList(products);
//   }, []);

//   const columns = [
//     {
//       key: 'name',
//       title: 'Product',
//       render: (value, row) => (
//         <div className="flex items-center">
//           <img
//             src={row.images[0]}
//             alt={value}
//             className="h-10 w-10 rounded-lg object-cover"
//           />
//           <div className="ml-4">
//             <p className="font-medium text-gray-900 dark:text-white">{value}</p>
//             <p className="text-sm text-gray-500 dark:text-gray-400">{row.category}</p>
//           </div>
//         </div>
//       ),
//     },
//     { key: 'price', title: 'Price', render: (value) => `$${value}` },
//     {
//       key: 'stock',
//       title: 'Stock',
//       render: (value) => (
//         <span className={`px-2 py-1 rounded-full text-xs ${
//           value > 50 ? 'bg-green-100 text-green-800' :
//           value > 10 ? 'bg-yellow-100 text-yellow-800' :
//           'bg-red-100 text-red-800'
//         }`}>
//           {value} units
//         </span>
//       ),
//     },
//     {
//       key: 'status',
//       title: 'Status',
//       render: (value) => (
//         <span className={`px-2 py-1 rounded-full text-xs ${
//           value === 'Active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
//         }`}>
//           {value}
//         </span>
//       ),
//     },
//     {
//       key: 'actions',
//       title: 'Actions',
//       render: (_, row) => (
//         <div className="flex space-x-2">
//           <button
//             onClick={() => handleEdit(row)}
//             className="p-1 text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded"
//           >
//             <Edit size={16} />
//           </button>
//           <button
//             onClick={() => handleDelete(row)}
//             className="p-1 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded"
//           >
//             <Trash2 size={16} />
//           </button>
//           <button
//             onClick={() => handleToggleStatus(row)}
//             className="p-1 text-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700 rounded"
//           >
//             {row.status === 'Active' ? <EyeOff size={16} /> : <Eye size={16} />}
//           </button>
//         </div>
//       ),
//     },
//   ];

//   const handleEdit = (product) => {
//     setSelectedProduct(product);
//     setIsEditModalOpen(true);
//   };

//   const handleDelete = (product) => {
//     setSelectedProduct(product);
//     setIsDeleteModalOpen(true);
//   };

//   const handleToggleStatus = (product) => {
//     setProductList(prev => prev.map(p =>
//       p.id === product.id
//         ? { ...p, status: p.status === 'Active' ? 'Inactive' : 'Active' }
//         : p
//     ));
//   };

//   const handleConfirmDelete = () => {
//     setProductList(prev => prev.filter(p => p.id !== selectedProduct.id));
//     setIsDeleteModalOpen(false);
//     setSelectedProduct(null);
//   };

//   const filteredProducts = productList.filter(product => {
//     const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
//                          product.category.toLowerCase().includes(searchTerm.toLowerCase());
//     const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
//     const matchesStatus = selectedStatus === 'all' || product.status === selectedStatus;
//     return matchesSearch && matchesCategory && matchesStatus;
//   });

//   return (
//     <div className="space-y-6 font-royal tracking-wide">
//       {/* Header */}
//       <div className="flex  flex-col sm:flex-row sm:items-center sm:justify-between">
//         <div>
//           <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Products</h1>
//           <p className="text-gray-600 dark:text-gray-400">Manage your product inventory</p>
//         </div>
//         <Button
//           onClick={() => setIsAddModalOpen(true)}
//           className="mt-4 sm:mt-0 font-royal tracking-wide bg-royalBrown"
//         >
//           <Plus className="h-4 w-4 mr-2" />
//           Add Product
//         </Button>
//       </div>

//       {/* Filters */}
//       <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-4 border border-gray-200 dark:border-gray-700">
//         <div className="flex flex-col md:flex-row md:items-center md:space-x-4 space-y-4 md:space-y-0">
//           <div className="flex-1">
//             <div className="relative">
//               <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
//               <Input
//                 type="search"
//                 placeholder="Search products..."
//                 value={searchTerm}
//                 onChange={(e) => setSearchTerm(e.target.value)}
//                 className="pl-10 w-full"
//               />
//             </div>
//           </div>
          
//           <div className="flex space-x-4">
//             <div className="relative">
//               <select
//                 value={selectedCategory}
//                 onChange={(e) => setSelectedCategory(e.target.value)}
//                 className="appearance-none bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg pl-4 pr-10 py-2 text-sm focus:ring-2 focus:ring-primary-500 focus:border-transparent"
//               >
//                 <option value="all">All Categories</option>
//                 {categories.map(cat => (
//                   <option key={cat.id} value={cat.name}>{cat.name}</option>
//                 ))}
//               </select>
//               <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none" />
//             </div>

//             <div className="relative">
//               <select
//                 value={selectedStatus}
//                 onChange={(e) => setSelectedStatus(e.target.value)}
//                 className="appearance-none bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg pl-4 pr-10 py-2 text-sm focus:ring-2 focus:ring-primary-500 focus:border-transparent"
//               >
//                 <option value="all">All Status</option>
//                 <option value="Active">Active</option>
//                 <option value="Inactive">Inactive</option>
//               </select>
//               <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none" />
//             </div>

//             <Button variant="outline">
//               <Filter className="h-4 w-4 mr-2" />
//               More Filters
//             </Button>
//           </div>
//         </div>
//       </div>

//       {/* Products Table */}
//       <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
//         <Table columns={columns} data={filteredProducts} />
//       </div>

//       {/* Add Product Modal */}
//       <Modal
//         isOpen={isAddModalOpen}
//         onClose={() => setIsAddModalOpen(false)}
//         title="Add New Product"
//         size="xl"
//       >
//         <ProductForm onClose={() => setIsAddModalOpen(false)} />
//       </Modal>

//       {/* Edit Product Modal */}
//       <Modal
//         isOpen={isEditModalOpen}
//         onClose={() => setIsEditModalOpen(false)}
//         title="Edit Product"
//         size="xl"
//       >
//         <ProductForm
//           product={selectedProduct}
//           onClose={() => setIsEditModalOpen(false)}
//         />
//       </Modal>

//       {/* Delete Confirmation Modal */}
//       <Modal
//         isOpen={isDeleteModalOpen}
//         onClose={() => setIsDeleteModalOpen(false)}
//         title="Delete Product"
//         size="sm"
//       >
//         <div className="space-y-4">
//           <p className="text-gray-600 dark:text-gray-400">
//             Are you sure you want to delete "{selectedProduct?.name}"? This action cannot be undone.
//           </p>
//           <div className="flex justify-end space-x-3">
//             <Button variant="outline" onClick={() => setIsDeleteModalOpen(false)}>
//               Cancel
//             </Button>
//             <Button variant="danger" onClick={handleConfirmDelete}>
//               Delete
//             </Button>
//           </div>
//         </div>
//       </Modal>
//     </div>
//   );
// };

// // Product Form Component
// const ProductForm = ({ product, onClose }) => {
//   const [formData, setFormData] = useState({
//     name: product?.name || '',
//     category: product?.category || '',
//     price: product?.price || '',
//     discount: product?.discount || '',
//     stock: product?.stock || '',
//     status: product?.status || 'Active',
//     description: product?.description || '',
//   });

//   const [variants, setVariants] = useState(
//     product?.variants || [{ color: '#000000', size: 'S', price: '' }]
//   );

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     console.log('Product data:', { ...formData, variants });
//     onClose();
//   };

//   const handleVariantChange = (index, field, value) => {
//     const newVariants = [...variants];
//     newVariants[index][field] = value;
//     setVariants(newVariants);
//   };

//   const addVariant = () => {
//     setVariants([...variants, { color: '#000000', size: 'S', price: '' }]);
//   };

//   const removeVariant = (index) => {
//     setVariants(variants.filter((_, i) => i !== index));
//   };

//   return (
//     <form onSubmit={handleSubmit} className="space-y-6">
//       <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//         <Input
//           label="Product Name"
//           value={formData.name}
//           onChange={(e) => setFormData({ ...formData, name: e.target.value })}
//           required
//         />
        
//         <div>
//           <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
//             Category
//           </label>
//           <select
//             value={formData.category}
//             onChange={(e) => setFormData({ ...formData, category: e.target.value })}
//             className="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-transparent"
//             required
//           >
//             <option value="">Select category</option>
//             {categories.map(cat => (
//               <option key={cat.id} value={cat.name}>{cat.name}</option>
//             ))}
//           </select>
//         </div>

//         <Input
//           label="Price ($)"
//           type="number"
//           value={formData.price}
//           onChange={(e) => setFormData({ ...formData, price: e.target.value })}
//           required
//         />

//         <Input
//           label="Discount (%)"
//           type="number"
//           value={formData.discount}
//           onChange={(e) => setFormData({ ...formData, discount: e.target.value })}
//           min="0"
//           max="100"
//         />

//         <Input
//           label="Stock Quantity"
//           type="number"
//           value={formData.stock}
//           onChange={(e) => setFormData({ ...formData, stock: e.target.value })}
//           required
//         />

//         <div>
//           <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
//             Status
//           </label>
//           <select
//             value={formData.status}
//             onChange={(e) => setFormData({ ...formData, status: e.target.value })}
//             className="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-transparent"
//           >
//             <option value="Active">Active</option>
//             <option value="Inactive">Inactive</option>
//           </select>
//         </div>
//       </div>

//       {/* Variants Section */}
//       <div>
//         <div className="flex items-center justify-between mb-4">
//           <h4 className="text-sm font-medium text-gray-900 dark:text-white">Variants</h4>
//           <Button type="button" variant="outline" size="small" onClick={addVariant}>
//             Add Variant
//           </Button>
//         </div>
        
//         <div className="space-y-3">
//           {variants.map((variant, index) => (
//             <div key={index} className="flex items-center space-x-4 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
//               <div>
//                 <label className="text-xs text-gray-500 dark:text-gray-400">Color</label>
//                 <input
//                   type="color"
//                   value={variant.color}
//                   onChange={(e) => handleVariantChange(index, 'color', e.target.value)}
//                   className="w-10 h-10 cursor-pointer"
//                 />
//               </div>
              
//               <div className="flex-1">
//                 <label className="text-xs text-gray-500 dark:text-gray-400">Size</label>
//                 <select
//                   value={variant.size}
//                   onChange={(e) => handleVariantChange(index, 'size', e.target.value)}
//                   className="w-full border border-gray-300 dark:border-gray-600 rounded px-2 py-1 text-sm bg-white dark:bg-gray-800"
//                 >
//                   {['S', 'M', 'L', 'XL', 'XXL'].map(size => (
//                     <option key={size} value={size}>{size}</option>
//                   ))}
//                 </select>
//               </div>
              
//               <div className="flex-1">
//                 <label className="text-xs text-gray-500 dark:text-gray-400">Price ($)</label>
//                 <input
//                   type="number"
//                   value={variant.price}
//                   onChange={(e) => handleVariantChange(index, 'price', e.target.value)}
//                   className="w-full border border-gray-300 dark:border-gray-600 rounded px-2 py-1 text-sm"
//                 />
//               </div>
              
//               <button
//                 type="button"
//                 onClick={() => removeVariant(index)}
//                 className="text-red-600 hover:text-red-800 p-2"
//               >
//                 <Trash2 size={16} />
//               </button>
//             </div>
//           ))}
//         </div>
//       </div>

//       {/* Description */}
//       <div>
//         <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
//           Description
//         </label>
//         <textarea
//           value={formData.description}
//           onChange={(e) => setFormData({ ...formData, description: e.target.value })}
//           rows={4}
//           className="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-transparent"
//         />
//       </div>

//       {/* Image Upload */}
//       <div>
//         <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
//           Product Images
//         </label>
//         <div className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-6 text-center">
//           <div className="flex flex-col items-center">
//             <div className="h-12 w-12 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center mb-4">
//               <Plus className="h-6 w-6 text-gray-400" />
//             </div>
//             <p className="text-sm text-gray-600 dark:text-gray-400">
//               Drag & drop images here, or click to browse
//             </p>
//             <p className="text-xs text-gray-500 mt-2">
//               Supports JPG, PNG up to 5MB
//             </p>
//           </div>
//         </div>
//       </div>

//       {/* Form Actions */}
//       <div className="flex justify-end space-x-3 pt-6 border-t dark:border-gray-700">
//         <Button type="button" variant="outline" onClick={onClose}>
//           Cancel
//         </Button>
//         <Button type="submit">
//           {product ? 'Update Product' : 'Add Product'}
//         </Button>
//       </div>
//     </form>
//   );
// };

// export default Products;
// src/pages/Products.jsx
import React, { useState, useEffect } from 'react';
import {
  Plus,
  Search,
  Filter,
  Edit,
  Trash2,
  Eye,
  EyeOff,
  ChevronDown,
  Upload,
  X,
} from 'lucide-react';
import Table from '../components/common/Table';
import Modal from '../components/common/Modal';
import Button from '../components/common/Button';
import Input from '../components/common/Input';
import { categories } from '../data/products';

// API Base URL
const API_BASE_URL = "https://sohwais-be.onrender.com/api"; 
// 'http://localhost:5000/api';

const Products = () => {
  const [productList, setProductList] = useState([]);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch products from API
  const fetchProducts = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const response = await fetch(`${API_BASE_URL}/products`);
      console.log(response);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      
      if (data.success) {
        setProductList(data.data || []);
      } else {
        throw new Error(data.message || 'Failed to fetch products');
      }
    } catch (error) {
      console.error('Error fetching products:', error);
      setError(error.message);
      // Fallback to empty array
      setProductList([]);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const columns = [
    {
      key: 'name',
      title: 'Product',
      render: (value, row) => (
        <div className="flex items-center">
          {row.images && row.images.length > 0 ? (
            <img
              src={row.images[0].url}
              alt={value}
              className="h-10 w-10 rounded-lg object-cover"
            />
          ) : (
            <div className="h-10 w-10 rounded-lg bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
              <span className="text-xs text-gray-500">No Image</span>
            </div>
          )}
          <div className="ml-4">
            <p className="font-medium text-gray-900 dark:text-white">{value}</p>
            <p className="text-sm text-gray-500 dark:text-gray-400">{row.category}</p>
          </div>
        </div>
      ),
    },
    { 
      key: 'price', 
      title: 'Price', 
      render: (value, row) => (
        <div>
          <p className="font-medium">₹{value}</p>
          {row.discount > 0 && (
            <div className="flex items-center space-x-2 text-sm">
              <span className="text-green-600 font-medium">
                ₹{Math.round(value - (value * row.discount / 100))}
              </span>
              <span className="line-through text-gray-500">₹{value}</span>
              <span className="bg-red-100 text-red-800 px-1 py-0.5 rounded text-xs">
                {row.discount}% off
              </span>
            </div>
          )}
        </div>
      ) 
    },
    {
      key: 'stock',
      title: 'Stock',
      render: (value) => (
        <span className={`px-2 py-1 rounded-full text-xs ${
          value > 50 ? 'bg-green-100 text-green-800' :
          value > 10 ? 'bg-yellow-100 text-yellow-800' :
          'bg-red-100 text-red-800'
        }`}>
          {value} units
        </span>
      ),
    },
    {
      key: 'status',
      title: 'Status',
      render: (value) => (
        <span className={`px-2 py-1 rounded-full text-xs ${
          value === 'Active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
        }`}>
          {value}
        </span>
      ),
    },
    {
      key: 'variants',
      title: 'Variants',
      render: (value) => (
        <div className="flex flex-wrap gap-1">
          {value && value.length > 0 ? (
            value.slice(0, 2).map((variant, index) => (
              <span key={index} className="px-2 py-1 bg-gray-100 dark:bg-gray-700 rounded text-xs">
                {variant.size}
              </span>
            ))
          ) : (
            <span className="text-gray-500 text-sm">No variants</span>
          )}
          {value && value.length > 2 && (
            <span className="px-2 py-1 bg-gray-100 dark:bg-gray-700 rounded text-xs">
              +{value.length - 2} more
            </span>
          )}
        </div>
      ),
    },
    {
      key: 'actions',
      title: 'Actions',
      render: (_, row) => (
        <div className="flex space-x-2">
          <button
            onClick={() => handleEdit(row)}
            className="p-1 text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded"
            title="Edit"
          >
            <Edit size={16} />
          </button>
          <button
            onClick={() => handleDelete(row)}
            className="p-1 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded"
            title="Delete"
          >
            <Trash2 size={16} />
          </button>
          {/* <button
            onClick={() => handleToggleStatus(row)}
            className="p-1 text-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700 rounded"
            title={row.status === 'Active' ? 'Deactivate' : 'Activate'}
          >
            {row.status === 'Active' ? <EyeOff size={16} /> : <Eye size={16} />}
          </button> */}
        </div>
      ),
    },
  ];

  const handleEdit = (product) => {
    setSelectedProduct(product);
    setIsEditModalOpen(true);
  };

  const handleDelete = (product) => {
    setSelectedProduct(product);
    setIsDeleteModalOpen(true);
  };

  const handleToggleStatus = async (product) => {
    try {
      const newStatus = product.status === 'Active' ? 'Inactive' : 'Active';
      
      const response = await fetch(`${API_BASE_URL}/products/${product._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status: newStatus }),
      });

      if (!response.ok) {
        throw new Error('Failed to update status');
      }

      const data = await response.json();
      
      if (data.success) {
        // Update local state
        setProductList(prev => prev.map(p =>
          p._id === product._id
            ? { ...p, status: newStatus }
            : p
        ));
      } else {
        throw new Error(data.message || 'Failed to update status');
      }
    } catch (error) {
      console.error('Error updating status:', error);
      alert(`Failed to update status: ${error.message}`);
    }
  };

  const handleConfirmDelete = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/products/${selectedProduct._id}`, {
        method: 'DELETE',
      });
      console.log("del",response)

      if (!response.ok) {
        throw new Error('Failed to delete product');
      }

      const data = await response.json();
      
      if (data.success) {
        // Update local state
        setProductList(prev => prev.filter(p => p._id !== selectedProduct._id));
        setIsDeleteModalOpen(false);
        setSelectedProduct(null);
      } else {
        throw new Error(data.message || 'Failed to delete product');
      }
    } catch (error) {
      console.error('Error deleting product:', error);
      alert(`Failed to delete product: ${error.message}`);
    }
  };

  const filteredProducts = productList.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.category.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
    const matchesStatus = selectedStatus === 'all' || product.status === selectedStatus;
    return matchesSearch && matchesCategory && matchesStatus;
  });

  const handleProductAdded = () => {
    fetchProducts(); // Refresh the list
    setIsAddModalOpen(false);
  };

  const handleProductUpdated = () => {
    fetchProducts(); // Refresh the list
    setIsEditModalOpen(false);
  };

  return (
    <div className="space-y-6 font-royal tracking-wide">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Products</h1>
          <p className="text-gray-600 dark:text-gray-400">Manage your product inventory</p>
        </div>
        <Button
          onClick={() => setIsAddModalOpen(true)}
          className="mt-4 sm:mt-0 font-royal tracking-wide bg-royalBrown"
        >
          <Plus className="h-4 w-4 mr-2" />
          Add Product
        </Button>
      </div>

      {/* Loading and Error States */}
      {isLoading && (
        <div className="text-center py-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-2 text-gray-600">Loading products...</p>
        </div>
      )}

      {error && !isLoading && (
        <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <div className="h-5 w-5 text-red-400">⚠️</div>
            </div>
            <div className="ml-3">
              <h3 className="text-sm font-medium text-red-800 dark:text-red-200">Error loading products</h3>
              <div className="mt-2 text-sm text-red-700 dark:text-red-300">
                <p>{error}</p>
              </div>
              <div className="mt-4">
                <button
                  onClick={fetchProducts}
                  className="text-sm font-medium text-red-800 dark:text-red-200 hover:text-red-900"
                >
                  Try again
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Filters - Only show when not loading and no error */}
      {!isLoading && !error && (
        <>
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-4 border border-gray-200 dark:border-gray-700">
            <div className="flex flex-col md:flex-row md:items-center md:space-x-4 space-y-4 md:space-y-0">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    type="search"
                    placeholder="Search products..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 w-full"
                  />
                </div>
              </div>
              
              <div className="flex space-x-4">
                <div className="relative">
                  <select
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="appearance-none bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg pl-4 pr-10 py-2 text-sm focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  >
                    <option value="all">All Categories</option>
                    {categories.map(cat => (
                      <option key={cat.id} value={cat.name}>{cat.name}</option>
                    ))}
                  </select>
                  <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none" />
                </div>

                <div className="relative">
                  <select
                    value={selectedStatus}
                    onChange={(e) => setSelectedStatus(e.target.value)}
                    className="appearance-none bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg pl-4 pr-10 py-2 text-sm focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  >
                    <option value="all">All Status</option>
                    <option value="Active">Active</option>
                    <option value="Inactive">Inactive</option>
                  </select>
                  <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none" />
                </div>

                <Button variant="outline">
                  <Filter className="h-4 w-4 mr-2" />
                  More Filters
                </Button>
              </div>
            </div>
          </div>

          {/* Products Table */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
            {filteredProducts.length === 0 ? (
              <div className="text-center py-12">
                <div className="text-gray-400 dark:text-gray-500 mb-4">
                  <Search className="h-12 w-12 mx-auto" />
                </div>
                <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">No products found</h3>
                <p className="text-gray-500 dark:text-gray-400">
                  {searchTerm || selectedCategory !== 'all' || selectedStatus !== 'all'
                    ? 'Try changing your filters'
                    : 'Start by adding your first product'}
                </p>
              </div>
            ) : (
              <Table columns={columns} data={filteredProducts} />
            )}
          </div>
        </>
      )}

      {/* Add Product Modal */}
      <Modal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        title="Add New Product"
        size="xl"
      >
        <ProductForm 
          onClose={() => setIsAddModalOpen(false)}
          onSuccess={handleProductAdded}
        />
      </Modal>

      {/* Edit Product Modal */}
      <Modal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        title="Edit Product"
        size="xl"
      >
        <ProductForm
          product={selectedProduct}
          onClose={() => setIsEditModalOpen(false)}
          onSuccess={handleProductUpdated}
        />
      </Modal>

      {/* Delete Confirmation Modal */}
      <Modal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        title="Delete Product"
        size="sm"
      >
        <div className="space-y-4">
          <p className="text-gray-600 dark:text-gray-400">
            Are you sure you want to delete "{selectedProduct?.name}"? This action cannot be undone.
          </p>
          <div className="flex justify-end space-x-3">
            <Button variant="outline" onClick={() => setIsDeleteModalOpen(false)}>
              Cancel
            </Button>
            <Button variant="danger" onClick={handleConfirmDelete}>
              Delete
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

// Product Form Component
const ProductForm = ({ product, onClose, onSuccess }) => {
  const [formData, setFormData] = useState({
    name: product?.name || '',
    category: product?.category || '',
    price: product?.price || '',
    discount: product?.discount || 0,
    stock: product?.stock || '',
    status: product?.status || 'Active',
    description: product?.description || '',
    imageUrls: product?.images ? product.images.map(img => img.url) : [],
  });

  const [variants, setVariants] = useState(
    product?.variants || [{ color: '#000000', size: 'S', price: '' }]
  );

  const [imageFiles, setImageFiles] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      // Prepare form data for API
      const formDataToSend = new FormData();
      
      // Add text fields
      formDataToSend.append('name', formData.name);
      formDataToSend.append('category', formData.category);
      formDataToSend.append('price', formData.price);
      formDataToSend.append('discount', formData.discount);
      formDataToSend.append('stock', formData.stock);
      formDataToSend.append('status', formData.status);
      formDataToSend.append('description', formData.description);
      formDataToSend.append('variants', JSON.stringify(variants));
      
      // Add image URLs
      if (formData.imageUrls.length > 0) {
        formDataToSend.append('imageUrls', JSON.stringify(formData.imageUrls));
      }
      
      // Add image files
      imageFiles.forEach((file, index) => {
        formDataToSend.append('images', file);
      });

      // Determine API endpoint and method
      const url = product 
        ? `${API_BASE_URL}/products/${product._id}`
        : `${API_BASE_URL}/products`;
      
      const method = product ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method,
        body: formDataToSend,
        // Note: Don't set Content-Type header for FormData
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data.message || `Failed to ${product ? 'update' : 'create'} product`);
      }

      onSuccess();
      onClose();
    } catch (error) {
      console.error('Error saving product:', error);
      setError(error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleVariantChange = (index, field, value) => {
    const newVariants = [...variants];
    newVariants[index][field] = value;
    setVariants(newVariants);
  };

  const addVariant = () => {
    setVariants([...variants, { color: '#000000', size: 'S', price: '' }]);
  };

  const removeVariant = (index) => {
    setVariants(variants.filter((_, i) => i !== index));
  };

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    // Validate file types
    const validFiles = files.filter(file => 
      ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'].includes(file.type)
    );
    
    if (validFiles.length !== files.length) {
      alert('Only JPG, JPEG, PNG, and WebP files are allowed');
    }
    
    setImageFiles(prev => [...prev, ...validFiles]);
  };

  const removeImageFile = (index) => {
    setImageFiles(prev => prev.filter((_, i) => i !== index));
  };

  const removeImageUrl = (index) => {
    setFormData(prev => ({
      ...prev,
      imageUrls: prev.imageUrls.filter((_, i) => i !== index)
    }));
  };

  const addImageUrl = () => {
    const url = prompt('Enter image URL:');
    if (url && url.trim()) {
      setFormData(prev => ({
        ...prev,
        imageUrls: [...prev.imageUrls, url.trim()]
      }));
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {error && (
        <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4">
          <p className="text-red-700 dark:text-red-300 text-sm">{error}</p>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Input
          label="Product Name"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          required
          disabled={isSubmitting}
        />
        
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Category
          </label>
          <select
            value={formData.category}
            onChange={(e) => setFormData({ ...formData, category: e.target.value })}
            className="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            required
            disabled={isSubmitting}
          >
            <option value="">Select category</option>
            {categories.map(cat => (
              <option key={cat.id} value={cat.name}>{cat.name}</option>
            ))}
          </select>
        </div>

        <Input
          label="Price (₹)"
          type="number"
          value={formData.price}
          onChange={(e) => setFormData({ ...formData, price: e.target.value })}
          required
          min="0"
          step="0.01"
          disabled={isSubmitting}
        />

        <Input
          label="Discount (%)"
          type="number"
          value={formData.discount}
          onChange={(e) => setFormData({ ...formData, discount: e.target.value })}
          min="0"
          max="100"
          disabled={isSubmitting}
        />

        <Input
          label="Stock Quantity"
          type="number"
          value={formData.stock}
          onChange={(e) => setFormData({ ...formData, stock: e.target.value })}
          required
          min="0"
          disabled={isSubmitting}
        />

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Status
          </label>
          <select
            value={formData.status}
            onChange={(e) => setFormData({ ...formData, status: e.target.value })}
            className="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            disabled={isSubmitting}
          >
            <option value="Active">Active</option>
            <option value="Inactive">Inactive</option>
          </select>
        </div>
      </div>

      {/* Variants Section */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h4 className="text-sm font-medium text-gray-900 dark:text-white">Variants</h4>
          <Button 
            type="button" 
            variant="outline" 
            size="small" 
            onClick={addVariant}
            disabled={isSubmitting}
          >
            Add Variant
          </Button>
        </div>
        
        <div className="space-y-3">
          {variants.map((variant, index) => (
            <div key={index} className="flex items-center space-x-4 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
              <div>
                <label className="text-xs text-gray-500 dark:text-gray-400">Color</label>
                <input
                  type="color"
                  value={variant.color}
                  onChange={(e) => handleVariantChange(index, 'color', e.target.value)}
                  className="w-10 h-10 cursor-pointer"
                  disabled={isSubmitting}
                />
              </div>
              
              <div className="flex-1">
                <label className="text-xs text-gray-500 dark:text-gray-400">Size</label>
                <select
                  value={variant.size}
                  onChange={(e) => handleVariantChange(index, 'size', e.target.value)}
                  className="w-full border border-gray-300 dark:border-gray-600 rounded px-2 py-1 text-sm bg-white dark:bg-gray-800"
                  disabled={isSubmitting}
                >
                  {['S', 'M', 'L', 'XL', 'XXL'].map(size => (
                    <option key={size} value={size}>{size}</option>
                  ))}
                </select>
              </div>
              
              <div className="flex-1">
                <label className="text-xs text-gray-500 dark:text-gray-400">Price (₹)</label>
                <input
                  type="number"
                  value={variant.price}
                  onChange={(e) => handleVariantChange(index, 'price', e.target.value)}
                  className="w-full border border-gray-300 dark:border-gray-600 rounded px-2 py-1 text-sm"
                  min="0"
                  step="0.01"
                  required
                  disabled={isSubmitting}
                />
              </div>
              
              {variants.length > 1 && (
                <button
                  type="button"
                  onClick={() => removeVariant(index)}
                  className="text-red-600 hover:text-red-800 p-2"
                  disabled={isSubmitting}
                >
                  <Trash2 size={16} />
                </button>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Description */}
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Description
        </label>
        <textarea
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          rows={4}
          className="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          disabled={isSubmitting}
        />
      </div>

      {/* Image Upload Section */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Product Images
          </label>
          <Button
            type="button"
            variant="outline"
            size="small"
            onClick={addImageUrl}
            disabled={isSubmitting}
          >
            Add Image URL
          </Button>
        </div>
        
        {/* Image URLs */}
        {formData.imageUrls.length > 0 && (
          <div className="mb-4">
            <h5 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Image URLs</h5>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
              {formData.imageUrls.map((url, index) => (
                <div key={index} className="relative group">
                  <img
                    src={url}
                    alt={`Product ${index + 1}`}
                    className="h-24 w-full object-cover rounded-lg"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = 'https://via.placeholder.com/150?text=Image+Error';
                    }}
                  />
                  <button
                    type="button"
                    onClick={() => removeImageUrl(index)}
                    className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                    disabled={isSubmitting}
                  >
                    <X size={12} />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* File Upload */}
        <div className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-6">
          <div className="text-center">
            <Upload className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <input
              type="file"
              multiple
              accept="image/jpeg,image/jpg,image/png,image/webp"
              onChange={handleImageUpload}
              className="hidden"
              id="image-upload"
              disabled={isSubmitting}
            />
            <label
              htmlFor="image-upload"
              className="cursor-pointer bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 transition-colors inline-block mb-4"
            >
              {isSubmitting ? 'Uploading...' : 'Choose Files'}
            </label>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Drag & drop images here, or click to browse
            </p>
            <p className="text-xs text-gray-500 mt-2">
              Supports JPG, JPEG, PNG, WebP up to 5MB each
            </p>
          </div>
          
          {/* Preview Uploaded Files */}
          {imageFiles.length > 0 && (
            <div className="mt-6">
              <h5 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Uploaded Files</h5>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                {imageFiles.map((file, index) => (
                  <div key={index} className="relative group">
                    <img
                      src={URL.createObjectURL(file)}
                      alt={`Upload ${index + 1}`}
                      className="h-24 w-full object-cover rounded-lg"
                    />
                    <button
                      type="button"
                      onClick={() => removeImageFile(index)}
                      className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                      disabled={isSubmitting}
                    >
                      <X size={12} />
                    </button>
                    <p className="text-xs text-gray-500 truncate mt-1">{file.name}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
        
        <p className="text-xs text-gray-500 mt-2">
          {formData.imageUrls.length === 0 && imageFiles.length === 0
            ? '⚠️ At least one image (URL or file upload) is required'
            : `Total images: ${formData.imageUrls.length + imageFiles.length}`}
        </p>
      </div>

      {/* Form Actions */}
      <div className="flex justify-end space-x-3 pt-6 border-t dark:border-gray-700">
        <Button 
          type="button" 
          variant="outline" 
          onClick={onClose}
          disabled={isSubmitting}
        >
          Cancel
        </Button>
        <Button 
          type="submit" 
          disabled={isSubmitting || (formData.imageUrls.length === 0 && imageFiles.length === 0)}
        >
          {isSubmitting ? 'Saving...' : product ? 'Update Product' : 'Add Product'}
        </Button>
      </div>
    </form>
  );
};

export default Products;