import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import {
  ArrowUpRight,
  ArrowDownRight,
  DollarSign,
  Wallet,
  AlertCircle,
  Check,
  Clock,
  RefreshCw,
  PiggyBank,
  LineChart,
  Users,
  HardHat,
} from "lucide-react";
import DashboardLayout from "../layout/DashboardLayout";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip as RechartsTooltip,
  Legend,
} from "recharts";

interface Transaction {
  id: string;
  type: "deposit" | "withdrawal" | "investment" | "mining" | "affiliate";
  amount: number;
  currency: string;
  status: "completed" | "pending" | "failed";
  date: string;
  description?: string;
}

interface EarningSource {
  name: string;
  value: number;
  color: string;
  icon: React.ReactNode;
}

const mockTransactions: Transaction[] = [
  {
    id: "1",
    type: "deposit",
    amount: 1000,
    currency: "USDT",
    status: "completed",
    date: "2023-06-15 14:30",
    description: "Deposit via Cryptocurrency",
  },
  {
    id: "2",
    type: "investment",
    amount: 500,
    currency: "USDT",
    status: "completed",
    date: "2023-06-14 09:45",
    description: "Gold Plan Investment",
  },
  {
    id: "3",
    type: "mining",
    amount: 25,
    currency: "USDT",
    status: "completed",
    date: "2023-06-13 22:15",
    description: "Mining Earnings - BTC",
  },
  {
    id: "4",
    type: "withdrawal",
    amount: 200,
    currency: "USDT",
    status: "pending",
    date: "2023-06-12 11:20",
    description: "Withdrawal to BTC Wallet",
  },
  {
    id: "5",
    type: "affiliate",
    amount: 50,
    currency: "USDT",
    status: "completed",
    date: "2023-06-11 16:55",
    description: "Affiliate Commission",
  },
];

const earningsSources: EarningSource[] = [
  {
    name: "Investments",
    value: 1250,
    color: "#8884d8",
    icon: <LineChart className="h-4 w-4" />,
  },
  {
    name: "Mining",
    value: 850,
    color: "#82ca9d",
    icon: <HardHat className="h-4 w-4" />,
  },
  {
    name: "Affiliate",
    value: 450,
    color: "#ffc658",
    icon: <Users className="h-4 w-4" />,
  },
];

const EarningsWithdrawals = () => {
  const [activeTab, setActiveTab] = useState("earnings");
  const [isWithdrawDialogOpen, setIsWithdrawDialogOpen] = useState(false);
  const [withdrawAmount, setWithdrawAmount] = useState("");
  const [withdrawCurrency, setWithdrawCurrency] = useState("BTC");
  const [withdrawAddress, setWithdrawAddress] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [withdrawStatus, setWithdrawStatus] = useState<
    "success" | "error" | null
  >(null);

  // Calculate total balance
  const totalBalance = 2550;
  const availableBalance = 2350;
  const pendingBalance = 200;

  // Calculate total earnings
  const totalEarnings = earningsSources.reduce(
    (sum, source) => sum + source.value,
    0,
  );

  // Handle withdrawal submission
  const handleWithdrawal = () => {
    if (!withdrawAmount || !withdrawAddress) return;

    setIsProcessing(true);

    // Validate wallet address format based on currency
    const isValidAddress = validateWalletAddress(
      withdrawAddress,
      withdrawCurrency,
    );

    if (!isValidAddress) {
      setWithdrawStatus("error");
      setIsProcessing(false);
      return;
    }

    // In a real app, this would call an API endpoint
    // For demo purposes, we'll simulate a successful withdrawal most of the time
    setTimeout(() => {
      // Process withdrawal and update balances
      const amount = parseFloat(withdrawAmount);
      // Here you would update the user's balance in a real app

      setWithdrawStatus("success");
      setIsProcessing(false);

      // In a real app, you would add the transaction to the user's history
      // and update their available balance
    }, 2000);
  };

  // Validate wallet address format based on currency
  const validateWalletAddress = (
    address: string,
    currency: string,
  ): boolean => {
    // Basic validation patterns for different cryptocurrencies
    // In a real app, you would use more sophisticated validation
    const patterns: Record<string, RegExp> = {
      BTC: /^(bc1|[13])[a-zA-HJ-NP-Z0-9]{25,39}$/,
      ETH: /^0x[a-fA-F0-9]{40}$/,
      USDT: /^0x[a-fA-F0-9]{40}$|^T[a-zA-Z0-9]{33}$/,
      TRX: /^T[a-zA-Z0-9]{33}$/,
    };

    return patterns[currency]?.test(address) ?? false;
  };

  // Format currency
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(amount);
  };

  // Get transaction icon based on type
  const getTransactionIcon = (type: Transaction["type"]) => {
    switch (type) {
      case "deposit":
        return <ArrowUpRight className="h-4 w-4 text-green-600" />;
      case "withdrawal":
        return <ArrowDownRight className="h-4 w-4 text-red-600" />;
      case "investment":
        return <LineChart className="h-4 w-4 text-purple-600" />;
      case "mining":
        return <HardHat className="h-4 w-4 text-blue-600" />;
      case "affiliate":
        return <Users className="h-4 w-4 text-orange-600" />;
      default:
        return <Clock className="h-4 w-4 text-gray-600" />;
    }
  };

  // Get status badge variant
  const getStatusBadgeVariant = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-green-100 text-green-800";
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      case "failed":
        return "bg-red-100 text-red-800";
      default:
        return "";
    }
  };

  return (
    <DashboardLayout>
      <div className="p-6 space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Earnings & Withdrawals</h1>
          <p className="text-muted-foreground mt-2">
            Manage your earnings and withdraw funds to your wallet
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Available Balance */}
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg font-medium">
                Available Balance
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="mr-4 rounded-full bg-green-100 p-2">
                    <Wallet className="h-6 w-6 text-green-600" />
                  </div>
                  <div>
                    <div className="text-3xl font-bold">
                      {formatCurrency(availableBalance)}
                    </div>
                    <div className="text-xs text-muted-foreground">
                      Available for withdrawal
                    </div>
                  </div>
                </div>
                <Button
                  onClick={() => setIsWithdrawDialogOpen(true)}
                  className="flex items-center gap-2"
                >
                  <ArrowDownRight className="h-4 w-4" />
                  Withdraw
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Pending Balance */}
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg font-medium">
                Pending Balance
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="mr-4 rounded-full bg-yellow-100 p-2">
                    <Clock className="h-6 w-6 text-yellow-600" />
                  </div>
                  <div>
                    <div className="text-3xl font-bold">
                      {formatCurrency(pendingBalance)}
                    </div>
                    <div className="text-xs text-muted-foreground">
                      Pending confirmation
                    </div>
                  </div>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  className="flex items-center gap-2"
                >
                  <RefreshCw className="h-4 w-4" />
                  Refresh
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Total Earnings */}
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg font-medium">
                Total Earnings
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="mr-4 rounded-full bg-blue-100 p-2">
                    <PiggyBank className="h-6 w-6 text-blue-600" />
                  </div>
                  <div>
                    <div className="text-3xl font-bold">
                      {formatCurrency(totalEarnings)}
                    </div>
                    <div className="text-xs text-muted-foreground">
                      Lifetime earnings
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-sm font-medium">This Month</div>
                  <div className="text-2xl font-bold text-green-600">
                    +$350.00
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-8">
            <TabsTrigger value="earnings">Earnings Breakdown</TabsTrigger>
            <TabsTrigger value="transactions">Transaction History</TabsTrigger>
          </TabsList>

          {/* Earnings Breakdown Tab */}
          <TabsContent value="earnings" className="mt-0">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card className="md:col-span-2">
                <CardHeader>
                  <CardTitle>Earnings Sources</CardTitle>
                  <CardDescription>
                    Breakdown of your earnings by source
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={earningsSources}
                          cx="50%"
                          cy="50%"
                          labelLine={false}
                          outerRadius={100}
                          fill="#8884d8"
                          dataKey="value"
                          label={({ name, percent }) =>
                            `${name}: ${(percent * 100).toFixed(0)}%`
                          }
                        >
                          {earningsSources.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                        </Pie>
                        <RechartsTooltip
                          formatter={(value: number) => formatCurrency(value)}
                        />
                        <Legend />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Earnings Details</CardTitle>
                  <CardDescription>
                    Your earnings from different sources
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    {earningsSources.map((source) => (
                      <div key={source.name} className="space-y-2">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <div
                              className="rounded-full p-1.5"
                              style={{ backgroundColor: `${source.color}20` }}
                            >
                              {source.icon}
                            </div>
                            <span className="font-medium">{source.name}</span>
                          </div>
                          <span className="font-bold">
                            {formatCurrency(source.value)}
                          </span>
                        </div>
                        <div className="w-full bg-gray-100 rounded-full h-2">
                          <div
                            className="h-2 rounded-full"
                            style={{
                              width: `${(source.value / totalEarnings) * 100}%`,
                              backgroundColor: source.color,
                            }}
                          ></div>
                        </div>
                        <div className="flex justify-between text-xs text-muted-foreground">
                          <span>
                            {((source.value / totalEarnings) * 100).toFixed(1)}%
                          </span>
                          <span>of total earnings</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Transaction History Tab */}
          <TabsContent value="transactions" className="mt-0">
            <Card>
              <CardHeader>
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                  <div>
                    <CardTitle>Transaction History</CardTitle>
                    <CardDescription>
                      Your recent transactions and withdrawals
                    </CardDescription>
                  </div>
                  <div className="flex items-center gap-2">
                    <Select defaultValue="all">
                      <SelectTrigger className="w-[150px]">
                        <SelectValue placeholder="Filter by type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Transactions</SelectItem>
                        <SelectItem value="deposit">Deposits</SelectItem>
                        <SelectItem value="withdrawal">Withdrawals</SelectItem>
                        <SelectItem value="investment">Investments</SelectItem>
                        <SelectItem value="mining">Mining</SelectItem>
                        <SelectItem value="affiliate">Affiliate</SelectItem>
                      </SelectContent>
                    </Select>
                    <Button variant="outline" size="sm">
                      <RefreshCw className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="rounded-md border">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Type</TableHead>
                        <TableHead>Description</TableHead>
                        <TableHead>Amount</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Date</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {mockTransactions.map((transaction) => (
                        <TableRow key={transaction.id}>
                          <TableCell>
                            <div className="flex items-center gap-2">
                              {getTransactionIcon(transaction.type)}
                              <span className="font-medium capitalize">
                                {transaction.type}
                              </span>
                            </div>
                          </TableCell>
                          <TableCell>{transaction.description}</TableCell>
                          <TableCell>
                            <div
                              className={`font-medium ${
                                transaction.type === "deposit" ||
                                transaction.type === "affiliate" ||
                                transaction.type === "mining"
                                  ? "text-green-600"
                                  : transaction.type === "withdrawal"
                                    ? "text-red-600"
                                    : ""
                              }`}
                            >
                              {transaction.type === "deposit" ||
                              transaction.type === "affiliate" ||
                              transaction.type === "mining"
                                ? "+"
                                : transaction.type === "withdrawal"
                                  ? "-"
                                  : ""}
                              {transaction.amount} {transaction.currency}
                            </div>
                          </TableCell>
                          <TableCell>
                            <Badge
                              className={getStatusBadgeVariant(
                                transaction.status,
                              )}
                            >
                              {transaction.status.charAt(0).toUpperCase() +
                                transaction.status.slice(1)}
                            </Badge>
                          </TableCell>
                          <TableCell>{transaction.date}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full">
                  Load More Transactions
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Withdrawal Dialog */}
        <Dialog
          open={isWithdrawDialogOpen}
          onOpenChange={setIsWithdrawDialogOpen}
        >
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Withdraw Funds</DialogTitle>
              <DialogDescription>
                Withdraw your earnings to your cryptocurrency wallet
              </DialogDescription>
            </DialogHeader>

            <div className="grid gap-6 py-4">
              <div className="flex items-center justify-between rounded-lg bg-muted p-3">
                <div className="text-sm">
                  <div className="font-medium">Available Balance</div>
                  <div className="text-muted-foreground">
                    Available for withdrawal
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-xl font-bold">
                    {formatCurrency(availableBalance)}
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="withdraw-amount">Withdrawal Amount</Label>
                  <div className="flex items-center gap-2">
                    <Input
                      id="withdraw-amount"
                      type="number"
                      placeholder="Enter amount"
                      value={withdrawAmount}
                      onChange={(e) => setWithdrawAmount(e.target.value)}
                      min="10"
                      max={availableBalance}
                    />
                    <div className="w-[100px]">
                      <Select
                        value={withdrawCurrency}
                        onValueChange={setWithdrawCurrency}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Currency" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="BTC">BTC</SelectItem>
                          <SelectItem value="ETH">ETH</SelectItem>
                          <SelectItem value="USDT">USDT</SelectItem>
                          <SelectItem value="TRX">TRX</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  {parseFloat(withdrawAmount) > availableBalance && (
                    <p className="text-sm text-red-500">
                      Amount exceeds available balance
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="withdraw-address">Wallet Address</Label>
                  <Input
                    id="withdraw-address"
                    placeholder={`Enter your ${withdrawCurrency} wallet address`}
                    value={withdrawAddress}
                    onChange={(e) => setWithdrawAddress(e.target.value)}
                  />
                </div>

                <Alert className="bg-yellow-50 border-yellow-200">
                  <AlertCircle className="h-4 w-4 text-yellow-600" />
                  <AlertTitle>Important</AlertTitle>
                  <AlertDescription className="text-yellow-700">
                    Please double-check your wallet address. Withdrawals to
                    incorrect addresses cannot be recovered.
                  </AlertDescription>
                </Alert>

                {withdrawStatus === "success" && (
                  <Alert className="bg-green-50 border-green-200">
                    <Check className="h-4 w-4 text-green-600" />
                    <AlertTitle>Withdrawal Requested</AlertTitle>
                    <AlertDescription className="text-green-700">
                      Your withdrawal request has been submitted successfully.
                      Please allow 24-48 hours for processing.
                    </AlertDescription>
                  </Alert>
                )}

                {withdrawStatus === "error" && (
                  <Alert className="bg-red-50 border-red-200">
                    <AlertCircle className="h-4 w-4 text-red-600" />
                    <AlertTitle>Withdrawal Failed</AlertTitle>
                    <AlertDescription className="text-red-700">
                      There was an error processing your withdrawal request.
                      Please try again or contact support.
                    </AlertDescription>
                  </Alert>
                )}
              </div>
            </div>

            <DialogFooter>
              <Button
                variant="outline"
                onClick={() => {
                  setIsWithdrawDialogOpen(false);
                  setWithdrawStatus(null);
                  setWithdrawAmount("");
                  setWithdrawAddress("");
                }}
              >
                Cancel
              </Button>
              <Button
                onClick={handleWithdrawal}
                disabled={
                  isProcessing ||
                  !withdrawAmount ||
                  !withdrawAddress ||
                  parseFloat(withdrawAmount) > availableBalance ||
                  parseFloat(withdrawAmount) < 10
                }
              >
                {isProcessing ? (
                  <>
                    <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                    Processing...
                  </>
                ) : (
                  "Withdraw Funds"
                )}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </DashboardLayout>
  );
};

export default EarningsWithdrawals;
