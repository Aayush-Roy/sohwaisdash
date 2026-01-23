
// import React, { useState, useEffect } from 'react';
// import { X, Upload, Trash2 } from 'lucide-react';
// import Button from '../components/common/Button';
// import Input from '../components/common/Input';
// import Select from '../components/common/Select';

// const ProductForm = ({ 
//   product, 
//   collections = [], 
//   categories = {}, 
//   onClose, 
//   onSuccess 
// }) => {
//   // Form state
//   const [formData, setFormData] = useState({
//     name: '',
//     category: '',
//     collection: '',
//     subCategory: '',
//     price: '',
//     discount: 0,
//     stock: '',
//     status: 'Active',
//     description: '',
//     features: [],
//     tags: [],
//     imageUrls: []
//   });

//   const [collections, setCollections] = useState([]);
// const [categories, setCategories] = useState({});

// useEffect(() => {
//   // Fetch collections and categories
//   fetchCollections();
//   fetchCategories();
// }, []);

// const fetchCollections = async () => {
//   try {
//     const res = await fetch(`${API_BASE_URL}/collections`);
//     const data = await res.json();
//     setCollections(data.collections || []);
//     console.log(data)
//   } catch (err) {
//     console.error('Failed to fetch collections');
//   }
// };

// const fetchCategories = async () => {
//   try {
//     const res = await fetch(`${API_BASE_URL}/categories`);
//     const data = await res.json();
//     setCategories(data.categories || {}); // { "Women": ["Kurta", "Saree"], "Men": ["Shirt"] }
//     console.log(data)
//   } catch (err) {
//     console.error('Failed to fetch categories');
//   }
// };


//   // Edit mode specific states
//   const [imagesToRemove, setImagesToRemove] = useState([]);
//   const [imageFiles, setImageFiles] = useState([]);
//   const [variants, setVariants] = useState([{ color: '#000000', size: 'S', price: '' }]);
  
//   // UI states
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const [error, setError] = useState('');
//   const [newFeature, setNewFeature] = useState('');
//   const [newTag, setNewTag] = useState('');

//   // Load product data for edit mode
//   useEffect(() => {
//     if (product) {
//       setFormData({
//         name: product.name || '',
//         category: product.category || '',
//         collection: product.collection || '',
//         subCategory: product.subCategory || '',
//         price: product.price || '',
//         discount: product.discount || 0,
//         stock: product.stock || '',
//         status: product.status || 'Active',
//         description: product.description || '',
//         features: product.features || [],
//         tags: product.tags || [],
//         imageUrls: product.images?.map(img => img.url) || []
//       });
//       setVariants(product.variants || [{ color: '#000000', size: 'S', price: '' }]);
//       setImagesToRemove([]);
//     } else {
//       // Reset for create mode
//       setFormData({
//         name: '',
//         category: '',
//         collection: '',
//         subCategory: '',
//         price: '',
//         discount: 0,
//         stock: '',
//         status: 'Active',
//         description: '',
//         features: [],
//         tags: [],
//         imageUrls: []
//       });
//       setVariants([{ color: '#000000', size: 'S', price: '' }]);
//       setImageFiles([]);
//       setImagesToRemove([]);
//     }
//   }, [product]);

//   // Get subcategories based on category
//   const subCategories = categories[formData.category] || [];

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setIsSubmitting(true);
//     setError('');

//     try {
//       // Basic validation
//       if (!formData.name.trim()) throw new Error('Product name is required');
//       if (!formData.category) throw new Error('Please select a category');
//       if (!formData.collection) throw new Error('Please select a collection');
//       if (!formData.subCategory) throw new Error('Please select a sub-category');
//       if (!formData.price || formData.price <= 0) throw new Error('Valid price is required');
//       if (!formData.stock || formData.stock < 0) throw new Error('Valid stock quantity is required');

//       const formDataToSend = new FormData();
      
//       // Add form fields
//       formDataToSend.append('name', formData.name);
//       formDataToSend.append('category', formData.category);
//       formDataToSend.append('collection', formData.collection);
//       formDataToSend.append('subCategory', formData.subCategory);
//       formDataToSend.append('price', formData.price);
//       formDataToSend.append('discount', formData.discount);
//       formDataToSend.append('stock', formData.stock);
//       formDataToSend.append('status', formData.status);
//       formDataToSend.append('description', formData.description);
//       formDataToSend.append('features', JSON.stringify(formData.features));
//       formDataToSend.append('tags', JSON.stringify(formData.tags));
//       formDataToSend.append('variants', JSON.stringify(variants.filter(v => v.price > 0)));

//       // Handle images
//       if (product) { // EDIT MODE
//         if (imagesToRemove.length > 0) {
//           formDataToSend.append('imagesToRemove', JSON.stringify(imagesToRemove));
//         }
//         // Only send NEW image URLs
//         const newImageUrls = formData.imageUrls.filter(url => 
//           !product.images?.some(img => img.url === url)
//         );
//         if (newImageUrls.length > 0) {
//           formDataToSend.append('imageUrls', JSON.stringify(newImageUrls));
//         }
//       } else { // CREATE MODE
//         if (formData.imageUrls.length > 0) {
//           formDataToSend.append('imageUrls', JSON.stringify(formData.imageUrls));
//         }
//       }

//       // Add new image files
//       imageFiles.forEach((file) => {
//         formDataToSend.append('images', file);
//       });
// // https://api.sohwais.com/api
//       // API call
//       const url = product 
//         ? `${process.env.API_BASE_URL || 'https://api.sohwais.com/api'}/products/${product._id}`
//         : `${process.env.API_BASE_URL || 'https://api.sohwais.com/api'}/products`;
//       //  const url = product 
//       //   ? `${process.env.API_BASE_URL || 'http://localhost:5000/api'}/products/${product._id}`
//       //   : `${process.env.API_BASE_URL || 'http://localhost:5000/api'}/products`;
//       const method = product ? 'PUT' : 'POST';

//       const response = await fetch(url, {
//         method,
//         body: formDataToSend
//       });

//       const data = await response.json();

//       if (!response.ok || !data.success) {
//         throw new Error(data.message || data.errors?.[0] || 'Failed to save product');
//       }

//       onSuccess?.();
//       onClose();
//     } catch (err) {
//       console.error('Error saving product:', err);
//       setError(err.message);
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   const handleInputChange = (field, value) => {
//     setFormData(prev => ({ ...prev, [field]: value }));
//     // Reset subCategory if category changes
//     if (field === 'category') {
//       setFormData(prev => ({ ...prev, subCategory: '' }));
//     }
//   };

//   const addImageUrl = () => {
//     const url = prompt('Enter image URL:');
//     if (url?.trim()) {
//       setFormData(prev => ({
//         ...prev,
//         imageUrls: [...prev.imageUrls, url.trim()]
//       }));
//     }
//   };

//   const removeImageUrl = (index) => {
//     setFormData(prev => ({
//       ...prev,
//       imageUrls: prev.imageUrls.filter((_, i) => i !== index)
//     }));
//     // Remove from imagesToRemove if it was selected
//     setImagesToRemove(prev => prev.filter(i => i !== index));
//   };

//   const toggleImageRemove = (index) => {
//     setImagesToRemove(prev => 
//       prev.includes(index) ? prev.filter(i => i !== index) : [...prev, index]
//     );
//   };

//   const handleImageUpload = (e) => {
//     const files = Array.from(e.target.files);
//     const validFiles = files.filter(file => 
//       ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'].includes(file.type)
//     );
    
//     if (validFiles.length !== files.length) {
//       alert('Only JPG, JPEG, PNG, and WebP files are allowed');
//     }
    
//     setImageFiles(prev => [...prev, ...validFiles]);
//   };

//   const removeImageFile = (index) => {
//     setImageFiles(prev => prev.filter((_, i) => i !== index));
//   };

//   const addFeature = () => {
//     if (newFeature.trim()) {
//       setFormData(prev => ({
//         ...prev,
//         features: [...prev.features, newFeature.trim()]
//       }));
//       setNewFeature('');
//     }
//   };

//   const removeFeature = (index) => {
//     setFormData(prev => ({
//       ...prev,
//       features: prev.features.filter((_, i) => i !== index)
//     }));
//   };

//   const addTag = () => {
//     if (newTag.trim()) {
//       setFormData(prev => ({
//         ...prev,
//         tags: [...prev.tags, newTag.trim()]
//       }));
//       setNewTag('');
//     }
//   };

//   const removeTag = (index) => {
//     setFormData(prev => ({
//       ...prev,
//       tags: prev.tags.filter((_, i) => i !== index)
//     }));
//   };

//   const handleVariantChange = (index, field, value) => {
//     const newVariants = [...variants];
//     newVariants[index][field] = value;
//     setVariants(newVariants);
//   };

//   const addVariant = () => {
//     setVariants(prev => [...prev, { color: '#000000', size: 'S', price: '' }]);
//   };

//   const removeVariant = (index) => {
//     if (variants.length > 1) {
//       setVariants(prev => prev.filter((_, i) => i !== index));
//     }
//   };

//   return (
//     <form onSubmit={handleSubmit} className="space-y-8">
//       {error && (
//         <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4">
//           <p className="text-red-700 dark:text-red-300 text-sm">{error}</p>
//         </div>
//       )}

//       {/* Basic Info */}
//       <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//         <Input
//           label="Product Name"
//           value={formData.name}
//           onChange={(e) => handleInputChange('name', e.target.value)}
//           required
//           disabled={isSubmitting}
//         />
        
//         <div>
//           <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
//             Main Category <span className="text-red-500">*</span>
//           </label>
//           <Select
//             value={formData.category}
//             onChange={(e) => handleInputChange('category', e.target.value)}
//             required
//             disabled={isSubmitting}
//           >
//             <option value="">Select main category</option>
//             {Object.keys(categories).map(cat => (
//               <option key={cat} value={cat}>{cat}</option>
//             ))}
//           </Select>
//         </div>

//         <div>
//           <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
//             Sub-Category <span className="text-red-500">*</span>
//           </label>
//           <Select
//             value={formData.subCategory}
//             onChange={(e) => handleInputChange('subCategory', e.target.value)}
//             required
//             disabled={isSubmitting || !formData.category}
//           >
//             <option value="">Select sub-category</option>
//             {subCategories.map(subCat => (
//               <option key={subCat} value={subCat}>{subCat}</option>
//             ))}
//           </Select>
//         </div>

//         <div>
//           <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
//             Collection <span className="text-red-500">*</span>
//           </label>
//           <Select
//             value={formData.collection}
//             onChange={(e) => handleInputChange('collection', e.target.value)}
//             required
//             disabled={isSubmitting}
//           >
//             <option value="">Select collection</option>
//             {collections.map(collection => (
//               <option key={collection} value={collection}>{collection}</option>
//             ))}
//           </Select>
//         </div>

//         <Input
//           label="Price"
//           type="number"
//           value={formData.price}
//           onChange={(e) => handleInputChange('price', e.target.value)}
//           required
//           min="0"
//           step="0.01"
//           disabled={isSubmitting}
//         />

//         <Input
//           label="Discount (%)"
//           type="number"
//           value={formData.discount}
//           onChange={(e) => handleInputChange('discount', e.target.value)}
//           min="0"
//           max="100"
//           disabled={isSubmitting}
//         />

//         <Input
//           label="Stock Quantity"
//           type="number"
//           value={formData.stock}
//           onChange={(e) => handleInputChange('stock', e.target.value)}
//           required
//           min="0"
//           disabled={isSubmitting}
//         />

//         <div>
//           <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
//             Status
//           </label>
//           <Select
//             value={formData.status}
//             onChange={(e) => handleInputChange('status', e.target.value)}
//             disabled={isSubmitting}
//           >
//             <option value="Active">Active</option>
//             <option value="Inactive">Inactive</option>
//             <option value="Out of Stock">Out of Stock</option>
//             <option value="Coming Soon">Coming Soon</option>
//           </Select>
//         </div>
//       </div>

//       {/* Description */}
//       <div>
//         <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
//           Description
//         </label>
//         <textarea
//           value={formData.description}
//           onChange={(e) => handleInputChange('description', e.target.value)}
//           rows={4}
//           className="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2.5 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-royalBrown focus:border-transparent disabled:opacity-50"
//           placeholder="Describe the product in detail..."
//           disabled={isSubmitting}
//         />
//       </div>

//       {/* Features */}
//       <div>
//         <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
//           Product Features
//         </label>
//         <div className="flex gap-2 mb-3">
//           <Input
//             value={newFeature}
//             onChange={(e) => setNewFeature(e.target.value)}
//             placeholder="Add a feature e.g., 100% Cotton, Hand Embroidered"
//             onKeyPress={(e) => {
//               if (e.key === 'Enter') {
//                 e.preventDefault();
//                 addFeature();
//               }
//             }}
//             disabled={isSubmitting}
//           />
//           <Button
//             type="button"
//             variant="outline"
//             onClick={addFeature}
//             disabled={isSubmitting || !newFeature.trim()}
//           >
//             Add
//           </Button>
//         </div>
//         <div className="flex flex-wrap gap-2">
//           {formData.features.map((feature, index) => (
//             <span key={index} className="inline-flex items-center px-3 py-1.5 rounded-full text-sm bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200">
//               {feature}
//               <button
//                 type="button"
//                 onClick={() => removeFeature(index)}
//                 className="ml-2 text-blue-600 hover:text-blue-800 disabled:opacity-50"
//                 disabled={isSubmitting}
//               >
//                 <X size={14} />
//               </button>
//             </span>
//           ))}
//         </div>
//       </div>

//       {/* Tags */}
//       <div>
//         <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
//           Tags
//         </label>
//         <div className="flex gap-2 mb-3">
//           <Input
//             value={newTag}
//             onChange={(e) => setNewTag(e.target.value)}
//             placeholder="Add a tag e.g., Traditional, Wedding, Handmade"
//             onKeyPress={(e) => {
//               if (e.key === 'Enter') {
//                 e.preventDefault();
//                 addTag();
//               }
//             }}
//             disabled={isSubmitting}
//           />
//           <Button
//             type="button"
//             variant="outline"
//             onClick={addTag}
//             disabled={isSubmitting || !newTag.trim()}
//           >
//             Add
//           </Button>
//         </div>
//         <div className="flex flex-wrap gap-2">
//           {formData.tags.map((tag, index) => (
//             <span key={index} className="inline-flex items-center px-3 py-1.5 rounded-full text-sm bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200">
//               <span className="mr-1">{tag}</span>
//               <button
//                 type="button"
//                 onClick={() => removeTag(index)}
//                 className="ml-2 text-gray-600 hover:text-gray-800 disabled:opacity-50"
//                 disabled={isSubmitting}
//               >
//                 <X size={14} />
//               </button>
//             </span>
//           ))}
//         </div>
//       </div>

//       {/* Variants */}
//       <div className="border-t dark:border-gray-700 pt-6">
//         <div className="flex items-center justify-between mb-6">
//           <div>
//             <h4 className="text-sm font-medium text-gray-900 dark:text-white">Product Variants</h4>
//             <p className="text-sm text-gray-500 dark:text-gray-400">Add different sizes and colors</p>
//           </div>
//           <Button
//             type="button"
//             variant="outline"
//             size="small"
//             onClick={addVariant}
//             disabled={isSubmitting}
//           >
//             Add Variant
//           </Button>
//         </div>
//         <div className="space-y-4">
//           {variants.map((variant, index) => (
//             <div key={index} className="grid grid-cols-1 md:grid-cols-12 gap-4 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
//               <div className="md:col-span-2">
//                 <label className="text-xs text-gray-500 dark:text-gray-400 block mb-1">Color</label>
//                 <div className="flex items-center space-x-3">
//                   <input
//                     type="color"
//                     value={variant.color}
//                     onChange={(e) => handleVariantChange(index, 'color', e.target.value)}
//                     className="w-10 h-10 cursor-pointer rounded border border-gray-300 disabled:opacity-50"
//                     disabled={isSubmitting}
//                   />
//                   <span className="text-sm text-gray-600">{variant.color}</span>
//                 </div>
//               </div>
//               <div className="md:col-span-3">
//                 <label className="text-xs text-gray-500 dark:text-gray-400 block mb-1">Size</label>
//                 <select
//                   value={variant.size}
//                   onChange={(e) => handleVariantChange(index, 'size', e.target.value)}
//                   className="w-full border border-gray-300 dark:border-gray-600 rounded px-3 py-2 text-sm bg-white dark:bg-gray-800 required disabled:opacity-50"
//                   disabled={isSubmitting}
//                 >
//                   <option value="">Select size</option>
//                   {['XS', 'S', 'M', 'L', 'XL', 'XXL', 'XXXL', 'Free Size', 'Custom'].map(size => (
//                     <option key={size} value={size}>{size}</option>
//                   ))}
//                 </select>
//               </div>
//               <div className="md:col-span-4">
//                 <label className="text-xs text-gray-500 dark:text-gray-400 block mb-1">Price</label>
//                 <input
//                   type="number"
//                   value={variant.price}
//                   onChange={(e) => handleVariantChange(index, 'price', e.target.value)}
//                   className="w-full border border-gray-300 dark:border-gray-600 rounded px-3 py-2 text-sm min-0 step=0.01 required placeholder='Variant price'"
//                   placeholder="Variant price"
//                   disabled={isSubmitting}
//                 />
//               </div>
//               <div className="md:col-span-3 flex items-end space-x-2">
//                 {variants.length > 1 && (
//                   <button
//                     type="button"
//                     onClick={() => removeVariant(index)}
//                     className="p-2 text-red-600 hover:text-red-800 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors disabled:opacity-50"
//                     disabled={isSubmitting}
//                   >
//                     <Trash2 size={18} />
//                   </button>
//                 )}
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>

//       {/* Images */}
//       <div className="border-t dark:border-gray-700 pt-6">
//         <div className="flex items-center justify-between mb-6">
//           <div>
//             <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
//               Product Images ({product ? 'Edit' : 'Add'})
//             </label>
//             <p className="text-sm text-gray-500 dark:text-gray-400">
//               {product 
//                 ? 'Remove unwanted images or add new ones' 
//                 : 'Upload product images or add image URLs'
//               }
//             </p>
//           </div>
//           {!product && (
//             <Button type="button" variant="outline" size="small" onClick={addImageUrl} disabled={isSubmitting}>
//               Add Image URL
//             </Button>
//           )}
//         </div>

//         {/* Current Images - Edit Mode */}
//         {product && formData.imageUrls?.length > 0 && (
//           <div className="mb-6">
//             <h5 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
//               Current Images ({formData.imageUrls.length})
//             </h5>
//             <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
//               {formData.imageUrls.map((url, index) => (
//                 <div key={index} className="relative group">
//                   <img 
//                     src={url} 
//                     alt={`Product ${index + 1}`}
//                     className="h-32 w-full object-cover rounded-lg"
//                     onError={(e) => {
//                       e.currentTarget.src = 'https://via.placeholder.com/150x150?text=Image+Error';
//                     }}
//                   />
//                   <label className="absolute top-2 left-2 z-10">
//                     <input
//                       type="checkbox"
//                       checked={imagesToRemove.includes(index)}
//                       onChange={() => toggleImageRemove(index)}
//                       className="w-5 h-5 text-royalBrown rounded border-gray-300 focus:ring-royalBrown"
//                     />
//                   </label>
//                   <button
//                     type="button"
//                     onClick={() => {
//                       toggleImageRemove(index);
//                       setFormData(prev => ({
//                         ...prev,
//                         imageUrls: prev.imageUrls.filter((_, i) => i !== index)
//                       }));
//                     }}
//                     className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1.5 opacity-0 group-hover:opacity-100 transition-opacity disabled:opacity-50 z-10"
//                     disabled={isSubmitting}
//                     title="Remove image"
//                   >
//                     <X size={14} />
//                   </button>
//                 </div>
//               ))}
//             </div>
//           </div>
//         )}

//         {/* New Image URLs - Create Mode Only */}
//         {!product && formData.imageUrls.length > 0 && (
//           <div className="mb-6">
//             <h5 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">Image URLs</h5>
//             <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
//               {formData.imageUrls.map((url, index) => (
//                 <div key={index} className="relative group">
//                   <img 
//                     src={url} 
//                     alt={`Product ${index + 1}`}
//                     className="h-32 w-full object-cover rounded-lg"
//                     onError={(e) => {
//                       e.currentTarget.src = 'https://via.placeholder.com/150x150?text=Image+Error';
//                     }}
//                   />
//                   <button
//                     type="button"
//                     onClick={() => removeImageUrl(index)}
//                     className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1.5 opacity-0 group-hover:opacity-100 transition-opacity disabled:opacity-50"
//                     disabled={isSubmitting}
//                   >
//                     <X size={14} />
//                   </button>
//                 </div>
//               ))}
//             </div>
//           </div>
//         )}

//         {/* File Upload */}
//         <div className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-xl p-8">
//           <div className="text-center">
//             <Upload className="h-16 w-16 text-gray-400 mx-auto mb-4" />
//             <input
//               type="file"
//               multiple
//               accept="image/jpeg,image/jpg,image/png,image/webp"
//               onChange={handleImageUpload}
//               className="hidden"
//               id="image-upload"
//               disabled={isSubmitting}
//             />
//             <label
//               htmlFor="image-upload"
//               className="cursor-pointer bg-royalBrown text-white px-6 py-3 rounded-lg hover:bg-royalBrown/90 transition-colors inline-block mb-4 font-medium disabled:opacity-50"
//             >
//               {isSubmitting ? 'Uploading...' : 'Choose Files'}
//             </label>
//             <p className="text-sm text-gray-600 dark:text-gray-400">
//               Drag & drop images here, or click to browse
//             </p>
//             <p className="text-xs text-gray-500 mt-2">Supports JPG, JPEG, PNG, WebP. Max 5MB per file</p>
//           </div>

//           {/* Preview Uploaded Files */}
//           {imageFiles.length > 0 && (
//             <div className="mt-8">
//               <h5 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
//                 Uploaded Files ({imageFiles.length})
//               </h5>
//               <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
//                 {imageFiles.map((file, index) => (
//                   <div key={index} className="relative group">
//                     <img 
//                       src={URL.createObjectURL(file)} 
//                       alt={`Upload ${index + 1}`}
//                       className="h-32 w-full object-cover rounded-lg"
//                     />
//                     <button
//                       type="button"
//                       onClick={() => removeImageFile(index)}
//                       className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1.5 opacity-0 group-hover:opacity-100 transition-opacity disabled:opacity-50"
//                       disabled={isSubmitting}
//                     >
//                       <X size={14} />
//                     </button>
//                     <p className="text-xs text-gray-500 truncate mt-2">{file.name}</p>
//                     <p className="text-xs text-gray-400">
//                       {(file.size / 1024 / 1024).toFixed(2)} MB
//                     </p>
//                   </div>
//                 ))}
//               </div>
//             </div>
//           )}
//         </div>

//         {/* Validation Hint */}
//         <div className="mt-4 p-4 rounded-lg bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800">
//           <p className="text-sm font-medium text-yellow-800 dark:text-yellow-200">
//             {formData.imageUrls.length === 0 && imageFiles.length === 0
//               ? '⚠️ At least one image URL or file upload is required'
//               : `✅ Ready with ${formData.imageUrls.length} image URLs + ${imageFiles.length} files`
//             }
//           </p>
//         </div>
//       </div>

//       {/* Form Actions */}
//       <div className="flex justify-end space-x-4 pt-6 border-t dark:border-gray-700">
//         <Button
//           type="button"
//           variant="outline"
//           onClick={onClose}
//           disabled={isSubmitting}
//           className="px-6"
//         >
//           Cancel
//         </Button>
//         <Button
//           type="submit"
//           disabled={isSubmitting || (formData.imageUrls.length === 0 && imageFiles.length === 0)}
//           className="px-6 bg-royalBrown hover:bg-royalBrown/90"
//         >
//           {isSubmitting ? (
//             <>
//               <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
//               {product ? 'Updating...' : 'Creating...'}
//             </>
//           ) : (
//             product ? 'Update Product' : 'Add Product'
//           )}
//         </Button>
//       </div>
//     </form>
//   );
// };

// export default ProductForm;

import React, { useState, useEffect, useCallback } from 'react';
import { X, Upload, Trash2 } from 'lucide-react';
import Button from '../components/common/Button';
import Input from '../components/common/Input';
import Select from '../components/common/Select';

const ProductForm = ({ 
  product, 
  onClose, 
  onSuccess 
}) => {
  // Loading state for categories/collections
  const [isLoadingCategories, setIsLoadingCategories] = useState(true);
  const [isLoadingCollections, setIsLoadingCollections] = useState(true);
  
  // Form state
  const [formData, setFormData] = useState({
    name: '',
    category: '',
    collection: '',
    subCategory: '',
    price: '',
    discount: 0,
    stock: '',
    status: 'Active',
    description: '',
    features: [],
    tags: [],
    imageUrls: []
  });

  // Data states
  const [collections, setCollections] = useState([]);
  const [categories, setCategories] = useState({});
  
  // Edit mode specific states
  const [imagesToRemove, setImagesToRemove] = useState([]);
  const [imageFiles, setImageFiles] = useState([]);
  const [variants, setVariants] = useState([{ color: '#000000', size: 'S', price: '' }]);
  
  // UI states
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [newFeature, setNewFeature] = useState('');
  const [newTag, setNewTag] = useState('');

  // Define API base URL
  const API_BASE_URL = process.env.API_BASE_URL || 'https://api.sohwais.com/api';

  // Fetch collections
  const fetchCollections = useCallback(async () => {
    try {
      setIsLoadingCollections(true);
      const res = await fetch(`${API_BASE_URL}/collections`);
      if (!res.ok) throw new Error('Failed to fetch collections');
      const data = await res.json();
      console.log('Collections:', data);
      setCollections(data.collections || data || []);
    } catch (err) {
      console.error('Failed to fetch collections:', err);
      setError('Failed to load collections');
    } finally {
      setIsLoadingCollections(false);
    }
  }, [API_BASE_URL]);

  // Fetch categories
  const fetchCategories = useCallback(async () => {
    try {
      setIsLoadingCategories(true);
      const res = await fetch(`${API_BASE_URL}/categories`);
      if (!res.ok) throw new Error('Failed to fetch categories');
      const data = await res.json();
      console.log('Categories:', data);
      setCategories(data.categories || data || {});
    } catch (err) {
      console.error('Failed to fetch categories:', err);
      setError('Failed to load categories');
    } finally {
      setIsLoadingCategories(false);
    }
  }, [API_BASE_URL]);

  // Load data on mount
  useEffect(() => {
    fetchCollections();
    fetchCategories();
  }, [fetchCollections, fetchCategories]);

  // Load product data for edit mode
  useEffect(() => {
    if (product) {
      setFormData({
        name: product.name || '',
        category: product.category || '',
        collection: product.collection || '',
        subCategory: product.subCategory || '',
        price: product.price || '',
        discount: product.discount || 0,
        stock: product.stock || '',
        status: product.status || 'Active',
        description: product.description || '',
        features: product.features || [],
        tags: product.tags || [],
        imageUrls: product.images?.map(img => img.url) || []
      });
      setVariants(product.variants || [{ color: '#000000', size: 'S', price: '' }]);
      setImagesToRemove([]);
      setImageFiles([]);
    } else {
      // Reset for create mode
      setFormData({
        name: '',
        category: '',
        collection: '',
        subCategory: '',
        price: '',
        discount: 0,
        stock: '',
        status: 'Active',
        description: '',
        features: [],
        tags: [],
        imageUrls: []
      });
      setVariants([{ color: '#000000', size: 'S', price: '' }]);
      setImageFiles([]);
      setImagesToRemove([]);
    }
  }, [product]);

  // Get subcategories based on category
  const subCategories = categories[formData.category] || [];

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');

    try {
      // Basic validation
      if (!formData.name.trim()) throw new Error('Product name is required');
      if (!formData.category) throw new Error('Please select a category');
      if (!formData.collection) throw new Error('Please select a collection');
      if (!formData.subCategory) throw new Error('Please select a sub-category');
      if (!formData.price || formData.price <= 0) throw new Error('Valid price is required');
      if (!formData.stock || formData.stock < 0) throw new Error('Valid stock quantity is required');

      const formDataToSend = new FormData();
      
      // Add form fields
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
      formDataToSend.append('variants', JSON.stringify(variants.filter(v => v.price > 0)));

      // Handle images
      if (product) { // EDIT MODE
        if (imagesToRemove.length > 0) {
          formDataToSend.append('imagesToRemove', JSON.stringify(imagesToRemove));
        }
        const newImageUrls = formData.imageUrls.filter(url => 
          !product.images?.some(img => img.url === url)
        );
        if (newImageUrls.length > 0) {
          formDataToSend.append('imageUrls', JSON.stringify(newImageUrls));
        }
      } else { // CREATE MODE
        if (formData.imageUrls.length > 0) {
          formDataToSend.append('imageUrls', JSON.stringify(formData.imageUrls));
        }
      }

      // Add new image files
      imageFiles.forEach((file) => {
        formDataToSend.append('images', file);
      });

      // API call
      const url = product 
        ? `${API_BASE_URL}/products/${product._id}`
        : `${API_BASE_URL}/products`;
      
      const method = product ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method,
        body: formDataToSend
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data.message || data.errors?.[0] || 'Failed to save product');
      }

      onSuccess?.();
      onClose();
    } catch (err) {
      console.error('Error saving product:', err);
      setError(err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  // ... rest of your handler functions remain the same ...
  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (field === 'category') {
      setFormData(prev => ({ ...prev, subCategory: '' }));
    }
  };

  const addImageUrl = () => {
    const url = prompt('Enter image URL:');
    if (url?.trim()) {
      setFormData(prev => ({
        ...prev,
        imageUrls: [...prev.imageUrls, url.trim()]
      }));
    }
  };

  const removeImageUrl = (index) => {
    setFormData(prev => ({
      ...prev,
      imageUrls: prev.imageUrls.filter((_, i) => i !== index)
    }));
    setImagesToRemove(prev => prev.filter(i => i !== index));
  };

  const toggleImageRemove = (index) => {
    setImagesToRemove(prev => 
      prev.includes(index) ? prev.filter(i => i !== index) : [...prev, index]
    );
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

  const handleVariantChange = (index, field, value) => {
    const newVariants = [...variants];
    newVariants[index][field] = value;
    setVariants(newVariants);
  };

  const addVariant = () => {
    setVariants(prev => [...prev, { color: '#000000', size: 'S', price: '' }]);
  };

  const removeVariant = (index) => {
    if (variants.length > 1) {
      setVariants(prev => prev.filter((_, i) => i !== index));
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      {error && (
        <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4">
          <p className="text-red-700 dark:text-red-300 text-sm">{error}</p>
        </div>
      )}

      {/* Basic Info */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Input
          label="Product Name"
          value={formData.name}
          onChange={(e) => handleInputChange('name', e.target.value)}
          required
          disabled={isSubmitting}
        />
        
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Main Category <span className="text-red-500">*</span>
          </label>
          <Select
            value={formData.category}
            onChange={(e) => handleInputChange('category', e.target.value)}
            required
            disabled={isSubmitting || isLoadingCategories}
          >
            <option value="">Select main category</option>
            {isLoadingCategories ? (
              <option disabled>Loading categories...</option>
            ) : (
              Object.keys(categories).map(cat => (
                <option key={cat} value={cat}>{cat}</option>
              ))
            )}
          </Select>
          {isLoadingCategories && (
            <p className="text-xs text-gray-500 mt-1">Loading categories...</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Sub-Category <span className="text-red-500">*</span>
          </label>
          <Select
            value={formData.subCategory}
            onChange={(e) => handleInputChange('subCategory', e.target.value)}
            required
            disabled={isSubmitting || !formData.category || isLoadingCategories}
          >
            <option value="">Select sub-category</option>
            {isLoadingCategories ? (
              <option disabled>Loading...</option>
            ) : (
              subCategories.map(subCat => (
                <option key={subCat} value={subCat}>{subCat}</option>
              ))
            )}
          </Select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Collection <span className="text-red-500">*</span>
          </label>
          <Select
            value={formData.collection}
            onChange={(e) => handleInputChange('collection', e.target.value)}
            required
            disabled={isSubmitting || isLoadingCollections}
          >
            <option value="">Select collection</option>
            {isLoadingCollections ? (
              <option disabled>Loading collections...</option>
            ) : (
              collections.map(collection => (
                <option key={collection._id || collection} value={collection.name || collection}>
                  {collection.name || collection}
                </option>
              ))
            )}
          </Select>
          {isLoadingCollections && (
            <p className="text-xs text-gray-500 mt-1">Loading collections...</p>
          )}
        </div>

        {/* Rest of your form fields remain exactly the same */}
        <Input
          label="Price"
          type="number"
          value={formData.price}
          onChange={(e) => handleInputChange('price', e.target.value)}
          required
          min="0"
          step="0.01"
          disabled={isSubmitting}
        />

        <Input
          label="Discount (%)"
          type="number"
          value={formData.discount}
          onChange={(e) => handleInputChange('discount', e.target.value)}
          min="0"
          max="100"
          disabled={isSubmitting}
        />

        <Input
          label="Stock Quantity"
          type="number"
          value={formData.stock}
          onChange={(e) => handleInputChange('stock', e.target.value)}
          required
          min="0"
          disabled={isSubmitting}
        />

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Status
          </label>
          <Select
            value={formData.status}
            onChange={(e) => handleInputChange('status', e.target.value)}
            disabled={isSubmitting}
          >
            <option value="Active">Active</option>
            <option value="Inactive">Inactive</option>
            <option value="Out of Stock">Out of Stock</option>
            <option value="Coming Soon">Coming Soon</option>
          </Select>
        </div>
      </div>

      {/* Rest of your JSX remains EXACTLY THE SAME - Description, Features, Tags, Variants, Images, etc. */}
      {/* I've omitted them here for brevity but they should stay unchanged */}

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

export default ProductForm;
