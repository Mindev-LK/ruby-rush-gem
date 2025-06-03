
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, Filter, Download, Mail, DollarSign, AlertTriangle, Calendar, Plus } from "lucide-react";

export const AccountsReceivable = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [agingFilter, setAgingFilter] = useState("all");

  const receivablesData = [
    {
      id: "AR001",
      buyerName: "International Gems Ltd",
      invoiceNumber: "INV-2024-001",
      saleDate: "2024-05-15",
      dueDate: "2024-06-15",
      amount: 25400,
      daysOutstanding: 18,
      status: "Current",
      gemType: "Diamond Cut",
      contactEmail: "contact@internationalgems.com"
    },
    {
      id: "AR002",
      buyerName: "Luxury Jewelry Co",
      invoiceNumber: "INV-2024-002",
      saleDate: "2024-04-20",
      dueDate: "2024-05-20",
      amount: 18700,
      daysOutstanding: 43,
      status: "Overdue",
      gemType: "Ruby Cut",
      contactEmail: "orders@luxuryjewelry.com"
    },
    {
      id: "AR003",
      buyerName: "Premium Stones Inc",
      invoiceNumber: "INV-2024-003",
      saleDate: "2024-05-30",
      dueDate: "2024-06-30",
      amount: 9800,
      daysOutstanding: 3,
      status: "Current",
      gemType: "Sapphire Rough",
      contactEmail: "finance@premiumstones.com"
    },
    {
      id: "AR004",
      buyerName: "Global Gems Corp",
      invoiceNumber: "INV-2024-004",
      saleDate: "2024-03-10",
      dueDate: "2024-04-10",
      amount: 32100,
      daysOutstanding: 84,
      status: "Overdue",
      gemType: "Emerald Cut",
      contactEmail: "accounts@globalgems.com"
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Current": return "bg-green-100 text-green-800";
      case "Overdue": return "bg-red-100 text-red-800";
      case "Partial": return "bg-yellow-100 text-yellow-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const getAgingColor = (days: number) => {
    if (days <= 30) return "text-green-600";
    if (days <= 60) return "text-yellow-600";
    return "text-red-600";
  };

  const totalOutstanding = receivablesData.reduce((sum, item) => sum + item.amount, 0);
  const overdueAmount = receivablesData
    .filter(item => item.status === "Overdue")
    .reduce((sum, item) => sum + item.amount, 0);
  const currentMonth = receivablesData
    .filter(item => new Date(item.dueDate).getMonth() === new Date().getMonth())
    .reduce((sum, item) => sum + item.amount, 0);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Accounts Receivable</h1>
          <nav className="text-sm text-gray-500 mt-1">
            Dashboard &gt; Accounts &gt; Receivables
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
                <div className="text-sm font-medium text-gray-600">Total Outstanding</div>
                <div className="text-2xl font-bold text-gray-900">${totalOutstanding.toLocaleString()}</div>
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
              <Calendar className="w-8 h-8 text-green-600" />
              <div className="ml-4">
                <div className="text-sm font-medium text-gray-600">This Month Due</div>
                <div className="text-2xl font-bold text-gray-900">${currentMonth.toLocaleString()}</div>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center">
              <div className="w-8 h-8 bg-yellow-100 rounded-full flex items-center justify-center">
                <span className="text-yellow-600 text-xs font-bold">2</span>
              </div>
              <div className="ml-4">
                <div className="text-sm font-medium text-gray-600">Overdue Count</div>
                <div className="text-2xl font-bold text-yellow-600">2</div>
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
                  placeholder="Search by buyer, invoice number..."
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
                <SelectItem value="current">Current</SelectItem>
                <SelectItem value="overdue">Overdue</SelectItem>
                <SelectItem value="partial">Partial</SelectItem>
              </SelectContent>
            </Select>
            <Select value={agingFilter} onValueChange={setAgingFilter}>
              <SelectTrigger className="w-40">
                <SelectValue placeholder="Aging" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Aging</SelectItem>
                <SelectItem value="0-30">0-30 Days</SelectItem>
                <SelectItem value="31-60">31-60 Days</SelectItem>
                <SelectItem value="60+">60+ Days</SelectItem>
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

      {/* Receivables Table */}
      <Card>
        <CardHeader>
          <CardTitle>Outstanding Receivables</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Buyer Name</TableHead>
                <TableHead>Invoice #</TableHead>
                <TableHead>Sale Date</TableHead>
                <TableHead>Due Date</TableHead>
                <TableHead className="text-right">Amount</TableHead>
                <TableHead>Days Outstanding</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-center">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {receivablesData.map((item) => (
                <TableRow key={item.id} className="hover:bg-gray-50">
                  <TableCell>
                    <div>
                      <div className="font-medium">{item.buyerName}</div>
                      <div className="text-sm text-gray-500">{item.gemType}</div>
                    </div>
                  </TableCell>
                  <TableCell className="font-medium">{item.invoiceNumber}</TableCell>
                  <TableCell>{new Date(item.saleDate).toLocaleDateString()}</TableCell>
                  <TableCell>{new Date(item.dueDate).toLocaleDateString()}</TableCell>
                  <TableCell className="text-right font-medium">
                    ${item.amount.toLocaleString()}
                  </TableCell>
                  <TableCell className={`font-medium ${getAgingColor(item.daysOutstanding)}`}>
                    {item.daysOutstanding} days
                  </TableCell>
                  <TableCell>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(item.status)}`}>
                      {item.status}
                    </span>
                  </TableCell>
                  <TableCell>
                    <div className="flex justify-center space-x-2">
                      <Button variant="ghost" size="sm" title="Send Reminder">
                        <Mail className="w-4 h-4" />
                      </Button>
                      <Button variant="ghost" size="sm" title="Record Payment">
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

      {/* Aging Report */}
      <Card>
        <CardHeader>
          <CardTitle>Aging Analysis</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="text-center p-4 bg-green-50 rounded-lg">
              <div className="text-2xl font-bold text-green-600">$35,200</div>
              <div className="text-sm text-gray-600">0-30 Days</div>
            </div>
            <div className="text-center p-4 bg-yellow-50 rounded-lg">
              <div className="text-2xl font-bold text-yellow-600">$18,700</div>
              <div className="text-sm text-gray-600">31-60 Days</div>
            </div>
            <div className="text-center p-4 bg-red-50 rounded-lg">
              <div className="text-2xl font-bold text-red-600">$32,100</div>
              <div className="text-sm text-gray-600">60+ Days</div>
            </div>
            <div className="text-center p-4 bg-gray-50 rounded-lg">
              <div className="text-2xl font-bold text-gray-600">$86,000</div>
              <div className="text-sm text-gray-600">Total Outstanding</div>
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
              <Mail className="w-4 h-4 mr-2" />
              Send Bulk Reminders
            </Button>
            <Button variant="outline">
              <Download className="w-4 h-4 mr-2" />
              Aging Report
            </Button>
            <Button variant="outline">
              <Download className="w-4 h-4 mr-2" />
              Outstanding Report
            </Button>
            <Button variant="outline">
              Generate Statements
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
