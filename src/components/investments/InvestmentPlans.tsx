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
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
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
} from "@/components/ui/dialog";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import {
  Coins,
  TrendingUp,
  Clock,
  AlertCircle,
  Check,
  RefreshCw,
  Calculator,
  ChevronRight,
  Percent,
  Calendar,
  DollarSign,
} from "lucide-react";
import DashboardLayout from "../layout/DashboardLayout";

interface InvestmentPlan {
  id: string;
  name: string;
  description: string;
  minAmount: number;
  maxAmount: number;
  roi: number; // Daily ROI percentage
  term: number; // Duration in days
  totalReturn: number; // Total ROI percentage
  withdrawalType: "end_of_term" | "daily" | "anytime";
  compounding?: boolean;
  featured?: boolean;
  category: "starter" | "standard" | "premium";
}

const investmentPlans: InvestmentPlan[] = [
  {
    id: "1",
    name: "Starter Plan",
    description: "Perfect for beginners with low risk tolerance",
    minAmount: 100,
    maxAmount: 1000,
    roi: 1.2, // 1.2% daily
    term: 30, // 30 days
    totalReturn: 36, // 36% total
    withdrawalType: "end_of_term",
    category: "starter",
  },
  {
    id: "2",
    name: "Silver Plan",
    description: "Balanced investment with moderate returns",
    minAmount: 500,
    maxAmount: 5000,
    roi: 1.5, // 1.5% daily
    term: 60, // 60 days
    totalReturn: 90, // 90% total
    withdrawalType: "daily",
    category: "standard",
  },
  {
    id: "3",
    name: "Gold Plan",
    description: "Higher returns with compounding interest",
    minAmount: 1000,
    maxAmount: 10000,
    roi: 1.8, // 1.8% daily
    term: 90, // 90 days
    totalReturn: 162, // 162% total
    withdrawalType: "daily",
    compounding: true,
    featured: true,
    category: "premium",
  },
  {
    id: "4",
    name: "Platinum Plan",
    description: "Maximum returns for serious investors",
    minAmount: 5000,
    maxAmount: 50000,
    roi: 2.2, // 2.2% daily
    term: 180, // 180 days
    totalReturn: 396, // 396% total
    withdrawalType: "anytime",
    compounding: true,
    category: "premium",
  },
];

const InvestmentPlans = () => {
  const [selectedPlan, setSelectedPlan] = useState<InvestmentPlan | null>(null);
  const [investmentAmount, setInvestmentAmount] = useState<string>("");
  const [isInvestDialogOpen, setIsInvestDialogOpen] = useState(false);
  const [isCalculatorDialogOpen, setIsCalculatorDialogOpen] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [investmentStatus, setInvestmentStatus] = useState<
    "success" | "error" | null
  >(null);
  const [selectedCategory, setSelectedCategory] = useState<string>("all");

  // Calculate estimated returns
  const calculateReturns = (plan: InvestmentPlan, amount: number) => {
    const dailyReturn = (amount * plan.roi) / 100;
    let totalReturn = 0;

    if (plan.compounding) {
      let principal = amount;
      for (let i = 0; i < plan.term; i++) {
        const dailyProfit = (principal * plan.roi) / 100;
        principal += dailyProfit;
        totalReturn += dailyProfit;
      }
    } else {
      totalReturn = dailyReturn * plan.term;
    }

    return {
      dailyReturn: plan.compounding ? null : dailyReturn,
      totalReturn: totalReturn,
      finalAmount: amount + totalReturn,
    };
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

  // Handle investment submission
  const handleInvestment = () => {
    if (!selectedPlan || !investmentAmount) return;

    setIsProcessing(true);

    // Simulate API call with timeout
    setTimeout(() => {
      // Randomly determine if investment is successful (90% chance of success for demo)
      const isSuccessful = Math.random() < 0.9;
      setInvestmentStatus(isSuccessful ? "success" : "error");
      setIsProcessing(false);
    }, 2000);
  };

  // Filter plans by category
  const filteredPlans =
    selectedCategory === "all"
      ? investmentPlans
      : investmentPlans.filter((plan) => plan.category === selectedCategory);

  return (
    <DashboardLayout>
      <div className="p-6 space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Investment Plans</h1>
          <p className="text-muted-foreground mt-2">
            Choose an investment plan that suits your financial goals
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap gap-2">
          <Button
            variant={selectedCategory === "all" ? "default" : "outline"}
            onClick={() => setSelectedCategory("all")}
          >
            All Plans
          </Button>
          <Button
            variant={selectedCategory === "starter" ? "default" : "outline"}
            onClick={() => setSelectedCategory("starter")}
          >
            Starter
          </Button>
          <Button
            variant={selectedCategory === "standard" ? "default" : "outline"}
            onClick={() => setSelectedCategory("standard")}
          >
            Standard
          </Button>
          <Button
            variant={selectedCategory === "premium" ? "default" : "outline"}
            onClick={() => setSelectedCategory("premium")}
          >
            Premium
          </Button>
        </div>

        {/* Investment Plans */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredPlans.map((plan) => (
            <Card
              key={plan.id}
              className={`overflow-hidden ${plan.featured ? "border-primary" : ""}`}
            >
              {plan.featured && (
                <div className="bg-primary text-primary-foreground text-center py-1 text-sm font-medium">
                  Most Popular
                </div>
              )}
              <CardHeader>
                <CardTitle>{plan.name}</CardTitle>
                <CardDescription>{plan.description}</CardDescription>
                <div className="mt-2 text-3xl font-bold">
                  {plan.roi}% <span className="text-sm font-normal">daily</span>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">
                      Min Investment:
                    </span>
                    <span className="font-medium">
                      {formatCurrency(plan.minAmount)}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">
                      Max Investment:
                    </span>
                    <span className="font-medium">
                      {formatCurrency(plan.maxAmount)}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Term Length:</span>
                    <span className="font-medium">{plan.term} days</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Total Return:</span>
                    <span className="font-medium">{plan.totalReturn}%</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Withdrawal:</span>
                    <span className="font-medium capitalize">
                      {plan.withdrawalType.replace(/_/g, " ")}
                    </span>
                  </div>
                  {plan.compounding && (
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">
                        Compounding:
                      </span>
                      <Badge
                        variant="outline"
                        className="bg-green-100 text-green-800"
                      >
                        Enabled
                      </Badge>
                    </div>
                  )}
                </div>
              </CardContent>
              <CardFooter className="flex gap-2">
                <Button
                  variant="outline"
                  className="w-1/2"
                  onClick={() => {
                    setSelectedPlan(plan);
                    setIsCalculatorDialogOpen(true);
                  }}
                >
                  <Calculator className="mr-2 h-4 w-4" />
                  Calculate
                </Button>
                <Button
                  className="w-1/2"
                  onClick={() => {
                    setSelectedPlan(plan);
                    setInvestmentAmount(plan.minAmount.toString());
                    setIsInvestDialogOpen(true);
                  }}
                >
                  Invest Now
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>

        {/* Active Investments Summary */}
        <Card>
          <CardHeader>
            <CardTitle>Your Active Investments</CardTitle>
            <CardDescription>
              Overview of your current investment portfolio
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {/* Sample active investment */}
              <div className="rounded-lg border p-4">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                  <div>
                    <h3 className="font-medium text-lg">Gold Plan</h3>
                    <div className="flex items-center gap-2 mt-1">
                      <Badge
                        variant="outline"
                        className="bg-blue-100 text-blue-800"
                      >
                        Active
                      </Badge>
                      <span className="text-sm text-muted-foreground">
                        Started: June 10, 2023
                      </span>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm text-muted-foreground">
                      Investment Amount
                    </div>
                    <div className="font-bold text-lg">
                      {formatCurrency(2500)}
                    </div>
                  </div>
                </div>

                <div className="mt-4 space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span>Progress</span>
                    <span>45 days / 90 days (50%)</span>
                  </div>
                  <Progress value={50} className="h-2" />
                </div>

                <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="rounded-md bg-muted p-3">
                    <div className="text-sm text-muted-foreground">
                      Total Earned
                    </div>
                    <div className="font-medium text-green-600">
                      {formatCurrency(1125)}
                    </div>
                  </div>
                  <div className="rounded-md bg-muted p-3">
                    <div className="text-sm text-muted-foreground">
                      Daily Profit
                    </div>
                    <div className="font-medium">{formatCurrency(45)}</div>
                  </div>
                  <div className="rounded-md bg-muted p-3">
                    <div className="text-sm text-muted-foreground">
                      Maturity Date
                    </div>
                    <div className="font-medium">September 8, 2023</div>
                  </div>
                </div>

                <div className="mt-4 flex justify-end">
                  <Button
                    variant="outline"
                    size="sm"
                    className="flex items-center gap-1"
                  >
                    View Details
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              {/* Sample active investment */}
              <div className="rounded-lg border p-4">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                  <div>
                    <h3 className="font-medium text-lg">Silver Plan</h3>
                    <div className="flex items-center gap-2 mt-1">
                      <Badge
                        variant="outline"
                        className="bg-blue-100 text-blue-800"
                      >
                        Active
                      </Badge>
                      <span className="text-sm text-muted-foreground">
                        Started: June 25, 2023
                      </span>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm text-muted-foreground">
                      Investment Amount
                    </div>
                    <div className="font-bold text-lg">
                      {formatCurrency(1000)}
                    </div>
                  </div>
                </div>

                <div className="mt-4 space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span>Progress</span>
                    <span>30 days / 60 days (50%)</span>
                  </div>
                  <Progress value={50} className="h-2" />
                </div>

                <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="rounded-md bg-muted p-3">
                    <div className="text-sm text-muted-foreground">
                      Total Earned
                    </div>
                    <div className="font-medium text-green-600">
                      {formatCurrency(450)}
                    </div>
                  </div>
                  <div className="rounded-md bg-muted p-3">
                    <div className="text-sm text-muted-foreground">
                      Daily Profit
                    </div>
                    <div className="font-medium">{formatCurrency(15)}</div>
                  </div>
                  <div className="rounded-md bg-muted p-3">
                    <div className="text-sm text-muted-foreground">
                      Maturity Date
                    </div>
                    <div className="font-medium">August 24, 2023</div>
                  </div>
                </div>

                <div className="mt-4 flex justify-end">
                  <Button
                    variant="outline"
                    size="sm"
                    className="flex items-center gap-1"
                  >
                    View Details
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button variant="outline" className="w-full">
              View All Investments
            </Button>
          </CardFooter>
        </Card>

        {/* Investment Calculator Dialog */}
        <Dialog
          open={isCalculatorDialogOpen}
          onOpenChange={setIsCalculatorDialogOpen}
        >
          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle>Investment Calculator</DialogTitle>
              <DialogDescription>
                Calculate potential returns for your investment
              </DialogDescription>
            </DialogHeader>

            {selectedPlan && (
              <div className="grid gap-6 py-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium">{selectedPlan.name}</h3>
                    <p className="text-sm text-muted-foreground">
                      {selectedPlan.roi}% daily for {selectedPlan.term} days
                    </p>
                  </div>
                  <Badge
                    variant="outline"
                    className="bg-blue-100 text-blue-800"
                  >
                    {selectedPlan.totalReturn}% Total ROI
                  </Badge>
                </div>

                <div className="space-y-4">
                  <Label htmlFor="calc-amount">Investment Amount</Label>
                  <div className="flex items-center gap-2">
                    <Input
                      id="calc-amount"
                      type="number"
                      placeholder="Enter amount"
                      value={investmentAmount}
                      onChange={(e) => setInvestmentAmount(e.target.value)}
                      min={selectedPlan.minAmount}
                      max={selectedPlan.maxAmount}
                    />
                    <Button
                      variant="outline"
                      onClick={() =>
                        setInvestmentAmount(selectedPlan.minAmount.toString())
                      }
                      className="whitespace-nowrap"
                    >
                      Min
                    </Button>
                    <Button
                      variant="outline"
                      onClick={() =>
                        setInvestmentAmount(selectedPlan.maxAmount.toString())
                      }
                      className="whitespace-nowrap"
                    >
                      Max
                    </Button>
                  </div>
                </div>

                {investmentAmount &&
                  parseFloat(investmentAmount) >= selectedPlan.minAmount && (
                    <div className="rounded-lg border p-4 space-y-4">
                      <div className="flex items-center gap-2">
                        <TrendingUp className="h-5 w-5 text-green-600" />
                        <h3 className="font-medium">Projected Returns</h3>
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-1">
                          <div className="flex items-center gap-1">
                            <DollarSign className="h-4 w-4 text-muted-foreground" />
                            <span className="text-sm text-muted-foreground">
                              Principal
                            </span>
                          </div>
                          <p className="font-medium">
                            {formatCurrency(parseFloat(investmentAmount))}
                          </p>
                        </div>

                        <div className="space-y-1">
                          <div className="flex items-center gap-1">
                            <Percent className="h-4 w-4 text-muted-foreground" />
                            <span className="text-sm text-muted-foreground">
                              Daily ROI
                            </span>
                          </div>
                          <p className="font-medium">{selectedPlan.roi}%</p>
                        </div>

                        <div className="space-y-1">
                          <div className="flex items-center gap-1">
                            <Calendar className="h-4 w-4 text-muted-foreground" />
                            <span className="text-sm text-muted-foreground">
                              Term
                            </span>
                          </div>
                          <p className="font-medium">
                            {selectedPlan.term} days
                          </p>
                        </div>

                        <div className="space-y-1">
                          <div className="flex items-center gap-1">
                            <Coins className="h-4 w-4 text-muted-foreground" />
                            <span className="text-sm text-muted-foreground">
                              {selectedPlan.compounding
                                ? "Compounding"
                                : "Daily Profit"}
                            </span>
                          </div>
                          <p className="font-medium">
                            {selectedPlan.compounding
                              ? "Enabled"
                              : formatCurrency(
                                  (parseFloat(investmentAmount) *
                                    selectedPlan.roi) /
                                    100,
                                )}
                          </p>
                        </div>
                      </div>

                      <div className="pt-4 border-t">
                        <div className="flex justify-between items-center">
                          <span className="text-sm font-medium">
                            Total Profit:
                          </span>
                          <span className="font-bold text-green-600">
                            {formatCurrency(
                              calculateReturns(
                                selectedPlan,
                                parseFloat(investmentAmount),
                              ).totalReturn,
                            )}
                          </span>
                        </div>
                        <div className="flex justify-between items-center mt-2">
                          <span className="text-sm font-medium">
                            Final Amount:
                          </span>
                          <span className="font-bold text-lg">
                            {formatCurrency(
                              calculateReturns(
                                selectedPlan,
                                parseFloat(investmentAmount),
                              ).finalAmount,
                            )}
                          </span>
                        </div>
                      </div>
                    </div>
                  )}

                <Alert className="bg-yellow-50 border-yellow-200">
                  <AlertCircle className="h-4 w-4 text-yellow-600" />
                  <AlertTitle>Important</AlertTitle>
                  <AlertDescription className="text-yellow-700">
                    Investment returns are estimates and not guaranteed. Past
                    performance is not indicative of future results.
                  </AlertDescription>
                </Alert>
              </div>
            )}

            <DialogFooter className="flex justify-between">
              <Button
                variant="outline"
                onClick={() => setIsCalculatorDialogOpen(false)}
              >
                Close
              </Button>
              <Button
                onClick={() => {
                  setIsCalculatorDialogOpen(false);
                  setIsInvestDialogOpen(true);
                }}
              >
                Invest Now
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Investment Dialog */}
        <Dialog open={isInvestDialogOpen} onOpenChange={setIsInvestDialogOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Confirm Investment</DialogTitle>
              <DialogDescription>
                Review and confirm your investment details
              </DialogDescription>
            </DialogHeader>

            {selectedPlan && (
              <div className="grid gap-6 py-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium">{selectedPlan.name}</h3>
                    <p className="text-sm text-muted-foreground">
                      {selectedPlan.roi}% daily for {selectedPlan.term} days
                    </p>
                  </div>
                  <Badge
                    variant="outline"
                    className="bg-blue-100 text-blue-800"
                  >
                    {selectedPlan.totalReturn}% Total ROI
                  </Badge>
                </div>

                <div className="space-y-4">
                  <Label htmlFor="invest-amount">Investment Amount</Label>
                  <Input
                    id="invest-amount"
                    type="number"
                    placeholder="Enter amount"
                    value={investmentAmount}
                    onChange={(e) => setInvestmentAmount(e.target.value)}
                    min={selectedPlan.minAmount}
                    max={selectedPlan.maxAmount}
                  />
                  {parseFloat(investmentAmount) < selectedPlan.minAmount && (
                    <p className="text-sm text-red-500">
                      Minimum investment is{" "}
                      {formatCurrency(selectedPlan.minAmount)}
                    </p>
                  )}
                  {parseFloat(investmentAmount) > selectedPlan.maxAmount && (
                    <p className="text-sm text-red-500">
                      Maximum investment is{" "}
                      {formatCurrency(selectedPlan.maxAmount)}
                    </p>
                  )}
                </div>

                <div className="rounded-lg border p-4 space-y-2">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Plan:</span>
                    <span className="font-medium">{selectedPlan.name}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Daily ROI:</span>
                    <span className="font-medium">{selectedPlan.roi}%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Term:</span>
                    <span className="font-medium">
                      {selectedPlan.term} days
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">
                      Withdrawal Type:
                    </span>
                    <span className="font-medium capitalize">
                      {selectedPlan.withdrawalType.replace(/_/g, " ")}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Compounding:</span>
                    <span className="font-medium">
                      {selectedPlan.compounding ? "Enabled" : "Disabled"}
                    </span>
                  </div>
                  <div className="flex justify-between pt-2 border-t mt-2">
                    <span className="font-medium">Total Return:</span>
                    <span className="font-bold text-green-600">
                      {formatCurrency(
                        calculateReturns(
                          selectedPlan,
                          parseFloat(investmentAmount),
                        ).totalReturn,
                      )}
                    </span>
                  </div>
                </div>

                <Alert className="bg-blue-50 border-blue-200">
                  <Clock className="h-4 w-4 text-blue-600" />
                  <AlertTitle>Investment Term</AlertTitle>
                  <AlertDescription className="text-blue-700">
                    Your investment will mature on{" "}
                    {new Date(
                      Date.now() + selectedPlan.term * 24 * 60 * 60 * 1000,
                    ).toLocaleDateString()}
                    .
                    {selectedPlan.withdrawalType === "end_of_term"
                      ? " Profits will be available at the end of the term."
                      : selectedPlan.withdrawalType === "daily"
                        ? " Profits will be credited to your account daily."
                        : " You can withdraw your investment at any time."}
                  </AlertDescription>
                </Alert>

                {investmentStatus === "success" && (
                  <Alert className="bg-green-50 border-green-200">
                    <Check className="h-4 w-4 text-green-600" />
                    <AlertTitle>Investment Successful</AlertTitle>
                    <AlertDescription className="text-green-700">
                      Your investment has been successfully placed. You can
                      track its progress in your dashboard.
                    </AlertDescription>
                  </Alert>
                )}

                {investmentStatus === "error" && (
                  <Alert className="bg-red-50 border-red-200">
                    <AlertCircle className="h-4 w-4 text-red-600" />
                    <AlertTitle>Investment Failed</AlertTitle>
                    <AlertDescription className="text-red-700">
                      There was an error processing your investment. Please try
                      again or contact support.
                    </AlertDescription>
                  </Alert>
                )}
              </div>
            )}

            <DialogFooter>
              <Button
                variant="outline"
                onClick={() => {
                  setIsInvestDialogOpen(false);
                  setInvestmentStatus(null);
                }}
              >
                Cancel
              </Button>
              <Button
                onClick={handleInvestment}
                disabled={
                  isProcessing ||
                  !investmentAmount ||
                  parseFloat(investmentAmount) <
                    (selectedPlan?.minAmount || 0) ||
                  parseFloat(investmentAmount) > (selectedPlan?.maxAmount || 0)
                }
              >
                {isProcessing ? (
                  <>
                    <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                    Processing...
                  </>
                ) : (
                  "Confirm Investment"
                )}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </DashboardLayout>
  );
};

export default InvestmentPlans;
