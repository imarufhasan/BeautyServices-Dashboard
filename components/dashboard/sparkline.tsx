"use client";

import { Line, LineChart, ResponsiveContainer } from "recharts";

export type TrendPoint = {
  date: string;
  value: number;
};

// Isolated as its own Client Component because Recharts needs the browser.
// Only receives plain, serializable props (strings/numbers/arrays) so it can
// be rendered from a Server Component parent without crossing the
// server/client boundary with non-serializable values like icon components.
export function Sparkline({
  data,
  color,
}: {
  data: TrendPoint[];
  color: string;
}) {
  return (
    <div className="w-20 h-10 shrink-0" style={{ minHeight: 40 }}>
      <ResponsiveContainer width="100%" height="100%">
        <LineChart style={{marginTop: 10 }} data={data} margin={{ top: 4, bottom: 4, right: 0 }}>
          <Line
            type="monotone"
            dataKey="value"
            stroke={color}
            strokeWidth={2}
            dot={false}
            isAnimationActive={false}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}