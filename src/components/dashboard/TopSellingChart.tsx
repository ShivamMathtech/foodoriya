import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const data = [
  { name: "Burger", orders: 145 },
  { name: "Pizza", orders: 132 },
  { name: "Pasta", orders: 98 },
  { name: "Salad", orders: 87 },
  { name: "Wings", orders: 76 },
];

export function TopSellingChart() {
  return (
    <div className="rounded-xl border border-border bg-card p-4 sm:p-6 shadow-sm animate-slide-in">
      <div className="mb-4 sm:mb-6">
        <h3 className="text-base sm:text-lg font-semibold">Top Selling Items</h3>
        <p className="text-xs sm:text-sm text-muted-foreground">Most ordered items this week</p>
      </div>
      <div className="h-[200px] sm:h-[250px] lg:h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} layout="vertical">
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" horizontal={false} />
            <XAxis
              type="number"
              stroke="hsl(var(--muted-foreground))"
              fontSize={11}
              tickLine={false}
              axisLine={false}
            />
            <YAxis
              dataKey="name"
              type="category"
              stroke="hsl(var(--muted-foreground))"
              fontSize={11}
              tickLine={false}
              axisLine={false}
              width={50}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: "hsl(var(--card))",
                border: "1px solid hsl(var(--border))",
                borderRadius: "8px",
                boxShadow: "var(--shadow-md)",
                fontSize: "12px",
              }}
              labelStyle={{ color: "hsl(var(--foreground))" }}
              formatter={(value: number) => [value, "Orders"]}
            />
            <Bar
              dataKey="orders"
              fill="hsl(var(--chart-2))"
              radius={[0, 4, 4, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
