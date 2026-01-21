// // // // src/components/charts/LineChart.jsx
// // // import React from 'react';
// // // import {
// // //   LineChart as RechartsLineChart,
// // //   Line,
// // //   XAxis,
// // //   YAxis,
// // //   CartesianGrid,
// // //   Tooltip,
// // //   Legend,
// // //   ResponsiveContainer,
// // //   AreaChart,
// // //   Area,
// // // } from 'recharts';

// // // const LineChart = ({ variant = 'revenue' }) => {
// // //   // Sample data
// // //   const revenueData = [
// // //     { month: 'Jan', revenue: 4000, orders: 240 },
// // //     { month: 'Feb', revenue: 3000, orders: 139 },
// // //     { month: 'Mar', revenue: 9800, orders: 980 },
// // //     { month: 'Apr', revenue: 3908, orders: 480 },
// // //     { month: 'May', revenue: 4800, orders: 380 },
// // //     { month: 'Jun', revenue: 3800, orders: 430 },
// // //     { month: 'Jul', revenue: 4300, orders: 220 },
// // //   ];

// // //   const ordersData = [
// // //     { month: 'Jan', orders: 240, returns: 24 },
// // //     { month: 'Feb', orders: 139, returns: 13 },
// // //     { month: 'Mar', orders: 980, returns: 98 },
// // //     { month: 'Apr', orders: 480, returns: 48 },
// // //     { month: 'May', orders: 380, returns: 38 },
// // //     { month: 'Jun', orders: 430, returns: 43 },
// // //     { month: 'Jul', orders: 220, returns: 22 },
// // //   ];

// // //   const data = variant === 'revenue' ? revenueData : ordersData;

// // //   return (
// // //     <ResponsiveContainer width="100%" height={300}>
// // //       {variant === 'revenue' ? (
// // //         <AreaChart
// // //           data={data}
// // //           margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
// // //         >
// // //           <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
// // //           <XAxis
// // //             dataKey="month"
// // //             stroke="#9CA3AF"
// // //             fontSize={12}
// // //           />
// // //           <YAxis
// // //             stroke="#9CA3AF"
// // //             fontSize={12}
// // //             tickFormatter={(value) => `$${value}`}
// // //           />
// // //           <Tooltip
// // //             formatter={(value) => [`$${value}`, 'Revenue']}
// // //             contentStyle={{
// // //               backgroundColor: '#1F2937',
// // //               border: '1px solid #374151',
// // //               borderRadius: '0.5rem',
// // //             }}
// // //           />
// // //           <Legend />
// // //           <Area
// // //             type="monotone"
// // //             dataKey="revenue"
// // //             stroke="#3B82F6"
// // //             fill="#3B82F6"
// // //             fillOpacity={0.3}
// // //             strokeWidth={2}
// // //           />
// // //         </AreaChart>
// // //       ) : (
// // //         <RechartsLineChart
// // //           data={data}
// // //           margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
// // //         >
// // //           <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
// // //           <XAxis
// // //             dataKey="month"
// // //             stroke="#9CA3AF"
// // //             fontSize={12}
// // //           />
// // //           <YAxis
// // //             stroke="#9CA3AF"
// // //             fontSize={12}
// // //           />
// // //           <Tooltip
// // //             contentStyle={{
// // //               backgroundColor: '#1F2937',
// // //               border: '1px solid #374151',
// // //               borderRadius: '0.5rem',
// // //             }}
// // //           />
// // //           <Legend />
// // //           <Line
// // //             type="monotone"
// // //             dataKey="orders"
// // //             stroke="#10B981"
// // //             strokeWidth={2}
// // //             dot={{ r: 4 }}
// // //             activeDot={{ r: 6 }}
// // //           />
// // //           <Line
// // //             type="monotone"
// // //             dataKey="returns"
// // //             stroke="#EF4444"
// // //             strokeWidth={2}
// // //             dot={{ r: 4 }}
// // //           />
// // //         </RechartsLineChart>
// // //       )}
// // //     </ResponsiveContainer>
// // //   );
// // // };

// // // export default LineChart;
// // // src/components/charts/LineChart.jsx
// // import React, { useState, useEffect } from 'react';
// // import {
// //   LineChart as RechartsLineChart,
// //   Line,
// //   XAxis,
// //   YAxis,
// //   CartesianGrid,
// //   Tooltip,
// //   Legend,
// //   ResponsiveContainer,
// //   AreaChart,
// //   Area,
// // } from 'recharts';

// // const LineChart = ({ variant = 'revenue', ordersData = [] }) => {
// //   const [chartData, setChartData] = useState([]);
// //   const [loading, setLoading] = useState(true);

// //   useEffect(() => {
// //     const prepareChartData = () => {
// //       if (!ordersData || ordersData.length === 0) {
// //         // Fallback to sample data if no orders data
// //         const sampleData = variant === 'revenue' ? [
// //           { month: 'Jan', revenue: 4000, orders: 240 },
// //           { month: 'Feb', revenue: 3000, orders: 139 },
// //           { month: 'Mar', revenue: 9800, orders: 980 },
// //           { month: 'Apr', revenue: 3908, orders: 480 },
// //           { month: 'May', revenue: 4800, orders: 380 },
// //           { month: 'Jun', revenue: 3800, orders: 430 },
// //           { month: 'Jul', revenue: 4300, orders: 220 },
// //         ] : [
// //           { month: 'Jan', orders: 240, returns: 24 },
// //           { month: 'Feb', orders: 139, returns: 13 },
// //           { month: 'Mar', orders: 980, returns: 98 },
// //           { month: 'Apr', orders: 480, returns: 48 },
// //           { month: 'May', orders: 380, returns: 38 },
// //           { month: 'Jun', orders: 430, returns: 43 },
// //           { month: 'Jul', orders: 220, returns: 22 },
// //         ];
        
// //         setChartData(sampleData);
// //         setLoading(false);
// //         return;
// //       }

// //       // Process real order data for charts
// //       if (variant === 'revenue') {
// //         // Group orders by month and calculate monthly revenue
// //         const monthlyRevenue = ordersData.reduce((acc, order) => {
// //           const date = new Date(order.createdAt);
// //           const month = date.toLocaleDateString('en-IN', { month: 'short' });
          
// //           if (!acc[month]) {
// //             acc[month] = {
// //               month,
// //               revenue: 0,
// //               orders: 0,
// //               count: 0
// //             };
// //           }
          
// //           acc[month].revenue += order.totalAmount || 0;
// //           acc[month].orders = (acc[month].orders || 0) + 1;
// //           acc[month].count = (acc[month].count || 0) + 1;
          
// //           return acc;
// //         }, {});

// //         // Convert to array and sort by month
// //         const revenueChartData = Object.values(monthlyRevenue);
        
// //         // If we have data, use it; otherwise fallback
// //         setChartData(revenueChartData.length > 0 ? revenueChartData : [
// //           { month: 'Jan', revenue: 1253, orders: 1 },
// //           { month: 'Jan', revenue: 1253, orders: 1 },
// //           { month: 'Jan', revenue: 2408, orders: 1 },
// //           { month: 'Jan', revenue: 1253, orders: 1 },
// //           { month: 'Jan', revenue: 1253, orders: 1 },
// //         ]);
// //       } else {
// //         // Process for orders chart
// //         const monthlyOrders = ordersData.reduce((acc, order) => {
// //           const date = new Date(order.createdAt);
// //           const month = date.toLocaleDateString('en-IN', { month: 'short' });
          
// //           if (!acc[month]) {
// //             acc[month] = {
// //               month,
// //               orders: 0,
// //               returns: 0,
// //               pending: 0
// //             };
// //           }
          
// //           acc[month].orders += 1;
          
// //           // Calculate returns (assuming cancelled orders as returns)
// //           if (order.status === 'cancelled') {
// //             acc[month].returns += 1;
// //           }
          
// //           // Track pending orders
// //           if (order.status === 'pending') {
// //             acc[month].pending += 1;
// //           }
          
// //           return acc;
// //         }, {});

// //         const ordersChartData = Object.values(monthlyOrders);
        
// //         // If we have data, use it; otherwise fallback
// //         setChartData(ordersChartData.length > 0 ? ordersChartData : [
// //           { month: 'Jan', orders: 9, returns: 0, pending: 4 },
// //         ]);
// //       }
      
// //       setLoading(false);
// //     };

// //     prepareChartData();
// //   }, [ordersData, variant]);

// //   // Custom formatter for Indian Rupees
// //   const rupeeFormatter = (value) => `₹${value.toLocaleString('en-IN')}`;
  
// //   // Custom tooltip formatter
// //   const revenueTooltipFormatter = (value) => [rupeeFormatter(value), 'Revenue'];
// //   const ordersTooltipFormatter = (value, name) => {
// //     const label = name === 'orders' ? 'Orders' : 
// //                   name === 'returns' ? 'Returns' : 
// //                   name === 'pending' ? 'Pending' : name;
// //     return [`${value}`, label];
// //   };

// //   if (loading) {
// //     return (
// //       <div className="flex items-center justify-center h-64">
// //         <div className="text-center">
// //           <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-antiqueGold mx-auto"></div>
// //           <p className="mt-2 text-sm text-royalBrown/70">Loading chart...</p>
// //         </div>
// //       </div>
// //     );
// //   }

// //   return (
// //     <ResponsiveContainer width="100%" height={300}>
// //       {variant === 'revenue' ? (
// //         <AreaChart
// //           data={chartData}
// //           margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
// //         >
// //           <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
// //           <XAxis
// //             dataKey="month"
// //             stroke="#9CA3AF"
// //             fontSize={12}
// //           />
// //           <YAxis
// //             stroke="#9CA3AF"
// //             fontSize={12}
// //             tickFormatter={rupeeFormatter}
// //           />
// //           <Tooltip
// //             formatter={revenueTooltipFormatter}
// //             labelFormatter={(label) => `Month: ${label}`}
// //             contentStyle={{
// //               backgroundColor: '#1F2937',
// //               border: '1px solid #374151',
// //               borderRadius: '0.5rem',
// //             }}
// //           />
// //           <Legend />
// //           <Area
// //             type="monotone"
// //             dataKey="revenue"
// //             name="Revenue"
// //             stroke="#3B82F6"
// //             fill="#3B82F6"
// //             fillOpacity={0.3}
// //             strokeWidth={2}
// //           />
// //           <Line
// //             type="monotone"
// //             dataKey="orders"
// //             name="Orders"
// //             stroke="#10B981"
// //             strokeWidth={1}
// //             strokeDasharray="5 5"
// //           />
// //         </AreaChart>
// //       ) : (
// //         <RechartsLineChart
// //           data={chartData}
// //           margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
// //         >
// //           <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
// //           <XAxis
// //             dataKey="month"
// //             stroke="#9CA3AF"
// //             fontSize={12}
// //           />
// //           <YAxis
// //             stroke="#9CA3AF"
// //             fontSize={12}
// //           />
// //           <Tooltip
// //             formatter={ordersTooltipFormatter}
// //             labelFormatter={(label) => `Month: ${label}`}
// //             contentStyle={{
// //               backgroundColor: '#1F2937',
// //               border: '1px solid #374151',
// //               borderRadius: '0.5rem',
// //             }}
// //           />
// //           <Legend />
// //           <Line
// //             type="monotone"
// //             dataKey="orders"
// //             name="Orders"
// //             stroke="#10B981"
// //             strokeWidth={2}
// //             dot={{ r: 4 }}
// //             activeDot={{ r: 6 }}
// //           />
// //           <Line
// //             type="monotone"
// //             dataKey="returns"
// //             name="Returns"
// //             stroke="#EF4444"
// //             strokeWidth={2}
// //             dot={{ r: 4 }}
// //           />
// //           <Line
// //             type="monotone"
// //             dataKey="pending"
// //             name="Pending"
// //             stroke="#F59E0B"
// //             strokeWidth={2}
// //             strokeDasharray="5 5"
// //             dot={{ r: 4 }}
// //           />
// //         </RechartsLineChart>
// //       )}
// //     </ResponsiveContainer>
// //   );
// // };

// // export default LineChart;
// // src/components/charts/LineChart.jsx
// import React, { useState, useEffect, useMemo } from 'react';
// import {
//   LineChart as RechartsLineChart,
//   Line,
//   XAxis,
//   YAxis,
//   CartesianGrid,
//   Tooltip,
//   Legend,
//   ResponsiveContainer,
//   AreaChart,
//   Area,
// } from 'recharts';

// const LineChart = ({ variant = 'revenue', ordersData = [] }) => {
//   const [loading, setLoading] = useState(true);
  
//   // Use useMemo to process data only when ordersData or variant changes
//   const chartData = useMemo(() => {
//     if (!ordersData || ordersData.length === 0) {
//       // Fallback to sample data if no orders data
//       return variant === 'revenue' ? [
//         { month: 'Jan', revenue: 4000, orders: 240 },
//         { month: 'Feb', revenue: 3000, orders: 139 },
//         { month: 'Mar', revenue: 9800, orders: 980 },
//         { month: 'Apr', revenue: 3908, orders: 480 },
//         { month: 'May', revenue: 4800, orders: 380 },
//         { month: 'Jun', revenue: 3800, orders: 430 },
//         { month: 'Jul', revenue: 4300, orders: 220 },
//       ] : [
//         { month: 'Jan', orders: 240, returns: 24 },
//         { month: 'Feb', orders: 139, returns: 13 },
//         { month: 'Mar', orders: 980, returns: 98 },
//         { month: 'Apr', orders: 480, returns: 48 },
//         { month: 'May', orders: 380, returns: 38 },
//         { month: 'Jun', orders: 430, returns: 43 },
//         { month: 'Jul', orders: 220, returns: 22 },
//       ];
//     }

//     // Process real order data for charts
//     if (variant === 'revenue') {
//       // Group orders by month and calculate monthly revenue
//       const monthlyRevenue = ordersData.reduce((acc, order) => {
//         const date = new Date(order.createdAt);
//         const month = date.toLocaleDateString('en-IN', { month: 'short' });
        
//         if (!acc[month]) {
//           acc[month] = {
//             month,
//             revenue: 0,
//             orders: 0,
//             count: 0
//           };
//         }
        
//         acc[month].revenue += order.totalAmount || 0;
//         acc[month].orders = (acc[month].orders || 0) + 1;
//         acc[month].count = (acc[month].count || 0) + 1;
        
//         return acc;
//       }, {});

//       // Convert to array and sort by month
//       const revenueChartData = Object.values(monthlyRevenue);
      
//       // Sort by month index
//       const monthOrder = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
//       revenueChartData.sort((a, b) => monthOrder.indexOf(a.month) - monthOrder.indexOf(b.month));
      
//       return revenueChartData.length > 0 ? revenueChartData : [
//         { month: 'Jan', revenue: 1253, orders: 1 },
//         { month: 'Feb', revenue: 1253, orders: 1 },
//       ];
//     } else {
//       // Process for orders chart
//       const monthlyOrders = ordersData.reduce((acc, order) => {
//         const date = new Date(order.createdAt);
//         const month = date.toLocaleDateString('en-IN', { month: 'short' });
        
//         if (!acc[month]) {
//           acc[month] = {
//             month,
//             orders: 0,
//             returns: 0,
//             pending: 0,
//             completed: 0
//           };
//         }
        
//         acc[month].orders += 1;
        
//         // Calculate returns (assuming cancelled orders as returns)
//         if (order.status === 'cancelled') {
//           acc[month].returns += 1;
//         }
        
//         // Track pending orders
//         if (order.status === 'pending') {
//           acc[month].pending += 1;
//         }
        
//         // Track completed orders
//         if (order.status === 'processing' || order.status === 'completed' || order.status === 'delivered') {
//           acc[month].completed += 1;
//         }
        
//         return acc;
//       }, {});

//       const ordersChartData = Object.values(monthlyOrders);
      
//       // Sort by month index
//       const monthOrder = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
//       ordersChartData.sort((a, b) => monthOrder.indexOf(a.month) - monthOrder.indexOf(b.month));
      
//       return ordersChartData.length > 0 ? ordersChartData : [
//         { month: 'Jan', orders: 9, returns: 0, pending: 4, completed: 5 },
//       ];
//     }
//   }, [ordersData, variant]);

//   // Set loading to false after data is processed
//   useEffect(() => {
//     setLoading(false);
//   }, [chartData]);

//   // Custom formatter for Indian Rupees
//   const rupeeFormatter = (value) => `₹${value.toLocaleString('en-IN')}`;
  
//   // Custom tooltip formatter
//   const revenueTooltipFormatter = (value) => [rupeeFormatter(value), 'Revenue'];
//   const ordersTooltipFormatter = (value, name) => {
//     const label = name === 'orders' ? 'Orders' : 
//                   name === 'returns' ? 'Returns' : 
//                   name === 'pending' ? 'Pending' :
//                   name === 'completed' ? 'Completed' : name;
//     return [`${value}`, label];
//   };

//   if (loading) {
//     return (
//       <div className="flex items-center justify-center h-64">
//         <div className="text-center">
//           <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-antiqueGold mx-auto"></div>
//           <p className="mt-2 text-sm text-royalBrown/70">Loading chart...</p>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <ResponsiveContainer width="100%" height={300}>
//       {variant === 'revenue' ? (
//         <AreaChart
//           data={chartData}
//           margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
//         >
//           <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
//           <XAxis
//             dataKey="month"
//             stroke="#9CA3AF"
//             fontSize={12}
//           />
//           <YAxis
//             stroke="#9CA3AF"
//             fontSize={12}
//             tickFormatter={rupeeFormatter}
//           />
//           <Tooltip
//             formatter={revenueTooltipFormatter}
//             labelFormatter={(label) => `Month: ${label}`}
//             contentStyle={{
//               backgroundColor: '#1F2937',
//               border: '1px solid #374151',
//               borderRadius: '0.5rem',
//             }}
//           />
//           <Legend />
//           <Area
//             type="monotone"
//             dataKey="revenue"
//             name="Revenue"
//             stroke="#3B82F6"
//             fill="#3B82F6"
//             fillOpacity={0.3}
//             strokeWidth={2}
//           />
//         </AreaChart>
//       ) : (
//         <RechartsLineChart
//           data={chartData}
//           margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
//         >
//           <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
//           <XAxis
//             dataKey="month"
//             stroke="#9CA3AF"
//             fontSize={12}
//           />
//           <YAxis
//             stroke="#9CA3AF"
//             fontSize={12}
//           />
//           <Tooltip
//             formatter={ordersTooltipFormatter}
//             labelFormatter={(label) => `Month: ${label}`}
//             contentStyle={{
//               backgroundColor: '#1F2937',
//               border: '1px solid #374151',
//               borderRadius: '0.5rem',
//             }}
//           />
//           <Legend />
//           <Line
//             type="monotone"
//             dataKey="orders"
//             name="Total Orders"
//             stroke="#10B981"
//             strokeWidth={2}
//             dot={{ r: 4 }}
//             activeDot={{ r: 6 }}
//           />
//           <Line
//             type="monotone"
//             dataKey="completed"
//             name="Completed"
//             stroke="#3B82F6"
//             strokeWidth={2}
//             dot={{ r: 4 }}
//           />
//           <Line
//             type="monotone"
//             dataKey="pending"
//             name="Pending"
//             stroke="#F59E0B"
//             strokeWidth={2}
//             dot={{ r: 4 }}
//           />
//         </RechartsLineChart>
//       )}
//     </ResponsiveContainer>
//   );
// };

// export default LineChart;
// src/components/charts/LineChart.jsx
import React, { useState, useMemo } from 'react';
import {
  LineChart as RechartsLineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  AreaChart,
  Area,
} from 'recharts';

const LineChart = ({ variant = 'revenue', ordersData = [] }) => {
  // Process chart data with useMemo to prevent re-renders
  const chartData = useMemo(() => {
    if (!ordersData || ordersData.length === 0) {
      // Fallback to sample data if no orders data
      return variant === 'revenue' ? [
        { date: 'Jan 14', revenue: 1253 },
        { date: 'Jan 14', revenue: 1253 },
        { date: 'Jan 14', revenue: 2408 },
        { date: 'Jan 14', revenue: 1253 },
        { date: 'Jan 14', revenue: 1253 },
        { date: 'Jan 14', revenue: 1253 },
        { date: 'Jan 14', revenue: 1515 },
      ] : [
        { date: 'Jan 14', orders: 1 },
        { date: 'Jan 14', orders: 1 },
        { date: 'Jan 14', orders: 1 },
        { date: 'Jan 14', orders: 1 },
        { date: 'Jan 14', orders: 1 },
        { date: 'Jan 14', orders: 1 },
        { date: 'Jan 14', orders: 1 },
      ];
    }

    // Process real order data - show individual orders by day
    if (variant === 'revenue') {
      // Sort orders by date
      const sortedOrders = [...ordersData].sort((a, b) => 
        new Date(a.createdAt) - new Date(b.createdAt)
      );

      // Create data points for each order
      return sortedOrders.map((order, index) => {
        const date = new Date(order.createdAt);
        const day = date.getDate();
        const month = date.toLocaleDateString('en-IN', { month: 'short' });
        
        return {
          date: `${month} ${day}`,
          revenue: order.totalAmount || 0,
          orderCount: 1,
          cumulativeRevenue: sortedOrders
            .slice(0, index + 1)
            .reduce((sum, o) => sum + (o.totalAmount || 0), 0)
        };
      });
    } else {
      // Orders chart - show daily order counts
      const dailyOrders = {};
      
      ordersData.forEach(order => {
        const date = new Date(order.createdAt);
        const day = date.getDate();
        const month = date.toLocaleDateString('en-IN', { month: 'short' });
        const dateKey = `${month} ${day}`;
        
        if (!dailyOrders[dateKey]) {
          dailyOrders[dateKey] = {
            date: dateKey,
            orders: 0,
            pending: 0,
            completed: 0,
            cancelled: 0
          };
        }
        
        dailyOrders[dateKey].orders += 1;
        
        // Categorize by status
        const status = order.status?.toLowerCase() || '';
        if (status === 'pending') {
          dailyOrders[dateKey].pending += 1;
        } else if (status === 'cancelled') {
          dailyOrders[dateKey].cancelled += 1;
        } else if (status === 'processing' || status === 'completed' || status === 'delivered') {
          dailyOrders[dateKey].completed += 1;
        }
      });

      // Convert to array and sort by date
      const result = Object.values(dailyOrders);
      result.sort((a, b) => {
        const [aMonth, aDay] = a.date.split(' ');
        const [bMonth, bDay] = b.date.split(' ');
        const monthOrder = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        
        if (aMonth !== bMonth) {
          return monthOrder.indexOf(aMonth) - monthOrder.indexOf(bMonth);
        }
        return parseInt(aDay) - parseInt(bDay);
      });

      return result.length > 0 ? result : [
        { date: 'Jan 14', orders: 9, pending: 4, completed: 5, cancelled: 0 }
      ];
    }
  }, [ordersData, variant]);

  // Custom formatter for Indian Rupees
  const rupeeFormatter = (value) => `₹${value.toLocaleString('en-IN')}`;
  
  // Custom tooltip formatter
  const revenueTooltipFormatter = (value, name) => {
    const label = name === 'revenue' ? 'Order Amount' : 
                  name === 'orderCount' ? 'Orders' :
                  name === 'cumulativeRevenue' ? 'Total Revenue' : name;
    
    if (name === 'revenue' || name === 'cumulativeRevenue') {
      return [rupeeFormatter(value), label];
    }
    return [`${value}`, label];
  };

  const ordersTooltipFormatter = (value, name) => {
    const label = name === 'orders' ? 'Total Orders' : 
                  name === 'pending' ? 'Pending Orders' :
                  name === 'completed' ? 'Completed Orders' :
                  name === 'cancelled' ? 'Cancelled Orders' : name;
    return [`${value}`, label];
  };

  return (
    <ResponsiveContainer width="100%" height={300}>
      {variant === 'revenue' ? (
        <RechartsLineChart
          data={chartData}
          margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
          <XAxis
            dataKey="date"
            stroke="#6B7280"
            fontSize={12}
            tick={{ fill: '#4B5563' }}
          />
          <YAxis
            stroke="#6B7280"
            fontSize={12}
            tickFormatter={rupeeFormatter}
            tick={{ fill: '#4B5563' }}
          />
          <Tooltip
            formatter={revenueTooltipFormatter}
            labelFormatter={(label) => `Date: ${label}`}
            contentStyle={{
              backgroundColor: '#FFFFFF',
              border: '1px solid #E5E7EB',
              borderRadius: '0.5rem',
              boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)',
            }}
          />
          <Legend />
          <Line
            type="monotone"
            dataKey="revenue"
            name="Order Revenue"
            stroke="#8B5CF6"
            strokeWidth={2}
            dot={{ r: 5, fill: '#8B5CF6' }}
            activeDot={{ r: 7, fill: '#7C3AED' }}
          />
          <Line
            type="monotone"
            dataKey="cumulativeRevenue"
            name="Cumulative Revenue"
            stroke="#3B82F6"
            strokeWidth={2}
            strokeDasharray="5 5"
            dot={{ r: 4, fill: '#3B82F6' }}
          />
        </RechartsLineChart>
      ) : (
        <RechartsLineChart
          data={chartData}
          margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
          <XAxis
            dataKey="date"
            stroke="#6B7280"
            fontSize={12}
            tick={{ fill: '#4B5563' }}
          />
          <YAxis
            stroke="#6B7280"
            fontSize={12}
            tick={{ fill: '#4B5563' }}
          />
          <Tooltip
            formatter={ordersTooltipFormatter}
            labelFormatter={(label) => `Date: ${label}`}
            contentStyle={{
              backgroundColor: '#FFFFFF',
              border: '1px solid #E5E7EB',
              borderRadius: '0.5rem',
              boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)',
            }}
          />
          <Legend />
          <Line
            type="monotone"
            dataKey="orders"
            name="Total Orders"
            stroke="#10B981"
            strokeWidth={2}
            dot={{ r: 5, fill: '#10B981' }}
            activeDot={{ r: 7, fill: '#059669' }}
          />
          <Line
            type="monotone"
            dataKey="completed"
            name="Completed"
            stroke="#3B82F6"
            strokeWidth={2}
            dot={{ r: 4, fill: '#3B82F6' }}
          />
          <Line
            type="monotone"
            dataKey="pending"
            name="Pending"
            stroke="#F59E0B"
            strokeWidth={2}
            dot={{ r: 4, fill: '#F59E0B' }}
          />
          <Line
            type="monotone"
            dataKey="cancelled"
            name="Cancelled"
            stroke="#EF4444"
            strokeWidth={2}
            dot={{ r: 4, fill: '#EF4444' }}
          />
        </RechartsLineChart>
      )}
    </ResponsiveContainer>
  );
};

export default LineChart;