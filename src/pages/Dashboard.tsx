import { ShoppingCart, DollarSign, Users, Package, Clock } from "lucide-react";
import { KPICard } from "@/components/dashboard/KPICard";
import { SalesChart } from "@/components/dashboard/SalesChart";
import { TopSellingChart } from "@/components/dashboard/TopSellingChart";
import { CategoryChart } from "@/components/dashboard/CategoryChart";
import { RecentOrdersTable } from "@/components/dashboard/RecentOrdersTable";
import { LowStockTable } from "@/components/dashboard/LowStockTable";

const Dashboard = () => {
  return (
    <div className="space-y-4 sm:space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold">Dashboard</h1>
        <p className="text-sm sm:text-base text-muted-foreground">Welcome back! Here's what's happening today.</p>
      </div>

      {/* KPI Cards */}
      <div className="grid gap-3 sm:gap-4 grid-cols-2 lg:grid-cols-5">
        <KPICard
          title="Total Orders"
          value="1,234"
          change="+12% from last week"
          changeType="positive"
          icon={ShoppingCart}
          iconColor="bg-primary/10 text-primary"
        />
        <KPICard
          title="Total Revenue"
          value="$45,231"
          change="+8% from last week"
          changeType="positive"
          icon={DollarSign}
          iconColor="bg-success/10 text-success"
        />
        <KPICard
          title="Active Users"
          value="892"
          change="+5% from last week"
          changeType="positive"
          icon={Users}
          iconColor="bg-chart-4/10 text-chart-4"
        />
        <KPICard
          title="Low Stock"
          value="4"
          change="Needs attention"
          changeType="negative"
          icon={Package}
          iconColor="bg-warning/10 text-warning"
        />
        <KPICard
          title="Pending"
          value="23"
          change="Processing now"
          changeType="neutral"
          icon={Clock}
          iconColor="bg-chart-5/10 text-chart-5"
          className="col-span-2 lg:col-span-1"
        />
      </div>

      {/* Charts */}
      <div className="grid gap-4 sm:gap-6 lg:grid-cols-2">
        <SalesChart />
        <TopSellingChart />
      </div>

      <div className="grid gap-4 sm:gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2 overflow-hidden">
          <RecentOrdersTable />
        </div>
        <CategoryChart />
      </div>

      {/* Low Stock Alert */}
      <div className="overflow-hidden">
        <LowStockTable />
      </div>
    </div>
  );
};

export default Dashboard;
