import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppSelector } from '../store/hooks';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';
import { User, Plus, Trash2, FileText } from 'lucide-react';
import avatar from '../assets/avatar.png';

const Dashboard = () => {
  const navigate = useNavigate();
  const { user, isAuthenticated } = useAppSelector((state) => state.auth);

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/');
    }
  }, [isAuthenticated, navigate]);

  // Helper function to extract year from date
  const getYearFromDate = (dateString: string | null | undefined): string | null => {
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
    return [firstName, middleName, lastName].filter(Boolean).join(' ') || 'User';
  };

  // Helper function to get greeting name
  const getGreetingName = (): string => {
    return user?.employee_fristname || user?.employee_nick_name || 'there';
  };

  // Helper function to get title/designation
  const getTitle = (): string | null => {
    if (!user) return null;
    const designation = user.employee_designation;
    const position = user.employee_position;
    const department = user.employee_department;
    const qualification = user.Highest_qualification;
    
    const parts = [designation, position, department, qualification].filter(Boolean);
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
    { label: 'Accept Job Offer', percent: 5 },
    { label: 'Complete personal information', percent: 5 },
    { label: 'Add your work experience', percent: 5 },
  ];

  const progressBars = [
    { label: 'Credential Review', percent: 100 },
    { label: 'Interview Stage 1', percent: 100 },
    { label: 'Interview Stage 2', percent: 100 },
    { label: 'Onboarding', percent: onboardingProgress },
  ];

  // Get profile image or use default
  const profileImage = user?.profile_image_url || avatar;

  // Get resume URL
  const resumeUrl = user?.offerletter_url;

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />

      <div className="flex-1 flex flex-col">
        <Header
          userName={getFullName()}
          userEmail={user?.employee_email || user?.employee_officialemail || ''}
        />

        <main className="flex-1 p-6 overflow-y-auto">
          {/* Greeting Section */}
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-[#00002B] mb-1">
              Good morning, {getGreetingName()}! 👋
            </h2>
            <p className="text-gray-600">Welcome to kylian.</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left Column */}
            <div className="lg:col-span-2 space-y-6">
              {/* User Profile Card */}
              <div className="bg-white rounded-lg shadow-sm p-6">
                <div className="flex flex-col md:flex-row gap-6">
                  <img
                    src={profileImage}
                    alt="Profile"
                    className="w-32 h-32 rounded-lg object-cover"
                  />
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-[#00002B] mb-1">
                      {getFullName()}
                    </h3>
                    {getTitle() && (
                      <p className="text-gray-600 mb-4">{getTitle()}</p>
                    )}
                    <div className="flex gap-3">
                      {resumeUrl && (
                        <a
                          href={resumeUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          style={{ backgroundColor: '#00002B' }}
                          className="px-4 py-2 text-white font-semibold rounded-lg hover:opacity-90 transition-opacity"
                        >
                          View resume
                        </a>
                      )}
                      {resumeUrl && (
                        <a
                          href={resumeUrl}
                          download
                          className="px-4 py-2 border-2 border-[#00002B] text-[#00002B] font-semibold rounded-lg hover:bg-gray-50 transition-colors"
                        >
                          Download PDF Resume
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* Personal Information */}
              <div className="bg-white rounded-lg shadow-sm p-6">
                <div className="flex items-center gap-2 mb-4">
                  <User size={20} className="text-[#00002B]" />
                  <h3 className="text-lg font-bold text-[#00002B]">
                    Personal Information
                  </h3>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  {user?.employee_fristname && (
                    <div>
                      <p className="text-sm text-gray-500 mb-1">First name</p>
                      <p className="text-[#00002B] font-medium">
                        {user.employee_fristname}
                      </p>
                    </div>
                  )}
                  {user?.employee_lastname && (
                    <div>
                      <p className="text-sm text-gray-500 mb-1">Last name</p>
                      <p className="text-[#00002B] font-medium">
                        {user.employee_lastname}
                      </p>
                    </div>
                  )}
                  {(user?.employee_email || user?.employee_officialemail) && (
                    <div>
                      <p className="text-sm text-gray-500 mb-1">Email Address</p>
                      <p className="text-[#00002B] font-medium">
                        {user.employee_email || user.employee_officialemail}
                      </p>
                    </div>
                  )}
                  {user?.employee_phone1 && (
                    <div>
                      <p className="text-sm text-gray-500 mb-1">Mobile Number</p>
                      <p className="text-[#00002B] font-medium">
                        {user.employee_phone1}
                      </p>
                    </div>
                  )}
                  {user?.employee_maritalstatus && (
                    <div>
                      <p className="text-sm text-gray-500 mb-1">Marital Status</p>
                      <p className="text-[#00002B] font-medium">
                        {user.employee_maritalstatus}
                      </p>
                    </div>
                  )}
                  {(user?.city || user?.employee_address) && (
                    <div>
                      <p className="text-sm text-gray-500 mb-1">City</p>
                      <p className="text-[#00002B] font-medium">
                        {user.city || user.employee_address}
                      </p>
                    </div>
                  )}
                  {getYearFromDate(user?.employee_date_of_birth) && (
                    <div>
                      <p className="text-sm text-gray-500 mb-1">Year of Birth</p>
                      <p className="text-[#00002B] font-medium">
                        {getYearFromDate(user.employee_date_of_birth)}
                      </p>
                    </div>
                  )}
                  {user?.employee_sex && (
                    <div>
                      <p className="text-sm text-gray-500 mb-1">Gender</p>
                      <p className="text-[#00002B] font-medium">
                        {user.employee_sex}
                      </p>
                    </div>
                  )}
                </div>
              </div>

              {/* About me */}
              <div className="bg-white rounded-lg shadow-sm p-6">
                <div className="flex items-center gap-2 mb-4">
                  <User size={20} className="text-[#00002B]" />
                  <h3 className="text-lg font-bold text-[#00002B]">About me</h3>
                </div>
                {user?.paddtional_info ? (
                  <div className="border-2 border-gray-300 rounded-lg p-6">
                    <p className="text-[#00002B]">{user.paddtional_info}</p>
                  </div>
                ) : (
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                    <p className="text-gray-400 mb-3">
                      Add something about yourself
                    </p>
                    <button className="text-[#00002B] font-semibold flex items-center gap-2 mx-auto hover:opacity-80 transition-opacity">
                      <Plus size={20} />
                      <span>About me</span>
                    </button>
                  </div>
                )}
              </div>

              {/* Professional Skill */}
              <div className="bg-white rounded-lg shadow-sm p-6">
                <div className="flex items-center gap-2 mb-4">
                  <User size={20} className="text-[#00002B]" />
                  <h3 className="text-lg font-bold text-[#00002B]">
                    Professional Skill
                  </h3>
                </div>
                {user?.skill_set ? (
                  <div className="border-2 border-gray-300 rounded-lg p-6">
                    <p className="text-[#00002B]">{user.skill_set}</p>
                  </div>
                ) : (
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                    <p className="text-gray-400 mb-3">
                      Add something about yourself
                    </p>
                    <button className="text-[#00002B] font-semibold flex items-center gap-2 mx-auto hover:opacity-80 transition-opacity">
                      <Plus size={20} />
                      <span>Professional Skill</span>
                    </button>
                  </div>
                )}
              </div>
            </div>

            {/* Right Column */}
            <div className="space-y-6">
              {/* Onboarding Status */}
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h3 className="text-lg font-bold text-[#00002B] mb-4">
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
                      <span className="text-2xl font-bold text-[#00002B]">
                        {onboardingProgress}%
                      </span>
                    </div>
                  </div>
                  <p className="text-center text-gray-600 mb-4">
                    Your Onboarding is only {onboardingProgress}% complete!
                  </p>
                </div>
                <div className="space-y-3">
                  {progressItems.map((item, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                    >
                      <span className="text-sm text-gray-600">
                        {item.label}
                      </span>
                      <span className="text-sm font-semibold text-[#00002B]">
                        +{item.percent}%
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Progress Bars */}
              <div className="bg-white rounded-lg shadow-sm p-6">
                <div className="space-y-4">
                  {progressBars.map((bar, index) => (
                    <div key={index}>
                      <div className="flex justify-between mb-2">
                        <span className="text-sm font-medium text-[#00002B]">
                          {bar.label}
                        </span>
                        <span className="text-sm text-gray-600">
                          {bar.percent}% Completed
                        </span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-green-500 h-2 rounded-full transition-all"
                          style={{ width: `${bar.percent}%` }}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Uploaded resume */}
              {resumeUrl && (
                <div className="bg-white rounded-lg shadow-sm p-6">
                  <h3 className="text-lg font-bold text-[#00002B] mb-2">
                    Uploaded resume
                  </h3>
                  <p className="text-sm text-gray-600 mb-4">
                    Your file was successfully uploaded
                  </p>
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 relative">
                    <button className="absolute top-2 right-2 p-1 hover:bg-gray-100 rounded transition-colors">
                      <Trash2 size={16} className="text-gray-400" />
                    </button>
                    <div className="flex items-center gap-3">
                      <FileText size={32} className="text-[#00002B]" />
                      <div>
                        <p className="text-sm font-medium text-[#00002B]">
                          {resumeUrl.split('/').pop() || 'resume.pdf'}
                        </p>
                        <p className="text-xs text-gray-500">Resume</p>
                      </div>
                    </div>
                  </div>
                  <button className="w-full mt-4 px-4 py-2 border-2 border-[#00002B] text-[#00002B] font-semibold rounded-lg hover:bg-gray-50 transition-colors">
                    Replace File
                  </button>
                </div>
              )}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
