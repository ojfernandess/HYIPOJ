import React from "react";
import DashboardLayout from "./layout/DashboardLayout";
import DashboardOverview from "./dashboard/DashboardOverview";

interface HomeProps {
  username?: string;
  userAvatar?: string;
  totalBalance?: string;
  activeInvestments?: string;
  miningPower?: string;
  affiliateEarnings?: string;
}

const Home = ({
  username = "John Investor",
  userAvatar = "https://api.dicebear.com/7.x/avataaars/svg?seed=investment",
  totalBalance = "$12,345.67",
  activeInvestments = "$5,678.90",
  miningPower = "125 GH/s",
  affiliateEarnings = "$987.65",
}: HomeProps) => {
  return (
    <DashboardLayout>
      <DashboardOverview
        username={username}
        userAvatar={userAvatar}
        totalBalance={totalBalance}
        activeInvestments={activeInvestments}
        miningPower={miningPower}
        affiliateEarnings={affiliateEarnings}
      />
    </DashboardLayout>
  );
};

export default Home;
