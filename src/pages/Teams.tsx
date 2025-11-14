import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { fetchEmployeesAsync } from '../store/employeesSlice';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';

const Teams = () => {
  const dispatch = useAppDispatch();
  const { employees, isLoading, error } = useAppSelector(
    (state) => state.employees
  );
  const { user } = useAppSelector((state) => state.auth);

  // Get company_id from user data or use default (59)
  const companyId = user?.company_id || user?.companyId || 59;

  // Helper function to get full name
  const getFullName = (): string => {
    if (!user) return 'User';
    const firstName = user.employee_fristname || '';
    const lastName = user.employee_lastname || '';
    const middleName = user.employee_middle_name || '';
    return [firstName, middleName, lastName].filter(Boolean).join(' ') || 'User';
  };

  // Helper function to get greeting name
  const getGreetingName = (): string => {
    return user?.employee_fristname || user?.employee_nick_name || 'there';
  };

  useEffect(() => {
    if (companyId) {
      dispatch(fetchEmployeesAsync(companyId));
    }
  }, [dispatch, companyId]);

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />

      <div className="flex-1 flex flex-col">
        <Header
          userName={getFullName()}
          userEmail={user?.employee_email || user?.employee_officialemail || ''}
        />

        <main className="flex-1 bg-[#00002B] p-6 overflow-y-auto">
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
            <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
              <p className="text-red-600">{error}</p>
            </div>
          )}

          {/* Employees Grid */}
          {!isLoading && !error && (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {employees.length > 0 ? (
                employees.map((employee, index) => (
                  <div
                    key={employee.id || index}
                    className="bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow"
                  >
                    {/* Employee Image */}
                    <div className="aspect-square bg-gray-200 overflow-hidden">
                      {employee.avatar ? (
                        <img
                          src={employee.avatar}
                          alt={employee.name || 'Employee'}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center bg-gray-300">
                          <span className="text-4xl text-gray-500">
                            {employee.name
                              ? employee.name.charAt(0).toUpperCase()
                              : '?'}
                          </span>
                        </div>
                      )}
                    </div>

                    {/* Employee Info */}
                    <div className="p-4 bg-white">
                      <h3 className="font-bold text-[#00002B] text-lg mb-1">
                        {employee.name || 'Unknown Employee'}
                      </h3>
                      <p className="text-sm text-gray-600">
                        {employee.position ||
                          employee.department ||
                          employee.title ||
                          'Employee'}
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

