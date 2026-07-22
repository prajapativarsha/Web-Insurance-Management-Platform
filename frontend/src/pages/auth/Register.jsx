import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import authService from '../../services/authService';
import Input from '../../components/ui/Input';
import PasswordInput from '../../components/ui/PasswordInput';
import Button from '../../components/ui/Button';
import Card from '../../components/ui/Card';
import Loader from '../../components/ui/Loader';

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    dob: '',
    password: '',
    confirmPassword: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validateForm = () => {
    if (formData.password.length < 8) {
      setError('Password must be at least 8 characters long.');
      return false;
    }
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match.');
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    
    if (!validateForm()) return;
    
    setLoading(true);

    try {
      // Remove confirmPassword before sending to API
      const { confirmPassword, ...submitData } = formData;
      const response = await authService.register(submitData);
      
      if (response.success) {
        navigate('/', { state: { message: 'Registration successful! Please login.' } });
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex bg-gray-50">
      {/* Left side - Branding (Hidden on mobile) */}
      <div className="hidden lg:flex lg:w-1/2 bg-primary text-white flex-col justify-center items-center p-12">
        <h1 className="text-4xl font-bold mb-4">Join Our Platform</h1>
        <p className="text-lg text-blue-100 text-center max-w-md">
          Create an account today to access seamless insurance workflows and customer management features.
        </p>
      </div>

      {/* Right side - Form */}
      <div className="w-full lg:w-1/2 flex justify-center items-center p-6 py-12">
        <Card className="max-w-lg">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-gray-900">Create Your Account</h2>
            <p className="text-sm text-gray-500 mt-2">Enter your personal details to get started.</p>
          </div>

          {error && <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-md text-sm">{error}</div>}

          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 gap-y-1 sm:grid-cols-2 sm:gap-x-4">
              <Input 
                label="Full Name" 
                name="name" 
                value={formData.name} 
                onChange={handleChange} 
                placeholder="John Doe" 
                required 
              />
              <Input 
                label="Date of Birth" 
                name="dob" 
                type="date" 
                value={formData.dob} 
                onChange={handleChange} 
                required 
              />
            </div>
            
            <Input 
              label="Email Address" 
              name="email" 
              type="email" 
              value={formData.email} 
              onChange={handleChange} 
              placeholder="john@example.com" 
              required 
            />
            
            <Input 
              label="Phone Number" 
              name="phone" 
              type="tel" 
              value={formData.phone} 
              onChange={handleChange} 
              placeholder="+1 (555) 000-0000" 
            />
            
            <div className="grid grid-cols-1 gap-y-1 sm:grid-cols-2 sm:gap-x-4 mt-2">
              <PasswordInput 
                label="Password" 
                name="password" 
                value={formData.password} 
                onChange={handleChange} 
                required 
              />
              <PasswordInput 
                label="Confirm Password" 
                name="confirmPassword" 
                value={formData.confirmPassword} 
                onChange={handleChange} 
                required 
              />
            </div>

            <div className="mt-6">
              <Button type="submit" disabled={loading}>
                {loading ? <Loader className="h-5 w-5 border-white border-t-2" /> : 'Create Account'}
              </Button>
            </div>
          </form>

          <p className="mt-6 text-center text-sm text-gray-600">
            Already have an account?{' '}
            <Link to="/" className="text-primary font-medium hover:underline">
              Login
            </Link>
          </p>
        </Card>
      </div>
    </div>
  );
};

export default Register;