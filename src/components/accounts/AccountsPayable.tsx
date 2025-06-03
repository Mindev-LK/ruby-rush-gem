
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, Filter, Download, Calendar, DollarSign, AlertTriangle, Clock, Plus } from "lucide-react";

export const AccountsPayable = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [typeFilter, setTypeFilter] = useState("all");

  const payablesData = [
    {
      id: "AP001",
      sellerName: "Mountain Gems Mining Co",
      purchaseReference: "PUR-2024-001",
      purchaseDate: "2024-05-10",
      dueDate: "2024-06-10",
      amount: 15200,
      daysOutstanding: 23,
      status: "Outstanding",
      paymentType: "Credit Purchase",
      gemType: "Ruby Rough",
      contactPhone: "+94 77 123 4567"
    },
    {
      id: "AP002",
      sellerName: "Lanka Precious Stones",
      purchaseReference: "PUR-2024-002",
      purchaseDate: "2024-04-15",
      dueDate: "2024-05-15",
      amount: 28900,
      daysOutstanding: 48,
      status: "Overdue",
      paymentType: "Credit Purchase",
      gemType: "Sapphire Cut",
      contactPhone: "+94 11 234 5678"
    },
    {
      id: "AP003",
      sellerName: "Ratnapura Mine Direct",
      purchaseReference: "PUR-2024-003",
      purchaseDate: "2024-05-25",
      dueDate: "2024-06-25",
      amount: 8500,
      daysOutstanding: 8,
      status: "Outstanding",
      paymentType: "Credit Purchase",
      gemType: "Garnet Rough",
      contactPhone: "+94 45 345 6789"
    },
    {
      id: "AP004",
      sellerName: "Elite Gem Traders",
      purchaseReference: "PUR-2024-004",
      purchaseDate: "2024-03-20",
      dueDate: "2024-04-20",
      amount: 42000,
      daysOutstanding: 74,
      status: "Overdue",
      paymentType: "Credit Purchase",
      gemType: "Emerald Cut",
      contactPhone: "+94 81 456 7890"
    },
    {
      id: "AP005",
      sellerName: "Ceylon Gem House",
      purchaseReference: "CHQ-2024-001",
      purchaseDate: "2024-06-01",
      dueDate: "2024-06-15",
      amount: 12300,
      daysOutstanding: 2,
      status: "Pending Clearance",
      paymentType: "Cheque Issued",
      gemType: "Moonstone",
      contactPhone: "+94 70 567 8901"
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Outstanding": return "bg-yellow-100 text-yellow-800";
      case "Overdue": return "bg-red-100 text-red-800";
      case "Pending Clearance": return "bg-blue-100 text-blue-800";
      case "Paid": return "bg-green-100 text-green-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const getAgingColor = (days: number) => {
    if (days <= 30) return "text-green-600";
    if (days <= 60) return "text-yellow-600";
    return "text-red-600";
  };

  const totalPayable = payablesData.reduce((sum, item) => sum + item.amount, 0);
  const overdueAmount = payablesData
    .filter(item => item.status === "Overdue")
    .reduce((sum, item) => sum + item.amount, 0);
  const thisWeekDue = payablesData
    .filter(item => {
      const dueDate = new Date(item.dueDate);
      const today = new Date();
      const weekFromNow = new Date(today.getTime() + 7 * 24 * 60 * 60 * 1000);
      return dueDate >= today && dueDate <= weekFromNow;
    })
    .reduce((sum, item) => sum + item.amount, 0);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Accounts Payable</h1>
          <nav className="text-sm text-gray-500 mt-1">
            Dashboard &gt; Accounts &gt; Payables
          </nav>
        </div>
        <Button className="bg-black text-white hover:bg-gray-800">
          <Plus className="w-4 h-4 mr-2" />
          Record Payment
        </Button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center">
              <DollarSign className="w-8 h-8 text-blue-600" />
              <div className="ml-4">
                <div className="text-sm font-medium text-gray-600">Total Payable</div>
                <div className="text-2xl font-bold text-gray-900">${totalPayable.toLocaleString()}</div>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center">
              <AlertTriangle className="w-8 h-8 text-red-600" />
              <div className="ml-4">
                <div className="text-sm font-medium text-gray-600">Overdue Amount</div>
                <div className="text-2xl font-bold text-red-600">${overdueAmount.toLocaleString()}</div>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center">
              <Clock className="w-8 h-8 text-yellow-600" />
              <div className="ml-4">
                <div className="text-sm font-medium text-gray-600">This Week Due</div>
                <div className="text-2xl font-bold text-yellow-600">${thisWeekDue.toLocaleString()}</div>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center">
              <Calendar className="w-8 h-8 text-green-600" />
              <div className="ml-4">
                <div className="text-sm font-medium text-gray-600">Payment Items</div>
                <div className="text-2xl font-bold text-gray-900">{payablesData.length}</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters Section */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-wrap gap-4 items-center">
            <div className="flex-1 min-w-64">
              <div className="relative">
                <Search className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                <Input 
                  placeholder="Search by seller, reference number..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-40">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="outstanding">Outstanding</SelectItem>
                <SelectItem value="overdue">Overdue</SelectItem>
                <SelectItem value="pending">Pending Clearance</SelectItem>
                <SelectItem value="paid">Paid</SelectItem>
              </SelectContent>
            </Select>
            <Select value={typeFilter} onValueChange={setTypeFilter}>
              <SelectTrigger className="w-40">
                <SelectValue placeholder="Payment Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="credit">Credit Purchase</SelectItem>
                <SelectItem value="cheque">Cheque Issued</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline">
              <Filter className="w-4 h-4 mr-2" />
              More Filters
            </Button>
            <Button variant="outline">
              <Download className="w-4 h-4 mr-2" />
              Export
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Payables Table */}
      <Card>
        <CardHeader>
          <CardTitle>Outstanding Payables</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Seller Name</TableHead>
                <TableHead>Reference #</TableHead>
                <TableHead>Purchase Date</TableHead>
                <TableHead>Due Date</TableHead>
                <TableHead className="text-right">Amount</TableHead>
                <TableHead>Days Outstanding</TableHead>
                <TableHead>Payment Type</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-center">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {payablesData.map((item) => (
                <TableRow key={item.id} className="hover:bg-gray-50">
                  <TableCell>
                    <div>
                      <div className="font-medium">{item.sellerName}</div>
                      <div className="text-sm text-gray-500">{item.gemType}</div>
                    </div>
                  </TableCell>
                  <TableCell className="font-medium">{item.purchaseReference}</TableCell>
                  <TableCell>{new Date(item.purchaseDate).toLocaleDateString()}</TableCell>
                  <TableCell>{new Date(item.dueDate).toLocaleDateString()}</TableCell>
                  <TableCell className="text-right font-medium">
                    ${item.amount.toLocaleString()}
                  </TableCell>
                  <TableCell className={`font-medium ${getAgingColor(item.daysOutstanding)}`}>
                    {item.daysOutstanding} days
                  </TableCell>
                  <TableCell>
                    <span className="text-sm">{item.paymentType}</span>
                  </TableCell>
                  <TableCell>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(item.status)}`}>
                      {item.status}
                    </span>
                  </TableCell>
                  <TableCell>
                    <div className="flex justify-center space-x-2">
                      <Button variant="ghost" size="sm" title="Schedule Payment">
                        <Calendar className="w-4 h-4" />
                      </Button>
                      <Button variant="ghost" size="sm" title="Mark Paid">
                        <DollarSign className="w-4 h-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Payment Schedule */}
      <Card>
        <CardHeader>
          <CardTitle>Upcoming Payment Schedule</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex justify-between items-center p-4 bg-red-50 rounded-lg border-l-4 border-red-500">
              <div>
                <div className="font-medium text-red-800">Overdue Payments</div>
                <div className="text-sm text-red-600">2 payments totaling ${overdueAmount.toLocaleString()}</div>
              </div>
              <Button variant="outline" size="sm" className="text-red-600 border-red-300">
                Review
              </Button>
            </div>
            <div className="flex justify-between items-center p-4 bg-yellow-50 rounded-lg border-l-4 border-yellow-500">
              <div>
                <div className="font-medium text-yellow-800">Due This Week</div>
                <div className="text-sm text-yellow-600">1 payment totaling ${thisWeekDue.toLocaleString()}</div>
              </div>
              <Button variant="outline" size="sm" className="text-yellow-600 border-yellow-300">
                Schedule
              </Button>
            </div>
            <div className="flex justify-between items-center p-4 bg-blue-50 rounded-lg border-l-4 border-blue-500">
              <div>
                <div className="font-medium text-blue-800">Pending Clearance</div>
                <div className="text-sm text-blue-600">1 cheque totaling $12,300</div>
              </div>
              <Button variant="outline" size="sm" className="text-blue-600 border-blue-300">
                Track
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex space-x-4">
            <Button variant="outline">
              <Calendar className="w-4 h-4 mr-2" />
              Schedule Payments
            </Button>
            <Button variant="outline">
              <Download className="w-4 h-4 mr-2" />
              Aging Report
            </Button>
            <Button variant="outline">
              <Download className="w-4 h-4 mr-2" />
              Payment Schedule
            </Button>
            <Button variant="outline">
              Generate Reminders
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
