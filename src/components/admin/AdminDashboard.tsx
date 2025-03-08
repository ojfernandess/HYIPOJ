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
  Check,
  RefreshCw,
  Settings,
  Users,
  Coins,
  Percent,
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

  return (
    <DashboardLayout>
      <div className="p-6 space-y-6">
        <h1 className="text-3xl font-bold">Admin Dashboard</h1>
        <p className="text-muted-foreground">Manage your platform and users</p>

        {successMessage && (
          <Alert className="bg-green-50 border-green-200">
            <Check className="h-4 w-4 text-green-600" />
            <AlertTitle>Success</AlertTitle>
            <AlertDescription className="text-green-700">
              {successMessage}
            </AlertDescription>
          </Alert>
        )}

        <Tabs defaultValue="users" className="w-full">
          <TabsList className="grid w-full grid-cols-6 mb-8">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="users">User Management</TabsTrigger>
            <TabsTrigger value="payments">Payment Gateways</TabsTrigger>
            <TabsTrigger value="investments">Investment Plans</TabsTrigger>
            <TabsTrigger value="mining">Mining Operations</TabsTrigger>
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
              <CardContent className="p-6">
                <h2 className="text-xl font-semibold mb-4">
                  Mining Operations
                </h2>
                <p>Mining operation management tools will be displayed here.</p>
              </CardContent>
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
