
import { KPICards } from "./KPICards";
import { AlertSection } from "./AlertSection";
import { RecentActivity } from "./RecentActivity";
import { QuickActions } from "./QuickActions";
import { PayablesTracker } from "./PayablesTracker";

export const Dashboard = () => {
  return (
    <div className="space-y-6">
      <KPICards />
      <AlertSection />
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        <div className="xl:col-span-2">
          <RecentActivity />
        </div>
        <div className="space-y-6">
          <QuickActions />
          <PayablesTracker />
        </div>
      </div>
    </div>
  );
};
