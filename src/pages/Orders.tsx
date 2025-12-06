import { useState } from "react";
import { Search, Filter, Eye, MapPin, Phone } from "lucide-react";
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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";

const orders = [
  {
    id: "#1234",
    customer: "John Smith",
    phone: "+1 234 567 890",
    address: "123 Main St, New York, NY",
    items: [
      { name: "Classic Burger", qty: 2, price: 12.99 },
      { name: "Caesar Salad", qty: 1, price: 8.99 },
    ],
    total: 34.97,
    payment: "Paid",
    status: "pending",
    time: "10:30 AM",
    date: "Dec 6, 2024",
  },
  {
    id: "#1233",
    customer: "Sarah Johnson",
    phone: "+1 345 678 901",
    address: "456 Oak Ave, Brooklyn, NY",
    items: [
      { name: "Margherita Pizza", qty: 1, price: 15.99 },
      { name: "Chocolate Cake", qty: 2, price: 6.99 },
    ],
    total: 29.97,
    payment: "Paid",
    status: "cooking",
    time: "10:15 AM",
    date: "Dec 6, 2024",
  },
  {
    id: "#1232",
    customer: "Mike Brown",
    phone: "+1 456 789 012",
    address: "789 Pine Rd, Queens, NY",
    items: [
      { name: "Chicken Wings", qty: 3, price: 10.99 },
      { name: "Classic Burger", qty: 2, price: 12.99 },
    ],
    total: 58.95,
    payment: "Paid",
    status: "out_for_delivery",
    time: "9:45 AM",
    date: "Dec 6, 2024",
  },
  {
    id: "#1231",
    customer: "Emily Davis",
    phone: "+1 567 890 123",
    address: "321 Elm St, Manhattan, NY",
    items: [{ name: "Caesar Salad", qty: 1, price: 8.99 }],
    total: 8.99,
    payment: "Paid",
    status: "delivered",
    time: "9:00 AM",
    date: "Dec 6, 2024",
  },
];

const statusConfig = {
  pending: { label: "Pending", variant: "pending" as const },
  cooking: { label: "Cooking", variant: "warning" as const },
  out_for_delivery: { label: "Delivering", variant: "pending" as const },
  delivered: { label: "Delivered", variant: "success" as const },
};

const Orders = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedOrder, setSelectedOrder] = useState<(typeof orders)[0] | null>(null);

  return (
    <div className="space-y-4 sm:space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold">Orders</h1>
        <p className="text-sm sm:text-base text-muted-foreground">Manage and track customer orders</p>
      </div>

      {/* Filters */}
      <div className="flex flex-col gap-3 rounded-xl border border-border bg-card p-3 sm:p-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search orders..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
        <div className="flex flex-wrap gap-2">
          <Select defaultValue="all">
            <SelectTrigger className="w-full sm:w-[140px]">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="pending">Pending</SelectItem>
              <SelectItem value="cooking">Cooking</SelectItem>
              <SelectItem value="delivered">Delivered</SelectItem>
            </SelectContent>
          </Select>
          <Select defaultValue="today">
            <SelectTrigger className="w-full sm:w-[140px]">
              <SelectValue placeholder="Date" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="today">Today</SelectItem>
              <SelectItem value="yesterday">Yesterday</SelectItem>
              <SelectItem value="week">This Week</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" className="gap-2 flex-1 sm:flex-none">
            <Filter className="h-4 w-4" />
            <span className="hidden sm:inline">More</span>
          </Button>
        </div>
      </div>

      {/* Orders Table */}
      <div className="rounded-xl border border-border bg-card shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="text-xs sm:text-sm">Order</TableHead>
                <TableHead className="text-xs sm:text-sm hidden sm:table-cell">Customer</TableHead>
                <TableHead className="text-xs sm:text-sm">Total</TableHead>
                <TableHead className="text-xs sm:text-sm">Status</TableHead>
                <TableHead className="text-xs sm:text-sm hidden md:table-cell">Time</TableHead>
                <TableHead className="text-right text-xs sm:text-sm">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {orders.map((order) => (
                <TableRow key={order.id} className="animate-fade-in">
                  <TableCell className="font-medium text-xs sm:text-sm">
                    <div>
                      <span>{order.id}</span>
                      <span className="block sm:hidden text-muted-foreground text-xs truncate max-w-[100px]">
                        {order.customer}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell className="hidden sm:table-cell text-xs sm:text-sm">{order.customer}</TableCell>
                  <TableCell className="text-xs sm:text-sm font-medium">${order.total.toFixed(2)}</TableCell>
                  <TableCell>
                    <Badge
                      variant={statusConfig[order.status as keyof typeof statusConfig].variant}
                      className="text-xs"
                    >
                      {statusConfig[order.status as keyof typeof statusConfig].label}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-muted-foreground hidden md:table-cell text-xs sm:text-sm">{order.time}</TableCell>
                  <TableCell className="text-right">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8"
                      onClick={() => setSelectedOrder(order)}
                    >
                      <Eye className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>

      {/* Order Details Dialog */}
      <Dialog open={!!selectedOrder} onOpenChange={() => setSelectedOrder(null)}>
        <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Order {selectedOrder?.id}</DialogTitle>
          </DialogHeader>
          {selectedOrder && (
            <div className="space-y-4 sm:space-y-6">
              {/* Customer Info */}
              <div className="space-y-2">
                <h3 className="font-semibold text-sm sm:text-base">Customer Details</h3>
                <div className="rounded-lg bg-muted/50 p-3 sm:p-4 space-y-2">
                  <p className="font-medium text-sm">{selectedOrder.customer}</p>
                  <p className="flex items-center gap-2 text-xs sm:text-sm text-muted-foreground">
                    <Phone className="h-3 w-3 sm:h-4 sm:w-4" />
                    {selectedOrder.phone}
                  </p>
                  <p className="flex items-start gap-2 text-xs sm:text-sm text-muted-foreground">
                    <MapPin className="h-3 w-3 sm:h-4 sm:w-4 shrink-0 mt-0.5" />
                    {selectedOrder.address}
                  </p>
                </div>
              </div>

              <Separator />

              {/* Order Items */}
              <div className="space-y-2">
                <h3 className="font-semibold text-sm sm:text-base">Order Items</h3>
                <div className="space-y-2">
                  {selectedOrder.items.map((item, idx) => (
                    <div
                      key={idx}
                      className="flex items-center justify-between rounded-lg bg-muted/50 p-3"
                    >
                      <div>
                        <p className="font-medium text-sm">{item.name}</p>
                        <p className="text-xs text-muted-foreground">Qty: {item.qty}</p>
                      </div>
                      <p className="font-medium text-sm">${(item.price * item.qty).toFixed(2)}</p>
                    </div>
                  ))}
                </div>
                <div className="flex justify-between border-t border-border pt-3 font-semibold text-sm">
                  <span>Total</span>
                  <span>${selectedOrder.total.toFixed(2)}</span>
                </div>
              </div>

              <Separator />

              {/* Status Timeline */}
              <div className="space-y-2">
                <h3 className="font-semibold text-sm sm:text-base">Order Status</h3>
                <div className="space-y-2">
                  {["Order Placed", "Accepted", "Cooking", "Out for Delivery", "Delivered"].map(
                    (step, idx) => {
                      const statusIndex = Object.keys(statusConfig).indexOf(selectedOrder.status);
                      const isComplete = idx <= statusIndex + 1;
                      return (
                        <div key={step} className="flex items-center gap-3">
                          <div
                            className={`h-2.5 w-2.5 sm:h-3 sm:w-3 rounded-full ${
                              isComplete ? "bg-primary" : "bg-muted"
                            }`}
                          />
                          <span
                            className={`text-xs sm:text-sm ${
                              isComplete ? "font-medium" : "text-muted-foreground"
                            }`}
                          >
                            {step}
                          </span>
                        </div>
                      );
                    }
                  )}
                </div>
              </div>

              {/* Actions */}
              <div className="flex flex-col sm:flex-row gap-2">
                <Select defaultValue={selectedOrder.status}>
                  <SelectTrigger className="flex-1">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="cooking">Cooking</SelectItem>
                    <SelectItem value="out_for_delivery">Out for Delivery</SelectItem>
                    <SelectItem value="delivered">Delivered</SelectItem>
                  </SelectContent>
                </Select>
                <Button className="w-full sm:w-auto">Update Status</Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Orders;
