import { Menu } from 'lucide-react';
import { useSidebar } from '../contexts/SidebarContext';

interface HeaderProps {
  userName?: string;
  userEmail?: string;
}

const Header = ({
  userName = 'Daniel Anyanwu',
  userEmail = 'danielanyanwu22@gmail.com',
}: HeaderProps) => {
  const { toggleSidebar } = useSidebar();

  // Helper function to get initials from full name
  const getInitial = (): string => {
    if (!userName || userName.trim() === '') return 'U';
    const nameParts = userName.trim().split(/\s+/);
    if (nameParts.length >= 2) {
      // First letter of first name + first letter of last name
      return (
        nameParts[0].charAt(0).toUpperCase() +
        nameParts[nameParts.length - 1].charAt(0).toUpperCase()
      );
    } else if (nameParts.length === 1) {
      // Only one name, return first letter
      return nameParts[0].charAt(0).toUpperCase();
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

  return (
    <header className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 px-6 py-4 flex items-center justify-between transition-colors">
      <div className="flex items-center gap-4">
        <button
          onClick={toggleSidebar}
          className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
        >
          <Menu size={24} className="text-[#00002B] dark:text-white" />
        </button>
        <h1 className="text-xl font-bold text-[#00002B] dark:text-white">
          Candiate Portal
        </h1>
      </div>

      <div className="flex items-center gap-4">
        {/* User Profile */}
        <div className="flex items-center gap-3 pl-4 border-l border-gray-200 dark:border-gray-700">
          <div
            className={`w-10 h-10 rounded-full flex items-center justify-center text-white text-sm font-bold ${getAvatarColor()}`}
          >
            {getInitial()}
          </div>
          <div className="flex flex-col">
            <span className="text-sm font-semibold text-[#00002B] dark:text-white">
              {userName}
            </span>
            <span className="text-xs text-gray-500 dark:text-gray-400">
              {userEmail}
            </span>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
