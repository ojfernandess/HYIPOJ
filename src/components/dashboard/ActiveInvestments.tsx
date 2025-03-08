import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowUpRight, Clock, DollarSign, TrendingUp } from "lucide-react";

interface Investment {
  id: string;
  name: string;
  type: "Fixed" | "Compound";
  amount: number;
  currency: string;
  returnRate: number;
  startDate: string;
  endDate: string;
  status: "Active" | "Completed" | "Pending";
  profit: number;
}

interface ActiveInvestmentsProps {
  investments?: Investment[];
  title?: string;
}

const ActiveInvestments = ({
  investments = [
    {
      id: "1",
      name: "Gold Plan",
      type: "Fixed",
      amount: 1000,
      currency: "USDT",
      returnRate: 1.5,
      startDate: "2023-10-15",
      endDate: "2023-12-15",
      status: "Active",
      profit: 150,
    },
    {
      id: "2",
      name: "Platinum Plan",
      type: "Compound",
      amount: 2500,
      currency: "BTC",
      returnRate: 2.1,
      startDate: "2023-09-20",
      endDate: "2024-03-20",
      status: "Active",
      profit: 525,
    },
    {
      id: "3",
      name: "Silver Plan",
      type: "Fixed",
      amount: 500,
      currency: "ETH",
      returnRate: 1.2,
      startDate: "2023-11-01",
      endDate: "2024-01-01",
      status: "Active",
      profit: 60,
    },
  ],
  title = "Active Investments",
}: ActiveInvestmentsProps) => {
  // Function to calculate remaining days
  const calculateRemainingDays = (endDate: string) => {
    const end = new Date(endDate);
    const today = new Date();
    const diffTime = end.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays > 0 ? diffDays : 0;
  };

  // Function to format currency
  const formatCurrency = (amount: number, currency: string) => {
    return `${amount.toFixed(2)} ${currency}`;
  };

  return (
    <Card className="w-full h-full bg-white">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-xl font-bold">{title}</CardTitle>
        <Button variant="outline" size="sm" className="ml-auto">
          View All <ArrowUpRight className="ml-2 h-4 w-4" />
        </Button>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Plan</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Return Rate</TableHead>
                <TableHead>Profit</TableHead>
                <TableHead>Time Remaining</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {investments.map((investment) => (
                <TableRow key={investment.id}>
                  <TableCell className="font-medium">
                    {investment.name}
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant={
                        investment.type === "Fixed" ? "secondary" : "default"
                      }
                    >
                      {investment.type}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center">
                      <DollarSign className="mr-1 h-4 w-4 text-muted-foreground" />
                      {formatCurrency(investment.amount, investment.currency)}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center">
                      <TrendingUp className="mr-1 h-4 w-4 text-green-500" />
                      {investment.returnRate}%{" "}
                      {investment.type === "Fixed" ? "Daily" : "Monthly"}
                    </div>
                  </TableCell>
                  <TableCell className="text-green-600 font-medium">
                    +{formatCurrency(investment.profit, investment.currency)}
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center">
                      <Clock className="mr-1 h-4 w-4 text-muted-foreground" />
                      {calculateRemainingDays(investment.endDate)} days
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant={
                        investment.status === "Active"
                          ? "default"
                          : investment.status === "Completed"
                            ? "secondary"
                            : "outline"
                      }
                    >
                      {investment.status}
                    </Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
};

export default ActiveInvestments;
