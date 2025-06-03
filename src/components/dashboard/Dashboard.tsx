
import { KPICards } from "./KPICards";
import { AlertSection } from "./AlertSection";
import { RecentActivity } from "./RecentActivity";
import { QuickActions } from "./QuickActions";

export const Dashboard = () => {
  return (
    <div className="space-y-6">
      <KPICards />
      <AlertSection />
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        <div className="xl:col-span-2">
          <RecentActivity />
        </div>
        <div>
          <QuickActions />
        </div>
      </div>
    </div>
  );
};
