import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppSelector } from '../store/hooks';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';
import { User } from 'lucide-react';

const Dashboard = () => {
  const navigate = useNavigate();
  const { user, isAuthenticated } = useAppSelector((state) => state.auth);

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/');
    }
  }, [isAuthenticated, navigate]);

  // Helper function to extract year from date
  const getYearFromDate = (
    dateString: string | null | undefined
  ): string | null => {
    if (!dateString) return null;
    try {
      const date = new Date(dateString);
      return date.getFullYear().toString();
    } catch {
      return null;
    }
  };

  // Helper function to format name
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

  // Helper function to get initials (first and last name) for avatar
  const getInitial = (): string => {
    if (!user) return 'U';
    const firstName = user.employee_fristname || '';
    const lastName = user.employee_lastname || '';

    if (!firstName && !lastName) return 'U';

    const firstInitial = firstName.charAt(0).toUpperCase();
    const lastInitial = lastName.charAt(0).toUpperCase();

    if (firstInitial && lastInitial) {
      return firstInitial + lastInitial;
    } else if (firstInitial) {
      return firstInitial;
    } else if (lastInitial) {
      return lastInitial;
    }

    return 'U';
  };

  // Helper function to get background color based on initial
  const getAvatarColor = (): string => {
    const initial = getInitial();
    const colors = [
      'bg-blue-500',
      'bg-green-500',
      'bg-pink-500',
      'bg-indigo-500',
      'bg-yellow-500',
      'bg-red-500',
      'bg-teal-500',
    ];
    const index = initial.charCodeAt(0) % colors.length;
    return colors[index];
  };

  // Helper function to get time-based greeting
  const getTimeBasedGreeting = (): string => {
    const hour = new Date().getHours();
    if (hour < 12) {
      return 'Good morning';
    } else if (hour < 17) {
      return 'Good afternoon';
    } else {
      return 'Good evening';
    }
  };

  // Helper function to get title/designation
  const getTitle = (): string | null => {
    if (!user) return null;
    const designation = user.employee_designation;
    const position = user.employee_position;
    const department = user.employee_department;
    const qualification = user.Highest_qualification;

    const parts = [designation, position, department, qualification].filter(
      Boolean
    );
    return parts.length > 0 ? parts.join(' • ') : null;
  };

  // Calculate onboarding progress (mock for now, can be calculated based on filled fields)
  const calculateOnboardingProgress = (): number => {
    if (!user) return 0;
    let completed = 0;
    const total = 8;

    if (user.employee_fristname) completed++;
    if (user.employee_lastname) completed++;
    if (user.employee_email) completed++;
    if (user.employee_phone1) completed++;
    if (user.employee_maritalstatus) completed++;
    if (user.city || user.employee_address) completed++;
    if (user.employee_date_of_birth) completed++;
    if (user.employee_sex) completed++;

    return Math.round((completed / total) * 100);
  };

  const onboardingProgress = calculateOnboardingProgress();

  const progressItems = [
    { label: 'Accept Job Offer', percent: 50 },
    { label: 'Check Your Team', percent: 50 },
  ];

  // Get offer letter URL
  const offerLetterUrl = user?.offerletter_url;

  return (
    <div className="flex min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors">
      <Sidebar />

      <div className="flex-1 flex flex-col">
        <Header
          userName={getFullName()}
          userEmail={user?.employee_email || user?.employee_officialemail || ''}
        />

        <main className="flex-1 p-6 overflow-y-auto bg-gray-50 dark:bg-gray-900 transition-colors">
          {/* Greeting Section */}
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-[#00002B] dark:text-white mb-1">
              {getTimeBasedGreeting()}, {getGreetingName()}! 👋
            </h2>
            <p className="text-gray-600 dark:text-gray-400">
              Welcome to kylian.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left Column */}
            <div className="lg:col-span-2 space-y-6">
              {/* User Profile Card */}
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6 transition-colors">
                <div className="flex flex-col md:flex-row gap-6">
                  <div
                    className={`w-32 h-32 rounded-lg flex items-center justify-center text-white text-3xl font-bold ${getAvatarColor()}`}
                  >
                    {getInitial()}
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-[#00002B] dark:text-white mb-1">
                      {getFullName()}
                    </h3>
                    {getTitle() && (
                      <p className="text-gray-600 dark:text-gray-400 mb-4">
                        {getTitle()}
                      </p>
                    )}
                    <div className="flex gap-3">
                      {offerLetterUrl && (
                        <a
                          href={offerLetterUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          style={{ backgroundColor: '#00002B' }}
                          className="px-4 py-2 text-white font-semibold rounded-lg hover:opacity-90 transition-opacity"
                        >
                          View Offer Letter
                        </a>
                      )}
                      {offerLetterUrl && (
                        <a
                          href={offerLetterUrl}
                          download
                          className="px-4 py-2 border-2 border-[#00002B] text-[#00002B] font-semibold rounded-lg hover:bg-gray-50 transition-colors"
                        >
                          Download Offer Letter
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* Personal Information */}
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6 transition-colors">
                <div className="flex items-center gap-2 mb-4">
                  <User size={20} className="text-[#00002B] dark:text-white" />
                  <h3 className="text-lg font-bold text-[#00002B] dark:text-white">
                    Personal Information
                  </h3>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  {user?.employee_fristname && (
                    <div>
                      <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">
                        First name
                      </p>
                      <p className="text-[#00002B] dark:text-white font-medium">
                        {user.employee_fristname}
                      </p>
                    </div>
                  )}
                  {user?.employee_lastname && (
                    <div>
                      <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">
                        Last name
                      </p>
                      <p className="text-[#00002B] dark:text-white font-medium">
                        {user.employee_lastname}
                      </p>
                    </div>
                  )}
                  {(user?.employee_email || user?.employee_officialemail) && (
                    <div>
                      <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">
                        Email Address
                      </p>
                      <p className="text-[#00002B] dark:text-white font-medium">
                        {user.employee_email || user.employee_officialemail}
                      </p>
                    </div>
                  )}
                  {user?.employee_phone1 && (
                    <div>
                      <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">
                        Mobile Number
                      </p>
                      <p className="text-[#00002B] dark:text-white font-medium">
                        {user.employee_phone1}
                      </p>
                    </div>
                  )}
                  {user?.employee_maritalstatus && (
                    <div>
                      <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">
                        Marital Status
                      </p>
                      <p className="text-[#00002B] dark:text-white font-medium">
                        {user.employee_maritalstatus}
                      </p>
                    </div>
                  )}
                  {(user?.city || user?.employee_address) && (
                    <div>
                      <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">
                        City
                      </p>
                      <p className="text-[#00002B] dark:text-white font-medium">
                        {user.city || user.employee_address}
                      </p>
                    </div>
                  )}
                  {getYearFromDate(user?.employee_date_of_birth) && (
                    <div>
                      <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">
                        Year of Birth
                      </p>
                      <p className="text-[#00002B] dark:text-white font-medium">
                        {getYearFromDate(user.employee_date_of_birth)}
                      </p>
                    </div>
                  )}
                  {user?.employee_sex && (
                    <div>
                      <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">
                        Gender
                      </p>
                      <p className="text-[#00002B] dark:text-white font-medium">
                        {user.employee_sex}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Right Column */}
            <div className="space-y-6">
              {/* Onboarding Status */}
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6 transition-colors">
                <h3 className="text-lg font-bold text-[#00002B] dark:text-white mb-4">
                  Onboarding Status
                </h3>
                <div className="flex flex-col items-center mb-6">
                  <div className="relative w-32 h-32 mb-4">
                    <svg className="transform -rotate-90 w-32 h-32">
                      <circle
                        cx="64"
                        cy="64"
                        r="56"
                        stroke="#e5e7eb"
                        className="dark:stroke-gray-700"
                        strokeWidth="12"
                        fill="none"
                      />
                      <circle
                        cx="64"
                        cy="64"
                        r="56"
                        stroke="#00002B"
                        strokeWidth="12"
                        fill="none"
                        strokeDasharray={`${2 * Math.PI * 56}`}
                        strokeDashoffset={`${
                          2 * Math.PI * 56 * (1 - onboardingProgress / 100)
                        }`}
                        strokeLinecap="round"
                      />
                    </svg>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-2xl font-bold text-[#00002B] dark:text-white">
                        {onboardingProgress}%
                      </span>
                    </div>
                  </div>
                  <p className="text-center text-gray-600 dark:text-gray-400 mb-4">
                    Your Onboarding is only {onboardingProgress}% complete!
                  </p>
                </div>
                <div className="space-y-3">
                  {progressItems.map((item, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg"
                    >
                      <span className="text-sm text-gray-600 dark:text-gray-300">
                        {item.label}
                      </span>
                      <span className="text-sm font-semibold text-[#00002B] dark:text-white">
                        +{item.percent}%
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
