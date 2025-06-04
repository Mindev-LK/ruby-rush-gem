import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Search, Plus, Eye, Edit, TrendingUp, TrendingDown, User } from "lucide-react";
import { InvestorDetailsModal } from "./InvestorDetailsModal";

export const InvestorManagement = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [selectedInvestor, setSelectedInvestor] = useState(null);
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);

  const investorsData = [
    {
      id: 1,
      name: "John Smith",
      email: "john.smith@email.com",
      phone: "+1 (555) 123-4567",
      totalInvestment: 250000,
      activeGems: 12,
      currentReturn: 45000,
      profitLoss: 18,
      status: "Active",
      joinDate: "2023-01-15"
    },
    {
      id: 2,
      name: "Sarah Johnson",
      email: "sarah.j@email.com",
      phone: "+1 (555) 234-5678",
      totalInvestment: 180000,
      activeGems: 8,
      currentReturn: 32400,
      profitLoss: 18,
      status: "Active",
      joinDate: "2023-03-22"
    },
    {
      id: 3,
      name: "Michael Brown",
      email: "m.brown@email.com",
      phone: "+1 (555) 345-6789",
      totalInvestment: 320000,
      activeGems: 15,
      currentReturn: 51200,
      profitLoss: 16,
      status: "Active",
      joinDate: "2022-11-08"
    },
    {
      id: 4,
      name: "Emily Davis",
      email: "emily.davis@email.com",
      phone: "+1 (555) 456-7890",
      totalInvestment: 95000,
      activeGems: 5,
      currentReturn: 14250,
      profitLoss: 15,
      status: "Active",
      joinDate: "2023-06-10"
    }
  ];

  const totalInvestors = investorsData.length;
  const totalInvestments = investorsData.reduce((sum, inv) => sum + inv.totalInvestment, 0);
  const totalReturns = investorsData.reduce((sum, inv) => sum + inv.currentReturn, 0);
  const activeInvestors = investorsData.filter(inv => inv.status === "Active").length;

  const openInvestorDetails = (investor, editMode = false) => {
    setSelectedInvestor(investor);
    setIsEditMode(editMode);
    setIsDetailsModalOpen(true);
  };

  const handleSaveInvestor = (investorData) => {
    // In a real app, this would update the investor in the database
    console.log("Saving investor:", investorData);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Investor Management</h1>
          <nav className="text-sm text-gray-500 mt-1">
            Dashboard &gt; Investor Management
          </nav>
        </div>
        <Dialog open={isAddModalOpen} onOpenChange={setIsAddModalOpen}>
          <DialogTrigger asChild>
            <Button className="bg-black text-white hover:bg-gray-800">
              <Plus className="w-4 h-4 mr-2" />
              Add New Investor
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>Add New Investor</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label htmlFor="investorName">Investor Name</Label>
                <Input id="investorName" placeholder="Enter full name" />
              </div>
              <div>
                <Label htmlFor="investorEmail">Email</Label>
                <Input id="investorEmail" type="email" placeholder="investor@email.com" />
              </div>
              <div>
                <Label htmlFor="investorPhone">Phone</Label>
                <Input id="investorPhone" placeholder="+1 (555) 000-0000" />
              </div>
              <div>
                <Label htmlFor="initialInvestment">Initial Investment</Label>
                <Input id="initialInvestment" type="number" placeholder="0.00" />
              </div>
              <div>
                <Label htmlFor="investorNotes">Notes</Label>
                <Textarea id="investorNotes" placeholder="Additional information..." />
              </div>
              <div className="flex justify-end space-x-2">
                <Button variant="outline" onClick={() => setIsAddModalOpen(false)}>
                  Cancel
                </Button>
                <Button className="bg-black text-white hover:bg-gray-800">
                  Add Investor
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="text-sm font-medium text-gray-600">Total Investors</div>
            <div className="text-2xl font-bold text-gray-900">{totalInvestors}</div>
            <div className="text-xs text-gray-500">{activeInvestors} active</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-sm font-medium text-gray-600">Active Investments</div>
            <div className="text-2xl font-bold text-gray-900">${totalInvestments.toLocaleString()}</div>
            <div className="text-xs text-gray-500">Total invested</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-sm font-medium text-gray-600">Total Returns</div>
            <div className="text-2xl font-bold text-green-600">${totalReturns.toLocaleString()}</div>
            <div className="text-xs text-gray-500">Generated returns</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-sm font-medium text-gray-600">Avg. Return Rate</div>
            <div className="text-2xl font-bold text-green-600">16.8%</div>
            <div className="text-xs text-gray-500">Across all investors</div>
          </CardContent>
        </Card>
      </div>

      {/* Search and Filters */}
      <Card>
        <CardContent className="p-4">
          <div className="relative">
            <Search className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
            <Input 
              placeholder="Search investors by name, email, or phone..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </CardContent>
      </Card>

      {/* Investor Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {investorsData.map((investor) => (
          <Card 
            key={investor.id} 
            className="hover:shadow-lg transition-shadow cursor-pointer"
            onClick={() => openInvestorDetails(investor)}
          >
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <div className="flex items-center">
                  <div className="w-10 h-10 bg-gray-900 rounded-full flex items-center justify-center">
                    <User className="w-5 h-5 text-white" />
                  </div>
                  <div className="ml-3">
                    <CardTitle className="text-lg">{investor.name}</CardTitle>
                    <p className="text-sm text-gray-500">{investor.email}</p>
                  </div>
                </div>
                <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">
                  {investor.status}
                </span>
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-600">Total Investment</p>
                  <p className="font-semibold text-gray-900">${investor.totalInvestment.toLocaleString()}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Active Gems</p>
                  <p className="font-semibold text-gray-900">{investor.activeGems}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Current Return</p>
                  <p className="font-semibold text-green-600">${investor.currentReturn.toLocaleString()}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Return Rate</p>
                  <p className="font-semibold text-green-600 flex items-center">
                    <TrendingUp className="w-3 h-3 mr-1" />
                    {investor.profitLoss}%
                  </p>
                </div>
              </div>
              <div className="pt-2 border-t">
                <p className="text-xs text-gray-500 mb-2">Member since {new Date(investor.joinDate).toLocaleDateString()}</p>
                <div className="flex space-x-2">
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="flex-1"
                    onClick={(e) => {
                      e.stopPropagation();
                      openInvestorDetails(investor, false);
                    }}
                  >
                    <Eye className="w-3 h-3 mr-1" />
                    View Details
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="flex-1"
                    onClick={(e) => {
                      e.stopPropagation();
                      openInvestorDetails(investor, true);
                    }}
                  >
                    <Edit className="w-3 h-3 mr-1" />
                    Edit
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Investor Details Table */}
      <Card>
        <CardHeader>
          <CardTitle>Investor Performance Table</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Investor</TableHead>
                <TableHead>Contact</TableHead>
                <TableHead className="text-right">Total Investment</TableHead>
                <TableHead className="text-center">Active Gems</TableHead>
                <TableHead className="text-right">Current Return</TableHead>
                <TableHead className="text-right">Return Rate</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-center">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {investorsData.map((investor) => (
                <TableRow key={investor.id} className="hover:bg-gray-50">
                  <TableCell>
                    <div className="flex items-center">
                      <div className="w-8 h-8 bg-gray-900 rounded-full flex items-center justify-center mr-3">
                        <User className="w-4 h-4 text-white" />
                      </div>
                      <div>
                        <div className="font-medium">{investor.name}</div>
                        <div className="text-sm text-gray-500">Since {new Date(investor.joinDate).toLocaleDateString()}</div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="text-sm">
                      <div>{investor.email}</div>
                      <div className="text-gray-500">{investor.phone}</div>
                    </div>
                  </TableCell>
                  <TableCell className="text-right font-medium">
                    ${investor.totalInvestment.toLocaleString()}
                  </TableCell>
                  <TableCell className="text-center">
                    {investor.activeGems}
                  </TableCell>
                  <TableCell className="text-right font-medium text-green-600">
                    ${investor.currentReturn.toLocaleString()}
                  </TableCell>
                  <TableCell className="text-right font-medium text-green-600">
                    {investor.profitLoss}%
                  </TableCell>
                  <TableCell>
                    <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">
                      {investor.status}
                    </span>
                  </TableCell>
                  <TableCell>
                    <div className="flex justify-center space-x-2">
                      <Button variant="ghost" size="sm">
                        <Eye className="w-4 h-4" />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Edit className="w-4 h-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <InvestorDetailsModal
        isOpen={isDetailsModalOpen}
        onClose={() => setIsDetailsModalOpen(false)}
        investor={selectedInvestor}
        isEditMode={isEditMode}
        onSave={handleSaveInvestor}
      />
    </div>
  );
};
