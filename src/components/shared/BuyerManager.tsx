
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Plus } from "lucide-react";

interface Buyer {
  id: string;
  name: string;
  contactNumber: string;
  address: string;
  email?: string;
  company?: string;
  purchaseHistory?: number;
}

interface BuyerManagerProps {
  selectedBuyer: string;
  onBuyerChange: (buyerId: string, buyerData?: Buyer) => void;
  onBuyerDetailsChange: (details: Partial<Buyer>) => void;
}

export const BuyerManager = ({ selectedBuyer, onBuyerChange, onBuyerDetailsChange }: BuyerManagerProps) => {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [newBuyer, setNewBuyer] = useState({
    name: "",
    contactNumber: "",
    address: "",
    email: "",
    company: ""
  });

  const [buyers] = useState<Buyer[]>([
    {
      id: "1",
      name: "International Gems Ltd",
      contactNumber: "+1-555-0123",
      address: "123 Diamond Street, New York, NY 10001",
      email: "contact@intgems.com",
      company: "International Gems Ltd",
      purchaseHistory: 15
    },
    {
      id: "2", 
      name: "Luxury Jewelry Co",
      contactNumber: "+1-555-0456",
      address: "456 Gold Avenue, Los Angeles, CA 90210",
      email: "orders@luxjewelry.com",
      company: "Luxury Jewelry Co",
      purchaseHistory: 8
    },
    {
      id: "3",
      name: "Premium Stones Inc",
      contactNumber: "+1-555-0789",
      address: "789 Ruby Road, Miami, FL 33101",
      email: "info@premiumstones.com", 
      company: "Premium Stones Inc",
      purchaseHistory: 12
    }
  ]);

  const selectedBuyerData = buyers.find(b => b.id === selectedBuyer);

  const handleAddBuyer = () => {
    if (newBuyer.name && newBuyer.contactNumber && newBuyer.address) {
      const buyer: Buyer = {
        id: Date.now().toString(),
        ...newBuyer,
        purchaseHistory: 0
      };
      
      buyers.push(buyer);
      onBuyerChange(buyer.id, buyer);
      setIsAddModalOpen(false);
      setNewBuyer({ name: "", contactNumber: "", address: "", email: "", company: "" });
    }
  };

  const handleBuyerSelect = (buyerId: string) => {
    const buyer = buyers.find(b => b.id === buyerId);
    onBuyerChange(buyerId, buyer);
    if (buyer) {
      onBuyerDetailsChange(buyer);
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex space-x-2">
        <div className="flex-1">
          <Label htmlFor="existingBuyer">Select Existing Buyer</Label>
          <Select value={selectedBuyer} onValueChange={handleBuyerSelect}>
            <SelectTrigger>
              <SelectValue placeholder="Choose existing buyer..." />
            </SelectTrigger>
            <SelectContent className="bg-white border shadow-lg z-50">
              {buyers.map((buyer) => (
                <SelectItem key={buyer.id} value={buyer.id}>
                  <div>
                    <div className="font-medium">{buyer.name}</div>
                    <div className="text-sm text-gray-500">{buyer.contactNumber}</div>
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="pt-6">
          <Button 
            type="button"
            variant="outline" 
            onClick={() => setIsAddModalOpen(true)}
            className="flex items-center"
          >
            <Plus className="w-4 h-4 mr-1" />
            Add New Buyer
          </Button>
        </div>
      </div>

      {selectedBuyerData && (
        <div className="p-4 bg-gray-50 rounded-lg">
          <h4 className="font-medium text-gray-900 mb-2">Buyer Details</h4>
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <span className="text-gray-600">Name:</span>
              <p className="font-medium">{selectedBuyerData.name}</p>
            </div>
            <div>
              <span className="text-gray-600">Contact:</span>
              <p className="font-medium">{selectedBuyerData.contactNumber}</p>
            </div>
            <div>
              <span className="text-gray-600">Email:</span>
              <p className="font-medium">{selectedBuyerData.email || 'N/A'}</p>
            </div>
            <div>
              <span className="text-gray-600">Purchase History:</span>
              <p className="font-medium">{selectedBuyerData.purchaseHistory} transactions</p>
            </div>
            <div className="col-span-2">
              <span className="text-gray-600">Address:</span>
              <p className="font-medium">{selectedBuyerData.address}</p>
            </div>
          </div>
        </div>
      )}

      <Dialog open={isAddModalOpen} onOpenChange={setIsAddModalOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Add New Buyer</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label htmlFor="buyerName">Buyer Name *</Label>
              <Input
                id="buyerName"
                value={newBuyer.name}
                onChange={(e) => setNewBuyer({...newBuyer, name: e.target.value})}
                placeholder="Enter buyer name"
              />
            </div>
            <div>
              <Label htmlFor="contactNumber">Contact Number *</Label>
              <Input
                id="contactNumber"
                value={newBuyer.contactNumber}
                onChange={(e) => setNewBuyer({...newBuyer, contactNumber: e.target.value})}
                placeholder="+1 (555) 000-0000"
              />
            </div>
            <div>
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={newBuyer.email}
                onChange={(e) => setNewBuyer({...newBuyer, email: e.target.value})}
                placeholder="buyer@company.com"
              />
            </div>
            <div>
              <Label htmlFor="company">Company Name</Label>
              <Input
                id="company"
                value={newBuyer.company}
                onChange={(e) => setNewBuyer({...newBuyer, company: e.target.value})}
                placeholder="Company name"
              />
            </div>
            <div>
              <Label htmlFor="address">Address *</Label>
              <Textarea
                id="address"
                value={newBuyer.address}
                onChange={(e) => setNewBuyer({...newBuyer, address: e.target.value})}
                placeholder="Complete address..."
              />
            </div>
            <div className="flex justify-end space-x-2">
              <Button variant="outline" onClick={() => setIsAddModalOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleAddBuyer}>
                Add Buyer
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};
