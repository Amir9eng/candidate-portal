import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppSelector } from '../store/hooks';
import { useTheme } from '../contexts/ThemeContext';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';
import { Moon, Sun, User } from 'lucide-react';

const Settings = () => {
  const navigate = useNavigate();
  const { user, isAuthenticated } = useAppSelector((state) => state.auth);
  const { isDarkMode, toggleDarkMode } = useTheme();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/');
    }
  }, [isAuthenticated, navigate]);

  // Helper function to get full name
  const getFullName = (): string => {
    if (!user) return 'User';
    const firstName = user.employee_fristname || '';
    const lastName = user.employee_lastname || '';
    const middleName = user.employee_middle_name || '';
    return (
      [firstName, middleName, lastName].filter(Boolean).join(' ') || 'User'
    );
  };

  return (
    <div className="flex min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors">
      <Sidebar />

      <div className="flex-1 flex flex-col">
        <Header
          userName={getFullName()}
          userEmail={user?.employee_email || user?.employee_officialemail || ''}
        />

        <main className="flex-1 p-6 overflow-y-auto bg-gray-50 dark:bg-gray-900 transition-colors">
          {/* Page Header */}
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-[#00002B] dark:text-white mb-1">
              Settings
            </h2>
            <p className="text-gray-600 dark:text-gray-400">
              Manage your account settings and preferences
            </p>
          </div>

          <div className="max-w-4xl space-y-6">
            {/* Account Settings */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6 transition-colors">
              <div className="flex items-center gap-3 mb-6">
                <User className="text-[#00002B] dark:text-white" size={24} />
                <h3 className="text-xl font-semibold text-[#00002B] dark:text-white">
                  Account Settings
                </h3>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Full Name
                  </label>
                  <input
                    type="text"
                    value={getFullName()}
                    disabled
                    className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg text-gray-600 dark:text-gray-300"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    value={
                      user?.employee_email || user?.employee_officialemail || ''
                    }
                    disabled
                    className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg text-gray-600 dark:text-gray-300"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    value={user?.employee_phone1 || ''}
                    disabled
                    className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg text-gray-600 dark:text-gray-300"
                  />
                </div>
              </div>
            </div>

            {/* Appearance Settings */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6 transition-colors">
              <div className="flex items-center gap-3 mb-6">
                {isDarkMode ? (
                  <Moon className="text-[#00002B] dark:text-white" size={24} />
                ) : (
                  <Sun className="text-[#00002B] dark:text-white" size={24} />
                )}
                <h3 className="text-xl font-semibold text-[#00002B] dark:text-white">
                  Appearance
                </h3>
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-gray-900 dark:text-white">
                      Dark Mode
                    </p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Switch to dark theme
                    </p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={isDarkMode}
                      onChange={() => toggleDarkMode()}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-200 dark:bg-gray-700 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-[#00002B]/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#00002B]"></div>
                  </label>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Settings;
