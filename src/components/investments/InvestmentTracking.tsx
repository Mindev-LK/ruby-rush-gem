
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, Filter, Download, Calculator, TrendingUp } from "lucide-react";

export const InvestmentTracking = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const investmentData = [
    {
      id: "INV001",
      gemType: "Ruby Rough",
      purchaseDate: "2024-05-15",
      purchaseAmount: 25000,
      investors: [
        { name: "John Smith", ratio: 40, amount: 10000 },
        { name: "Sarah Johnson", ratio: 60, amount: 15000 }
      ],
      status: "Active",
      currentValue: 28500,
      expectedReturn: 35000,
      actualReturn: null
    },
    {
      id: "INV002",
      gemType: "Sapphire Cut",
      purchaseDate: "2024-04-20",
      purchaseAmount: 18000,
      investors: [
        { name: "Michael Brown", ratio: 100, amount: 18000 }
      ],
      status: "Sold",
      currentValue: 21600,
      expectedReturn: 22000,
      actualReturn: 21600
    },
    {
      id: "INV003",
      gemType: "Emerald Rough",
      purchaseDate: "2024-06-01",
      purchaseAmount: 32000,
      investors: [
        { name: "Emily Davis", ratio: 30, amount: 9600 },
        { name: "John Smith", ratio: 45, amount: 14400 },
        { name: "Sarah Johnson", ratio: 25, amount: 8000 }
      ],
      status: "Active",
      currentValue: 36800,
      expectedReturn: 42000,
      actualReturn: null
    }
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case "Active": return "bg-blue-100 text-blue-800";
      case "Sold": return "bg-green-100 text-green-800";
      case "Reserved": return "bg-yellow-100 text-yellow-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const totalInvestments = investmentData.reduce((sum, inv) => sum + inv.purchaseAmount, 0);
  const activeGems = investmentData.filter(inv => inv.status === "Active").length;
  const totalCurrentValue = investmentData.reduce((sum, inv) => sum + inv.currentValue, 0);
  const totalExpectedReturns = investmentData.reduce((sum, inv) => sum + inv.expectedReturn, 0);

  return (
    <div className="space-y-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Investment Tracking</h1>
        <nav className="text-sm text-gray-500 mt-1">
          Dashboard &gt; Investment Tracking
        </nav>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="text-sm font-medium text-gray-600">Total Investments</div>
            <div className="text-2xl font-bold text-gray-900">${totalInvestments.toLocaleString()}</div>
            <div className="text-xs text-gray-500">Across all gems</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-sm font-medium text-gray-600">Active Gems</div>
            <div className="text-2xl font-bold text-blue-600">{activeGems}</div>
            <div className="text-xs text-gray-500">Currently invested</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-sm font-medium text-gray-600">Current Value</div>
            <div className="text-2xl font-bold text-green-600">${totalCurrentValue.toLocaleString()}</div>
            <div className="text-xs text-gray-500">Market valuation</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-sm font-medium text-gray-600">Expected Returns</div>
            <div className="text-2xl font-bold text-green-600">${totalExpectedReturns.toLocaleString()}</div>
            <div className="text-xs text-gray-500">Projected value</div>
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
                  placeholder="Search by gem type, investor, or investment ID..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-40">
                <SelectValue placeholder="Investment Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="sold">Sold</SelectItem>
                <SelectItem value="reserved">Reserved</SelectItem>
              </SelectContent>
            </Select>
            <Select>
              <SelectTrigger className="w-40">
                <SelectValue placeholder="Select Investor" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Investors</SelectItem>
                <SelectItem value="john">John Smith</SelectItem>
                <SelectItem value="sarah">Sarah Johnson</SelectItem>
                <SelectItem value="michael">Michael Brown</SelectItem>
                <SelectItem value="emily">Emily Davis</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline">
              <Filter className="w-4 h-4 mr-2" />
              Advanced Filters
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Investment Overview Dashboard */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Calculator className="w-5 h-5 mr-2" />
            Investment Portfolio Overview
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div>
              <h4 className="font-medium text-gray-900 mb-3">Investment by Gem Type</h4>
              <div className="space-y-2">
                <div className="flex justify-between items-center p-2 bg-gray-50 rounded">
                  <span className="text-sm">Ruby Rough</span>
                  <span className="font-medium">$25,000 (33%)</span>
                </div>
                <div className="flex justify-between items-center p-2 bg-gray-50 rounded">
                  <span className="text-sm">Emerald Rough</span>
                  <span className="font-medium">$32,000 (43%)</span>
                </div>
                <div className="flex justify-between items-center p-2 bg-gray-50 rounded">
                  <span className="text-sm">Sapphire Cut</span>
                  <span className="font-medium">$18,000 (24%)</span>
                </div>
              </div>
            </div>
            <div>
              <h4 className="font-medium text-gray-900 mb-3">Performance Metrics</h4>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Total ROI</span>
                  <span className="font-medium text-green-600 flex items-center">
                    <TrendingUp className="w-4 h-4 mr-1" />
                    16.8%
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Average Hold Period</span>
                  <span className="font-medium">45 days</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Success Rate</span>
                  <span className="font-medium text-green-600">92%</span>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Investment Tracking Table */}
      <Card>
        <CardHeader>
          <CardTitle>Gem Investment Details</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Investment ID</TableHead>
                <TableHead>Gem Details</TableHead>
                <TableHead>Purchase Date</TableHead>
                <TableHead>Investors</TableHead>
                <TableHead className="text-right">Investment Amount</TableHead>
                <TableHead className="text-right">Current Value</TableHead>
                <TableHead className="text-right">Expected Return</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-center">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {investmentData.map((investment) => (
                <TableRow key={investment.id} className="hover:bg-gray-50">
                  <TableCell className="font-medium">{investment.id}</TableCell>
                  <TableCell>
                    <div className="flex items-center">
                      <span className="text-lg mr-2">💎</span>
                      <div>
                        <div className="font-medium">{investment.gemType}</div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>{new Date(investment.purchaseDate).toLocaleDateString()}</TableCell>
                  <TableCell>
                    <div className="space-y-1">
                      {investment.investors.map((investor, index) => (
                        <div key={index} className="text-xs">
                          <span className="font-medium">{investor.name}</span>
                          <span className="text-gray-500 ml-1">
                            ({investor.ratio}% - ${investor.amount.toLocaleString()})
                          </span>
                        </div>
                      ))}
                    </div>
                  </TableCell>
                  <TableCell className="text-right font-medium">
                    ${investment.purchaseAmount.toLocaleString()}
                  </TableCell>
                  <TableCell className="text-right font-medium text-blue-600">
                    ${investment.currentValue.toLocaleString()}
                  </TableCell>
                  <TableCell className="text-right font-medium text-green-600">
                    ${investment.expectedReturn.toLocaleString()}
                  </TableCell>
                  <TableCell>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(investment.status)}`}>
                      {investment.status}
                    </span>
                  </TableCell>
                  <TableCell>
                    <div className="flex justify-center space-x-2">
                      <Button variant="ghost" size="sm">
                        View
                      </Button>
                      <Button variant="ghost" size="sm">
                        Distribute
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Distribution Calculation Tools */}
      <Card>
        <CardHeader>
          <CardTitle>Profit Distribution Calculator</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Button variant="outline" className="h-20 flex flex-col">
              <Calculator className="w-6 h-6 mb-2" />
              Calculate Returns
            </Button>
            <Button variant="outline" className="h-20 flex flex-col">
              <Download className="w-6 h-6 mb-2" />
              Generate Statements
            </Button>
            <Button variant="outline" className="h-20 flex flex-col">
              <TrendingUp className="w-6 h-6 mb-2" />
              Performance Report
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
