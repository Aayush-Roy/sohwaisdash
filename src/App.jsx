// // src/App.jsx
// import React from 'react';
// import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
// import { AuthProvider } from './hooks/useAuth';
// import ProtectedRoute from './components/common/ProtectedRoute';

// // Layout
// import Layout from './components/layout/Layout';

// // Pages
// import Login from './pages/auth/Login';
// import Signup from './pages/auth/Signup';
// import Dashboard from './pages/Dashboard';
// import Products from './pages/Products';
// import Orders from './pages/Orders';
// import Customers from './pages/Customers';
// import Categories from './pages/Categories';
// import Analytics from './pages/Analytics';
// import Settings from './pages/Settings';

// function App() {
//   return (
//     <Router>
//       <AuthProvider>
//         <Routes>
//           {/* Public Routes */}
//           <Route path="/login" element={<Login />} />
//           <Route path="/signup" element={<Signup />} />
          
//           {/* Protected Routes */}
//           <Route element={<ProtectedRoute />}>
//             <Route element={<Layout />}>
//               <Route path="/" element={<Navigate to="/dashboard" replace />} />
//               <Route path="/dashboard" element={<Dashboard />} />
//               <Route path="/products" element={<Products />} />
//               <Route path="/orders" element={<Orders />} />
//               <Route path="/customers" element={<Customers />} />
//               <Route path="/categories" element={<Categories />} />
//               <Route path="/analytics" element={<Analytics />} />
//               <Route path="/settings" element={<Settings />} />
//             </Route>
//           </Route>
          
//           {/* Catch all */}
//           <Route path="*" element={<Navigate to="/dashboard" replace />} />
//         </Routes>
//       </AuthProvider>
//     </Router>
//   );
// }

// export default App;
// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './hooks/useAuth';
import ProtectedRoute from './components/common/ProtectedRoute';

// Layout
import Layout from './components/layout/Layout';

// Pages
import Login from './pages/auth/Login';
import Signup from './pages/auth/Signup'; // Add this import
import Dashboard from './pages/Dashboard';
// import Products from './pages/Products';
import Products from './pages/Products';
import Orders from './pages/Orders';
import Customers from './pages/Customers';
import Categories from './pages/Categories';
import Analytics from './pages/Analytics';
import Settings from './pages/Settings';

function App() {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          {/* Public Routes */}
          {/* <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} /> Add this route */}
          
          {/* Protected Routes */}
          <Route element={<ProtectedRoute />}>
            <Route element={<Layout />}>
              <Route path="/" element={<Navigate to="/dashboard" replace />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/products" element={<Products />} />
              <Route path="/orders" element={<Orders />} />
              <Route path="/customers" element={<Customers />} />
              <Route path="/categories" element={<Categories />} />
              <Route path="/analytics" element={<Analytics />} />
              <Route path="/settings" element={<Settings />} />
            </Route>
          </Route>
          
          {/* Catch all */}
          <Route path="*" element={<Navigate to="/dashboard" replace />} />
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;