import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Plus, Edit, Save, X } from "lucide-react";

interface Investment {
  id: string;
  date: string;
  amount: number;
  currency: string;
  type: string;
  notes: string;
}

interface Investor {
  id: number;
  name: string;
  email: string;
  phone: string;
  totalInvestment: number;
  activeGems: number;
  currentReturn: number;
  profitLoss: number;
  status: string;
  joinDate: string;
}

interface InvestorDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  investor: Investor | null;
  isEditMode: boolean;
  onSave: (investorData: Investor) => void;
}

export const InvestorDetailsModal = ({ 
  isOpen, 
  onClose, 
  investor, 
  isEditMode, 
  onSave 
}: InvestorDetailsModalProps) => {
  const [editData, setEditData] = useState<Investor>(investor || {
    id: 0,
    name: "",
    email: "",
    phone: "",
    totalInvestment: 0,
    activeGems: 0,
    currentReturn: 0,
    profitLoss: 0,
    status: "",
    joinDate: ""
  });
  const [investments, setInvestments] = useState<Investment[]>([
    {
      id: "1",
      date: "2024-01-15",
      amount: 50000,
      currency: "USD",
      type: "Initial Investment",
      notes: "First investment in Ruby mining project"
    },
    {
      id: "2", 
      date: "2024-03-20",
      amount: 25000,
      currency: "USD",
      type: "Additional Investment",
      notes: "Sapphire trading expansion"
    }
  ]);

  const [showAddInvestment, setShowAddInvestment] = useState(false);
  const [newInvestment, setNewInvestment] = useState({
    date: "",
    amount: "",
    currency: "USD",
    type: "",
    notes: ""
  });

  const handleSave = () => {
    if (isEditMode && investor) {
      onSave({ ...investor, ...editData });
    }
    onClose();
  };

  const handleAddInvestment = () => {
    const investment: Investment = {
      id: Date.now().toString(),
      date: newInvestment.date,
      amount: Number(newInvestment.amount),
      currency: newInvestment.currency,
      type: newInvestment.type,
      notes: newInvestment.notes
    };
    
    setInvestments([...investments, investment]);
    setNewInvestment({ date: "", amount: "", currency: "USD", type: "", notes: "" });
    setShowAddInvestment(false);
  };

  if (!investor) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center justify-between">
            <span>{isEditMode ? 'Edit' : 'View'} Investor Details</span>
            <div className="flex space-x-2">
              {isEditMode && (
                <Button onClick={handleSave} size="sm">
                  <Save className="w-4 h-4 mr-1" />
                  Save
                </Button>
              )}
              <Button onClick={onClose} variant="outline" size="sm">
                <X className="w-4 h-4" />
              </Button>
            </div>
          </DialogTitle>
        </DialogHeader>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Investor Information */}
          <Card>
            <CardHeader>
              <CardTitle>Investor Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="name">Name</Label>
                <Input
                  id="name"
                  value={isEditMode ? editData.name || "" : investor.name}
                  onChange={(e) => isEditMode && setEditData({...editData, name: e.target.value})}
                  readOnly={!isEditMode}
                />
              </div>
              <div>
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  value={isEditMode ? editData.email || "" : investor.email}
                  onChange={(e) => isEditMode && setEditData({...editData, email: e.target.value})}
                  readOnly={!isEditMode}
                />
              </div>
              <div>
                <Label htmlFor="phone">Phone</Label>
                <Input
                  id="phone"
                  value={isEditMode ? editData.phone || "" : investor.phone}
                  onChange={(e) => isEditMode && setEditData({...editData, phone: e.target.value})}
                  readOnly={!isEditMode}
                />
              </div>
              <div>
                <Label htmlFor="joinDate">Join Date</Label>
                <Input
                  id="joinDate"
                  type="date"
                  value={isEditMode ? editData.joinDate || "" : investor.joinDate}
                  onChange={(e) => isEditMode && setEditData({...editData, joinDate: e.target.value})}
                  readOnly={!isEditMode}
                />
              </div>
            </CardContent>
          </Card>

          {/* Investment Summary */}
          <Card>
            <CardHeader>
              <CardTitle>Investment Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Total Investment</Label>
                  <div className="text-2xl font-bold">${investor.totalInvestment.toLocaleString()}</div>
                </div>
                <div>
                  <Label>Active Gems</Label>
                  <div className="text-2xl font-bold">{investor.activeGems}</div>
                </div>
                <div>
                  <Label>Current Return</Label>
                  <div className="text-2xl font-bold text-green-600">${investor.currentReturn.toLocaleString()}</div>
                </div>
                <div>
                  <Label>Return Rate</Label>
                  <div className="text-2xl font-bold text-green-600">{investor.profitLoss}%</div>
                </div>
              </div>
              <div>
                <Label>Status</Label>
                <div className="px-2 py-1 bg-green-100 text-green-800 text-sm rounded-full inline-block">
                  {investor.status}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Investment History */}
        <Card className="mt-6">
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span>Investment History</span>
              {isEditMode && (
                <Button 
                  onClick={() => setShowAddInvestment(true)}
                  size="sm"
                  variant="outline"
                >
                  <Plus className="w-4 h-4 mr-1" />
                  Add Investment
                </Button>
              )}
            </CardTitle>
          </CardHeader>
          <CardContent>
            {showAddInvestment && (
              <Card className="mb-4 bg-gray-50">
                <CardContent className="p-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    <div>
                      <Label htmlFor="investmentDate">Date</Label>
                      <Input
                        id="investmentDate"
                        type="date"
                        value={newInvestment.date}
                        onChange={(e) => setNewInvestment({...newInvestment, date: e.target.value})}
                      />
                    </div>
                    <div>
                      <Label htmlFor="investmentAmount">Amount</Label>
                      <Input
                        id="investmentAmount"
                        type="number"
                        value={newInvestment.amount}
                        onChange={(e) => setNewInvestment({...newInvestment, amount: e.target.value})}
                        placeholder="0.00"
                      />
                    </div>
                    <div>
                      <Label htmlFor="investmentType">Type</Label>
                      <Input
                        id="investmentType"
                        value={newInvestment.type}
                        onChange={(e) => setNewInvestment({...newInvestment, type: e.target.value})}
                        placeholder="Investment type"
                      />
                    </div>
                  </div>
                  <div className="mt-4">
                    <Label htmlFor="investmentNotes">Notes</Label>
                    <Textarea
                      id="investmentNotes"
                      value={newInvestment.notes}
                      onChange={(e) => setNewInvestment({...newInvestment, notes: e.target.value})}
                      placeholder="Investment notes..."
                    />
                  </div>
                  <div className="flex justify-end space-x-2 mt-4">
                    <Button 
                      onClick={() => setShowAddInvestment(false)}
                      variant="outline"
                      size="sm"
                    >
                      Cancel
                    </Button>
                    <Button onClick={handleAddInvestment} size="sm">
                      Add Investment
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}

            <div className="space-y-3">
              {investments.map((investment) => (
                <div key={investment.id} className="p-4 border rounded-lg">
                  <div className="flex justify-between items-start">
                    <div>
                      <div className="font-medium">{investment.type}</div>
                      <div className="text-sm text-gray-500">
                        {new Date(investment.date).toLocaleDateString()}
                      </div>
                      <div className="text-sm text-gray-600 mt-1">{investment.notes}</div>
                    </div>
                    <div className="text-right">
                      <div className="font-semibold">${investment.amount.toLocaleString()}</div>
                      <div className="text-sm text-gray-500">{investment.currency}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </DialogContent>
    </Dialog>
  );
};
