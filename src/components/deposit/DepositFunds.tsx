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
  Copy,
  AlertCircle,
  Check,
  RefreshCw,
  QrCode,
  ArrowRight,
} from "lucide-react";
import DashboardLayout from "../layout/DashboardLayout";

interface PaymentMethod {
  id: string;
  name: string;
  type: "crypto" | "fiat";
  currencies: Currency[];
  icon: React.ReactNode;
  processingTime: string;
  fee: string;
}

interface Currency {
  id: string;
  name: string;
  symbol: string;
  minDeposit: number;
  icon?: React.ReactNode;
  address?: string;
  network?: string;
}

const paymentMethods: PaymentMethod[] = [
  {
    id: "1",
    name: "Cryptocurrency",
    type: "crypto",
    currencies: [
      {
        id: "btc",
        name: "Bitcoin",
        symbol: "BTC",
        minDeposit: 0.001,
        address: "bc1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh",
        network: "Bitcoin",
      },
      {
        id: "eth",
        name: "Ethereum",
        symbol: "ETH",
        minDeposit: 0.01,
        address: "0x71C7656EC7ab88b098defB751B7401B5f6d8976F",
        network: "Ethereum (ERC20)",
      },
      {
        id: "usdt",
        name: "Tether",
        symbol: "USDT",
        minDeposit: 10,
        address: "0x71C7656EC7ab88b098defB751B7401B5f6d8976F",
        network: "Ethereum (ERC20)",
      },
      {
        id: "trx",
        name: "TRON",
        symbol: "TRX",
        minDeposit: 50,
        address: "TJYeasTPa6gpEEfYqzGsZ3dQUXXdV9xVrR",
        network: "TRON (TRC20)",
      },
    ],
    icon: <QrCode className="h-5 w-5" />,
    processingTime: "10-60 minutes",
    fee: "Network fee only",
  },
  {
    id: "2",
    name: "Credit/Debit Card",
    type: "fiat",
    currencies: [
      {
        id: "usd",
        name: "US Dollar",
        symbol: "USD",
        minDeposit: 50,
      },
      {
        id: "eur",
        name: "Euro",
        symbol: "EUR",
        minDeposit: 50,
      },
    ],
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <rect width="20" height="14" x="2" y="5" rx="2" />
        <line x1="2" x2="22" y1="10" y2="10" />
        <line x1="18" x2="18" y1="15" y2="15" />
        <line x1="14" x2="14" y1="15" y2="15" />
      </svg>
    ),
    processingTime: "Instant",
    fee: "3.5%",
  },
];

const DepositFunds = () => {
  const [selectedMethod, setSelectedMethod] = useState<PaymentMethod>(
    paymentMethods[0],
  );
  const [selectedCurrency, setSelectedCurrency] = useState<Currency | null>(
    null,
  );
  const [amount, setAmount] = useState<string>("");
  const [isAddressDialogOpen, setIsAddressDialogOpen] = useState(false);
  const [isCopied, setIsCopied] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [depositStatus, setDepositStatus] = useState<
    "pending" | "confirmed" | "failed" | null
  >(null);

  // Handle payment method change
  const handleMethodChange = (methodId: string) => {
    const method = paymentMethods.find((m) => m.id === methodId);
    if (method) {
      setSelectedMethod(method);
      setSelectedCurrency(null);
      setAmount("");
    }
  };

  // Handle currency change
  const handleCurrencyChange = (currencyId: string) => {
    const currency = selectedMethod.currencies.find((c) => c.id === currencyId);
    if (currency) {
      setSelectedCurrency(currency);
      setAmount(currency.minDeposit.toString());
    }
  };

  // Copy address to clipboard
  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  // Simulate checking for deposit
  const checkForDeposit = () => {
    setIsProcessing(true);
    // Simulate API call with timeout
    setTimeout(() => {
      // Randomly determine if deposit is confirmed (70% chance of success for demo)
      const isConfirmed = Math.random() < 0.7;
      setDepositStatus(isConfirmed ? "confirmed" : "pending");
      setIsProcessing(false);
    }, 2000);
  };

  // Format currency
  const formatCurrency = (value: number, symbol: string) => {
    return `${value} ${symbol}`;
  };

  return (
    <DashboardLayout>
      <div className="p-6 space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Deposit Funds</h1>
          <p className="text-muted-foreground mt-2">
            Add funds to your account to start investing or purchase mining
            power
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Payment Methods */}
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle>Select Payment Method</CardTitle>
              <CardDescription>
                Choose how you want to deposit funds into your account
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs
                defaultValue={selectedMethod.id}
                onValueChange={handleMethodChange}
                className="w-full"
              >
                <TabsList className="grid w-full grid-cols-2 mb-8">
                  {paymentMethods.map((method) => (
                    <TabsTrigger
                      key={method.id}
                      value={method.id}
                      className="flex items-center gap-2"
                    >
                      {method.icon}
                      <span>{method.name}</span>
                    </TabsTrigger>
                  ))}
                </TabsList>

                {paymentMethods.map((method) => (
                  <TabsContent
                    key={method.id}
                    value={method.id}
                    className="mt-0"
                  >
                    <div className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-4">
                          <Label>Select Currency</Label>
                          <Select
                            value={selectedCurrency?.id || ""}
                            onValueChange={handleCurrencyChange}
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Select currency" />
                            </SelectTrigger>
                            <SelectContent>
                              {method.currencies.map((currency) => (
                                <SelectItem
                                  key={currency.id}
                                  value={currency.id}
                                >
                                  <div className="flex items-center">
                                    <span>
                                      {currency.name} ({currency.symbol})
                                    </span>
                                  </div>
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>

                          {selectedCurrency && (
                            <div className="rounded-md bg-muted p-3 text-sm">
                              <div className="flex justify-between mb-1">
                                <span className="text-muted-foreground">
                                  Minimum Deposit:
                                </span>
                                <span className="font-medium">
                                  {formatCurrency(
                                    selectedCurrency.minDeposit,
                                    selectedCurrency.symbol,
                                  )}
                                </span>
                              </div>
                              <div className="flex justify-between mb-1">
                                <span className="text-muted-foreground">
                                  Processing Time:
                                </span>
                                <span className="font-medium">
                                  {method.processingTime}
                                </span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-muted-foreground">
                                  Fee:
                                </span>
                                <span className="font-medium">
                                  {method.fee}
                                </span>
                              </div>
                            </div>
                          )}
                        </div>

                        <div className="space-y-4">
                          <Label htmlFor="amount">Amount to Deposit</Label>
                          <div className="flex items-center gap-2">
                            <Input
                              id="amount"
                              type="number"
                              placeholder="Enter amount"
                              value={amount}
                              onChange={(e) => setAmount(e.target.value)}
                              min={selectedCurrency?.minDeposit || 0}
                              step="0.001"
                            />
                            <div className="w-[100px]">
                              <Badge
                                variant="outline"
                                className="w-full justify-center py-1 px-2"
                              >
                                {selectedCurrency?.symbol || "---"}
                              </Badge>
                            </div>
                          </div>

                          {selectedCurrency &&
                            parseFloat(amount) <
                              selectedCurrency.minDeposit && (
                              <p className="text-sm text-red-500">
                                Minimum deposit is{" "}
                                {formatCurrency(
                                  selectedCurrency.minDeposit,
                                  selectedCurrency.symbol,
                                )}
                              </p>
                            )}
                        </div>
                      </div>

                      {method.type === "crypto" && selectedCurrency && (
                        <Button
                          className="w-full mt-4"
                          disabled={
                            !selectedCurrency ||
                            !amount ||
                            parseFloat(amount) <
                              (selectedCurrency?.minDeposit || 0)
                          }
                          onClick={() => setIsAddressDialogOpen(true)}
                        >
                          Continue to Deposit
                        </Button>
                      )}

                      {method.type === "fiat" && selectedCurrency && (
                        <Button
                          className="w-full mt-4"
                          disabled={
                            !selectedCurrency ||
                            !amount ||
                            parseFloat(amount) <
                              (selectedCurrency?.minDeposit || 0)
                          }
                        >
                          Continue to Payment
                        </Button>
                      )}
                    </div>
                  </TabsContent>
                ))}
              </Tabs>
            </CardContent>
          </Card>

          {/* Recent Deposits */}
          <Card>
            <CardHeader>
              <CardTitle>Recent Deposits</CardTitle>
              <CardDescription>
                Your recent deposit transactions
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="rounded-md border p-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <Badge className="bg-green-100 text-green-800 mb-2">
                        Completed
                      </Badge>
                      <p className="font-medium">0.05 BTC</p>
                      <p className="text-sm text-muted-foreground">
                        June 15, 2023 - 14:30
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="font-medium text-green-600">$1,500.00</p>
                      <p className="text-xs text-muted-foreground">
                        Tx: bc1q...3f7j
                      </p>
                    </div>
                  </div>
                </div>

                <div className="rounded-md border p-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <Badge className="bg-yellow-100 text-yellow-800 mb-2">
                        Pending
                      </Badge>
                      <p className="font-medium">500 USDT</p>
                      <p className="text-sm text-muted-foreground">
                        June 14, 2023 - 09:45
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="font-medium">$500.00</p>
                      <p className="text-xs text-muted-foreground">
                        Tx: 0x71C...76F
                      </p>
                    </div>
                  </div>
                </div>

                <div className="rounded-md border p-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <Badge className="bg-green-100 text-green-800 mb-2">
                        Completed
                      </Badge>
                      <p className="font-medium">0.2 ETH</p>
                      <p className="text-sm text-muted-foreground">
                        June 10, 2023 - 11:20
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="font-medium text-green-600">$400.00</p>
                      <p className="text-xs text-muted-foreground">
                        Tx: 0x8dF...2aB
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="w-full">
                View All Transactions
              </Button>
            </CardFooter>
          </Card>
        </div>

        {/* Deposit Address Dialog */}
        <Dialog
          open={isAddressDialogOpen}
          onOpenChange={setIsAddressDialogOpen}
        >
          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle>Deposit {selectedCurrency?.name}</DialogTitle>
              <DialogDescription>
                Send exactly {amount} {selectedCurrency?.symbol} to the address
                below
              </DialogDescription>
            </DialogHeader>

            {selectedCurrency && (
              <div className="grid gap-6 py-4">
                <div className="flex flex-col items-center justify-center gap-4">
                  <div className="w-48 h-48 bg-white p-2 rounded-md">
                    <img
                      src={`https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${selectedCurrency.address}`}
                      alt="QR Code"
                      className="w-full h-full"
                    />
                  </div>
                  <div className="text-center">
                    <p className="font-medium">
                      Send {amount} {selectedCurrency.symbol}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      Network: {selectedCurrency.network}
                    </p>
                  </div>
                </div>

                <div className="relative">
                  <Input
                    value={selectedCurrency.address}
                    readOnly
                    className="pr-10"
                  />
                  <Button
                    variant="ghost"
                    size="icon"
                    className="absolute right-0 top-0"
                    onClick={() =>
                      copyToClipboard(selectedCurrency.address || "")
                    }
                  >
                    {isCopied ? (
                      <Check className="h-4 w-4 text-green-500" />
                    ) : (
                      <Copy className="h-4 w-4" />
                    )}
                  </Button>
                </div>

                <Alert
                  variant="destructive"
                  className="bg-red-50 text-red-800 border-red-200"
                >
                  <AlertCircle className="h-4 w-4" />
                  <AlertTitle>Important</AlertTitle>
                  <AlertDescription>
                    Send only {selectedCurrency.symbol} to this address. Sending
                    any other cryptocurrency may result in permanent loss.
                  </AlertDescription>
                </Alert>

                {depositStatus === "confirmed" && (
                  <Alert className="bg-green-50 text-green-800 border-green-200">
                    <Check className="h-4 w-4" />
                    <AlertTitle>Deposit Confirmed</AlertTitle>
                    <AlertDescription>
                      Your deposit of {amount} {selectedCurrency.symbol} has
                      been confirmed and added to your account.
                    </AlertDescription>
                  </Alert>
                )}

                {depositStatus === "pending" && (
                  <Alert className="bg-yellow-50 text-yellow-800 border-yellow-200">
                    <AlertCircle className="h-4 w-4" />
                    <AlertTitle>Deposit Pending</AlertTitle>
                    <AlertDescription>
                      Your deposit is being processed. This may take up to{" "}
                      {selectedMethod.processingTime} to complete.
                    </AlertDescription>
                  </Alert>
                )}
              </div>
            )}

            <DialogFooter className="flex-col sm:flex-row gap-2">
              <Button
                variant="outline"
                onClick={() => {
                  setIsAddressDialogOpen(false);
                  setDepositStatus(null);
                }}
              >
                Close
              </Button>
              <Button onClick={checkForDeposit} disabled={isProcessing}>
                {isProcessing ? (
                  <>
                    <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                    Checking...
                  </>
                ) : (
                  "I've Made the Payment"
                )}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </DashboardLayout>
  );
};

export default DepositFunds;
