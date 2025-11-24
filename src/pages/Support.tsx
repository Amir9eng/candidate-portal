import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppSelector } from '../store/hooks';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';
import { HelpCircle, Mail, Phone, Send, FileText } from 'lucide-react';

const Support = () => {
  const navigate = useNavigate();
  const { user, isAuthenticated } = useAppSelector((state) => state.auth);
  const [formData, setFormData] = useState({
    subject: '',
    message: '',
    category: 'general',
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
    return (
      [firstName, middleName, lastName].filter(Boolean).join(' ') || 'User'
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    alert(
      'Support request submitted successfully! We will get back to you soon.'
    );
    setFormData({ subject: '', message: '', category: 'general' });
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
              Support
            </h2>
            <p className="text-gray-600 dark:text-gray-400">
              Get help or contact our support team
            </p>
          </div>

          <div className="max-w-4xl grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Contact Information Cards */}
            <div className="lg:col-span-1 space-y-4">
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6 transition-colors">
                <div className="flex items-center gap-3 mb-4">
                  <Mail className="text-[#00002B] dark:text-white" size={24} />
                  <h3 className="text-lg font-semibold text-[#00002B] dark:text-white">
                    Email Support
                  </h3>
                </div>
                <p className="text-gray-600 dark:text-gray-400 text-sm mb-2">
                  Send us an email and we'll respond within 24 hours
                </p>
                <a
                  href="mailto:support@kylianerp.com"
                  className="text-[#00002B] dark:text-blue-400 hover:underline font-medium"
                >
                  support@kylianerp.com
                </a>
              </div>

              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6 transition-colors">
                <div className="flex items-center gap-3 mb-4">
                  <Phone className="text-[#00002B] dark:text-white" size={24} />
                  <h3 className="text-lg font-semibold text-[#00002B] dark:text-white">
                    Phone Support
                  </h3>
                </div>
                <p className="text-gray-600 dark:text-gray-400 text-sm mb-2">
                  Call us during business hours
                </p>
                <a
                  href="tel:+1234567890"
                  className="text-[#00002B] dark:text-blue-400 hover:underline font-medium"
                >
                  +1 (234) 567-890
                </a>
              </div>
            </div>

            {/* Support Form */}
            <div className="lg:col-span-2">
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6 transition-colors">
                <div className="flex items-center gap-3 mb-6">
                  <HelpCircle
                    className="text-[#00002B] dark:text-white"
                    size={24}
                  />
                  <h3 className="text-xl font-semibold text-[#00002B] dark:text-white">
                    Submit a Request
                  </h3>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Category
                    </label>
                    <select
                      value={formData.category}
                      onChange={(e) =>
                        setFormData({ ...formData, category: e.target.value })
                      }
                      className="w-full px-4 py-2 border border-gray-200 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#00002B] focus:border-transparent"
                    >
                      <option value="general">General Inquiry</option>
                      <option value="technical">Technical Issue</option>
                      <option value="account">Account Issue</option>
                      <option value="billing">Billing Question</option>
                      <option value="other">Other</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Subject
                    </label>
                    <input
                      type="text"
                      value={formData.subject}
                      onChange={(e) =>
                        setFormData({ ...formData, subject: e.target.value })
                      }
                      placeholder="What can we help you with?"
                      required
                      className="w-full px-4 py-2 border border-gray-200 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#00002B] focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Message
                    </label>
                    <textarea
                      value={formData.message}
                      onChange={(e) =>
                        setFormData({ ...formData, message: e.target.value })
                      }
                      placeholder="Please provide as much detail as possible..."
                      rows={8}
                      required
                      className="w-full px-4 py-2 border border-gray-200 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#00002B] focus:border-transparent resize-none"
                    />
                  </div>

                  <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                    <FileText size={16} />
                    <span>You can attach files after submitting this form</span>
                  </div>

                  <button
                    type="submit"
                    className="flex items-center gap-2 px-6 py-2 bg-[#00002B] text-white rounded-lg hover:bg-[#00002B]/90 transition-colors font-medium"
                  >
                    <Send size={20} />
                    Submit Request
                  </button>
                </form>
              </div>

              {/* FAQ Section */}
              <div className="mt-6 bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6 transition-colors">
                <h3 className="text-xl font-semibold text-[#00002B] dark:text-white mb-4">
                  Frequently Asked Questions
                </h3>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-medium text-gray-900 dark:text-white mb-2">
                      How do I update my profile information?
                    </h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      You can update your profile information from the Settings
                      page. Some information may require admin approval.
                    </p>
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900 dark:text-white mb-2">
                      How do I download my offer letter?
                    </h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      You can download your offer letter from the Job Offer
                      page. Click on the download button next to your offer
                      letter.
                    </p>
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900 dark:text-white mb-2">
                      Who can I contact for technical issues?
                    </h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      For technical issues, please submit a support request with
                      the category "Technical Issue" or contact our support team
                      directly.
                    </p>
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

export default Support;
