import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "./ui/table";
import { Button } from "./ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Plus, Pencil, Trash2, AlertTriangle } from "lucide-react";
import { Badge } from "./ui/badge";

interface InventoryItem {
  id: string;
  name: string;
  category: string;
  currentStock: number;
  minimumStock: number;
  unit: string;
  lastUpdated: string;
}

const initialInventory: InventoryItem[] = [
  { id: '1', name: 'Beef Patties', category: 'Proteins', currentStock: 45, minimumStock: 100, unit: 'pieces', lastUpdated: '2025-11-01' },
  { id: '2', name: 'Brioche Buns', category: 'Bread', currentStock: 28, minimumStock: 80, unit: 'pieces', lastUpdated: '2025-11-01' },
  { id: '3', name: 'Cheddar Cheese', category: 'Dairy', currentStock: 15, minimumStock: 50, unit: 'slices', lastUpdated: '2025-11-01' },
  { id: '4', name: 'Lettuce', category: 'Vegetables', currentStock: 120, minimumStock: 80, unit: 'leaves', lastUpdated: '2025-11-01' },
  { id: '5', name: 'Tomatoes', category: 'Vegetables', currentStock: 85, minimumStock: 60, unit: 'pieces', lastUpdated: '2025-11-01' },
  { id: '6', name: 'Onions', category: 'Vegetables', currentStock: 95, minimumStock: 50, unit: 'pieces', lastUpdated: '2025-11-01' },
  { id: '7', name: 'Pickles', category: 'Condiments', currentStock: 200, minimumStock: 100, unit: 'pieces', lastUpdated: '2025-11-01' },
  { id: '8', name: 'Special Sauce', category: 'Condiments', currentStock: 75, minimumStock: 40, unit: 'oz', lastUpdated: '2025-11-01' },
];

export function InventoryManagement() {
  const [inventory, setInventory] = useState<InventoryItem[]>(initialInventory);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<InventoryItem | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    category: '',
    currentStock: '',
    minimumStock: '',
    unit: '',
  });

  const handleAdd = () => {
    const newItem: InventoryItem = {
      id: Date.now().toString(),
      name: formData.name,
      category: formData.category,
      currentStock: parseInt(formData.currentStock),
      minimumStock: parseInt(formData.minimumStock),
      unit: formData.unit,
      lastUpdated: new Date().toISOString().split('T')[0],
    };
    setInventory([...inventory, newItem]);
    setIsAddDialogOpen(false);
    setFormData({ name: '', category: '', currentStock: '', minimumStock: '', unit: '' });
  };

  const handleEdit = () => {
    if (!editingItem) return;
    setInventory(inventory.map(item => 
      item.id === editingItem.id 
        ? {
            ...editingItem,
            name: formData.name,
            category: formData.category,
            currentStock: parseInt(formData.currentStock),
            minimumStock: parseInt(formData.minimumStock),
            unit: formData.unit,
            lastUpdated: new Date().toISOString().split('T')[0],
          }
        : item
    ));
    setIsEditDialogOpen(false);
    setEditingItem(null);
    setFormData({ name: '', category: '', currentStock: '', minimumStock: '', unit: '' });
  };

  const handleDelete = (id: string) => {
    if (confirm('Are you sure you want to delete this item?')) {
      setInventory(inventory.filter(item => item.id !== id));
    }
  };

  const openEditDialog = (item: InventoryItem) => {
    setEditingItem(item);
    setFormData({
      name: item.name,
      category: item.category,
      currentStock: item.currentStock.toString(),
      minimumStock: item.minimumStock.toString(),
      unit: item.unit,
    });
    setIsEditDialogOpen(true);
  };

  const getStockStatus = (current: number, minimum: number) => {
    if (current < minimum) {
      return <Badge variant="destructive" className="gap-1"><AlertTriangle className="h-3 w-3" />Low</Badge>;
    } else if (current < minimum * 1.5) {
      return <Badge variant="outline" className="border-orange-500 text-orange-600">Warning</Badge>;
    }
    return <Badge variant="outline" className="border-green-500 text-green-600">Good</Badge>;
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Inventory Management</CardTitle>
            <CardDescription>Manage stock levels for all ingredients</CardDescription>
          </div>
          <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
            <DialogTrigger asChild>
              <Button className="bg-orange-500 hover:bg-orange-600">
                <Plus className="mr-2 h-4 w-4" />
                Add Item
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add New Inventory Item</DialogTitle>
                <DialogDescription>Add a new item to your inventory</DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid gap-2">
                  <Label htmlFor="name">Item Name</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="category">Category</Label>
                  <Input
                    id="category"
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="currentStock">Current Stock</Label>
                    <Input
                      id="currentStock"
                      type="number"
                      value={formData.currentStock}
                      onChange={(e) => setFormData({ ...formData, currentStock: e.target.value })}
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="minimumStock">Minimum Stock</Label>
                    <Input
                      id="minimumStock"
                      type="number"
                      value={formData.minimumStock}
                      onChange={(e) => setFormData({ ...formData, minimumStock: e.target.value })}
                    />
                  </div>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="unit">Unit</Label>
                  <Input
                    id="unit"
                    placeholder="e.g., pieces, oz, lbs"
                    value={formData.unit}
                    onChange={(e) => setFormData({ ...formData, unit: e.target.value })}
                  />
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>Cancel</Button>
                <Button onClick={handleAdd} className="bg-orange-500 hover:bg-orange-600">Add Item</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Item Name</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Current Stock</TableHead>
              <TableHead>Minimum Stock</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Last Updated</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {inventory.map((item) => (
              <TableRow key={item.id}>
                <TableCell>{item.name}</TableCell>
                <TableCell>{item.category}</TableCell>
                <TableCell>{item.currentStock} {item.unit}</TableCell>
                <TableCell>{item.minimumStock} {item.unit}</TableCell>
                <TableCell>{getStockStatus(item.currentStock, item.minimumStock)}</TableCell>
                <TableCell>{item.lastUpdated}</TableCell>
                <TableCell>
                  <div className="flex gap-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => openEditDialog(item)}
                    >
                      <Pencil className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleDelete(item.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Edit Inventory Item</DialogTitle>
              <DialogDescription>Update the inventory item details</DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="edit-name">Item Name</Label>
                <Input
                  id="edit-name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="edit-category">Category</Label>
                <Input
                  id="edit-category"
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="edit-currentStock">Current Stock</Label>
                  <Input
                    id="edit-currentStock"
                    type="number"
                    value={formData.currentStock}
                    onChange={(e) => setFormData({ ...formData, currentStock: e.target.value })}
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="edit-minimumStock">Minimum Stock</Label>
                  <Input
                    id="edit-minimumStock"
                    type="number"
                    value={formData.minimumStock}
                    onChange={(e) => setFormData({ ...formData, minimumStock: e.target.value })}
                  />
                </div>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="edit-unit">Unit</Label>
                <Input
                  id="edit-unit"
                  placeholder="e.g., pieces, oz, lbs"
                  value={formData.unit}
                  onChange={(e) => setFormData({ ...formData, unit: e.target.value })}
                />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>Cancel</Button>
              <Button onClick={handleEdit} className="bg-orange-500 hover:bg-orange-600">Save Changes</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </CardContent>
    </Card>
  );
}
