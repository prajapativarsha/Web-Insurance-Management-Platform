import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import authService from '../../services/authService';
import Input from '../../components/ui/Input';
import PasswordInput from '../../components/ui/PasswordInput';
import Button from '../../components/ui/Button';
import Card from '../../components/ui/Card';
import Loader from '../../components/ui/Loader';

const Login = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await authService.login(formData);
      
      if (response.success) {
        // Save to AuthContext
        login(response.data.user, response.data.accessToken);
        
        // Redirect based on role
        const role = response.data.user.role;
        if (role === 'admin') navigate('/admin/dashboard');
        else if (role === 'agent') navigate('/agent/dashboard');
        else navigate('/customer/dashboard');
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed. Please check your credentials.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex bg-gray-50">
      {/* Left side - Branding (Hidden on mobile) */}
      <div className="hidden lg:flex lg:w-1/2 bg-primary text-white flex-col justify-center items-center p-12">
        <h1 className="text-4xl font-bold mb-4">Insurance Management Platform</h1>
        <p className="text-lg text-blue-100 text-center max-w-md">
          Securely manage your policies, claims, and premiums all in one centralized platform.
        </p>
      </div>

      {/* Right side - Form */}
      <div className="w-full lg:w-1/2 flex justify-center items-center p-6">
        <Card>
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-gray-900">Welcome Back</h2>
            <p className="text-sm text-gray-500 mt-2">Please enter your details to sign in.</p>
          </div>

          {error && <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-md text-sm">{error}</div>}

          <form onSubmit={handleSubmit}>
            <Input 
              label="Email Address" 
              name="email" 
              type="email" 
              value={formData.email} 
              onChange={handleChange} 
              placeholder="Enter your email" 
              required 
            />
            <PasswordInput 
              label="Password" 
              name="password" 
              value={formData.password} 
              onChange={handleChange} 
              placeholder="••••••••" 
              required 
            />
            
            <div className="mt-6">
              <Button type="submit" disabled={loading}>
                {loading ? <Loader className="h-5 w-5 border-white border-t-2" /> : 'Login'}
              </Button>
            </div>
          </form>

          <p className="mt-6 text-center text-sm text-gray-600">
            Don't have an account?{' '}
            <Link to="/register" className="text-primary font-medium hover:underline">
              Create Account
            </Link>
          </p>
        </Card>
      </div>
    </div>
  );
};

export default Login;