
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CurrencySelector } from "@/components/shared/CurrencySelector";
import { MediaUpload } from "@/components/shared/MediaUpload";
import { Calendar, CreditCard, Receipt, Banknote } from "lucide-react";

export const GemPurchaseEntry = () => {
  const [formData, setFormData] = useState({
    gemType: "rough",
    description: "",
    quantity: "",
    weight: "",
    weightUnit: "carats",
    purchasePrice: "",
    currency: "USD",
    sellerName: "",
    sellerContact: "",
    sourceType: "local",
    sourceLocation: "",
    paymentMethod: "cash",
    paymentStatus: "paid"
  });

  const [paymentDetails, setPaymentDetails] = useState({
    chequeNumber: "",
    bankName: "",
    chequeDate: "",
    chequeAmount: "",
    accountHolder: "",
    bankBranch: "",
    receiptDueDate: "",
    creditTerms: "30",
    customTerms: ""
  });

  const [investors, setInvestors] = useState([
    { name: "", amount: "", ratio: "" }
  ]);

  const [mediaFiles, setMediaFiles] = useState([]);

  const addInvestor = () => {
    setInvestors([...investors, { name: "", amount: "", ratio: "" }]);
  };

  const renderPaymentMethodDetails = () => {
    switch (formData.paymentMethod) {
      case "cheque":
        return (
          <Card className="mt-4">
            <CardHeader>
              <CardTitle className="flex items-center text-lg">
                <CreditCard className="w-5 h-5 mr-2" />
                Cheque Details
              </CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="chequeNumber">Cheque Number *</Label>
                <Input
                  id="chequeNumber"
                  value={paymentDetails.chequeNumber}
                  onChange={(e) => setPaymentDetails({...paymentDetails, chequeNumber: e.target.value})}
                  placeholder="Enter cheque number"
                />
              </div>
              <div>
                <Label htmlFor="bankName">Bank Name *</Label>
                <Input
                  id="bankName"
                  value={paymentDetails.bankName}
                  onChange={(e) => setPaymentDetails({...paymentDetails, bankName: e.target.value})}
                  placeholder="Enter bank name"
                />
              </div>
              <div>
                <Label htmlFor="chequeDate">Cheque Date *</Label>
                <Input
                  id="chequeDate"
                  type="date"
                  value={paymentDetails.chequeDate}
                  onChange={(e) => setPaymentDetails({...paymentDetails, chequeDate: e.target.value})}
                />
              </div>
              <div>
                <Label htmlFor="chequeAmount">Cheque Amount *</Label>
                <div className="flex space-x-2">
                  <div className="w-24">
                    <CurrencySelector
                      value={formData.currency}
                      onChange={(currency) => setFormData({...formData, currency})}
                    />
                  </div>
                  <Input
                    id="chequeAmount"
                    type="number"
                    value={paymentDetails.chequeAmount}
                    onChange={(e) => setPaymentDetails({...paymentDetails, chequeAmount: e.target.value})}
                    placeholder="0.00"
                    className="flex-1"
                  />
                </div>
              </div>
              <div>
                <Label htmlFor="accountHolder">Account Holder Name *</Label>
                <Input
                  id="accountHolder"
                  value={paymentDetails.accountHolder}
                  onChange={(e) => setPaymentDetails({...paymentDetails, accountHolder: e.target.value})}
                  placeholder="Account holder name"
                />
              </div>
              <div>
                <Label htmlFor="bankBranch">Bank Branch *</Label>
                <Input
                  id="bankBranch"
                  value={paymentDetails.bankBranch}
                  onChange={(e) => setPaymentDetails({...paymentDetails, bankBranch: e.target.value})}
                  placeholder="Bank branch"
                />
              </div>
            </CardContent>
          </Card>
        );

      case "receipt":
        return (
          <Card className="mt-4">
            <CardHeader>
              <CardTitle className="flex items-center text-lg">
                <Receipt className="w-5 h-5 mr-2" />
                Receipt/Credit Payment Details
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="receiptDueDate">Payment Due Date *</Label>
                  <Input
                    id="receiptDueDate"
                    type="date"
                    value={paymentDetails.receiptDueDate}
                    onChange={(e) => setPaymentDetails({...paymentDetails, receiptDueDate: e.target.value})}
                    min={new Date().toISOString().split('T')[0]}
                  />
                </div>
                <div>
                  <Label htmlFor="creditTerms">Credit Terms</Label>
                  <Select 
                    value={paymentDetails.creditTerms} 
                    onValueChange={(value) => setPaymentDetails({...paymentDetails, creditTerms: value})}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select terms..." />
                    </SelectTrigger>
                    <SelectContent className="bg-white border shadow-lg z-50">
                      <SelectItem value="30">30 Days</SelectItem>
                      <SelectItem value="60">60 Days</SelectItem>
                      <SelectItem value="90">90 Days</SelectItem>
                      <SelectItem value="custom">Custom Terms</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              {paymentDetails.creditTerms === "custom" && (
                <div>
                  <Label htmlFor="customTerms">Custom Credit Terms</Label>
                  <Textarea
                    id="customTerms"
                    value={paymentDetails.customTerms}
                    onChange={(e) => setPaymentDetails({...paymentDetails, customTerms: e.target.value})}
                    placeholder="Describe custom payment terms..."
                  />
                </div>
              )}

              <div className="p-4 bg-blue-50 rounded-lg">
                <h4 className="font-medium text-blue-900 mb-2">Receipt Information</h4>
                <p className="text-sm text-blue-800">
                  Receipt Number: <span className="font-mono">RCP-{Date.now().toString().slice(-6)}</span>
                </p>
                <p className="text-sm text-blue-800">
                  This receipt will be generated with all purchase details and payment terms.
                </p>
              </div>
            </CardContent>
          </Card>
        );

      default:
        return null;
    }
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Add New Gem Purchase</h1>
        <nav className="text-sm text-gray-500 mt-1">
          Dashboard &gt; Gem Management &gt; Add Purchase
        </nav>
      </div>

      <form className="space-y-6">
        {/* Gem Information */}
        <Card>
          <CardHeader>
            <CardTitle>Gem Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
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
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => setFormData({...formData, description: e.target.value})}
                  rows={3}
                  placeholder="Detailed gem description..."
                />
              </div>
              
              <div className="space-y-4">
                <div>
                  <Label htmlFor="quantity">Quantity</Label>
                  <Input
                    id="quantity"
                    type="number"
                    value={formData.quantity}
                    onChange={(e) => setFormData({...formData, quantity: e.target.value})}
                  />
                </div>
                
                <div className="flex space-x-2">
                  <div className="flex-1">
                    <Label htmlFor="weight">Weight</Label>
                    <Input
                      id="weight"
                      type="number"
                      step="0.1"
                      value={formData.weight}
                      onChange={(e) => setFormData({...formData, weight: e.target.value})}
                    />
                  </div>
                  <div>
                    <Label htmlFor="weightUnit">Unit</Label>
                    <Select
                      value={formData.weightUnit}
                      onValueChange={(value) => setFormData({...formData, weightUnit: value})}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className="bg-white border shadow-lg z-50">
                        <SelectItem value="carats">Carats</SelectItem>
                        <SelectItem value="grams">Grams</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <CurrencySelector
                value={formData.currency}
                onChange={(currency) => setFormData({...formData, currency})}
                label="Currency"
              />
              <div>
                <Label htmlFor="purchasePrice">Purchase Price</Label>
                <Input
                  id="purchasePrice"
                  type="number"
                  value={formData.purchasePrice}
                  onChange={(e) => setFormData({...formData, purchasePrice: e.target.value})}
                  placeholder="0.00"
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Visual Documentation */}
        <Card>
          <CardHeader>
            <CardTitle>Visual Documentation</CardTitle>
          </CardHeader>
          <CardContent>
            <MediaUpload onFilesChange={setMediaFiles} />
          </CardContent>
        </Card>

        {/* Seller Information */}
        <Card>
          <CardHeader>
            <CardTitle>Seller Information</CardTitle>
          </CardHeader>
          <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="sellerName">Seller Name</Label>
              <Input
                id="sellerName"
                value={formData.sellerName}
                onChange={(e) => setFormData({...formData, sellerName: e.target.value})}
              />
            </div>
            
            <div>
              <Label htmlFor="sellerContact">Contact Information</Label>
              <Input
                id="sellerContact"
                value={formData.sellerContact}
                onChange={(e) => setFormData({...formData, sellerContact: e.target.value})}
                placeholder="Phone / Email"
              />
            </div>
            
            <div>
              <Label htmlFor="sourceType">Source Type</Label>
              <Select
                value={formData.sourceType}
                onValueChange={(value) => setFormData({...formData, sourceType: value})}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-white border shadow-lg z-50">
                  <SelectItem value="local">Local Seller</SelectItem>
                  <SelectItem value="mine">Mine Location</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <Label htmlFor="sourceLocation">Source Location</Label>
              <Input
                id="sourceLocation"
                value={formData.sourceLocation}
                onChange={(e) => setFormData({...formData, sourceLocation: e.target.value})}
              />
            </div>
          </CardContent>
        </Card>

        {/* Payment Method */}
        <Card>
          <CardHeader>
            <CardTitle>Payment Method</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
              <div 
                className={`p-4 border-2 rounded-lg cursor-pointer transition-colors ${
                  formData.paymentMethod === 'cash' ? 'border-black bg-gray-50' : 'border-gray-200 hover:border-gray-300'
                }`}
                onClick={() => setFormData({...formData, paymentMethod: 'cash'})}
              >
                <div className="flex items-center space-x-3">
                  <Banknote className="w-8 h-8" />
                  <div>
                    <h3 className="font-medium">Cash Payment</h3>
                    <p className="text-sm text-gray-600">Immediate payment</p>
                  </div>
                </div>
              </div>

              <div 
                className={`p-4 border-2 rounded-lg cursor-pointer transition-colors ${
                  formData.paymentMethod === 'cheque' ? 'border-black bg-gray-50' : 'border-gray-200 hover:border-gray-300'
                }`}
                onClick={() => setFormData({...formData, paymentMethod: 'cheque'})}
              >
                <div className="flex items-center space-x-3">
                  <CreditCard className="w-8 h-8" />
                  <div>
                    <h3 className="font-medium">Cheque Payment</h3>
                    <p className="text-sm text-gray-600">Bank cheque details</p>
                  </div>
                </div>
              </div>

              <div 
                className={`p-4 border-2 rounded-lg cursor-pointer transition-colors ${
                  formData.paymentMethod === 'receipt' ? 'border-black bg-gray-50' : 'border-gray-200 hover:border-gray-300'
                }`}
                onClick={() => setFormData({...formData, paymentMethod: 'receipt'})}
              >
                <div className="flex items-center space-x-3">
                  <Receipt className="w-8 h-8" />
                  <div>
                    <h3 className="font-medium">Receipt/Credit</h3>
                    <p className="text-sm text-gray-600">Future payment terms</p>
                  </div>
                </div>
              </div>
            </div>

            {renderPaymentMethodDetails()}
          </CardContent>
        </Card>

        {/* Investor Allocation */}
        <Card>
          <CardHeader>
            <CardTitle>Investor Allocation</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {investors.map((investor, index) => (
              <div key={index} className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4 bg-gray-50 rounded-lg">
                <div>
                  <Label>Investor Name</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select Investor" />
                    </SelectTrigger>
                    <SelectContent className="bg-white border shadow-lg z-50">
                      <SelectItem value="investor1">John Investor</SelectItem>
                      <SelectItem value="investor2">Jane Capital</SelectItem>
                      <SelectItem value="investor3">ABC Fund</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <Label>Investment Amount</Label>
                  <Input type="number" placeholder="0.00" />
                </div>
                
                <div>
                  <Label>Investment Ratio (%)</Label>
                  <Input type="number" max="100" placeholder="0" />
                </div>
              </div>
            ))}
            
            <Button type="button" onClick={addInvestor} variant="outline">
              Add Investor
            </Button>
          </CardContent>
        </Card>

        {/* Action Buttons */}
        <div className="flex space-x-4">
          <Button type="submit" className="bg-black text-white hover:bg-gray-800">
            Save Purchase
          </Button>
          <Button type="button" variant="outline">
            Save as Draft
          </Button>
          <Button type="button" variant="outline">
            Cancel
          </Button>
        </div>
      </form>
    </div>
  );
};
