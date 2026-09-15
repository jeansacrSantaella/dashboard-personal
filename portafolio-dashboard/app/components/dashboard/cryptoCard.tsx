"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useMemo } from "react";
import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ReferenceLine,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const mockRawData = [
  { time: "10:00", btc: 64200, eth: 3450 },
  { time: "11:00", btc: 64800, eth: 3490 },
  { time: "12:00", btc: 64500, eth: 3470 },
  { time: "13:00", btc: 65100, eth: 3520 },
  { time: "14:00", btc: 65400, eth: 3560 },
  { time: "15:00", btc: 65250, eth: 3540 },
];

export function CryptoLineChart() {
  // Calcula el % de cambio respecto al precio base de inicio
  const chartData = useMemo(() => {
    if (!mockRawData.length) return [];
    const baseBtc = mockRawData[0].btc;
    const baseEth = mockRawData[0].eth;

    return mockRawData.map((item) => ({
      ...item,
      btcChange: Number((((item.btc - baseBtc) / baseBtc) * 100).toFixed(2)),
      ethChange: Number((((item.eth - baseEth) / baseEth) * 100).toFixed(2)),
    }));
  }, []);

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Rendimiento Relativo (%)</CardTitle>
        <CardDescription>
          Variación porcentual intradía: Bitcoin vs Ethereum
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-[320px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={chartData}
              margin={{ top: 10, right: 20, left: 0, bottom: 5 }}
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
                tickFormatter={(val) => `${val > 0 ? `+${val}` : val}%`}
              />
              {/* Línea base en 0% */}
              <ReferenceLine y={0} stroke="#888888" strokeDasharray="2 2" />

              <Tooltip
                content={({ active, payload, label }) => {
                  if (active && payload && payload.length) {
                    const row = payload[0].payload;
                    return (
                      <div className="rounded-lg border bg-background p-2 shadow-sm text-xs space-y-1">
                        <p className="font-semibold text-muted-foreground">
                          {label}
                        </p>
                        <p
                          className="text-sm font-medium"
                          style={{ color: "#f7931a" }}
                        >
                          BTC:{" "}
                          {row.btcChange >= 0
                            ? `+${row.btcChange}`
                            : row.btcChange}
                          %
                          <span className="text-muted-foreground text-[10px] ml-1">
                            (${row.btc.toLocaleString()})
                          </span>
                        </p>
                        <p
                          className="text-sm font-medium"
                          style={{ color: "#627eea" }}
                        >
                          ETH:{" "}
                          {row.ethChange >= 0
                            ? `+${row.ethChange}`
                            : row.ethChange}
                          %
                          <span className="text-muted-foreground text-[10px] ml-1">
                            (${row.eth.toLocaleString()})
                          </span>
                        </p>
                      </div>
                    );
                  }
                  return null;
                }}
              />
              <Legend verticalAlign="top" height={36} />

              <Line
                type="monotone"
                dataKey="btcChange"
                name="Bitcoin (% cambio)"
                stroke="#f7931a"
                strokeWidth={2}
                dot={false}
                activeDot={{ r: 5 }}
              />
              <Line
                type="monotone"
                dataKey="ethChange"
                name="Ethereum (% cambio)"
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
