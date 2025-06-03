
import { 
  grid_2x2 as Grid, 
  plus as Plus, 
  folder as Folder, 
  user as User,
  settings as Settings,
  bell as Bell
} from "lucide-react";

interface SidebarProps {
  collapsed: boolean;
  currentPage: string;
  onPageChange: (page: string) => void;
  userRole: string;
}

export const Sidebar = ({ collapsed, currentPage, onPageChange, userRole }: SidebarProps) => {
  const menuItems = [
    { id: "dashboard", label: "Dashboard", icon: Grid },
    { 
      id: "gems", 
      label: "Gem Management", 
      icon: Plus,
      submenu: [
        { id: "gem-purchase", label: "Add Purchase" },
        { id: "inventory", label: "Inventory" }
      ]
    },
    { 
      id: "sales", 
      label: "Sales", 
      icon: Folder,
      submenu: [
        { id: "sales-entry", label: "Record Sale" },
        { id: "sales-management", label: "Manage Sales" }
      ]
    },
    { 
      id: "investors", 
      label: "Investors", 
      icon: User,
      submenu: [
        { id: "investor-management", label: "Manage Investors" },
        { id: "investment-tracking", label: "Track Investments" }
      ]
    },
    { 
      id: "accounts", 
      label: "Accounts", 
      icon: Folder,
      submenu: [
        { id: "accounts-receivable", label: "Receivables" },
        { id: "accounts-payable", label: "Payables" },
        { id: "cheque-management", label: "Cheques" }
      ]
    },
    { 
      id: "reports", 
      label: "Reports", 
      icon: Grid,
      submenu: [
        { id: "financial-reports", label: "Financial Reports" },
        { id: "analytics", label: "Analytics" }
      ]
    }
  ];

  if (userRole === "Super Admin") {
    menuItems.push(
      { id: "user-management", label: "User Management", icon: User },
      { id: "settings", label: "Settings", icon: Settings }
    );
  }

  menuItems.push({ id: "notifications", label: "Notifications", icon: Bell });

  return (
    <div className={`fixed left-0 top-0 h-full bg-gray-900 text-white transition-all duration-300 z-30 ${
      collapsed ? 'w-16' : 'w-64'
    }`}>
      <div className="p-4 border-b border-gray-700">
        <div className="flex items-center">
          <div className="w-8 h-8 bg-white rounded flex items-center justify-center">
            <span className="text-gray-900 font-bold text-sm">ABC</span>
          </div>
          {!collapsed && (
            <div className="ml-3">
              <h1 className="text-lg font-bold">ABC Gems</h1>
              <p className="text-xs text-gray-400">Trading System</p>
            </div>
          )}
        </div>
      </div>

      <nav className="mt-4">
        {menuItems.map((item) => (
          <div key={item.id}>
            <button
              onClick={() => item.submenu ? null : onPageChange(item.id)}
              className={`w-full flex items-center px-4 py-3 text-left hover:bg-gray-800 transition-colors ${
                currentPage === item.id ? 'bg-gray-800 border-r-2 border-white' : ''
              }`}
            >
              <item.icon className="w-5 h-5" />
              {!collapsed && <span className="ml-3">{item.label}</span>}
            </button>
            
            {item.submenu && !collapsed && (
              <div className="ml-8">
                {item.submenu.map((subItem) => (
                  <button
                    key={subItem.id}
                    onClick={() => onPageChange(subItem.id)}
                    className={`w-full text-left py-2 px-4 text-sm hover:bg-gray-800 transition-colors ${
                      currentPage === subItem.id ? 'text-white bg-gray-800' : 'text-gray-300'
                    }`}
                  >
                    {subItem.label}
                  </button>
                ))}
              </div>
            )}
          </div>
        ))}
      </nav>
    </div>
  );
};
