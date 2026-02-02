
// // import React, { useState, useEffect } from 'react';
// // import { Search, Filter, Download, Eye, ChevronDown } from 'lucide-react';
// // import Table from '../components/common/Table';
// // import Modal from '../components/common/Modal';
// // import Button from '../components/common/Button';
// // import Input from '../components/common/Input';
// // import { orderAPI } from '../api/orders';
// // import { orderStatuses } from '../data/orders';

// // const Orders = () => {
// //   const [orderList, setOrderList] = useState([]);
// //   const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
// //   const [selectedOrder, setSelectedOrder] = useState(null);
// //   const [searchTerm, setSearchTerm] = useState('');
// //   const [selectedStatus, setSelectedStatus] = useState('all');
// //   const [loading, setLoading] = useState(true);
// //   const [error, setError] = useState(null);

// //   useEffect(() => {
// //     fetchOrders();
// //   }, []);

// //   const fetchOrders = async () => {
// //     try {
// //       setLoading(true);
// //       setError(null);
// //       const response = await orderAPI.getAllOrders();
// //       console.log('API Response:', response);
// //       // Note: Your API returns { ordrers: [...] } with typo 'ordrers'
// //       setOrderList(response.ordrers || response.orders || []);
// //     } catch (err) {
// //       console.error('Failed to fetch orders:', err);
// //       setError('Failed to load orders. Please try again.');
// //       setOrderList([]);
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   const fetchOrderDetails = async (orderId) => {
// //     try {
// //       const orderDetails = await orderAPI.getOrderDetails(orderId);
// //       console.log("Order details:", orderDetails);
// //       setSelectedOrder(orderDetails);
// //     } catch (err) {
// //       console.error('Failed to fetch order details:', err);
// //       setError('Failed to load order details.');
// //     }
// //   };

// //   const handleViewDetails = async (order) => {
// //     try {
// //       // Fetch complete order details from API
// //       const orderDetails = await orderAPI.getOrderDetails(order._id || order.id);
// //       setSelectedOrder(orderDetails);
// //       setIsDetailsModalOpen(true);
// //     } catch (err) {
// //       console.error('Failed to fetch order details:', err);
// //       // Fallback to local data if API fails
// //       setSelectedOrder(order);
// //       setIsDetailsModalOpen(true);
// //     }
// //   };

// //   const handleStatusChange = async (orderId, newStatus) => {
// //     try {
// //       // API call to update status would go here
// //       // await orderAPI.updateOrderStatus(orderId, { status: newStatus });
      
// //       // Update local state
// //       setOrderList(prev => prev.map(order =>
// //         (order._id || order.id) === orderId ? { ...order, status: newStatus } : order
// //       ));
      
// //       // If modal is open, update selected order too
// //       if (selectedOrder && (selectedOrder._id || selectedOrder.id) === orderId) {
// //         setSelectedOrder(prev => ({ ...prev, status: newStatus }));
// //       }
// //     } catch (err) {
// //       console.error('Failed to update order status:', err);
// //     }
// //   };

// //   const columns = [
// //     {
// //       key: 'orderId',
// //       title: 'Order ID',
// //       render: (value, row) => (
// //         <div className="flex items-center">
// //           <span className="font-medium text-gray-900 dark:text-white">{value}</span>
// //           {row.isNew && (
// //             <span className="ml-2 px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">
// //               NEW
// //             </span>
// //           )}
// //         </div>
// //       ),
// //     },
// //     { 
// //       key: 'customer', 
// //       title: 'Customer',
// //       render: (customer) => customer?.name || 'N/A'
// //     },
// //     { 
// //       key: 'customer', 
// //       title: 'Email',
// //       render: (customer) => customer?.email || 'N/A'
// //     },
// //     { 
// //       key: 'customer', 
// //       title: 'Mobile',
// //       render: (customer) => customer?.mobile || 'N/A'
// //     },
// //     { 
// //       key: 'totalAmount', 
// //       title: 'Amount', 
// //       render: (value) => `₹${value.toFixed(2)}` 
// //     },
// //     {
// //       key: 'status',
// //       title: 'Status',
// //       render: (value, row) => (
// //         <div className="flex items-center">
// //           <span className={`px-2 py-1 rounded-full text-xs ${
// //             value === 'delivered' || value === 'Delivered' ? 'bg-green-100 text-green-800' :
// //             value === 'pending' || value === 'Pending' ? 'bg-yellow-100 text-yellow-800' :
// //             value === 'cancelled' || value === 'Cancelled' ? 'bg-red-100 text-red-800' :
// //             'bg-blue-100 text-blue-800'
// //           }`}>
// //             {value?.charAt(0).toUpperCase() + value?.slice(1) || 'Pending'}
// //           </span>
// //           <ChevronDown className="ml-1 h-4 w-4 text-gray-400 cursor-pointer" />
// //         </div>
// //       ),
// //     },
// //     { 
// //       key: 'createdAt', 
// //       title: 'Date',
// //       render: (value) => new Date(value).toLocaleDateString('en-IN', {
// //         day: '2-digit',
// //         month: 'short',
// //         year: 'numeric'
// //       })
// //     },
// //     {
// //       key: 'actions',
// //       title: 'Actions',
// //       render: (_, row) => (
// //         <div className="flex space-x-2">
// //           <button
// //             onClick={() => handleViewDetails(row)}
// //             className="p-1 text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded"
// //             title="View Details"
// //           >
// //             <Eye size={16} />
// //           </button>
// //         </div>
// //       ),
// //     },
// //   ];

// //   const filteredOrders = orderList && orderList.filter(order => {
// //     if (!order) return false;
    
// //     const matchesSearch = 
// //       (order.orderId && order.orderId.toLowerCase().includes(searchTerm.toLowerCase())) ||
// //       (order.customer?.name && order.customer.name.toLowerCase().includes(searchTerm.toLowerCase())) ||
// //       (order.customer?.email && order.customer.email.toLowerCase().includes(searchTerm.toLowerCase())) ||
// //       (order.customer?.mobile && order.customer.mobile.includes(searchTerm));
    
// //     const matchesStatus = selectedStatus === 'all' || 
// //       (order.status && order.status.toLowerCase() === selectedStatus.toLowerCase());
    
// //     return matchesSearch && matchesStatus;
// //   });

// //   const formatOrderDetails = (order) => {
// //     if (!order) return null;
    
// //     return {
// //       id: order.orderId,
// //       _id: order._id,
// //       customerName: order.customer?.name || 'N/A',
// //       email: order.customer?.email || 'N/A',
// //       mobile: order.customer?.mobile || 'N/A',
// //       total: order.totalAmount || 0,
// //       subtotal: order.subtotal || 0,
// //       discount: order.discount || 0,
// //       tax: order.tax || 0,
// //       shippingCharge: order.shippingCharge || 0,
// //       status: order.status || 'pending',
// //       paymentStatus: order.paymentStatus || 'pending',
// //       createdAt: order.createdAt,
// //       razorpayOrderId: order.razorpayOrderId,
// //       statusUpdatedAt: order.updatedAt,
// //       shippingMethod: order.shippingMethod || 'Standard Delivery',
// //       trackingNumber: order.trackingNumber || null,
      
// //       products: order.items?.map(item => ({
// //         name: item.product?.name || item.name || 'Product',
// //         image: item.product?.image || item.image || null,
// //         category: item.product?.category || item.category || null,
// //         brand: item.product?.brand || item.brand || null,
// //         description: item.product?.description || item.description || null,
// //         size: item.product?.size || item.size || null,
// //         color: item.product?.color || item.color || null,
// //         quantity: item.quantity || 1,
// //         price: item.price || item.product?.price || 0,
// //         total: (item.quantity || 1) * (item.price || item.product?.price || 0)
// //       })) || [],
      
// //       shippingAddress: order.shippingAddress ? {
// //         street: `${order.shippingAddress.addressLine1 || ''} ${order.shippingAddress.addressLine2 || ''}`.trim(),
// //         city: order.shippingAddress.city || '',
// //         state: order.shippingAddress.state || '',
// //         zipCode: order.shippingAddress.pincode || '',
// //         country: order.shippingAddress.country || 'India'
// //       } : null
// //     };
// //   };

// //   const formattedSelectedOrder = formatOrderDetails(selectedOrder);

// //   return (
// //     <div className="space-y-6 text-royalBrown tracking-wide">
// //       {/* Header */}
// //       <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
// //         <div>
// //           <h1 className="text-2xl font-bold text-royalBrown font-royal dark:text-white">Orders</h1>
// //           <p className="text-gray-600 dark:text-gray-400">Manage customer orders</p>
// //         </div>
// //         <div className="flex space-x-3 mt-4 sm:mt-0">
// //           <Button onClick={fetchOrders} variant="outline">
// //             Refresh
// //           </Button>
// //           <Button variant="outline">
// //             <Download className="h-4 w-4 mr-2" />
// //             Export
// //           </Button>
// //         </div>
// //       </div>

// //       {/* Error Message */}
// //       {error && (
// //         <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
// //           {error}
// //         </div>
// //       )}

// //       {/* Filters */}
// //       <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-4 border border-gray-200 dark:border-gray-700">
// //         <div className="flex flex-col md:flex-row md:items-center md:space-x-4 space-y-4 md:space-y-0">
// //           <div className="flex-1">
// //             <div className="relative">
// //               <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
// //               <Input
// //                 type="search"
// //                 placeholder="Search by Order ID, Name, Email or Mobile..."
// //                 value={searchTerm}
// //                 onChange={(e) => setSearchTerm(e.target.value)}
// //                 className="pl-10 w-full"
// //               />
// //             </div>
// //           </div>
          
// //           <div className="flex space-x-4">
// //             <div className="relative">
// //               <select
// //                 value={selectedStatus}
// //                 onChange={(e) => setSelectedStatus(e.target.value)}
// //                 className="appearance-none bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg pl-4 pr-10 py-2 text-sm focus:ring-2 focus:ring-primary-500 focus:border-transparent"
// //               >
// //                 <option value="all">All Status</option>
// //                 {orderStatuses.map(status => (
// //                   <option key={status.value} value={status.value}>{status.label}</option>
// //                 ))}
// //               </select>
// //               <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none" />
// //             </div>

// //             <Button variant="outline">
// //               <Filter className="h-4 w-4 mr-2" />
// //               More Filters
// //             </Button>
// //           </div>
// //         </div>
// //       </div>

// //       {/* Orders Table */}
// //       <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
// //         {loading ? (
// //           <div className="flex justify-center items-center py-12">
// //             <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
// //           </div>
// //         ) : filteredOrders && filteredOrders.length > 0 ? (
// //           <Table columns={columns} data={filteredOrders} />
// //         ) : (
// //           <div className="flex flex-col items-center justify-center py-12">
// //             <div className="text-gray-400 mb-4">No orders found</div>
// //             <Button onClick={fetchOrders} variant="outline">
// //               Refresh
// //             </Button>
// //           </div>
// //         )}
// //       </div>

// //       {/* Order Details Modal */}
// //       <Modal
// //         isOpen={isDetailsModalOpen}
// //         onClose={() => setIsDetailsModalOpen(false)}
// //         title="Order Details"
// //         size="xl"
// //       >
// //         {formattedSelectedOrder && (
// //           <div className="space-y-6">
// //             {/* Order Summary - 3 columns layout */}
// //             <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
// //               <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
// //                 <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">Order ID</p>
// //                 <p className="font-medium text-gray-900 dark:text-white">{formattedSelectedOrder.id}</p>
// //                 <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">Razorpay: {formattedSelectedOrder.razorpayOrderId}</p>
// //               </div>
              
// //               <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
// //                 <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">Date & Time</p>
// //                 <p className="font-medium text-gray-900 dark:text-white">
// //                   {new Date(formattedSelectedOrder.createdAt).toLocaleDateString('en-IN', {
// //                     day: '2-digit',
// //                     month: 'short',
// //                     year: 'numeric'
// //                   })}
// //                 </p>
// //                 <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">
// //                   {new Date(formattedSelectedOrder.createdAt).toLocaleTimeString('en-IN', {
// //                     hour: '2-digit',
// //                     minute: '2-digit'
// //                   })}
// //                 </p>
// //               </div>
              
// //               <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
// //                 <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">Payment Status</p>
// //                 <p className={`font-medium ${
// //                   formattedSelectedOrder.paymentStatus === 'paid' 
// //                     ? 'text-green-600' 
// //                     : formattedSelectedOrder.paymentStatus === 'failed'
// //                     ? 'text-red-600'
// //                     : 'text-yellow-600'
// //                 }`}>
// //                   {formattedSelectedOrder.paymentStatus?.toUpperCase() || 'PENDING'}
// //                 </p>
// //               </div>
// //             </div>

// //             {/* Customer Info */}
// //             <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
// //               <h4 className="font-medium text-gray-900 dark:text-white mb-3">Customer Information</h4>
// //               <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
// //                 <div>
// //                   <p className="text-sm text-gray-500 dark:text-gray-400">Name</p>
// //                   <p className="font-medium text-gray-900 dark:text-white">{formattedSelectedOrder.customerName}</p>
// //                 </div>
// //                 <div>
// //                   <p className="text-sm text-gray-500 dark:text-gray-400">Email</p>
// //                   <p className="font-medium text-gray-900 dark:text-white">{formattedSelectedOrder.email}</p>
// //                 </div>
// //                 <div>
// //                   <p className="text-sm text-gray-500 dark:text-gray-400">Mobile</p>
// //                   <p className="font-medium text-gray-900 dark:text-white">{formattedSelectedOrder.mobile}</p>
// //                 </div>
// //               </div>
// //             </div>

// //             {/* Order Items - Complete Product Details */}
// //             {formattedSelectedOrder.products && formattedSelectedOrder.products.length > 0 && (
// //               <div>
// //                 <h4 className="font-medium text-gray-900 dark:text-white mb-3">Order Items ({formattedSelectedOrder.products.length})</h4>
// //                 <div className="space-y-3">
// //                   {formattedSelectedOrder.products.map((item, index) => (
// //                     <div key={index} className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
// //                       <div className="flex flex-col md:flex-row md:items-center gap-4">
// //                         {/* Product Image */}
// //                         <div className="flex-shrink-0">
// //                           <div className="w-20 h-20 bg-white dark:bg-gray-700 rounded-lg overflow-hidden flex items-center justify-center">
// //                             {item.image ? (
// //                               <img 
// //                                 src={item.image} 
// //                                 alt={item.name}
// //                                 className="w-full h-full object-cover"
// //                               />
// //                             ) : (
// //                               <div className="text-gray-400 text-sm text-center p-2">
// //                                 No Image
// //                               </div>
// //                             )}
// //                           </div>
// //                         </div>
                        
// //                         {/* Product Details */}
// //                         <div className="flex-1">
// //                           <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
// //                             <div>
// //                               <h5 className="font-bold text-gray-900 dark:text-white">{item.name}</h5>
// //                               {item.category && (
// //                                 <p className="text-sm text-gray-600 dark:text-gray-400">
// //                                   Category: <span className="text-gray-800 dark:text-gray-300">{item.category}</span>
// //                                 </p>
// //                               )}
// //                               {item.brand && (
// //                                 <p className="text-sm text-gray-600 dark:text-gray-400">
// //                                   Brand: <span className="text-gray-800 dark:text-gray-300">{item.brand}</span>
// //                                 </p>
// //                               )}
// //                               {item.size && (
// //                                 <p className="text-sm text-gray-600 dark:text-gray-400">
// //                                   Size: <span className="text-gray-800 dark:text-gray-300">{item.size}</span>
// //                                 </p>
// //                               )}
// //                               {item.color && (
// //                                 <div className="flex items-center mt-1">
// //                                   <span className="text-sm text-gray-600 dark:text-gray-400 mr-2">Color:</span>
// //                                   <div 
// //                                     className="w-4 h-4 rounded-full border border-gray-300"
// //                                     style={{ backgroundColor: item.color }}
// //                                     title={item.color}
// //                                   />
// //                                 </div>
// //                               )}
// //                             </div>
                            
// //                             {/* Price & Quantity */}
// //                             <div className="text-right">
// //                               <div className="mb-2">
// //                                 <p className="text-sm text-gray-500 dark:text-gray-400">Unit Price</p>
// //                                 <p className="font-medium text-gray-900 dark:text-white">₹{item.price.toFixed(2)}</p>
// //                               </div>
// //                               <div className="mb-2">
// //                                 <p className="text-sm text-gray-500 dark:text-gray-400">Quantity</p>
// //                                 <p className="font-medium text-gray-900 dark:text-white">{item.quantity}</p>
// //                               </div>
// //                               <div className="pt-2 border-t border-gray-200 dark:border-gray-700">
// //                                 <p className="text-sm text-gray-500 dark:text-gray-400">Total</p>
// //                                 <p className="font-bold text-lg text-primary-600 dark:text-primary-400">
// //                                   ₹{item.total.toFixed(2)}
// //                                 </p>
// //                               </div>
// //                             </div>
// //                           </div>
                          
// //                           {/* Product Description (if available) */}
// //                           {item.description && (
// //                             <div className="mt-3 pt-3 border-t border-gray-200 dark:border-gray-700">
// //                               <p className="text-sm text-gray-500 dark:text-gray-400">Description</p>
// //                               <p className="text-sm text-gray-700 dark:text-gray-300">{item.description}</p>
// //                             </div>
// //                           )}
// //                         </div>
// //                       </div>
// //                     </div>
// //                   ))}
// //                 </div>
// //               </div>
// //             )}

// //             {/* Price Breakdown - Side by side with Shipping */}
// //             <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
// //               {/* Price Breakdown */}
// //               <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
// //                 <h4 className="font-medium text-gray-900 dark:text-white mb-4">Price Breakdown</h4>
// //                 <div className="space-y-3">
// //                   <div className="flex justify-between items-center">
// //                     <span className="text-gray-600 dark:text-gray-400">Subtotal</span>
// //                     <span className="font-medium">₹{formattedSelectedOrder.subtotal.toFixed(2)}</span>
// //                   </div>
// //                   <div className="flex justify-between items-center">
// //                     <span className="text-gray-600 dark:text-gray-400">Discount</span>
// //                     <span className="font-medium text-green-600">-₹{formattedSelectedOrder.discount.toFixed(2)}</span>
// //                   </div>
// //                   <div className="flex justify-between items-center">
// //                     <span className="text-gray-600 dark:text-gray-400">Shipping</span>
// //                     <span className="font-medium">₹{formattedSelectedOrder.shippingCharge.toFixed(2)}</span>
// //                   </div>
// //                   <div className="flex justify-between items-center">
// //                     <span className="text-gray-600 dark:text-gray-400">Tax (GST)</span>
// //                     <span className="font-medium">₹{formattedSelectedOrder.tax.toFixed(2)}</span>
// //                   </div>
// //                   <div className="border-t border-gray-300 dark:border-gray-600 pt-3 mt-2">
// //                     <div className="flex justify-between items-center">
// //                       <span className="font-bold text-lg text-gray-900 dark:text-white">Total Amount</span>
// //                       <span className="font-bold text-xl text-primary-600 dark:text-primary-400">
// //                         ₹{formattedSelectedOrder.total.toFixed(2)}
// //                       </span>
// //                     </div>
// //                   </div>
// //                 </div>
// //               </div>

// //               {/* Shipping Details */}
// //               {formattedSelectedOrder.shippingAddress && (
// //                 <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
// //                   <h4 className="font-medium text-gray-900 dark:text-white mb-4">Shipping Details</h4>
// //                   <div className="space-y-3">
// //                     <div className="flex items-start">
// //                       <div className="text-gray-400 mr-3 mt-1">
// //                         <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
// //                           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
// //                           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
// //                         </svg>
// //                       </div>
// //                       <div>
// //                         <p className="font-medium text-gray-900 dark:text-white">Delivery Address</p>
// //                         <p className="text-gray-600 dark:text-gray-400">{formattedSelectedOrder.shippingAddress.street}</p>
// //                         <p className="text-gray-600 dark:text-gray-400">
// //                           {formattedSelectedOrder.shippingAddress.city}, {formattedSelectedOrder.shippingAddress.state} - {formattedSelectedOrder.shippingAddress.zipCode}
// //                         </p>
// //                         <p className="text-gray-600 dark:text-gray-400">{formattedSelectedOrder.shippingAddress.country}</p>
// //                       </div>
// //                     </div>
                    
// //                     {formattedSelectedOrder.shippingMethod && (
// //                       <div className="flex items-center">
// //                         <div className="text-gray-400 mr-3">
// //                           <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
// //                             <path d="M9 17a2 2 0 11-4 0 2 2 0 014 0zM19 17a2 2 0 11-4 0 2 2 0 014 0z" />
// //                             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10a1 1 0 001 1h1m8-1a1 1 0 01-1 1H9m4-1V8a1 1 0 011-1h2.586a1 1 0 01.707.293l3.414 3.414a1 1 0 01.293.707V16a1 1 0 01-1 1h-1m-6-1a1 1 0 001 1h1M5 17a2 2 0 104 0m-4 0a2 2 0 114 0m6 0a2 2 0 104 0m-4 0a2 2 0 114 0" />
// //                           </svg>
// //                         </div>
// //                         <div>
// //                           <p className="font-medium text-gray-900 dark:text-white">Shipping Method</p>
// //                           <p className="text-gray-600 dark:text-gray-400">{formattedSelectedOrder.shippingMethod}</p>
// //                         </div>
// //                       </div>
// //                     )}
                    
// //                     {formattedSelectedOrder.trackingNumber && (
// //                       <div className="flex items-center">
// //                         <div className="text-gray-400 mr-3">
// //                           <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
// //                             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
// //                           </svg>
// //                         </div>
// //                         <div>
// //                           <p className="font-medium text-gray-900 dark:text-white">Tracking Number</p>
// //                           <p className="text-gray-600 dark:text-gray-400">{formattedSelectedOrder.trackingNumber}</p>
// //                         </div>
// //                       </div>
// //                     )}
// //                   </div>
// //                 </div>
// //               )}
// //             </div>

// //             {/* Order Status & Actions */}
// //             <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
// //               <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
// //                 <div>
// //                   <h4 className="font-medium text-gray-900 dark:text-white mb-2">Current Status</h4>
// //                   <div className="flex items-center">
// //                     <span className={`px-3 py-1 rounded-full text-sm font-medium ${
// //                       formattedSelectedOrder.status === 'delivered' ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' :
// //                       formattedSelectedOrder.status === 'pending' ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200' :
// //                       formattedSelectedOrder.status === 'cancelled' ? 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200' :
// //                       formattedSelectedOrder.status === 'shipped' ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200' :
// //                       'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300'
// //                     }`}>
// //                       {formattedSelectedOrder.status?.charAt(0).toUpperCase() + formattedSelectedOrder.status?.slice(1) || 'Pending'}
// //                     </span>
// //                     {formattedSelectedOrder.statusUpdatedAt && (
// //                       <span className="ml-3 text-sm text-gray-500 dark:text-gray-400">
// //                         Updated: {new Date(formattedSelectedOrder.statusUpdatedAt).toLocaleDateString()}
// //                       </span>
// //                     )}
// //                   </div>
// //                 </div>
                
// //                 <div className="flex space-x-3">
// //                   <Button 
// //                     variant="outline" 
// //                     onClick={() => setIsDetailsModalOpen(false)}
// //                     className="min-w-[100px]"
// //                   >
// //                     Close
// //                   </Button>
// //                   <Button 
// //                     onClick={() => handleStatusChange(formattedSelectedOrder._id || formattedSelectedOrder.id, 'shipped')}
// //                     className="min-w-[150px] bg-primary-600 hover:bg-primary-700"
// //                   >
// //                     <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
// //                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
// //                     </svg>
// //                     Mark as Shipped
// //                   </Button>
// //                 </div>
// //               </div>
              
// //               {/* Status Update Options */}
// //               <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
// //                 <h4 className="font-medium text-gray-900 dark:text-white mb-3">Update Status</h4>
// //                 <div className="flex flex-wrap gap-2">
// //                   {orderStatuses.map((status) => (
// //                     <button
// //                       key={status.value}
// //                       onClick={() => handleStatusChange(formattedSelectedOrder._id || formattedSelectedOrder.id, status.value)}
// //                       className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
// //                         formattedSelectedOrder.status === status.value
// //                           ? status.color + ' ring-2 ring-offset-2 ring-opacity-50'
// //                           : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
// //                       }`}
// //                     >
// //                       {status.label}
// //                     </button>
// //                   ))}
// //                 </div>
// //               </div>
// //             </div>
// //           </div>
// //         )}
// //       </Modal>
// //     </div>
// //   );
// // };

// // export default Orders;
import React, { useState, useEffect, useRef } from 'react';
import { 
  Search, 
  Filter, 
  Download, 
  Eye, 
  ChevronDown, 
  Printer,
  FileText,
  ShoppingBag,
  Truck,
  Package,
  CheckCircle,
  XCircle,
  AlertCircle
} from 'lucide-react';
import Table from '../components/common/Table';
import Modal from '../components/common/Modal';
import Button from '../components/common/Button';
import Input from '../components/common/Input';
import { orderAPI } from '../api/orders';
import { orderStatuses } from '../data/orders';

const Orders = () => {
  const [orderList, setOrderList] = useState([]);
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const invoiceRef = useRef(null);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await orderAPI.getAllOrders();
      console.log('API Response:', response);
      // Note: Your API returns { ordrers: [...] } with typo 'ordrers'
      setOrderList(response.ordrers || response.orders || []);
    } catch (err) {
      console.error('Failed to fetch orders:', err);
      setError('Failed to load orders. Please try again.');
      setOrderList([]);
    } finally {
      setLoading(false);
    }
  };

  const fetchOrderDetails = async (orderId) => {
    try {
      const orderDetails = await orderAPI.getOrderDetails(orderId);
      console.log("Order details:", orderDetails);
      setSelectedOrder(orderDetails);
    } catch (err) {
      console.error('Failed to fetch order details:', err);
      setError('Failed to load order details.');
    }
  };

  const handleViewDetails = async (order) => {
    try {
      // Fetch complete order details from API
      const orderDetails = await orderAPI.getOrderDetails(order._id || order.id);
      setSelectedOrder(orderDetails);
      setIsDetailsModalOpen(true);
    } catch (err) {
      console.error('Failed to fetch order details:', err);
      // Fallback to local data if API fails
      setSelectedOrder(order);
      setIsDetailsModalOpen(true);
    }
  };

  const handleStatusChange = async (orderId, newStatus) => {
    try {
      // API call to update status would go here
      // await orderAPI.updateOrderStatus(orderId, { status: newStatus });
      
      // Update local state
      setOrderList(prev => prev.map(order =>
        (order._id || order.id) === orderId ? { ...order, status: newStatus } : order
      ));
      
      // If modal is open, update selected order too
      if (selectedOrder && (selectedOrder._id || selectedOrder.id) === orderId) {
        setSelectedOrder(prev => ({ ...prev, status: newStatus }));
      }
    } catch (err) {
      console.error('Failed to update order status:', err);
    }
  };

  const printInvoice = () => {
    if (!invoiceRef.current) return;
    
    const printContent = invoiceRef.current.innerHTML;
    const originalContent = document.body.innerHTML;
    
    const printWindow = window.open('', '_blank', 'width=800,height=600');
    printWindow.document.write(`
      <!DOCTYPE html>
      <html>
      <head>
        <title>Invoice - ${formattedSelectedOrder?.id || 'Order'}</title>
        <style>
          @media print {
            body { margin: 0; padding: 0; }
            .no-print { display: none !important; }
            .print-invoice { margin: 0; padding: 0; }
            * { -webkit-print-color-adjust: exact; }
          }
          
          body { 
            font-family: 'Courier New', monospace; 
            font-size: 12px; 
            margin: 0; 
            padding: 20px; 
          }
          
          .invoice-container {
            max-width: 72mm;
            margin: 0 auto;
            padding: 10px;
            border: 1px dashed #ccc;
          }
          
          .header {
            text-align: center;
            margin-bottom: 15px;
            border-bottom: 1px dashed #000;
            padding-bottom: 10px;
          }
          
          .store-name {
            font-size: 18px;
            font-weight: bold;
            margin: 0;
          }
          
          .store-address {
            font-size: 11px;
            margin: 5px 0;
          }
          
          .invoice-title {
            font-size: 16px;
            font-weight: bold;
            text-align: center;
            margin: 10px 0;
          }
          
          .divider {
            border-top: 1px dashed #000;
            margin: 10px 0;
          }
          
          .dashed-line {
            border-top: 1px dashed #000;
            margin: 15px 0;
          }
          
          table {
            width: 100%;
            border-collapse: collapse;
            margin: 10px 0;
          }
          
          th, td {
            padding: 4px 2px;
            text-align: left;
            font-size: 11px;
          }
          
          .item-table th {
            border-bottom: 1px dashed #000;
            border-top: 1px dashed #000;
          }
          
          .total-row {
            font-weight: bold;
            border-top: 2px solid #000;
          }
          
          .footer {
            text-align: center;
            margin-top: 20px;
            border-top: 1px dashed #000;
            padding-top: 10px;
            font-size: 10px;
          }
          
          .thank-you {
            margin: 15px 0;
            text-align: center;
            font-weight: bold;
          }
          
          .barcode {
            text-align: center;
            margin: 10px 0;
            font-family: 'Libre Barcode 128', cursive;
            font-size: 30px;
          }
        </style>
        <link href="https://fonts.googleapis.com/css2?family=Libre+Barcode+128&display=swap" rel="stylesheet">
      </head>
      <body>
        <div class="invoice-container">
          ${printContent}
        </div>
        <script>
          window.onload = function() {
            window.print();
            setTimeout(() => window.close(), 1000);
          }
        </script>
      </body>
      </html>
    `);
    
    printWindow.document.close();
  };

  const downloadInvoice = () => {
    if (!invoiceRef.current) return;
    
    const printContent = invoiceRef.current.innerHTML;
    const blob = new Blob([`
      <!DOCTYPE html>
      <html>
      <head>
        <title>Invoice - ${formattedSelectedOrder?.id || 'Order'}</title>
        <style>
          body { 
            font-family: 'Courier New', monospace; 
            font-size: 12px; 
            margin: 20px; 
            padding: 0; 
          }
          
          .invoice-container {
            max-width: 72mm;
            margin: 0 auto;
            padding: 10px;
            border: 1px solid #000;
          }
          
          .header {
            text-align: center;
            margin-bottom: 15px;
            border-bottom: 1px solid #000;
            padding-bottom: 10px;
          }
          
          .store-name {
            font-size: 18px;
            font-weight: bold;
            margin: 0;
          }
          
          .store-address {
            font-size: 11px;
            margin: 5px 0;
          }
          
          .invoice-title {
            font-size: 16px;
            font-weight: bold;
            text-align: center;
            margin: 10px 0;
          }
          
          .divider {
            border-top: 1px solid #000;
            margin: 10px 0;
          }
          
          table {
            width: 100%;
            border-collapse: collapse;
            margin: 10px 0;
          }
          
          th, td {
            padding: 4px 2px;
            text-align: left;
            font-size: 11px;
            border-bottom: 1px solid #ddd;
          }
          
          .item-table th {
            border-bottom: 2px solid #000;
          }
          
          .total-row {
            font-weight: bold;
            border-top: 2px solid #000;
          }
          
          .footer {
            text-align: center;
            margin-top: 20px;
            border-top: 1px solid #000;
            padding-top: 10px;
            font-size: 10px;
          }
          
          .thank-you {
            margin: 15px 0;
            text-align: center;
            font-weight: bold;
          }
          
          .barcode {
            text-align: center;
            margin: 10px 0;
            font-family: 'Libre Barcode 128', cursive;
            font-size: 30px;
          }
        </style>
        <link href="https://fonts.googleapis.com/css2?family=Libre+Barcode+128&display=swap" rel="stylesheet">
      </head>
      <body>
        <div class="invoice-container">
          ${printContent}
        </div>
      </body>
      </html>
    `], { type: 'text/html' });
    
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `Invoice_${formattedSelectedOrder?.id || 'Order'}.html`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const columns = [
    {
      key: 'orderId',
      title: 'Order ID',
      render: (value, row) => (
        <div className="flex items-center">
          <span className="font-medium text-gray-900 dark:text-white">{value}</span>
          {row.isNew && (
            <span className="ml-2 px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">
              NEW
            </span>
          )}
        </div>
      ),
    },
    { 
      key: 'customer', 
      title: 'Customer',
      render: (customer) => customer?.name || 'N/A'
    },
    { 
      key: 'customer', 
      title: 'Email',
      render: (customer) => customer?.email || 'N/A'
    },
    { 
      key: 'customer', 
      title: 'Mobile',
      render: (customer) => customer?.mobile || 'N/A'
    },
    { 
      key: 'totalAmount', 
      title: 'Amount', 
      render: (value) => `₹${value.toFixed(2)}` 
    },
    {
      key: 'status',
      title: 'Status',
      render: (value, row) => (
        <div className="flex items-center">
          <span className={`px-2 py-1 rounded-full text-xs ${
            value === 'delivered' || value === 'Delivered' ? 'bg-green-100 text-green-800' :
            value === 'pending' || value === 'Pending' ? 'bg-yellow-100 text-yellow-800' :
            value === 'cancelled' || value === 'Cancelled' ? 'bg-red-100 text-red-800' :
            'bg-blue-100 text-blue-800'
          }`}>
            {value?.charAt(0).toUpperCase() + value?.slice(1) || 'Pending'}
          </span>
          <ChevronDown className="ml-1 h-4 w-4 text-gray-400 cursor-pointer" />
        </div>
      ),
    },
    { 
      key: 'createdAt', 
      title: 'Date',
      render: (value) => new Date(value).toLocaleDateString('en-IN', {
        day: '2-digit',
        month: 'short',
        year: 'numeric'
      })
    },
    {
      key: 'actions',
      title: 'Actions',
      render: (_, row) => (
        <div className="flex space-x-2">
          <button
            onClick={() => handleViewDetails(row)}
            className="p-1 text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded"
            title="View Details"
          >
            <Eye size={16} />
          </button>
        </div>
      ),
    },
  ];

  const filteredOrders = orderList && orderList.filter(order => {
    if (!order) return false;
    
    const matchesSearch = 
      (order.orderId && order.orderId.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (order.customer?.name && order.customer.name.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (order.customer?.email && order.customer.email.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (order.customer?.mobile && order.customer.mobile.includes(searchTerm));
    
    const matchesStatus = selectedStatus === 'all' || 
      (order.status && order.status.toLowerCase() === selectedStatus.toLowerCase());
    
    return matchesSearch && matchesStatus;
  });

  const formatOrderDetails = (order) => {
    if (!order) return null;
    
    return {
      id: order.orderId,
      _id: order._id,
      customerName: order.customer?.name || 'N/A',
      email: order.customer?.email || 'N/A',
      mobile: order.customer?.mobile || 'N/A',
      total: order.totalAmount || 0,
      subtotal: order.subtotal || 0,
      discount: order.discount || 0,
      tax: order.tax || 0,
      shippingCharge: order.shippingCharge || 0,
      status: order.status || 'pending',
      paymentStatus: order.paymentStatus || 'pending',
      createdAt: order.createdAt,
      razorpayOrderId: order.razorpayOrderId,
      statusUpdatedAt: order.updatedAt,
      shippingMethod: order.shippingMethod || 'Standard Delivery',
      trackingNumber: order.trackingNumber || null,
      
      products: order.items?.map(item => ({
        name: item.product?.name || item.name || 'Product',
        image: item.product?.image || item.image || null,
        category: item.product?.category || item.category || null,
        brand: item.product?.brand || item.brand || null,
        description: item.product?.description || item.description || null,
        size: item.product?.size || item.size || null,
        color: item.product?.color || item.color || null,
        quantity: item.quantity || 1,
        price: item.price || item.product?.price || 0,
        total: (item.quantity || 1) * (item.price || item.product?.price || 0)
      })) || [],
      
      shippingAddress: order.shippingAddress ? {
        street: `${order.shippingAddress.addressLine1 || ''} ${order.shippingAddress.addressLine2 || ''}`.trim(),
        city: order.shippingAddress.city || '',
        state: order.shippingAddress.state || '',
        zipCode: order.shippingAddress.pincode || '',
        country: order.shippingAddress.country || 'India'
      } : null
    };
  };

  const formattedSelectedOrder = formatOrderDetails(selectedOrder);

  return (
    <div className="space-y-6 text-royalBrown tracking-wide">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-royalBrown font-royal dark:text-white">Orders</h1>
          <p className="text-gray-600 dark:text-gray-400">Manage customer orders</p>
        </div>
        {/* <div className="flex space-x-3 mt-4 sm:mt-0">
          <Button onClick={fetchOrders} variant="outline">
            Refresh
          </Button>
          <Button variant="outline">
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
        </div> */}
      </div>

      {/* Error Message */}
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
          {error}
        </div>
      )}

      {/* Filters */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-4 border border-gray-200 dark:border-gray-700">
        <div className="flex flex-col md:flex-row md:items-center md:space-x-4 space-y-4 md:space-y-0">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                type="search"
                placeholder="Search by Order ID, Name, Email or Mobile..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 w-full"
              />
            </div>
          </div>
          
          <div className="flex space-x-4">
            <div className="relative">
              <select
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
                className="appearance-none bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg pl-4 pr-10 py-2 text-sm focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              >
                <option value="all">All Status</option>
                {orderStatuses.map(status => (
                  <option key={status.value} value={status.value}>{status.label}</option>
                ))}
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

      {/* Orders Table */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
        {loading ? (
          <div className="flex justify-center items-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
          </div>
        ) : filteredOrders && filteredOrders.length > 0 ? (
          <Table columns={columns} data={filteredOrders} />
        ) : (
          <div className="flex flex-col items-center justify-center py-12">
            <div className="text-gray-400 mb-4">No orders found</div>
            <Button onClick={fetchOrders} variant="outline">
              Refresh
            </Button>
          </div>
        )}
      </div>

      {/* Order Details Modal */}
      <Modal
        isOpen={isDetailsModalOpen}
        onClose={() => setIsDetailsModalOpen(false)}
        title="Order Details"
        size="xl"
      >
        {formattedSelectedOrder && (
          <div className="space-y-6">
            {/* Hidden Invoice for printing */}
            <div ref={invoiceRef} className="hidden print-invoice">
              {/* Store Header */}
              <div className="header">
                <div className="store-name">SOHWAIS STORE</div>
                {/* <div className="store-address">123 Royal Street, Mumbai</div>
                <div className="store-address">Maharashtra - 400001</div>
                <div className="store-address">Phone: +91 9876543210</div>
                <div className="store-address">GSTIN: 27ABCDE1234F1Z5</div> */}
              </div>
              
              <div className="divider"></div>
              
              {/* Invoice Title */}
              <div className="invoice-title">TAX INVOICE</div>
              
              {/* Order Info */}
              <table>
                <tbody>
                  <tr>
                    <td>Invoice No:</td>
                    <td>{formattedSelectedOrder.id}</td>
                  </tr>
                  <tr>
                    <td>Date:</td>
                    <td>{new Date(formattedSelectedOrder.createdAt).toLocaleDateString('en-IN')}</td>
                  </tr>
                  <tr>
                    <td>Time:</td>
                    <td>{new Date(formattedSelectedOrder.createdAt).toLocaleTimeString('en-IN', {hour: '2-digit', minute:'2-digit'})}</td>
                  </tr>
                </tbody>
              </table>
              
              <div className="divider"></div>
              
              {/* Customer Info */}
              <div>
                <strong>Bill To:</strong>
                <div>{formattedSelectedOrder.customerName}</div>
                <div>{formattedSelectedOrder.email}</div>
                <div>{formattedSelectedOrder.mobile}</div>
              </div>
              
              <div className="divider"></div>
              
              {/* Items Table */}
              <table className="item-table">
                <thead>
                  <tr>
                    <th>Item</th>
                    <th>Qty</th>
                    <th>Price</th>
                    <th>Total</th>
                  </tr>
                </thead>
                <tbody>
                  {formattedSelectedOrder.products.map((item, index) => (
                    <tr key={index}>
                      <td>{item.name.substring(0, 20)}</td>
                      <td>{item.quantity}</td>
                      <td>₹{item.price.toFixed(2)}</td>
                      <td>₹{item.total.toFixed(2)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              
              <div className="divider"></div>
              
              {/* Totals */}
              <table>
                <tbody>
                  <tr>
                    <td>Subtotal:</td>
                    <td>₹{formattedSelectedOrder.subtotal.toFixed(2)}</td>
                  </tr>
                  <tr>
                    <td>Discount:</td>
                    <td>-₹{formattedSelectedOrder.discount.toFixed(2)}</td>
                  </tr>
                  <tr>
                    <td>Shipping:</td>
                    <td>₹{formattedSelectedOrder.shippingCharge.toFixed(2)}</td>
                  </tr>
                  <tr>
                    <td>Tax (GST):</td>
                    <td>₹{formattedSelectedOrder.tax.toFixed(2)}</td>
                  </tr>
                  <tr className="total-row">
                    <td>Grand Total:</td>
                    <td>₹{formattedSelectedOrder.total.toFixed(2)}</td>
                  </tr>
                </tbody>
              </table>
              
              <div className="dashed-line"></div>
              
              {/* Payment Info */}
              <div style={{ textAlign: 'center', margin: '10px 0' }}>
                <div>Payment: {formattedSelectedOrder.paymentStatus.toUpperCase()}</div>
                <div>Mode: {formattedSelectedOrder.razorpayOrderId ? 'Online' : 'COD'}</div>
              </div>
              
              {/* Thank You & Barcode */}
              <div className="thank-you">
                Thank you for shopping with us!
              </div>
              
              <div className="barcode">
                *{formattedSelectedOrder.id}*
              </div>
              
              <div className="footer">
                <div>Items are non-returnable</div>
                <div>Subject to Mumbai Jurisdiction</div>
                <div>E.&.O.E.</div>
              </div>
            </div>

            {/* Order Summary - 3 columns layout */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">Order ID</p>
                <p className="font-medium text-gray-900 dark:text-white">{formattedSelectedOrder.id}</p>
                <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">Razorpay: {formattedSelectedOrder.razorpayOrderId}</p>
              </div>
              
              <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">Date & Time</p>
                <p className="font-medium text-gray-900 dark:text-white">
                  {new Date(formattedSelectedOrder.createdAt).toLocaleDateString('en-IN', {
                    day: '2-digit',
                    month: 'short',
                    year: 'numeric'
                  })}
                </p>
                <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">
                  {new Date(formattedSelectedOrder.createdAt).toLocaleTimeString('en-IN', {
                    hour: '2-digit',
                    minute: '2-digit'
                  })}
                </p>
              </div>
              
              <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">Payment Status</p>
                <p className={`font-medium ${
                  formattedSelectedOrder.paymentStatus === 'paid' 
                    ? 'text-green-600' 
                    : formattedSelectedOrder.paymentStatus === 'failed'
                    ? 'text-red-600'
                    : 'text-yellow-600'
                }`}>
                  {formattedSelectedOrder.paymentStatus?.toUpperCase() || 'PENDING'}
                </p>
              </div>
            </div>

            {/* Customer Info */}
            <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
              <h4 className="font-medium text-gray-900 dark:text-white mb-3">Customer Information</h4>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Name</p>
                  <p className="font-medium text-gray-900 dark:text-white">{formattedSelectedOrder.customerName}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Email</p>
                  <p className="font-medium text-gray-900 dark:text-white">{formattedSelectedOrder.email}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Mobile</p>
                  <p className="font-medium text-gray-900 dark:text-white">{formattedSelectedOrder.mobile}</p>
                </div>
              </div>
            </div>

            {/* Order Items - Complete Product Details */}
            {formattedSelectedOrder.products && formattedSelectedOrder.products.length > 0 && (
              <div>
                <h4 className="font-medium text-gray-900 dark:text-white mb-3">Order Items ({formattedSelectedOrder.products.length})</h4>
                <div className="space-y-3">
                  {formattedSelectedOrder.products.map((item, index) => (
                    <div key={index} className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
                      <div className="flex flex-col md:flex-row md:items-center gap-4">
                        {/* Product Image */}
                        <div className="flex-shrink-0">
                          <div className="w-20 h-20 bg-white dark:bg-gray-700 rounded-lg overflow-hidden flex items-center justify-center">
                            {item.image ? (
                              <img 
                                src={item.image} 
                                alt={item.name}
                                className="w-full h-full object-cover"
                              />
                            ) : (
                              <div className="text-gray-400 text-sm text-center p-2">
                                No Image
                              </div>
                            )}
                          </div>
                        </div>
                        
                        {/* Product Details */}
                        <div className="flex-1">
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                              <h5 className="font-bold text-gray-900 dark:text-white">{item.name}</h5>
                              {item.category && (
                                <p className="text-sm text-gray-600 dark:text-gray-400">
                                  Category: <span className="text-gray-800 dark:text-gray-300">{item.category}</span>
                                </p>
                              )}
                              {item.brand && (
                                <p className="text-sm text-gray-600 dark:text-gray-400">
                                  Brand: <span className="text-gray-800 dark:text-gray-300">{item.brand}</span>
                                </p>
                              )}
                              {item.size && (
                                <p className="text-sm text-gray-600 dark:text-gray-400">
                                  Size: <span className="text-gray-800 dark:text-gray-300">{item.size}</span>
                                </p>
                              )}
                              {item.color && (
                                <div className="flex items-center mt-1">
                                  <span className="text-sm text-gray-600 dark:text-gray-400 mr-2">Color:</span>
                                  <div 
                                    className="w-4 h-4 rounded-full border border-gray-300"
                                    style={{ backgroundColor: item.color }}
                                    title={item.color}
                                  />
                                </div>
                              )}
                            </div>
                            
                            {/* Price & Quantity */}
                            <div className="text-right">
                              <div className="mb-2">
                                <p className="text-sm text-gray-500 dark:text-gray-400">Unit Price</p>
                                <p className="font-medium text-gray-900 dark:text-white">₹{item.price.toFixed(2)}</p>
                              </div>
                              <div className="mb-2">
                                <p className="text-sm text-gray-500 dark:text-gray-400">Quantity</p>
                                <p className="font-medium text-gray-900 dark:text-white">{item.quantity}</p>
                              </div>
                              <div className="pt-2 border-t border-gray-200 dark:border-gray-700">
                                <p className="text-sm text-gray-500 dark:text-gray-400">Total</p>
                                <p className="font-bold text-lg text-primary-600 dark:text-primary-400">
                                  ₹{item.total.toFixed(2)}
                                </p>
                              </div>
                            </div>
                          </div>
                          
                          {/* Product Description (if available) */}
                          {item.description && (
                            <div className="mt-3 pt-3 border-t border-gray-200 dark:border-gray-700">
                              <p className="text-sm text-gray-500 dark:text-gray-400">Description</p>
                              <p className="text-sm text-gray-700 dark:text-gray-300">{item.description}</p>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Price Breakdown - Side by side with Shipping */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Price Breakdown */}
              <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
                <h4 className="font-medium text-gray-900 dark:text-white mb-4">Price Breakdown</h4>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600 dark:text-gray-400">Subtotal</span>
                    <span className="font-medium">₹{formattedSelectedOrder.subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600 dark:text-gray-400">Discount</span>
                    <span className="font-medium text-green-600">-₹{formattedSelectedOrder.discount.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600 dark:text-gray-400">Shipping</span>
                    <span className="font-medium">₹{formattedSelectedOrder.shippingCharge.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600 dark:text-gray-400">Tax (GST)</span>
                    <span className="font-medium">₹{formattedSelectedOrder.tax.toFixed(2)}</span>
                  </div>
                  <div className="border-t border-gray-300 dark:border-gray-600 pt-3 mt-2">
                    <div className="flex justify-between items-center">
                      <span className="font-bold text-lg text-gray-900 dark:text-white">Total Amount</span>
                      <span className="font-bold text-xl text-primary-600 dark:text-primary-400">
                        ₹{formattedSelectedOrder.total.toFixed(2)}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Shipping Details */}
              {formattedSelectedOrder.shippingAddress && (
                <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
                  <h4 className="font-medium text-gray-900 dark:text-white mb-4">Shipping Details</h4>
                  <div className="space-y-3">
                    <div className="flex items-start">
                      <div className="text-gray-400 mr-3 mt-1">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                      </div>
                      <div>
                        <p className="font-medium text-gray-900 dark:text-white">Delivery Address</p>
                        <p className="text-gray-600 dark:text-gray-400">{formattedSelectedOrder.shippingAddress.street}</p>
                        <p className="text-gray-600 dark:text-gray-400">
                          {formattedSelectedOrder.shippingAddress.city}, {formattedSelectedOrder.shippingAddress.state} - {formattedSelectedOrder.shippingAddress.zipCode}
                        </p>
                        <p className="text-gray-600 dark:text-gray-400">{formattedSelectedOrder.shippingAddress.country}</p>
                      </div>
                    </div>
                    
                    {formattedSelectedOrder.shippingMethod && (
                      <div className="flex items-center">
                        <div className="text-gray-400 mr-3">
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path d="M9 17a2 2 0 11-4 0 2 2 0 014 0zM19 17a2 2 0 11-4 0 2 2 0 014 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10a1 1 0 001 1h1m8-1a1 1 0 01-1 1H9m4-1V8a1 1 0 011-1h2.586a1 1 0 01.707.293l3.414 3.414a1 1 0 01.293.707V16a1 1 0 01-1 1h-1m-6-1a1 1 0 001 1h1M5 17a2 2 0 104 0m-4 0a2 2 0 114 0m6 0a2 2 0 104 0m-4 0a2 2 0 114 0" />
                          </svg>
                        </div>
                        <div>
                          <p className="font-medium text-gray-900 dark:text-white">Shipping Method</p>
                          <p className="text-gray-600 dark:text-gray-400">{formattedSelectedOrder.shippingMethod}</p>
                        </div>
                      </div>
                    )}
                    
                    {formattedSelectedOrder.trackingNumber && (
                      <div className="flex items-center">
                        <div className="text-gray-400 mr-3">
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                        </div>
                        <div>
                          <p className="font-medium text-gray-900 dark:text-white">Tracking Number</p>
                          <p className="text-gray-600 dark:text-gray-400">{formattedSelectedOrder.trackingNumber}</p>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* Order Status & Actions with Print Buttons */}
            <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div>
                  <h4 className="font-medium text-gray-900 dark:text-white mb-2">Current Status</h4>
                  <div className="flex items-center">
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                      formattedSelectedOrder.status === 'delivered' ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' :
                      formattedSelectedOrder.status === 'pending' ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200' :
                      formattedSelectedOrder.status === 'cancelled' ? 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200' :
                      formattedSelectedOrder.status === 'shipped' ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200' :
                      'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300'
                    }`}>
                      {formattedSelectedOrder.status?.charAt(0).toUpperCase() + formattedSelectedOrder.status?.slice(1) || 'Pending'}
                    </span>
                    {formattedSelectedOrder.statusUpdatedAt && (
                      <span className="ml-3 text-sm text-gray-500 dark:text-gray-400">
                        Updated: {new Date(formattedSelectedOrder.statusUpdatedAt).toLocaleDateString()}
                      </span>
                    )}
                  </div>
                </div>
                
                <div className="flex space-x-3">
                  {/* Print Receipt Button */}
                  <Button 
                    onClick={printInvoice}
                    variant="outline"
                    className="min-w-[140px] border-green-600 text-green-600 hover:bg-green-50"
                  >
                    <Printer className="w-4 h-4 mr-2" />
                    Print Receipt
                  </Button>
                  
                  {/* Download Invoice Button */}
                  <Button 
                    onClick={downloadInvoice}
                    variant="outline"
                    className="min-w-[140px] border-blue-600 text-blue-600 hover:bg-blue-50"
                  >
                    <FileText className="w-4 h-4 mr-2" />
                    Download Invoice
                  </Button>
                  
                  <Button 
                    variant="outline" 
                    onClick={() => setIsDetailsModalOpen(false)}
                    className="min-w-[100px]"
                  >
                    Close
                  </Button>
                </div>
              </div>
              
              {/* Status Update Options */}
              {/* <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                <h4 className="font-medium text-gray-900 dark:text-white mb-3">Update Status</h4>
                <div className="flex flex-wrap gap-2">
                  {orderStatuses.map((status) => (
                    <button
                      key={status.value}
                      onClick={() => handleStatusChange(formattedSelectedOrder._id || formattedSelectedOrder.id, status.value)}
                      className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                        formattedSelectedOrder.status === status.value
                          ? status.color + ' ring-2 ring-offset-2 ring-opacity-50'
                          : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                      }`}
                    >
                      {status.label}
                    </button>
                  ))}
                </div>
              </div> */}
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default Orders;

// import React, { useState, useEffect, useRef } from 'react';
// import { 
//   Search, 
//   Filter, 
//   Download, 
//   Eye, 
//   ChevronDown, 
//   Printer,
//   FileText,
//   ShoppingBag,
//   Truck,
//   Package,
//   CheckCircle,
//   XCircle,
//   AlertCircle
// } from 'lucide-react';
// import Table from '../components/common/Table';
// import Modal from '../components/common/Modal';
// import Button from '../components/common/Button';
// import Input from '../components/common/Input';
// import { orderAPI } from '../api/orders';
// import { orderStatuses } from '../data/orders';

// // Real Barcode Component
// const BarcodeDisplay = ({ value }) => {
//   const canvasRef = useRef(null);

//   useEffect(() => {
//     if (canvasRef.current && value) {
//       // Dynamic import of jsbarcode
//       import('jsbarcode').then(({ default: JsBarcode }) => {
//         JsBarcode(canvasRef.current, value, {
//           format: "CODE128",
//           width: 2,
//           height: 50,
//           displayValue: true,
//           fontSize: 12,
//           margin: 10,
//           background: "#ffffff",
//           lineColor: "#000000"
//         });
//       }).catch(err => {
//         console.log("Barcode library not available, using fallback");
//         // Fallback to simple barcode
//         drawSimpleBarcode(canvasRef.current, value);
//       });
//     }
//   }, [value]);

//   const drawSimpleBarcode = (canvas, text) => {
//     const ctx = canvas.getContext('2d');
//     ctx.clearRect(0, 0, canvas.width, canvas.height);
    
//     const barWidth = 2;
//     const barHeight = 50;
//     const margin = 10;
//     let x = margin;
    
//     // Draw simple bars (not scannable, just visual)
//     for (let i = 0; i < text.length; i++) {
//       const barCount = text.charCodeAt(i) % 10;
//       for (let j = 0; j < barCount; j++) {
//         if (Math.random() > 0.3) {
//           ctx.fillRect(x, margin, barWidth, barHeight);
//         }
//         x += barWidth;
//       }
//       x += 2; // Gap between characters
//     }
    
//     // Draw text
//     ctx.font = '12px Arial';
//     ctx.textAlign = 'center';
//     ctx.fillText(text, canvas.width / 2, barHeight + margin + 15);
//   };

//   return <canvas ref={canvasRef} width={300} height={80} />;
// };

// const Orders = () => {
//   const [orderList, setOrderList] = useState([]);
//   const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
//   const [selectedOrder, setSelectedOrder] = useState(null);
//   const [searchTerm, setSearchTerm] = useState('');
//   const [selectedStatus, setSelectedStatus] = useState('all');
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const invoiceRef = useRef(null);

//   useEffect(() => {
//     fetchOrders();
//   }, []);

//   const fetchOrders = async () => {
//     try {
//       setLoading(true);
//       setError(null);
//       const response = await orderAPI.getAllOrders();
//       setOrderList(response.ordrers || response.orders || []);
//     } catch (err) {
//       console.error('Failed to fetch orders:', err);
//       setError('Failed to load orders. Please try again.');
//       setOrderList([]);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleViewDetails = async (order) => {
//     try {
//       const orderDetails = await orderAPI.getOrderDetails(order._id || order.id);
//       setSelectedOrder(orderDetails);
//       setIsDetailsModalOpen(true);
//     } catch (err) {
//       console.error('Failed to fetch order details:', err);
//       setSelectedOrder(order);
//       setIsDetailsModalOpen(true);
//     }
//   };

//   const handleStatusChange = async (orderId, newStatus) => {
//     try {
//       setOrderList(prev => prev.map(order =>
//         (order._id || order.id) === orderId ? { ...order, status: newStatus } : order
//       ));
      
//       if (selectedOrder && (selectedOrder._id || selectedOrder.id) === orderId) {
//         setSelectedOrder(prev => ({ ...prev, status: newStatus }));
//       }
//     } catch (err) {
//       console.error('Failed to update order status:', err);
//     }
//   };

//   const printInvoice = () => {
//     if (!invoiceRef.current || !formattedSelectedOrder) return;
    
//     const printWindow = window.open('', '_blank', 'width=800,height=600');
    
//     const invoiceHTML = `
//       <!DOCTYPE html>
//       <html>
//       <head>
//         <title>Invoice - ${formattedSelectedOrder.id}</title>
//         <style>
//           @media print {
//             body { margin: 0; padding: 0; }
//             .no-print { display: none !important; }
//             .print-invoice { margin: 0; padding: 0; }
//             * { -webkit-print-color-adjust: exact; }
//           }
          
//           body { 
//             font-family: 'Courier New', monospace; 
//             font-size: 12px; 
//             margin: 0; 
//             padding: 10px; 
//           }
          
//           .invoice-container {
//             max-width: 80mm;
//             margin: 0 auto;
//             padding: 5px;
//           }
          
//           .header {
//             text-align: center;
//             margin-bottom: 10px;
//             padding-bottom: 5px;
//             border-bottom: 1px dashed #000;
//           }
          
//           .store-name {
//             font-size: 16px;
//             font-weight: bold;
//             margin: 0;
//             text-transform: uppercase;
//           }
          
//           .store-address {
//             font-size: 10px;
//             margin: 2px 0;
//           }
          
//           .invoice-title {
//             font-size: 14px;
//             font-weight: bold;
//             text-align: center;
//             margin: 8px 0;
//             text-decoration: underline;
//           }
          
//           .divider {
//             border-top: 1px dashed #000;
//             margin: 8px 0;
//           }
          
//           .dashed-line {
//             border-top: 1px dashed #000;
//             margin: 10px 0;
//           }
          
//           table {
//             width: 100%;
//             border-collapse: collapse;
//             margin: 5px 0;
//             font-size: 11px;
//           }
          
//           th, td {
//             padding: 3px 2px;
//             text-align: left;
//           }
          
//           .item-table th {
//             border-bottom: 1px solid #000;
//             border-top: 1px solid #000;
//             padding: 4px 2px;
//           }
          
//           .total-row {
//             font-weight: bold;
//             border-top: 2px solid #000;
//           }
          
//           .footer {
//             text-align: center;
//             margin-top: 15px;
//             padding-top: 5px;
//             border-top: 1px dashed #000;
//             font-size: 9px;
//           }
          
//           .thank-you {
//             margin: 10px 0;
//             text-align: center;
//             font-weight: bold;
//             font-size: 11px;
//           }
          
//           .barcode-container {
//             text-align: center;
//             margin: 8px 0;
//           }
          
//           canvas {
//             max-width: 100%;
//             height: auto;
//           }
          
//           .text-center { text-align: center; }
//           .text-right { text-align: right; }
//           .bold { font-weight: bold; }
//           .uppercase { text-transform: uppercase; }
//         </style>
//       </head>
//       <body>
//         <div class="invoice-container">
//           ${invoiceRef.current.innerHTML}
//         </div>
//         <script src="https://cdn.jsdelivr.net/npm/jsbarcode@3.11.5/dist/JsBarcode.all.min.js"></script>
//         <script>
//           window.onload = function() {
//             // Generate REAL barcode
//             if (typeof JsBarcode !== 'undefined') {
//               try {
//                 JsBarcode("#invoice-barcode", "${formattedSelectedOrder.id}", {
//                   format: "CODE128",
//                   width: 1.8,
//                   height: 40,
//                   displayValue: true,
//                   fontSize: 10,
//                   margin: 5,
//                   background: "#ffffff",
//                   lineColor: "#000000"
//                 });
//               } catch(e) {
//                 console.log("Barcode generation failed:", e);
//               }
//             }
            
//             // Auto print
//             setTimeout(() => {
//               window.print();
//               setTimeout(() => {
//                 window.close();
//               }, 1000);
//             }, 300);
//           };
//         </script>
//       </body>
//       </html>
//     `;
    
//     printWindow.document.write(invoiceHTML);
//     printWindow.document.close();
//   };

//   const downloadInvoice = () => {
//     if (!invoiceRef.current || !formattedSelectedOrder) return;
    
//     const invoiceHTML = `
//       <!DOCTYPE html>
//       <html>
//       <head>
//         <title>Invoice - ${formattedSelectedOrder.id}</title>
//         <style>
//           body { 
//             font-family: 'Courier New', monospace; 
//             font-size: 12px; 
//             margin: 20px; 
//             padding: 0; 
//           }
          
//           .invoice-container {
//             max-width: 80mm;
//             margin: 0 auto;
//             padding: 10px;
//             border: 1px solid #000;
//           }
          
//           .header {
//             text-align: center;
//             margin-bottom: 15px;
//             padding-bottom: 10px;
//             border-bottom: 1px solid #000;
//           }
          
//           .store-name {
//             font-size: 18px;
//             font-weight: bold;
//             margin: 0;
//           }
          
//           .store-address {
//             font-size: 11px;
//             margin: 3px 0;
//           }
          
//           .invoice-title {
//             font-size: 16px;
//             font-weight: bold;
//             text-align: center;
//             margin: 10px 0;
//             text-decoration: underline;
//           }
          
//           table {
//             width: 100%;
//             border-collapse: collapse;
//             margin: 8px 0;
//           }
          
//           th, td {
//             padding: 4px 2px;
//             text-align: left;
//             font-size: 11px;
//             border-bottom: 1px solid #ddd;
//           }
          
//           .item-table th {
//             border-bottom: 2px solid #000;
//             padding: 5px 2px;
//           }
          
//           .total-row {
//             font-weight: bold;
//             border-top: 2px solid #000;
//           }
          
//           .footer {
//             text-align: center;
//             margin-top: 20px;
//             padding-top: 10px;
//             border-top: 1px solid #000;
//             font-size: 10px;
//           }
          
//           .thank-you {
//             margin: 15px 0;
//             text-align: center;
//             font-weight: bold;
//           }
          
//           .barcode-container {
//             text-align: center;
//             margin: 10px 0;
//           }
//         </style>
//       </head>
//       <body>
//         <div class="invoice-container">
//           ${invoiceRef.current.innerHTML}
//         </div>
//       </body>
//       </html>
//     `;
    
//     const blob = new Blob([invoiceHTML], { type: 'text/html' });
//     const url = URL.createObjectURL(blob);
//     const a = document.createElement('a');
//     a.href = url;
//     a.download = `Invoice_${formattedSelectedOrder.id}.html`;
//     document.body.appendChild(a);
//     a.click();
//     document.body.removeChild(a);
//     URL.revokeObjectURL(url);
//   };

//   const columns = [
//     {
//       key: 'orderId',
//       title: 'Order ID',
//       render: (value, row) => (
//         <div className="flex items-center">
//           <span className="font-medium text-gray-900 dark:text-white">{value}</span>
//           {row.isNew && (
//             <span className="ml-2 px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">
//               NEW
//             </span>
//           )}
//         </div>
//       ),
//     },
//     { 
//       key: 'customer', 
//       title: 'Customer',
//       render: (customer) => customer?.name || 'N/A'
//     },
//     { 
//       key: 'customer', 
//       title: 'Email',
//       render: (customer) => customer?.email || 'N/A'
//     },
//     { 
//       key: 'customer', 
//       title: 'Mobile',
//       render: (customer) => customer?.mobile || 'N/A'
//     },
//     { 
//       key: 'totalAmount', 
//       title: 'Amount', 
//       render: (value) => `₹${value.toFixed(2)}` 
//     },
//     {
//       key: 'status',
//       title: 'Status',
//       render: (value, row) => (
//         <div className="flex items-center">
//           <span className={`px-2 py-1 rounded-full text-xs ${
//             value === 'delivered' ? 'bg-green-100 text-green-800' :
//             value === 'pending' ? 'bg-yellow-100 text-yellow-800' :
//             value === 'cancelled' ? 'bg-red-100 text-red-800' :
//             'bg-blue-100 text-blue-800'
//           }`}>
//             {value?.charAt(0).toUpperCase() + value?.slice(1) || 'Pending'}
//           </span>
//         </div>
//       ),
//     },
//     { 
//       key: 'createdAt', 
//       title: 'Date',
//       render: (value) => new Date(value).toLocaleDateString('en-IN', {
//         day: '2-digit',
//         month: 'short',
//         year: 'numeric'
//       })
//     },
//     {
//       key: 'actions',
//       title: 'Actions',
//       render: (_, row) => (
//         <div className="flex space-x-2">
//           <button
//             onClick={() => handleViewDetails(row)}
//             className="p-1 text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded"
//             title="View Details"
//           >
//             <Eye size={16} />
//           </button>
//         </div>
//       ),
//     },
//   ];

//   const filteredOrders = orderList.filter(order => {
//     if (!order) return false;
    
//     const matchesSearch = 
//       (order.orderId && order.orderId.toLowerCase().includes(searchTerm.toLowerCase())) ||
//       (order.customer?.name && order.customer.name.toLowerCase().includes(searchTerm.toLowerCase())) ||
//       (order.customer?.email && order.customer.email.toLowerCase().includes(searchTerm.toLowerCase())) ||
//       (order.customer?.mobile && order.customer.mobile.includes(searchTerm));
    
//     const matchesStatus = selectedStatus === 'all' || 
//       (order.status && order.status.toLowerCase() === selectedStatus.toLowerCase());
    
//     return matchesSearch && matchesStatus;
//   });

//   const formatOrderDetails = (order) => {
//     if (!order) return null;
    
//     return {
//       id: order.orderId,
//       _id: order._id,
//       customerName: order.customer?.name || 'N/A',
//       email: order.customer?.email || 'N/A',
//       mobile: order.customer?.mobile || 'N/A',
//       total: order.totalAmount || 0,
//       subtotal: order.subtotal || 0,
//       discount: order.discount || 0,
//       tax: order.tax || 0,
//       shippingCharge: order.shippingCharge || 0,
//       status: order.status || 'pending',
//       paymentStatus: order.paymentStatus || 'pending',
//       createdAt: order.createdAt,
//       razorpayOrderId: order.razorpayOrderId,
//       shippingMethod: order.shippingMethod || 'Standard Delivery',
//       trackingNumber: order.trackingNumber || null,
      
//       products: order.items?.map(item => ({
//         name: item.product?.name || item.name || 'Product',
//         quantity: item.quantity || 1,
//         price: item.price || item.product?.price || 0,
//         total: (item.quantity || 1) * (item.price || item.product?.price || 0)
//       })) || [],
      
//       shippingAddress: order.shippingAddress ? {
//         street: `${order.shippingAddress.addressLine1 || ''} ${order.shippingAddress.addressLine2 || ''}`.trim(),
//         city: order.shippingAddress.city || '',
//         state: order.shippingAddress.state || '',
//         zipCode: order.shippingAddress.pincode || '',
//         country: order.shippingAddress.country || 'India'
//       } : null
//     };
//   };

//   const formattedSelectedOrder = formatOrderDetails(selectedOrder);

//   return (
//     <div className="space-y-6">
//       {/* Header */}
//       <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
//         <div>
//           <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Orders</h1>
//           <p className="text-gray-600 dark:text-gray-400">Manage customer orders</p>
//         </div>
//         <div className="flex space-x-3 mt-4 sm:mt-0">
//           <Button onClick={fetchOrders} variant="outline">
//             Refresh
//           </Button>
//         </div>
//       </div>

//       {/* Filters */}
//       <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-4 border border-gray-200 dark:border-gray-700">
//         <div className="flex flex-col md:flex-row md:items-center md:space-x-4 space-y-4 md:space-y-0">
//           <div className="flex-1">
//             <div className="relative">
//               <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
//               <Input
//                 type="search"
//                 placeholder="Search orders..."
//                 value={searchTerm}
//                 onChange={(e) => setSearchTerm(e.target.value)}
//                 className="pl-10 w-full"
//               />
//             </div>
//           </div>
          
//           <div className="flex space-x-4">
//             <div className="relative">
//               <select
//                 value={selectedStatus}
//                 onChange={(e) => setSelectedStatus(e.target.value)}
//                 className="appearance-none bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg pl-4 pr-10 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//               >
//                 <option value="all">All Status</option>
//                 {orderStatuses.map(status => (
//                   <option key={status.value} value={status.value}>{status.label}</option>
//                 ))}
//               </select>
//               <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none" />
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Orders Table */}
//       <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
//         {loading ? (
//           <div className="flex justify-center items-center py-12">
//             <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
//           </div>
//         ) : filteredOrders.length > 0 ? (
//           <Table columns={columns} data={filteredOrders} />
//         ) : (
//           <div className="flex flex-col items-center justify-center py-12">
//             <div className="text-gray-400 mb-4">No orders found</div>
//             <Button onClick={fetchOrders} variant="outline">
//               Refresh
//             </Button>
//           </div>
//         )}
//       </div>

//       {/* Order Details Modal */}
//       <Modal
//         isOpen={isDetailsModalOpen}
//         onClose={() => setIsDetailsModalOpen(false)}
//         title="Order Details"
//         size="xl"
//       >
//         {formattedSelectedOrder && (
//           <div className="space-y-6">
//             {/* Hidden Invoice for printing */}
//            {/* Hidden Invoice for printing */}
// <div ref={invoiceRef} className="hidden">
//   {/* Store Header - अपना address यहाँ डालो */}
//   <div className="header">
//     <div className="store-name uppercase">SOHWAIS STORE</div>
//     <div className="store-address">Shop No. 45, Fashion Street</div>
//     <div className="store-address">Andheri West, Mumbai</div>
//     <div className="store-address">Maharashtra - 400058</div>
//     <div className="store-address">Phone: +91 98765 43210</div>
//     <div className="store-address">GSTIN: 27AAFFS1234M1Z2</div>
//   </div>
  
//   <div className="divider"></div>
  
//   <div className="invoice-title">TAX INVOICE</div>
  
//   <table>
//     <tbody>
//       <tr>
//         <td><strong>Invoice No:</strong></td>
//         <td>{formattedSelectedOrder.id}</td>
//       </tr>
//       <tr>
//         <td><strong>Date:</strong></td>
//         <td>{new Date(formattedSelectedOrder.createdAt).toLocaleDateString('en-IN')}</td>
//       </tr>
//       <tr>
//         <td><strong>Time:</strong></td>
//         <td>{new Date(formattedSelectedOrder.createdAt).toLocaleTimeString('en-IN', {hour: '2-digit', minute:'2-digit'})}</td>
//       </tr>
//     </tbody>
//   </table>
  
//   <div className="divider"></div>
  
//   <div>
//     <strong>Bill To:</strong>
//     <div>{formattedSelectedOrder.customerName}</div>
//     <div>{formattedSelectedOrder.mobile}</div>
//   </div>
  
//   <div className="divider"></div>
  
//   <table className="item-table">
//     <thead>
//       <tr>
//         <th>Item</th>
//         <th>Qty</th>
//         <th>Price</th>
//         <th>Total</th>
//       </tr>
//     </thead>
//     <tbody>
//       {formattedSelectedOrder.products.map((item, index) => (
//         <tr key={index}>
//           <td>{item.name.substring(0, 20)}</td>
//           <td>{item.quantity}</td>
//           <td>₹{item.price.toFixed(2)}</td>
//           <td>₹{item.total.toFixed(2)}</td>
//         </tr>
//       ))}
//     </tbody>
//   </table>
  
//   <div className="divider"></div>
  
//   <table>
//     <tbody>
//       <tr>
//         <td>Subtotal:</td>
//         <td className="text-right">₹{formattedSelectedOrder.subtotal.toFixed(2)}</td>
//       </tr>
//       <tr>
//         <td>Discount:</td>
//         <td className="text-right">-₹{formattedSelectedOrder.discount.toFixed(2)}</td>
//       </tr>
//       <tr>
//         <td>Shipping:</td>
//         <td className="text-right">₹{formattedSelectedOrder.shippingCharge.toFixed(2)}</td>
//       </tr>
//       <tr>
//         <td>Tax (GST):</td>
//         <td className="text-right">₹{formattedSelectedOrder.tax.toFixed(2)}</td>
//       </tr>
//       <tr className="total-row">
//         <td><strong>Grand Total:</strong></td>
//         <td className="text-right"><strong>₹{formattedSelectedOrder.total.toFixed(2)}</strong></td>
//       </tr>
//     </tbody>
//   </table>
  
//   <div className="dashed-line"></div>
  
//   <div className="text-center">
//     <div><strong>Payment:</strong> {formattedSelectedOrder.paymentStatus.toUpperCase()}</div>
//     <div><strong>Mode:</strong> {formattedSelectedOrder.razorpayOrderId ? 'ONLINE' : 'COD'}</div>
//   </div>
  
//   <div className="thank-you">
//     Thank you for shopping with us!
//   </div>
  
//   {/* REAL Barcode will be inserted here by jsbarcode */}
//   <div className="barcode-container">
//     <svg id="invoice-barcode"></svg>
//   </div>
  
//   <div className="footer">
//     <div>Items are non-returnable</div>
//     <div>Subject to Mumbai Jurisdiction</div>
//     <div>E.&.O.E.</div>
//   </div>
// </div>

//             {/* Order Summary */}
//             <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//               <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
//                 <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">Order ID</p>
//                 <p className="font-medium text-gray-900 dark:text-white">{formattedSelectedOrder.id}</p>
//               </div>
              
//               <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
//                 <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">Date & Time</p>
//                 <p className="font-medium text-gray-900 dark:text-white">
//                   {new Date(formattedSelectedOrder.createdAt).toLocaleDateString('en-IN')}
//                 </p>
//                 <p className="text-xs text-gray-400 dark:text-gray-500">
//                   {new Date(formattedSelectedOrder.createdAt).toLocaleTimeString('en-IN')}
//                 </p>
//               </div>
              
//               <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
//                 <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">Payment Status</p>
//                 <p className={`font-medium ${
//                   formattedSelectedOrder.paymentStatus === 'paid' ? 'text-green-600' :
//                   formattedSelectedOrder.paymentStatus === 'failed' ? 'text-red-600' :
//                   'text-yellow-600'
//                 }`}>
//                   {formattedSelectedOrder.paymentStatus.toUpperCase()}
//                 </p>
//               </div>
//             </div>

//             {/* Customer Info */}
//             <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
//               <h4 className="font-medium text-gray-900 dark:text-white mb-3">Customer Information</h4>
//               <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//                 <div>
//                   <p className="text-sm text-gray-500 dark:text-gray-400">Name</p>
//                   <p className="font-medium text-gray-900 dark:text-white">{formattedSelectedOrder.customerName}</p>
//                 </div>
//                 <div>
//                   <p className="text-sm text-gray-500 dark:text-gray-400">Email</p>
//                   <p className="font-medium text-gray-900 dark:text-white">{formattedSelectedOrder.email}</p>
//                 </div>
//                 <div>
//                   <p className="text-sm text-gray-500 dark:text-gray-400">Mobile</p>
//                   <p className="font-medium text-gray-900 dark:text-white">{formattedSelectedOrder.mobile}</p>
//                 </div>
//               </div>
//             </div>

//             {/* Order Items */}
//             {formattedSelectedOrder.products.length > 0 && (
//               <div>
//                 <h4 className="font-medium text-gray-900 dark:text-white mb-3">Order Items ({formattedSelectedOrder.products.length})</h4>
//                 <div className="space-y-3">
//                   {formattedSelectedOrder.products.map((item, index) => (
//                     <div key={index} className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
//                       <div className="flex justify-between items-center">
//                         <div>
//                           <h5 className="font-bold text-gray-900 dark:text-white">{item.name}</h5>
//                           <p className="text-sm text-gray-600 dark:text-gray-400">
//                             Qty: {item.quantity} × ₹{item.price.toFixed(2)}
//                           </p>
//                         </div>
//                         <div className="text-right">
//                           <p className="font-bold text-lg text-blue-600 dark:text-blue-400">
//                             ₹{item.total.toFixed(2)}
//                           </p>
//                         </div>
//                       </div>
//                     </div>
//                   ))}
//                 </div>
//               </div>
//             )}

//             {/* Price Breakdown */}
//             <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
//               <h4 className="font-medium text-gray-900 dark:text-white mb-4">Price Breakdown</h4>
//               <div className="space-y-3">
//                 <div className="flex justify-between items-center">
//                   <span className="text-gray-600 dark:text-gray-400">Subtotal</span>
//                   <span className="font-medium">₹{formattedSelectedOrder.subtotal.toFixed(2)}</span>
//                 </div>
//                 <div className="flex justify-between items-center">
//                   <span className="text-gray-600 dark:text-gray-400">Discount</span>
//                   <span className="font-medium text-green-600">-₹{formattedSelectedOrder.discount.toFixed(2)}</span>
//                 </div>
//                 <div className="flex justify-between items-center">
//                   <span className="text-gray-600 dark:text-gray-400">Shipping</span>
//                   <span className="font-medium">₹{formattedSelectedOrder.shippingCharge.toFixed(2)}</span>
//                 </div>
//                 <div className="flex justify-between items-center">
//                   <span className="text-gray-600 dark:text-gray-400">Tax (GST)</span>
//                   <span className="font-medium">₹{formattedSelectedOrder.tax.toFixed(2)}</span>
//                 </div>
//                 <div className="border-t border-gray-300 dark:border-gray-600 pt-3 mt-2">
//                   <div className="flex justify-between items-center">
//                     <span className="font-bold text-lg text-gray-900 dark:text-white">Total Amount</span>
//                     <span className="font-bold text-xl text-blue-600 dark:text-blue-400">
//                       ₹{formattedSelectedOrder.total.toFixed(2)}
//                     </span>
//                   </div>
//                 </div>
//               </div>
//             </div>

//             {/* Shipping Details */}
//             {formattedSelectedOrder.shippingAddress && (
//               <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
//                 <h4 className="font-medium text-gray-900 dark:text-white mb-4">Shipping Details</h4>
//                 <div className="space-y-2">
//                   <p className="text-gray-600 dark:text-gray-400">{formattedSelectedOrder.shippingAddress.street}</p>
//                   <p className="text-gray-600 dark:text-gray-400">
//                     {formattedSelectedOrder.shippingAddress.city}, {formattedSelectedOrder.shippingAddress.state} - {formattedSelectedOrder.shippingAddress.zipCode}
//                   </p>
//                   <p className="text-gray-600 dark:text-gray-400">{formattedSelectedOrder.shippingAddress.country}</p>
//                 </div>
//               </div>
//             )}

//             {/* Invoice Actions & Barcode */}
//             <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
//               <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-4">
//                 <div>
//                   <h4 className="font-medium text-gray-900 dark:text-white mb-2">Current Status</h4>
//                   <span className={`px-3 py-1 rounded-full text-sm font-medium ${
//                     formattedSelectedOrder.status === 'delivered' ? 'bg-green-100 text-green-800' :
//                     formattedSelectedOrder.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
//                     formattedSelectedOrder.status === 'cancelled' ? 'bg-red-100 text-red-800' :
//                     'bg-blue-100 text-blue-800'
//                   }`}>
//                     {formattedSelectedOrder.status.toUpperCase()}
//                   </span>
//                 </div>
                
//                 <div className="flex flex-wrap gap-3">
//                   <Button 
//                     onClick={printInvoice}
//                     className="bg-green-600 hover:bg-green-700 text-white"
//                   >
//                     <Printer className="w-4 h-4 mr-2" />
//                     Print Invoice
//                   </Button>
                  
//                   <Button 
//                     onClick={downloadInvoice}
//                     variant="outline"
//                     className="border-blue-600 text-blue-600 hover:bg-blue-50"
//                   >
//                     <FileText className="w-4 h-4 mr-2" />
//                     Download Invoice
//                   </Button>
                  
//                   <Button 
//                     variant="outline" 
//                     onClick={() => setIsDetailsModalOpen(false)}
//                   >
//                     Close
//                   </Button>
//                 </div>
//               </div>

//               {/* Real Scannable Barcode */}
//               <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
//                 <h4 className="font-medium text-gray-900 dark:text-white mb-3 text-center">
//                   Invoice Barcode (Scannable)
//                 </h4>
//                 <div className="bg-white p-4 rounded-lg border border-gray-300 shadow-sm">
//                   <BarcodeDisplay value={formattedSelectedOrder.id} />
//                   <p className="text-center text-sm text-gray-600 mt-2">
//                     Order ID: <span className="font-bold">{formattedSelectedOrder.id}</span>
//                   </p>
//                   <p className="text-center text-xs text-gray-500 mt-1">
//                     CODE128 Format • Scan with any barcode reader
//                   </p>
//                 </div>
//               </div>

//               {/* Status Update */}
//               <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
//                 <h4 className="font-medium text-gray-900 dark:text-white mb-3">Update Status</h4>
//                 <div className="flex flex-wrap gap-2">
//                   {orderStatuses.map((status) => (
//                     <button
//                       key={status.value}
//                       onClick={() => handleStatusChange(formattedSelectedOrder._id, status.value)}
//                       className={`px-4 py-2 rounded-lg text-sm font-medium ${
//                         formattedSelectedOrder.status === status.value
//                           ? 'bg-blue-600 text-white'
//                           : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
//                       }`}
//                     >
//                       {status.label}
//                     </button>
//                   ))}
//                 </div>
//               </div>
//             </div>
//           </div>
//         )}
//       </Modal>
//     </div>
//   );
// };

// export default Orders;