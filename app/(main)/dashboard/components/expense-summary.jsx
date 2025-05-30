import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import React from "react";

const monthNames = [
  "Jan", "Feb", "Mar", "Apr", "May", "Jun",
  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
];

const prepareChartData = (monthlySpending) =>
  monthlySpending?.map((item) => {
    const date = new Date(item.month);
    return {
      name: monthNames[date.getMonth()],
      amount: item.total,
    };
  }) || [];

const StatsCard = ({ title, value, color = "text-primary", bgColor = "bg-white" }) => (
  <div className={`${bgColor} rounded-xl shadow-sm border border-muted/30 p-4 flex-1`}>
    <p className="text-sm text-muted-foreground">{title}</p>
    <h3 className={`text-2xl font-bold mt-1 ${color}`}>{value}</h3>
  </div>
);

const ExpenseSummary = ({ monthlySpending, totalSpent }) => {
  const chartData = prepareChartData(monthlySpending);
  const currentYear = new Date().getFullYear();
  const currentMonth = new Date().getMonth();

  const currentMonthTotal = monthlySpending?.[currentMonth]?.total.toFixed(2) || "0.00";
  const yearTotal = totalSpent?.toFixed(2) || "0.00";

  return (
    <Card className="rounded-xl bg-white shadow-none border-0" style={{ border: 'none' }}>
      <CardHeader>
        <CardTitle className="text-xl font-semibold">Expense Summary</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="flex gap-6">
          <StatsCard
            title="This Month"
            value={`₹${currentMonthTotal}`}
            color="text-teal-600"
            bgColor="bg-teal-50"
          />
          <StatsCard
            title="This Year"
            value={`₹${yearTotal}`}
            color="text-orange-600"
            bgColor="bg-orange-50"  
          />
        </div>
        <div className="mt-6 h-80">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={chartData}
              margin={{
                top: 20,
                right: 20,
                left: 20,
                bottom: 20,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" vertical={false} opacity={0.2} />
              <XAxis
                dataKey="name"
                tickMargin={12}
                tick={{ fontSize: 12 }}
                axisLine={{ stroke: "#64748b" }}
                tickLine={{ stroke: "#64748b" }}
              />
              <YAxis
                tick={{ fontSize: 12 }}
                axisLine={{ stroke: "#64748b" }}
                tickLine={{ stroke: "#64748b" }}
                tickFormatter={(value) => `₹${value}`}
              />
              <Tooltip
                formatter={(value) => [`₹${value.toFixed(2)}`, "Amount"]}
                labelFormatter={() => "Spending"}
              />
              <Bar
                dataKey="amount"
                fill="#36d7b7"
                radius={[6, 6, 0, 0]}
                barSize={28}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default ExpenseSummary;
