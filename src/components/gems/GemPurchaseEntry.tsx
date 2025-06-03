
import { useState } from "react";

export const GemPurchaseEntry = () => {
  const [formData, setFormData] = useState({
    gemType: "rough",
    description: "",
    quantity: "",
    weight: "",
    weightUnit: "carats",
    purchasePrice: "",
    sellerName: "",
    sellerContact: "",
    sourceType: "local",
    sourceLocation: "",
    paymentMethod: "cash",
    paymentStatus: "paid"
  });

  const [investors, setInvestors] = useState([
    { name: "", amount: "", ratio: "" }
  ]);

  const addInvestor = () => {
    setInvestors([...investors, { name: "", amount: "", ratio: "" }]);
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Add New Gem Purchase</h1>
        <nav className="text-sm text-gray-500 mt-1">
          Dashboard &gt; Gem Management &gt; Add Purchase
        </nav>
      </div>

      <form className="space-y-8">
        {/* Gem Information */}
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Gem Information</h2>
          
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium text-gray-700">Gem Type</label>
              <div className="mt-2 flex space-x-4">
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="gemType"
                    value="rough"
                    checked={formData.gemType === "rough"}
                    onChange={(e) => setFormData({...formData, gemType: e.target.value})}
                    className="mr-2"
                  />
                  Rough Gems
                </label>
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="gemType"
                    value="cut"
                    checked={formData.gemType === "cut"}
                    onChange={(e) => setFormData({...formData, gemType: e.target.value})}
                    className="mr-2"
                  />
                  Cut & Polished Gems
                </label>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Description</label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({...formData, description: e.target.value})}
                  rows={3}
                  className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-black focus:border-black"
                  placeholder="Detailed gem description..."
                />
              </div>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Quantity</label>
                  <input
                    type="number"
                    value={formData.quantity}
                    onChange={(e) => setFormData({...formData, quantity: e.target.value})}
                    className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-black focus:border-black"
                  />
                </div>
                
                <div className="flex space-x-2">
                  <div className="flex-1">
                    <label className="block text-sm font-medium text-gray-700">Weight</label>
                    <input
                      type="number"
                      step="0.1"
                      value={formData.weight}
                      onChange={(e) => setFormData({...formData, weight: e.target.value})}
                      className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-black focus:border-black"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Unit</label>
                    <select
                      value={formData.weightUnit}
                      onChange={(e) => setFormData({...formData, weightUnit: e.target.value})}
                      className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-black focus:border-black"
                    >
                      <option value="carats">Carats</option>
                      <option value="grams">Grams</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Purchase Price</label>
              <input
                type="number"
                value={formData.purchasePrice}
                onChange={(e) => setFormData({...formData, purchasePrice: e.target.value})}
                className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-black focus:border-black"
                placeholder="0.00"
              />
            </div>
          </div>
        </div>

        {/* Seller Information */}
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Seller Information</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Seller Name</label>
              <input
                type="text"
                value={formData.sellerName}
                onChange={(e) => setFormData({...formData, sellerName: e.target.value})}
                className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-black focus:border-black"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700">Contact Information</label>
              <input
                type="text"
                value={formData.sellerContact}
                onChange={(e) => setFormData({...formData, sellerContact: e.target.value})}
                className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-black focus:border-black"
                placeholder="Phone / Email"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700">Source Type</label>
              <select
                value={formData.sourceType}
                onChange={(e) => setFormData({...formData, sourceType: e.target.value})}
                className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-black focus:border-black"
              >
                <option value="local">Local Seller</option>
                <option value="mine">Mine Location</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700">Source Location</label>
              <input
                type="text"
                value={formData.sourceLocation}
                onChange={(e) => setFormData({...formData, sourceLocation: e.target.value})}
                className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-black focus:border-black"
              />
            </div>
          </div>
        </div>

        {/* Investor Allocation */}
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Investor Allocation</h2>
          
          <div className="space-y-4">
            {investors.map((investor, index) => (
              <div key={index} className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4 bg-gray-50 rounded-lg">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Investor Name</label>
                  <select className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-black focus:border-black">
                    <option value="">Select Investor</option>
                    <option value="investor1">John Investor</option>
                    <option value="investor2">Jane Capital</option>
                    <option value="investor3">ABC Fund</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700">Investment Amount</label>
                  <input
                    type="number"
                    className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-black focus:border-black"
                    placeholder="0.00"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700">Investment Ratio (%)</label>
                  <input
                    type="number"
                    max="100"
                    className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-black focus:border-black"
                    placeholder="0"
                  />
                </div>
              </div>
            ))}
            
            <button
              type="button"
              onClick={addInvestor}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
            >
              Add Investor
            </button>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex space-x-4">
          <button
            type="submit"
            className="px-6 py-3 bg-black text-white font-medium rounded-md hover:bg-gray-800 transition-colors"
          >
            Save Purchase
          </button>
          <button
            type="button"
            className="px-6 py-3 bg-white text-gray-700 font-medium border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
          >
            Save as Draft
          </button>
          <button
            type="button"
            className="px-6 py-3 bg-gray-100 text-gray-700 font-medium rounded-md hover:bg-gray-200 transition-colors"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};
