
export const AlertSection = () => {
  const alerts = [
    {
      type: "Outstanding Receivables",
      amount: "$125,400",
      color: "red",
      count: "12 overdue"
    },
    {
      type: "Pending Payables",
      amount: "$89,200",
      color: "yellow",
      count: "8 due soon"
    },
    {
      type: "Cheques Due",
      amount: "$45,600",
      color: "yellow",
      count: "5 pending"
    },
    {
      type: "Credit Purchases",
      amount: "$67,800",
      color: "red",
      count: "3 overdue"
    }
  ];

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
      <h2 className="text-lg font-semibold text-gray-900 mb-4">Alerts & Notifications</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {alerts.map((alert, index) => (
          <div key={index} className="flex items-center p-3 bg-gray-50 rounded-lg">
            <div className={`w-3 h-3 rounded-full mr-3 ${
              alert.color === 'red' ? 'bg-red-500' : 'bg-yellow-500'
            }`}></div>
            <div className="flex-1">
              <p className="text-sm font-medium text-gray-900">{alert.type}</p>
              <p className="text-lg font-bold text-gray-900">{alert.amount}</p>
              <p className="text-xs text-gray-500">{alert.count}</p>
            </div>
            <button className="text-xs text-gray-600 hover:text-black">View</button>
          </div>
        ))}
      </div>
    </div>
  );
};
