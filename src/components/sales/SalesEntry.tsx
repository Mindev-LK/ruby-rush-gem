
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Search, Upload, Calculator } from "lucide-react";
import { CurrencySelector } from "@/components/shared/CurrencySelector";
import { BuyerManager } from "@/components/shared/BuyerManager";

export const SalesEntry = () => {
  const [selectedGem, setSelectedGem] = useState(null);
  const [salePrice, setSalePrice] = useState("");
  const [saleCurrency, setSaleCurrency] = useState("USD");
  const [selectedBuyer, setSelectedBuyer] = useState("");
  const [buyerDetails, setBuyerDetails] = useState({});
  const [purchasePrice] = useState(12500);
  const [profit, setProfit] = useState(0);

  const availableGems = [
    { id: 1, type: "Ruby Rough", weight: "2.5 carats", price: 12500, description: "High quality ruby rough from Myanmar" },
    { id: 2, type: "Sapphire Cut", weight: "1.8 carats", price: 8900, description: "Blue sapphire, excellent cut" },
    { id: 3, type: "Emerald Rough", weight: "3.2 carats", price: 15600, description: "Colombian emerald rough" }
  ];

  const handleSalePriceChange = (value) => {
    setSalePrice(value);
    setProfit(value - purchasePrice);
  };

  const handleBuyerChange = (buyerId, buyerData) => {
    setSelectedBuyer(buyerId);
    if (buyerData) {
      setBuyerDetails(buyerData);
    }
  };

  const handleBuyerDetailsChange = (details) => {
    setBuyerDetails({ ...buyerDetails, ...details });
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Record New Sale</h1>
        <nav className="text-sm text-gray-500 mt-1">
          Dashboard &gt; Sales &gt; Add Sale
        </nav>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Gem Selection Section */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Search className="w-5 h-5 mr-2" />
              Select Gem to Sell
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="relative">
              <Input 
                placeholder="Search gems by type, description, or ID..."
                className="pr-10"
              />
              <Search className="absolute right-3 top-3 w-4 h-4 text-gray-400" />
            </div>

            <div className="space-y-3 max-h-60 overflow-y-auto">
              {availableGems.map((gem) => (
                <div 
                  key={gem.id}
                  onClick={() => setSelectedGem(gem)}
                  className={`p-3 border rounded-lg cursor-pointer transition-colors ${
                    selectedGem?.id === gem.id 
                      ? 'border-black bg-gray-50' 
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="font-medium text-gray-900">{gem.type}</p>
                      <p className="text-sm text-gray-500">{gem.weight}</p>
                      <p className="text-xs text-gray-400">{gem.description}</p>
                    </div>
                    <p className="font-semibold text-gray-900">${gem.price.toLocaleString()}</p>
                  </div>
                </div>
              ))}
            </div>

            {selectedGem && (
              <div className="p-4 bg-black text-white rounded-lg">
                <h4 className="font-medium">Selected Gem</h4>
                <p className="text-sm mt-1">{selectedGem.type} - {selectedGem.weight}</p>
                <p className="text-sm">Purchase Price: ${selectedGem.price.toLocaleString()}</p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Buyer Information Section */}
        <Card>
          <CardHeader>
            <CardTitle>Buyer Information</CardTitle>
          </CardHeader>
          <CardContent>
            <BuyerManager
              selectedBuyer={selectedBuyer}
              onBuyerChange={handleBuyerChange}
              onBuyerDetailsChange={handleBuyerDetailsChange}
            />
          </CardContent>
        </Card>
      </div>

      {/* Sale Details Section */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Calculator className="w-5 h-5 mr-2" />
            Sale Details
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div>
              <CurrencySelector
                value={saleCurrency}
                onChange={setSaleCurrency}
                label="Sale Currency"
              />
            </div>
            <div>
              <Label htmlFor="salePrice">Sale Price</Label>
              <Input 
                id="salePrice" 
                type="number"
                value={salePrice}
                onChange={(e) => handleSalePriceChange(e.target.value)}
                placeholder="0.00" 
              />
            </div>
            <div>
              <Label htmlFor="saleDate">Sale Date</Label>
              <Input id="saleDate" type="date" />
            </div>
            <div>
              <Label htmlFor="paymentMethod">Payment Method</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select method..." />
                </SelectTrigger>
                <SelectContent className="bg-white border shadow-lg z-50">
                  <SelectItem value="cash">Cash</SelectItem>
                  <SelectItem value="cheque">Cheque</SelectItem>
                  <SelectItem value="bank-transfer">Bank Transfer</SelectItem>
                  <SelectItem value="credit">Credit Terms</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
            <div>
              <Label htmlFor="paymentStatus">Payment Status</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select status..." />
                </SelectTrigger>
                <SelectContent className="bg-white border shadow-lg z-50">
                  <SelectItem value="paid">Paid</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="partial">Partial</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {salePrice && (
            <div className="mt-6 p-4 bg-gray-50 rounded-lg">
              <h4 className="font-medium text-gray-900 mb-2">Profit Calculation</h4>
              <div className="grid grid-cols-3 gap-4 text-sm">
                <div>
                  <span className="text-gray-600">Purchase Price:</span>
                  <p className="font-semibold">${purchasePrice.toLocaleString()}</p>
                </div>
                <div>
                  <span className="text-gray-600">Sale Price:</span>
                  <p className="font-semibold">${Number(salePrice).toLocaleString()} {saleCurrency}</p>
                </div>
                <div>
                  <span className="text-gray-600">Profit:</span>
                  <p className={`font-semibold ${profit >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                    ${profit.toLocaleString()}
                  </p>
                </div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Documentation Section */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Upload className="w-5 h-5 mr-2" />
            Documentation
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label>Sale Invoice</Label>
            <div className="mt-2 border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
              <Upload className="mx-auto h-12 w-12 text-gray-400" />
              <p className="mt-2 text-sm text-gray-600">Drop files here or click to upload</p>
              <p className="text-xs text-gray-500">PDF, DOC, JPG up to 10MB</p>
            </div>
          </div>

          <div>
            <Label htmlFor="saleNotes">Sale Notes</Label>
            <Textarea 
              id="saleNotes" 
              placeholder="Additional notes about this sale..."
              rows={3}
            />
          </div>
        </CardContent>
      </Card>

      {/* Action Buttons */}
      <div className="flex justify-end space-x-4">
        <Button variant="outline">Cancel</Button>
        <Button variant="outline">Save as Draft</Button>
        <Button className="bg-black text-white hover:bg-gray-800">
          Complete Sale
        </Button>
      </div>
    </div>
  );
};
