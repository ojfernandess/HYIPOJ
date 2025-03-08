import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowUpRight, ArrowDownRight, Cpu, Users } from "lucide-react";

interface StatCardProps {
  title: string;
  value: string;
  change?: {
    value: string;
    isPositive: boolean;
  };
  icon: React.ReactNode;
  className?: string;
}

const StatCard = ({
  title = "Statistic",
  value = "$0.00",
  change,
  icon = <ArrowUpRight className="h-4 w-4" />,
  className = "",
}: StatCardProps) => {
  return (
    <Card className={`bg-white ${className}`}>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">
          {title}
        </CardTitle>
        <div className="rounded-full bg-muted p-2">{icon}</div>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        {change && (
          <p
            className={`mt-1 flex items-center text-xs ${change.isPositive ? "text-green-500" : "text-red-500"}`}
          >
            {change.isPositive ? (
              <ArrowUpRight className="mr-1 h-3 w-3" />
            ) : (
              <ArrowDownRight className="mr-1 h-3 w-3" />
            )}
            {change.value}
          </p>
        )}
      </CardContent>
    </Card>
  );
};

interface StatisticsCardsProps {
  totalBalance?: string;
  activeInvestments?: string;
  miningPower?: string;
  affiliateEarnings?: string;
  balanceChange?: {
    value: string;
    isPositive: boolean;
  };
  investmentsChange?: {
    value: string;
    isPositive: boolean;
  };
  miningChange?: {
    value: string;
    isPositive: boolean;
  };
  affiliateChange?: {
    value: string;
    isPositive: boolean;
  };
}

const StatisticsCards = ({
  totalBalance = "$12,345.67",
  activeInvestments = "$5,678.90",
  miningPower = "125 GH/s",
  affiliateEarnings = "$987.65",
  balanceChange = { value: "2.5% this week", isPositive: true },
  investmentsChange = { value: "3.2% this month", isPositive: true },
  miningChange = { value: "1.8% this week", isPositive: false },
  affiliateChange = { value: "5.7% this month", isPositive: true },
}: StatisticsCardsProps) => {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 bg-gray-50 p-4 rounded-lg">
      <StatCard
        title="Total Balance"
        value={totalBalance}
        change={balanceChange}
        icon={<ArrowUpRight className="h-4 w-4" />}
      />
      <StatCard
        title="Active Investments"
        value={activeInvestments}
        change={investmentsChange}
        icon={<ArrowUpRight className="h-4 w-4" />}
      />
      <StatCard
        title="Mining Power"
        value={miningPower}
        change={miningChange}
        icon={<Cpu className="h-4 w-4" />}
      />
      <StatCard
        title="Affiliate Earnings"
        value={affiliateEarnings}
        change={affiliateChange}
        icon={<Users className="h-4 w-4" />}
      />
    </div>
  );
};

export default StatisticsCards;
