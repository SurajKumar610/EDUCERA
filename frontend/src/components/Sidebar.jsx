import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { getCurrentUser, logout } from '../services/api';
import { LayoutDashboard, CheckSquare, CalendarDays, ScrollText, User, LogOut, ChevronLeft, ChevronRight } from 'lucide-react';

const navItems = [
  { path: '/dashboard', label: 'Dashboard', icon: <LayoutDashboard className="w-5 h-5" /> },
  { path: '/tasks', label: 'Tasks', icon: <CheckSquare className="w-5 h-5" /> },
  { path: '/attendance', label: 'Attendance', icon: <CalendarDays className="w-5 h-5" /> },
  { path: '/notes', label: 'AI Notes', icon: <ScrollText className="w-5 h-5" /> },
  { path: '/profile', label: 'Profile', icon: <User className="w-5 h-5" /> },
];

export default function Sidebar({ isMobileOpen, onCloseMobile }) {
  const location = useLocation();
  const navigate = useNavigate();
  const user = getCurrentUser();
  const [isCollapsed, setIsCollapsed] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const getInitials = (name) => {
    return name?.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2) || 'ED';
  };

  return (
    <>
      {/* Mobile overlay */}
      {isMobileOpen && (
        <div
          className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40 lg:hidden transition-opacity"
          onClick={onCloseMobile}
        />
      )}

      <aside className={`
        fixed top-0 left-0 h-full z-50
        ${isCollapsed ? 'w-22' : 'w-72'}
        bg-white/80 backdrop-blur-xl border-r border-white/60
        flex flex-col
        transition-all duration-300 cubic-bezier(0.4, 0, 0.2, 1)
        lg:translate-x-0
        ${isMobileOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
        shadow-xl lg:shadow-none
      `}>
        {/* Logo & Brand */}
        <div className="p-6 pb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary-500 to-accent-500 flex items-center justify-center
                          shadow-lg shadow-primary-500/30 flex-shrink-0">
              <span className="text-white text-lg font-bold">E</span>
            </div>
            {!isCollapsed && (
              <div className="animate-fade-in whitespace-nowrap overflow-hidden">
                <h1 className="text-xl font-extrabold font-display gradient-text tracking-tight">
                  EDUCERA
                </h1>
                <p className="text-[10px] text-dark-400 font-medium tracking-widest uppercase">
                  Your Full Time Batchie
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Nav Links */}
        <nav className="flex-1 px-4 space-y-2 mt-4">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.path}
                to={item.path}
                onClick={onCloseMobile}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-all duration-300 group relative overflow-hidden
                  ${isActive 
                    ? 'text-white shadow-md shadow-primary-500/25 bg-gradient-to-r from-primary-500 to-primary-600' 
                    : 'text-dark-500 hover:bg-dark-50/80 hover:text-primary-600'}
                  ${isCollapsed ? 'justify-center border border-transparent hover:border-dark-100' : ''}
                `}
                title={isCollapsed ? item.label : undefined}
              >
                {isActive && !isCollapsed && (
                  <div className="absolute left-0 top-0 bottom-0 w-1 bg-white/30 rounded-r-md" />
                )}
                <span className={`flex-shrink-0 transition-transform duration-300 ${!isActive && 'group-hover:scale-110'}`}>
                  {item.icon}
                </span>
                
                {!isCollapsed && (
                  <span className="text-sm tracking-wide">{item.label}</span>
                )}
              </Link>
            );
          })}
        </nav>

        {/* Collapse toggle - desktop only */}
        <div className="hidden lg:block px-4 mb-2">
          <button
            onClick={() => setIsCollapsed(!isCollapsed)}
            className={`w-full flex items-center gap-2 py-2.5 rounded-xl text-dark-400 hover:bg-dark-50/80 
                     transition-all duration-200 text-sm font-medium border border-transparent hover:border-dark-100
                     ${isCollapsed ? 'justify-center px-0' : 'justify-center px-4'}`}
            title="Toggle Sidebar"
          >
            {isCollapsed ? <ChevronRight className="w-5 h-5" /> : <ChevronLeft className="w-5 h-5" />}
            {!isCollapsed && <span>Collapse</span>}
          </button>
        </div>

        {/* User Profile */}
        <div className="p-4 mx-4 mb-4 rounded-2xl bg-white/60 border border-white shadow-sm transition-all duration-300 hover:shadow-md">
          <div className={`flex items-center ${isCollapsed ? 'justify-center flex-col gap-2' : 'gap-3'}`}>
            <div
              className={`w-10 h-10 rounded-xl flex items-center justify-center text-white text-sm font-bold flex-shrink-0 shadow-inner`}
              style={{ backgroundColor: user?.avatar_color || '#6C63FF' }}
            >
              {getInitials(user?.name)}
            </div>
            
            {!isCollapsed && (
              <div className="flex-1 min-w-0 animate-fade-in">
                <p className="text-sm font-bold text-dark-800 truncate font-display tracking-tight">
                  {user?.name || 'Student'}
                </p>
                <p className="text-xs font-medium text-dark-400 truncate">
                  {user?.level === 'college' ? '🎓 College' : '🏫 School'}
                </p>
              </div>
            )}
            
            <button
              onClick={handleLogout}
              className={`p-2 rounded-xl text-dark-400 hover:text-red-500 hover:bg-red-50 transition-all duration-200 
                ${isCollapsed ? 'w-full flex justify-center mt-2' : ''}`}
              title="Logout"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>
      </aside>
    </>
  );
}