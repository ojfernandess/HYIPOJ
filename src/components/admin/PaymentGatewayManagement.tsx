import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Plus, Github, MoreHorizontal, Trash2, RefreshCw } from "lucide-react";

interface PaymentGateway {
  id: string;
  name: string;
  type: "crypto" | "fiat";
  status: "active" | "inactive" | "testing";
  currencies: string[];
  minDeposit: Record<string, number>;
  githubRepo?: string;
  apiKey?: string;
  secretKey?: string;
  lastUpdated: string;
}

const mockGateways: PaymentGateway[] = [
  {
    id: "1",
    name: "Paykassa",
    type: "crypto",
    status: "active",
    currencies: ["BTC", "ETH", "USDT", "TRX"],
    minDeposit: {
      BTC: 0.001,
      ETH: 0.01,
      USDT: 10,
      TRX: 50,
    },
    githubRepo: "https://github.com/paykassa/payment-gateway",
    apiKey: "pk_test_123456789",
    secretKey: "sk_test_987654321",
    lastUpdated: "2023-05-15",
  },
  {
    id: "2",
    name: "CoinPayments",
    type: "crypto",
    status: "active",
    currencies: ["BTC", "ETH", "LTC", "DOGE"],
    minDeposit: {
      BTC: 0.0005,
      ETH: 0.02,
      LTC: 0.1,
      DOGE: 100,
    },
    githubRepo: "https://github.com/coinpayments/gateway",
    apiKey: "cp_api_key_123",
    secretKey: "cp_secret_key_456",
    lastUpdated: "2023-06-10",
  },
  {
    id: "3",
    name: "Custom Gateway",
    type: "crypto",
    status: "testing",
    currencies: ["BTC", "USDT"],
    minDeposit: {
      BTC: 0.002,
      USDT: 20,
    },
    githubRepo: "https://github.com/custom/crypto-gateway",
    lastUpdated: "2023-06-20",
  },
];

const PaymentGatewayManagement = () => {
  const [gateways, setGateways] = useState<PaymentGateway[]>(mockGateways);
  const [isAddGatewayOpen, setIsAddGatewayOpen] = useState(false);
  const [isEditGatewayOpen, setIsEditGatewayOpen] = useState(false);
  const [selectedGateway, setSelectedGateway] = useState<PaymentGateway | null>(
    null,
  );
  const [newGithubRepo, setNewGithubRepo] = useState("");
  const [isImporting, setIsImporting] = useState(false);
  const [importError, setImportError] = useState("");

  // Function to handle gateway status change
  const handleStatusChange = (
    gatewayId: string,
    newStatus: "active" | "inactive" | "testing",
  ) => {
    setGateways(
      gateways.map((gateway) =>
        gateway.id === gatewayId ? { ...gateway, status: newStatus } : gateway,
      ),
    );
  };

  // Function to handle gateway deletion
  const handleDeleteGateway = (gatewayId: string) => {
    setGateways(gateways.filter((gateway) => gateway.id !== gatewayId));
  };

  // Function to simulate importing a gateway from GitHub
  const handleImportFromGithub = () => {
    if (!newGithubRepo) {
      setImportError("Please enter a valid GitHub repository URL");
      return;
    }

    setIsImporting(true);
    setImportError("");

    // Simulate API call with timeout
    setTimeout(() => {
      // Check if it's a valid GitHub URL (simple validation)
      if (!newGithubRepo.includes("github.com")) {
        setImportError("Invalid GitHub repository URL");
        setIsImporting(false);
        return;
      }

      // Create a new gateway
      const newGateway: PaymentGateway = {
        id: `${gateways.length + 1}`,
        name: `Imported Gateway ${gateways.length + 1}`,
        type: "crypto",
        status: "testing",
        currencies: ["BTC", "ETH"],
        minDeposit: {
          BTC: 0.001,
          ETH: 0.01,
        },
        githubRepo: newGithubRepo,
        lastUpdated: new Date().toISOString().split("T")[0],
      };

      setGateways([...gateways, newGateway]);
      setNewGithubRepo("");
      setIsImporting(false);
      setIsAddGatewayOpen(false);
    }, 2000); // Simulate 2 second delay for API call
  };

  // Function to get status badge variant
  const getStatusBadgeVariant = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-800";
      case "inactive":
        return "bg-red-100 text-red-800";
      case "testing":
        return "bg-yellow-100 text-yellow-800";
      default:
        return "";
    }
  };

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <CardTitle className="text-2xl font-bold">
                Payment Gateway Management
              </CardTitle>
              <CardDescription>
                Configure payment methods and minimum deposit amounts
              </CardDescription>
            </div>
            <div className="flex items-center gap-2">
              <Dialog
                open={isAddGatewayOpen}
                onOpenChange={setIsAddGatewayOpen}
              >
                <DialogTrigger asChild>
                  <Button className="flex items-center gap-2">
                    <Plus className="h-4 w-4" />
                    <span>Add Gateway</span>
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Add Payment Gateway</DialogTitle>
                    <DialogDescription>
                      Import a payment gateway from GitHub or configure manually
                    </DialogDescription>
                  </DialogHeader>

                  <div className="grid gap-6 py-4">
                    <div className="space-y-2">
                      <h3 className="text-sm font-medium">
                        Import from GitHub
                      </h3>
                      <div className="flex items-center gap-2">
                        <div className="relative flex-1">
                          <Github className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                          <Input
                            placeholder="GitHub repository URL"
                            className="pl-8"
                            value={newGithubRepo}
                            onChange={(e) => setNewGithubRepo(e.target.value)}
                          />
                        </div>
                        <Button
                          onClick={handleImportFromGithub}
                          disabled={isImporting}
                        >
                          {isImporting ? (
                            <>
                              <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                              Importing...
                            </>
                          ) : (
                            "Import"
                          )}
                        </Button>
                      </div>
                      {importError && (
                        <p className="text-sm text-red-500">{importError}</p>
                      )}
                      <p className="text-xs text-muted-foreground">
                        The system will automatically configure the gateway
                        based on the repository structure.
                      </p>
                    </div>

                    <div className="space-y-4">
                      <h3 className="text-sm font-medium">
                        Manual Configuration
                      </h3>
                      <div className="grid grid-cols-4 items-center gap-4">
                        <label htmlFor="gateway-name" className="text-right">
                          Name
                        </label>
                        <Input
                          id="gateway-name"
                          placeholder="Gateway Name"
                          className="col-span-3"
                        />
                      </div>
                      <div className="grid grid-cols-4 items-center gap-4">
                        <label htmlFor="gateway-type" className="text-right">
                          Type
                        </label>
                        <Select defaultValue="crypto">
                          <SelectTrigger className="col-span-3">
                            <SelectValue placeholder="Select type" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="crypto">
                              Cryptocurrency
                            </SelectItem>
                            <SelectItem value="fiat">Fiat</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="grid grid-cols-4 items-center gap-4">
                        <label htmlFor="gateway-api" className="text-right">
                          API Key
                        </label>
                        <Input
                          id="gateway-api"
                          placeholder="API Key"
                          className="col-span-3"
                        />
                      </div>
                      <div className="grid grid-cols-4 items-center gap-4">
                        <label htmlFor="gateway-secret" className="text-right">
                          Secret Key
                        </label>
                        <Input
                          id="gateway-secret"
                          type="password"
                          placeholder="Secret Key"
                          className="col-span-3"
                        />
                      </div>
                    </div>
                  </div>

                  <DialogFooter>
                    <Button
                      variant="outline"
                      onClick={() => setIsAddGatewayOpen(false)}
                    >
                      Cancel
                    </Button>
                    <Button>Add Gateway</Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Gateway</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Currencies</TableHead>
                  <TableHead>Min. Deposit</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Last Updated</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {gateways.map((gateway) => (
                  <TableRow key={gateway.id}>
                    <TableCell>
                      <div className="font-medium">{gateway.name}</div>
                      {gateway.githubRepo && (
                        <div className="text-xs text-muted-foreground flex items-center gap-1">
                          <Github className="h-3 w-3" />
                          <span>
                            {gateway.githubRepo.split("/").slice(-2).join("/")}
                          </span>
                        </div>
                      )}
                    </TableCell>
                    <TableCell>
                      <Badge
                        variant={
                          gateway.type === "crypto" ? "outline" : "secondary"
                        }
                      >
                        {gateway.type === "crypto" ? "Cryptocurrency" : "Fiat"}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex flex-wrap gap-1">
                        {gateway.currencies.map((currency) => (
                          <Badge key={currency} variant="outline">
                            {currency}
                          </Badge>
                        ))}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="text-sm">
                        {Object.entries(gateway.minDeposit).map(
                          ([currency, amount]) => (
                            <div key={currency}>
                              {amount} {currency}
                            </div>
                          ),
                        )}
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge className={getStatusBadgeVariant(gateway.status)}>
                        {gateway.status.charAt(0).toUpperCase() +
                          gateway.status.slice(1)}
                      </Badge>
                    </TableCell>
                    <TableCell>{gateway.lastUpdated}</TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" className="h-8 w-8 p-0">
                            <span className="sr-only">Open menu</span>
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuLabel>Actions</DropdownMenuLabel>
                          <DropdownMenuItem
                            onClick={() => {
                              setSelectedGateway(gateway);
                              setIsEditGatewayOpen(true);
                            }}
                          >
                            Edit Gateway
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuLabel>Status</DropdownMenuLabel>
                          <DropdownMenuItem
                            onClick={() =>
                              handleStatusChange(gateway.id, "active")
                            }
                            disabled={gateway.status === "active"}
                          >
                            Set Active
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onClick={() =>
                              handleStatusChange(gateway.id, "testing")
                            }
                            disabled={gateway.status === "testing"}
                          >
                            Set Testing
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onClick={() =>
                              handleStatusChange(gateway.id, "inactive")
                            }
                            disabled={gateway.status === "inactive"}
                          >
                            Set Inactive
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem
                            onClick={() => handleDeleteGateway(gateway.id)}
                            className="text-red-600"
                          >
                            <Trash2 className="mr-2 h-4 w-4" />
                            Delete Gateway
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* Edit Gateway Dialog */}
      <Dialog open={isEditGatewayOpen} onOpenChange={setIsEditGatewayOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Edit Payment Gateway</DialogTitle>
            <DialogDescription>
              Update gateway configuration and minimum deposit amounts
            </DialogDescription>
          </DialogHeader>
          {selectedGateway && (
            <div className="grid gap-6 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <label htmlFor="edit-name" className="text-right">
                  Name
                </label>
                <Input
                  id="edit-name"
                  defaultValue={selectedGateway.name}
                  className="col-span-3"
                />
              </div>

              <div className="grid grid-cols-4 items-center gap-4">
                <label htmlFor="edit-status" className="text-right">
                  Status
                </label>
                <Select defaultValue={selectedGateway.status}>
                  <SelectTrigger className="col-span-3">
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="testing">Testing</SelectItem>
                    <SelectItem value="inactive">Inactive</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="grid grid-cols-4 items-center gap-4">
                <label htmlFor="edit-api" className="text-right">
                  API Key
                </label>
                <Input
                  id="edit-api"
                  defaultValue={selectedGateway.apiKey || ""}
                  className="col-span-3"
                />
              </div>

              <div className="grid grid-cols-4 items-center gap-4">
                <label htmlFor="edit-secret" className="text-right">
                  Secret Key
                </label>
                <Input
                  id="edit-secret"
                  type="password"
                  defaultValue={selectedGateway.secretKey || ""}
                  className="col-span-3"
                />
              </div>

              <div className="space-y-4">
                <h3 className="text-sm font-medium">Minimum Deposit Amounts</h3>
                {Object.entries(selectedGateway.minDeposit).map(
                  ([currency, amount]) => (
                    <div
                      key={currency}
                      className="grid grid-cols-4 items-center gap-4"
                    >
                      <label className="text-right">{currency}</label>
                      <div className="col-span-3 flex items-center gap-2">
                        <Input
                          type="number"
                          defaultValue={amount}
                          step="0.0001"
                          min="0"
                        />
                      </div>
                    </div>
                  ),
                )}
              </div>

              <div className="space-y-4">
                <h3 className="text-sm font-medium">
                  Auto-Confirmation Settings
                </h3>
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="auto-confirm">
                      Enable Auto-Confirmation
                    </Label>
                    <p className="text-xs text-muted-foreground">
                      Automatically confirm transactions via API
                    </p>
                  </div>
                  <Switch id="auto-confirm" defaultChecked={true} />
                </div>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsEditGatewayOpen(false)}
            >
              Cancel
            </Button>
            <Button onClick={() => setIsEditGatewayOpen(false)}>
              Save Changes
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default PaymentGatewayManagement;
