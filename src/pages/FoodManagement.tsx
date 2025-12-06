import { useState } from "react";
import { Link } from "react-router-dom";
import { Plus, Search, Filter, Edit, Trash2, MoreHorizontal } from "lucide-react";
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
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const foodItems = [
  {
    id: 1,
    name: "Classic Burger",
    image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=100&h=100&fit=crop",
    category: "Main Course",
    price: 12.99,
    stock: 50,
    status: "active",
  },
  {
    id: 2,
    name: "Margherita Pizza",
    image: "https://images.unsplash.com/photo-1604382355076-af4b0eb60143?w=100&h=100&fit=crop",
    category: "Main Course",
    price: 15.99,
    stock: 35,
    status: "active",
  },
  {
    id: 3,
    name: "Caesar Salad",
    image: "https://images.unsplash.com/photo-1546793665-c74683f339c1?w=100&h=100&fit=crop",
    category: "Appetizers",
    price: 8.99,
    stock: 0,
    status: "inactive",
  },
  {
    id: 4,
    name: "Chicken Wings",
    image: "https://images.unsplash.com/photo-1608039829572-9b9e7adb4b37?w=100&h=100&fit=crop",
    category: "Appetizers",
    price: 10.99,
    stock: 5,
    status: "active",
  },
  {
    id: 5,
    name: "Chocolate Cake",
    image: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=100&h=100&fit=crop",
    category: "Desserts",
    price: 6.99,
    stock: 20,
    status: "active",
  },
];

const FoodManagement = () => {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <div className="space-y-4 sm:space-y-6">
      {/* Page Header */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold">Food Management</h1>
          <p className="text-sm sm:text-base text-muted-foreground">Manage your menu items</p>
        </div>
        <Link to="/food/add">
          <Button className="gap-2 w-full sm:w-auto">
            <Plus className="h-4 w-4" />
            Add Food Item
          </Button>
        </Link>
      </div>

      {/* Filters */}
      <div className="flex flex-col gap-3 rounded-xl border border-border bg-card p-3 sm:p-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search food items..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
        <div className="flex flex-wrap gap-2">
          <Select defaultValue="all">
            <SelectTrigger className="w-full sm:w-[150px]">
              <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              <SelectItem value="main">Main Course</SelectItem>
              <SelectItem value="appetizers">Appetizers</SelectItem>
              <SelectItem value="desserts">Desserts</SelectItem>
            </SelectContent>
          </Select>
          <Select defaultValue="all">
            <SelectTrigger className="w-full sm:w-[130px]">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="active">Active</SelectItem>
              <SelectItem value="inactive">Inactive</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" className="gap-2 flex-1 sm:flex-none">
            <Filter className="h-4 w-4" />
            <span className="hidden sm:inline">More Filters</span>
          </Button>
        </div>
      </div>

      {/* Food Table */}
      <div className="rounded-xl border border-border bg-card shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="text-xs sm:text-sm">Item</TableHead>
                <TableHead className="text-xs sm:text-sm hidden md:table-cell">Category</TableHead>
                <TableHead className="text-xs sm:text-sm">Price</TableHead>
                <TableHead className="text-xs sm:text-sm hidden sm:table-cell">Stock</TableHead>
                <TableHead className="text-xs sm:text-sm">Status</TableHead>
                <TableHead className="text-right text-xs sm:text-sm">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {foodItems.map((item) => (
                <TableRow key={item.id} className="animate-fade-in">
                  <TableCell>
                    <div className="flex items-center gap-2 sm:gap-3">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="h-10 w-10 sm:h-12 sm:w-12 rounded-lg object-cover"
                      />
                      <div className="min-w-0">
                        <p className="font-medium text-xs sm:text-sm truncate">{item.name}</p>
                        <p className="text-xs text-muted-foreground md:hidden">{item.category}</p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="hidden md:table-cell text-xs sm:text-sm">{item.category}</TableCell>
                  <TableCell className="text-xs sm:text-sm">${item.price.toFixed(2)}</TableCell>
                  <TableCell className="hidden sm:table-cell">
                    <span
                      className={`text-xs sm:text-sm ${
                        item.stock <= 10
                          ? "text-destructive font-medium"
                          : ""
                      }`}
                    >
                      {item.stock}
                    </span>
                  </TableCell>
                  <TableCell>
                    <Badge variant={item.status === "active" ? "success" : "muted"} className="text-xs">
                      {item.status === "active" ? "Active" : "Inactive"}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem asChild>
                          <Link to={`/food/edit/${item.id}`} className="flex items-center">
                            <Edit className="mr-2 h-4 w-4" />
                            Edit
                          </Link>
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
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
};

export default FoodManagement;
