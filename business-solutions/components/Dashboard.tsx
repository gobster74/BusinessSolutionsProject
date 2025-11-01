import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Alert, AlertDescription, AlertTitle } from "./ui/alert";
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { DollarSign, TrendingUp, ShoppingCart, AlertTriangle, Users } from "lucide-react";

const salesData = [
  { day: 'Mon', revenue: 1250, orders: 45 },
  { day: 'Tue', revenue: 1480, orders: 52 },
  { day: 'Wed', revenue: 1320, orders: 48 },
  { day: 'Thu', revenue: 1650, orders: 58 },
  { day: 'Fri', revenue: 2100, orders: 72 },
  { day: 'Sat', revenue: 2450, orders: 85 },
  { day: 'Sun', revenue: 2180, orders: 78 },
];

const lowInventoryItems = [
  { name: 'Beef Patties', current: 45, minimum: 100 },
  { name: 'Brioche Buns', current: 28, minimum: 80 },
  { name: 'Cheddar Cheese', current: 15, minimum: 50 },
];

const recentOrders = [
  { id: 'ORD-1234', time: '2:45 PM', table: 'Table 5', waiter: 'Sarah', total: 42.50, status: 'Completed' },
  { id: 'ORD-1233', time: '2:30 PM', table: 'Table 2', waiter: 'Mike', total: 58.75, status: 'Completed' },
  { id: 'ORD-1232', time: '2:15 PM', table: 'Table 8', waiter: 'Sarah', total: 35.00, status: 'Completed' },
  { id: 'ORD-1231', time: '2:00 PM', table: 'Table 3', waiter: 'Jessica', total: 67.25, status: 'Completed' },
];

export function Dashboard() {
  const totalRevenue = salesData.reduce((sum, day) => sum + day.revenue, 0);
  const totalOrders = salesData.reduce((sum, day) => sum + day.orders, 0);
  const avgOrderValue = totalRevenue / totalOrders;

  return (
    <div className="space-y-6">
      {/* Low Inventory Alerts */}
      {lowInventoryItems.length > 0 && (
        <Alert className="border-orange-500 bg-orange-50">
          <AlertTriangle className="h-4 w-4 text-orange-600" />
          <AlertTitle>Low Inventory Alert</AlertTitle>
          <AlertDescription>
            {lowInventoryItems.length} item{lowInventoryItems.length > 1 ? 's' : ''} running low:{' '}
            {lowInventoryItems.map(item => item.name).join(', ')}
          </AlertDescription>
        </Alert>
      )}

      {/* Key Metrics */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle>Total Revenue</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl">${totalRevenue.toFixed(2)}</div>
            <p className="text-xs text-muted-foreground">This week</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle>Total Orders</CardTitle>
            <ShoppingCart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl">{totalOrders}</div>
            <p className="text-xs text-muted-foreground">This week</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle>Avg Order Value</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl">${avgOrderValue.toFixed(2)}</div>
            <p className="text-xs text-muted-foreground">This week</p>
          </CardContent>
        </Card>
      </div>

      {/* Charts */}
      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Weekly Revenue</CardTitle>
            <CardDescription>Revenue trend for the current week</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={salesData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="day" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="revenue" fill="#f97316" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Order Volume</CardTitle>
            <CardDescription>Number of orders per day</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={salesData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="day" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="orders" stroke="#f97316" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Recent Activity */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Orders</CardTitle>
          <CardDescription>Latest completed orders</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recentOrders.map((order) => (
              <div key={order.id} className="flex items-center justify-between border-b pb-3 last:border-0 last:pb-0">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="font-medium">{order.id}</span>
                    <span className="text-sm text-muted-foreground">•</span>
                    <span className="text-sm text-muted-foreground">{order.table}</span>
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {order.time} • Waiter: {order.waiter}
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-medium">${order.total.toFixed(2)}</div>
                  <div className="text-sm text-green-600">{order.status}</div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
