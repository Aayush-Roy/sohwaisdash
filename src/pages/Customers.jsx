// // src/pages/Customers.jsx
// import React, { useState } from 'react';
// import { Search, Filter, User, Mail, Phone, CreditCard } from 'lucide-react';
// import Table from '../components/common/Table';
// import Modal from '../components/common/Modal';
// import Badge from '../components/common/Badge';
// import Input from '../components/common/Input';

// const Customers = () => {
//   const [customers, setCustomers] = useState([
//     {
//       id: '1',
//       name: 'John Doe',
//       email: 'john@example.com',
//       phone: '+1 (555) 123-4567',
//       orders: 12,
//       totalSpent: 2450.75,
//       status: 'Active',
//       joinDate: '2023-01-15',
//     },
//     {
//       id: '2',
//       name: 'Jane Smith',
//       email: 'jane@example.com',
//       phone: '+1 (555) 987-6543',
//       orders: 8,
//       totalSpent: 1567.50,
//       status: 'Active',
//       joinDate: '2023-02-20',
//     },
//     {
//       id: '3',
//       name: 'Robert Johnson',
//       email: 'robert@example.com',
//       phone: '+1 (555) 456-7890',
//       orders: 3,
//       totalSpent: 845.25,
//       status: 'Inactive',
//       joinDate: '2023-03-10',
//     },
//     {
//       id: '4',
//       name: 'Sarah Williams',
//       email: 'sarah@example.com',
//       phone: '+1 (555) 234-5678',
//       orders: 20,
//       totalSpent: 3890.00,
//       status: 'Active',
//       joinDate: '2022-12-05',
//     },
//     {
//       id: '5',
//       name: 'Michael Brown',
//       email: 'michael@example.com',
//       phone: '+1 (555) 876-5432',
//       orders: 5,
//       totalSpent: 1200.50,
//       status: 'Active',
//       joinDate: '2023-04-18',
//     },
//   ]);

//   const [isViewModalOpen, setIsViewModalOpen] = useState(false);
//   const [selectedCustomer, setSelectedCustomer] = useState(null);
//   const [searchTerm, setSearchTerm] = useState('');

//   const columns = [
//     {
//       key: 'name',
//       title: 'Customer',
//       render: (value, row) => (
//         <div className="flex items-center font-royal tracking-wide">
//           <div className="h-10 w-10 rounded-full bg-[#D9BA7E] dark:bg-primary-900/30 flex items-center justify-center">
//             <User className="h-5 w-5 text-[#411818] dark:text-primary-400" />
//           </div>
//           <div className="ml-4">
//             <p className="font-medium text-gray-900 dark:text-white">{value}</p>
//             <p className="text-sm text-gray-500 dark:text-gray-400">{row.email}</p>
//           </div>
//         </div>
//       ),
//     },
//     { key: 'orders', title: 'Orders', render: (value) => (
//       <span className="font-medium">{value}</span>
//     )},
//     { key: 'totalSpent', title: 'Total Spent', render: (value) => (
//       <span className="font-bold text-gray-900 dark:text-white">${value.toLocaleString()}</span>
//     )},
//     { key: 'status', title: 'Status', render: (value) => (
//       <Badge variant={value === 'Active' ? 'success' : 'danger'}>
//         {value}
//       </Badge>
//     )},
//     {
//       key: 'actions',
//       title: 'Actions',
//       render: (_, row) => (
//         <button
//           onClick={() => handleView(row)}
//           className="text-primary-600 dark:text-primary-400 hover:underline text-sm font-medium"
//         >
//           View Details
//         </button>
//       ),
//     },
//   ];

//   const handleView = (customer) => {
//     setSelectedCustomer(customer);
//     setIsViewModalOpen(true);
//   };

//   const handleToggleStatus = () => {
//     setCustomers(customers.map(customer =>
//       customer.id === selectedCustomer.id
//         ? { ...customer, status: customer.status === 'Active' ? 'Inactive' : 'Active' }
//         : customer
//     ));
//     setIsViewModalOpen(false);
//   };

//   const filteredCustomers = customers.filter(customer =>
//     customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
//     customer.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
//     customer.phone.includes(searchTerm)
//   );

//   return (
//     <div className="space-y-6">
//       {/* Header */}
//       <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
//         <div>
//           <h1 className="text-3xl font-bold font-royal text-royalBrown tracking-wide dark:text-white">Customers</h1>
//           <p className="text-gray-600 dark:text-gray-400">Manage your customer base</p>
//         </div>
//       </div>

//       {/* Filters */}
//       <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-4 border border-gray-200 dark:border-gray-700">
//         <div className="flex flex-col md:flex-row md:items-center md:space-x-4 space-y-4 md:space-y-0">
//           <div className="flex-1">
//             <div className="relative">
//               <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
//               <Input
//                 type="search"
//                 placeholder="Search customers by name, email, or phone..."
//                 value={searchTerm}
//                 onChange={(e) => setSearchTerm(e.target.value)}
//                 className="pl-10 w-full"
//               />
//             </div>
//           </div>
//           <button className="px-4 py-2.5 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 flex items-center">
//             <Filter className="h-5 w-5 mr-2" />
//             Filter
//           </button>
//         </div>
//       </div>

//       {/* Customers Table */}
//       <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
//         <Table columns={columns} data={filteredCustomers} />
//       </div>

//       {/* Customer Details Modal */}
//       {selectedCustomer && (
//         <Modal
//           isOpen={isViewModalOpen}
//           onClose={() => setIsViewModalOpen(false)}
//           title="Customer Details"
//           size="lg"
//         >
//           <div className="space-y-6">
//             {/* Customer Info */}
//             <div className="flex items-center space-x-4">
//               <div className="h-16 w-16 rounded-full bg-primary-100 dark:bg-primary-900/30 flex items-center justify-center">
//                 <User className="h-8 w-8 text-primary-600 dark:text-primary-400" />
//               </div>
//               <div>
//                 <h3 className="text-lg font-bold text-gray-900 dark:text-white">{selectedCustomer.name}</h3>
//                 <div className="flex items-center space-x-4 mt-1">
//                   <Badge variant={selectedCustomer.status === 'Active' ? 'success' : 'danger'}>
//                     {selectedCustomer.status}
//                   </Badge>
//                   <span className="text-sm text-gray-500 dark:text-gray-400">
//                     Joined {selectedCustomer.joinDate}
//                   </span>
//                 </div>
//               </div>
//             </div>

//             {/* Contact Info */}
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//               <div className="flex items-center space-x-3 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
//                 <Mail className="h-5 w-5 text-gray-400" />
//                 <div>
//                   <p className="text-sm text-gray-500 dark:text-gray-400">Email</p>
//                   <p className="font-medium text-gray-900 dark:text-white">{selectedCustomer.email}</p>
//                 </div>
//               </div>
//               <div className="flex items-center space-x-3 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
//                 <Phone className="h-5 w-5 text-gray-400" />
//                 <div>
//                   <p className="text-sm text-gray-500 dark:text-gray-400">Phone</p>
//                   <p className="font-medium text-gray-900 dark:text-white">{selectedCustomer.phone}</p>
//                 </div>
//               </div>
//             </div>

//             {/* Stats */}
//             <div className="grid grid-cols-2 gap-4">
//               <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
//                 <p className="text-sm text-gray-500 dark:text-gray-400">Total Orders</p>
//                 <p className="text-2xl font-bold text-gray-900 dark:text-white">{selectedCustomer.orders}</p>
//               </div>
//               <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
//                 <p className="text-sm text-gray-500 dark:text-gray-400">Total Spent</p>
//                 <p className="text-2xl font-bold text-gray-900 dark:text-white">
//                   ${selectedCustomer.totalSpent.toLocaleString()}
//                 </p>
//               </div>
//             </div>

//             {/* Actions */}
//             <div className="flex justify-end space-x-3 pt-6 border-t dark:border-gray-700">
//               <button
//                 onClick={handleToggleStatus}
//                 className={`px-4 py-2 rounded-lg font-medium ${
//                   selectedCustomer.status === 'Active'
//                     ? 'bg-red-600 text-white hover:bg-red-700'
//                     : 'bg-green-600 text-white hover:bg-green-700'
//                 }`}
//               >
//                 {selectedCustomer.status === 'Active' ? 'Block Customer' : 'Activate Customer'}
//               </button>
//               <button
//                 onClick={() => setIsViewModalOpen(false)}
//                 className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700"
//               >
//                 Close
//               </button>
//             </div>
//           </div>
//         </Modal>
//       )}
//     </div>
//   );
// };

// export default Customers;
// src/pages/Customers.jsx
import React, { useState, useEffect } from 'react';
import { Search, Filter, User, Mail, Phone, CreditCard, ShoppingBag, MapPin, Calendar } from 'lucide-react';
import Table from '../components/common/Table';
import Modal from '../components/common/Modal';
import Badge from '../components/common/Badge';
import Input from '../components/common/Input';

const Customers = () => {
  const [customers, setCustomers] = useState([]);
  const [allOrders, setAllOrders] = useState([]);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [customerOrders, setCustomerOrders] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCustomerData = async () => {
      try {
        setLoading(true);
        
        // Fetch orders data
        const ordersResponse = await fetch('https://api.sohwais.com/api/orders/all-orders');
        const ordersData = await ordersResponse.json();
        const allOrdersData = ordersData.ordrers || [];
        setAllOrders(allOrdersData);

        // Extract unique customers from orders
        const customerMap = {};
        
        allOrdersData.forEach(order => {
          if (order.customer && order.customer.email) {
            const customerEmail = order.customer.email;
            
            if (!customerMap[customerEmail]) {
              // First order for this customer
              customerMap[customerEmail] = {
                id: order.customer.email,
                name: order.customer.name || 'Unknown Customer',
                email: order.customer.email,
                phone: order.customer.mobile || 'N/A',
                orders: 1,
                totalSpent: order.totalAmount || 0,
                status: 'Active',
                joinDate: new Date(order.createdAt).toLocaleDateString('en-IN', {
                  day: '2-digit',
                  month: 'short',
                  year: 'numeric'
                }),
                firstOrderDate: order.createdAt,
                address: order.shippingAddress ? 
                  `${order.shippingAddress.addressLine1}, ${order.shippingAddress.city}` : 
                  'N/A'
              };
            } else {
              // Update existing customer stats
              customerMap[customerEmail].orders += 1;
              customerMap[customerEmail].totalSpent += order.totalAmount || 0;
              
              // Update join date to earliest order
              const currentDate = new Date(customerMap[customerEmail].firstOrderDate);
              const newDate = new Date(order.createdAt);
              if (newDate < currentDate) {
                customerMap[customerEmail].firstOrderDate = order.createdAt;
                customerMap[customerEmail].joinDate = newDate.toLocaleDateString('en-IN', {
                  day: '2-digit',
                  month: 'short',
                  year: 'numeric'
                });
              }
            }
          }
        });

        // Convert to array and sort by total spent
        const customersList = Object.values(customerMap)
          .sort((a, b) => b.totalSpent - a.totalSpent);

        setCustomers(customersList);

      } catch (err) {
        console.error('Error fetching customer data:', err);
        
        // Fallback to sample data if API fails
        setCustomers([
          {
            id: '1',
            name: 'John Doe',
            email: 'john@example.com',
            phone: '+1 (555) 123-4567',
            orders: 12,
            totalSpent: 2450.75,
            status: 'Active',
            joinDate: '2023-01-15',
          },
          {
            id: '2',
            name: 'Jane Smith',
            email: 'jane@example.com',
            phone: '+1 (555) 987-6543',
            orders: 8,
            totalSpent: 1567.50,
            status: 'Active',
            joinDate: '2023-02-20',
          },
        ]);
      } finally {
        setLoading(false);
      }
    };

    fetchCustomerData();
  }, []);

  const columns = [
    {
      key: 'name',
      title: 'Customer',
      render: (value, row) => (
        <div className="flex items-center font-royal tracking-wide">
          <div className="h-10 w-10 rounded-full bg-[#D9BA7E] dark:bg-primary-900/30 flex items-center justify-center">
            <User className="h-5 w-5 text-[#411818] dark:text-primary-400" />
          </div>
          <div className="ml-4">
            <p className="font-medium text-gray-900 dark:text-white">{value}</p>
            <p className="text-sm text-gray-500 dark:text-gray-400">{row.email}</p>
          </div>
        </div>
      ),
    },
    { 
      key: 'orders', 
      title: 'Orders', 
      render: (value) => (
        <span className="font-medium">{value}</span>
      )
    },
    { 
      key: 'totalSpent', 
      title: 'Total Spent', 
      render: (value) => (
        <span className="font-bold text-gray-900 dark:text-white">
          ₹{value.toLocaleString('en-IN', {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
          })}
        </span>
      )
    },
    { 
      key: 'status', 
      title: 'Status', 
      render: (value) => (
        <Badge variant={value === 'Active' ? 'success' : 'danger'}>
          {value}
        </Badge>
      )
    },
    {
      key: 'actions',
      title: 'Actions',
      render: (_, row) => (
        <button
          onClick={() => handleView(row)}
          className="text-primary-600 dark:text-primary-400 hover:underline text-sm font-medium"
        >
          View Details
        </button>
      ),
    },
  ];

  const handleView = (customer) => {
    setSelectedCustomer(customer);
    
    // Get all orders for this customer
    const customerOrders = allOrders.filter(order => 
      order.customer?.email === customer.email
    ).map(order => ({
      orderId: order.orderId,
      date: new Date(order.createdAt).toLocaleDateString('en-IN', {
        day: '2-digit',
        month: 'short',
        year: 'numeric'
      }),
      items: order.items.map(item => item.name).join(', '),
      quantity: order.items.reduce((sum, item) => sum + (item.quantity || 1), 0),
      amount: order.totalAmount,
      status: order.status,
      paymentStatus: order.paymentStatus
    }));
    
    setCustomerOrders(customerOrders);
    setIsViewModalOpen(true);
  };

  const filteredCustomers = customers.filter(customer =>
    customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    customer.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (customer.phone && customer.phone.toString().includes(searchTerm))
  );

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#D9BA7E] mx-auto"></div>
          <p className="mt-4 font-body text-royalBrown">Loading customer data...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold font-royal text-royalBrown tracking-wide dark:text-white">Customers</h1>
          <p className="text-gray-600 dark:text-gray-400">
            {customers.length} customers found • Total Revenue: ₹{
              customers.reduce((sum, customer) => sum + customer.totalSpent, 0)
                .toLocaleString('en-IN')
            }
          </p>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-4 border border-gray-200 dark:border-gray-700">
        <div className="flex flex-col md:flex-row md:items-center md:space-x-4 space-y-4 md:space-y-0">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <Input
                type="search"
                placeholder="Search customers by name, email, or phone..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 w-full"
              />
            </div>
          </div>
          <button className="px-4 py-2.5 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 flex items-center">
            <Filter className="h-5 w-5 mr-2" />
            Filter
          </button>
        </div>
      </div>

      {/* Customers Table */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
        {customers.length > 0 ? (
          <Table columns={columns} data={filteredCustomers} />
        ) : (
          <div className="text-center py-12">
            <User className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-500 dark:text-gray-400">No customers found</p>
          </div>
        )}
      </div>

      {/* Customer Details Modal */}
      {selectedCustomer && (
        <Modal
          isOpen={isViewModalOpen}
          onClose={() => setIsViewModalOpen(false)}
          title="Customer Details"
          size="xl"
        >
          <div className="space-y-6">
            {/* Customer Info */}
            <div className="flex items-start space-x-4">
              <div className="h-16 w-16 rounded-full bg-[#D9BA7E] dark:bg-primary-900/30 flex items-center justify-center">
                <User className="h-8 w-8 text-[#411818] dark:text-primary-400" />
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-bold text-gray-900 dark:text-white">{selectedCustomer.name}</h3>
                <div className="flex flex-wrap items-center gap-2 mt-1">
                  <Badge variant={selectedCustomer.status === 'Active' ? 'success' : 'danger'}>
                    {selectedCustomer.status}
                  </Badge>
                  <span className="text-sm text-gray-500 dark:text-gray-400 flex items-center">
                    <Calendar className="h-3 w-3 mr-1" />
                    Joined {selectedCustomer.joinDate}
                  </span>
                  <span className="text-sm text-gray-500 dark:text-gray-400 flex items-center">
                    <MapPin className="h-3 w-3 mr-1" />
                    {selectedCustomer.address}
                  </span>
                </div>
              </div>
            </div>

            {/* Contact Info */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-center space-x-3 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                <Mail className="h-5 w-5 text-gray-400" />
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Email</p>
                  <p className="font-medium text-gray-900 dark:text-white">{selectedCustomer.email}</p>
                </div>
              </div>
              <div className="flex items-center space-x-3 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                <Phone className="h-5 w-5 text-gray-400" />
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Phone</p>
                  <p className="font-medium text-gray-900 dark:text-white">{selectedCustomer.phone}</p>
                </div>
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
                <p className="text-sm text-gray-500 dark:text-gray-400">Total Orders</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">{selectedCustomer.orders}</p>
              </div>
              <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
                <p className="text-sm text-gray-500 dark:text-gray-400">Total Spent</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  ₹{selectedCustomer.totalSpent.toLocaleString('en-IN')}
                </p>
              </div>
              <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
                <p className="text-sm text-gray-500 dark:text-gray-400">Avg. Order Value</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  ₹{(selectedCustomer.totalSpent / selectedCustomer.orders).toLocaleString('en-IN', {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2
                  })}
                </p>
              </div>
            </div>

            {/* Order History */}
            <div>
              <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-3 flex items-center">
                <ShoppingBag className="h-5 w-5 mr-2" />
                Order History ({customerOrders.length} orders)
              </h4>
              {customerOrders.length > 0 ? (
                <div className="bg-gray-50 dark:bg-gray-800 rounded-lg overflow-hidden">
                  <table className="w-full">
                    <thead className="bg-gray-100 dark:bg-gray-700">
                      <tr>
                        <th className="px-4 py-3 text-left text-sm font-medium text-gray-700 dark:text-gray-300">Order ID</th>
                        <th className="px-4 py-3 text-left text-sm font-medium text-gray-700 dark:text-gray-300">Date</th>
                        <th className="px-4 py-3 text-left text-sm font-medium text-gray-700 dark:text-gray-300">Items</th>
                        <th className="px-4 py-3 text-left text-sm font-medium text-gray-700 dark:text-gray-300">Amount</th>
                        <th className="px-4 py-3 text-left text-sm font-medium text-gray-700 dark:text-gray-300">Status</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                      {customerOrders.map((order, index) => (
                        <tr key={index} className="hover:bg-gray-100 dark:hover:bg-gray-700">
                          <td className="px-4 py-3 text-sm text-gray-700 dark:text-gray-300">
                            {order.orderId}
                          </td>
                          <td className="px-4 py-3 text-sm text-gray-700 dark:text-gray-300">
                            {order.date}
                          </td>
                          <td className="px-4 py-3 text-sm text-gray-700 dark:text-gray-300">
                            <div>
                              <p className="font-medium">{order.items}</p>
                              <p className="text-xs text-gray-500">{order.quantity} item(s)</p>
                            </div>
                          </td>
                          <td className="px-4 py-3 text-sm font-medium text-gray-900 dark:text-white">
                            ₹{order.amount.toLocaleString('en-IN')}
                          </td>
                          <td className="px-4 py-3">
                            <Badge variant={
                              order.status === 'processing' ? 'primary' :
                              order.status === 'completed' ? 'success' :
                              order.status === 'pending' ? 'warning' : 'danger'
                            }>
                              {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                            </Badge>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <div className="text-center py-8 bg-gray-50 dark:bg-gray-800 rounded-lg">
                  <ShoppingBag className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-500 dark:text-gray-400">No orders found for this customer</p>
                </div>
              )}
            </div>

            {/* Actions */}
            <div className="flex justify-end space-x-3 pt-6 border-t dark:border-gray-700">
              <button
                onClick={() => setIsViewModalOpen(false)}
                className="px-4 py-2 bg-[#411818] text-white rounded-lg font-medium hover:bg-[#5a2525]"
              >
                Close
              </button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default Customers;