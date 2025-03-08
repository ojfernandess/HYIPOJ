import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

interface EarningsChartProps {
  data?: {
    date: string;
    investments: number;
    mining: number;
    affiliate: number;
  }[];
  title?: string;
  description?: string;
}

const defaultData = [
  { date: "Jan 1", investments: 400, mining: 240, affiliate: 100 },
  { date: "Jan 7", investments: 450, mining: 290, affiliate: 120 },
  { date: "Jan 14", investments: 500, mining: 350, affiliate: 150 },
  { date: "Jan 21", investments: 470, mining: 380, affiliate: 170 },
  { date: "Jan 28", investments: 540, mining: 400, affiliate: 190 },
  { date: "Feb 4", investments: 580, mining: 450, affiliate: 210 },
  { date: "Feb 11", investments: 550, mining: 480, affiliate: 230 },
  { date: "Feb 18", investments: 620, mining: 520, affiliate: 250 },
  { date: "Feb 25", investments: 700, mining: 550, affiliate: 270 },
  { date: "Mar 4", investments: 750, mining: 600, affiliate: 290 },
];

const EarningsChart = ({
  data = defaultData,
  title = "Earnings Overview",
  description = "Track your earnings from investments, mining operations, and affiliate commissions.",
}: EarningsChartProps) => {
  const [timeRange, setTimeRange] = useState("30days");
  const [chartType, setChartType] = useState("all");

  // Filter data based on selected chart type
  const getFilteredData = () => {
    if (chartType === "all") return data;

    return data.map((item) => {
      const newItem: any = { date: item.date };
      newItem[chartType] = item[chartType as keyof typeof item];
      return newItem;
    });
  };

  return (
    <Card className="w-full h-full bg-white">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>{title}</CardTitle>
            <CardDescription>{description}</CardDescription>
          </div>
          <div className="flex items-center space-x-2">
            <Select value={timeRange} onValueChange={setTimeRange}>
              <SelectTrigger className="w-[140px]">
                <SelectValue placeholder="Select Range" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="7days">Last 7 Days</SelectItem>
                <SelectItem value="30days">Last 30 Days</SelectItem>
                <SelectItem value="90days">Last 90 Days</SelectItem>
                <SelectItem value="year">This Year</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="all" value={chartType} onValueChange={setChartType}>
          <TabsList className="mb-4">
            <TabsTrigger value="all">All Earnings</TabsTrigger>
            <TabsTrigger value="investments">Investments</TabsTrigger>
            <TabsTrigger value="mining">Mining</TabsTrigger>
            <TabsTrigger value="affiliate">Affiliate</TabsTrigger>
          </TabsList>
          <TabsContent value={chartType} className="h-[280px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={getFilteredData()}
                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Legend />
                {chartType === "all" || chartType === "investments" ? (
                  <Line
                    type="monotone"
                    dataKey="investments"
                    stroke="#8884d8"
                    strokeWidth={2}
                    activeDot={{ r: 8 }}
                  />
                ) : null}
                {chartType === "all" || chartType === "mining" ? (
                  <Line
                    type="monotone"
                    dataKey="mining"
                    stroke="#82ca9d"
                    strokeWidth={2}
                  />
                ) : null}
                {chartType === "all" || chartType === "affiliate" ? (
                  <Line
                    type="monotone"
                    dataKey="affiliate"
                    stroke="#ffc658"
                    strokeWidth={2}
                  />
                ) : null}
              </LineChart>
            </ResponsiveContainer>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default EarningsChart;
