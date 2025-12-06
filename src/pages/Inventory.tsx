import { useState } from "react";
import { Search, Plus, Minus, AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

const inventoryItems = [
  { id: 1, name: "Chicken Wings", stock: 5, threshold: 20, unit: "kg" },
  { id: 2, name: "Mozzarella Cheese", stock: 8, threshold: 15, unit: "kg" },
  { id: 3, name: "Tomato Sauce", stock: 3, threshold: 10, unit: "liters" },
  { id: 4, name: "Fresh Basil", stock: 2, threshold: 10, unit: "bunches" },
  { id: 5, name: "Ground Beef", stock: 25, threshold: 20, unit: "kg" },
  { id: 6, name: "Burger Buns", stock: 100, threshold: 50, unit: "pcs" },
  { id: 7, name: "Lettuce", stock: 15, threshold: 10, unit: "heads" },
  { id: 8, name: "Olive Oil", stock: 12, threshold: 5, unit: "liters" },
];

const Inventory = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedItem, setSelectedItem] = useState<(typeof inventoryItems)[0] | null>(null);
  const [stockChange, setStockChange] = useState(0);

  const getStockStatus = (stock: number, threshold: number) => {
    if (stock === 0) return { label: "Out of Stock", variant: "destructive" as const };
    if (stock <= threshold) return { label: "Low Stock", variant: "warning" as const };
    return { label: "In Stock", variant: "success" as const };
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-3xl font-bold">Inventory</h1>
        <p className="text-muted-foreground">Track and manage your stock levels</p>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 sm:grid-cols-3">
        <div className="rounded-xl border border-border bg-card p-4 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="rounded-lg bg-success/10 p-2">
              <AlertTriangle className="h-5 w-5 text-success" />
            </div>
            <div>
              <p className="text-2xl font-bold">
                {inventoryItems.filter((i) => i.stock > i.threshold).length}
              </p>
              <p className="text-sm text-muted-foreground">Items In Stock</p>
            </div>
          </div>
        </div>
        <div className="rounded-xl border border-border bg-card p-4 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="rounded-lg bg-warning/10 p-2">
              <AlertTriangle className="h-5 w-5 text-warning" />
            </div>
            <div>
              <p className="text-2xl font-bold">
                {inventoryItems.filter((i) => i.stock <= i.threshold && i.stock > 0).length}
              </p>
              <p className="text-sm text-muted-foreground">Low Stock Items</p>
            </div>
          </div>
        </div>
        <div className="rounded-xl border border-border bg-card p-4 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="rounded-lg bg-destructive/10 p-2">
              <AlertTriangle className="h-5 w-5 text-destructive" />
            </div>
            <div>
              <p className="text-2xl font-bold">
                {inventoryItems.filter((i) => i.stock === 0).length}
              </p>
              <p className="text-sm text-muted-foreground">Out of Stock</p>
            </div>
          </div>
        </div>
      </div>

      {/* Search */}
      <div className="relative max-w-md">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          placeholder="Search inventory..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-10"
        />
      </div>

      {/* Inventory Table */}
      <div className="rounded-xl border border-border bg-card shadow-sm">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Item Name</TableHead>
              <TableHead>Current Stock</TableHead>
              <TableHead>Threshold</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {inventoryItems.map((item) => {
              const status = getStockStatus(item.stock, item.threshold);
              return (
                <TableRow key={item.id} className="animate-fade-in">
                  <TableCell className="font-medium">{item.name}</TableCell>
                  <TableCell>
                    {item.stock} {item.unit}
                  </TableCell>
                  <TableCell className="text-muted-foreground">
                    {item.threshold} {item.unit}
                  </TableCell>
                  <TableCell>
                    <Badge variant={status.variant}>{status.label}</Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        setSelectedItem(item);
                        setStockChange(0);
                      }}
                    >
                      Update Stock
                    </Button>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </div>

      {/* Update Stock Dialog */}
      <Dialog open={!!selectedItem} onOpenChange={() => setSelectedItem(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Update Stock: {selectedItem?.name}</DialogTitle>
            <DialogDescription>
              Current stock: {selectedItem?.stock} {selectedItem?.unit}
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="flex items-center justify-center gap-4">
              <Button
                variant="outline"
                size="icon"
                onClick={() => setStockChange((prev) => prev - 1)}
              >
                <Minus className="h-4 w-4" />
              </Button>
              <div className="text-center">
                <p
                  className={`text-3xl font-bold ${
                    stockChange > 0
                      ? "text-success"
                      : stockChange < 0
                      ? "text-destructive"
                      : ""
                  }`}
                >
                  {stockChange > 0 ? "+" : ""}
                  {stockChange}
                </p>
                <p className="text-sm text-muted-foreground">{selectedItem?.unit}</p>
              </div>
              <Button
                variant="outline"
                size="icon"
                onClick={() => setStockChange((prev) => prev + 1)}
              >
                <Plus className="h-4 w-4" />
              </Button>
            </div>
            <div className="text-center text-sm text-muted-foreground">
              New stock:{" "}
              <span className="font-medium text-foreground">
                {(selectedItem?.stock || 0) + stockChange} {selectedItem?.unit}
              </span>
            </div>
            <div className="space-y-2">
              <Label htmlFor="notes">Notes (optional)</Label>
              <Textarea id="notes" placeholder="Add notes about this stock change..." />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setSelectedItem(null)}>
              Cancel
            </Button>
            <Button onClick={() => setSelectedItem(null)}>Update Stock</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Inventory;
