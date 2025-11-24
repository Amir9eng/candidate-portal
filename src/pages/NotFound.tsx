import { useNavigate } from 'react-router-dom';
import { Home, ArrowLeft } from 'lucide-react';

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center px-4 transition-colors">
      <div className="text-center max-w-md w-full">
        {/* 404 Number */}
        <div className="mb-8">
          <h1 className="text-9xl font-bold text-[#00002B] dark:text-white leading-none">404</h1>
        </div>

        {/* Error Message */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Page Not Found</h2>
          <p className="text-gray-600 dark:text-gray-400 text-lg">
            Sorry, we couldn't find the page you're looking for. The page might have been moved,
            deleted, or the URL might be incorrect.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center justify-center gap-2 px-6 py-3 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors font-medium text-gray-700 dark:text-gray-300"
          >
            <ArrowLeft size={20} />
            Go Back
          </button>
          <button
            onClick={() => navigate('/dashboard')}
            className="flex items-center justify-center gap-2 px-6 py-3 bg-[#00002B] text-white rounded-lg hover:bg-[#00002B]/90 transition-colors font-medium"
          >
            <Home size={20} />
            Go to Dashboard
          </button>
        </div>

        {/* Helpful Links */}
        <div className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-700">
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">You might be looking for:</p>
          <div className="flex flex-wrap justify-center gap-4">
            <button
              onClick={() => navigate('/dashboard')}
              className="text-sm text-[#00002B] dark:text-blue-400 hover:underline"
            >
              Dashboard
            </button>
            <button
              onClick={() => navigate('/job-offer')}
              className="text-sm text-[#00002B] dark:text-blue-400 hover:underline"
            >
              Job Offer
            </button>
            <button
              onClick={() => navigate('/teams')}
              className="text-sm text-[#00002B] dark:text-blue-400 hover:underline"
            >
              Teams
            </button>
            <button
              onClick={() => navigate('/settings')}
              className="text-sm text-[#00002B] dark:text-blue-400 hover:underline"
            >
              Settings
            </button>
            <button
              onClick={() => navigate('/support')}
              className="text-sm text-[#00002B] dark:text-blue-400 hover:underline"
            >
              Support
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFound;

