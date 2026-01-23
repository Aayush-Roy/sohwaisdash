
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
   Tag,
   Grid,
   Layers,
 } from 'lucide-react';
 import Table from '../components/common/Table';
 import Modal from '../components/common/Modal';
 import Button from '../components/common/Button';
 import Input from '../components/common/Input';
 import Select from '../components/common/Select';

// API Base URL
const API_BASE_URL = "https://api.sohwais.com/api";
//  ""; 
// const API_BASE_URL = "http://srv1272370.hstgr.cloud:5000/api";
// '';

const Products = () => {
  const [productList, setProductList] = useState([]);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedCollection, setSelectedCollection] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [collections, setCollections] = useState([]);
  const [categories, setCategories] = useState({});
  console.log(categories);
console.log("prod", productList);
  // Fetch collections and categories
  const fetchCollectionsAndCategories = async () => {
    try {
      const [collectionsRes, categoriesRes] = await Promise.all([
        fetch(`${API_BASE_URL}/products/collections`),
        fetch(`${API_BASE_URL}/products/categories`)
      ]);
      
      if (collectionsRes.ok) {
        const collectionsData = await collectionsRes.json();
        if (collectionsData.success) {
          setCollections(collectionsData.data || []);
        }
      }
      
      if (categoriesRes.ok) {
        const categoriesData = await categoriesRes.json();
        console.log(categoriesData)
        if (categoriesData.success) {
          setCategories(categoriesData.data || {});
        }
      }
    } catch (error) {
      console.error('Error fetching collections/categories:', error);
    }
  };

  // const getdata = async()=>{
  //   const response = await fetch(`${API_BASE_URL}/products`);
  //     console.log("r--",response);

  // }
  // useEffect(()=>{
  //   getdata();
  // },[])

  // Fetch products from API
  const fetchProducts = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const response = await fetch(`${API_BASE_URL}/products?limit=100`);
      
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      console.log("data",data);
      
      if (data.success) {
        setProductList(data.data || []);
      } else {
        throw new Error(data.message || 'Failed to fetch products');
      }
    } catch (error) {
      console.error('Error fetching products:', error);
      setError(error.message);
      setProductList([]);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchCollectionsAndCategories();
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
              src={row.images.find(img => img.isPrimary)?.url || row.images[0].url}
              alt={value}
              className="h-12 w-12 rounded-lg object-cover"
            />
          ) : (
            <div className="h-12 w-12 rounded-lg bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
              <span className="text-xs text-gray-500">No Image</span>
            </div>
          )}
          <div className="ml-4">
            <p className="font-medium text-gray-900 dark:text-white">{value}</p>
            <div className="flex items-center space-x-2 mt-1">
              <span className="text-xs px-2 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded-full">
                {row.collection}
              </span>
              <span className="text-xs px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 rounded-full">
                {row.subCategory}
              </span>
            </div>
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
              <span className="bg-red-100 text-red-800 px-2 py-0.5 rounded text-xs">
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
        <span className={`px-3 py-1 rounded-full text-xs font-medium ${
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
        <span className={`px-3 py-1 rounded-full text-xs font-medium ${
          value === 'Active' ? 'bg-green-100 text-green-800' : 
          value === 'Inactive' ? 'bg-red-100 text-red-800' :
          value === 'Out of Stock' ? 'bg-orange-100 text-orange-800' :
          'bg-blue-100 text-blue-800'
        }`}>
          {value}
        </span>
      ),
    },
    {
      key: 'category',
      title: 'Category',
      render: (value) => (
        <span className={`px-3 py-1 rounded-full text-xs font-medium ${
          value === 'Men' ? 'bg-blue-100 text-blue-800' :
          value === 'Women' ? 'bg-pink-100 text-pink-800' :
          'bg-purple-100 text-purple-800'
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
            <>
              {value.slice(0, 2).map((variant, index) => (
                <div key={index} className="flex items-center space-x-1">
                  <div 
                    className="w-3 h-3 rounded-full border"
                    style={{ backgroundColor: variant.color }}
                  />
                  <span className="text-xs text-gray-600 dark:text-gray-300">{variant.size}</span>
                </div>
              ))}
              {value.length > 2 && (
                <span className="text-xs text-gray-500">+{value.length - 2} more</span>
              )}
            </>
          ) : (
            <span className="text-gray-500 text-sm">No variants</span>
          )}
        </div>
      ),
    },
    {
      key: 'actions',
      title: 'Actions',
      render: (_, row) => (
        <div className="flex space-x-1">
          <button
            onClick={() => handleEdit(row)}
            className="p-2 text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition-colors"
            title="Edit"
          >
            <Edit size={16} />
          </button>
          <button
            onClick={() => handleDelete(row)}
            className="p-2 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
            title="Delete"
          >
            <Trash2 size={16} />
          </button>
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

      if (!response.ok) throw new Error('Failed to update status');

      const data = await response.json();
      
      if (data.success) {
        setProductList(prev => prev.map(p =>
          p._id === product._id ? { ...p, status: newStatus } : p
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

      if (!response.ok) throw new Error('Failed to delete product');

      const data = await response.json();
      
      if (data.success) {
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
                         product.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.tags?.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
    const matchesCollection = selectedCollection === 'all' || product.collection === selectedCollection;
    const matchesStatus = selectedStatus === 'all' || product.status === selectedStatus;
    return matchesSearch && matchesCategory && matchesCollection && matchesStatus;
  });

  const handleProductAdded = () => {
    fetchProducts();
    setIsAddModalOpen(false);
  };

  const handleProductUpdated = () => {
    fetchProducts();
    setIsEditModalOpen(false);
  };

  // Get unique categories from products
  const uniqueCategories = ['all', ...new Set(productList.map(p => p.category))];
  // Get unique collections from products
  const uniqueCollections = ['all', ...new Set(productList.map(p => p.collection))];

  return (
    <div className="space-y-6 font-royal tracking-wide">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Products</h1>
          <p className="text-gray-600 dark:text-gray-400">Manage your traditional clothing products</p>
        </div>
        <div className="flex space-x-3 mt-4 sm:mt-0">
          {/* <Button
            variant="outline"
            onClick={() => window.open('/collections', '_blank')}
            className="font-royal tracking-wide"
          >
           
            <Layers className="h-4 w-4 mr-2" />
            
            View Collections
          </Button> */}
          <Button
            onClick={() => setIsAddModalOpen(true)}
            className="font-royal tracking-wide bg-royalBrown hover:bg-royalBrown/90"
          >
            <Plus className="h-4 w-4 mr-2" />
            Add Product
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 border border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Total Products</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white mt-2">{productList.length}</p>
            </div>
            <div className="p-3 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
              <Grid className="h-6 w-6 text-blue-600 dark:text-blue-400" />
            </div>
          </div>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 border border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Men's Wear</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white mt-2">
                {productList.filter(p => p.category === 'Men').length}
              </p>
            </div>
            <div className="p-3 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
              <span className="text-lg font-semibold text-blue-600 dark:text-blue-400">♂</span>
            </div>
          </div>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 border border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Women's Wear</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white mt-2">
                {productList.filter(p => p.category === 'Women').length}
              </p>
            </div>
            <div className="p-3 bg-pink-100 dark:bg-pink-900/30 rounded-lg">
              <span className="text-lg font-semibold text-pink-600 dark:text-pink-400">♀</span>
            </div>
          </div>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 border border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Active Products</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white mt-2">
                {productList.filter(p => p.status === 'Active').length}
              </p>
            </div>
            <div className="p-3 bg-green-100 dark:bg-green-900/30 rounded-lg">
              <Eye className="h-6 w-6 text-green-600 dark:text-green-400" />
            </div>
          </div>
        </div>
      </div>

      {/* Loading and Error States */}
      {isLoading && (
        <div className="text-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-royalBrown mx-auto"></div>
          <p className="mt-4 text-gray-600 dark:text-gray-400">Loading products...</p>
        </div>
      )}

      {error && !isLoading && (
        <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl p-6">
          <div className="flex items-start">
            <div className="flex-shrink-0">
              <div className="h-6 w-6 text-red-400">⚠️</div>
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
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 border border-gray-200 dark:border-gray-700">
            <div className="flex flex-col lg:flex-row lg:items-center lg:space-x-6 space-y-6 lg:space-y-0">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <Input
                    type="search"
                    placeholder="Search products by name, description, or tags..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-12 w-full text-lg"
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="relative">
                  <select
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="w-full appearance-none bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg pl-4 pr-10 py-3 text-sm focus:ring-2 focus:ring-royalBrown focus:border-transparent"
                  >
                    <option value="all">All Categories</option>
                    <option value="Men">Men's Wear</option>
                    <option value="Women">Women's Wear</option>
                    <option value="Unisex">Unisex</option>
                  </select>
                  <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none" />
                </div>

                <div className="relative">
                  <select
                    value={selectedCollection}
                    onChange={(e) => setSelectedCollection(e.target.value)}
                    className="w-full appearance-none bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg pl-4 pr-10 py-3 text-sm focus:ring-2 focus:ring-royalBrown focus:border-transparent"
                  >
                    <option value="all">All Collections</option>
                    {uniqueCollections.filter(c => c !== 'all').map(collection => (
                      <option key={collection} value={collection}>{collection}</option>
                    ))}
                  </select>
                  <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none" />
                </div>

                <div className="relative">
                  <select
                    value={selectedStatus}
                    onChange={(e) => setSelectedStatus(e.target.value)}
                    className="w-full appearance-none bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg pl-4 pr-10 py-3 text-sm focus:ring-2 focus:ring-royalBrown focus:border-transparent"
                  >
                    <option value="all">All Status</option>
                    <option value="Active">Active</option>
                    <option value="Inactive">Inactive</option>
                    <option value="Out of Stock">Out of Stock</option>
                    <option value="Coming Soon">Coming Soon</option>
                  </select>
                  <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none" />
                </div>
              </div>
            </div>
          </div>

          {/* Products Table */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
            {filteredProducts.length === 0 ? (
              <div className="text-center py-16">
                <div className="text-gray-400 dark:text-gray-500 mb-6">
                  <Search className="h-16 w-16 mx-auto" />
                </div>
                <h3 className="text-xl font-medium text-gray-900 dark:text-white mb-3">No products found</h3>
                <p className="text-gray-500 dark:text-gray-400 mb-6 max-w-md mx-auto">
                  {searchTerm || selectedCategory !== 'all' || selectedCollection !== 'all' || selectedStatus !== 'all'
                    ? 'Try changing your filters or search term'
                    : 'Start by adding your first traditional clothing product'}
                </p>
                <Button onClick={() => setIsAddModalOpen(true)} className="bg-royalBrown">
                  <Plus className="h-4 w-4 mr-2" />
                  Add First Product
                </Button>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <Table columns={columns} data={filteredProducts} />
              </div>
            )}
          </div>
        </>
      )}

      {/* Add Product Modal */}
      <Modal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        title="Add New Traditional Product"
        size="2xl"
      >
        <ProductForm 
          collections={collections}
          categories={categories}
          onClose={() => setIsAddModalOpen(false)}
          onSuccess={handleProductAdded}
        />
      </Modal>

      {/* Edit Product Modal */}
      <Modal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        title="Edit Product"
        size="2xl"
      >
        <ProductForm
          product={selectedProduct}
          collections={collections}
          categories={categories}
          onClose={() => setIsEditModalOpen(false)}
          onSuccess={handleProductUpdated}
        />
      </Modal>

      {/* Delete Confirmation Modal */}
      <Modal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        title="Delete Product"
        size="md"
      >
        <div className="space-y-6">
          <div className="flex items-center space-x-4">
            {selectedProduct?.images?.[0] && (
              <img
                src={selectedProduct.images[0].url}
                alt={selectedProduct?.name}
                className="h-20 w-20 rounded-lg object-cover"
              />
            )}
            <div>
              <h4 className="font-medium text-gray-900 dark:text-white">{selectedProduct?.name}</h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {selectedProduct?.collection} • {selectedProduct?.category}
              </p>
            </div>
          </div>
          <p className="text-gray-600 dark:text-gray-400">
            Are you sure you want to delete this product? This action cannot be undone and all associated images will be removed from storage.
          </p>
          <div className="flex justify-end space-x-3 pt-4 border-t dark:border-gray-700">
            <Button variant="outline" onClick={() => setIsDeleteModalOpen(false)}>
              Cancel
            </Button>
            <Button variant="danger" onClick={handleConfirmDelete}>
              <Trash2 className="h-4 w-4 mr-2" />
              Delete Product
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

// Product Form Component
const ProductForm = ({ product, collections, categories, onClose, onSuccess }) => {
  const [formData, setFormData] = useState({
    name: product?.name || '',
    category: product?.category || '',
    collection: product?.collection || '',
    subCategory: product?.subCategory || '',
    price: product?.price || '',
    discount: product?.discount || 0,
    stock: product?.stock || '',
    status: product?.status || 'Active',
    description: product?.description || '',
    features: product?.features || [],
    tags: product?.tags || [],
    imageUrls: product?.images ? product.images.map(img => img.url) : [],
  });

  const [variants, setVariants] = useState(
    product?.variants || [{ color: '#000000', size: 'S', price: '' }]
  );

  const [imageFiles, setImageFiles] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [newFeature, setNewFeature] = useState('');
  const [newTag, setNewTag] = useState('');
const [imagesToRemove, setImagesToRemove] = useState([]);

  // Get subcategories based on selected category
  const subCategories = categories[formData.category] || [];
  console.log(subCategories);
  const handleRemoveExistingImage = (url, index) => {
  // Extract public_id from cloudinary URL
  const publicIdMatch = url.match(/upload\/(?:v\d+\/)?([^\.]+)/);
  const public_id = publicIdMatch ? publicIdMatch[1] : null;

  if (public_id) {
    setImagesToRemove(prev => [...prev, public_id]);
  }

  // Remove from UI instantly
  setFormData(prev => ({
    ...prev,
    imageUrls: prev.imageUrls.filter((_, i) => i !== index)
  }));
};

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');

    try {
      // Validate required fields
      if (!formData.collection) {
        throw new Error('Please select a collection');
      }
      if (!formData.subCategory) {
        throw new Error('Please select a sub-category');
      }

      // Prepare form data for API
      const formDataToSend = new FormData();
      
      // Add text fields
      formDataToSend.append('name', formData.name);
      formDataToSend.append('category', formData.category);
      formDataToSend.append('collection', formData.collection);
      formDataToSend.append('subCategory', formData.subCategory);
      formDataToSend.append('price', formData.price);
      formDataToSend.append('discount', formData.discount);
      formDataToSend.append('stock', formData.stock);
      formDataToSend.append('status', formData.status);
      formDataToSend.append('description', formData.description);
      formDataToSend.append('features', JSON.stringify(formData.features));
      formDataToSend.append('tags', JSON.stringify(formData.tags));
      formDataToSend.append('variants', JSON.stringify(variants.filter(v => v.price)));
      
      // Add image URLs
      // if (formData.imageUrls.length > 0) {
      //   formDataToSend.append('imageUrls', JSON.stringify(formData.imageUrls));
      // }
      // ✅ imageUrls sirf CREATE ke time bhejo
if (!product && formData.imageUrls.length > 0) {
  formDataToSend.append(
    'imageUrls',
    JSON.stringify(formData.imageUrls)
  );
}

      // Add image files
      imageFiles.forEach((file) => {
        formDataToSend.append('images', file);
      });

      // ⭐ SEND imagesToRemove to backend in EDIT mode
if (product && imagesToRemove.length > 0) {
  formDataToSend.append(
    'imagesToRemove',
    JSON.stringify(imagesToRemove)
  );
}

      // Determine API endpoint and method
      const url = product 
        ? `${API_BASE_URL}/products/${product._id}`
        : `${API_BASE_URL}/products`;
      
      const method = product ? 'PUT' : 'POST';
      console.log(method);

      const response = await fetch(url, {
        method,
        body: formDataToSend,
      });
      console.log(response);

      const data = await response.json();
      console.log("data", data);
      if (!response.ok || !data.success) {
        throw new Error(data.message || data.errors?.[0] || `Failed to ${product ? 'update' : 'create'} product`);
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
    if (variants.length > 1) {
      setVariants(variants.filter((_, i) => i !== index));
    }
  };

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
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

  const addFeature = () => {
    if (newFeature.trim()) {
      setFormData(prev => ({
        ...prev,
        features: [...prev.features, newFeature.trim()]
      }));
      setNewFeature('');
    }
  };

  const removeFeature = (index) => {
    setFormData(prev => ({
      ...prev,
      features: prev.features.filter((_, i) => i !== index)
    }));
  };

  const addTag = () => {
    if (newTag.trim()) {
      setFormData(prev => ({
        ...prev,
        tags: [...prev.tags, newTag.trim()]
      }));
      setNewTag('');
    }
  };

  const removeTag = (index) => {
    setFormData(prev => ({
      ...prev,
      tags: prev.tags.filter((_, i) => i !== index)
    }));
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
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
            Main Category *
          </label>
          <select
            value={formData.category}
            onChange={(e) => setFormData({ 
              ...formData, 
              category: e.target.value,
              subCategory: '' // Reset subcategory when category changes
            })}
            className="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2.5 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-royalBrown focus:border-transparent"
            required
            disabled={isSubmitting}
          >
            <option value="">Select main category</option>
            {Object.keys(categories).map(cat => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Sub-Category *
          </label>
          <select
            value={formData.subCategory}
            onChange={(e) => setFormData({ ...formData, subCategory: e.target.value })}
            className="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2.5 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-royalBrown focus:border-transparent"
            required
            disabled={isSubmitting || !formData.category}
          >
            <option value="">Select sub-category</option>
            {subCategories.map(subCat => (
              <option key={subCat} value={subCat}>{subCat}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Collection *
          </label>
          <select
            value={formData.collection}
            onChange={(e) => setFormData({ ...formData, collection: e.target.value })}
            className="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2.5 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-royalBrown focus:border-transparent"
            required
            disabled={isSubmitting}
          >
            <option value="">Select collection</option>
            {collections.map(collection => (
              <option key={collection} value={collection}>{collection}</option>
            ))}
          </select>
        </div>

        <Input
          label="Price (₹) *"
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
          label="Stock Quantity *"
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
            className="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2.5 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-royalBrown focus:border-transparent"
            disabled={isSubmitting}
          >
            <option value="Active">Active</option>
            <option value="Inactive">Inactive</option>
            <option value="Out of Stock">Out of Stock</option>
            <option value="Coming Soon">Coming Soon</option>
          </select>
        </div>
      </div>

      {/* Description */}
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Description *
        </label>
        <textarea
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          rows={4}
          className="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2.5 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-royalBrown focus:border-transparent"
          required
          disabled={isSubmitting}
          placeholder="Describe the product in detail..."
        />
      </div>

      {/* Features */}
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Product Features
        </label>
        <div className="flex gap-2 mb-3">
          <input
            type="text"
            value={newFeature}
            onChange={(e) => setNewFeature(e.target.value)}
            className="flex-1 border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 bg-white dark:bg-gray-800"
            placeholder="Add a feature (e.g., 100% Cotton, Hand Embroidered)"
            disabled={isSubmitting}
            onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addFeature())}
          />
          <Button 
            type="button" 
            onClick={addFeature}
            variant="outline"
            disabled={isSubmitting || !newFeature.trim()}
          >
            Add
          </Button>
        </div>
        <div className="flex flex-wrap gap-2">
          {formData.features.map((feature, index) => (
            <span key={index} className="inline-flex items-center px-3 py-1.5 rounded-full text-sm bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200">
              {feature}
              <button
                type="button"
                onClick={() => removeFeature(index)}
                className="ml-2 text-blue-600 hover:text-blue-800"
                disabled={isSubmitting}
              >
                <X size={14} />
              </button>
            </span>
          ))}
        </div>
      </div>

      {/* Tags */}
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Tags
        </label>
        <div className="flex gap-2 mb-3">
          <input
            type="text"
            value={newTag}
            onChange={(e) => setNewTag(e.target.value)}
            className="flex-1 border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 bg-white dark:bg-gray-800"
            placeholder="Add a tag (e.g., Traditional, Wedding, Handmade)"
            disabled={isSubmitting}
            onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addTag())}
          />
          <Button 
            type="button" 
            onClick={addTag}
            variant="outline"
            disabled={isSubmitting || !newTag.trim()}
          >
            Add
          </Button>
        </div>
        <div className="flex flex-wrap gap-2">
          {formData.tags.map((tag, index) => (
            <span key={index} className="inline-flex items-center px-3 py-1.5 rounded-full text-sm bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200">
              <Tag size={12} className="mr-1" />
              {tag}
              <button
                type="button"
                onClick={() => removeTag(index)}
                className="ml-2 text-gray-600 hover:text-gray-800"
                disabled={isSubmitting}
              >
                <X size={14} />
              </button>
            </span>
          ))}
        </div>
      </div>

      {/* Variants Section */}
      <div className="border-t dark:border-gray-700 pt-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h4 className="text-sm font-medium text-gray-900 dark:text-white">Product Variants</h4>
            <p className="text-sm text-gray-500 dark:text-gray-400">Add different sizes and colors</p>
          </div>
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
        
        <div className="space-y-4">
          {variants.map((variant, index) => (
            <div key={index} className="grid grid-cols-1 md:grid-cols-12 gap-4 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
              <div className="md:col-span-2">
                <label className="text-xs text-gray-500 dark:text-gray-400 block mb-1">Color</label>
                <div className="flex items-center space-x-3">
                  <input
                    type="color"
                    value={variant.color}
                    onChange={(e) => handleVariantChange(index, 'color', e.target.value)}
                    className="w-10 h-10 cursor-pointer rounded border border-gray-300"
                    disabled={isSubmitting}
                  />
                  <span className="text-sm text-gray-600">{variant.color}</span>
                </div>
              </div>
              
              <div className="md:col-span-3">
                <label className="text-xs text-gray-500 dark:text-gray-400 block mb-1">Size *</label>
                <select
                  value={variant.size}
                  onChange={(e) => handleVariantChange(index, 'size', e.target.value)}
                  className="w-full border border-gray-300 dark:border-gray-600 rounded px-3 py-2 text-sm bg-white dark:bg-gray-800"
                  required
                  disabled={isSubmitting}
                >
                  <option value="">Select size</option>
                  {['XS', 'S', 'M', 'L', 'XL', 'XXL', 'XXXL', 'Free Size', 'Custom'].map(size => (
                    <option key={size} value={size}>{size}</option>
                  ))}
                </select>
              </div>
              
              <div className="md:col-span-4">
                <label className="text-xs text-gray-500 dark:text-gray-400 block mb-1">Price (₹) *</label>
                <input
                  type="number"
                  value={variant.price}
                  onChange={(e) => handleVariantChange(index, 'price', e.target.value)}
                  className="w-full border border-gray-300 dark:border-gray-600 rounded px-3 py-2 text-sm"
                  min="0"
                  step="0.01"
                  required
                  placeholder="Variant price"
                  disabled={isSubmitting}
                />
              </div>
              
              <div className="md:col-span-3 flex items-end space-x-2">
                {variants.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeVariant(index)}
                    className="p-2 text-red-600 hover:text-red-800 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
                    disabled={isSubmitting}
                  >
                    <Trash2 size={18} />
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Image Upload Section */}
      <div className="border-t dark:border-gray-700 pt-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Product Images *
            </label>
            <p className="text-sm text-gray-500 dark:text-gray-400">Upload product images or add image URLs</p>
          </div>
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
        {/* {formData.imageUrls.length > 0 && (
          <div className="mb-6">
            <h5 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">Image URLs</h5>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
              {formData.imageUrls.map((url, index) => (
                <div key={index} className="relative group">
                  <img
                    src={url}
                    alt={`Product ${index + 1}`}
                    className="h-32 w-full object-cover rounded-lg"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = 'https://via.placeholder.com/150x150?text=Image+Error';
                    }}
                  />
                  <button
                    type="button"
                    onClick={() => removeImageUrl(index)}
                    className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1.5 opacity-0 group-hover:opacity-100 transition-opacity"
                    disabled={isSubmitting}
                  >
                    <X size={14} />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )} */}

        {/* {formData.imageUrls.length > 0 && ( */}
  <div className="mb-6">
    <h5 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
      Image URLs
    </h5>

    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
      {(product ? formData.imageUrls.slice(0, 6) : formData.imageUrls)
        .map((url, index) => (
          <div key={index} className="relative group">
            <img
              src={url}
              alt={`Product ${index + 1}`}
              className="h-32 w-full object-cover rounded-lg"
              onError={(e) => {
                e.currentTarget.src =
                  'https://via.placeholder.com/150x150?text=Image+Error';
              }}
            />

            {/* Remove button sirf CREATE mode me */}
            {!product && (
              <button
                type="button"
                onClick={() => removeImageUrl(index)}
                className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1.5 opacity-0 group-hover:opacity-100 transition-opacity"
                disabled={isSubmitting}
              >
                <X size={14} />
              </button>
            )}
          </div>
        ))}
    </div>

    {/* Optional hint */}
    {product && (
      <p className="text-xs text-gray-500 mt-2">
        ℹ️ Edit mode me sirf primary image dikhai jaati hai
      </p>
    )}
  </div>
{/* )} */}

{formData.imageUrls.length > 0 && (
  <div className="mb-6">
    <h5 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
      Existing Images
    </h5>

    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
      {formData.imageUrls.map((url, index) => (
        <div key={index} className="relative group">
          <img
            src={url}
            alt={`Product ${index + 1}`}
            className="h-32 w-full object-cover rounded-lg"
            onError={(e) => {
              e.currentTarget.src =
                'https://via.placeholder.com/150x150?text=Image+Error';
            }}
          />

          {/* DELETE BUTTON IN EDIT MODE */}
          {product && (
            <button
              type="button"
              onClick={() => handleRemoveExistingImage(url, index)}
              className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1.5 opacity-0 group-hover:opacity-100 transition-opacity"
              disabled={isSubmitting}
            >
              <X size={14} />
            </button>
          )}
        </div>
      ))}
    </div>
  </div>
)}


        {/* File Upload */}
        <div className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-xl p-8">
          <div className="text-center">
            <Upload className="h-16 w-16 text-gray-400 mx-auto mb-4" />
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
              className="cursor-pointer bg-royalBrown text-white px-6 py-3 rounded-lg hover:bg-royalBrown/90 transition-colors inline-block mb-4 font-medium"
            >
              {isSubmitting ? 'Uploading...' : 'Choose Files'}
            </label>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Drag & drop images here, or click to browse
            </p>
            <p className="text-xs text-gray-500 mt-2">
              Supports JPG, JPEG, PNG, WebP • Max 5MB per file
            </p>
          </div>
          
          {/* Preview Uploaded Files */}
          {imageFiles.length > 0 && (
            <div className="mt-8">
              <h5 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">Uploaded Files</h5>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                {imageFiles.map((file, index) => (
                  <div key={index} className="relative group">
                    <img
                      src={URL.createObjectURL(file)}
                      alt={`Upload ${index + 1}`}
                      className="h-32 w-full object-cover rounded-lg"
                    />
                    <button
                      type="button"
                      onClick={() => removeImageFile(index)}
                      className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1.5 opacity-0 group-hover:opacity-100 transition-opacity"
                      disabled={isSubmitting}
                    >
                      <X size={14} />
                    </button>
                    <p className="text-xs text-gray-500 truncate mt-2">{file.name}</p>
                    <p className="text-xs text-gray-400">{(file.size / 1024 / 1024).toFixed(2)} MB</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
        
        <div className={`mt-4 p-4 rounded-lg ${
          formData.imageUrls.length === 0 && imageFiles.length === 0
            ? 'bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800'
            : 'bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800'
        }`}>
          <p className="text-sm font-medium">
            {formData.imageUrls.length === 0 && imageFiles.length === 0
              ? '⚠️ At least one image (URL or file upload) is required'
              : `✅ Ready with ${formData.imageUrls.length + imageFiles.length} images`}
          </p>
        </div>
      </div>

      {/* Form Actions */}
      <div className="flex justify-end space-x-4 pt-6 border-t dark:border-gray-700">
        <Button 
          type="button" 
          variant="outline" 
          onClick={onClose}
          disabled={isSubmitting}
          className="px-6"
        >
          Cancel
        </Button>
        <Button 
          type="submit" 
          disabled={isSubmitting || (formData.imageUrls.length === 0 && imageFiles.length === 0)}
          className="px-6 bg-royalBrown hover:bg-royalBrown/90"
        >
          {isSubmitting ? (
            <>
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
              {product ? 'Updating...' : 'Creating...'}
            </>
          ) : (
            product ? 'Update Product' : 'Add Product'
          )}
        </Button>
      </div>
    </form>
  );
};

export default Products;










// // COMPLETE Products.jsx - FULLY FIXED VERSION
// import React, { useState, useEffect } from 'react';
// import { Plus, Search, Filter, Edit, Trash2, Eye, EyeOff, ChevronDown, Upload, X, Tag, Grid, Layers } from 'lucide-react';
// import Table from '../components/common/Table';
// import Modal from '../components/common/Modal';
// import Button from '../components/common/Button';
// import Input from '../components/common/Input';
// import Select from '../components/common/Select';
// import ProductForm from '../components/ProductForm'; // Import the fixed ProductForm

// const API_BASE_URL = 'https://api.sohwais.com/api'; // Update as needed

// const Products = () => {
//   // Main states
//   const [productList, setProductList] = useState([]);
//   const [isAddModalOpen, setIsAddModalOpen] = useState(false);
//   const [isEditModalOpen, setIsEditModalOpen] = useState(false);
//   const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
//   const [selectedProduct, setSelectedProduct] = useState(null);
  
//   // Filter states
//   const [searchTerm, setSearchTerm] = useState('');
//   const [selectedCategory, setSelectedCategory] = useState('all');
//   const [selectedCollection, setSelectedCollection] = useState('all');
//   const [selectedStatus, setSelectedStatus] = useState('all');
  
//   // UI states
//   const [isLoading, setIsLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [collections, setCollections] = useState([]);
//   const [categories, setCategories] = useState({});

//   // Fetch collections and categories
//   const fetchCollectionsAndCategories = async () => {
//     try {
//       const [collectionsRes, categoriesRes] = await Promise.all([
//         fetch(`${API_BASE_URL}/products/collections`),
//         fetch(`${API_BASE_URL}/products/categories`)
//       ]);

//       if (collectionsRes.ok) {
//         const collectionsData = await collectionsRes.json();
//         if (collectionsData.success) {
//           setCollections(collectionsData.data);
//         }
//       }

//       if (categoriesRes.ok) {
//         const categoriesData = await categoriesRes.json();
//         if (categoriesData.success) {
//           setCategories(categoriesData.data);
//         }
//       }
//     } catch (error) {
//       console.error('Error fetching collections/categories:', error);
//     }
//   };

//   // Fetch products
//   const fetchProducts = async () => {
//     try {
//       setIsLoading(true);
//       setError(null);
      
//       const response = await fetch(`${API_BASE_URL}/products?limit=100`);
//       if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
      
//       const data = await response.json();
//       if (data.success) {
//         setProductList(data.data);
//       } else {
//         throw new Error(data.message || 'Failed to fetch products');
//       }
//     } catch (error) {
//       console.error('Error fetching products:', error);
//       setError(error.message);
//       setProductList([]);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   // Initial load
//   useEffect(() => {
//     fetchCollectionsAndCategories();
//     fetchProducts();
//   }, []);

//   // Table columns
//   const columns = [
//     {
//       key: 'name',
//       title: 'Product',
//       render: (value, row) => (
//         <div className="flex items-center">
//           {row.images && row.images.length > 0 ? (
//             <img
//               src={row.images.find(img => img.isPrimary)?.url || row.images[0].url}
//               alt={value}
//               className="h-12 w-12 rounded-lg object-cover"
//             />
//           ) : (
//             <div className="h-12 w-12 rounded-lg bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
//               <span className="text-xs text-gray-500">No Image</span>
//             </div>
//           )}
//           <div className="ml-4">
//             <p className="font-medium text-gray-900 dark:text-white">{value}</p>
//             <div className="flex items-center space-x-2 mt-1">
//               <span className="text-xs px-2 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded-full">
//                 {row.collection}
//               </span>
//               <span className="text-xs px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 rounded-full">
//                 {row.subCategory}
//               </span>
//             </div>
//           </div>
//         </div>
//       )
//     },
//     {
//       key: 'price',
//       title: 'Price',
//       render: (value, row) => (
//         <div>
//           <p className="font-medium">{value}</p>
//           {row.discount > 0 && (
//             <div className="flex items-center space-x-2 text-sm">
//               <span className="text-green-600 font-medium">
//                 {Math.round(value - (value * row.discount / 100))}
//               </span>
//               <span className="line-through text-gray-500">{value}</span>
//               <span className="bg-red-100 text-red-800 px-2 py-0.5 rounded text-xs">
//                 {row.discount}% off
//               </span>
//             </div>
//           )}
//         </div>
//       )
//     },
//     {
//       key: 'stock',
//       title: 'Stock',
//       render: (value) => (
//         <span className={`px-3 py-1 rounded-full text-xs font-medium ${
//           value > 50 ? 'bg-green-100 text-green-800' :
//           value > 10 ? 'bg-yellow-100 text-yellow-800' :
//           'bg-red-100 text-red-800'
//         }`}>
//           {value} units
//         </span>
//       )
//     },
//     {
//       key: 'status',
//       title: 'Status',
//       render: (value) => (
//         <span className={`px-3 py-1 rounded-full text-xs font-medium ${
//           value === 'Active' ? 'bg-green-100 text-green-800' :
//           value === 'Inactive' ? 'bg-red-100 text-red-800' :
//           value === 'Out of Stock' ? 'bg-orange-100 text-orange-800' :
//           'bg-blue-100 text-blue-800'
//         }`}>
//           {value}
//         </span>
//       )
//     },
//     {
//       key: 'category',
//       title: 'Category',
//       render: (value) => (
//         <span className={`px-3 py-1 rounded-full text-xs font-medium ${
//           value === 'Men' ? 'bg-blue-100 text-blue-800' :
//           value === 'Women' ? 'bg-pink-100 text-pink-800' :
//           'bg-purple-100 text-purple-800'
//         }`}>
//           {value}
//         </span>
//       )
//     },
//     {
//       key: 'variants',
//       title: 'Variants',
//       render: (value) => (
//         <div className="flex flex-wrap gap-1">
//           {value && value.length > 0 ? (
//             <>
//               {value.slice(0, 2).map((variant, index) => (
//                 <div key={index} className="flex items-center space-x-1">
//                   <div
//                     className="w-3 h-3 rounded-full border"
//                     style={{ backgroundColor: variant.color }}
//                   />
//                   <span className="text-xs text-gray-600 dark:text-gray-300">{variant.size}</span>
//                 </div>
//               ))}
//               {value.length > 2 && (
//                 <span className="text-xs text-gray-500">+{value.length - 2} more</span>
//               )}
//             </>
//           ) : (
//             <span className="text-gray-500 text-sm">No variants</span>
//           )}
//         </div>
//       )
//     },
//     {
//       key: 'actions',
//       title: 'Actions',
//       render: (_, row) => (
//         <div className="flex space-x-1">
//           <button
//             onClick={() => handleEdit(row)}
//             className="p-2 text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition-colors"
//             title="Edit"
//           >
//             <Edit size={16} />
//           </button>
//           <button
//             onClick={() => handleDelete(row)}
//             className="p-2 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
//             title="Delete"
//           >
//             <Trash2 size={16} />
//           </button>
//         </div>
//       )
//     }
//   ];

//   const handleEdit = (product) => {
//     setSelectedProduct(product);
//     setIsEditModalOpen(true);
//   };

//   const handleDelete = (product) => {
//     setSelectedProduct(product);
//     setIsDeleteModalOpen(true);
//   };

//   const handleToggleStatus = async (product) => {
//     try {
//       const newStatus = product.status === 'Active' ? 'Inactive' : 'Active';
//       const response = await fetch(`${API_BASE_URL}/products/${product._id}`, {
//         method: 'PUT',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({ status: newStatus })
//       });

//       if (!response.ok) throw new Error('Failed to update status');
      
//       const data = await response.json();
//       if (data.success) {
//         setProductList(prev => 
//           prev.map(p => p._id === product._id ? { ...p, status: newStatus } : p)
//         );
//       } else {
//         throw new Error(data.message || 'Failed to update status');
//       }
//     } catch (error) {
//       console.error('Error updating status:', error);
//       alert(`Failed to update status: ${error.message}`);
//     }
//   };

//   const handleConfirmDelete = async () => {
//     try {
//       const response = await fetch(`${API_BASE_URL}/products/${selectedProduct._id}`, {
//         method: 'DELETE'
//       });

//       if (!response.ok) throw new Error('Failed to delete product');
      
//       const data = await response.json();
//       if (data.success) {
//         setProductList(prev => prev.filter(p => p._id !== selectedProduct._id));
//         setIsDeleteModalOpen(false);
//         setSelectedProduct(null);
//       } else {
//         throw new Error(data.message || 'Failed to delete product');
//       }
//     } catch (error) {
//       console.error('Error deleting product:', error);
//       alert(`Failed to delete product: ${error.message}`);
//     }
//   };

//   // Filter products
//   const filteredProducts = productList.filter(product => {
//     const matchesSearch = 
//       product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
//       product.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
//       product.tags?.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    
//     const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
//     const matchesCollection = selectedCollection === 'all' || product.collection === selectedCollection;
//     const matchesStatus = selectedStatus === 'all' || product.status === selectedStatus;
    
//     return matchesSearch && matchesCategory && matchesCollection && matchesStatus;
//   });

//   // Get unique filter options
//   const uniqueCategories = ['all', ...new Set(productList.map(p => p.category))];
//   const uniqueCollections = ['all', ...new Set(productList.map(p => p.collection))];

//   const handleProductAdded = () => {
//     fetchProducts();
//     setIsAddModalOpen(false);
//   };

//   const handleProductUpdated = () => {
//     fetchProducts();
//     setIsEditModalOpen(false);
//     setSelectedProduct(null);
//   };

//   return (
//     <div className="space-y-6 font-royal tracking-wide">
//       {/* Header */}
//       <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
//         <div>
//           <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Products</h1>
//           <p className="text-gray-600 dark:text-gray-400">
//             Manage your traditional clothing products
//           </p>
//         </div>
//         <div className="flex space-x-3 mt-4 sm:mt-0">
//           <Button
//             variant="outline"
//             onClick={() => window.open('/collections', '_blank')}
//             className="font-royal tracking-wide"
//           >
//             <Layers className="h-4 w-4 mr-2" />
//             View Collections
//           </Button>
//           <Button
//             onClick={() => setIsAddModalOpen(true)}
//             className="font-royal tracking-wide bg-royalBrown hover:bg-royalBrown/90"
//           >
//             <Plus className="h-4 w-4 mr-2" />
//             Add Product
//           </Button>
//         </div>
//       </div>

//       {/* Stats Cards */}
//       <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
//         <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 border border-gray-200 dark:border-gray-700">
//           <div className="flex items-center justify-between">
//             <div>
//               <p className="text-sm text-gray-600 dark:text-gray-400">Total Products</p>
//               <p className="text-2xl font-bold text-gray-900 dark:text-white mt-2">
//                 {productList.length}
//               </p>
//             </div>
//             <div className="p-3 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
//               <Grid className="h-6 w-6 text-blue-600 dark:text-blue-400" />
//             </div>
//           </div>
//         </div>
//         <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 border border-gray-200 dark:border-gray-700">
//           <div className="flex items-center justify-between">
//             <div>
//               <p className="text-sm text-gray-600 dark:text-gray-400">Men's Wear</p>
//               <p className="text-2xl font-bold text-gray-900 dark:text-white mt-2">
//                 {productList.filter(p => p.category === 'Men').length}
//               </p>
//             </div>
//             <div className="p-3 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
//               <span className="text-lg font-semibold text-blue-600 dark:text-blue-400">M</span>
//             </div>
//           </div>
//         </div>
//         <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 border border-gray-200 dark:border-gray-700">
//           <div className="flex items-center justify-between">
//             <div>
//               <p className="text-sm text-gray-600 dark:text-gray-400">Women's Wear</p>
//               <p className="text-2xl font-bold text-gray-900 dark:text-white mt-2">
//                 {productList.filter(p => p.category === 'Women').length}
//               </p>
//             </div>
//             <div className="p-3 bg-pink-100 dark:bg-pink-900/30 rounded-lg">
//               <span className="text-lg font-semibold text-pink-600 dark:text-pink-400">W</span>
//             </div>
//           </div>
//         </div>
//         <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 border border-gray-200 dark:border-gray-700">
//           <div className="flex items-center justify-between">
//             <div>
//               <p className="text-sm text-gray-600 dark:text-gray-400">Active Products</p>
//               <p className="text-2xl font-bold text-gray-900 dark:text-white mt-2">
//                 {productList.filter(p => p.status === 'Active').length}
//               </p>
//             </div>
//             <div className="p-3 bg-green-100 dark:bg-green-900/30 rounded-lg">
//               <Eye className="h-6 w-6 text-green-600 dark:text-green-400" />
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Loading and Error States */}
//       {isLoading && (
//         <div className="text-center py-12">
//           <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-royalBrown mx-auto"></div>
//           <p className="mt-4 text-gray-600 dark:text-gray-400">Loading products...</p>
//         </div>
//       )}

//       {error && !isLoading && (
//         <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl p-6">
//           <div className="flex items-start">
//             <div className="flex-shrink-0">
//               <div className="h-6 w-6 text-red-400"></div>
//             </div>
//             <div className="ml-3">
//               <h3 className="text-sm font-medium text-red-800 dark:text-red-200">Error loading products</h3>
//               <div className="mt-2 text-sm text-red-700 dark:text-red-300">{error}</div>
//             </div>
//           </div>
//           <div className="mt-4">
//             <button
//               onClick={fetchProducts}
//               className="text-sm font-medium text-red-800 dark:text-red-200 hover:text-red-900"
//             >
//               Try again
//             </button>
//           </div>
//         </div>
//       )}

//       {/* Filters - Only show when not loading and no error */}
//       {!isLoading && !error && (
//         <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 border border-gray-200 dark:border-gray-700">
//           <div className="flex flex-col lg:flex-row lg:items-center lg:space-x-6 space-y-6 lg:space-y-0">
//             <div className="flex-1">
//               <div className="relative">
//                 <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
//                 <Input
//                   type="search"
//                   placeholder="Search products by name, description, or tags..."
//                   value={searchTerm}
//                   onChange={(e) => setSearchTerm(e.target.value)}
//                   className="pl-12 w-full text-lg"
//                 />
//               </div>
//             </div>
//             <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
//               <div className="relative">
//                 <select
//                   value={selectedCategory}
//                   onChange={(e) => setSelectedCategory(e.target.value)}
//                   className="w-full appearance-none bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg pl-4 pr-10 py-3 text-sm focus:ring-2 focus:ring-royalBrown focus:border-transparent"
//                 >
//                   <option value="all">All Categories</option>
//                   {Object.keys(categories).map(cat => (
//                     <option key={cat} value={cat}>{cat}</option>
//                   ))}
//                 </select>
//                 <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none" />
//               </div>
//               <div className="relative">
//                 <select
//                   value={selectedCollection}
//                   onChange={(e) => setSelectedCollection(e.target.value)}
//                   className="w-full appearance-none bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg pl-4 pr-10 py-3 text-sm focus:ring-2 focus:ring-royalBrown focus:border-transparent"
//                 >
//                   <option value="all">All Collections</option>
//                   {uniqueCollections.filter(c => c !== 'all').map(collection => (
//                     <option key={collection} value={collection}>{collection}</option>
//                   ))}
//                 </select>
//                 <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none" />
//               </div>
//               <div className="relative">
//                 <select
//                   value={selectedStatus}
//                   onChange={(e) => setSelectedStatus(e.target.value)}
//                   className="w-full appearance-none bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg pl-4 pr-10 py-3 text-sm focus:ring-2 focus:ring-royalBrown focus:border-transparent"
//                 >
//                   <option value="all">All Status</option>
//                   <option value="Active">Active</option>
//                   <option value="Inactive">Inactive</option>
//                   <option value="Out of Stock">Out of Stock</option>
//                   <option value="Coming Soon">Coming Soon</option>
//                 </select>
//                 <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none" />
//               </div>
//             </div>
//           </div>
//         </div>
//       )}

//       {/* Products Table */}
//       <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
//         {filteredProducts.length === 0 ? (
//           <div className="text-center py-16">
//             <div className="text-gray-400 dark:text-gray-500 mb-6">
//               <Search className="h-16 w-16 mx-auto" />
//             </div>
//             <h3 className="text-xl font-medium text-gray-900 dark:text-white mb-3">No products found</h3>
//             <p className="text-gray-500 dark:text-gray-400 mb-6 max-w-md mx-auto">
//               {searchTerm || selectedCategory !== 'all' || selectedCollection !== 'all' || selectedStatus !== 'all'
//                 ? 'Try changing your filters or search term'
//                 : 'Start by adding your first traditional clothing product'
//               }
//             </p>
//             <Button
//               onClick={() => setIsAddModalOpen(true)}
//               className="bg-royalBrown hover:bg-royalBrown/90"
//             >
//               <Plus className="h-4 w-4 mr-2" />
//               Add First Product
//             </Button>
//           </div>
//         ) : (
//           <div className="overflow-x-auto">
//             <Table columns={columns} data={filteredProducts} />
//           </div>
//         )}
//       </div>

//       {/* Add Product Modal */}
//       <Modal
//         isOpen={isAddModalOpen}
//         onClose={() => setIsAddModalOpen(false)}
//         title="Add New Traditional Product"
//         size="2xl"
//       >
//         <ProductForm
//           collections={collections}
//           categories={categories}
//           onClose={() => setIsAddModalOpen(false)}
//           onSuccess={handleProductAdded}
//         />
//       </Modal>

//       {/* Edit Product Modal */}
//       <Modal
//         isOpen={isEditModalOpen}
//         onClose={() => {
//           setIsEditModalOpen(false);
//           setSelectedProduct(null);
//         }}
//         title="Edit Product"
//         size="2xl"
//       >
//         <ProductForm
//           product={selectedProduct}
//           collections={collections}
//           categories={categories}
//           onClose={() => {
//             setIsEditModalOpen(false);
//             setSelectedProduct(null);
//           }}
//           onSuccess={handleProductUpdated}
//         />
//       </Modal>

//       {/* Delete Confirmation Modal */}
//       <Modal
//         isOpen={isDeleteModalOpen}
//         onClose={() => setIsDeleteModalOpen(false)}
//         title="Delete Product"
//         size="md"
//       >
//         <div className="space-y-6">
//           <div className="flex items-center space-x-4">
//             {selectedProduct?.images?.[0] && (
//               <img
//                 src={selectedProduct.images[0].url}
//                 alt={selectedProduct?.name}
//                 className="h-20 w-20 rounded-lg object-cover"
//               />
//             )}
//             <div>
//               <h4 className="font-medium text-gray-900 dark:text-white">{selectedProduct?.name}</h4>
//               <p className="text-sm text-gray-600 dark:text-gray-400">
//                 {selectedProduct?.collection} • {selectedProduct?.category}
//               </p>
//             </div>
//           </div>
//           <p className="text-gray-600 dark:text-gray-400">
//             Are you sure you want to delete this product? This action cannot be undone and all
//             associated images will be removed from storage.
//           </p>
//           <div className="flex justify-end space-x-3 pt-4 border-t dark:border-gray-700">
//             <Button
//               variant="outline"
//               onClick={() => setIsDeleteModalOpen(false)}
//             >
//               Cancel
//             </Button>
//             <Button
//               variant="danger"
//               onClick={handleConfirmDelete}
//             >
//               <Trash2 className="h-4 w-4 mr-2" />
//               Delete Product
//             </Button>
//           </div>
//         </div>
//       </Modal>
//     </div>
//   );
// };

// export default Products;
