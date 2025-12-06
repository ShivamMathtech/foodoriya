import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from "recharts";

const data = [
  { name: "Main Course", value: 35 },
  { name: "Appetizers", value: 25 },
  { name: "Beverages", value: 20 },
  { name: "Desserts", value: 15 },
  { name: "Sides", value: 5 },
];

const COLORS = [
  "hsl(var(--chart-1))",
  "hsl(var(--chart-2))",
  "hsl(var(--chart-3))",
  "hsl(var(--chart-4))",
  "hsl(var(--chart-5))",
];

export function CategoryChart() {
  return (
    <div className="rounded-xl border border-border bg-card p-4 sm:p-6 shadow-sm animate-slide-in">
      <div className="mb-4 sm:mb-6">
        <h3 className="text-base sm:text-lg font-semibold">Category Distribution</h3>
        <p className="text-xs sm:text-sm text-muted-foreground">Orders by category</p>
      </div>
      <div className="h-[200px] sm:h-[250px] lg:h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="45%"
              innerRadius={40}
              outerRadius={70}
              paddingAngle={2}
              dataKey="value"
            >
              {data.map((_, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                  stroke="transparent"
                />
              ))}
            </Pie>
            <Tooltip
              contentStyle={{
                backgroundColor: "hsl(var(--card))",
                border: "1px solid hsl(var(--border))",
                borderRadius: "8px",
                boxShadow: "var(--shadow-md)",
                fontSize: "12px",
              }}
              formatter={(value: number) => [`${value}%`, "Share"]}
            />
            <Legend
              verticalAlign="bottom"
              height={36}
              wrapperStyle={{ fontSize: "11px" }}
              formatter={(value) => (
                <span style={{ color: "hsl(var(--foreground))" }}>
                  {value}
                </span>
              )}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
