import React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { ArrowUpRight, ArrowDownRight, Clock } from "lucide-react";

interface Transaction {
  id: string;
  type: "deposit" | "withdrawal" | "investment" | "mining" | "affiliate";
  amount: number;
  currency: string;
  status: "completed" | "pending" | "failed";
  date: string;
}

interface RecentTransactionsProps {
  transactions?: Transaction[];
}

const RecentTransactions = ({
  transactions = defaultTransactions,
}: RecentTransactionsProps) => {
  return (
    <Card className="w-full bg-white">
      <CardHeader>
        <CardTitle className="text-lg font-semibold">
          Recent Transactions
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Type</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Date</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {transactions.map((transaction) => (
                <TableRow key={transaction.id}>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      {getTransactionIcon(transaction.type)}
                      <span className="font-medium">
                        {formatTransactionType(transaction.type)}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div
                      className={`font-medium ${transaction.type === "deposit" || transaction.type === "affiliate" || transaction.type === "mining" ? "text-green-600" : "text-red-600"}`}
                    >
                      {transaction.type === "deposit" ||
                      transaction.type === "affiliate" ||
                      transaction.type === "mining"
                        ? "+"
                        : "-"}
                      {transaction.amount} {transaction.currency}
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant={
                        transaction.status === "completed"
                          ? "default"
                          : transaction.status === "pending"
                            ? "secondary"
                            : "destructive"
                      }
                      className={
                        transaction.status === "completed"
                          ? "bg-green-100 text-green-800"
                          : transaction.status === "pending"
                            ? "bg-yellow-100 text-yellow-800"
                            : "bg-red-100 text-red-800"
                      }
                    >
                      {transaction.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <span className="text-sm text-gray-500">
                      {transaction.date}
                    </span>
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

const getTransactionIcon = (type: Transaction["type"]) => {
  switch (type) {
    case "deposit":
      return <ArrowUpRight className="h-4 w-4 text-green-600" />;
    case "withdrawal":
      return <ArrowDownRight className="h-4 w-4 text-red-600" />;
    case "investment":
      return <ArrowDownRight className="h-4 w-4 text-red-600" />;
    case "mining":
      return <ArrowUpRight className="h-4 w-4 text-green-600" />;
    case "affiliate":
      return <ArrowUpRight className="h-4 w-4 text-green-600" />;
    default:
      return <Clock className="h-4 w-4 text-gray-600" />;
  }
};

const formatTransactionType = (type: Transaction["type"]) => {
  return type.charAt(0).toUpperCase() + type.slice(1);
};

const defaultTransactions: Transaction[] = [
  {
    id: "1",
    type: "deposit",
    amount: 0.05,
    currency: "BTC",
    status: "completed",
    date: "2023-06-15 14:30",
  },
  {
    id: "2",
    type: "investment",
    amount: 500,
    currency: "USDT",
    status: "completed",
    date: "2023-06-14 09:45",
  },
  {
    id: "3",
    type: "mining",
    amount: 0.002,
    currency: "BTC",
    status: "pending",
    date: "2023-06-13 22:15",
  },
  {
    id: "4",
    type: "withdrawal",
    amount: 0.03,
    currency: "ETH",
    status: "pending",
    date: "2023-06-12 11:20",
  },
  {
    id: "5",
    type: "affiliate",
    amount: 50,
    currency: "USDT",
    status: "completed",
    date: "2023-06-11 16:55",
  },
];

export default RecentTransactions;
