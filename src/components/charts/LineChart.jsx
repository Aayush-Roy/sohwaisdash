// src/components/charts/LineChart.jsx
import React from 'react';
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

const LineChart = ({ variant = 'revenue' }) => {
  // Sample data
  const revenueData = [
    { month: 'Jan', revenue: 4000, orders: 240 },
    { month: 'Feb', revenue: 3000, orders: 139 },
    { month: 'Mar', revenue: 9800, orders: 980 },
    { month: 'Apr', revenue: 3908, orders: 480 },
    { month: 'May', revenue: 4800, orders: 380 },
    { month: 'Jun', revenue: 3800, orders: 430 },
    { month: 'Jul', revenue: 4300, orders: 220 },
  ];

  const ordersData = [
    { month: 'Jan', orders: 240, returns: 24 },
    { month: 'Feb', orders: 139, returns: 13 },
    { month: 'Mar', orders: 980, returns: 98 },
    { month: 'Apr', orders: 480, returns: 48 },
    { month: 'May', orders: 380, returns: 38 },
    { month: 'Jun', orders: 430, returns: 43 },
    { month: 'Jul', orders: 220, returns: 22 },
  ];

  const data = variant === 'revenue' ? revenueData : ordersData;

  return (
    <ResponsiveContainer width="100%" height={300}>
      {variant === 'revenue' ? (
        <AreaChart
          data={data}
          margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
          <XAxis
            dataKey="month"
            stroke="#9CA3AF"
            fontSize={12}
          />
          <YAxis
            stroke="#9CA3AF"
            fontSize={12}
            tickFormatter={(value) => `$${value}`}
          />
          <Tooltip
            formatter={(value) => [`$${value}`, 'Revenue']}
            contentStyle={{
              backgroundColor: '#1F2937',
              border: '1px solid #374151',
              borderRadius: '0.5rem',
            }}
          />
          <Legend />
          <Area
            type="monotone"
            dataKey="revenue"
            stroke="#3B82F6"
            fill="#3B82F6"
            fillOpacity={0.3}
            strokeWidth={2}
          />
        </AreaChart>
      ) : (
        <RechartsLineChart
          data={data}
          margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
          <XAxis
            dataKey="month"
            stroke="#9CA3AF"
            fontSize={12}
          />
          <YAxis
            stroke="#9CA3AF"
            fontSize={12}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: '#1F2937',
              border: '1px solid #374151',
              borderRadius: '0.5rem',
            }}
          />
          <Legend />
          <Line
            type="monotone"
            dataKey="orders"
            stroke="#10B981"
            strokeWidth={2}
            dot={{ r: 4 }}
            activeDot={{ r: 6 }}
          />
          <Line
            type="monotone"
            dataKey="returns"
            stroke="#EF4444"
            strokeWidth={2}
            dot={{ r: 4 }}
          />
        </RechartsLineChart>
      )}
    </ResponsiveContainer>
  );
};

export default LineChart;