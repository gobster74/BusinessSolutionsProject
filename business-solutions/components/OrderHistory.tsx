import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "./ui/table";
import { Button } from "./ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "./ui/dialog";
import { Input } from "./ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Eye } from "lucide-react";
import { Badge } from "./ui/badge";

interface OrderItem {
  name: string;
  quantity: number;
  price: number;
}

interface Order {
  id: string;
  dateTime: string;
  waiter: string;
  table: string;
  total: number;
  paymentMethod: string;
  status: string;
  items: OrderItem[];
}

const mockOrders: Order[] = [
  {
    id: 'ORD-1234',
    dateTime: '2025-11-01 14:45',
    waiter: 'Sarah',
    table: 'Table 5',
    total: 42.50,
    paymentMethod: 'Credit Card',
    status: 'Completed',
    items: [
      { name: 'Classic Smash Burger', quantity: 2, price: 12.99 },
      { name: 'Cheese Fries', quantity: 1, price: 5.99 },
      { name: 'Soda', quantity: 2, price: 2.99 },
    ],
  },
  {
    id: 'ORD-1233',
    dateTime: '2025-11-01 14:30',
    waiter: 'Mike',
    table: 'Table 2',
    total: 58.75,
    paymentMethod: 'Cash',
    status: 'Completed',
    items: [
      { name: 'Double Smash Burger', quantity: 2, price: 16.99 },
      { name: 'Onion Rings', quantity: 2, price: 6.49 },
      { name: 'Milkshake', quantity: 2, price: 5.99 },
    ],
  },
  {
    id: 'ORD-1232',
    dateTime: '2025-11-01 14:15',
    waiter: 'Sarah',
    table: 'Table 8',
    total: 35.00,
    paymentMethod: 'Credit Card',
    status: 'Completed',
    items: [
      { name: 'Classic Smash Burger', quantity: 2, price: 12.99 },
      { name: 'Regular Fries', quantity: 2, price: 4.49 },
    ],
  },
  {
    id: 'ORD-1231',
    dateTime: '2025-11-01 14:00',
    waiter: 'Jessica',
    table: 'Table 3',
    total: 67.25,
    paymentMethod: 'Debit Card',
    status: 'Completed',
    items: [
      { name: 'Triple Smash Burger', quantity: 1, price: 21.99 },
      { name: 'Classic Smash Burger', quantity: 2, price: 12.99 },
      { name: 'Loaded Fries', quantity: 1, price: 7.99 },
      { name: 'Soda', quantity: 3, price: 2.99 },
    ],
  },
  {
    id: 'ORD-1230',
    dateTime: '2025-11-01 13:45',
    waiter: 'Mike',
    table: 'Table 6',
    total: 45.50,
    paymentMethod: 'Credit Card',
    status: 'Completed',
    items: [
      { name: 'Double Smash Burger', quantity: 2, price: 16.99 },
      { name: 'Cheese Fries', quantity: 1, price: 5.99 },
      { name: 'Iced Tea', quantity: 2, price: 2.49 },
    ],
  },
];

export function OrderHistory() {
  const [orders] = useState<Order[]>(mockOrders);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [isDetailDialogOpen, setIsDetailDialogOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterWaiter, setFilterWaiter] = useState('all');
  const [filterPayment, setFilterPayment] = useState('all');

  const waiters = Array.from(new Set(orders.map(order => order.waiter)));
  const paymentMethods = Array.from(new Set(orders.map(order => order.paymentMethod)));

  const filteredOrders = orders.filter(order => {
    const matchesSearch = order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         order.table.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesWaiter = filterWaiter === 'all' || order.waiter === filterWaiter;
    const matchesPayment = filterPayment === 'all' || order.paymentMethod === filterPayment;
    return matchesSearch && matchesWaiter && matchesPayment;
  });

  const openOrderDetails = (order: Order) => {
    setSelectedOrder(order);
    setIsDetailDialogOpen(true);
  };

  const generateReceipt = (order: Order) => {
    let receipt = `BUNBELIEVABLE SMASH BURGERS\n`;
    receipt += `================================\n\n`;
    receipt += `Order ID: ${order.id}\n`;
    receipt += `Date/Time: ${order.dateTime}\n`;
    receipt += `Table: ${order.table}\n`;
    receipt += `Waiter: ${order.waiter}\n\n`;
    receipt += `ITEMS:\n`;
    receipt += `--------------------------------\n`;
    order.items.forEach(item => {
      receipt += `${item.quantity}x ${item.name}\n`;
      receipt += `    $${item.price.toFixed(2)} each = $${(item.quantity * item.price).toFixed(2)}\n`;
    });
    receipt += `--------------------------------\n`;
    receipt += `TOTAL: $${order.total.toFixed(2)}\n`;
    receipt += `Payment: ${order.paymentMethod}\n\n`;
    receipt += `Thank you for dining with us!\n`;
    
    const blob = new Blob([receipt], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `receipt-${order.id}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Order History</CardTitle>
        <CardDescription>View and manage all completed orders</CardDescription>
        
        <div className="flex gap-4 pt-4 flex-wrap">
          <Input
            placeholder="Search by order ID or table..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="max-w-xs"
          />
          <Select value={filterWaiter} onValueChange={setFilterWaiter}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Filter by waiter" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Waiters</SelectItem>
              {waiters.map(waiter => (
                <SelectItem key={waiter} value={waiter}>{waiter}</SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select value={filterPayment} onValueChange={setFilterPayment}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Filter by payment" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Methods</SelectItem>
              {paymentMethods.map(method => (
                <SelectItem key={method} value={method}>{method}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Order ID</TableHead>
              <TableHead>Date/Time</TableHead>
              <TableHead>Waiter</TableHead>
              <TableHead>Table</TableHead>
              <TableHead>Total</TableHead>
              <TableHead>Payment</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredOrders.map((order) => (
              <TableRow key={order.id}>
                <TableCell>{order.id}</TableCell>
                <TableCell>{order.dateTime}</TableCell>
                <TableCell>{order.waiter}</TableCell>
                <TableCell>{order.table}</TableCell>
                <TableCell>${order.total.toFixed(2)}</TableCell>
                <TableCell>{order.paymentMethod}</TableCell>
                <TableCell>
                  <Badge variant="outline" className="border-green-500 text-green-600">
                    {order.status}
                  </Badge>
                </TableCell>
                <TableCell>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => openOrderDetails(order)}
                  >
                    <Eye className="h-4 w-4" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        <Dialog open={isDetailDialogOpen} onOpenChange={setIsDetailDialogOpen}>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Order Details - {selectedOrder?.id}</DialogTitle>
              <DialogDescription>
                Detailed information and itemized list
              </DialogDescription>
            </DialogHeader>
            {selectedOrder && (
              <div className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-muted-foreground">Date/Time</p>
                    <p>{selectedOrder.dateTime}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Table</p>
                    <p>{selectedOrder.table}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Waiter</p>
                    <p>{selectedOrder.waiter}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Payment Method</p>
                    <p>{selectedOrder.paymentMethod}</p>
                  </div>
                </div>

                <div>
                  <h3 className="mb-3">Items</h3>
                  <div className="border rounded-lg">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Item</TableHead>
                          <TableHead>Quantity</TableHead>
                          <TableHead>Price</TableHead>
                          <TableHead>Subtotal</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {selectedOrder.items.map((item, index) => (
                          <TableRow key={index}>
                            <TableCell>{item.name}</TableCell>
                            <TableCell>{item.quantity}</TableCell>
                            <TableCell>${item.price.toFixed(2)}</TableCell>
                            <TableCell>${(item.quantity * item.price).toFixed(2)}</TableCell>
                          </TableRow>
                        ))}
                        <TableRow>
                          <TableCell colSpan={3} className="text-right">Total</TableCell>
                          <TableCell>${selectedOrder.total.toFixed(2)}</TableCell>
                        </TableRow>
                      </TableBody>
                    </Table>
                  </div>
                </div>

                <div className="flex gap-2">
                  <Button 
                    onClick={() => generateReceipt(selectedOrder)}
                    className="bg-orange-500 hover:bg-orange-600"
                  >
                    Generate Receipt
                  </Button>
                  <Button variant="outline" onClick={() => setIsDetailDialogOpen(false)}>
                    Close
                  </Button>
                </div>
              </div>
            )}
          </DialogContent>
        </Dialog>
      </CardContent>
    </Card>
  );
}
