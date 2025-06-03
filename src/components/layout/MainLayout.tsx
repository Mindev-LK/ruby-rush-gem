
import { useState } from "react";
import { Sidebar } from "./Sidebar";
import { Header } from "./Header";

interface MainLayoutProps {
  children: React.ReactNode;
  currentUser: {
    name: string;
    role: string;
    email: string;
  };
  onLogout: () => void;
  currentPage: string;
  onPageChange: (page: string) => void;
}

export const MainLayout = ({ children, currentUser, onLogout, currentPage, onPageChange }: MainLayoutProps) => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50 flex w-full">
      <Sidebar
        collapsed={sidebarCollapsed}
        currentPage={currentPage}
        onPageChange={onPageChange}
        userRole={currentUser.role}
      />
      <div className={`flex-1 flex flex-col transition-all duration-300 ${sidebarCollapsed ? 'ml-16' : 'ml-64'}`}>
        <Header
          currentUser={currentUser}
          onLogout={onLogout}
          onToggleSidebar={() => setSidebarCollapsed(!sidebarCollapsed)}
          sidebarCollapsed={sidebarCollapsed}
        />
        <main className="flex-1 p-6">
          {children}
        </main>
      </div>
    </div>
  );
};
