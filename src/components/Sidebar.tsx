import { useNavigate, useLocation } from 'react-router-dom';
import { useAppDispatch } from '../store/hooks';
import { logout } from '../store/authSlice';
import { persistor } from '../store/store';
import { useSidebar } from '../contexts/SidebarContext';
import {
  LayoutDashboard,
  Briefcase,
  Users,
  Settings,
  HelpCircle,
  LogOut,
} from 'lucide-react';
import logo from '../assets/logo.png';

interface NavItem {
  name: string;
  icon: React.ElementType;
  path: string;
}

const navItems: NavItem[] = [
  { name: 'Dashboard', icon: LayoutDashboard, path: '/dashboard' },
  { name: 'Job Offer', icon: Briefcase, path: '/job-offer' },
  { name: 'Teams', icon: Users, path: '/teams' },
  { name: 'Settings', icon: Settings, path: '/settings' },
  { name: 'Support', icon: HelpCircle, path: '/support' },
];

const Sidebar = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const location = useLocation();
  const { isCollapsed } = useSidebar();

  const handleLogout = async () => {
    dispatch(logout());
    // Purge persisted state from localStorage
    await persistor.purge();
    navigate('/');
  };

  return (
    <div
      className={`bg-white min-h-screen flex flex-col border-r border-gray-200 transition-all duration-300 ${
        isCollapsed ? 'w-20' : 'w-64'
      }`}
    >
      {/* Logo */}
      <div className={`border-b border-gray-200 transition-all duration-300 ${
        isCollapsed ? 'p-4' : 'p-6'
      }`}>
        {isCollapsed ? (
          <img src={logo} alt="kylianerp logo" className="h-8 w-8 mx-auto" />
        ) : (
          <img src={logo} alt="kylianerp logo" className="h-8 w-auto" />
        )}
      </div>

      {/* Navigation Items */}
      <nav className="flex-1 py-4">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.path;
          return (
            <button
              key={item.path}
              onClick={() => navigate(item.path)}
              title={isCollapsed ? item.name : ''}
              className={`w-full flex items-center transition-all duration-300 ${
                isCollapsed
                  ? 'justify-center px-0 py-3'
                  : 'gap-3 px-6 py-3'
              } ${
                isActive
                  ? 'bg-[#00002B] text-white border-l-4 border-[#00002B]'
                  : 'text-[#00002B] hover:bg-gray-100'
              }`}
            >
              <Icon size={20} />
              {!isCollapsed && (
                <span className="font-medium">{item.name}</span>
              )}
            </button>
          );
        })}
      </nav>

      {/* Logout */}
      <div className={`border-t border-gray-200 transition-all duration-300 ${
        isCollapsed ? 'p-2' : 'p-4'
      }`}>
        <button
          onClick={handleLogout}
          title={isCollapsed ? 'Logout' : ''}
          className={`w-full flex items-center transition-all duration-300 ${
            isCollapsed
              ? 'justify-center px-0 py-3'
              : 'gap-3 px-6 py-3'
          } text-[#00002B] hover:bg-gray-100 transition-colors rounded`}
        >
          <LogOut size={20} />
          {!isCollapsed && <span className="font-medium">Logout</span>}
        </button>
      </div>
    </div>
  );
};

export default Sidebar;

