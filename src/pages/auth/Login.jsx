import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Crown, 
  Shield, 
  Lock, 
  Eye, 
  EyeOff, 
  User,
  Clock,
  AlertCircle,
  Key,
  Sparkles
} from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';
import Button from '../../components/common/Button';
import logo from "../../assets/logo.png";

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  
  const { login, fixedCredentials } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      if (!username.trim() || !password.trim()) {
        throw new Error('Please enter both username and password');
      }

      const result = await login(username, password);
      if (result.success) {
        navigate('/dashboard');
      }
    } catch (err) {
      setError(err.message || 'Invalid username or password');
      setPassword('');
    } finally {
      setIsLoading(false);
    }
  };

  const fillDemoCredentials = () => {
    setUsername(fixedCredentials.username);
    setPassword(fixedCredentials.password);
    setError('');
  };

  return (
    <div 
      className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden"
      style={{ backgroundColor: '#F6EFE3' }}
    >
      {/* Traditional Pattern Background */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 0h100v100H0V0zm50 50a25 25 0 1 0 0-50 25 25 0 0 0 0 50z' fill='%23451E1E' fill-opacity='0.4'/%3E%3C/svg%3E")`,
          backgroundSize: '60px 60px'
        }}></div>
      </div>

      {/* Ornamental Borders */}
      {/* <div className="absolute top-0 left-0 right-0 h-4 bg-gradient-to-r from-[#D9BA7E] via-[#C19A6B] to-[#D9BA7E] opacity-80"></div>
      <div className="absolute bottom-0 left-0 right-0 h-4 bg-gradient-to-r from-[#D9BA7E] via-[#C19A6B] to-[#D9BA7E] opacity-80"></div> */}

      <div className="relative w-full max-w-lg">
        {/* Main Card with Traditional Styling */}
        <div 
          className="relative rounded-3xl shadow-2xl overflow-hidden border-2"
          style={{ 
            borderColor: '#D9BA7E',
            backgroundColor: 'rgba(246, 239, 227, 0.95)',
            backdropFilter: 'blur(10px)'
          }}
        >
          {/* Decorative Header */}
          {/* <div 
            className="h-4 relative overflow-hidden"
            style={{ backgroundColor: '#D9BA7E' }}
          >
            <div className="absolute inset-0 flex">
              {[...Array(20)].map((_, i) => (
                <div 
                  key={i}
                  className="w-4 h-4 transform rotate-45 mx-1"
                  style={{ backgroundColor: '#451E1E' }}
                ></div>
              ))}
            </div>
          </div> */}

          {/* Ornamental Corners */}
          {/* <div className="absolute top-4 left-4 w-6 h-6 border-t-2 border-l-2" style={{ borderColor: '#D9BA7E' }}></div>
          <div className="absolute top-4 right-4 w-6 h-6 border-t-2 border-r-2" style={{ borderColor: '#D9BA7E' }}></div>
          <div className="absolute bottom-4 left-4 w-6 h-6 border-b-2 border-l-2" style={{ borderColor: '#D9BA7E' }}></div>
          <div className="absolute bottom-4 right-4 w-6 h-6 border-b-2 border-r-2" style={{ borderColor: '#D9BA7E' }}></div> */}

          <div className="p-10">
            {/* Header with Royal Styling */}
            <div className="text-center mb-10 relative">
              {/* Crown Decoration */}
              <div className="flex justify-center mb-6">
                <div className="relative">
                  <div 
                    className="w-24 h-24 rounded-full flex items-center justify-center shadow-lg relative"
                    style={{ 
                      backgroundColor: '#D9BA7E',
                      border: '4px solid #451E1E'
                    }}
                  >
                    {/* <Crown className="h-12 w-12" style={{ color: '#451E1E' }} /> */}
                    <img src={logo} alt="" />
                    <div className="absolute -top-2 -right-2 w-10 h-10 rounded-full flex items-center justify-center border-2" style={{ backgroundColor: '#451E1E', borderColor: '#D9BA7E' }}>
                      <Key className="h-5 w-5" style={{ color: '#D9BA7E' }} />
                    </div>
                  </div>
                  {/* Shine Effect */}
                  <div className="absolute top-4 left-4 w-4 h-4 rounded-full bg-white/40 blur-sm"></div>
                </div>
              </div>
              
              <h1 className="text-4xl font-bold mb-3 tracking-wide" style={{ color: '#451E1E', fontFamily: 'Georgia, serif' }}>
                Sohwais Portal
              </h1>
              <div className="flex items-center justify-center space-x-2">
                <div className="h-px flex-1" style={{ backgroundColor: '#D9BA7E' }}></div>
                <p className="text-lg px-4" style={{ color: '#451E1E', fontFamily: 'Georgia, serif' }}>
                  Enter Your Credentials
                </p>
                <div className="h-px flex-1" style={{ backgroundColor: '#D9BA7E' }}></div>
              </div>
            </div>

            {/* Demo Credentials Hint */}
            <div 
              className="mb-8 p-4 rounded-xl border text-center"
              style={{ 
                backgroundColor: 'rgba(217, 186, 126, 0.1)',
                borderColor: '#D9BA7E'
              }}
            >
              <p className="text-sm" style={{ color: '#451E1E' }}>
                <span className="font-bold">Hint:</span> Use fixed credentials for access
              </p>
            </div>

            {/* Login Form */}
            <form className="space-y-8" onSubmit={handleSubmit}>
              {error && (
                <div 
                  className="p-5 rounded-xl border-2 flex items-start space-x-4 animate-shake"
                  style={{ 
                    backgroundColor: 'rgba(69, 30, 30, 0.05)',
                    borderColor: '#451E1E'
                  }}
                >
                  <AlertCircle className="h-6 w-6 flex-shrink-0 mt-0.5" style={{ color: '#451E1E' }} />
                  <p className="font-medium" style={{ color: '#451E1E' }}>{error}</p>
                </div>
              )}

              {/* Username Field */}
              <div className="space-y-3">
                <label className="text-lg font-bold block tracking-wide" style={{ color: '#451E1E', fontFamily: 'Georgia, serif' }}>
                  <div className="flex items-center space-x-2">
                    <User className="h-5 w-5" />
                    <span>Username</span>
                  </div>
                </label>
                <div className="relative group">
                  <div 
                    className="absolute left-4 top-1/2 transform -translate-y-1/2"
                    style={{ color: '#451E1E' }}
                  >
                    <User className="h-6 w-6" />
                  </div>
                  <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="w-full pl-14 pr-4 py-4 text-lg rounded-2xl border-2 focus:outline-none transition-all duration-300"
                    style={{ 
                      backgroundColor: 'rgba(255, 255, 255, 0.7)',
                      borderColor: '#D9BA7E',
                      color: '#451E1E',
                      fontFamily: 'Georgia, serif'
                    }}
                    placeholder="Enter your username"
                    required
                  />
                </div>
              </div>

              {/* Password Field */}
              <div className="space-y-3">
                <label className="text-lg font-bold block tracking-wide" style={{ color: '#451E1E', fontFamily: 'Georgia, serif' }}>
                  <div className="flex items-center space-x-2">
                    <Lock className="h-5 w-5" />
                    <span>Password</span>
                  </div>
                </label>
                <div className="relative group">
                  <div 
                    className="absolute left-4 top-1/2 transform -translate-y-1/2"
                    style={{ color: '#451E1E' }}
                  >
                    <Lock className="h-6 w-6" />
                  </div>
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full pl-14 pr-14 py-4 text-lg rounded-2xl border-2 focus:outline-none transition-all duration-300"
                    style={{ 
                      backgroundColor: 'rgba(255, 255, 255, 0.7)',
                      borderColor: '#D9BA7E',
                      color: '#451E1E',
                      fontFamily: 'Georgia, serif'
                    }}
                    placeholder="Enter your password"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 transition-colors"
                    style={{ color: '#451E1E' }}
                  >
                    {showPassword ? <EyeOff className="h-6 w-6" /> : <Eye className="h-6 w-6" />}
                  </button>
                </div>
              </div>

              {/* Quick Fill Button (Optional) */}
              {/* <button
                type="button"
                onClick={fillDemoCredentials}
                className="w-full py-3 rounded-xl font-medium text-lg transition-all duration-200 transform hover:scale-[1.01] active:scale-95 border"
                style={{ 
                  backgroundColor: 'rgba(217, 186, 126, 0.15)',
                  borderColor: '#D9BA7E',
                  color: '#451E1E',
                  fontFamily: 'Georgia, serif'
                }}
              >
                <div className="flex items-center justify-center space-x-2">
                  <Sparkles className="h-5 w-5" />
                  <span>Quick Fill Demo Credentials</span>
                </div>
              </button> */}

              {/* Submit Button */}
              <Button 
                type="submit" 
                isLoading={isLoading}
                className="w-full py-5 rounded-2xl font-bold text-xl tracking-wider transition-all duration-300 transform hover:scale-[1.02] active:scale-95 shadow-xl relative overflow-hidden group"
                style={{ 
                  backgroundColor: '#D9BA7E',
                  color: '#451E1E',
                  border: '3px solid #451E1E',
                  fontFamily: 'Georgia, serif'
                }}
              >
                {isLoading ? (
                  <div className="flex items-center justify-center space-x-3">
                    <div className="w-6 h-6 border-2 border-current border-t-transparent rounded-full animate-spin"></div>
                    <span>Signing In...</span>
                  </div>
                ) : (
                  <div className="flex items-center justify-center space-x-3">
                    <Crown className="h-7 w-7" />
                    <span>Enter Sohwais Portal</span>
                    <Crown className="h-7 w-7" />
                  </div>
                )}
                {/* Shine Effect */}
                <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
              </Button>
            </form>
          </div>
        </div>

        {/* Traditional Pattern Overlay */}
        <div className="absolute -z-10 top-1/4 -left-20 w-40 h-40 opacity-10">
          <div className="w-full h-full" style={{
            backgroundImage: `radial-gradient(circle, #451E1E 2px, transparent 2px)`,
            backgroundSize: '20px 20px'
          }}></div>
        </div>
        <div className="absolute -z-10 bottom-1/4 -right-20 w-40 h-40 opacity-10">
          <div className="w-full h-full" style={{
            backgroundImage: `radial-gradient(circle, #451E1E 2px, transparent 2px)`,
            backgroundSize: '20px 20px'
          }}></div>
        </div>

        {/* Floating Ornaments */}
        <div className="absolute -top-4 -left-4 w-20 h-20 opacity-10">
          <div className="w-full h-full border-4 rounded-full" style={{ borderColor: '#D9BA7E' }}></div>
        </div>
        <div className="absolute -bottom-4 -right-4 w-20 h-20 opacity-10">
          <div className="w-full h-full border-4 rounded-full" style={{ borderColor: '#D9BA7E' }}></div>
        </div>
      </div>
    </div>
  );
};

export default Login;