
import { useState } from "react";

export const InventoryManagement = () => {
  const [showFilters, setShowFilters] = useState(false);
  
  const gems = [
    {
      id: "G001",
      image: "/placeholder.svg",
      type: "Ruby Rough",
      description: "High quality ruby rough from Myanmar",
      quantity: 1,
      weight: "2.5 carats",
      price: "$12,500",
      source: "Myanmar",
      date: "2024-06-01",
      status: "available",
      investors: ["John I.", "Jane C."]
    },
    {
      id: "G002", 
      image: "/placeholder.svg",
      type: "Sapphire Cut",
      description: "Premium blue sapphire, expertly cut",
      quantity: 1,
      weight: "1.8 carats", 
      price: "$8,900",
      source: "Sri Lanka",
      date: "2024-06-01",
      status: "sold",
      investors: ["ABC Fund"]
    },
    {
      id: "G003",
      image: "/placeholder.svg", 
      type: "Emerald Rough",
      description: "Natural emerald rough, good clarity",
      quantity: 2,
      weight: "3.2 carats",
      price: "$15,600", 
      source: "Colombia",
      date: "2024-05-31",
      status: "reserved",
      investors: ["John I.", "Premium Ltd"]
    }
  ];

  const statusColors = {
    available: "bg-green-100 text-green-800",
    sold: "bg-gray-100 text-gray-800", 
    reserved: "bg-yellow-100 text-yellow-800"
  };

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Gem Inventory</h1>
        <nav className="text-sm text-gray-500 mt-1">
          Dashboard &gt; Inventory Management
        </nav>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
        <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
          <p className="text-sm text-gray-600">Total Gems</p>
          <p className="text-2xl font-bold text-gray-900">234</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
          <p className="text-sm text-gray-600">Available</p>
          <p className="text-2xl font-bold text-green-600">187</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
          <p className="text-sm text-gray-600">Sold</p>
          <p className="text-2xl font-bold text-gray-600">35</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
          <p className="text-sm text-gray-600">Total Value</p>
          <p className="text-2xl font-bold text-gray-900">$2.8M</p>
        </div>
      </div>

      {/* Filter Panel */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 mb-6">
        <div className="p-4 border-b border-gray-200">
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center text-sm font-medium text-gray-700"
          >
            Filters {showFilters ? '▼' : '▶'}
          </button>
        </div>
        
        {showFilters && (
          <div className="p-4 grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Gem Type</label>
              <select className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2">
                <option>All Types</option>
                <option>Rough Gems</option>
                <option>Cut & Polished</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Status</label>
              <select className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2">
                <option>All Status</option>
                <option>Available</option>
                <option>Sold</option>
                <option>Reserved</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Price Range</label>
              <div className="flex space-x-2">
                <input type="number" placeholder="Min" className="flex-1 border border-gray-300 rounded-md px-2 py-2 text-sm" />
                <input type="number" placeholder="Max" className="flex-1 border border-gray-300 rounded-md px-2 py-2 text-sm" />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Source Location</label>
              <input type="text" placeholder="Search location..." className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2" />
            </div>
          </div>
        )}
      </div>

      {/* Gems Table */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  <input type="checkbox" className="rounded" />
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Gem
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Details
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Price
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Source
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Investors
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {gems.map((gem) => (
                <tr key={gem.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <input type="checkbox" className="rounded" />
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="h-10 w-10 flex-shrink-0">
                        <img className="h-10 w-10 rounded-md object-cover" src={gem.image} alt="" />
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">{gem.type}</div>
                        <div className="text-sm text-gray-500">{gem.id}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-gray-900">{gem.description}</div>
                    <div className="text-sm text-gray-500">{gem.quantity} pc • {gem.weight}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{gem.price}</div>
                    <div className="text-sm text-gray-500">{gem.date}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {gem.source}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${statusColors[gem.status as keyof typeof statusColors]}`}>
                      {gem.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {gem.investors.join(", ")}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <div className="flex space-x-2">
                      <button className="text-gray-600 hover:text-black">View</button>
                      <button className="text-gray-600 hover:text-black">Edit</button>
                      <button className="text-red-600 hover:text-red-800">Delete</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        <div className="px-6 py-3 border-t border-gray-200 flex items-center justify-between">
          <div className="text-sm text-gray-500">
            Showing 1 to 3 of 234 results
          </div>
          <div className="flex space-x-2">
            <button className="px-3 py-1 border border-gray-300 rounded text-sm hover:bg-gray-50">Previous</button>
            <button className="px-3 py-1 bg-black text-white rounded text-sm">1</button>
            <button className="px-3 py-1 border border-gray-300 rounded text-sm hover:bg-gray-50">2</button>
            <button className="px-3 py-1 border border-gray-300 rounded text-sm hover:bg-gray-50">Next</button>
          </div>
        </div>
      </div>
    </div>
  );
};
