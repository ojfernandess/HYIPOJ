import React, { useState, useEffect } from "react";
import DashboardLayout from "../layout/DashboardLayout";
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
import { Slider } from "@/components/ui/slider";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
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
import {
  HardHat,
  Bitcoin,
  Coins,
  Waves,
  BarChart3,
  Calculator,
  Check,
  RefreshCw,
  DollarSign,
  Wallet,
  AlertCircle,
  Info,
  Cpu,
} from "lucide-react";

interface MiningPackage {
  id: string;
  name: string;
  power: number;
  price: number;
  duration: number; // in days
  maintenance: number; // daily maintenance fee
  available: number; // available units
  popular?: boolean;
}

interface Cryptocurrency {
  id: string;
  name: string;
  symbol: string;
  icon: React.ReactNode;
  currentProfitability: number; // USD per GH/s per day
  difficulty: number;
  color: string;
}

const miningPackages: MiningPackage[] = [
  {
    id: "1",
    name: "Starter Miner",
    power: 50,
    price: 250,
    duration: 180,
    maintenance: 0.05,
    available: 100,
  },
  {
    id: "2",
    name: "Advanced Miner",
    power: 150,
    price: 700,
    duration: 365,
    maintenance: 0.04,
    available: 50,
    popular: true,
  },
  {
    id: "3",
    name: "Pro Miner",
    power: 500,
    price: 2000,
    duration: 730, // 2 years
    maintenance: 0.03,
    available: 20,
  },
  {
    id: "4",
    name: "Enterprise Miner",
    power: 2000,
    price: 7500,
    duration: 1095, // 3 years
    maintenance: 0.02,
    available: 5,
  },
];

const cryptocurrencies: Cryptocurrency[] = [
  {
    id: "1",
    name: "Bitcoin",
    symbol: "BTC",
    icon: <Bitcoin className="h-5 w-5" />,
    currentProfitability: 0.00012,
    difficulty: 8.5,
    color: "text-orange-500",
  },
  {
    id: "2",
    name: "Ethereum",
    symbol: "ETH",
    icon: <Coins className="h-5 w-5" />,
    currentProfitability: 0.00025,
    difficulty: 6.2,
    color: "text-purple-500",
  },
  {
    id: "3",
    name: "Litecoin",
    symbol: "LTC",
    icon: <Cpu className="h-5 w-5" />,
    currentProfitability: 0.00035,
    difficulty: 4.8,
    color: "text-gray-500",
  },
  {
    id: "4",
    name: "Ripple",
    symbol: "XRP",
    icon: <Waves className="h-5 w-5" />,
    currentProfitability: 0.00042,
    difficulty: 3.5,
    color: "text-blue-500",
  },
];

const MiningPowerMarketplace = () => {
  const [selectedPackage, setSelectedPackage] = useState<MiningPackage | null>(
    null,
  );
  const [selectedCrypto, setSelectedCrypto] = useState<Cryptocurrency>(
    cryptocurrencies[0],
  );
  const [customPower, setCustomPower] = useState<number>(100);
  const [customDuration, setCustomDuration] = useState<number>(365);
  const [isCalculatorOpen, setIsCalculatorOpen] = useState(false);
  const [isPurchaseOpen, setIsPurchaseOpen] = useState(false);
  const [purchaseQuantity, setPurchaseQuantity] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [userBalance, setUserBalance] = useState(2500);
  const [purchaseMethod, setPurchaseMethod] = useState("deposit");
  const [isReinvestDialogOpen, setIsReinvestDialogOpen] = useState(false);
  const [reinvestAmount, setReinvestAmount] = useState(100);

  // Calculate estimated earnings based on selected package and cryptocurrency
  const calculateEarnings = (
    power: number,
    crypto: Cryptocurrency,
    days: number,
  ) => {
    const dailyEarning = power * crypto.currentProfitability;
    const maintenanceFee =
      power *
      (selectedPackage ? selectedPackage.maintenance / 100 : 0.04 / 100);
    const netDailyEarning = dailyEarning - maintenanceFee;
    const totalEarning = netDailyEarning * days;

    return {
      daily: dailyEarning,
      maintenance: maintenanceFee,
      netDaily: netDailyEarning,
      total: totalEarning,
    };
  };

  // Calculate ROI (Return on Investment)
  const calculateROI = (
    power: number,
    price: number,
    crypto: Cryptocurrency,
    days: number,
  ) => {
    const earnings = calculateEarnings(power, crypto, days);
    const roi = (earnings.total / price) * 100;
    return roi;
  };

  // Calculate breakeven days
  const calculateBreakeven = (
    power: number,
    price: number,
    crypto: Cryptocurrency,
  ) => {
    const dailyEarning = calculateEarnings(power, crypto, 1).netDaily;
    if (dailyEarning <= 0) return Infinity;
    return Math.ceil(price / dailyEarning);
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

  // Format crypto amount
  const formatCrypto = (amount: number, symbol: string) => {
    return `${amount.toFixed(8)} ${symbol}`;
  };

  // Handle package purchase
  const handlePurchase = () => {
    if (!selectedPackage) return;

    setIsSubmitting(true);

    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setIsPurchaseOpen(false);

      // If using balance, deduct from user balance
      if (
        purchaseMethod === "balance" &&
        selectedPackage.price * purchaseQuantity <= userBalance
      ) {
        setUserBalance(
          (prev) => prev - selectedPackage.price * purchaseQuantity,
        );
      }

      setSuccessMessage(
        `Successfully purchased ${selectedPackage.power * purchaseQuantity} GH/s of mining power!`,
      );
      setTimeout(() => setSuccessMessage(null), 5000);
      setSelectedPackage(null);
    }, 1500);
  };

  // Handle custom package purchase
  const handleCustomPurchase = () => {
    setIsSubmitting(true);

    // Calculate price based on custom power
    const price = (customPower / 50) * 250;

    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);

      // Deduct from user balance if sufficient
      if (price <= userBalance) {
        setUserBalance((prev) => prev - price);
      }

      setSuccessMessage(
        `Successfully purchased ${customPower} GH/s of custom mining power!`,
      );
      setTimeout(() => setSuccessMessage(null), 5000);
    }, 1500);
  };

  // Handle reinvestment
  const handleReinvest = () => {
    setIsSubmitting(true);

    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setIsReinvestDialogOpen(false);

      // Calculate GH/s gained (assuming $5 per GH/s)
      const ghsGained = Math.round(reinvestAmount / 5);

      // Deduct from user balance
      setUserBalance((prev) => prev - reinvestAmount);

      setSuccessMessage(
        `Successfully reinvested $${reinvestAmount} and gained ${ghsGained} GH/s of mining power!`,
      );
      setTimeout(() => setSuccessMessage(null), 5000);
    }, 1500);
  };

  return (
    <DashboardLayout>
      <div className="p-6 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold">Mining Power Marketplace</h1>
            <p className="text-muted-foreground mt-2">
              Purchase mining power and start earning cryptocurrency rewards
            </p>
          </div>
          <div className="flex items-center gap-2">
            <div className="text-right">
              <p className="text-sm text-muted-foreground">Your Balance</p>
              <p className="text-xl font-bold">${userBalance.toFixed(2)}</p>
            </div>
            <Button
              variant="outline"
              size="sm"
              className="flex items-center gap-2"
            >
              <Wallet className="h-4 w-4" />
              <span>Deposit</span>
            </Button>
          </div>
        </div>

        {successMessage && (
          <Alert className="bg-green-50 border-green-200">
            <Check className="h-4 w-4 text-green-600" />
            <AlertTitle>Success</AlertTitle>
            <AlertDescription className="text-green-700">
              {successMessage}
            </AlertDescription>
          </Alert>
        )}

        <Tabs defaultValue="packages" className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-8">
            <TabsTrigger value="packages">Mining Packages</TabsTrigger>
            <TabsTrigger value="custom">Custom Mining Power</TabsTrigger>
          </TabsList>

          {/* Mining Packages Tab */}
          <TabsContent value="packages" className="mt-0">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {miningPackages.map((pkg) => (
                <Card
                  key={pkg.id}
                  className={`overflow-hidden ${pkg.popular ? "border-primary" : ""}`}
                >
                  {pkg.popular && (
                    <div className="bg-primary text-primary-foreground text-center py-1 text-sm font-medium">
                      Most Popular
                    </div>
                  )}
                  <CardHeader>
                    <CardTitle>{pkg.name}</CardTitle>
                    <CardDescription>
                      {pkg.power} GH/s for {pkg.duration} days
                    </CardDescription>
                    <div className="mt-2 text-3xl font-bold">
                      {formatCurrency(pkg.price)}
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">
                          Mining Power:
                        </span>
                        <span className="font-medium">{pkg.power} GH/s</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">
                          Contract Duration:
                        </span>
                        <span className="font-medium">{pkg.duration} days</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">
                          Maintenance Fee:
                        </span>
                        <span className="font-medium">
                          {pkg.maintenance}% daily
                        </span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">
                          Available Units:
                        </span>
                        <span className="font-medium">{pkg.available}</span>
                      </div>
                      <div className="pt-2">
                        <div className="text-sm text-muted-foreground mb-1">
                          Estimated Daily Earnings with BTC:
                        </div>
                        <div className="font-medium text-green-600">
                          {formatCrypto(
                            pkg.power *
                              cryptocurrencies[0].currentProfitability,
                            "BTC",
                          )}
                          <span className="text-muted-foreground text-xs ml-1">
                            (≈{" "}
                            {formatCurrency(
                              pkg.power *
                                cryptocurrencies[0].currentProfitability *
                                30000,
                            )}
                            )
                          </span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="flex gap-2">
                    <Button
                      variant="outline"
                      className="w-1/2"
                      onClick={() => {
                        setSelectedPackage(pkg);
                        setIsCalculatorOpen(true);
                      }}
                    >
                      <Calculator className="mr-2 h-4 w-4" />
                      Calculate
                    </Button>
                    <Button
                      className="w-1/2"
                      onClick={() => {
                        setSelectedPackage(pkg);
                        setPurchaseQuantity(1);
                        setIsPurchaseOpen(true);
                      }}
                    >
                      Purchase
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Custom Mining Power Tab */}
          <TabsContent value="custom" className="mt-0">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <Card>
                <CardHeader>
                  <CardTitle>Configure Custom Mining Power</CardTitle>
                  <CardDescription>
                    Customize your mining power and contract duration
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <Label htmlFor="mining-power">
                          Mining Power (GH/s)
                        </Label>
                        <span className="font-medium">{customPower} GH/s</span>
                      </div>
                      <Slider
                        id="mining-power"
                        min={10}
                        max={5000}
                        step={10}
                        value={[customPower]}
                        onValueChange={(value) => setCustomPower(value[0])}
                      />
                      <div className="flex justify-between text-xs text-muted-foreground">
                        <span>10 GH/s</span>
                        <span>5000 GH/s</span>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <Label htmlFor="contract-duration">
                          Contract Duration (days)
                        </Label>
                        <span className="font-medium">
                          {customDuration} days
                        </span>
                      </div>
                      <Slider
                        id="contract-duration"
                        min={30}
                        max={1095}
                        step={30}
                        value={[customDuration]}
                        onValueChange={(value) => setCustomDuration(value[0])}
                      />
                      <div className="flex justify-between text-xs text-muted-foreground">
                        <span>30 days</span>
                        <span>1095 days (3 years)</span>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="crypto-select">
                        Select Cryptocurrency to Mine
                      </Label>
                      <Select
                        value={selectedCrypto.id}
                        onValueChange={(value) => {
                          const crypto = cryptocurrencies.find(
                            (c) => c.id === value,
                          );
                          if (crypto) setSelectedCrypto(crypto);
                        }}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select cryptocurrency" />
                        </SelectTrigger>
                        <SelectContent>
                          {cryptocurrencies.map((crypto) => (
                            <SelectItem key={crypto.id} value={crypto.id}>
                              <div className="flex items-center">
                                <div className={`mr-2 ${crypto.color}`}>
                                  {crypto.icon}
                                </div>
                                <span>
                                  {crypto.name} ({crypto.symbol})
                                </span>
                              </div>
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="rounded-lg border p-4 space-y-2">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">
                          Estimated Price:
                        </span>
                        <span className="font-medium">
                          {formatCurrency((customPower / 50) * 250)}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">
                          Maintenance Fee:
                        </span>
                        <span className="font-medium">0.04% daily</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button
                    className="w-full"
                    onClick={handleCustomPurchase}
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <>
                        <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                        Processing...
                      </>
                    ) : (
                      "Purchase Custom Mining Power"
                    )}
                  </Button>
                </CardFooter>
              </Card>

              <div className="rounded-lg border p-6 space-y-6">
                <div>
                  <h3 className="text-lg font-medium mb-2">
                    Profitability Estimate
                  </h3>
                  <div className="flex items-center gap-2 mb-4">
                    <div className={`${selectedCrypto.color}`}>
                      {selectedCrypto.icon}
                    </div>
                    <span className="font-medium">
                      {selectedCrypto.name} ({selectedCrypto.symbol})
                    </span>
                  </div>

                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">
                        Daily Earnings (Gross):
                      </span>
                      <div>
                        <span className="font-medium">
                          {formatCrypto(
                            customPower * selectedCrypto.currentProfitability,
                            selectedCrypto.symbol,
                          )}
                        </span>
                        <span className="text-xs text-muted-foreground ml-1">
                          (≈{" "}
                          {formatCurrency(
                            customPower *
                              selectedCrypto.currentProfitability *
                              30000,
                          )}
                          )
                        </span>
                      </div>
                    </div>

                    <div className="flex justify-between">
                      <span className="text-muted-foreground">
                        Maintenance Fee:
                      </span>
                      <span className="font-medium text-red-500">
                        {formatCurrency(customPower * 0.0004)}/day
                      </span>
                    </div>

                    <div className="flex justify-between">
                      <span className="text-muted-foreground">
                        Daily Earnings (Net):
                      </span>
                      <span className="font-medium text-green-600">
                        {formatCurrency(
                          customPower *
                            selectedCrypto.currentProfitability *
                            30000 -
                            customPower * 0.0004,
                        )}
                        /day
                      </span>
                    </div>

                    <div className="pt-2 border-t">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">
                          Total Contract Earnings:
                        </span>
                        <span className="font-medium text-green-600">
                          {formatCurrency(
                            (customPower *
                              selectedCrypto.currentProfitability *
                              30000 -
                              customPower * 0.0004) *
                              customDuration,
                          )}
                        </span>
                      </div>
                    </div>

                    <div className="flex justify-between">
                      <span className="text-muted-foreground">ROI:</span>
                      <span className="font-medium">
                        {(
                          (((customPower *
                            selectedCrypto.currentProfitability *
                            30000 -
                            customPower * 0.0004) *
                            customDuration) /
                            ((customPower / 50) * 250)) *
                          100
                        ).toFixed(2)}
                        %
                      </span>
                    </div>

                    <div className="flex justify-between">
                      <span className="text-muted-foreground">
                        Breakeven Period:
                      </span>
                      <span className="font-medium">
                        {Math.ceil(
                          ((customPower / 50) * 250) /
                            (customPower *
                              selectedCrypto.currentProfitability *
                              30000 -
                              customPower * 0.0004),
                        )}{" "}
                        days
                      </span>
                    </div>
                  </div>
                </div>

                <div className="pt-4 border-t">
                  <h3 className="text-lg font-medium mb-4">
                    Reinvest from Balance
                  </h3>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-muted-foreground">
                        Available Balance:
                      </span>
                      <span className="font-medium">
                        ${userBalance.toFixed(2)}
                      </span>
                    </div>
                    <div className="space-y-2">
                      <Label>Amount to Reinvest</Label>
                      <div className="flex items-center gap-2">
                        <DollarSign className="h-4 w-4 text-muted-foreground" />
                        <Input
                          type="number"
                          value={reinvestAmount}
                          onChange={(e) =>
                            setReinvestAmount(
                              Math.min(
                                userBalance,
                                Math.max(50, parseFloat(e.target.value) || 0),
                              ),
                            )
                          }
                          min="50"
                          max={userBalance}
                          step="50"
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label>Mining Power to Gain</Label>
                      <div className="flex justify-between items-center rounded-md border p-3">
                        <span className="text-muted-foreground">
                          Estimated GH/s:
                        </span>
                        <span className="font-medium">
                          {Math.round(reinvestAmount / 5)} GH/s
                        </span>
                      </div>
                    </div>
                    <Button
                      className="w-full"
                      onClick={() => setIsReinvestDialogOpen(true)}
                      disabled={
                        reinvestAmount < 50 || reinvestAmount > userBalance
                      }
                    >
                      Reinvest Now
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>

        {/* Calculator Dialog */}
        <Dialog open={isCalculatorOpen} onOpenChange={setIsCalculatorOpen}>
          <DialogContent className="sm:max-w-[600px]">
            <DialogHeader>
              <DialogTitle>Mining Profitability Calculator</DialogTitle>
              <DialogDescription>
                Calculate potential earnings for different cryptocurrencies
              </DialogDescription>
            </DialogHeader>

            {selectedPackage && (
              <div className="grid gap-6 py-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium">{selectedPackage.name}</h3>
                    <p className="text-sm text-muted-foreground">
                      {selectedPackage.power} GH/s for{" "}
                      {selectedPackage.duration} days
                    </p>
                  </div>
                  <div className="text-xl font-bold">
                    {formatCurrency(selectedPackage.price)}
                  </div>
                </div>

                <div className="space-y-4">
                  <Label>Select Cryptocurrency to Mine</Label>
                  <Select
                    value={selectedCrypto.id}
                    onValueChange={(value) => {
                      const crypto = cryptocurrencies.find(
                        (c) => c.id === value,
                      );
                      if (crypto) setSelectedCrypto(crypto);
                    }}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select cryptocurrency" />
                    </SelectTrigger>
                    <SelectContent>
                      {cryptocurrencies.map((crypto) => (
                        <SelectItem key={crypto.id} value={crypto.id}>
                          <div className="flex items-center">
                            <div className={`mr-2 ${crypto.color}`}>
                              {crypto.icon}
                            </div>
                            <span>
                              {crypto.name} ({crypto.symbol})
                            </span>
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="rounded-lg border p-4 space-y-4">
                  <div className="flex items-center gap-2 mb-2">
                    <div className={`${selectedCrypto.color}`}>
                      {selectedCrypto.icon}
                    </div>
                    <span className="font-medium">
                      {selectedCrypto.name} ({selectedCrypto.symbol})
                      Profitability
                    </span>
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">
                        Daily Earnings (Gross):
                      </span>
                      <div>
                        <span className="font-medium">
                          {formatCrypto(
                            selectedPackage.power *
                              selectedCrypto.currentProfitability,
                            selectedCrypto.symbol,
                          )}
                        </span>
                        <span className="text-xs text-muted-foreground ml-1">
                          (≈{" "}
                          {formatCurrency(
                            selectedPackage.power *
                              selectedCrypto.currentProfitability *
                              30000,
                          )}
                          )
                        </span>
                      </div>
                    </div>

                    <div className="flex justify-between">
                      <span className="text-muted-foreground">
                        Maintenance Fee:
                      </span>
                      <span className="font-medium text-red-500">
                        {formatCurrency(
                          selectedPackage.power *
                            (selectedPackage.maintenance / 100),
                        )}
                        /day
                      </span>
                    </div>

                    <div className="flex justify-between">
                      <span className="text-muted-foreground">
                        Daily Earnings (Net):
                      </span>
                      <span className="font-medium text-green-600">
                        {formatCurrency(
                          selectedPackage.power *
                            selectedCrypto.currentProfitability *
                            30000 -
                            selectedPackage.power *
                              (selectedPackage.maintenance / 100),
                        )}
                        /day
                      </span>
                    </div>

                    <div className="pt-2 border-t">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">
                          Total Contract Earnings:
                        </span>
                        <span className="font-medium text-green-600">
                          {formatCurrency(
                            (selectedPackage.power *
                              selectedCrypto.currentProfitability *
                              30000 -
                              selectedPackage.power *
                                (selectedPackage.maintenance / 100)) *
                              selectedPackage.duration,
                          )}
                        </span>
                      </div>
                    </div>

                    <div className="flex justify-between">
                      <span className="text-muted-foreground">ROI:</span>
                      <span className="font-medium">
                        {(
                          (((selectedPackage.power *
                            selectedCrypto.currentProfitability *
                            30000 -
                            selectedPackage.power *
                              (selectedPackage.maintenance / 100)) *
                            selectedPackage.duration) /
                            selectedPackage.price) *
                          100
                        ).toFixed(2)}
                        %
                      </span>
                    </div>

                    <div className="flex justify-between">
                      <span className="text-muted-foreground">
                        Breakeven Period:
                      </span>
                      <span className="font-medium">
                        {Math.ceil(
                          selectedPackage.price /
                            (selectedPackage.power *
                              selectedCrypto.currentProfitability *
                              30000 -
                              selectedPackage.power *
                                (selectedPackage.maintenance / 100)),
                        )}{" "}
                        days
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center rounded-lg border p-4 bg-yellow-50">
                  <Info className="h-5 w-5 text-yellow-500 mr-2 flex-shrink-0" />
                  <p className="text-sm text-yellow-700">
                    Mining profitability can vary based on network difficulty,
                    cryptocurrency prices, and other factors. These calculations
                    are estimates and not guaranteed returns.
                  </p>
                </div>
              </div>
            )}

            <DialogFooter className="flex justify-between">
              <Button
                variant="outline"
                onClick={() => setIsCalculatorOpen(false)}
              >
                Close
              </Button>
              <Button
                onClick={() => {
                  setIsCalculatorOpen(false);
                  setIsPurchaseOpen(true);
                }}
              >
                Purchase Package
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Purchase Dialog */}
        <Dialog open={isPurchaseOpen} onOpenChange={setIsPurchaseOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Purchase Mining Power</DialogTitle>
              <DialogDescription>
                Complete your mining power purchase
              </DialogDescription>
            </DialogHeader>

            {selectedPackage && (
              <div className="grid gap-6 py-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium">{selectedPackage.name}</h3>
                    <p className="text-sm text-muted-foreground">
                      {selectedPackage.power} GH/s for{" "}
                      {selectedPackage.duration} days
                    </p>
                  </div>
                  <div className="text-xl font-bold">
                    {formatCurrency(selectedPackage.price)}
                  </div>
                </div>

                <div className="space-y-4">
                  <Label>Select Cryptocurrency to Mine</Label>
                  <Select
                    value={selectedCrypto.id}
                    onValueChange={(value) => {
                      const crypto = cryptocurrencies.find(
                        (c) => c.id === value,
                      );
                      if (crypto) setSelectedCrypto(crypto);
                    }}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select cryptocurrency" />
                    </SelectTrigger>
                    <SelectContent>
                      {cryptocurrencies.map((crypto) => (
                        <SelectItem key={crypto.id} value={crypto.id}>
                          <div className="flex items-center">
                            <div className={`mr-2 ${crypto.color}`}>
                              {crypto.icon}
                            </div>
                            <span>
                              {crypto.name} ({crypto.symbol})
                            </span>
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-4">
                  <Label htmlFor="quantity">Quantity</Label>
                  <div className="flex items-center gap-4">
                    <Input
                      id="quantity"
                      type="number"
                      min="1"
                      max={selectedPackage.available}
                      value={purchaseQuantity}
                      onChange={(e) =>
                        setPurchaseQuantity(parseInt(e.target.value) || 1)
                      }
                    />
                    <span className="text-sm text-muted-foreground">
                      {selectedPackage.available} available
                    </span>
                  </div>
                </div>

                <div className="space-y-4">
                  <Label>Payment Method</Label>
                  <div className="grid grid-cols-2 gap-4">
                    <Button
                      variant={
                        purchaseMethod === "deposit" ? "default" : "outline"
                      }
                      className="justify-center"
                      onClick={() => setPurchaseMethod("deposit")}
                    >
                      New Deposit
                    </Button>
                    <Button
                      variant={
                        purchaseMethod === "balance" ? "default" : "outline"
                      }
                      className="justify-center"
                      onClick={() => setPurchaseMethod("balance")}
                      disabled={
                        userBalance <
                        (selectedPackage?.price * purchaseQuantity || 0)
                      }
                    >
                      Use Balance
                      {userBalance <
                        (selectedPackage?.price * purchaseQuantity || 0) &&
                        " (Insufficient)"}
                    </Button>
                  </div>
                </div>

                <div className="rounded-lg border p-4 space-y-2">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">
                      Price per unit:
                    </span>
                    <span className="font-medium">
                      {formatCurrency(selectedPackage.price)}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Quantity:</span>
                    <span className="font-medium">{purchaseQuantity}</span>
                  </div>
                  <div className="flex justify-between pt-2 border-t mt-2">
                    <span className="font-medium">Total Price:</span>
                    <span className="font-bold">
                      {formatCurrency(selectedPackage.price * purchaseQuantity)}
                    </span>
                  </div>
                </div>

                <div className="rounded-lg border p-4 space-y-2">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">
                      Total Mining Power:
                    </span>
                    <span className="font-medium">
                      {selectedPackage.power * purchaseQuantity} GH/s
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">
                      Daily Earnings (Est.):
                    </span>
                    <span className="font-medium text-green-600">
                      {formatCurrency(
                        selectedPackage.power *
                          purchaseQuantity *
                          selectedCrypto.currentProfitability *
                          30000 -
                          selectedPackage.power *
                            purchaseQuantity *
                            (selectedPackage.maintenance / 100),
                      )}
                      /day
                    </span>
                  </div>
                </div>

                {purchaseMethod === "balance" &&
                  userBalance <
                    (selectedPackage?.price * purchaseQuantity || 0) && (
                    <Alert className="bg-yellow-50 border-yellow-200">
                      <AlertCircle className="h-4 w-4 text-yellow-600" />
                      <AlertTitle>Insufficient Balance</AlertTitle>
                      <AlertDescription className="text-yellow-700">
                        Your current balance is insufficient for this purchase.
                        Please add funds or select a different payment method.
                      </AlertDescription>
                    </Alert>
                  )}
              </div>
            )}

            <DialogFooter>
              <Button
                variant="outline"
                onClick={() => setIsPurchaseOpen(false)}
              >
                Cancel
              </Button>
              <Button
                onClick={handlePurchase}
                disabled={
                  isSubmitting ||
                  (purchaseMethod === "balance" &&
                    userBalance <
                      (selectedPackage?.price * purchaseQuantity || 0))
                }
              >
                {isSubmitting ? (
                  <>
                    <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                    Processing...
                  </>
                ) : (
                  "Complete Purchase"
                )}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Reinvestment Dialog */}
        <Dialog
          open={isReinvestDialogOpen}
          onOpenChange={setIsReinvestDialogOpen}
        >
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Confirm Reinvestment</DialogTitle>
              <DialogDescription>
                Review your reinvestment details
              </DialogDescription>
            </DialogHeader>

            <div className="space-y-4 py-4">
              <div className="rounded-md border p-4 space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">
                    Reinvestment Amount:
                  </span>
                  <span className="font-bold">${reinvestAmount}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">
                    Mining Power to Gain:
                  </span>
                  <span className="font-medium">
                    {Math.round(reinvestAmount / 5)} GH/s
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">
                    Daily Profit Increase:
                  </span>
                  <span className="text-green-600">
                    $
                    {(
                      Math.round(reinvestAmount / 5) *
                      selectedCrypto.currentProfitability *
                      30000
                    ).toFixed(2)}
                  </span>
                </div>
              </div>
            </div>

            <DialogFooter>
              <Button
                variant="outline"
                onClick={() => setIsReinvestDialogOpen(false)}
              >
                Cancel
              </Button>
              <Button onClick={handleReinvest} disabled={isSubmitting}>
                {isSubmitting ? (
                  <>
                    <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                    Processing...
                  </>
                ) : (
                  "Confirm Reinvestment"
                )}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </DashboardLayout>
  );
};

export default MiningPowerMarketplace;
