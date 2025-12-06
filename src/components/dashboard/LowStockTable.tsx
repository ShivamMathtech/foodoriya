import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { AlertTriangle, Plus } from "lucide-react";
import { Link } from "react-router-dom";

const lowStockItems = [
  { id: 1, name: "Chicken Wings", stock: 5, threshold: 20 },
  { id: 2, name: "Mozzarella Cheese", stock: 8, threshold: 15 },
  { id: 3, name: "Tomato Sauce", stock: 3, threshold: 10 },
  { id: 4, name: "Fresh Basil", stock: 2, threshold: 10 },
];

export function LowStockTable() {
  return (
    <div className="rounded-xl border border-border bg-card shadow-sm animate-slide-in">
      <div className="flex items-center justify-between border-b border-border p-3 sm:p-4">
        <div className="flex items-center gap-2">
          <AlertTriangle className="h-4 w-4 sm:h-5 sm:w-5 text-warning" />
          <h3 className="text-base sm:text-lg font-semibold">Low Stock Alert</h3>
        </div>
        <Link to="/inventory">
          <Button variant="ghost" size="sm" className="text-xs sm:text-sm">
            View All
          </Button>
        </Link>
      </div>
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="text-xs sm:text-sm">Item</TableHead>
              <TableHead className="text-xs sm:text-sm">Stock</TableHead>
              <TableHead className="text-xs sm:text-sm hidden sm:table-cell">Threshold</TableHead>
              <TableHead className="text-right text-xs sm:text-sm">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {lowStockItems.map((item) => (
              <TableRow key={item.id}>
                <TableCell className="font-medium text-xs sm:text-sm">{item.name}</TableCell>
                <TableCell>
                  <Badge variant="destructive" className="text-xs">{item.stock} left</Badge>
                </TableCell>
                <TableCell className="text-muted-foreground hidden sm:table-cell text-xs sm:text-sm">
                  {item.threshold}
                </TableCell>
                <TableCell className="text-right">
                  <Button variant="outline" size="sm" className="text-xs h-8">
                    <Plus className="mr-1 h-3 w-3 sm:h-4 sm:w-4" />
                    <span className="hidden sm:inline">Restock</span>
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
