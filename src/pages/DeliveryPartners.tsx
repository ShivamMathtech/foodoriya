import { useState } from "react";
import { Plus, Search, Edit, Trash2, MoreHorizontal, Phone, Bike, Car } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const deliveryPartners = [
  {
    id: 1,
    name: "David Johnson",
    phone: "+1 234 567 890",
    avatar: "https://images.unsplash.com/photo-1599566150163-29194dcabd36?w=100&h=100&fit=crop",
    vehicle: "bike",
    status: "active",
    currentOrders: 2,
    completedToday: 8,
  },
  {
    id: 2,
    name: "Michael Chen",
    phone: "+1 345 678 901",
    avatar: "https://images.unsplash.com/photo-1633332755192-727a05c4013d?w=100&h=100&fit=crop",
    vehicle: "car",
    status: "active",
    currentOrders: 1,
    completedToday: 12,
  },
  {
    id: 3,
    name: "Robert Williams",
    phone: "+1 456 789 012",
    avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&h=100&fit=crop",
    vehicle: "bike",
    status: "inactive",
    currentOrders: 0,
    completedToday: 0,
  },
  {
    id: 4,
    name: "James Miller",
    phone: "+1 567 890 123",
    avatar: "https://images.unsplash.com/photo-1527980965255-d3b416303d12?w=100&h=100&fit=crop",
    vehicle: "car",
    status: "active",
    currentOrders: 3,
    completedToday: 5,
  },
];

const vehicleConfig = {
  bike: { label: "Bike", icon: Bike },
  car: { label: "Car", icon: Car },
};

const DeliveryPartners = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [dialogOpen, setDialogOpen] = useState(false);

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold">Delivery Partners</h1>
          <p className="text-muted-foreground">Manage your delivery team</p>
        </div>
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogTrigger asChild>
            <Button className="gap-2">
              <Plus className="h-4 w-4" />
              Add Partner
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add Delivery Partner</DialogTitle>
              <DialogDescription>
                Register a new delivery partner to your team.
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="partnerName">Full Name</Label>
                <Input id="partnerName" placeholder="Enter full name" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="partnerPhone">Mobile Number</Label>
                <Input id="partnerPhone" type="tel" placeholder="+1 234 567 890" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="vehicleType">Vehicle Type</Label>
                <Select>
                  <SelectTrigger id="vehicleType">
                    <SelectValue placeholder="Select vehicle" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="bike">Bike</SelectItem>
                    <SelectItem value="car">Car</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="idUpload">Upload ID</Label>
                <Input id="idUpload" type="file" />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setDialogOpen(false)}>
                Cancel
              </Button>
              <Button onClick={() => setDialogOpen(false)}>Add Partner</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {/* Stats */}
      <div className="grid gap-4 sm:grid-cols-3">
        <div className="rounded-xl border border-border bg-card p-4 shadow-sm">
          <p className="text-2xl font-bold">
            {deliveryPartners.filter((p) => p.status === "active").length}
          </p>
          <p className="text-sm text-muted-foreground">Active Partners</p>
        </div>
        <div className="rounded-xl border border-border bg-card p-4 shadow-sm">
          <p className="text-2xl font-bold">
            {deliveryPartners.reduce((acc, p) => acc + p.currentOrders, 0)}
          </p>
          <p className="text-sm text-muted-foreground">Orders in Progress</p>
        </div>
        <div className="rounded-xl border border-border bg-card p-4 shadow-sm">
          <p className="text-2xl font-bold">
            {deliveryPartners.reduce((acc, p) => acc + p.completedToday, 0)}
          </p>
          <p className="text-sm text-muted-foreground">Completed Today</p>
        </div>
      </div>

      {/* Search */}
      <div className="relative max-w-md">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          placeholder="Search partners..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-10"
        />
      </div>

      {/* Partners Table */}
      <div className="rounded-xl border border-border bg-card shadow-sm">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Partner</TableHead>
              <TableHead>Phone</TableHead>
              <TableHead>Vehicle</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Current Orders</TableHead>
              <TableHead>Completed Today</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {deliveryPartners.map((partner) => {
              const vehicle = vehicleConfig[partner.vehicle as keyof typeof vehicleConfig];
              return (
                <TableRow key={partner.id} className="animate-fade-in">
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <Avatar className="h-9 w-9">
                        <AvatarImage src={partner.avatar} />
                        <AvatarFallback>
                          {partner.name.split(" ").map((n) => n[0]).join("")}
                        </AvatarFallback>
                      </Avatar>
                      <span className="font-medium">{partner.name}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1 text-muted-foreground">
                      <Phone className="h-3 w-3" />
                      {partner.phone}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1.5">
                      <vehicle.icon className="h-4 w-4 text-muted-foreground" />
                      {vehicle.label}
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant={partner.status === "active" ? "success" : "muted"}>
                      {partner.status === "active" ? "Active" : "Inactive"}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    {partner.currentOrders > 0 ? (
                      <Badge variant="pending">{partner.currentOrders} orders</Badge>
                    ) : (
                      <span className="text-muted-foreground">None</span>
                    )}
                  </TableCell>
                  <TableCell>{partner.completedToday}</TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>
                          <Edit className="mr-2 h-4 w-4" />
                          Edit
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem className="text-destructive">
                          <Trash2 className="mr-2 h-4 w-4" />
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default DeliveryPartners;
