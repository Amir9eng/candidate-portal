import { Menu } from 'lucide-react';
import { useSidebar } from '../contexts/SidebarContext';
import avatar from '../assets/avatar.png';

interface HeaderProps {
  userName?: string;
  userEmail?: string;
}

const Header = ({
  userName = 'Daniel Anyanwu',
  userEmail = 'danielanyanwu22@gmail.com',
}: HeaderProps) => {
  const { toggleSidebar } = useSidebar();

  return (
    <header className="bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
      <div className="flex items-center gap-4">
        <button
          onClick={toggleSidebar}
          className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
        >
          <Menu size={24} className="text-[#00002B]" />
        </button>
        <h1 className="text-xl font-bold text-[#00002B]">Candiate Portal</h1>
      </div>

      <div className="flex items-center gap-4">
        {/* User Profile */}
        <div className="flex items-center gap-3 pl-4 border-l border-gray-200">
          <img
            src={avatar}
            alt="User avatar"
            className="w-10 h-10 rounded-full object-cover"
          />
          <div className="flex flex-col">
            <span className="text-sm font-semibold text-[#00002B]">
              {userName}
            </span>
            <span className="text-xs text-gray-500">{userEmail}</span>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
