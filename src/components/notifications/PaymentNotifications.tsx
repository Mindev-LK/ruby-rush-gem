
import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { X, Clock, ExternalLink } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

interface PaymentNotification {
  id: string;
  sellerName: string;
  amount: number;
  currency: string;
  dueDate: string;
  purchaseRef: string;
  hoursUntilDue: number;
  type: 'due-soon' | 'overdue';
}

interface PaymentNotificationsProps {
  onNavigateToPayment: (purchaseRef: string) => void;
}

export const PaymentNotifications = ({ onNavigateToPayment }: PaymentNotificationsProps) => {
  const [notifications, setNotifications] = useState<PaymentNotification[]>([
    {
      id: "1",
      sellerName: "Ruby Mines Ltd",
      amount: 15000,
      currency: "USD", 
      dueDate: "2024-06-06",
      purchaseRef: "P001",
      hoursUntilDue: 36,
      type: "due-soon"
    },
    {
      id: "2",
      sellerName: "Sapphire Traders", 
      amount: 8500,
      currency: "USD",
      dueDate: "2024-06-04",
      purchaseRef: "P002",
      hoursUntilDue: -12,
      type: "overdue"
    }
  ]);

  const [snoozeModal, setSnoozeModal] = useState<{ open: boolean; notificationId: string }>({
    open: false,
    notificationId: ""
  });

  const dismissNotification = (id: string) => {
    setNotifications(notifications.filter(n => n.id !== id));
  };

  const snoozeNotification = (id: string, hours: number) => {
    // In a real app, this would update the notification schedule
    dismissNotification(id);
    setSnoozeModal({ open: false, notificationId: "" });
  };

  const markAsRead = (id: string) => {
    // Mark as read but keep in list
    console.log(`Marking notification ${id} as read`);
  };

  const getNotificationColor = (type: string) => {
    return type === 'overdue' ? 'border-red-500 bg-red-50' : 'border-yellow-500 bg-yellow-50';
  };

  if (notifications.length === 0) return null;

  return (
    <div className="fixed top-4 right-4 z-50 space-y-2 w-80">
      {notifications.map((notification) => (
        <Card key={notification.id} className={`${getNotificationColor(notification.type)} border-2`}>
          <CardContent className="p-4">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center space-x-2 mb-2">
                  <Clock className="w-4 h-4" />
                  <Badge variant={notification.type === 'overdue' ? 'destructive' : 'secondary'}>
                    {notification.type === 'overdue' ? 'OVERDUE' : 'DUE SOON'}
                  </Badge>
                </div>
                <h4 className="font-medium text-gray-900">{notification.sellerName}</h4>
                <p className="text-sm text-gray-600">
                  ${notification.amount.toLocaleString()} {notification.currency}
                </p>
                <p className="text-xs text-gray-500">
                  Due: {new Date(notification.dueDate).toLocaleDateString()}
                </p>
                <p className="text-xs text-gray-500">
                  Ref: {notification.purchaseRef}
                </p>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => dismissNotification(notification.id)}
                className="w-6 h-6 p-0"
              >
                <X className="w-4 h-4" />
              </Button>
            </div>
            
            <div className="flex space-x-2 mt-3">
              <Button 
                size="sm" 
                variant="outline"
                onClick={() => onNavigateToPayment(notification.purchaseRef)}
                className="flex-1"
              >
                <ExternalLink className="w-3 h-3 mr-1" />
                Pay Now
              </Button>
              <Button
                size="sm"
                variant="outline"
                onClick={() => setSnoozeModal({ open: true, notificationId: notification.id })}
              >
                <Clock className="w-3 h-3" />
              </Button>
            </div>
          </CardContent>
        </Card>
      ))}

      <Dialog open={snoozeModal.open} onOpenChange={(open) => setSnoozeModal({ ...snoozeModal, open })}>
        <DialogContent className="max-w-sm">
          <DialogHeader>
            <DialogTitle>Snooze Notification</DialogTitle>
          </DialogHeader>
          <div className="space-y-2">
            <Button 
              variant="outline" 
              className="w-full"
              onClick={() => snoozeNotification(snoozeModal.notificationId, 1)}
            >
              Snooze for 1 hour
            </Button>
            <Button 
              variant="outline" 
              className="w-full"
              onClick={() => snoozeNotification(snoozeModal.notificationId, 6)}
            >
              Snooze for 6 hours
            </Button>
            <Button 
              variant="outline" 
              className="w-full"
              onClick={() => snoozeNotification(snoozeModal.notificationId, 24)}
            >
              Snooze for 24 hours
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};
