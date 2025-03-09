import React, { useState } from "react";
import DashboardLayout from "../layout/DashboardLayout";
import UserManagement from "./UserManagement";
import PaymentGatewayManagement from "./PaymentGatewayManagement";
import InvestmentPlanManagement from "./InvestmentPlanManagement";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import {
  Check,
  RefreshCw,
  Settings,
  Users,
  Coins,
  Percent,
  Mail,
  Palette,
  RotateCcw,
  Database,
  Gift,
  DollarSign,
  Link as LinkIcon,
  Shield,
  AlertCircle,
  HardHat,
} from "lucide-react";

const AdminDashboard = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  // Affiliate program settings
  const [affiliateEnabled, setAffiliateEnabled] = useState(true);
  const [level1Commission, setLevel1Commission] = useState(5);
  const [level2Commission, setLevel2Commission] = useState(3);
  const [level3Commission, setLevel3Commission] = useState(1);
  const [minWithdrawal, setMinWithdrawal] = useState(10);

  // System settings
  const [maintenanceMode, setMaintenanceMode] = useState(false);
  const [registrationEnabled, setRegistrationEnabled] = useState(true);
  const [kycRequired, setKycRequired] = useState(true);
  const [withdrawalApproval, setWithdrawalApproval] = useState(true);

  // Email settings
  const [emailSubject, setEmailSubject] = useState("");
  const [emailContent, setEmailContent] = useState("");
  const [emailRecipient, setEmailRecipient] = useState("all");

  // Bonus settings
  const [bonusAmount, setBonusAmount] = useState(0);
  const [bonusUserId, setBonusUserId] = useState("");
  const [bonusDescription, setBonusDescription] = useState("");

  // Theme settings
  const [primaryColor, setPrimaryColor] = useState("#3b82f6");
  const [secondaryColor, setSecondaryColor] = useState("#10b981");
  const [fontFamily, setFontFamily] = useState("Inter");

  // Handle settings save
  const handleSaveSettings = () => {
    setIsSubmitting(true);
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setSuccessMessage("Settings saved successfully");
      setTimeout(() => setSuccessMessage(null), 3000);
    }, 1500);
  };

  // Handle email sending
  const handleSendEmail = () => {
    setIsSubmitting(true);
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setSuccessMessage(
        `Email sent to ${emailRecipient === "all" ? "all users" : "selected user"}`,
      );
      setEmailSubject("");
      setEmailContent("");
      setEmailRecipient("all");
      setTimeout(() => setSuccessMessage(null), 3000);
    }, 1500);
  };

  // Handle bonus addition
  const handleAddBonus = () => {
    setIsSubmitting(true);
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);

      // Add bonus to user in localStorage
      try {
        const storedUser = localStorage.getItem("user");
        if (storedUser) {
          const user = JSON.parse(storedUser);
          // Check if the bonus is for the current user
          if (
            user.email === bonusUserId ||
            user.id === bonusUserId ||
            user.name === bonusUserId
          ) {
            // Add bonus to user balance (create balance property if it doesn't exist)
            user.balance = (user.balance || 0) + bonusAmount;
            localStorage.setItem("user", JSON.stringify(user));
          }
        }
      } catch (error) {
        console.error("Error adding bonus to user:", error);
      }

      setSuccessMessage(`Bonus of ${bonusAmount} added to user ${bonusUserId}`);
      setBonusAmount(0);
      setBonusUserId("");
      setBonusDescription("");
      setTimeout(() => setSuccessMessage(null), 3000);
    }, 1500);
  };

  // Handle theme save
  const handleSaveTheme = () => {
    setIsSubmitting(true);
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setSuccessMessage("Theme settings saved successfully");
      setTimeout(() => setSuccessMessage(null), 3000);
    }, 1500);
  };

  // Handle system reset
  const handleSystemReset = (type: "full" | "partial") => {
    setIsSubmitting(true);
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);

      try {
        // Create a backup in localStorage
        const timestamp = new Date().toISOString();
        const backupKey = `system_backup_${timestamp}`;
        const backupData = {
          affiliateEnabled,
          level1Commission,
          level2Commission,
          level3Commission,
          minWithdrawal,
          maintenanceMode,
          registrationEnabled,
          kycRequired,
          withdrawalApproval,
          primaryColor,
          secondaryColor,
          fontFamily,
        };
        localStorage.setItem(backupKey, JSON.stringify(backupData));

        // Reset all state values based on reset type
        if (type === "full") {
          // Full reset - reset everything
          setAffiliateEnabled(true);
          setLevel1Commission(5);
          setLevel2Commission(3);
          setLevel3Commission(1);
          setMinWithdrawal(10);
          setMaintenanceMode(false);
          setRegistrationEnabled(true);
          setKycRequired(true);
          setWithdrawalApproval(true);
          setEmailSubject("");
          setEmailContent("");
          setEmailRecipient("all");
          setBonusAmount(0);
          setBonusUserId("");
          setBonusDescription("");
          setPrimaryColor("#3b82f6");
          setSecondaryColor("#10b981");
          setFontFamily("Inter");

          // Clear transaction data from localStorage
          localStorage.removeItem("transactions");
        } else {
          // Partial reset - only reset transaction-related data
          setBonusAmount(0);
          setBonusUserId("");
          setBonusDescription("");

          // Clear only transaction data from localStorage
          localStorage.removeItem("transactions");
        }

        setSuccessMessage(
          `${type === "full" ? "Full" : "Partial"} system reset completed successfully. Backup created with ID: ${backupKey}`,
        );
      } catch (error) {
        console.error("Error during system reset:", error);
        setSuccessMessage(
          `Error during ${type === "full" ? "full" : "partial"} system reset. Please try again.`,
        );
      }

      setTimeout(() => setSuccessMessage(null), 5000);
    }, 2500);
  };

  return (
    <DashboardLayout>
      <div className="p-6 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold">Admin Dashboard</h1>
            <p className="text-muted-foreground">
              Manage your platform and users
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              className="flex items-center gap-2"
            >
              <LinkIcon className="h-4 w-4" />
              <span>Admin Access URL</span>
            </Button>
            <Button
              variant="default"
              size="sm"
              className="flex items-center gap-2"
            >
              <Shield className="h-4 w-4" />
              <span>Security Log</span>
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

        <Tabs defaultValue="overview" className="w-full">
          <TabsList className="grid w-full grid-cols-1 md:grid-cols-8 mb-8">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="users">User Management</TabsTrigger>
            <TabsTrigger value="payments">Payment Gateways</TabsTrigger>
            <TabsTrigger value="investments">Investment Plans</TabsTrigger>
            <TabsTrigger value="mining">Mining Operations</TabsTrigger>
            <TabsTrigger value="emails">Email System</TabsTrigger>
            <TabsTrigger value="appearance">Appearance</TabsTrigger>
            <TabsTrigger value="settings">System Settings</TabsTrigger>
          </TabsList>
          <TabsContent value="overview">
            <Card>
              <CardContent className="p-6">
                <h2 className="text-xl font-semibold mb-4">
                  Platform Overview
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="rounded-md border p-4">
                    <div className="flex items-center gap-3 mb-2">
                      <Users className="h-5 w-5 text-blue-500" />
                      <h3 className="font-medium">User Statistics</h3>
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">
                          Total Users:
                        </span>
                        <span className="font-medium">1,245</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">
                          Active Users:
                        </span>
                        <span className="font-medium">987</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">
                          New Today:
                        </span>
                        <span className="font-medium">24</span>
                      </div>
                    </div>
                  </div>

                  <div className="rounded-md border p-4">
                    <div className="flex items-center gap-3 mb-2">
                      <Coins className="h-5 w-5 text-green-500" />
                      <h3 className="font-medium">Financial Overview</h3>
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">
                          Total Deposits:
                        </span>
                        <span className="font-medium">$1,245,678</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">
                          Total Withdrawals:
                        </span>
                        <span className="font-medium">$876,543</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">
                          Platform Balance:
                        </span>
                        <span className="font-medium">$369,135</span>
                      </div>
                    </div>
                  </div>

                  <div className="rounded-md border p-4">
                    <div className="flex items-center gap-3 mb-2">
                      <Settings className="h-5 w-5 text-purple-500" />
                      <h3 className="font-medium">System Status</h3>
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">
                          Maintenance Mode:
                        </span>
                        <span className="font-medium">
                          {maintenanceMode ? "Enabled" : "Disabled"}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">
                          Server Load:
                        </span>
                        <span className="font-medium">32%</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">
                          Pending Approvals:
                        </span>
                        <span className="font-medium">12</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Manual Payment Approvals */}
                  <Card>
                    <CardHeader>
                      <CardTitle>Pending Approvals</CardTitle>
                      <CardDescription>
                        Manual payment approvals requiring attention
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {/* Withdrawal Request Card - Will be removed when approved */}
                        <div
                          className="rounded-md border p-4"
                          id="withdrawal-request"
                        >
                          <div className="flex justify-between items-center mb-2">
                            <div>
                              <h4 className="font-medium">
                                Withdrawal Request
                              </h4>
                              <p className="text-sm text-muted-foreground">
                                User: john_doe
                              </p>
                            </div>
                            <div className="text-right">
                              <p className="font-medium">$1,250.00</p>
                              <p className="text-xs text-muted-foreground">
                                2 hours ago
                              </p>
                            </div>
                          </div>
                          <div className="flex gap-2 mt-2">
                            <Button
                              size="sm"
                              variant="default"
                              className="w-full"
                              onClick={() => {
                                document
                                  .getElementById("withdrawal-request")
                                  ?.remove();
                                setSuccessMessage(
                                  "Withdrawal request approved successfully",
                                );
                                setTimeout(() => setSuccessMessage(null), 3000);
                              }}
                            >
                              Approve
                            </Button>
                            <Button
                              size="sm"
                              variant="outline"
                              className="w-full"
                              onClick={() => {
                                document
                                  .getElementById("withdrawal-request")
                                  ?.remove();
                                setSuccessMessage(
                                  "Withdrawal request rejected",
                                );
                                setTimeout(() => setSuccessMessage(null), 3000);
                              }}
                            >
                              Reject
                            </Button>
                          </div>
                        </div>

                        {/* Deposit Confirmation Card - Will be removed when confirmed */}
                        <div
                          className="rounded-md border p-4"
                          id="deposit-confirmation"
                        >
                          <div className="flex justify-between items-center mb-2">
                            <div>
                              <h4 className="font-medium">
                                Deposit Confirmation
                              </h4>
                              <p className="text-sm text-muted-foreground">
                                User: sarah_smith
                              </p>
                            </div>
                            <div className="text-right">
                              <p className="font-medium">$500.00</p>
                              <p className="text-xs text-muted-foreground">
                                45 minutes ago
                              </p>
                            </div>
                          </div>
                          <div className="flex gap-2 mt-2">
                            <Button
                              size="sm"
                              variant="default"
                              className="w-full"
                              onClick={() => {
                                document
                                  .getElementById("deposit-confirmation")
                                  ?.remove();
                                setSuccessMessage(
                                  "Deposit confirmed successfully",
                                );
                                setTimeout(() => setSuccessMessage(null), 3000);
                              }}
                            >
                              Confirm
                            </Button>
                            <Button
                              size="sm"
                              variant="outline"
                              className="w-full"
                              onClick={() => {
                                document
                                  .getElementById("deposit-confirmation")
                                  ?.remove();
                                setSuccessMessage("Deposit rejected");
                                setTimeout(() => setSuccessMessage(null), 3000);
                              }}
                            >
                              Reject
                            </Button>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter>
                      <Button variant="outline" className="w-full">
                        View All Pending Approvals
                      </Button>
                    </CardFooter>
                  </Card>

                  {/* Bonus Management */}
                  <Card>
                    <CardHeader>
                      <CardTitle>Quick Bonus</CardTitle>
                      <CardDescription>
                        Add bonus funds to user accounts
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="space-y-2">
                          <Label htmlFor="bonus-user">User ID or Email</Label>
                          <Input
                            id="bonus-user"
                            placeholder="Enter user ID or email"
                            value={bonusUserId}
                            onChange={(e) => setBonusUserId(e.target.value)}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="bonus-amount">Bonus Amount</Label>
                          <div className="flex items-center">
                            <span className="mr-2">$</span>
                            <Input
                              id="bonus-amount"
                              type="number"
                              min="0"
                              step="0.01"
                              value={bonusAmount}
                              onChange={(e) =>
                                setBonusAmount(parseFloat(e.target.value) || 0)
                              }
                            />
                          </div>
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="bonus-description">
                            Description (Optional)
                          </Label>
                          <Input
                            id="bonus-description"
                            placeholder="Reason for bonus"
                            value={bonusDescription}
                            onChange={(e) =>
                              setBonusDescription(e.target.value)
                            }
                          />
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter>
                      <Button
                        className="w-full flex items-center gap-2"
                        onClick={handleAddBonus}
                        disabled={
                          isSubmitting || !bonusUserId || bonusAmount <= 0
                        }
                      >
                        {isSubmitting ? (
                          <>
                            <RefreshCw className="h-4 w-4 animate-spin" />
                            Processing...
                          </>
                        ) : (
                          <>
                            <Gift className="h-4 w-4" />
                            Add Bonus
                          </>
                        )}
                      </Button>
                    </CardFooter>
                  </Card>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="users">
            <UserManagement />
          </TabsContent>
          <TabsContent value="payments">
            <PaymentGatewayManagement />
          </TabsContent>
          <TabsContent value="investments">
            <InvestmentPlanManagement />
          </TabsContent>
          <TabsContent value="mining">
            <Card>
              <CardHeader>
                <CardTitle>Mining Operations Management</CardTitle>
                <CardDescription>
                  Manage mining operations, hardware, and user allocations
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="rounded-md border p-4">
                    <div className="flex items-center gap-3 mb-2">
                      <HardHat className="h-5 w-5 text-blue-500" />
                      <h3 className="font-medium">Mining Hardware</h3>
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">
                          Total Hashrate:
                        </span>
                        <span className="font-medium">15,750 GH/s</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">
                          Active Miners:
                        </span>
                        <span className="font-medium">124</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">
                          Utilization:
                        </span>
                        <span className="font-medium">87%</span>
                      </div>
                    </div>
                    <div className="mt-4">
                      <Button variant="outline" size="sm" className="w-full">
                        Hardware Details
                      </Button>
                    </div>
                  </div>

                  <div className="rounded-md border p-4">
                    <div className="flex items-center gap-3 mb-2">
                      <Coins className="h-5 w-5 text-green-500" />
                      <h3 className="font-medium">Mining Profitability</h3>
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">
                          BTC (per GH/s):
                        </span>
                        <span className="font-medium">$0.00042/day</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">
                          ETH (per GH/s):
                        </span>
                        <span className="font-medium">$0.00038/day</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">
                          XRP (per GH/s):
                        </span>
                        <span className="font-medium">$0.00035/day</span>
                      </div>
                    </div>
                    <div className="mt-4">
                      <Button variant="outline" size="sm" className="w-full">
                        Adjust Rates
                      </Button>
                    </div>
                  </div>

                  <div className="rounded-md border p-4">
                    <div className="flex items-center gap-3 mb-2">
                      <Settings className="h-5 w-5 text-purple-500" />
                      <h3 className="font-medium">Mining Packages</h3>
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Basic:</span>
                        <span className="font-medium">100 GH/s - $500</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Standard:</span>
                        <span className="font-medium">500 GH/s - $2,250</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Premium:</span>
                        <span className="font-medium">1,000 GH/s - $4,000</span>
                      </div>
                    </div>
                    <div className="mt-4">
                      <Button variant="outline" size="sm" className="w-full">
                        Manage Packages
                      </Button>
                    </div>
                  </div>
                </div>

                <div className="mt-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Reinvestment Options</CardTitle>
                      <CardDescription>
                        Configure options for users to reinvest their earnings
                        into mining power
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <div className="space-y-0.5">
                            <Label>Enable Automatic Reinvestment</Label>
                            <p className="text-sm text-muted-foreground">
                              Allow users to set up automatic reinvestment of
                              earnings
                            </p>
                          </div>
                          <Switch defaultChecked={true} />
                        </div>

                        <Separator />

                        <div className="flex items-center justify-between">
                          <div className="space-y-0.5">
                            <Label>Reinvestment Bonus</Label>
                            <p className="text-sm text-muted-foreground">
                              Provide bonus GH/s when users reinvest earnings
                            </p>
                          </div>
                          <Switch defaultChecked={true} />
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label>Minimum Reinvestment (USD)</Label>
                            <div className="flex items-center">
                              <span className="mr-2">$</span>
                              <Input type="number" defaultValue="50" min="10" />
                            </div>
                          </div>

                          <div className="space-y-2">
                            <Label>Bonus Percentage</Label>
                            <div className="flex items-center">
                              <Input
                                type="number"
                                defaultValue="5"
                                min="0"
                                max="100"
                              />
                              <span className="ml-2">%</span>
                            </div>
                          </div>
                        </div>

                        <Button className="mt-2">
                          Save Reinvestment Settings
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Email System Tab */}
          <TabsContent value="emails">
            <Card>
              <CardHeader>
                <CardTitle>Email System</CardTitle>
                <CardDescription>
                  Send emails to users and manage email templates
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="email-recipient">Recipient</Label>
                    <Select
                      value={emailRecipient}
                      onValueChange={setEmailRecipient}
                    >
                      <SelectTrigger id="email-recipient">
                        <SelectValue placeholder="Select recipient" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Users</SelectItem>
                        <SelectItem value="active">
                          Active Users Only
                        </SelectItem>
                        <SelectItem value="inactive">
                          Inactive Users Only
                        </SelectItem>
                        <SelectItem value="specific">Specific User</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {emailRecipient === "specific" && (
                    <div className="space-y-2">
                      <Label htmlFor="specific-user">User Email or ID</Label>
                      <Input
                        id="specific-user"
                        placeholder="Enter user email or ID"
                      />
                    </div>
                  )}

                  <div className="space-y-2">
                    <Label htmlFor="email-subject">Subject</Label>
                    <Input
                      id="email-subject"
                      placeholder="Email subject"
                      value={emailSubject}
                      onChange={(e) => setEmailSubject(e.target.value)}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email-content">Content</Label>
                    <Textarea
                      id="email-content"
                      placeholder="Email content"
                      rows={8}
                      value={emailContent}
                      onChange={(e) => setEmailContent(e.target.value)}
                    />
                  </div>

                  <div className="rounded-md bg-muted p-4">
                    <h3 className="font-medium mb-2">Available Variables</h3>
                    <div className="grid grid-cols-2 gap-2">
                      <div className="text-sm">
                        <code className="bg-muted-foreground/20 px-1 py-0.5 rounded">
                          {"{username}"}
                        </code>{" "}
                        - User's name
                      </div>
                      <div className="text-sm">
                        <code className="bg-muted-foreground/20 px-1 py-0.5 rounded">
                          {"{email}"}
                        </code>{" "}
                        - User's email
                      </div>
                      <div className="text-sm">
                        <code className="bg-muted-foreground/20 px-1 py-0.5 rounded">
                          {"{balance}"}
                        </code>{" "}
                        - User's balance
                      </div>
                      <div className="text-sm">
                        <code className="bg-muted-foreground/20 px-1 py-0.5 rounded">
                          {"{date}"}
                        </code>{" "}
                        - Current date
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button
                  className="flex items-center gap-2"
                  onClick={handleSendEmail}
                  disabled={isSubmitting || !emailSubject || !emailContent}
                >
                  {isSubmitting ? (
                    <>
                      <RefreshCw className="h-4 w-4 animate-spin" />
                      Sending...
                    </>
                  ) : (
                    <>
                      <Mail className="h-4 w-4" />
                      Send Email
                    </>
                  )}
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>

          {/* Appearance Tab */}
          <TabsContent value="appearance">
            <Card>
              <CardHeader>
                <CardTitle>Site Appearance</CardTitle>
                <CardDescription>
                  Customize the look and feel of your platform
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">Colors</h3>
                    <div className="space-y-2">
                      <Label htmlFor="primary-color">Primary Color</Label>
                      <div className="flex items-center gap-2">
                        <Input
                          id="primary-color"
                          type="color"
                          className="w-12 h-10 p-1"
                          value={primaryColor}
                          onChange={(e) => setPrimaryColor(e.target.value)}
                        />
                        <Input
                          type="text"
                          value={primaryColor}
                          onChange={(e) => setPrimaryColor(e.target.value)}
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="secondary-color">Secondary Color</Label>
                      <div className="flex items-center gap-2">
                        <Input
                          id="secondary-color"
                          type="color"
                          className="w-12 h-10 p-1"
                          value={secondaryColor}
                          onChange={(e) => setSecondaryColor(e.target.value)}
                        />
                        <Input
                          type="text"
                          value={secondaryColor}
                          onChange={(e) => setSecondaryColor(e.target.value)}
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="font-family">Font Family</Label>
                      <Select value={fontFamily} onValueChange={setFontFamily}>
                        <SelectTrigger id="font-family">
                          <SelectValue placeholder="Select font" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Inter">Inter</SelectItem>
                          <SelectItem value="Roboto">Roboto</SelectItem>
                          <SelectItem value="Open Sans">Open Sans</SelectItem>
                          <SelectItem value="Montserrat">Montserrat</SelectItem>
                          <SelectItem value="Poppins">Poppins</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">Logo & Branding</h3>
                    <div className="space-y-2">
                      <Label htmlFor="logo-upload">Site Logo</Label>
                      <div className="flex items-center gap-4">
                        <div className="h-16 w-16 rounded-md bg-muted flex items-center justify-center">
                          <span className="text-2xl font-bold">HP</span>
                        </div>
                        <Button variant="outline" size="sm">
                          Upload New Logo
                        </Button>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="favicon-upload">Favicon</Label>
                      <div className="flex items-center gap-4">
                        <div className="h-8 w-8 rounded-md bg-muted flex items-center justify-center">
                          <span className="text-xs font-bold">HP</span>
                        </div>
                        <Button variant="outline" size="sm">
                          Upload New Favicon
                        </Button>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="site-name">Site Name</Label>
                      <Input id="site-name" defaultValue="HYIP Platform" />
                    </div>
                  </div>
                </div>

                <div className="rounded-md bg-muted p-4 mt-6">
                  <h3 className="font-medium mb-2">Preview</h3>
                  <div
                    className="rounded-md border p-4"
                    style={{
                      fontFamily: fontFamily,
                    }}
                  >
                    <div className="flex items-center gap-2 mb-4">
                      <div
                        className="h-8 w-8 rounded-md flex items-center justify-center"
                        style={{
                          backgroundColor: primaryColor,
                          color: "white",
                        }}
                      >
                        <span className="font-bold">HP</span>
                      </div>
                      <span className="text-xl font-bold">HYIP Platform</span>
                    </div>
                    <div className="space-y-2">
                      <div
                        className="rounded-md px-3 py-1 text-sm inline-block"
                        style={{
                          backgroundColor: primaryColor,
                          color: "white",
                        }}
                      >
                        Primary Button
                      </div>
                      <div
                        className="rounded-md px-3 py-1 text-sm inline-block ml-2"
                        style={{
                          backgroundColor: secondaryColor,
                          color: "white",
                        }}
                      >
                        Secondary Button
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button
                  className="flex items-center gap-2"
                  onClick={handleSaveTheme}
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <RefreshCw className="h-4 w-4 animate-spin" />
                      Saving...
                    </>
                  ) : (
                    <>
                      <Palette className="h-4 w-4" />
                      Save Theme Settings
                    </>
                  )}
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>

          <TabsContent value="settings" className="space-y-6">
            {/* Affiliate Program Settings */}
            <Card>
              <CardHeader>
                <CardTitle>Affiliate Program Settings</CardTitle>
                <CardDescription>
                  Configure commission rates and referral program settings
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Enable Affiliate Program</Label>
                    <p className="text-sm text-muted-foreground">
                      Turn the affiliate program on or off platform-wide
                    </p>
                  </div>
                  <Switch
                    checked={affiliateEnabled}
                    onCheckedChange={setAffiliateEnabled}
                  />
                </div>

                <Separator />

                <div className="space-y-4">
                  <h3 className="text-sm font-medium">Commission Rates</h3>

                  <div className="grid grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="level1">Level 1 (Direct)</Label>
                      <div className="flex items-center">
                        <Input
                          id="level1"
                          type="number"
                          value={level1Commission}
                          onChange={(e) =>
                            setLevel1Commission(parseInt(e.target.value) || 0)
                          }
                          min="0"
                          max="100"
                        />
                        <span className="ml-2">%</span>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="level2">Level 2</Label>
                      <div className="flex items-center">
                        <Input
                          id="level2"
                          type="number"
                          value={level2Commission}
                          onChange={(e) =>
                            setLevel2Commission(parseInt(e.target.value) || 0)
                          }
                          min="0"
                          max="100"
                        />
                        <span className="ml-2">%</span>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="level3">Level 3</Label>
                      <div className="flex items-center">
                        <Input
                          id="level3"
                          type="number"
                          value={level3Commission}
                          onChange={(e) =>
                            setLevel3Commission(parseInt(e.target.value) || 0)
                          }
                          min="0"
                          max="100"
                        />
                        <span className="ml-2">%</span>
                      </div>
                    </div>
                  </div>
                </div>

                <Separator />

                <div className="space-y-2">
                  <Label htmlFor="min-withdrawal">
                    Minimum Affiliate Withdrawal
                  </Label>
                  <div className="flex items-center">
                    <span className="mr-2">$</span>
                    <Input
                      id="min-withdrawal"
                      type="number"
                      value={minWithdrawal}
                      onChange={(e) =>
                        setMinWithdrawal(parseInt(e.target.value) || 0)
                      }
                      min="0"
                    />
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Minimum amount required to withdraw affiliate earnings
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* System Settings */}
            <Card>
              <CardHeader>
                <CardTitle>System Settings</CardTitle>
                <CardDescription>
                  Configure global platform settings and security options
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Maintenance Mode</Label>
                    <p className="text-sm text-muted-foreground">
                      Put the entire platform in maintenance mode
                    </p>
                  </div>
                  <Switch
                    checked={maintenanceMode}
                    onCheckedChange={setMaintenanceMode}
                  />
                </div>

                <Separator />

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>User Registration</Label>
                    <p className="text-sm text-muted-foreground">
                      Allow new users to register on the platform
                    </p>
                  </div>
                  <Switch
                    checked={registrationEnabled}
                    onCheckedChange={setRegistrationEnabled}
                  />
                </div>

                <Separator />

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>KYC Requirement</Label>
                    <p className="text-sm text-muted-foreground">
                      Require KYC verification for all users
                    </p>
                  </div>
                  <Switch
                    checked={kycRequired}
                    onCheckedChange={setKycRequired}
                  />
                </div>

                <Separator />

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Manual Withdrawal Approval</Label>
                    <p className="text-sm text-muted-foreground">
                      Require admin approval for all withdrawal requests
                    </p>
                  </div>
                  <Switch
                    checked={withdrawalApproval}
                    onCheckedChange={setWithdrawalApproval}
                  />
                </div>
              </CardContent>
              <CardFooter>
                <Button onClick={handleSaveSettings} disabled={isSubmitting}>
                  {isSubmitting ? (
                    <>
                      <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                      Saving...
                    </>
                  ) : (
                    "Save Settings"
                  )}
                </Button>
              </CardFooter>
            </Card>

            {/* System Reset */}
            <Card>
              <CardHeader>
                <CardTitle>System Reset</CardTitle>
                <CardDescription>
                  Reset system data with automatic backup creation
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <Alert className="bg-yellow-50 border-yellow-200">
                  <AlertCircle className="h-4 w-4 text-yellow-600" />
                  <AlertTitle>Warning</AlertTitle>
                  <AlertDescription className="text-yellow-700">
                    System reset operations are irreversible. Always ensure you
                    have a backup before proceeding.
                  </AlertDescription>
                </Alert>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="rounded-md border p-4">
                    <div className="flex items-center gap-3 mb-2">
                      <RotateCcw className="h-5 w-5 text-red-500" />
                      <h3 className="font-medium">Full System Reset</h3>
                    </div>
                    <p className="text-sm text-muted-foreground mb-4">
                      Clears all user data, transactions, settings, and
                      configurations. The system will be restored to its initial
                      state.
                    </p>
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button variant="destructive" className="w-full">
                          Full Reset
                        </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>
                            Are you absolutely sure?
                          </AlertDialogTitle>
                          <AlertDialogDescription>
                            This action will permanently delete all user data,
                            transactions, and settings. A backup will be
                            created, but this operation cannot be undone.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Cancel</AlertDialogCancel>
                          <AlertDialogAction
                            className="bg-red-600 hover:bg-red-700"
                            onClick={() => handleSystemReset("full")}
                          >
                            Yes, Reset Everything
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </div>

                  <div className="rounded-md border p-4">
                    <div className="flex items-center gap-3 mb-2">
                      <Database className="h-5 w-5 text-orange-500" />
                      <h3 className="font-medium">Partial Reset</h3>
                    </div>
                    <p className="text-sm text-muted-foreground mb-4">
                      Clears only transaction data while preserving user
                      accounts and system configurations.
                    </p>
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button
                          variant="outline"
                          className="w-full border-orange-200 text-orange-700 hover:bg-orange-50"
                        >
                          Partial Reset
                        </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>
                            Confirm Partial Reset
                          </AlertDialogTitle>
                          <AlertDialogDescription>
                            This will clear all transaction data while
                            preserving user accounts and system settings. A
                            backup will be created before proceeding.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Cancel</AlertDialogCancel>
                          <AlertDialogAction
                            className="bg-orange-600 hover:bg-orange-700"
                            onClick={() => handleSystemReset("partial")}
                          >
                            Proceed with Partial Reset
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Installation Guide */}
            <Card>
              <CardHeader>
                <CardTitle>Installation Guide</CardTitle>
                <CardDescription>
                  Instructions for installing and configuring the platform
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="rounded-md bg-muted p-4">
                    <h3 className="font-medium mb-2">System Requirements</h3>
                    <ul className="list-disc pl-5 space-y-1">
                      <li>Node.js 16.x or higher</li>
                      <li>MySQL 8.0 or PostgreSQL 13+</li>
                      <li>Redis (optional, for caching)</li>
                      <li>At least 2GB RAM and 1 CPU core</li>
                    </ul>
                  </div>

                  <div className="rounded-md bg-muted p-4">
                    <h3 className="font-medium mb-2">Quick Installation</h3>
                    <p className="mb-2">
                      Run the following commands to install:
                    </p>
                    <pre className="bg-black text-white p-3 rounded text-sm overflow-x-auto">
                      git clone https://github.com/your-org/hyip-platform.git
                      <br />
                      cd hyip-platform
                      <br />
                      npm install
                      <br />
                      cp .env.example .env
                      <br />
                      # Edit .env with your configuration
                      <br />
                      npm run setup
                      <br />
                      npm run dev
                    </pre>
                  </div>

                  <div className="rounded-md bg-muted p-4">
                    <h3 className="font-medium mb-2">Configuration Options</h3>
                    <p>Edit the .env file to configure the following:</p>
                    <ul className="list-disc pl-5 space-y-1">
                      <li>Database connection details</li>
                      <li>Mail server settings</li>
                      <li>Payment gateway API keys</li>
                      <li>Mining pool connections</li>
                      <li>Security settings</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

export default AdminDashboard;
