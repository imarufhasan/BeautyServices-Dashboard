"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";

const DATA = [
  { day: "Mon", value: 62 },
  { day: "Tue", value: 78 },
  { day: "Wed", value: 71 },
  { day: "Thu", value: 85 },
  { day: "Fri", value: 92 },
  { day: "Sat", value: 88 },
  { day: "Sun", value: 65 },
];

const LEGEND = [
  { label: "Completed", color: "#2FA773" },
  { label: "Pending", color: "#E8A33D" },
  { label: "Cancelled", color: "#E5484D" },
  { label: "Refunded", color: "#FF9BB3" },
];

export function BookingChart() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Booking Analytics</CardTitle>
        <CardDescription>This week&apos;s breakdown by status</CardDescription>
        <div className="flex flex-wrap gap-3 pt-2">
          {LEGEND.map((l) => (
            <div key={l.label} className="flex items-center gap-1.5">
              <span
                className="w-2 h-2 rounded-full"
                style={{ backgroundColor: l.color }}
              />
              <span className="text-[11px] font-medium text-subtle">
                {l.label}
              </span>
            </div>
          ))}
        </div>
      </CardHeader>
      <CardContent>
        {/* Explicit inline minHeight guards against ResponsiveContainer
            collapsing to 0px if the arbitrary Tailwind height class ever
            gets purged/not generated for this file path. */}
        <div className="h-[200px]" style={{ minHeight: 200 }}>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={DATA} margin={{ left: -20, top: 10 }}>
              <CartesianGrid
                strokeDasharray="3 3"
                vertical={false}
                stroke="#EFEAF3"
              />
              <XAxis
                dataKey="day"
                tickLine={false}
                axisLine={false}
                tick={{ fontSize: 11, fill: "#8A8590" }}
              />
              <YAxis
                tickLine={false}
                axisLine={false}
                tick={{ fontSize: 11, fill: "#8A8590" }}
              />
              <Tooltip
                cursor={{ fill: "#FDE7EE", opacity: 0.4 }}
                contentStyle={{
                  borderRadius: 12,
                  border: "1px solid #EFEAF3",
                  fontSize: 12,
                }}
              />
              <Bar
                dataKey="value"
                fill="#FF9BB3"
                radius={[6, 6, 0, 0]}
                barSize={22}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
