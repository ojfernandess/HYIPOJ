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
  DialogTrigger,
} from "@/components/ui/dialog";
import { Slider } from "@/components/ui/slider";
import {
  Bitcoin,
  Cpu,
  Coins,
  Waves,
  ArrowRight,
  Calculator,
  Info,
} from "lucide-react";
import DashboardLayout from "../layout/DashboardLayout";

interface MiningPackage {
  id: string;
  name: string;
  power: number; // GH/s
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

  return (
    <DashboardLayout>
      <div className="p-6 space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Mining Power Marketplace</h1>
          <p className="text-muted-foreground mt-2">
            Purchase mining power and start earning cryptocurrency rewards
          </p>
        </div>

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
            <Card>
              <CardHeader>
                <CardTitle>Configure Custom Mining Power</CardTitle>
                <CardDescription>
                  Customize your mining power and contract duration
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
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
                                customPower *
                                  selectedCrypto.currentProfitability,
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

                    <div className="pt-4">
                      <Button className="w-full">
                        Purchase Custom Mining Power
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
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
              </div>
            )}

            <DialogFooter>
              <Button
                variant="outline"
                onClick={() => setIsPurchaseOpen(false)}
              >
                Cancel
              </Button>
              <Button>Complete Purchase</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </DashboardLayout>
  );
};

export default MiningPowerMarketplace;
