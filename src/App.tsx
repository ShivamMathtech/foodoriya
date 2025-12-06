import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AdminLayout } from "@/components/layout/AdminLayout";
import Dashboard from "./pages/Dashboard";
import FoodManagement from "./pages/FoodManagement";
import AddFood from "./pages/AddFood";
import Categories from "./pages/Categories";
import Orders from "./pages/Orders";
import Inventory from "./pages/Inventory";
import Coupons from "./pages/Coupons";
import Users from "./pages/Users";
import DeliveryPartners from "./pages/DeliveryPartners";
import Payments from "./pages/Payments";
import Settings from "./pages/Settings";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route element={<AdminLayout />}>
            <Route path="/" element={<Dashboard />} />
            <Route path="/food" element={<FoodManagement />} />
            <Route path="/food/add" element={<AddFood />} />
            <Route path="/food/edit/:id" element={<AddFood />} />
            <Route path="/categories" element={<Categories />} />
            <Route path="/orders" element={<Orders />} />
            <Route path="/inventory" element={<Inventory />} />
            <Route path="/coupons" element={<Coupons />} />
            <Route path="/users" element={<Users />} />
            <Route path="/delivery" element={<DeliveryPartners />} />
            <Route path="/payments" element={<Payments />} />
            <Route path="/settings" element={<Settings />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
