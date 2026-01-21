// // src/pages/Analytics.jsx
// import React from 'react';
// import { TrendingUp, TrendingDown, Users, ShoppingBag, DollarSign, Package } from 'lucide-react';
// import LineChart from '../components/charts/LineChart';
// import Table from '../components/common/Table';

// const Analytics = () => {
//   const topProducts = [
//     { id: 1, name: 'Premium Headphones', sales: 1245, revenue: 124500 },
//     { id: 2, name: 'Wireless Mouse', sales: 987, revenue: 98700 },
//     { id: 3, name: 'Laptop Stand', sales: 756, revenue: 75600 },
//     { id: 4, name: 'Smart Watch', sales: 654, revenue: 65400 },
//     { id: 5, name: 'USB-C Hub', sales: 543, revenue: 54300 },
//   ];

//   const columns = [
//     { key: 'name', title: 'Product Name' },
//     { key: 'sales', title: 'Units Sold' },
//     { key: 'revenue', title: 'Revenue', render: (value) => `$${value.toLocaleString()}` },
//   ];

//   return (
//     <div className="space-y-6 font-bold font-royal ">
//       {/* Header */}
//       <div>
//         <h1 className="text-3xl  font-bold text-royalBrown dark:text-white">Analytics</h1>
//         <p className="text-gray-600 dark:text-gray-400">Track your store performance</p>
//       </div>

//       {/* Stats Grid */}
//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
//         <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 border border-gray-200 dark:border-gray-700">
//           <div className="flex items-center justify-between">
//             <div>
//               <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Total Revenue</p>
//               <p className="text-2xl font-bold text-gray-900 dark:text-white mt-2">$45,980</p>
//               <div className="flex items-center mt-2">
//                 <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
//                 <span className="text-sm font-medium text-green-600">+18.3%</span>
//               </div>
//             </div>
//             <div className="bg-green-500 p-3 rounded-full">
//               <DollarSign className="h-6 w-6 text-white" />
//             </div>
//           </div>
//         </div>

//         <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 border border-gray-200 dark:border-gray-700">
//           <div className="flex items-center justify-between">
//             <div>
//               <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Total Orders</p>
//               <p className="text-2xl font-bold text-gray-900 dark:text-white mt-2">1,245</p>
//               <div className="flex items-center mt-2">
//                 <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
//                 <span className="text-sm font-medium text-green-600">+12.5%</span>
//               </div>
//             </div>
//             <div className="bg-blue-500 p-3 rounded-full">
//               <ShoppingBag className="h-6 w-6 text-white" />
//             </div>
//           </div>
//         </div>

//         <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 border border-gray-200 dark:border-gray-700">
//           <div className="flex items-center justify-between">
//             <div>
//               <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Total Customers</p>
//               <p className="text-2xl font-bold text-gray-900 dark:text-white mt-2">890</p>
//               <div className="flex items-center mt-2">
//                 <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
//                 <span className="text-sm font-medium text-green-600">+8.2%</span>
//               </div>
//             </div>
//             <div className="bg-purple-500 p-3 rounded-full">
//               <Users className="h-6 w-6 text-white" />
//             </div>
//           </div>
//         </div>

//         <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 border border-gray-200 dark:border-gray-700">
//           <div className="flex items-center justify-between">
//             <div>
//               <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Avg. Order Value</p>
//               <p className="text-2xl font-bold text-gray-900 dark:text-white mt-2">$87.50</p>
//               <div className="flex items-center mt-2">
//                 <TrendingDown className="h-4 w-4 text-red-500 mr-1" />
//                 <span className="text-sm font-medium text-red-600">-3.1%</span>
//               </div>
//             </div>
//             <div className="bg-yellow-500 p-3 rounded-full">
//               <Package className="h-6 w-6 text-white" />
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Charts */}
//       <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
//         <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 border border-gray-200 dark:border-gray-700">
//           <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
//             Revenue Overview
//           </h3>
//           <LineChart variant="revenue" />
//         </div>

//         <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 border border-gray-200 dark:border-gray-700">
//           <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
//             Orders Overview
//           </h3>
//           <LineChart variant="orders" />
//         </div>
//       </div>

//       {/* Top Products */}
//       <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 border border-gray-200 dark:border-gray-700">
//         <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
//           Top Selling Products
//         </h3>
//         <Table columns={columns} data={topProducts} />
//       </div>
//     </div>
//   );
// };

// export default Analytics;
// src/pages/Analytics.jsx
import React, { useState, useEffect } from 'react';
import { TrendingUp, TrendingDown, Users, ShoppingBag, DollarSign, Package } from 'lucide-react';
import LineChart from '../components/charts/LineChart';
import Table from '../components/common/Table';

const Analytics = () => {
  const [analyticsData, setAnalyticsData] = useState({
    totalRevenue: 0,
    totalOrders: 0,
    totalCustomers: 0,
    avgOrderValue: 0,
    loading: true,
    error: null
  });

  const [topProducts, setTopProducts] = useState([]);
  const [allOrders, setAllOrders] = useState([]);
  const [allProducts, setAllProducts] = useState([]);

  useEffect(() => {
    const fetchAnalyticsData = async () => {
      try {
        // Fetch orders data
        const ordersResponse = await fetch('https://api.sohwais.com/api/orders/all-orders');
        const ordersData = await ordersResponse.json();
        const allOrdersData = ordersData.ordrers || [];
        setAllOrders(allOrdersData);

        // Fetch products data
        const productsResponse = await fetch('https://api.sohwais.com/api/products');
        const productsData = await productsResponse.json();
        const allProductsData = productsData.data || [];
        setAllProducts(allProductsData);

        // Calculate statistics
        const totalOrders = allOrdersData.length;
        
        // Calculate total revenue
        const totalRevenue = allOrdersData.reduce((sum, order) => sum + (order.totalAmount || 0), 0);
        
        // Calculate unique customers
        const uniqueCustomers = new Set();
        allOrdersData.forEach(order => {
          if (order.customer?.email) {
            uniqueCustomers.add(order.customer.email);
          }
        });
        const totalCustomers = uniqueCustomers.size;
        
        // Calculate average order value
        const avgOrderValue = totalOrders > 0 ? totalRevenue / totalOrders : 0;

        // Calculate top selling products
        const productSales = {};
        
        allOrdersData.forEach(order => {
          if (order.items && order.items.length > 0) {
            order.items.forEach(item => {
              const productId = item.productId;
              const productName = item.name;
              const quantity = item.quantity || 1;
              const revenue = (item.finalPrice || item.price || 0) * quantity;
              
              if (!productSales[productId]) {
                productSales[productId] = {
                  id: productId,
                  name: productName,
                  sales: 0,
                  revenue: 0,
                  quantity: 0
                };
              }
              
              productSales[productId].sales += 1;
              productSales[productId].revenue += revenue;
              productSales[productId].quantity += quantity;
            });
          }
        });

        // Convert to array, sort by revenue, and take top 5
        const topProductsList = Object.values(productSales)
          .sort((a, b) => b.revenue - a.revenue)
          .slice(0, 5);

        // If no real data, use sample data
        if (topProductsList.length === 0) {
          setTopProducts([
            { id: 1, name: 'Lotus Blue', sales: 9, revenue: 14295, quantity: 10 },
            { id: 2, name: 'Indigo Elephant', sales: 1, revenue: 1515, quantity: 1 },
            { id: 3, name: 'Jaal e Rang', sales: 0, revenue: 0, quantity: 0 },
            { id: 4, name: 'Kala Kriti', sales: 0, revenue: 0, quantity: 0 },
            { id: 5, name: 'Basanti', sales: 0, revenue: 0, quantity: 0 },
          ]);
        } else {
          setTopProducts(topProductsList);
        }

        setAnalyticsData({
          totalRevenue,
          totalOrders,
          totalCustomers,
          avgOrderValue,
          loading: false,
          error: null
        });

      } catch (err) {
        console.error('Error fetching analytics data:', err);
        setAnalyticsData({
          totalRevenue: 45980,
          totalOrders: 1245,
          totalCustomers: 890,
          avgOrderValue: 87.50,
          loading: false,
          error: 'Failed to load analytics data. Showing sample data.'
        });
        
        // Fallback to sample data
        setTopProducts([
          { id: 1, name: 'Premium Headphones', sales: 1245, revenue: 124500 },
          { id: 2, name: 'Wireless Mouse', sales: 987, revenue: 98700 },
          { id: 3, name: 'Laptop Stand', sales: 756, revenue: 75600 },
          { id: 4, name: 'Smart Watch', sales: 654, revenue: 65400 },
          { id: 5, name: 'USB-C Hub', sales: 543, revenue: 54300 },
        ]);
      }
    };

    fetchAnalyticsData();
  }, []);

  const columns = [
    { key: 'name', title: 'Product Name' },
    { key: 'quantity', title: 'Units Sold' },
    { key: 'sales', title: 'Orders' },
    { 
      key: 'revenue', 
      title: 'Revenue', 
      render: (value) => `₹${value.toLocaleString('en-IN')}` 
    },
  ];

  if (analyticsData.loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-antiqueGold mx-auto"></div>
          <p className="mt-4 font-body text-royalBrown">Loading analytics data...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 font-bold font-royal">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-royalBrown dark:text-white">Analytics</h1>
        <p className="text-gray-600 dark:text-gray-400">Track your store performance</p>
        {analyticsData.error && (
          <div className="mt-2 p-2 bg-yellow-50 border border-yellow-200 rounded text-sm text-yellow-700">
            {analyticsData.error}
          </div>
        )}
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Total Revenue */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 border border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Total Revenue</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white mt-2">
                ₹{analyticsData.totalRevenue.toLocaleString('en-IN')}
              </p>
              <div className="flex items-center mt-2">
                <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
                <span className="text-sm font-medium text-green-600">+18.3%</span>
              </div>
            </div>
            <div className="bg-green-500 p-3 rounded-full">
              <DollarSign className="h-6 w-6 text-white" />
            </div>
          </div>
        </div>

        {/* Total Orders */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 border border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Total Orders</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white mt-2">
                {analyticsData.totalOrders.toLocaleString()}
              </p>
              <div className="flex items-center mt-2">
                <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
                <span className="text-sm font-medium text-green-600">+12.5%</span>
              </div>
            </div>
            <div className="bg-blue-500 p-3 rounded-full">
              <ShoppingBag className="h-6 w-6 text-white" />
            </div>
          </div>
        </div>

        {/* Total Customers */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 border border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Total Customers</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white mt-2">
                {analyticsData.totalCustomers.toLocaleString()}
              </p>
              <div className="flex items-center mt-2">
                <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
                <span className="text-sm font-medium text-green-600">+8.2%</span>
              </div>
            </div>
            <div className="bg-purple-500 p-3 rounded-full">
              <Users className="h-6 w-6 text-white" />
            </div>
          </div>
        </div>

        {/* Avg. Order Value */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 border border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Avg. Order Value</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white mt-2">
                ₹{analyticsData.avgOrderValue.toLocaleString('en-IN', {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2
                })}
              </p>
              <div className="flex items-center mt-2">
                <TrendingDown className="h-4 w-4 text-red-500 mr-1" />
                <span className="text-sm font-medium text-red-600">-3.1%</span>
              </div>
            </div>
            <div className="bg-yellow-500 p-3 rounded-full">
              <Package className="h-6 w-6 text-white" />
            </div>
          </div>
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 border border-gray-200 dark:border-gray-700">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Revenue Overview
          </h3>
          <LineChart variant="revenue" ordersData={allOrders} />
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 border border-gray-200 dark:border-gray-700">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Orders Overview
          </h3>
          <LineChart variant="orders" ordersData={allOrders} />
        </div>
      </div>

      {/* Top Products */}
      {/* <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 border border-gray-200 dark:border-gray-700">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
            Top Selling Products
          </h3>
          <span className="text-sm text-gray-500">
            Based on revenue generated
          </span>
        </div>
        {topProducts.length > 0 ? (
          <Table columns={columns} data={topProducts} />
        ) : (
          <p className="text-center py-8 text-gray-500">
            No product sales data available
          </p>
        )}
        <div className="mt-4 text-sm text-gray-500">
          <p>Total Products in Catalog: {allProducts.length}</p>
          <p className="mt-1">Showing top {Math.min(topProducts.length, 5)} products by revenue</p>
        </div>
      </div> */}
    </div>
  );
};

export default Analytics;