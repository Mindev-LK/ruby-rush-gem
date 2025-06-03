import { useState } from "react";
import { MainLayout } from "@/components/layout/MainLayout";
import { LoginPage } from "@/components/auth/LoginPage";
import { Dashboard } from "@/components/dashboard/Dashboard";
import { GemPurchaseEntry } from "@/components/gems/GemPurchaseEntry";
import { InventoryManagement } from "@/components/inventory/InventoryManagement";
import { SalesEntry } from "@/components/sales/SalesEntry";
import { SalesManagement } from "@/components/sales/SalesManagement";
import { InvestorManagement } from "@/components/investors/InvestorManagement";
import { InvestmentTracking } from "@/components/investments/InvestmentTracking";
import { AccountsReceivable } from "@/components/accounts/AccountsReceivable";
import { AccountsPayable } from "@/components/accounts/AccountsPayable";
import { ChequeManagement } from "@/components/cheques/ChequeManagement";
import { FinancialReports } from "@/components/reports/FinancialReports";
import { AnalyticsDashboard } from "@/components/analytics/AnalyticsDashboard";
import { UserManagement } from "@/components/admin/UserManagement";
import { SystemSettings } from "@/components/settings/SystemSettings";
import { DataBackupSecurity } from "@/components/admin/DataBackupSecurity";
import { NotificationsCenter } from "@/components/notifications/NotificationsCenter";

const Index = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentPage, setCurrentPage] = useState("dashboard");
  const [currentUser, setCurrentUser] = useState({
    name: "John Smith",
    role: "Super Admin",
    email: "john.smith@abcgems.com"
  });

  const handleLogin = (username: string, password: string) => {
    // Simple authentication logic
    if (username && password) {
      setIsAuthenticated(true);
      setCurrentUser({
        name: username === "admin" ? "John Smith" : "Jane Doe",
        role: username === "admin" ? "Super Admin" : "Operations Staff",
        email: username === "admin" ? "john.smith@abcgems.com" : "jane.doe@abcgems.com"
      });
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setCurrentPage("dashboard");
  };

  const renderCurrentPage = () => {
    switch (currentPage) {
      case "dashboard":
        return <Dashboard />;
      case "gem-purchase":
        return <GemPurchaseEntry />;
      case "inventory":
        return <InventoryManagement />;
      case "sales-entry":
        return <SalesEntry />;
      case "sales-management":
        return <SalesManagement />;
      case "investor-management":
        return <InvestorManagement />;
      case "investment-tracking":
        return <InvestmentTracking />;
      case "accounts-receivable":
        return <AccountsReceivable />;
      case "accounts-payable":
        return <AccountsPayable />;
      case "cheque-management":
        return <ChequeManagement />;
      case "financial-reports":
        return <FinancialReports />;
      case "analytics":
        return <AnalyticsDashboard />;
      case "user-management":
        return <UserManagement />;
      case "settings":
        return <SystemSettings />;
      case "data-backup-security":
        return <DataBackupSecurity />;
      case "notifications":
        return <NotificationsCenter />;
      default:
        return <Dashboard />;
    }
  };

  if (!isAuthenticated) {
    return <LoginPage onLogin={handleLogin} />;
  }

  return (
    <MainLayout
      currentUser={currentUser}
      onLogout={handleLogout}
      currentPage={currentPage}
      onPageChange={setCurrentPage}
    >
      {renderCurrentPage()}
    </MainLayout>
  );
};

export default Index;
