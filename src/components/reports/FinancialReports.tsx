
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Download, FileText, Calendar, Filter, BarChart3, PieChart, TrendingUp, DollarSign } from "lucide-react";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer, LineChart, Line, PieChart as RechartsPieChart, Cell } from "recharts";

export const FinancialReports = () => {
  const [reportType, setReportType] = useState("profit-loss");
  const [dateRange, setDateRange] = useState("this-month");
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");

  // Sample data for different reports
  const profitLossData = [
    { category: "Revenue", subcategory: "Gem Sales", amount: 145000, percentage: 100 },
    { category: "Cost of Goods Sold", subcategory: "Gem Purchases", amount: -89000, percentage: -61.4 },
    { category: "Gross Profit", subcategory: "", amount: 56000, percentage: 38.6 },
    { category: "Operating Expenses", subcategory: "Administrative", amount: -8000, percentage: -5.5 },
    { category: "Operating Expenses", subcategory: "Marketing", amount: -3000, percentage: -2.1 },
    { category: "Net Profit", subcategory: "", amount: 45000, percentage: 31.0 }
  ];

  const monthlyTrends = [
    { month: "Jan", revenue: 120000, expenses: 75000, profit: 45000 },
    { month: "Feb", revenue: 135000, expenses: 85000, profit: 50000 },
    { month: "Mar", revenue: 145000, expenses: 89000, profit: 56000 },
    { month: "Apr", revenue: 160000, expenses: 95000, profit: 65000 },
    { month: "May", revenue: 180000, expenses: 110000, profit: 70000 },
    { month: "Jun", revenue: 145000, expenses: 89000, profit: 56000 }
  ];

  const gemTypeDistribution = [
    { name: "Diamonds", value: 35, amount: 50750 },
    { name: "Rubies", value: 25, amount: 36250 },
    { name: "Sapphires", value: 20, amount: 29000 },
    { name: "Emeralds", value: 15, amount: 21750 },
    { name: "Others", value: 5, amount: 7250 }
  ];

  const investorReturns = [
    { investor: "Investor A", investment: 50000, returns: 15000, roi: 30 },
    { investor: "Investor B", investment: 75000, returns: 22500, roi: 30 },
    { investor: "Investor C", investment: 30000, returns: 9000, roi: 30 },
    { investor: "Investor D", investment: 100000, returns: 30000, roi: 30 }
  ];

  const COLORS = ['#000000', '#4a4a4a', '#8a8a8a', '#b8b8b8', '#d4d4d4'];

  const chartConfig = {
    revenue: {
      label: "Revenue",
      color: "#000000",
    },
    expenses: {
      label: "Expenses",
      color: "#4a4a4a",
    },
    profit: {
      label: "Profit",
      color: "#2d5a2d",
    },
  };

  const renderReportContent = () => {
    switch (reportType) {
      case "profit-loss":
        return (
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Profit & Loss Statement</CardTitle>
                <p className="text-sm text-gray-600">For the period: {dateRange === "custom" ? `${fromDate} to ${toDate}` : dateRange.replace("-", " ")}</p>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-1/3">Category</TableHead>
                      <TableHead className="w-1/3">Description</TableHead>
                      <TableHead className="text-right w-1/6">Amount ($)</TableHead>
                      <TableHead className="text-right w-1/6">% of Revenue</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {profitLossData.map((item, index) => (
                      <TableRow key={index} className={item.category.includes("Profit") ? "bg-gray-50 font-medium" : ""}>
                        <TableCell className="font-medium">{item.category}</TableCell>
                        <TableCell>{item.subcategory}</TableCell>
                        <TableCell className={`text-right font-medium ${item.amount > 0 ? 'text-green-600' : item.amount < 0 ? 'text-red-600' : 'text-gray-900'}`}>
                          {item.amount.toLocaleString()}
                        </TableCell>
                        <TableCell className="text-right">{item.percentage.toFixed(1)}%</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Monthly Trends</CardTitle>
              </CardHeader>
              <CardContent>
                <ChartContainer config={chartConfig} className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={monthlyTrends}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <ChartTooltip content={<ChartTooltipContent />} />
                      <Bar dataKey="revenue" fill="var(--color-revenue)" />
                      <Bar dataKey="expenses" fill="var(--color-expenses)" />
                      <Bar dataKey="profit" fill="var(--color-profit)" />
                    </BarChart>
                  </ResponsiveContainer>
                </ChartContainer>
              </CardContent>
            </Card>
          </div>
        );

      case "sales-analysis":
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Sales by Gem Type</CardTitle>
                </CardHeader>
                <CardContent>
                  <ChartContainer config={chartConfig} className="h-64">
                    <ResponsiveContainer width="100%" height="100%">
                      <RechartsPieChart>
                        <RechartsPieChart data={gemTypeDistribution} cx="50%" cy="50%" outerRadius={80} dataKey="value">
                          {gemTypeDistribution.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                          ))}
                        </RechartsPieChart>
                        <ChartTooltip content={<ChartTooltipContent />} />
                      </RechartsPieChart>
                    </ResponsiveContainer>
                  </ChartContainer>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Monthly Sales Trend</CardTitle>
                </CardHeader>
                <CardContent>
                  <ChartContainer config={chartConfig} className="h-64">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={monthlyTrends}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="month" />
                        <YAxis />
                        <ChartTooltip content={<ChartTooltipContent />} />
                        <Line type="monotone" dataKey="revenue" stroke="var(--color-revenue)" strokeWidth={2} />
                      </LineChart>
                    </ResponsiveContainer>
                  </ChartContainer>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Gem Type Performance</CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Gem Type</TableHead>
                      <TableHead className="text-right">Sales Volume</TableHead>
                      <TableHead className="text-right">Revenue ($)</TableHead>
                      <TableHead className="text-right">Avg Price ($)</TableHead>
                      <TableHead className="text-right">Market Share (%)</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {gemTypeDistribution.map((gem, index) => (
                      <TableRow key={index}>
                        <TableCell className="font-medium">{gem.name}</TableCell>
                        <TableCell className="text-right">{Math.floor(gem.amount / 1000)}</TableCell>
                        <TableCell className="text-right">{gem.amount.toLocaleString()}</TableCell>
                        <TableCell className="text-right">{(gem.amount / Math.floor(gem.amount / 1000)).toLocaleString()}</TableCell>
                        <TableCell className="text-right">{gem.value}%</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </div>
        );

      case "investor-returns":
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center">
                    <DollarSign className="w-8 h-8 text-green-600" />
                    <div className="ml-4">
                      <div className="text-sm font-medium text-gray-600">Total Investments</div>
                      <div className="text-2xl font-bold text-gray-900">$255,000</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center">
                    <TrendingUp className="w-8 h-8 text-blue-600" />
                    <div className="ml-4">
                      <div className="text-sm font-medium text-gray-600">Total Returns</div>
                      <div className="text-2xl font-bold text-green-600">$76,500</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center">
                    <BarChart3 className="w-8 h-8 text-purple-600" />
                    <div className="ml-4">
                      <div className="text-sm font-medium text-gray-600">Average ROI</div>
                      <div className="text-2xl font-bold text-purple-600">30%</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Investor Performance</CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Investor</TableHead>
                      <TableHead className="text-right">Investment ($)</TableHead>
                      <TableHead className="text-right">Returns ($)</TableHead>
                      <TableHead className="text-right">ROI (%)</TableHead>
                      <TableHead className="text-right">Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {investorReturns.map((investor, index) => (
                      <TableRow key={index}>
                        <TableCell className="font-medium">{investor.investor}</TableCell>
                        <TableCell className="text-right">{investor.investment.toLocaleString()}</TableCell>
                        <TableCell className="text-right text-green-600">{investor.returns.toLocaleString()}</TableCell>
                        <TableCell className="text-right font-medium">{investor.roi}%</TableCell>
                        <TableCell className="text-right">
                          <span className="px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                            Active
                          </span>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Investment Distribution</CardTitle>
              </CardHeader>
              <CardContent>
                <ChartContainer config={chartConfig} className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={investorReturns}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="investor" />
                      <YAxis />
                      <ChartTooltip content={<ChartTooltipContent />} />
                      <Bar dataKey="investment" fill="#000000" />
                      <Bar dataKey="returns" fill="#2d5a2d" />
                    </BarChart>
                  </ResponsiveContainer>
                </ChartContainer>
              </CardContent>
            </Card>
          </div>
        );

      default:
        return (
          <Card>
            <CardContent className="p-8 text-center">
              <FileText className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">Select a Report Type</h3>
              <p className="text-gray-600">Choose a report type from the dropdown above to view detailed financial information.</p>
            </CardContent>
          </Card>
        );
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Financial Reports</h1>
          <nav className="text-sm text-gray-500 mt-1">
            Dashboard &gt; Reports &gt; Financial Reports
          </nav>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline">
            <Download className="w-4 h-4 mr-2" />
            Export PDF
          </Button>
          <Button variant="outline">
            <Download className="w-4 h-4 mr-2" />
            Export Excel
          </Button>
        </div>
      </div>

      {/* Report Configuration */}
      <Card>
        <CardHeader>
          <CardTitle>Report Configuration</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Report Type</label>
              <Select value={reportType} onValueChange={setReportType}>
                <SelectTrigger>
                  <SelectValue placeholder="Select report type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="profit-loss">Profit & Loss Statement</SelectItem>
                  <SelectItem value="sales-analysis">Sales Analysis</SelectItem>
                  <SelectItem value="investor-returns">Investor Returns</SelectItem>
                  <SelectItem value="cash-flow">Cash Flow Statement</SelectItem>
                  <SelectItem value="balance-sheet">Balance Sheet</SelectItem>
                  <SelectItem value="inventory-valuation">Inventory Valuation</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Date Range</label>
              <Select value={dateRange} onValueChange={setDateRange}>
                <SelectTrigger>
                  <SelectValue placeholder="Select date range" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="this-month">This Month</SelectItem>
                  <SelectItem value="last-month">Last Month</SelectItem>
                  <SelectItem value="this-quarter">This Quarter</SelectItem>
                  <SelectItem value="last-quarter">Last Quarter</SelectItem>
                  <SelectItem value="this-year">This Year</SelectItem>
                  <SelectItem value="custom">Custom Range</SelectItem>
                </SelectContent>
              </Select>
            </div>
            {dateRange === "custom" && (
              <>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">From Date</label>
                  <Input 
                    type="date" 
                    value={fromDate}
                    onChange={(e) => setFromDate(e.target.value)}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">To Date</label>
                  <Input 
                    type="date" 
                    value={toDate}
                    onChange={(e) => setToDate(e.target.value)}
                  />
                </div>
              </>
            )}
          </div>
          <div className="flex space-x-4 mt-4">
            <Button className="bg-black text-white hover:bg-gray-800">
              <BarChart3 className="w-4 h-4 mr-2" />
              Generate Report
            </Button>
            <Button variant="outline">
              <Filter className="w-4 h-4 mr-2" />
              Advanced Filters
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Report Content */}
      {renderReportContent()}

      {/* Saved Reports */}
      <Card>
        <CardHeader>
          <CardTitle>Saved Reports</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 border rounded-lg hover:bg-gray-50 cursor-pointer">
              <div className="flex items-center mb-2">
                <FileText className="w-5 h-5 text-gray-600 mr-2" />
                <span className="font-medium">Monthly P&L Report</span>
              </div>
              <p className="text-sm text-gray-600 mb-2">Last generated: 2024-06-01</p>
              <div className="flex space-x-2">
                <Button variant="outline" size="sm">View</Button>
                <Button variant="outline" size="sm">Download</Button>
              </div>
            </div>
            <div className="p-4 border rounded-lg hover:bg-gray-50 cursor-pointer">
              <div className="flex items-center mb-2">
                <PieChart className="w-5 h-5 text-gray-600 mr-2" />
                <span className="font-medium">Sales Analysis Q2</span>
              </div>
              <p className="text-sm text-gray-600 mb-2">Last generated: 2024-06-01</p>
              <div className="flex space-x-2">
                <Button variant="outline" size="sm">View</Button>
                <Button variant="outline" size="sm">Download</Button>
              </div>
            </div>
            <div className="p-4 border rounded-lg hover:bg-gray-50 cursor-pointer">
              <div className="flex items-center mb-2">
                <TrendingUp className="w-5 h-5 text-gray-600 mr-2" />
                <span className="font-medium">Investor ROI Report</span>
              </div>
              <p className="text-sm text-gray-600 mb-2">Last generated: 2024-05-28</p>
              <div className="flex space-x-2">
                <Button variant="outline" size="sm">View</Button>
                <Button variant="outline" size="sm">Download</Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Export Options */}
      <Card>
        <CardHeader>
          <CardTitle>Export & Sharing Options</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-medium mb-3">Export Formats</h3>
              <div className="space-y-2">
                <Button variant="outline" className="w-full justify-start">
                  <Download className="w-4 h-4 mr-2" />
                  Export to PDF
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Download className="w-4 h-4 mr-2" />
                  Export to Excel
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Download className="w-4 h-4 mr-2" />
                  Export to Google Sheets
                </Button>
              </div>
            </div>
            <div>
              <h3 className="font-medium mb-3">Automated Reports</h3>
              <div className="space-y-2">
                <Button variant="outline" className="w-full justify-start">
                  <Calendar className="w-4 h-4 mr-2" />
                  Schedule Monthly Reports
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Calendar className="w-4 h-4 mr-2" />
                  Schedule Quarterly Reports
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <FileText className="w-4 h-4 mr-2" />
                  Custom Report Builder
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
