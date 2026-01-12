// src/pages/Orders.jsx
import React, { useState, useEffect } from 'react';
import { Search, Filter, Download, Eye, ChevronDown } from 'lucide-react';
import Table from '../components/common/Table';
import Modal from '../components/common/Modal';
import Button from '../components/common/Button';
import Input from '../components/common/Input';
import { orders, orderStatuses } from '../data/orders';

const Orders = () => {
  const [orderList, setOrderList] = useState([]);
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('all');

  useEffect(() => {
    setOrderList(orders);
  }, []);

  const columns = [
    {
      key: 'id',
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
    { key: 'customerName', title: 'Customer' },
    { key: 'total', title: 'Amount', render: (value) => `$${value}` },
    {
      key: 'status',
      title: 'Status',
      render: (value, row) => (
        <div className="flex items-center">
          <span className={`px-2 py-1 rounded-full text-xs ${
            value === 'Delivered' ? 'bg-green-100 text-green-800' :
            value === 'Pending' ? 'bg-yellow-100 text-yellow-800' :
            value === 'Cancelled' ? 'bg-red-100 text-red-800' :
            'bg-blue-100 text-blue-800'
          }`}>
            {value}
          </span>
          <ChevronDown className="ml-1 h-4 w-4 text-gray-400 cursor-pointer" />
        </div>
      ),
    },
    { key: 'date', title: 'Date' },
    {
      key: 'actions',
      title: 'Actions',
      render: (_, row) => (
        <div className="flex space-x-2">
          <button
            onClick={() => handleViewDetails(row)}
            className="p-1 text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded"
          >
            <Eye size={16} />
          </button>
        </div>
      ),
    },
  ];

  const handleViewDetails = (order) => {
    setSelectedOrder(order);
    setIsDetailsModalOpen(true);
  };

  const handleStatusChange = (orderId, newStatus) => {
    setOrderList(prev => prev.map(order =>
      order.id === orderId ? { ...order, status: newStatus } : order
    ));
  };

  const filteredOrders = orderList.filter(order => {
    const matchesSearch = 
      order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = selectedStatus === 'all' || order.status === selectedStatus;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-6 text-royalBrown tracking-wide">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-royalBrown font-royal dark:text-white">Orders</h1>
          <p className="text-gray-600 dark:text-gray-400">Manage customer orders</p>
        </div>
        <Button variant="outline" className="mt-4 sm:mt-0">
          <Download className="h-4 w-4 mr-2 " />
          Export
        </Button>
      </div>

      {/* Filters */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-4 border border-gray-200 dark:border-gray-700">
        <div className="flex flex-col md:flex-row md:items-center md:space-x-4 space-y-4 md:space-y-0">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                type="search"
                placeholder="Search orders..."
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
        <Table columns={columns} data={filteredOrders} />
      </div>

      {/* Order Details Modal */}
      <Modal
        isOpen={isDetailsModalOpen}
        onClose={() => setIsDetailsModalOpen(false)}
        title="Order Details"
        size="lg"
      >
        {selectedOrder && (
          <div className="space-y-6">
            {/* Order Summary */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">Order ID</p>
                <p className="font-medium text-gray-900 dark:text-white">{selectedOrder.id}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">Date</p>
                <p className="font-medium text-gray-900 dark:text-white">{selectedOrder.date}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">Customer</p>
                <p className="font-medium text-gray-900 dark:text-white">{selectedOrder.customerName}</p>
                <p className="text-sm text-gray-500 dark:text-gray-400">{selectedOrder.email}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">Total Amount</p>
                <p className="font-bold text-lg text-gray-900 dark:text-white">
                  ${selectedOrder.total}
                </p>
              </div>
            </div>

            {/* Order Items */}
            <div>
              <h4 className="font-medium text-gray-900 dark:text-white mb-3">Order Items</h4>
              <div className="space-y-3">
                {selectedOrder.products.map((item, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                    <div>
                      <p className="font-medium text-gray-900 dark:text-white">{item.name}</p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">Quantity: {item.quantity}</p>
                    </div>
                    <p className="font-medium text-gray-900 dark:text-white">${item.price}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Status Update */}
            <div>
              <h4 className="font-medium text-gray-900 dark:text-white mb-3">Update Status</h4>
              <div className="flex space-x-2">
                {orderStatuses.map((status) => (
                  <button
                    key={status.value}
                    onClick={() => handleStatusChange(selectedOrder.id, status.value)}
                    className={`px-3 py-2 rounded-lg text-sm font-medium ${
                      selectedOrder.status === status.value
                        ? status.color
                        : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
                    }`}
                  >
                    {status.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Actions */}
            <div className="flex justify-end space-x-3 pt-6 border-t dark:border-gray-700">
              <Button variant="outline" onClick={() => setIsDetailsModalOpen(false)}>
                Close
              </Button>
              <Button onClick={() => handleStatusChange(selectedOrder.id, 'Shipped')}>
                Mark as Shipped
              </Button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default Orders;