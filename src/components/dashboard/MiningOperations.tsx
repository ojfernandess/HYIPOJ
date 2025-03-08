import React, { useState } from "react";
import { Bitcoin, Coins, Waves, BarChart3, RefreshCw } from "lucide-react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";

interface MiningOperation {
  id: string;
  cryptocurrency: string;
  icon: React.ReactNode;
  power: number;
  totalPower: number;
  earnings: number;
  currency: string;
  lastUpdated: string;
}

interface MiningOperationsProps {
  operations?: MiningOperation[];
  totalEarnings?: number;
  totalPower?: number;
}

const MiningOperations = ({
  operations = [
    {
      id: "1",
      cryptocurrency: "Bitcoin",
      icon: <Bitcoin className="h-5 w-5 text-orange-500" />,
      power: 350,
      totalPower: 500,
      earnings: 0.00042,
      currency: "BTC",
      lastUpdated: "2 minutes ago",
    },
    {
      id: "2",
      cryptocurrency: "Ethereum",
      icon: <Coins className="h-5 w-5 text-purple-500" />,
      power: 200,
      totalPower: 500,
      earnings: 0.0085,
      currency: "ETH",
      lastUpdated: "5 minutes ago",
    },
    {
      id: "3",
      cryptocurrency: "Ripple",
      icon: <Waves className="h-5 w-5 text-blue-500" />,
      power: 150,
      totalPower: 500,
      earnings: 25.34,
      currency: "XRP",
      lastUpdated: "3 minutes ago",
    },
  ],
  totalEarnings = 0.00312,
  totalPower = 700,
}: MiningOperationsProps) => {
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [miningData, setMiningData] = useState({
    operations,
    totalEarnings,
    totalPower,
  });

  const refreshMiningData = () => {
    setIsRefreshing(true);

    // Simulate API call to refresh mining data
    setTimeout(() => {
      // Generate slightly different values to simulate real-time updates
      const updatedOperations = miningData.operations.map((op) => {
        const powerMultiplier = 1 + (Math.random() * 0.1 - 0.05);
        const earningsMultiplier = 1 + (Math.random() * 0.15 - 0.05);
        const newPower = Math.round(op.power * powerMultiplier);
        const newEarnings = op.earnings * earningsMultiplier;

        return {
          ...op,
          power: newPower,
          earnings: Number(newEarnings.toFixed(5)),
          lastUpdated: "just now",
        };
      });

      const newTotalPower = updatedOperations.reduce(
        (sum, op) => sum + op.power,
        0,
      );
      const newTotalEarnings = Number(
        (miningData.totalEarnings * (1 + (Math.random() * 0.1 - 0.02))).toFixed(
          5,
        ),
      );

      setMiningData({
        operations: updatedOperations,
        totalEarnings: newTotalEarnings,
        totalPower: newTotalPower,
      });

      setIsRefreshing(false);
    }, 1500);
  };

  return (
    <Card className="w-full bg-white shadow-md">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <div className="space-y-1">
          <CardTitle className="text-xl font-bold">Mining Operations</CardTitle>
          <CardDescription>
            Your active mining power and earnings
          </CardDescription>
        </div>
        <div className="flex items-center space-x-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={refreshMiningData}
            disabled={isRefreshing}
          >
            <RefreshCw
              className={`h-5 w-5 ${isRefreshing ? "animate-spin text-primary" : "text-muted-foreground"}`}
            />
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="mb-6 flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-500">
              Total Mining Power
            </p>
            <p className="text-2xl font-bold">{miningData.totalPower} GH/s</p>
          </div>
          <div className="text-right">
            <p className="text-sm font-medium text-gray-500">
              Total Earnings (24h)
            </p>
            <p className="text-2xl font-bold">
              ${miningData.totalEarnings.toFixed(5)}
            </p>
          </div>
        </div>

        <div className="space-y-4">
          {miningData.operations.map((operation) => (
            <div key={operation.id} className="rounded-lg border p-4">
              <div className="mb-2 flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="rounded-full bg-gray-100 p-2">
                    {operation.icon}
                  </div>
                  <div>
                    <p className="font-medium">{operation.cryptocurrency}</p>
                    <p className="text-sm text-gray-500">
                      {operation.power} GH/s
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-medium">
                    {operation.earnings} {operation.currency}
                  </p>
                  <p className="text-xs text-gray-500">
                    Updated {operation.lastUpdated}
                  </p>
                </div>
              </div>
              <div className="mt-2">
                <div className="mb-1 flex items-center justify-between text-xs">
                  <span>Power Allocation</span>
                  <span>
                    {Math.round((operation.power / operation.totalPower) * 100)}
                    %
                  </span>
                </div>
                <Progress
                  value={(operation.power / operation.totalPower) * 100}
                  className="h-1"
                />
              </div>
            </div>
          ))}
        </div>
      </CardContent>
      <CardFooter className="border-t pt-4">
        <Button
          className="flex w-full items-center justify-center rounded-md border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
          onClick={refreshMiningData}
          disabled={isRefreshing}
        >
          {isRefreshing ? (
            <>
              <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
              Refreshing Mining Data...
            </>
          ) : (
            <>
              <RefreshCw className="mr-2 h-4 w-4" />
              Refresh Mining Data
            </>
          )}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default MiningOperations;
