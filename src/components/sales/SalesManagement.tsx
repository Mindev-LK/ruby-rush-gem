
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, Filter, Download, Eye, Edit, Plus } from "lucide-react";

export const SalesManagement = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const salesData = [
    {
      id: "S001",
      gemType: "Diamond Cut",
      buyer: "International Gems Ltd",
      saleDate: "2024-06-02",
      salePrice: 25400,
      profit: 12900,
      paymentStatus: "Paid",
      gemImage: "💎"
    },
    {
      id: "S002",
      gemType: "Ruby Cut",
      buyer: "Luxury Jewelry Co",
      saleDate: "2024-06-01",
      salePrice: 18700,
      profit: 6200,
      paymentStatus: "Pending",
      gemImage: "💎"
    },
    {
      id: "S003",
      gemType: "Sapphire Rough",
      buyer: "Premium Stones Inc",
      saleDate: "2024-06-01",
      salePrice: 9800,
      profit: 900,
      paymentStatus: "Partial",
      gemImage: "💎"
    },
    {
      id: "S004",
      gemType: "Emerald Cut",
      buyer: "Global Gems Corp",
      saleDate: "2024-05-30",
      salePrice: 32100,
      profit: 16500,
      paymentStatus: "Paid",
      gemImage: "💎"
    }
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case "Paid": return "bg-green-100 text-green-800";
      case "Pending": return "bg-yellow-100 text-yellow-800";
      case "Partial": return "bg-orange-100 text-orange-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const totalSales = salesData.reduce((sum, sale) => sum + sale.salePrice, 0);
  const totalProfit = salesData.reduce((sum, sale) => sum + sale.profit, 0);
  const thisMonthSales = salesData.filter(sale => 
    new Date(sale.saleDate).getMonth() === new Date().getMonth()
  ).length;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Sales Management</h1>
          <nav className="text-sm text-gray-500 mt-1">
            Dashboard &gt; Sales Management
          </nav>
        </div>
        <Button className="bg-black text-white hover:bg-gray-800">
          <Plus className="w-4 h-4 mr-2" />
          Record New Sale
        </Button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="text-sm font-medium text-gray-600">Total Sales</div>
            <div className="text-2xl font-bold text-gray-900">${totalSales.toLocaleString()}</div>
            <div className="text-xs text-gray-500">All time</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-sm font-medium text-gray-600">This Month</div>
            <div className="text-2xl font-bold text-gray-900">{thisMonthSales}</div>
            <div className="text-xs text-gray-500">Sales transactions</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-sm font-medium text-gray-600">Total Profit</div>
            <div className="text-2xl font-bold text-green-600">${totalProfit.toLocaleString()}</div>
            <div className="text-xs text-gray-500">From all sales</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-sm font-medium text-gray-600">Pending Payments</div>
            <div className="text-2xl font-bold text-yellow-600">2</div>
            <div className="text-xs text-gray-500">Require follow-up</div>
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
                  placeholder="Search by buyer, gem type, or sale ID..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-40">
                <SelectValue placeholder="Payment Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="paid">Paid</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="partial">Partial</SelectItem>
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

      {/* Sales Table */}
      <Card>
        <CardHeader>
          <CardTitle>Sales Transactions</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Sale ID</TableHead>
                <TableHead>Gem Details</TableHead>
                <TableHead>Buyer</TableHead>
                <TableHead>Sale Date</TableHead>
                <TableHead className="text-right">Sale Price</TableHead>
                <TableHead className="text-right">Profit</TableHead>
                <TableHead>Payment Status</TableHead>
                <TableHead className="text-center">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {salesData.map((sale) => (
                <TableRow key={sale.id} className="hover:bg-gray-50">
                  <TableCell className="font-medium">{sale.id}</TableCell>
                  <TableCell>
                    <div className="flex items-center">
                      <span className="text-lg mr-2">{sale.gemImage}</span>
                      <div>
                        <div className="font-medium">{sale.gemType}</div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>{sale.buyer}</TableCell>
                  <TableCell>{new Date(sale.saleDate).toLocaleDateString()}</TableCell>
                  <TableCell className="text-right font-medium">
                    ${sale.salePrice.toLocaleString()}
                  </TableCell>
                  <TableCell className="text-right font-medium text-green-600">
                    ${sale.profit.toLocaleString()}
                  </TableCell>
                  <TableCell>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(sale.paymentStatus)}`}>
                      {sale.paymentStatus}
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

      {/* Export Options */}
      <Card>
        <CardHeader>
          <CardTitle>Export Options</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex space-x-4">
            <Button variant="outline">
              <Download className="w-4 h-4 mr-2" />
              Export to Excel
            </Button>
            <Button variant="outline">
              <Download className="w-4 h-4 mr-2" />
              Export to PDF
            </Button>
            <Button variant="outline">
              <Download className="w-4 h-4 mr-2" />
              Google Sheets
            </Button>
            <Button variant="outline">
              Custom Report
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
