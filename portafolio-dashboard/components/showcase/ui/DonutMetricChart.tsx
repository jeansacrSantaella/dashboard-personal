"use client";

import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";

export interface SliceData {
  name: string;
  value: number;
  color: string;
}

export interface DonutMetricChartProps {
  data: SliceData[];
  centerLabel?: string;
  centerSublabel?: string;
  innerRadius?: number;
  outerRadius?: number;
  paddingAngle?: number;
}

export function DonutMetricChart({
  data,
  centerLabel,
  centerSublabel,
  innerRadius = 50,
  outerRadius = 70,
  paddingAngle = 4,
}: DonutMetricChartProps) {
  const total = data.reduce((acc, curr) => acc + curr.value, 0);

  return (
    <div className="relative h-56 w-56">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Tooltip
            content={({ active, payload }) => {
              if (active && payload && payload.length) {
                const item = payload[0].payload as SliceData;
                const percentage =
                  total > 0 ? ((item.value / total) * 100).toFixed(1) : "0";
                return (
                  <div className="rounded-md border bg-background px-2.5 py-1.5 shadow-md text-xs">
                    <span
                      className="font-semibold"
                      style={{ color: item.color }}
                    >
                      {item.name}:{" "}
                    </span>
                    <span className="text-muted-foreground">
                      {percentage}% ({item.value})
                    </span>
                  </div>
                );
              }
              return null;
            }}
          />
          <Pie
            data={data}
            dataKey="value"
            nameKey="name"
            cx="50%"
            cy="50%"
            innerRadius={innerRadius}
            outerRadius={outerRadius}
            paddingAngle={paddingAngle}
            stroke="none"
          >
            {data.map((entry) => (
              <Cell key={entry.name} fill={entry.color} />
            ))}
          </Pie>
        </PieChart>
      </ResponsiveContainer>
      {(centerLabel || centerSublabel) && (
        <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center text-center">
          {centerLabel && (
            <span className="text-2xl font-extrabold tracking-tight text-foreground">
              {centerLabel}
            </span>
          )}
          {centerSublabel && (
            <span className="text-[11px] font-medium text-muted-foreground">
              {centerSublabel}
            </span>
          )}
        </div>
      )}
    </div>
  );
}
