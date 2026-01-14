import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Layers, Package, Users, TrendingUp } from 'lucide-react';

const Collections = () => {
  const [collections, setCollections] = useState([]);
  const [stats, setStats] = useState({});

  const collectionData = [
    {
      name: 'Madhubani Collection',
      description: 'Traditional Madhubani art on clothing',
      products: 24,
      category: 'Mixed',
      image: 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c',
      featured: true
    },
    {
      name: 'Sujini Collection',
      description: 'Intricate Sujini embroidery work',
      products: 18,
      category: 'Women',
      image: 'https://images.unsplash.com/photo-1571877227200-a0d98ea607e9',
      featured: true
    },
    {
      name: 'Marble Collection',
      description: 'Elegant marble print designs',
      products: 32,
      category: 'Mixed',
      image: 'https://images.unsplash.com/photo-1552374196-1ab2a1c593e8',
      featured: false
    },
    {
      name: 'Nakashi Collection',
      description: 'Traditional Nakashi artwork',
      products: 15,
      category: 'Women',
      image: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8',
      featured: true
    },
    {
      name: 'Majestic Linen',
      description: 'Premium linen clothing',
      products: 28,
      category: 'Men',
      image: 'https://images.unsplash.com/photo-1591369822096-ffd140ec948f',
      featured: true
    },
    {
      name: 'The Batik Archive',
      description: 'Traditional Batik prints',
      products: 42,
      category: 'Mixed',
      image: 'https://images.unsplash.com/photo-1585487000160-6eb9ce6b5a59',
      featured: true
    },
    {
      name: 'Wedding Collection',
      description: 'Bridal and wedding wear',
      products: 36,
      category: 'Mixed',
      image: 'https://images.unsplash.com/photo-1523381210434-271e8be1f52b',
      featured: false
    },
    {
      name: 'Daily Wear',
      description: 'Casual everyday clothing',
      products: 56,
      category: 'Mixed',
      image: 'https://images.unsplash.com/photo-1582418702059-97ebafb35d09',
      featured: false
    }
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Collections</h1>
          <p className="text-gray-600 dark:text-gray-400">Browse and manage your product collections</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 border border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Total Collections</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white mt-2">8</p>
            </div>
            <div className="p-3 bg-purple-100 dark:bg-purple-900/30 rounded-lg">
              <Layers className="h-6 w-6 text-purple-600 dark:text-purple-400" />
            </div>
          </div>
        </div>
        
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 border border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Total Products</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white mt-2">251</p>
            </div>
            <div className="p-3 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
              <Package className="h-6 w-6 text-blue-600 dark:text-blue-400" />
            </div>
          </div>
        </div>
        
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 border border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Featured Collections</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white mt-2">5</p>
            </div>
            <div className="p-3 bg-green-100 dark:bg-green-900/30 rounded-lg">
              <TrendingUp className="h-6 w-6 text-green-600 dark:text-green-400" />
            </div>
          </div>
        </div>
        
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 border border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Active Collections</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white mt-2">8</p>
            </div>
            <div className="p-3 bg-orange-100 dark:bg-orange-900/30 rounded-lg">
              <Users className="h-6 w-6 text-orange-600 dark:text-orange-400" />
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {collectionData.map((collection, index) => (
          <div key={index} className="bg-white dark:bg-gray-800 rounded-xl shadow-sm overflow-hidden border border-gray-200 dark:border-gray-700 hover:shadow-md transition-shadow">
            <div className="relative h-48">
              <img
                src={collection.image}
                alt={collection.name}
                className="w-full h-full object-cover"
              />
              {collection.featured && (
                <span className="absolute top-3 right-3 bg-yellow-500 text-white text-xs px-2 py-1 rounded-full">
                  Featured
                </span>
              )}
              <span className={`absolute bottom-3 left-3 px-3 py-1 rounded-full text-xs font-medium ${
                collection.category === 'Men' ? 'bg-blue-100 text-blue-800' :
                collection.category === 'Women' ? 'bg-pink-100 text-pink-800' :
                'bg-purple-100 text-purple-800'
              }`}>
                {collection.category}
              </span>
            </div>
            <div className="p-5">
              <h3 className="font-bold text-gray-900 dark:text-white mb-2">{collection.name}</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">{collection.description}</p>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-500">
                  {collection.products} products
                </span>
                <Link
                  to={`/products?collection=${encodeURIComponent(collection.name)}`}
                  className="text-royalBrown hover:text-royalBrown/80 text-sm font-medium"
                >
                  View Products →
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Collections;