// // src/hooks/useAuth.js
// import { createContext, useContext, useState, useEffect } from 'react';
// import { useLocalStorage } from './useLocalStorage';

// const AuthContext = createContext(null);

// export const useAuth = () => {
//   const context = useContext(AuthContext);
//   if (!context) {
//     throw new Error('useAuth must be used within an AuthProvider');
//   }
//   return context;
// };

// export const AuthProvider = ({ children }) => {
//   const [user, setUser] = useLocalStorage('admin_user', null);
//   const [isLoading, setIsLoading] = useState(true);

//   useEffect(() => {
//     // Simulate loading user data
//     const timer = setTimeout(() => {
//       setIsLoading(false);
//     }, 500);
//     return () => clearTimeout(timer);
//   }, []);

//   const login = async (email, password) => {
//     // Simulate API call
//     return new Promise((resolve) => {
//       setTimeout(() => {
//         const userData = {
//           id: '1',
//           email,
//           name: 'Admin User',
//           role: 'admin',
//           avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(email)}&background=3b82f6&color=fff`,
//         };
//         setUser(userData);
//         resolve({ success: true, data: userData });
//       }, 1000);
//     });
//   };

//   const signup = async (userData) => {
//     return new Promise((resolve) => {
//       setTimeout(() => {
//         const newUser = {
//           id: Date.now().toString(),
//           ...userData,
//           role: 'admin',
//           avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(userData.name)}&background=3b82f6&color=fff`,
//         };
//         setUser(newUser);
//         resolve({ success: true, data: newUser });
//       }, 1000);
//     });
//   };

//   const logout = () => {
//     setUser(null);
//   };

//   return (
//     <AuthContext.Provider value={{ user, login, signup, logout, isLoading }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };
// src/hooks/useAuth.js
import { createContext, useContext, useState, useEffect } from 'react';
import { useLocalStorage } from './useLocalStorage';

const AuthContext = createContext(null);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useLocalStorage('admin_user', null);
  const [isLoading, setIsLoading] = useState(true);
  const [loginTimestamp, setLoginTimestamp] = useLocalStorage('admin_login_timestamp', null);

  // Fixed credentials
  const FIXED_CREDENTIALS = {
    username: 'admin.sohwais.com',
    password: 'sohwais@traditional99'
  };

  useEffect(() => {
    // Check if login is still valid (7 days)
    if (user && loginTimestamp) {
      const loginTime = parseInt(loginTimestamp);
      const currentTime = Date.now();
      const sevenDays = 7 * 24 * 60 * 60 * 1000;
      
      if (currentTime - loginTime > sevenDays) {
        // Session expired
        setUser(null);
        setLoginTimestamp(null);
        localStorage.removeItem('admin_user');
        localStorage.removeItem('admin_login_timestamp');
      }
    }
    
    setIsLoading(false);
  }, [user, loginTimestamp, setUser, setLoginTimestamp]);

  const login = async (email, password) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        // Fixed credentials check
        if (email === FIXED_CREDENTIALS.username && password === FIXED_CREDENTIALS.password) {
          const userData = {
            id: '1',
            email: 'admin@store.com',
            name: 'Admin User',
            role: 'admin',
            avatar: 'https://ui-avatars.com/api/?name=Admin&background=3b82f6&color=fff',
            loginTime: new Date().toLocaleString()
          };
          
          setUser(userData);
          setLoginTimestamp(Date.now().toString());
          resolve({ success: true, data: userData });
        } else {
          reject({ success: false, message: 'Invalid username or password' });
        }
      }, 800);
    });
  };

  const logout = () => {
    setUser(null);
    setLoginTimestamp(null);
    localStorage.removeItem('admin_user');
    localStorage.removeItem('admin_login_timestamp');
  };

  return (
    <AuthContext.Provider value={{ 
      user, 
      login, 
      logout, 
      isLoading,
      fixedCredentials: FIXED_CREDENTIALS 
    }}>
      {children}
    </AuthContext.Provider>
  );
};