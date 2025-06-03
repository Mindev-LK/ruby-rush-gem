
export const RecentActivity = () => {
  const recentPurchases = [
    { id: "P001", gem: "Ruby Rough", weight: "2.5 carats", price: "$12,500", date: "2024-06-01" },
    { id: "P002", gem: "Sapphire Cut", weight: "1.8 carats", price: "$8,900", date: "2024-06-01" },
    { id: "P003", gem: "Emerald Rough", weight: "3.2 carats", price: "$15,600", date: "2024-05-31" }
  ];

  const recentSales = [
    { id: "S001", gem: "Diamond Cut", buyer: "International Gems Ltd", price: "$25,400", date: "2024-06-02" },
    { id: "S002", gem: "Ruby Cut", buyer: "Luxury Jewelry Co", price: "$18,700", date: "2024-06-01" },
    { id: "S003", gem: "Sapphire Rough", buyer: "Premium Stones Inc", price: "$9,800", date: "2024-06-01" }
  ];

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200">
      <div className="p-6 border-b border-gray-200">
        <h2 className="text-lg font-semibold text-gray-900">Recent Activity</h2>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 divide-x divide-gray-200">
        <div className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-medium text-gray-900">Recent Purchases</h3>
            <button className="text-xs text-gray-600 hover:text-black">View All</button>
          </div>
          <div className="space-y-3">
            {recentPurchases.map((purchase) => (
              <div key={purchase.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div>
                  <p className="text-sm font-medium text-gray-900">{purchase.gem}</p>
                  <p className="text-xs text-gray-500">{purchase.weight} • {purchase.date}</p>
                </div>
                <p className="text-sm font-semibold text-gray-900">{purchase.price}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-medium text-gray-900">Recent Sales</h3>
            <button className="text-xs text-gray-600 hover:text-black">View All</button>
          </div>
          <div className="space-y-3">
            {recentSales.map((sale) => (
              <div key={sale.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div>
                  <p className="text-sm font-medium text-gray-900">{sale.gem}</p>
                  <p className="text-xs text-gray-500">{sale.buyer} • {sale.date}</p>
                </div>
                <p className="text-sm font-semibold text-gray-900">{sale.price}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
