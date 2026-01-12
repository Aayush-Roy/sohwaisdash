// src/pages/Customers.jsx
import React, { useState } from 'react';
import { Search, Filter, User, Mail, Phone, CreditCard } from 'lucide-react';
import Table from '../components/common/Table';
import Modal from '../components/common/Modal';
import Badge from '../components/common/Badge';
import Input from '../components/common/Input';

const Customers = () => {
  const [customers, setCustomers] = useState([
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
    {
      id: '3',
      name: 'Robert Johnson',
      email: 'robert@example.com',
      phone: '+1 (555) 456-7890',
      orders: 3,
      totalSpent: 845.25,
      status: 'Inactive',
      joinDate: '2023-03-10',
    },
    {
      id: '4',
      name: 'Sarah Williams',
      email: 'sarah@example.com',
      phone: '+1 (555) 234-5678',
      orders: 20,
      totalSpent: 3890.00,
      status: 'Active',
      joinDate: '2022-12-05',
    },
    {
      id: '5',
      name: 'Michael Brown',
      email: 'michael@example.com',
      phone: '+1 (555) 876-5432',
      orders: 5,
      totalSpent: 1200.50,
      status: 'Active',
      joinDate: '2023-04-18',
    },
  ]);

  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  const columns = [
    {
      key: 'name',
      title: 'Customer',
      render: (value, row) => (
        <div className="flex items-center">
          <div className="h-10 w-10 rounded-full bg-primary-100 dark:bg-primary-900/30 flex items-center justify-center">
            <User className="h-5 w-5 text-primary-600 dark:text-primary-400" />
          </div>
          <div className="ml-4">
            <p className="font-medium text-gray-900 dark:text-white">{value}</p>
            <p className="text-sm text-gray-500 dark:text-gray-400">{row.email}</p>
          </div>
        </div>
      ),
    },
    { key: 'orders', title: 'Orders', render: (value) => (
      <span className="font-medium">{value}</span>
    )},
    { key: 'totalSpent', title: 'Total Spent', render: (value) => (
      <span className="font-bold text-gray-900 dark:text-white">${value.toLocaleString()}</span>
    )},
    { key: 'status', title: 'Status', render: (value) => (
      <Badge variant={value === 'Active' ? 'success' : 'danger'}>
        {value}
      </Badge>
    )},
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
    setIsViewModalOpen(true);
  };

  const handleToggleStatus = () => {
    setCustomers(customers.map(customer =>
      customer.id === selectedCustomer.id
        ? { ...customer, status: customer.status === 'Active' ? 'Inactive' : 'Active' }
        : customer
    ));
    setIsViewModalOpen(false);
  };

  const filteredCustomers = customers.filter(customer =>
    customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    customer.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    customer.phone.includes(searchTerm)
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Customers</h1>
          <p className="text-gray-600 dark:text-gray-400">Manage your customer base</p>
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
        <Table columns={columns} data={filteredCustomers} />
      </div>

      {/* Customer Details Modal */}
      {selectedCustomer && (
        <Modal
          isOpen={isViewModalOpen}
          onClose={() => setIsViewModalOpen(false)}
          title="Customer Details"
          size="lg"
        >
          <div className="space-y-6">
            {/* Customer Info */}
            <div className="flex items-center space-x-4">
              <div className="h-16 w-16 rounded-full bg-primary-100 dark:bg-primary-900/30 flex items-center justify-center">
                <User className="h-8 w-8 text-primary-600 dark:text-primary-400" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-gray-900 dark:text-white">{selectedCustomer.name}</h3>
                <div className="flex items-center space-x-4 mt-1">
                  <Badge variant={selectedCustomer.status === 'Active' ? 'success' : 'danger'}>
                    {selectedCustomer.status}
                  </Badge>
                  <span className="text-sm text-gray-500 dark:text-gray-400">
                    Joined {selectedCustomer.joinDate}
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
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
                <p className="text-sm text-gray-500 dark:text-gray-400">Total Orders</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">{selectedCustomer.orders}</p>
              </div>
              <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
                <p className="text-sm text-gray-500 dark:text-gray-400">Total Spent</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  ${selectedCustomer.totalSpent.toLocaleString()}
                </p>
              </div>
            </div>

            {/* Actions */}
            <div className="flex justify-end space-x-3 pt-6 border-t dark:border-gray-700">
              <button
                onClick={handleToggleStatus}
                className={`px-4 py-2 rounded-lg font-medium ${
                  selectedCustomer.status === 'Active'
                    ? 'bg-red-600 text-white hover:bg-red-700'
                    : 'bg-green-600 text-white hover:bg-green-700'
                }`}
              >
                {selectedCustomer.status === 'Active' ? 'Block Customer' : 'Activate Customer'}
              </button>
              <button
                onClick={() => setIsViewModalOpen(false)}
                className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700"
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