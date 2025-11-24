import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppSelector } from '../store/hooks';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';
import { FileText, Edit, Check, X } from 'lucide-react';
import avatar from '../assets/avatar.png';

const JobOffer = () => {
  const navigate = useNavigate();
  const { user, isAuthenticated } = useAppSelector((state) => state.auth);
  const [offerStatus, setOfferStatus] = useState<
    'pending' | 'accepted' | 'rejected'
  >('pending');

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

  // Helper function to get greeting name
  const getGreetingName = (): string => {
    return user?.employee_fristname || user?.employee_nick_name || 'there';
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

  // Helper function to get role/designation
  const getRole = (): string => {
    return user?.employee_designation || user?.employee_position || 'Employee';
  };

  // Helper function to get education
  const getEducation = (): string => {
    const qualification = user?.Highest_qualification;
    const parts = [qualification].filter(Boolean);
    return parts.length > 0 ? parts.join(' • ') : 'Not specified';
  };

  // Calculate onboarding progress
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

  // Get profile image
  const profileImage = user?.profile_image_url
    ? `https://apiqa.kylianerp.com${user.profile_image_url}`
    : avatar;

  // Get offer letter URL
  const offerLetterUrl = user?.offerletter_url
    ? `https://apiqa.kylianerp.com${user.offerletter_url}`
    : null;

  const handleAcceptOffer = () => {
    if (window.confirm('Are you sure you want to accept this job offer?')) {
      setOfferStatus('accepted');
      // TODO: Add API call to accept the offer
      alert('Job offer accepted successfully!');
    }
  };

  const handleRejectOffer = () => {
    if (
      window.confirm(
        'Are you sure you want to reject this job offer? This action cannot be undone.'
      )
    ) {
      setOfferStatus('rejected');
      // TODO: Add API call to reject the offer
      alert('Job offer has been rejected.');
    }
  };

  const progressItems = [
    { label: 'Accept Job Offer', percent: 50 },
    { label: 'Check Your Team', percent: 50 },
  ];

  return (
    <div className="flex min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors">
      <Sidebar />

      <div className="flex-1 flex flex-col">
        <Header
          userName={getFullName()}
          userEmail={user?.employee_email || user?.employee_officialemail || ''}
        />

        <main className="flex-1 bg-white dark:bg-gray-900 p-6 overflow-y-auto transition-colors">
          {/* Greeting Section */}
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-[#00002B] dark:text-white mb-1">
              {getTimeBasedGreeting()}, {getGreetingName()}! 👋
            </h2>
            <p className="text-[#00002B]/80 dark:text-gray-400">
              Welcome to kylian.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Left Column */}
            <div className="space-y-6">
              {/* User Profile Card */}
              <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-6 transition-colors">
                <div className="flex flex-col items-center">
                  <div className="relative mb-4">
                    <img
                      src={profileImage}
                      alt={getFullName()}
                      className="w-32 h-32 rounded-full object-cover border-4 border-gray-100 dark:border-gray-700"
                    />
                    <button className="absolute bottom-0 right-0 bg-[#00002B] text-white p-2 rounded-full hover:bg-[#00002B]/90 transition-colors">
                      <Edit size={16} />
                    </button>
                  </div>
                  <h3 className="text-xl font-bold text-[#00002B] dark:text-white mb-1">
                    {getFullName()}
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">
                    {getRole()}
                  </p>
                  <p className="text-sm text-gray-500 dark:text-gray-500 mb-4">
                    {getEducation()}
                  </p>
                  {offerLetterUrl && (
                    <div className="flex gap-3 w-full">
                      <a
                        href={offerLetterUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 bg-[#00002B] text-white py-2 px-4 rounded-lg hover:bg-[#00002B]/90 transition-colors font-medium text-sm text-center"
                      >
                        View Offer Letter
                      </a>
                      <a
                        href={offerLetterUrl}
                        download
                        className="flex-1 border-2 border-[#00002B] text-[#00002B] py-2 px-4 rounded-lg hover:bg-[#00002B]/5 transition-colors font-medium text-sm text-center"
                      >
                        Download Offer Letter
                      </a>
                    </div>
                  )}
                </div>
              </div>

              {/* Offer Letter Section */}
              <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-6 transition-colors">
                <h3 className="text-lg font-bold text-[#00002B] dark:text-white mb-4">
                  Offer Letter
                </h3>
                {offerLetterUrl ? (
                  <>
                    {/* PDF Viewer */}
                    <div className="border border-gray-300 dark:border-gray-600 rounded-lg overflow-hidden mb-4 bg-gray-50 dark:bg-gray-900">
                      <iframe
                        src={`${offerLetterUrl}#toolbar=0&navpanes=0&scrollbar=1`}
                        className="w-full h-[600px]"
                        title="Offer Letter"
                        style={{ border: 'none' }}
                      />
                    </div>

                    {/* Status Message */}
                    {offerStatus !== 'pending' && (
                      <div
                        className={`mb-4 p-3 rounded-lg ${
                          offerStatus === 'accepted'
                            ? 'bg-green-50 dark:bg-green-900/30 border border-green-200 dark:border-green-800'
                            : 'bg-red-50 dark:bg-red-900/30 border border-red-200 dark:border-red-800'
                        }`}
                      >
                        <p
                          className={`text-sm font-medium ${
                            offerStatus === 'accepted'
                              ? 'text-green-800 dark:text-green-300'
                              : 'text-red-800 dark:text-red-300'
                          }`}
                        >
                          {offerStatus === 'accepted'
                            ? '✓ You have accepted this job offer'
                            : '✗ You have rejected this job offer'}
                        </p>
                      </div>
                    )}

                    {/* Action Buttons */}
                    <div className="flex gap-3">
                      <button
                        onClick={handleAcceptOffer}
                        disabled={offerStatus !== 'pending'}
                        className={`flex-1 py-3 px-4 rounded-lg font-semibold text-sm flex items-center justify-center gap-2 transition-all ${
                          offerStatus === 'pending'
                            ? 'bg-green-600 text-white hover:bg-green-700 shadow-md hover:shadow-lg'
                            : offerStatus === 'accepted'
                            ? 'bg-green-100 text-green-700 cursor-not-allowed'
                            : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                        }`}
                      >
                        <Check size={18} />
                        Accept Offer
                      </button>
                      <button
                        onClick={handleRejectOffer}
                        disabled={offerStatus !== 'pending'}
                        className={`flex-1 py-3 px-4 rounded-lg font-semibold text-sm flex items-center justify-center gap-2 transition-all ${
                          offerStatus === 'pending'
                            ? 'bg-red-600 text-white hover:bg-red-700 shadow-md hover:shadow-lg'
                            : offerStatus === 'rejected'
                            ? 'bg-red-100 text-red-700 cursor-not-allowed'
                            : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                        }`}
                      >
                        <X size={18} />
                        Reject Offer
                      </button>
                    </div>
                  </>
                ) : (
                  <div className="text-center py-12 text-gray-500 dark:text-gray-400">
                    <FileText size={48} className="mx-auto mb-3 opacity-50" />
                    <p className="text-lg font-medium mb-1">
                      No offer letter available
                    </p>
                    <p className="text-sm">
                      Please contact HR if you believe this is an error.
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* Right Column */}
            <div className="space-y-6">
              {/* Onboarding Status Card */}
              <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-6 transition-colors">
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
                        stroke="#E5E7EB"
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
                        strokeDasharray={`${
                          (onboardingProgress / 100) * 351.86
                        } 351.86`}
                        strokeLinecap="round"
                      />
                    </svg>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-2xl font-bold text-[#00002B] dark:text-white">
                        {onboardingProgress}%
                      </span>
                    </div>
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-4 text-center">
                    Your Onboarding is only {onboardingProgress}% complete!
                  </p>
                  <div className="w-full space-y-2 mb-6">
                    {progressItems.map((item, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between p-2 bg-gray-50 dark:bg-gray-700 rounded-lg"
                      >
                        <span className="text-sm text-gray-700 dark:text-gray-300">
                          {item.label}
                        </span>
                        <span className="text-sm font-medium text-[#00002B] dark:text-white">
                          +{item.percent}%
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default JobOffer;
