import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { fetchEmployeesAsync } from '../store/employeesSlice';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';
import { BASE_URL } from '../services/api';

const Teams = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { employees, isLoading, error } = useAppSelector(
    (state) => state.employees
  );
  const { user, isAuthenticated } = useAppSelector((state) => state.auth);

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/');
    }
  }, [isAuthenticated, navigate]);

  // Get company_id from user data or use default (59)
  const companyId = user?.company_id || user?.companyId || 59;
  // Get employee id from user data - check multiple possible field names
  // The id field is required for the API request (used for authorization)
  const employeeId = user?.id || user?.employee_id || user?.user_id;

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

  // Helper function to get greeting name
  const getGreetingName = (): string => {
    return user?.employee_fristname || user?.employee_nick_name || 'there';
  };

  useEffect(() => {
    if (companyId) {
      dispatch(fetchEmployeesAsync({ companyId, employeeId }));
    }
  }, [dispatch, companyId, employeeId]);

  return (
    <div className="flex min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors">
      <Sidebar />

      <div className="flex-1 flex flex-col">
        <Header
          userName={getFullName()}
          userEmail={user?.employee_email || user?.employee_officialemail || ''}
        />

        <main className="flex-1 bg-[#00002B] dark:bg-gray-800 p-6 overflow-y-auto transition-colors">
          {/* Greeting Section */}
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-white mb-1">
              Good morning, {getGreetingName()}! 👋
            </h2>
            <p className="text-white/80">Welcome to kylian.</p>
          </div>

          {/* Section Title */}
          <h2 className="text-4xl font-bold text-white mb-8">Meet the team</h2>

          {/* Loading State */}
          {isLoading && (
            <div className="flex items-center justify-center py-12">
              <div className="text-white text-lg">Loading employees...</div>
            </div>
          )}

          {/* Error State */}
          {error && (
            <div className="bg-red-50 dark:bg-red-900/30 border border-red-200 dark:border-red-800 rounded-lg p-4 mb-6">
              <p className="text-red-600 dark:text-red-300">{error}</p>
            </div>
          )}

          {/* Employees Grid */}
          {!isLoading && !error && (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {employees.length > 0 ? (
                employees.map((employee, index) => (
                  <div
                    key={employee.id || index}
                    className="bg-white dark:bg-gray-700 rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow"
                  >
                    {/* Employee Image */}
                    <div className="aspect-square bg-gray-200 dark:bg-gray-600 overflow-hidden">
                      {employee.profile_image_url ? (
                        <img
                          src={`${BASE_URL}${employee.profile_image_url}`}
                          alt={`${employee.employee_fristname} ${employee.employee_lastname}`}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center bg-gray-300 dark:bg-gray-600">
                          <span className="text-4xl text-gray-500 dark:text-gray-400">
                            {employee.employee_fristname
                              ? employee.employee_fristname
                                  .charAt(0)
                                  .toUpperCase()
                              : '?'}
                          </span>
                        </div>
                      )}
                    </div>

                    {/* Employee Info */}
                    <div className="p-4 bg-white dark:bg-gray-700">
                      <h3 className="font-bold text-[#00002B] dark:text-white text-lg mb-1">
                        {`${employee.employee_fristname || ''} ${
                          employee.employee_lastname || ''
                        }`.trim() || 'Unknown Employee'}
                      </h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {employee.employee_designation || 'Employee'}
                      </p>
                    </div>
                  </div>
                ))
              ) : (
                <div className="col-span-full text-center py-12">
                  <p className="text-white text-lg">No employees found.</p>
                </div>
              )}
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default Teams;
