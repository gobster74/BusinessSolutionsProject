import { Tabs, TabsContent, TabsList, TabsTrigger } from "./components/ui/tabs";
import { Dashboard } from "./components/Dashboard";
import { InventoryManagement } from "./components/InventoryManagement";
import { OrderHistory } from "./components/OrderHistory";
import { BookkeepingExport } from "./components/BookkeepingExport";
import { LayoutDashboard, Package, Clock, FileText } from "lucide-react";

export default function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-amber-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-orange-600 mb-2">Bunbelievable Manager Portal</h1>
          <p className="text-muted-foreground">
            Manage your restaurant operations, inventory, and sales reports
          </p>
        </div>

        {/* Main Tabs */}
        <Tabs defaultValue="dashboard" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4 lg:w-auto lg:inline-grid">
            <TabsTrigger value="dashboard" className="gap-2">
              <LayoutDashboard className="h-4 w-4" />
              <span className="hidden sm:inline">Dashboard</span>
            </TabsTrigger>
            <TabsTrigger value="inventory" className="gap-2">
              <Package className="h-4 w-4" />
              <span className="hidden sm:inline">Inventory</span>
            </TabsTrigger>
            <TabsTrigger value="orders" className="gap-2">
              <Clock className="h-4 w-4" />
              <span className="hidden sm:inline">Orders</span>
            </TabsTrigger>
            <TabsTrigger value="bookkeeping" className="gap-2">
              <FileText className="h-4 w-4" />
              <span className="hidden sm:inline">Bookkeeping</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="dashboard" className="space-y-4">
            <Dashboard />
          </TabsContent>

          <TabsContent value="inventory">
            <InventoryManagement />
          </TabsContent>

          <TabsContent value="orders">
            <OrderHistory />
          </TabsContent>

          <TabsContent value="bookkeeping">
            <BookkeepingExport />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
