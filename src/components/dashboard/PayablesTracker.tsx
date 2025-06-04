
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { AlertTriangle, Clock, DollarSign, Eye } from "lucide-react";

interface PayableItem {
  id: string;
  sellerName: string;
  amount: number;
  currency: string;
  dueDate: string;
  type: 'receipt' | 'cheque';
  purchaseRef: string;
  status: 'pending' | 'overdue' | 'due-soon';
}

export const PayablesTracker = () => {
  const [payables, setPayables] = useState<PayableItem[]>([
    {
      id: "1",
      sellerName: "Ruby Mines Ltd",
      amount: 15000,
      currency: "USD",
      dueDate: "2024-06-06",
      type: "receipt",
      purchaseRef: "P001",
      status: "due-soon"
    },
    {
      id: "2", 
      sellerName: "Sapphire Traders",
      amount: 8500,
      currency: "USD",
      dueDate: "2024-06-04",
      type: "cheque",
      purchaseRef: "P002",
      status: "overdue"
    },
    {
      id: "3",
      sellerName: "Emerald Suppliers",
      amount: 12000,
      currency: "USD", 
      dueDate: "2024-06-10",
      type: "receipt",
      purchaseRef: "P003",
      status: "pending"
    }
  ]);

  const totalPending = payables.reduce((sum, p) => sum + p.amount, 0);
  const dueSoon = payables.filter(p => p.status === 'due-soon').length;
  const overdue = payables.filter(p => p.status === 'overdue').length;

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'overdue': return 'bg-red-100 text-red-800';
      case 'due-soon': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-blue-100 text-blue-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'overdue': return <AlertTriangle className="w-4 h-4" />;
      case 'due-soon': return <Clock className="w-4 h-4" />;
      default: return <DollarSign className="w-4 h-4" />;
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <DollarSign className="w-5 h-5 mr-2" />
          Payables Tracking
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-3 gap-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-gray-900">${totalPending.toLocaleString()}</div>
            <div className="text-sm text-gray-600">Total Pending</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-yellow-600">{dueSoon}</div>
            <div className="text-sm text-gray-600">Due Soon</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-red-600">{overdue}</div>
            <div className="text-sm text-gray-600">Overdue</div>
          </div>
        </div>

        <div className="space-y-2">
          <h4 className="font-medium text-gray-900">Upcoming Payments</h4>
          {payables.slice(0, 3).map((payable) => (
            <div key={payable.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div className="flex items-center space-x-3">
                {getStatusIcon(payable.status)}
                <div>
                  <div className="font-medium">{payable.sellerName}</div>
                  <div className="text-sm text-gray-500">
                    Due: {new Date(payable.dueDate).toLocaleDateString()}
                  </div>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <Badge className={getStatusColor(payable.status)}>
                  {payable.status}
                </Badge>
                <div className="text-right">
                  <div className="font-semibold">${payable.amount.toLocaleString()}</div>
                  <div className="text-xs text-gray-500">{payable.type}</div>
                </div>
                <Button variant="ghost" size="sm">
                  <Eye className="w-4 h-4" />
                </Button>
              </div>
            </div>
          ))}
        </div>

        <Button className="w-full" variant="outline">
          View All Payables
        </Button>
      </CardContent>
    </Card>
  );
};
