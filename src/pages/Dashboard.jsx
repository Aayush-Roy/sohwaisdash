// // // src/pages/Dashboard.jsx
// // import React, { useState, useEffect } from 'react';
// // import {
// //   Package,
// //   ShoppingCart,
// //   DollarSign,
// //   Clock,
// //   TrendingUp,
// //   TrendingDown,
// // } from 'lucide-react';
// // import LineChart from '../components/charts/LineChart';
// // import Table from '../components/common/Table';
// // import { orders } from '../data/orders';

// // const Dashboard = () => {
// //   const [stats, setStats] = useState({
// //     totalProducts: 0,
// //     totalOrders: 0,
// //     totalRevenue: 0,
// //     pendingOrders: 0,
// //   });

// //   const [recentOrders, setRecentOrders] = useState([]);

// //   useEffect(() => {
// //     // Simulate fetching data
// //     setStats({
// //       totalProducts: 1245,
// //       totalOrders: 342,
// //       totalRevenue: 45980.50,
// //       pendingOrders: 23,
// //     });

// //     setRecentOrders(orders.slice(0, 5));
// //   }, []);

// //   const kpis = [
// //     {
// //       title: 'Total Products',
// //       value: stats.totalProducts.toLocaleString(),
// //       icon: Package,
// //       change: '+12.5%',
// //       trend: 'up',
// //       color: 'bg-blue-500',
// //     },
// //     {
// //       title: 'Total Orders',
// //       value: stats.totalOrders.toLocaleString(),
// //       icon: ShoppingCart,
// //       change: '+8.2%',
// //       trend: 'up',
// //       color: 'bg-green-500',
// //     },
// //     {
// //       title: 'Total Revenue',
// //       value: `$${stats.totalRevenue.toLocaleString()}`,
// //       icon: DollarSign,
// //       change: '+18.3%',
// //       trend: 'up',
// //       color: 'bg-purple-500',
// //     },
// //     {
// //       title: 'Pending Orders',
// //       value: stats.pendingOrders,
// //       icon: Clock,
// //       change: '-3.1%',
// //       trend: 'down',
// //       color: 'bg-yellow-500',
// //     },
// //   ];

// //   const orderColumns = [
// //     { key: 'id', title: 'Order ID' },
// //     { key: 'customerName', title: 'Customer' },
// //     { key: 'total', title: 'Amount', render: (value) => `$${value}` },
// //     { key: 'status', title: 'Status', render: (value) => (
// //       <span className={`px-2 py-1 rounded-full text-xs ${
// //         value === 'Delivered' ? 'bg-green-100 text-green-800' :
// //         value === 'Pending' ? 'bg-yellow-100 text-yellow-800' :
// //         value === 'Cancelled' ? 'bg-red-100 text-red-800' :
// //         'bg-blue-100 text-blue-800'
// //       }`}>
// //         {value}
// //       </span>
// //     )},
// //     { key: 'date', title: 'Date' },
// //   ];

// //   return (
// //     <div className="space-y-6  ">
// //       {/* Header */}
      
// //       {/* <div>
// //         <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Dashboard</h1>
// //         <p className="text-gray-600 dark:text-gray-400">Welcome back! Here's what's happening with your store today.</p>
// //       </div> */}
// //   <div>
// //   <h1 className="text-3xl font-royal tracking-wide text-royalBrown dark:text-ivory">
// //     Dashboard
// //   </h1>
// //   <p className="mt-1 font-body text-royalBrown/70 dark:text-ivory/70">
// //     Welcome back! Here's what's happening with your store today.
// //   </p>
// // </div>
// //       {/* KPI Cards */}
// //       {/* <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
// //         {kpis.map((kpi, index) => (
// //           <div
// //             key={index}
// //             className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 border border-gray-200 dark:border-gray-700"
// //           >
// //             <div className="flex items-center justify-between">
// //               <div>
// //                 <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
// //                   {kpi.title}
// //                 </p>
// //                 <p className="text-2xl font-bold text-gray-900 dark:text-white mt-2">
// //                   {kpi.value}
// //                 </p>
// //                 <div className="flex items-center mt-2">
// //                   {kpi.trend === 'up' ? (
// //                     <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
// //                   ) : (
// //                     <TrendingDown className="h-4 w-4 text-red-500 mr-1" />
// //                   )}
// //                   <span className={`text-sm font-medium ${
// //                     kpi.trend === 'up' ? 'text-green-600' : 'text-red-600'
// //                   }`}>
// //                     {kpi.change}
// //                   </span>
// //                   <span className="text-sm text-gray-500 dark:text-gray-400 ml-2">
// //                     from last month
// //                   </span>
// //                 </div>
// //               </div>
// //               <div className={`${kpi.color} p-3 rounded-full`}>
// //                 <kpi.icon className="h-6 w-6 text-white" />
// //               </div>
// //             </div>
// //           </div>
// //         ))}
// //       </div> */}
// //       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
// //   {kpis.map((kpi, index) => (
// //     <div
// //       key={index}
// //       className="bg-ivory dark:bg-gray-800 rounded-xl shadow-sm p-6 border border-antiqueGold/30"
// //     >
// //       <div className="flex items-center justify-between">
// //         <div>
// //           <p className="text-sm font-body text-royalBrown/60">
// //             {kpi.title}
// //           </p>

// //           <p className="text-3xl font-royal text-royalBrown mt-2">
// //             {kpi.value}
// //           </p>

// //           <div className="flex items-center mt-2">
// //             {kpi.trend === 'up' ? (
// //               <TrendingUp className="h-4 w-4 text-emerald-600 mr-1" />
// //             ) : (
// //               <TrendingDown className="h-4 w-4 text-maroon mr-1" />
// //             )}

// //             <span
// //               className={`text-sm font-body ${
// //                 kpi.trend === 'up'
// //                   ? 'text-emerald-700'
// //                   : 'text-maroon'
// //               }`}
// //             >
// //               {kpi.change}
// //             </span>

// //             <span className="text-sm font-body text-royalBrown/50 ml-2">
// //               from last month
// //             </span>
// //           </div>
// //         </div>

// //         <div className="bg-antiqueGold/90 p-3 rounded-full shadow-md">
// //           <kpi.icon className="h-6 w-6 text-ivory" />
// //         </div>
// //       </div>
// //     </div>
// //   ))}
// // </div>

// //       {/* Charts */}
// //       <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
// //         {/* Revenue Chart */}
// //         <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 border border-gray-200 dark:border-gray-700">
// //           <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
// //             Revenue Overview
// //           </h3>
// //           <LineChart />
// //         </div>

// //         {/* Orders Chart */}
// //         <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 border border-gray-200 dark:border-gray-700">
// //           <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
// //             Orders Overview
// //           </h3>
// //           <LineChart variant="orders" />
// //         </div>
// //       </div>

// //       {/* Recent Orders */}
// //       {/* <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 border border-gray-200 dark:border-gray-700">
// //         <div className="flex items-center justify-between mb-6">
// //           <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
// //             Recent Orders
// //           </h3>
// //           <button className="text-primary-600 dark:text-primary-400 hover:underline text-sm font-medium">
// //             View all orders
// //           </button>
// //         </div>
// //         <Table columns={orderColumns} data={recentOrders} />
// //       </div> */}
// //       <div className="bg-ivory dark:bg-gray-800 rounded-xl shadow-sm p-6 border border-antiqueGold/30">
// //   <div className="flex items-center justify-between mb-6">
// //     <h3 className="text-xl font-royal tracking-wide text-royalBrown">
// //       Recent Orders
// //     </h3>

// //     <button className="font-body text-antiqueGold hover:underline text-sm">
// //       View all orders
// //     </button>
// //   </div>

// //   <Table columns={orderColumns} data={recentOrders} />
// // </div>

// //     </div>
// //   );
// // };

// // export default Dashboard;
// // src/pages/Dashboard.jsx
// import React, { useState, useEffect } from 'react';
// import {
//   Package,
//   ShoppingCart,
//   DollarSign,
//   Clock,
//   TrendingUp,
//   TrendingDown,
// } from 'lucide-react';
// import LineChart from '../components/charts/LineChart';
// import Table from '../components/common/Table';

// const Dashboard = () => {
//   const [stats, setStats] = useState({
//     totalProducts: 0,
//     totalOrders: 0,
//     totalRevenue: 0,
//     pendingOrders: 0,
//   });

//   const [recentOrders, setRecentOrders] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const fetchDashboardData = async () => {
//       try {
//         setLoading(true);
//         setError(null);

//         // Fetch orders data
//         const ordersResponse = await fetch('https://api.sohwais.com/api/orders/all-orders');
//         const ordersData = await ordersResponse.json();
        
//         // Note: The API response has a typo: "ordrers" instead of "orders"
//         const allOrders = ordersData.ordrers || [];

//         // Fetch products data
//         const productsResponse = await fetch('https://api.sohwais.com/api/products');
//         const productsData = await productsResponse.json();
        
//         // Calculate statistics from real data
//         const totalOrders = allOrders.length;
//         const totalRevenue = allOrders.reduce((sum, order) => sum + (order.totalAmount || 0), 0);
//         const pendingOrders = allOrders.filter(order => order.status === 'pending' || order.paymentStatus === 'pending').length;
        
//         // Get total products count from API (27 from the API response)
//         const totalProducts = productsData.total || 0;

//         // Get recent orders (last 5 orders)
//         const sortedOrders = [...allOrders].sort((a, b) => 
//           new Date(b.createdAt) - new Date(a.createdAt)
//         );
//         const recentOrdersData = sortedOrders.slice(0, 5);

//         // Transform order data for the table
//         const formattedOrders = recentOrdersData.map(order => ({
//           id: order.orderId,
//           customerName: order.customer?.name || 'N/A',
//           total: order.totalAmount,
//           status: order.status.charAt(0).toUpperCase() + order.status.slice(1),
//           date: new Date(order.createdAt).toLocaleDateString('en-IN', {
//             day: '2-digit',
//             month: 'short',
//             year: 'numeric'
//           })
//         }));

//         setStats({
//           totalProducts,
//           totalOrders,
//           totalRevenue,
//           pendingOrders,
//         });

//         setRecentOrders(formattedOrders);

//         // Calculate trends (you can make this more sophisticated based on previous month data)
//         // For now, I'll keep your existing trend values
//       } catch (err) {
//         console.error('Error fetching dashboard data:', err);
//         setError('Failed to load dashboard data. Please try again later.');
        
//         // Fallback to sample data if API fails
//         setStats({
//           totalProducts: 1245,
//           totalOrders: 342,
//           totalRevenue: 45980.50,
//           pendingOrders: 23,
//         });
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchDashboardData();
//   }, []);

//   const kpis = [
//     {
//       title: 'Total Products',
//       value: stats.totalProducts.toLocaleString(),
//       icon: Package,
//       change: '+12.5%',
//       trend: 'up',
//       color: 'bg-blue-500',
//     },
//     {
//       title: 'Total Orders',
//       value: stats.totalOrders.toLocaleString(),
//       icon: ShoppingCart,
//       change: '+8.2%',
//       trend: 'up',
//       color: 'bg-green-500',
//     },
//     {
//       title: 'Total Revenue',
//       // Changed from $ to ₹ for Indian Rupees
//       value: `₹${stats.totalRevenue.toLocaleString('en-IN', {
//         minimumFractionDigits: 2,
//         maximumFractionDigits: 2
//       })}`,
//       icon: DollarSign,
//       change: '+18.3%',
//       trend: 'up',
//       color: 'bg-purple-500',
//     },
//     {
//       title: 'Pending Orders',
//       value: stats.pendingOrders,
//       icon: Clock,
//       change: '-3.1%',
//       trend: 'down',
//       color: 'bg-yellow-500',
//     },
//   ];

//   const orderColumns = [
//     { key: 'id', title: 'Order ID' },
//     { key: 'customerName', title: 'Customer' },
//     // Changed from $ to ₹
//     { key: 'total', title: 'Amount', render: (value) => `₹${value.toLocaleString('en-IN')}` },
//     { key: 'status', title: 'Status', render: (value) => (
//       <span className={`px-2 py-1 rounded-full text-xs ${
//         value === 'Delivered' ? 'bg-green-100 text-green-800' :
//         value === 'Pending' ? 'bg-yellow-100 text-yellow-800' :
//         value === 'Cancelled' ? 'bg-red-100 text-red-800' :
//         value === 'Processing' ? 'bg-blue-100 text-blue-800' :
//         'bg-gray-100 text-gray-800'
//       }`}>
//         {value}
//       </span>
//     )},
//     { key: 'date', title: 'Date' },
//   ];

//   // Updated LineChart components to accept real data
//   const revenueData = recentOrders.map(order => ({
//     date: order.date,
//     amount: order.total
//   }));

//   const ordersData = recentOrders.map(order => ({
//     date: order.date,
//     count: 1 // Each order counts as 1
//   }));

//   if (loading) {
//     return (
//       <div className="flex items-center justify-center min-h-screen">
//         <div className="text-center">
//           <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-antiqueGold mx-auto"></div>
//           <p className="mt-4 font-body text-royalBrown">Loading dashboard data...</p>
//         </div>
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div className="flex items-center justify-center min-h-screen">
//         <div className="text-center p-6 bg-red-50 rounded-lg">
//           <p className="text-red-600 font-body">{error}</p>
//           <p className="mt-2 text-sm text-royalBrown/70">Displaying sample data</p>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="space-y-6">
//       {/* Header */}
//       <div>
//         <h1 className="text-3xl font-royal tracking-wide text-royalBrown dark:text-ivory">
//           Dashboard
//         </h1>
//         <p className="mt-1 font-body text-royalBrown/70 dark:text-ivory/70">
//           Welcome back! Here's what's happening with your store today.
//         </p>
//       </div>

//       {/* KPI Cards */}
//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
//         {kpis.map((kpi, index) => (
//           <div
//             key={index}
//             className="bg-ivory dark:bg-gray-800 rounded-xl shadow-sm p-6 border border-antiqueGold/30"
//           >
//             <div className="flex items-center justify-between">
//               <div>
//                 <p className="text-sm font-body text-royalBrown/60">
//                   {kpi.title}
//                 </p>

//                 <p className="text-3xl font-royal text-royalBrown mt-2">
//                   {kpi.value}
//                 </p>

//                 <div className="flex items-center mt-2">
//                   {kpi.trend === 'up' ? (
//                     <TrendingUp className="h-4 w-4 text-emerald-600 mr-1" />
//                   ) : (
//                     <TrendingDown className="h-4 w-4 text-maroon mr-1" />
//                   )}

//                   <span
//                     className={`text-sm font-body ${
//                       kpi.trend === 'up'
//                         ? 'text-emerald-700'
//                         : 'text-maroon'
//                     }`}
//                   >
//                     {kpi.change}
//                   </span>

//                   <span className="text-sm font-body text-royalBrown/50 ml-2">
//                     from last month
//                   </span>
//                 </div>
//               </div>

//               <div className="bg-antiqueGold/90 p-3 rounded-full shadow-md">
//                 <kpi.icon className="h-6 w-6 text-ivory" />
//               </div>
//             </div>
//           </div>
//         ))}
//       </div>

//       {/* Charts with Real Data */}
//       {/* <div className="grid grid-cols-1 lg:grid-cols-2 gap-6"> */}
//         {/* Revenue Chart */}
//         <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 border border-gray-200 dark:border-gray-700">
//           <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
//             Revenue Overview
//           </h3>
//           {/* Pass real revenue data to LineChart */}
//           <LineChart 
//             data={revenueData}
//             dataKey="amount"
//             title="Revenue"
//             color="#8884d8"
//           />
//         </div>

//         {/* Orders Chart */}
//         <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 border border-gray-200 dark:border-gray-700">
//           <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
//             Orders Overview
//           </h3>
//           {/* Pass real orders data to LineChart */}
//           <LineChart 
//             data={ordersData}
//             dataKey="count"
//             title="Orders"
//             color="#82ca9d"
//             variant="orders"
//           />
//         </div>
//       {/* </div> */}
//         // In your Dashboard.jsx, update the chart sections:
// <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
//   {/* Revenue Chart */}
//   <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 border border-gray-200 dark:border-gray-700">
//     <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
//       Revenue Overview
//     </h3>
//     <LineChart variant="revenue" ordersData={recentOrders} />
//   </div>

//   {/* Orders Chart */}
//   <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 border border-gray-200 dark:border-gray-700">
//     <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
//       Orders Overview
//     </h3>
//     <LineChart variant="orders" ordersData={recentOrders} />
//   </div>
// </div>
//       {/* Recent Orders */}
//       <div className="bg-ivory dark:bg-gray-800 rounded-xl shadow-sm p-6 border border-antiqueGold/30">
//         <div className="flex items-center justify-between mb-6">
//           <h3 className="text-xl font-royal tracking-wide text-royalBrown">
//             Recent Orders
//           </h3>

//           <button className="font-body text-antiqueGold hover:underline text-sm">
//             View all orders
//           </button>
//         </div>

//         {recentOrders.length > 0 ? (
//           <Table columns={orderColumns} data={recentOrders} />
//         ) : (
//           <p className="text-center py-8 text-royalBrown/70 font-body">
//             No orders found
//           </p>
//         )}
//       </div>
//     </div>
//   );
// };

// export default Dashboard;
// src/pages/Dashboard.jsx
import React, { useState, useEffect } from 'react';
import {
  Package,
  ShoppingCart,
  DollarSign,
  Clock,
  TrendingUp,
  TrendingDown,
} from 'lucide-react';
import LineChart from '../components/charts/LineChart';
import Table from '../components/common/Table';

const Dashboard = () => {
  const [stats, setStats] = useState({
    totalProducts: 0,
    totalOrders: 0,
    totalRevenue: 0,
    pendingOrders: 0,
  });

  const [recentOrders, setRecentOrders] = useState([]);
  const [allOrders, setAllOrders] = useState([]); // Store all orders for charts
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setLoading(true);
        setError(null);

        // Fetch orders data
        const ordersResponse = await fetch('https://api.sohwais.com/api/orders/all-orders');
        const ordersData = await ordersResponse.json();
        
        // Note: The API response has a typo: "ordrers" instead of "orders"
        const allOrdersData = ordersData.ordrers || [];
        setAllOrders(allOrdersData); // Store all orders for charts

        // Fetch products data
        const productsResponse = await fetch('https://api.sohwais.com/api/products');
        const productsData = await productsResponse.json();
        
        // Calculate statistics from real data
        const totalOrders = allOrdersData.length;
        const totalRevenue = allOrdersData.reduce((sum, order) => sum + (order.totalAmount || 0), 0);
        const pendingOrders = allOrdersData.filter(order => order.status === 'pending' || order.paymentStatus === 'pending').length;
        
        // Get total products count from API (27 from the API response)
        const totalProducts = productsData.total || 0;

        // Get recent orders (last 5 orders)
        const sortedOrders = [...allOrdersData].sort((a, b) => 
          new Date(b.createdAt) - new Date(a.createdAt)
        );
        const recentOrdersData = sortedOrders.slice(0, 5);

        // Transform order data for the table
        const formattedOrders = recentOrdersData.map(order => ({
          id: order.orderId,
          customerName: order.customer?.name || 'N/A',
          total: order.totalAmount,
          status: order.status.charAt(0).toUpperCase() + order.status.slice(1),
          date: new Date(order.createdAt).toLocaleDateString('en-IN', {
            day: '2-digit',
            month: 'short',
            year: 'numeric'
          }),
          createdAt: order.createdAt, // Keep for chart processing
          statusRaw: order.status, // Keep original status for chart processing
        }));

        setStats({
          totalProducts,
          totalOrders,
          totalRevenue,
          pendingOrders,
        });

        setRecentOrders(formattedOrders);

      } catch (err) {
        console.error('Error fetching dashboard data:', err);
        setError('Failed to load dashboard data. Please try again later.');
        
        // Fallback to sample data if API fails
        setStats({
          totalProducts: 1245,
          totalOrders: 342,
          totalRevenue: 45980.50,
          pendingOrders: 23,
        });
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  const kpis = [
    {
      title: 'Total Products',
      value: stats.totalProducts.toLocaleString(),
      icon: Package,
      change: '+12.5%',
      trend: 'up',
      color: 'bg-blue-500',
    },
    {
      title: 'Total Orders',
      value: stats.totalOrders.toLocaleString(),
      icon: ShoppingCart,
      change: '+8.2%',
      trend: 'up',
      color: 'bg-green-500',
    },
    {
      title: 'Total Revenue',
      value: `₹${stats.totalRevenue.toLocaleString('en-IN', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
      })}`,
      icon: DollarSign,
      change: '+18.3%',
      trend: 'up',
      color: 'bg-purple-500',
    },
    {
      title: 'Pending Orders',
      value: stats.pendingOrders,
      icon: Clock,
      change: '-3.1%',
      trend: 'down',
      color: 'bg-yellow-500',
    },
  ];

  const orderColumns = [
    { key: 'id', title: 'Order ID' },
    { key: 'customerName', title: 'Customer' },
    { key: 'total', title: 'Amount', render: (value) => `₹${value.toLocaleString('en-IN')}` },
    { key: 'status', title: 'Status', render: (value) => (
      <span className={`px-2 py-1 rounded-full text-xs ${
        value === 'Delivered' ? 'bg-green-100 text-green-800' :
        value === 'Pending' ? 'bg-yellow-100 text-yellow-800' :
        value === 'Cancelled' ? 'bg-red-100 text-red-800' :
        value === 'Processing' ? 'bg-blue-100 text-blue-800' :
        'bg-gray-100 text-gray-800'
      }`}>
        {value}
      </span>
    )},
    { key: 'date', title: 'Date' },
  ];

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-antiqueGold mx-auto"></div>
          <p className="mt-4 font-body text-royalBrown">Loading dashboard data...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center p-6 bg-red-50 rounded-lg">
          <p className="text-red-600 font-body">{error}</p>
          <p className="mt-2 text-sm text-royalBrown/70">Displaying sample data</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-royal tracking-wide text-royalBrown dark:text-ivory">
          Dashboard
        </h1>
        <p className="mt-1 font-body text-royalBrown/70 dark:text-ivory/70">
          Welcome back! Here's what's happening with your store today.
        </p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {kpis.map((kpi, index) => (
          <div
            key={index}
            className="bg-ivory dark:bg-gray-800 rounded-xl shadow-sm p-6 border border-antiqueGold/30"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-body text-royalBrown/60">
                  {kpi.title}
                </p>

                <p className="text-3xl font-royal text-royalBrown mt-2">
                  {kpi.value}
                </p>

                <div className="flex items-center mt-2">
                  {kpi.trend === 'up' ? (
                    <TrendingUp className="h-4 w-4 text-emerald-600 mr-1" />
                  ) : (
                    <TrendingDown className="h-4 w-4 text-maroon mr-1" />
                  )}

                  <span
                    className={`text-sm font-body ${
                      kpi.trend === 'up'
                        ? 'text-emerald-700'
                        : 'text-maroon'
                    }`}
                  >
                    {kpi.change}
                  </span>

                  <span className="text-sm font-body text-royalBrown/50 ml-2">
                    from last month
                  </span>
                </div>
              </div>

              <div className="bg-antiqueGold/90 p-3 rounded-full shadow-md">
                <kpi.icon className="h-6 w-6 text-ivory" />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Charts with Real Data */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Revenue Chart */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 border border-gray-200 dark:border-gray-700">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Revenue Overview
          </h3>
          <LineChart variant="revenue" ordersData={allOrders} />
        </div>

        {/* Orders Chart */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 border border-gray-200 dark:border-gray-700">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Orders Overview
          </h3>
          <LineChart variant="orders" ordersData={allOrders} />
        </div>
      </div>

      {/* Recent Orders */}
      <div className="bg-ivory dark:bg-gray-800 rounded-xl shadow-sm p-6 border border-antiqueGold/30">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-royal tracking-wide text-royalBrown">
            Recent Orders
          </h3>

          {/* <button className="font-body text-antiqueGold hover:underline text-sm">
            View all orders
          </button> */}
        </div>

        {recentOrders.length > 0 ? (
          <Table columns={orderColumns} data={recentOrders} />
        ) : (
          <p className="text-center py-8 text-royalBrown/70 font-body">
            No orders found
          </p>
        )}
      </div>
    </div>
  );
};

export default Dashboard;