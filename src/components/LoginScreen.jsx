import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, Eye, EyeOff } from 'lucide-react';

const LoginScreen = ({ setUser }) => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    emailOrPhone: '',
    password: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    // Mock login
    const mockUser = {
      id: 1,
      name: 'John Doe',
      email: formData.emailOrPhone,
      phone: '+234 123 456 7890',
      location: 'Lagos, Nigeria'
    };
    setUser(mockUser);
    navigate('/home');
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="container-mobile">
      <div className="min-h-screen bg-white">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b">
          <Link to="/welcome" className="p-2">
            <ArrowLeft className="w-6 h-6 text-gray-600" />
          </Link>
          <h1 className="text-xl font-semibold text-text-dark">Login</h1>
          <div className="w-10"></div>
        </div>

        {/* Form */}
        <div className="p-6">
          <div className="mb-8 text-center">
            <h2 className="text-2xl font-bold text-text-dark mb-2">Welcome Back</h2>
            <p className="text-gray-600">Sign in to continue</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Email or Phone */}
            <div>
              <label className="block text-sm font-medium text-text-dark mb-2">Email or Phone</label>
              <input
                type="text"
                name="emailOrPhone"
                value={formData.emailOrPhone}
                onChange={handleChange}
                className="input-field"
                placeholder="Enter email or phone number"
                required
              />
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-medium text-text-dark mb-2">Password</label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className="input-field pr-12"
                  placeholder="Enter your password"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            {/* Forgot Password */}
            <div className="text-right">
              <Link to="/forgot-password" className="text-primary font-medium text-sm">
                Forgot Password?
              </Link>
            </div>

            {/* Submit Button */}
            <button type="submit" className="btn-primary w-full">
              Login
            </button>

            {/* Continue with Google */}
            <button type="button" className="btn-google w-full">
              <img src="https://developers.google.com/identity/images/g-logo.png" alt="Google" className="w-5 h-5" />
              Continue with Google
            </button>
          </form>

          {/* Sign Up Link */}
          <div className="text-center mt-6">
            <p className="text-gray-600">
              Don't have an account?{' '}
              <Link to="/signup" className="text-primary font-medium">
                Sign up
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginScreen;