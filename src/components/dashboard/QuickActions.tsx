
export const QuickActions = () => {
  const actions = [
    { label: "Add New Purchase", icon: "💎" },
    { label: "Record Sale", icon: "💰" },
    { label: "Generate Report", icon: "📊" },
    { label: "View Inventory", icon: "📦" }
  ];

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
      <h2 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h2>
      <div className="space-y-3">
        {actions.map((action, index) => (
          <button
            key={index}
            className="w-full flex items-center p-3 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors"
          >
            <span className="text-lg mr-3">{action.icon}</span>
            <span className="font-medium">{action.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
};
