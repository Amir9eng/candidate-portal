import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppSelector } from '../store/hooks';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';
import { FileText, Download, Eye, Trash2, Edit, Upload } from 'lucide-react';
import avatar from '../assets/avatar.png';

const JobOffer = () => {
  const navigate = useNavigate();
  const { user, isAuthenticated } = useAppSelector((state) => state.auth);
  const [uploadedResume, setUploadedResume] = useState<{
    name: string;
    size: string;
  } | null>({
    name: 'fateme-ghaemi-resume.pdf',
    size: '200 KB',
  });

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
    return [firstName, middleName, lastName].filter(Boolean).join(' ') || 'User';
  };

  // Helper function to get greeting name
  const getGreetingName = (): string => {
    return user?.employee_fristname || user?.employee_nick_name || 'there';
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

  // Format file size
  const formatFileSize = (size: string | null): string => {
    if (!size) return '0 KB';
    // If already formatted, return as is
    if (size.includes('KB') || size.includes('MB')) return size;
    // Otherwise try to parse
    const bytes = parseInt(size);
    if (isNaN(bytes)) return size;
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  };

  const offerLetterSize = formatFileSize(user?.offerletter_url ? '2.4 MB' : null);

  const handleDeleteResume = () => {
    setUploadedResume(null);
  };

  const handleReplaceResume = () => {
    // This would typically open a file picker
    // For now, just reset the uploaded resume
    setUploadedResume(null);
  };

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

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />

      <div className="flex-1 flex flex-col">
        <Header
          userName={getFullName()}
          userEmail={user?.employee_email || user?.employee_officialemail || ''}
        />

        <main className="flex-1 bg-white p-6 overflow-y-auto">
          {/* Greeting Section */}
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-[#00002B] mb-1">
              Good morning, {getGreetingName()}! 👋
            </h2>
            <p className="text-[#00002B]/80">Welcome to kylian.</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Left Column */}
            <div className="space-y-6">
              {/* User Profile Card */}
              <div className="bg-white border border-gray-200 rounded-lg p-6">
                <div className="flex flex-col items-center">
                  <div className="relative mb-4">
                    <img
                      src={profileImage}
                      alt={getFullName()}
                      className="w-32 h-32 rounded-full object-cover border-4 border-gray-100"
                    />
                    <button className="absolute bottom-0 right-0 bg-[#00002B] text-white p-2 rounded-full hover:bg-[#00002B]/90 transition-colors">
                      <Edit size={16} />
                    </button>
                  </div>
                  <h3 className="text-xl font-bold text-[#00002B] mb-1">
                    {getFullName()}
                  </h3>
                  <p className="text-sm text-gray-600 mb-1">{getRole()}</p>
                  <p className="text-sm text-gray-500 mb-4">{getEducation()}</p>
                  <div className="flex gap-3 w-full">
                    <button className="flex-1 bg-[#00002B] text-white py-2 px-4 rounded-lg hover:bg-[#00002B]/90 transition-colors font-medium text-sm">
                      View resume
                    </button>
                    <button className="flex-1 border-2 border-[#00002B] text-[#00002B] py-2 px-4 rounded-lg hover:bg-[#00002B]/5 transition-colors font-medium text-sm">
                      Download PDF Resume
                    </button>
                  </div>
                </div>
              </div>

              {/* Offer Letter Section */}
              <div className="bg-white border border-gray-200 rounded-lg p-6">
                <h3 className="text-lg font-bold text-[#00002B] mb-4">Offer Letter</h3>
                {offerLetterUrl ? (
                  <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg mb-4">
                    <div className="bg-red-100 p-3 rounded-lg">
                      <FileText className="text-red-600" size={24} />
                    </div>
                    <div className="flex-1">
                      <p className="font-medium text-[#00002B]">
                        Offer Letter...pdf
                      </p>
                      <p className="text-sm text-gray-500">{offerLetterSize}</p>
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-8 text-gray-500">
                    <FileText size={48} className="mx-auto mb-2 opacity-50" />
                    <p>No offer letter available</p>
                  </div>
                )}
                {offerLetterUrl && (
                  <div className="flex gap-3">
                    <button
                      onClick={() => window.open(offerLetterUrl, '_blank')}
                      className="flex-1 bg-[#00002B] text-white py-2 px-4 rounded-lg hover:bg-[#00002B]/90 transition-colors font-medium text-sm flex items-center justify-center gap-2"
                    >
                      <Eye size={16} />
                      View
                    </button>
                    <button
                      onClick={() => {
                        const link = document.createElement('a');
                        link.href = offerLetterUrl;
                        link.download = 'offer-letter.pdf';
                        link.click();
                      }}
                      className="flex-1 border-2 border-[#00002B] text-[#00002B] py-2 px-4 rounded-lg hover:bg-[#00002B]/5 transition-colors font-medium text-sm flex items-center justify-center gap-2"
                    >
                      <Download size={16} />
                      Download
                    </button>
                  </div>
                )}
              </div>
            </div>

            {/* Right Column */}
            <div className="space-y-6">
              {/* Onboarding Status Card */}
              <div className="bg-white border border-gray-200 rounded-lg p-6">
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
                        stroke="#E5E7EB"
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
                        strokeDasharray={`${(onboardingProgress / 100) * 351.86} 351.86`}
                        strokeLinecap="round"
                      />
                    </svg>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-2xl font-bold text-[#00002B]">
                        {onboardingProgress}%
                      </span>
                    </div>
                  </div>
                  <p className="text-sm text-gray-600 mb-4 text-center">
                    Your Onboarding is only {onboardingProgress}% complete!
                  </p>
                  <div className="w-full space-y-2 mb-6">
                    {progressItems.map((item, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between p-2 bg-gray-50 rounded-lg"
                      >
                        <span className="text-sm text-gray-700">{item.label}</span>
                        <span className="text-sm font-medium text-[#00002B]">
                          +{item.percent}%
                        </span>
                      </div>
                    ))}
                  </div>
                  <div className="w-full space-y-3">
                    {progressBars.map((bar, index) => (
                      <div key={index}>
                        <div className="flex justify-between items-center mb-1">
                          <span className="text-sm font-medium text-[#00002B]">
                            {bar.label}
                          </span>
                          <span className="text-sm text-gray-600">
                            {bar.percent}% {bar.percent === 100 ? 'Completed' : 'Completed'}
                          </span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div
                            className="bg-green-500 h-2 rounded-full transition-all duration-300"
                            style={{ width: `${bar.percent}%` }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Uploaded Resume Section */}
              <div className="bg-white border border-gray-200 rounded-lg p-6">
                <h3 className="text-lg font-bold text-[#00002B] mb-4">
                  Uploaded resume
                </h3>
                {uploadedResume ? (
                  <>
                    <div className="mb-4 p-3 bg-green-50 border border-green-200 rounded-lg">
                      <p className="text-sm text-green-700">
                        Your file was successfully uploaded
                      </p>
                    </div>
                    <div className="relative border-2 border-dashed border-gray-300 rounded-lg p-4 mb-4">
                      <button
                        onClick={handleDeleteResume}
                        className="absolute top-2 right-2 text-red-500 hover:text-red-700 transition-colors"
                      >
                        <Trash2 size={18} />
                      </button>
                      <div className="flex items-center gap-3">
                        <div className="bg-gray-100 p-3 rounded-lg">
                          <FileText className="text-gray-600" size={24} />
                        </div>
                        <div className="flex-1">
                          <p className="font-medium text-[#00002B]">
                            {uploadedResume.name}
                          </p>
                          <p className="text-sm text-gray-500">{uploadedResume.size}</p>
                        </div>
                      </div>
                    </div>
                    <button
                      onClick={handleReplaceResume}
                      className="w-full border-2 border-dashed border-[#00002B] text-[#00002B] py-2 px-4 rounded-lg hover:bg-[#00002B]/5 transition-colors font-medium text-sm flex items-center justify-center gap-2"
                    >
                      <Upload size={16} />
                      Replace File
                    </button>
                  </>
                ) : (
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                    <Upload className="mx-auto mb-2 text-gray-400" size={32} />
                    <p className="text-sm text-gray-500 mb-4">
                      No resume uploaded yet
                    </p>
                    <button className="bg-[#00002B] text-white py-2 px-4 rounded-lg hover:bg-[#00002B]/90 transition-colors font-medium text-sm">
                      Upload Resume
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default JobOffer;

