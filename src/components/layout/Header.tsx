import { Bell, User, Settings } from "lucide-react";

interface HeaderProps {
  currentUser: {
    name: string;
    role: string;
    email: string;
  };
  onLogout: () => void;
  onToggleSidebar: () => void;
  sidebarCollapsed: boolean;
}

export const Header = ({ currentUser, onLogout, onToggleSidebar, sidebarCollapsed }: HeaderProps) => {
  const currentTime = new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  return (
    <header className="bg-white border-b border-gray-200 px-6 py-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <button
            onClick={onToggleSidebar}
            className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
          >
            <div className="w-5 h-5 flex flex-col justify-center">
              <div className="w-full h-0.5 bg-gray-600 mb-1"></div>
              <div className="w-full h-0.5 bg-gray-600 mb-1"></div>
              <div className="w-full h-0.5 bg-gray-600"></div>
            </div>
          </button>
          <div className="ml-4">
            <h1 className="text-xl font-semibold text-gray-900">Welcome back, {currentUser.name}</h1>
            <p className="text-sm text-gray-500">{currentTime}</p>
          </div>
        </div>

        <div className="flex items-center space-x-4">
          <button className="p-2 rounded-lg hover:bg-gray-100 transition-colors relative">
            <Bell className="w-5 h-5 text-gray-600" />
            <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></span>
          </button>
          
          <div className="flex items-center space-x-3">
            <div className="text-right">
              <p className="text-sm font-medium text-gray-900">{currentUser.name}</p>
              <p className="text-xs text-gray-500">{currentUser.role}</p>
            </div>
            <div className="w-8 h-8 bg-gray-900 rounded-full flex items-center justify-center">
              <User className="w-4 h-4 text-white" />
            </div>
            <button
              onClick={onLogout}
              className="text-sm text-gray-500 hover:text-gray-700 transition-colors"
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};
