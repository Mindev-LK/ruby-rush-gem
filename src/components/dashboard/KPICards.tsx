
export const KPICards = () => {
  const kpis = [
    {
      title: "Total Purchases",
      value: "$2,847,500",
      subtitle: "234 transactions",
      trend: "+12.5%",
      trendUp: true
    },
    {
      title: "Total Sales",
      value: "$3,425,800",
      subtitle: "187 transactions",
      trend: "+18.3%",
      trendUp: true
    },
    {
      title: "Current Profit",
      value: "$578,300",
      subtitle: "20.3% margin",
      trend: "+5.7%",
      trendUp: true
    },
    {
      title: "Active Investments",
      value: "$1,234,500",
      subtitle: "15 investors",
      trend: "+2.1%",
      trendUp: true
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {kpis.map((kpi, index) => (
        <div key={index} className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">{kpi.title}</p>
              <p className="text-2xl font-bold text-gray-900 mt-1">{kpi.value}</p>
              <p className="text-xs text-gray-500 mt-1">{kpi.subtitle}</p>
            </div>
            <div className={`flex items-center text-sm font-medium ${
              kpi.trendUp ? 'text-green-600' : 'text-red-600'
            }`}>
              <span className="mr-1">{kpi.trendUp ? '↗' : '↘'}</span>
              {kpi.trend}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
