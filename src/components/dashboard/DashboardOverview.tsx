import React from "react";
import StatisticsCards from "./StatisticsCards";
import EarningsChart from "./EarningsChart";
import ActiveInvestments from "./ActiveInvestments";
import MiningOperations from "./MiningOperations";
import RecentTransactions from "./RecentTransactions";

interface DashboardOverviewProps {
  username?: string;
  userAvatar?: string;
  totalBalance?: string;
  activeInvestments?: string;
  miningPower?: string;
  affiliateEarnings?: string;
}

const DashboardOverview = ({
  username = "John Investor",
  userAvatar = "https://api.dicebear.com/7.x/avataaars/svg?seed=investment",
  totalBalance = "$12,345.67",
  activeInvestments = "$5,678.90",
  miningPower = "125 GH/s",
  affiliateEarnings = "$987.65",
}: DashboardOverviewProps) => {
  return (
    <div className="w-full h-full bg-gray-50">
      <div className="p-4 sm:p-6 space-y-4 sm:space-y-6">
        {/* Statistics Cards */}
        <StatisticsCards
          totalBalance={totalBalance}
          activeInvestments={activeInvestments}
          miningPower={miningPower}
          affiliateEarnings={affiliateEarnings}
        />

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
          {/* Earnings Chart - Spans 2 columns */}
          <div className="lg:col-span-2">
            <EarningsChart />
          </div>

          {/* Mining Operations */}
          <div>
            <MiningOperations />
          </div>

          {/* Active Investments - Spans 2 columns */}
          <div className="lg:col-span-2">
            <ActiveInvestments />
          </div>

          {/* Recent Transactions */}
          <div>
            <RecentTransactions />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardOverview;
