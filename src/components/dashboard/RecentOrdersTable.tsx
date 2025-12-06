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
import { Eye } from "lucide-react";
import { Link } from "react-router-dom";

const recentOrders = [
  {
    id: "#1234",
    customer: "John Smith",
    items: 3,
    amount: "$45.00",
    status: "pending",
    time: "2 min ago",
  },
  {
    id: "#1233",
    customer: "Sarah Johnson",
    items: 2,
    amount: "$28.50",
    status: "cooking",
    time: "15 min ago",
  },
  {
    id: "#1232",
    customer: "Mike Brown",
    items: 5,
    amount: "$72.00",
    status: "delivered",
    time: "45 min ago",
  },
  {
    id: "#1231",
    customer: "Emily Davis",
    items: 1,
    amount: "$15.00",
    status: "out_for_delivery",
    time: "1 hour ago",
  },
  {
    id: "#1230",
    customer: "Chris Wilson",
    items: 4,
    amount: "$56.00",
    status: "delivered",
    time: "2 hours ago",
  },
];

const statusConfig = {
  pending: { label: "Pending", variant: "pending" as const },
  cooking: { label: "Cooking", variant: "warning" as const },
  out_for_delivery: { label: "Delivering", variant: "pending" as const },
  delivered: { label: "Delivered", variant: "success" as const },
};

export function RecentOrdersTable() {
  return (
    <div className="rounded-xl border border-border bg-card shadow-sm animate-slide-in">
      <div className="flex items-center justify-between border-b border-border p-3 sm:p-4">
        <h3 className="text-base sm:text-lg font-semibold">Recent Orders</h3>
        <Link to="/orders">
          <Button variant="ghost" size="sm" className="text-xs sm:text-sm">
            View All
          </Button>
        </Link>
      </div>
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="text-xs sm:text-sm">Order</TableHead>
              <TableHead className="text-xs sm:text-sm hidden sm:table-cell">Customer</TableHead>
              <TableHead className="text-xs sm:text-sm">Amount</TableHead>
              <TableHead className="text-xs sm:text-sm">Status</TableHead>
              <TableHead className="text-xs sm:text-sm hidden md:table-cell">Time</TableHead>
              <TableHead className="text-right text-xs sm:text-sm">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {recentOrders.map((order) => (
              <TableRow key={order.id}>
                <TableCell className="font-medium text-xs sm:text-sm">
                  <div>
                    <span>{order.id}</span>
                    <span className="block sm:hidden text-muted-foreground text-xs">
                      {order.customer}
                    </span>
                  </div>
                </TableCell>
                <TableCell className="hidden sm:table-cell text-xs sm:text-sm">{order.customer}</TableCell>
                <TableCell className="text-xs sm:text-sm">{order.amount}</TableCell>
                <TableCell>
                  <Badge variant={statusConfig[order.status as keyof typeof statusConfig].variant} className="text-xs">
                    {statusConfig[order.status as keyof typeof statusConfig].label}
                  </Badge>
                </TableCell>
                <TableCell className="text-muted-foreground hidden md:table-cell text-xs sm:text-sm">{order.time}</TableCell>
                <TableCell className="text-right">
                  <Button variant="ghost" size="icon" className="h-8 w-8">
                    <Eye className="h-4 w-4" />
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
