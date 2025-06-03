
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, Filter, Download, Calendar, AlertTriangle, CheckCircle, XCircle, Clock, Plus } from "lucide-react";

export const ChequeManagement = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [typeFilter, setTypeFilter] = useState("all");
  const [viewMode, setViewMode] = useState("table");

  const chequeData = [
    {
      id: "CHQ001",
      chequeNumber: "000123",
      payeePayer: "Mountain Gems Mining Co",
      amount: 15200,
      issueDate: "2024-05-15",
      dueDate: "2024-06-15",
      bankName: "Commercial Bank",
      status: "Issued",
      type: "Issued",
      gemReference: "PUR-2024-001",
      contactInfo: "+94 77 123 4567"
    },
    {
      id: "CHQ002",
      chequeNumber: "INV-456",
      payeePayer: "International Gems Ltd",
      amount: 25400,
      issueDate: "2024-05-10",
      dueDate: "2024-06-10",
      bankName: "Nations Trust Bank",
      status: "Cleared",
      type: "Received",
      gemReference: "SAL-2024-001",
      contactInfo: "contact@internationalgems.com"
    },
    {
      id: "CHQ003",
      chequeNumber: "000124",
      payeePayer: "Lanka Precious Stones",
      amount: 28900,
      issueDate: "2024-04-20",
      dueDate: "2024-05-20",
      bankName: "Commercial Bank",
      status: "Overdue",
      type: "Issued",
      gemReference: "PUR-2024-002",
      contactInfo: "+94 11 234 5678"
    },
    {
      id: "CHQ004",
      chequeNumber: "LUX-789",
      payeePayer: "Luxury Jewelry Co",
      amount: 18700,
      issueDate: "2024-05-25",
      dueDate: "2024-06-25",
      bankName: "Hatton National Bank",
      status: "Pending",
      type: "Received",
      gemReference: "SAL-2024-002",
      contactInfo: "orders@luxuryjewelry.com"
    },
    {
      id: "CHQ005",
      chequeNumber: "000125",
      payeePayer: "Elite Gem Traders",
      amount: 42000,
      issueDate: "2024-03-15",
      dueDate: "2024-04-15",
      bankName: "Commercial Bank",
      status: "Bounced",
      type: "Issued",
      gemReference: "PUR-2024-004",
      contactInfo: "+94 81 456 7890"
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Cleared": return "bg-green-100 text-green-800";
      case "Pending": return "bg-yellow-100 text-yellow-800";
      case "Issued": return "bg-blue-100 text-blue-800";
      case "Overdue": return "bg-red-100 text-red-800";
      case "Bounced": return "bg-red-100 text-red-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "Cleared": return <CheckCircle className="w-4 h-4 text-green-600" />;
      case "Pending": return <Clock className="w-4 h-4 text-yellow-600" />;
      case "Issued": return <Clock className="w-4 h-4 text-blue-600" />;
      case "Overdue": return <AlertTriangle className="w-4 h-4 text-red-600" />;
      case "Bounced": return <XCircle className="w-4 h-4 text-red-600" />;
      default: return <Clock className="w-4 h-4 text-gray-600" />;
    }
  };

  const totalCheques = chequeData.length;
  const pendingClearance = chequeData.filter(cheque => cheque.status === "Pending" || cheque.status === "Issued").length;
  const overdueBounced = chequeData.filter(cheque => cheque.status === "Overdue" || cheque.status === "Bounced").length;
  const totalAmount = chequeData.reduce((sum, cheque) => sum + cheque.amount, 0);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Cheque Management</h1>
          <nav className="text-sm text-gray-500 mt-1">
            Dashboard &gt; Accounts &gt; Cheques
          </nav>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline" onClick={() => setViewMode(viewMode === "table" ? "calendar" : "table")}>
            <Calendar className="w-4 h-4 mr-2" />
            {viewMode === "table" ? "Calendar View" : "Table View"}
          </Button>
          <Button className="bg-black text-white hover:bg-gray-800">
            <Plus className="w-4 h-4 mr-2" />
            Add Cheque
          </Button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center">
              <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                <CheckCircle className="w-5 h-5 text-blue-600" />
              </div>
              <div className="ml-4">
                <div className="text-sm font-medium text-gray-600">Total Cheques</div>
                <div className="text-2xl font-bold text-gray-900">{totalCheques}</div>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center">
              <div className="w-8 h-8 bg-yellow-100 rounded-full flex items-center justify-center">
                <Clock className="w-5 h-5 text-yellow-600" />
              </div>
              <div className="ml-4">
                <div className="text-sm font-medium text-gray-600">Pending Clearance</div>
                <div className="text-2xl font-bold text-yellow-600">{pendingClearance}</div>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center">
              <div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center">
                <AlertTriangle className="w-5 h-5 text-red-600" />
              </div>
              <div className="ml-4">
                <div className="text-sm font-medium text-gray-600">Overdue/Bounced</div>
                <div className="text-2xl font-bold text-red-600">{overdueBounced}</div>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center">
              <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                <span className="text-green-600 text-xs font-bold">$</span>
              </div>
              <div className="ml-4">
                <div className="text-sm font-medium text-gray-600">Total Value</div>
                <div className="text-2xl font-bold text-gray-900">${totalAmount.toLocaleString()}</div>
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
                  placeholder="Search by cheque number, payee/payer..."
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
                <SelectItem value="issued">Issued</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="cleared">Cleared</SelectItem>
                <SelectItem value="overdue">Overdue</SelectItem>
                <SelectItem value="bounced">Bounced</SelectItem>
              </SelectContent>
            </Select>
            <Select value={typeFilter} onValueChange={setTypeFilter}>
              <SelectTrigger className="w-40">
                <SelectValue placeholder="Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="issued">Issued</SelectItem>
                <SelectItem value="received">Received</SelectItem>
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

      {/* Cheque Table */}
      {viewMode === "table" && (
        <Card>
          <CardHeader>
            <CardTitle>Cheque Tracking</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Cheque Number</TableHead>
                  <TableHead>Payee/Payer</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead className="text-right">Amount</TableHead>
                  <TableHead>Issue Date</TableHead>
                  <TableHead>Due Date</TableHead>
                  <TableHead>Bank</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-center">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {chequeData.map((cheque) => (
                  <TableRow key={cheque.id} className="hover:bg-gray-50">
                    <TableCell className="font-medium">{cheque.chequeNumber}</TableCell>
                    <TableCell>
                      <div>
                        <div className="font-medium">{cheque.payeePayer}</div>
                        <div className="text-sm text-gray-500">{cheque.gemReference}</div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        cheque.type === "Issued" ? "bg-blue-100 text-blue-800" : "bg-green-100 text-green-800"
                      }`}>
                        {cheque.type}
                      </span>
                    </TableCell>
                    <TableCell className="text-right font-medium">
                      ${cheque.amount.toLocaleString()}
                    </TableCell>
                    <TableCell>{new Date(cheque.issueDate).toLocaleDateString()}</TableCell>
                    <TableCell>{new Date(cheque.dueDate).toLocaleDateString()}</TableCell>
                    <TableCell className="text-sm">{cheque.bankName}</TableCell>
                    <TableCell>
                      <div className="flex items-center">
                        {getStatusIcon(cheque.status)}
                        <span className={`ml-2 px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(cheque.status)}`}>
                          {cheque.status}
                        </span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex justify-center space-x-2">
                        <Button variant="ghost" size="sm" title="Update Status">
                          <CheckCircle className="w-4 h-4" />
                        </Button>
                        <Button variant="ghost" size="sm" title="View Details">
                          <Calendar className="w-4 h-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      )}

      {/* Calendar View */}
      {viewMode === "calendar" && (
        <Card>
          <CardHeader>
            <CardTitle>Cheque Calendar</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="bg-gray-50 p-8 rounded-lg text-center">
              <Calendar className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">Calendar View</h3>
              <p className="text-gray-600">Interactive calendar showing cheque due dates and clearance schedules will be displayed here.</p>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Status Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Cheques by Status</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <div className="flex items-center">
                  <CheckCircle className="w-4 h-4 text-green-600 mr-2" />
                  <span>Cleared</span>
                </div>
                <span className="font-medium">1</span>
              </div>
              <div className="flex justify-between items-center">
                <div className="flex items-center">
                  <Clock className="w-4 h-4 text-yellow-600 mr-2" />
                  <span>Pending</span>
                </div>
                <span className="font-medium">2</span>
              </div>
              <div className="flex justify-between items-center">
                <div className="flex items-center">
                  <AlertTriangle className="w-4 h-4 text-red-600 mr-2" />
                  <span>Overdue</span>
                </div>
                <span className="font-medium">1</span>
              </div>
              <div className="flex justify-between items-center">
                <div className="flex items-center">
                  <XCircle className="w-4 h-4 text-red-600 mr-2" />
                  <span>Bounced</span>
                </div>
                <span className="font-medium">1</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Upcoming Due Dates</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex justify-between items-center p-3 bg-yellow-50 rounded-lg">
                <div>
                  <div className="font-medium">CHQ-456</div>
                  <div className="text-sm text-gray-600">Luxury Jewelry Co</div>
                </div>
                <div className="text-right">
                  <div className="font-medium">Jun 25</div>
                  <div className="text-sm text-gray-600">$18,700</div>
                </div>
              </div>
              <div className="flex justify-between items-center p-3 bg-red-50 rounded-lg">
                <div>
                  <div className="font-medium">CHQ-124</div>
                  <div className="text-sm text-gray-600">Lanka Precious Stones</div>
                </div>
                <div className="text-right">
                  <div className="font-medium text-red-600">Overdue</div>
                  <div className="text-sm text-gray-600">$28,900</div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex space-x-4">
            <Button variant="outline">
              <CheckCircle className="w-4 h-4 mr-2" />
              Update Clearance Status
            </Button>
            <Button variant="outline">
              <Download className="w-4 h-4 mr-2" />
              Cheque Register
            </Button>
            <Button variant="outline">
              <AlertTriangle className="w-4 h-4 mr-2" />
              Overdue Report
            </Button>
            <Button variant="outline">
              <Calendar className="w-4 h-4 mr-2" />
              Set Reminders
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
