import { useState } from "react";
import { Search, Download, CreditCard, Wallet, Banknote } from "lucide-react";
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

const payments = [
  {
    id: "PAY-001234",
    orderId: "#1234",
    amount: 45.0,
    method: "card",
    status: "completed",
    date: "Dec 6, 2024",
    time: "10:30 AM",
  },
  {
    id: "PAY-001233",
    orderId: "#1233",
    amount: 28.5,
    method: "wallet",
    status: "completed",
    date: "Dec 6, 2024",
    time: "10:15 AM",
  },
  {
    id: "PAY-001232",
    orderId: "#1232",
    amount: 72.0,
    method: "cash",
    status: "pending",
    date: "Dec 6, 2024",
    time: "9:45 AM",
  },
  {
    id: "PAY-001231",
    orderId: "#1231",
    amount: 15.0,
    method: "card",
    status: "completed",
    date: "Dec 6, 2024",
    time: "9:00 AM",
  },
  {
    id: "PAY-001230",
    orderId: "#1230",
    amount: 56.0,
    method: "wallet",
    status: "failed",
    date: "Dec 5, 2024",
    time: "8:30 PM",
  },
];

const methodConfig = {
  card: { label: "Card", icon: CreditCard },
  wallet: { label: "Wallet", icon: Wallet },
  cash: { label: "Cash", icon: Banknote },
};

const statusConfig = {
  completed: { label: "Completed", variant: "success" as const },
  pending: { label: "Pending", variant: "warning" as const },
  failed: { label: "Failed", variant: "destructive" as const },
};

const Payments = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const totalRevenue = payments
    .filter((p) => p.status === "completed")
    .reduce((acc, p) => acc + p.amount, 0);

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold">Payments</h1>
          <p className="text-muted-foreground">Track all payment transactions</p>
        </div>
        <Button variant="outline" className="gap-2">
          <Download className="h-4 w-4" />
          Export
        </Button>
      </div>

      {/* Stats */}
      <div className="grid gap-4 sm:grid-cols-4">
        <div className="rounded-xl border border-border bg-card p-4 shadow-sm">
          <p className="text-2xl font-bold">${totalRevenue.toFixed(2)}</p>
          <p className="text-sm text-muted-foreground">Total Revenue</p>
        </div>
        <div className="rounded-xl border border-border bg-card p-4 shadow-sm">
          <p className="text-2xl font-bold">
            {payments.filter((p) => p.status === "completed").length}
          </p>
          <p className="text-sm text-muted-foreground">Successful</p>
        </div>
        <div className="rounded-xl border border-border bg-card p-4 shadow-sm">
          <p className="text-2xl font-bold">
            {payments.filter((p) => p.status === "pending").length}
          </p>
          <p className="text-sm text-muted-foreground">Pending</p>
        </div>
        <div className="rounded-xl border border-border bg-card p-4 shadow-sm">
          <p className="text-2xl font-bold">
            {payments.filter((p) => p.status === "failed").length}
          </p>
          <p className="text-sm text-muted-foreground">Failed</p>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-col gap-4 sm:flex-row">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search by payment or order ID..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
        <Select defaultValue="all">
          <SelectTrigger className="w-full sm:w-[150px]">
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Status</SelectItem>
            <SelectItem value="completed">Completed</SelectItem>
            <SelectItem value="pending">Pending</SelectItem>
            <SelectItem value="failed">Failed</SelectItem>
          </SelectContent>
        </Select>
        <Select defaultValue="all">
          <SelectTrigger className="w-full sm:w-[150px]">
            <SelectValue placeholder="Method" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Methods</SelectItem>
            <SelectItem value="card">Card</SelectItem>
            <SelectItem value="wallet">Wallet</SelectItem>
            <SelectItem value="cash">Cash</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Payments Table */}
      <div className="rounded-xl border border-border bg-card shadow-sm">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Payment ID</TableHead>
              <TableHead>Order ID</TableHead>
              <TableHead>Amount</TableHead>
              <TableHead>Method</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Time</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {payments.map((payment) => {
              const method = methodConfig[payment.method as keyof typeof methodConfig];
              const status = statusConfig[payment.status as keyof typeof statusConfig];
              return (
                <TableRow key={payment.id} className="animate-fade-in">
                  <TableCell className="font-mono text-sm">{payment.id}</TableCell>
                  <TableCell className="font-medium">{payment.orderId}</TableCell>
                  <TableCell className="font-semibold">${payment.amount.toFixed(2)}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1.5">
                      <method.icon className="h-4 w-4 text-muted-foreground" />
                      {method.label}
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant={status.variant}>{status.label}</Badge>
                  </TableCell>
                  <TableCell className="text-muted-foreground">{payment.date}</TableCell>
                  <TableCell className="text-muted-foreground">{payment.time}</TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default Payments;
