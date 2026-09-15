"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

// Datos de muestra (puedes recibirlos vía props o desde una consulta de TanStack Query)
const mockHistoryData = [
  { time: "10:00", btc: 64200, eth: 3450 },
  { time: "11:00", btc: 64800, eth: 3490 },
  { time: "12:00", btc: 64500, eth: 3470 },
  { time: "13:00", btc: 65100, eth: 3520 },
  { time: "14:00", btc: 65400, eth: 3560 },
  { time: "15:00", btc: 65250, eth: 3540 },
];

export function CryptoLineChart() {
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Historial de Precios (USD)</CardTitle>
        <CardDescription>
          Tendencia intradía de Bitcoin vs Ethereum
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-[320px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={mockHistoryData}
              margin={{ top: 10, right: 20, left: 10, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
              <XAxis
                dataKey="time"
                stroke="#888888"
                fontSize={12}
                tickLine={false}
                axisLine={false}
              />
              <YAxis
                stroke="#888888"
                fontSize={12}
                tickLine={false}
                axisLine={false}
                tickFormatter={(value) => `$${value.toLocaleString()}`}
              />
              <Tooltip
                content={({ active, payload, label }) => {
                  if (active && payload && payload.length) {
                    return (
                      <div className="rounded-lg border bg-background p-2 shadow-sm">
                        <p className="text-xs font-semibold text-muted-foreground">
                          {label}
                        </p>
                        {payload.map((entry) => (
                          <p
                            key={entry.name}
                            className="text-sm font-medium"
                            style={{ color: entry.color }}
                          >
                            {entry.name}: $
                            {Number(entry.value).toLocaleString()}
                          </p>
                        ))}
                      </div>
                    );
                  }
                  return null;
                }}
              />
              <Legend verticalAlign="top" height={36} />

              {/* Línea Bitcoin (usando color naranja o token primario) */}
              <Line
                type="monotone"
                dataKey="btc"
                name="Bitcoin"
                stroke="#f7931a"
                strokeWidth={2}
                dot={false}
                activeDot={{ r: 5 }}
              />

              {/* Línea Ethereum (usando color azul o acento) */}
              <Line
                type="monotone"
                dataKey="eth"
                name="Ethereum"
                stroke="#627eea"
                strokeWidth={2}
                dot={false}
                activeDot={{ r: 5 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
