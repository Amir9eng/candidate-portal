import { useNavigate, useLocation } from 'react-router-dom';
import { useAppDispatch } from '../store/hooks';
import { logout } from '../store/authSlice';
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

  const handleLogout = () => {
    dispatch(logout());
    navigate('/');
  };

  return (
    <div className="w-64 bg-white min-h-screen flex flex-col border-r border-gray-200">
      {/* Logo */}
      <div className="p-6 border-b border-gray-200">
        <img src={logo} alt="kylianerp logo" className="h-8 w-auto" />
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
              className={`w-full flex items-center gap-3 px-6 py-3 transition-colors ${
                isActive
                  ? 'bg-[#00002B] text-white border-l-4 border-[#00002B]'
                  : 'text-[#00002B] hover:bg-gray-100'
              }`}
            >
              <Icon size={20} />
              <span className="font-medium">{item.name}</span>
            </button>
          );
        })}
      </nav>

      {/* Logout */}
      <div className="p-4 border-t border-gray-200">
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-6 py-3 text-[#00002B] hover:bg-gray-100 transition-colors rounded"
        >
          <LogOut size={20} />
          <span className="font-medium">Logout</span>
        </button>
      </div>
    </div>
  );
};

export default Sidebar;

