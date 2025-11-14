import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { loginAsync, clearError } from '../store/authSlice';
import logo from '../assets/logo.png';
import welcomeImage from '../assets/welcome.png';

const Login = () => {
  const [email, setEmail] = useState('');
  const [employeeId, setEmployeeId] = useState('');
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { isLoading, error, isAuthenticated } = useAppSelector(
    (state) => state.auth
  );

  useEffect(() => {
    // Clear any previous errors when component mounts
    dispatch(clearError());
  }, [dispatch]);

  useEffect(() => {
    // Redirect to dashboard on successful login
    if (isAuthenticated) {
      navigate('/dashboard');
    }
  }, [isAuthenticated, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(clearError());

    if (!email.trim() || !employeeId.trim()) {
      return;
    }

    await dispatch(loginAsync({ email, trackingNumber: employeeId }));
  };

  return (
    <div className="min-h-screen bg-white flex flex-col lg:flex-row">
      {/* Left Section - Illustration */}
      <div className="hidden lg:flex lg:w-1/2 bg-gray-50 items-center justify-center p-8">
        <img
          src={welcomeImage}
          alt="Welcome illustration"
          className="max-w-full h-auto object-contain"
        />
      </div>

      {/* Right Section - Login Form */}
      <div className="w-full lg:w-1/2 flex flex-col bg-white">
        {/* Logo */}
        <div className="p-6 lg:p-8">
          <img src={logo} alt="kylianerp logo" className="h-8 w-auto" />
        </div>

        {/* Login Form Card */}
        <div className="flex-1 flex items-center justify-center px-6 lg:px-12 xl:px-16 py-8">
          <div className="w-full max-w-md">
            {/* Welcome Message */}
            <div className="mb-8">
              <h1 className="text-2xl lg:text-3xl font-bold text-[#00002B] mb-2 leading-tight">
                Welcome to Onboarding, Daniel!
              </h1>
              <p className="text-lg text-[#00002B] font-normal">
                Lets get you started.
              </p>
            </div>

            {/* Sign In Header */}
            <h2 className="text-3xl text-center lg:text-4xl font-bold text-[#00002B] mb-2">
              Sign In
            </h2>
            <p className="text-base text-center text-[#00002B] mb-8 font-normal">
              Enter your credentials to access your dashboard
            </p>

            {/* Error Message */}
            {error && (
              <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg">
                <p className="text-sm text-red-600 text-center">{error}</p>
              </div>
            )}

            {/* Login Form */}
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Email Address Field */}
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-[#00002B] mb-2"
                >
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-3 bg-gray-100 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00002B] focus:border-transparent text-[#00002B] placeholder-gray-400 text-base"
                  placeholder=""
                  required
                />
              </div>

              {/* Employee Tracking ID Field */}
              <div>
                <label
                  htmlFor="employeeId"
                  className="block text-sm font-medium text-[#00002B] mb-2"
                >
                  Employee Tracking ID
                </label>
                <input
                  type="text"
                  id="employeeId"
                  value={employeeId}
                  onChange={(e) => setEmployeeId(e.target.value)}
                  className="w-full px-4 py-3 bg-gray-100 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00002B] focus:border-transparent text-[#00002B] placeholder-gray-400 text-base"
                  placeholder=""
                  required
                />
              </div>

              {/* Sign In Button */}
              <button
                type="submit"
                disabled={isLoading}
                style={{ backgroundColor: '#00002B' }}
                className="w-full py-3 text-white font-bold rounded-lg hover:opacity-90 transition-opacity duration-200 focus:outline-none focus:ring-2 focus:ring-[#00002B] focus:ring-offset-2 text-base disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? 'Signing In...' : 'Sign In'}
              </button>
            </form>

            {/* Footer Text */}
            <p className="text-xs text-center text-gray-500 mt-8">
              By signing in, you agree to our{' '}
              <a href="#" className="text-[#00002B] hover:underline">
                Terms of Service
              </a>{' '}
              and{' '}
              <a href="#" className="text-[#00002B] hover:underline">
                Privacy Policy
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
