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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Plus, MoreHorizontal, Trash2, Edit, Copy } from "lucide-react";

interface InvestmentPlan {
  id: string;
  name: string;
  description: string;
  minAmount: number;
  maxAmount: number;
  returnType: "fixed" | "compound";
  returnRate: number;
  duration: number; // in days
  status: "active" | "inactive" | "draft";
  payoutInterval: "daily" | "weekly" | "monthly" | "end";
  allowReinvestment: boolean;
  createdAt: string;
  updatedAt: string;
}

const mockPlans: InvestmentPlan[] = [
  {
    id: "1",
    name: "Starter Plan",
    description: "Perfect for beginners with low investment capital",
    minAmount: 50,
    maxAmount: 1000,
    returnType: "fixed",
    returnRate: 1.2, // 1.2% daily
    duration: 30, // 30 days
    status: "active",
    payoutInterval: "daily",
    allowReinvestment: true,
    createdAt: "2023-05-10",
    updatedAt: "2023-06-15",
  },
  {
    id: "2",
    name: "Gold Plan",
    description: "Higher returns for medium-term investors",
    minAmount: 1000,
    maxAmount: 10000,
    returnType: "fixed",
    returnRate: 1.5, // 1.5% daily
    duration: 60, // 60 days
    status: "active",
    payoutInterval: "daily",
    allowReinvestment: true,
    createdAt: "2023-05-12",
    updatedAt: "2023-06-15",
  },
  {
    id: "3",
    name: "Platinum Plan",
    description: "Premium plan with compound interest for serious investors",
    minAmount: 5000,
    maxAmount: 50000,
    returnType: "compound",
    returnRate: 2.1, // 2.1% compounded
    duration: 90, // 90 days
    status: "active",
    payoutInterval: "end",
    allowReinvestment: false,
    createdAt: "2023-05-15",
    updatedAt: "2023-06-15",
  },
  {
    id: "4",
    name: "VIP Plan",
    description: "Exclusive plan for VIP investors with highest returns",
    minAmount: 25000,
    maxAmount: 100000,
    returnType: "compound",
    returnRate: 2.5, // 2.5% compounded
    duration: 180, // 180 days
    status: "draft",
    payoutInterval: "monthly",
    allowReinvestment: true,
    createdAt: "2023-06-01",
    updatedAt: "2023-06-15",
  },
];

const InvestmentPlanManagement = () => {
  const [plans, setPlans] = useState<InvestmentPlan[]>(mockPlans);
  const [isAddPlanOpen, setIsAddPlanOpen] = useState(false);
  const [isEditPlanOpen, setIsEditPlanOpen] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<InvestmentPlan | null>(null);

  // Function to handle plan status change
  const handleStatusChange = (
    planId: string,
    newStatus: "active" | "inactive" | "draft",
  ) => {
    setPlans(
      plans.map((plan) =>
        plan.id === planId
          ? {
              ...plan,
              status: newStatus,
              updatedAt: new Date().toISOString().split("T")[0],
            }
          : plan,
      ),
    );
  };

  // Function to handle plan deletion
  const handleDeletePlan = (planId: string) => {
    setPlans(plans.filter((plan) => plan.id !== planId));
  };

  // Function to duplicate a plan
  const handleDuplicatePlan = (planId: string) => {
    const planToDuplicate = plans.find((plan) => plan.id === planId);
    if (planToDuplicate) {
      const newPlan: InvestmentPlan = {
        ...planToDuplicate,
        id: `${plans.length + 1}`,
        name: `${planToDuplicate.name} (Copy)`,
        status: "draft",
        createdAt: new Date().toISOString().split("T")[0],
        updatedAt: new Date().toISOString().split("T")[0],
      };
      setPlans([...plans, newPlan]);
    }
  };

  // Function to get status badge variant
  const getStatusBadgeVariant = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-800";
      case "inactive":
        return "bg-red-100 text-red-800";
      case "draft":
        return "bg-yellow-100 text-yellow-800";
      default:
        return "";
    }
  };

  // Function to calculate total return
  const calculateTotalReturn = (plan: InvestmentPlan) => {
    if (plan.returnType === "fixed") {
      // For fixed returns, simply multiply daily rate by duration
      return (plan.returnRate * plan.duration).toFixed(2) + "%";
    } else {
      // For compound returns, use compound interest formula
      // A = P(1 + r/n)^(nt)
      // Simplified for daily compounding
      const rate = plan.returnRate / 100;
      const totalReturn =
        Math.pow(1 + rate / 365, 365 * (plan.duration / 365)) - 1;
      return (totalReturn * 100).toFixed(2) + "%";
    }
  };

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <CardTitle className="text-2xl font-bold">
                Investment Plan Management
              </CardTitle>
              <CardDescription>
                Create and manage investment plans with customizable returns and
                durations
              </CardDescription>
            </div>
            <div className="flex items-center gap-2">
              <Dialog open={isAddPlanOpen} onOpenChange={setIsAddPlanOpen}>
                <DialogTrigger asChild>
                  <Button className="flex items-center gap-2">
                    <Plus className="h-4 w-4" />
                    <span>Create Plan</span>
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[600px]">
                  <DialogHeader>
                    <DialogTitle>Create Investment Plan</DialogTitle>
                    <DialogDescription>
                      Configure a new investment plan with custom parameters
                    </DialogDescription>
                  </DialogHeader>

                  <div className="grid gap-6 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                      <label htmlFor="plan-name" className="text-right">
                        Plan Name
                      </label>
                      <Input
                        id="plan-name"
                        placeholder="e.g. Gold Plan"
                        className="col-span-3"
                      />
                    </div>

                    <div className="grid grid-cols-4 items-center gap-4">
                      <label htmlFor="plan-description" className="text-right">
                        Description
                      </label>
                      <Input
                        id="plan-description"
                        placeholder="Brief description of the plan"
                        className="col-span-3"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="grid grid-cols-2 items-center gap-2">
                        <label
                          htmlFor="min-amount"
                          className="text-right text-sm"
                        >
                          Min Amount
                        </label>
                        <Input
                          id="min-amount"
                          type="number"
                          placeholder="50"
                          min="1"
                        />
                      </div>
                      <div className="grid grid-cols-2 items-center gap-2">
                        <label
                          htmlFor="max-amount"
                          className="text-right text-sm"
                        >
                          Max Amount
                        </label>
                        <Input
                          id="max-amount"
                          type="number"
                          placeholder="1000"
                          min="1"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-4 items-center gap-4">
                      <label htmlFor="return-type" className="text-right">
                        Return Type
                      </label>
                      <Select defaultValue="fixed">
                        <SelectTrigger className="col-span-3">
                          <SelectValue placeholder="Select return type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="fixed">Fixed Return</SelectItem>
                          <SelectItem value="compound">
                            Compound Interest
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="grid grid-cols-2 items-center gap-2">
                        <label
                          htmlFor="return-rate"
                          className="text-right text-sm"
                        >
                          Return Rate (%)
                        </label>
                        <Input
                          id="return-rate"
                          type="number"
                          placeholder="1.5"
                          step="0.1"
                          min="0.1"
                        />
                      </div>
                      <div className="grid grid-cols-2 items-center gap-2">
                        <label
                          htmlFor="duration"
                          className="text-right text-sm"
                        >
                          Duration (days)
                        </label>
                        <Input
                          id="duration"
                          type="number"
                          placeholder="30"
                          min="1"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-4 items-center gap-4">
                      <label htmlFor="payout-interval" className="text-right">
                        Payout Interval
                      </label>
                      <Select defaultValue="daily">
                        <SelectTrigger className="col-span-3">
                          <SelectValue placeholder="Select payout interval" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="daily">Daily</SelectItem>
                          <SelectItem value="weekly">Weekly</SelectItem>
                          <SelectItem value="monthly">Monthly</SelectItem>
                          <SelectItem value="end">End of Term</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label htmlFor="allow-reinvestment">
                          Allow Reinvestment
                        </Label>
                        <p className="text-xs text-muted-foreground">
                          Let users reinvest their profits automatically
                        </p>
                      </div>
                      <Switch id="allow-reinvestment" defaultChecked={true} />
                    </div>
                  </div>

                  <DialogFooter>
                    <Button
                      variant="outline"
                      onClick={() => setIsAddPlanOpen(false)}
                    >
                      Cancel
                    </Button>
                    <Button onClick={() => setIsAddPlanOpen(false)}>
                      Create Plan
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="all" className="w-full">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4 gap-4">
              <TabsList>
                <TabsTrigger value="all">All Plans</TabsTrigger>
                <TabsTrigger value="active">Active</TabsTrigger>
                <TabsTrigger value="draft">Draft</TabsTrigger>
                <TabsTrigger value="inactive">Inactive</TabsTrigger>
              </TabsList>
            </div>

            <TabsContent value="all" className="mt-0">
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Plan Name</TableHead>
                      <TableHead>Amount Range</TableHead>
                      <TableHead>Return Rate</TableHead>
                      <TableHead>Duration</TableHead>
                      <TableHead>Total Return</TableHead>
                      <TableHead>Payout</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {plans.map((plan) => (
                      <TableRow key={plan.id}>
                        <TableCell>
                          <div className="font-medium">{plan.name}</div>
                          <div className="text-xs text-muted-foreground">
                            {plan.description}
                          </div>
                        </TableCell>
                        <TableCell>
                          ${plan.minAmount.toLocaleString()} - $
                          {plan.maxAmount.toLocaleString()}
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center">
                            <Badge
                              variant={
                                plan.returnType === "fixed"
                                  ? "outline"
                                  : "secondary"
                              }
                              className="mr-2"
                            >
                              {plan.returnType === "fixed"
                                ? "Fixed"
                                : "Compound"}
                            </Badge>
                            {plan.returnRate}%
                            {plan.returnType === "fixed" &&
                              plan.payoutInterval !== "end" && (
                                <span className="text-xs ml-1">
                                  {plan.payoutInterval === "daily"
                                    ? "/day"
                                    : plan.payoutInterval === "weekly"
                                      ? "/week"
                                      : "/month"}
                                </span>
                              )}
                          </div>
                        </TableCell>
                        <TableCell>{plan.duration} days</TableCell>
                        <TableCell>
                          <span className="font-medium text-green-600">
                            {calculateTotalReturn(plan)}
                          </span>
                        </TableCell>
                        <TableCell>
                          <Badge variant="outline">
                            {plan.payoutInterval.charAt(0).toUpperCase() +
                              plan.payoutInterval.slice(1)}
                          </Badge>
                          {plan.allowReinvestment && (
                            <Badge variant="secondary" className="ml-1">
                              Reinvest
                            </Badge>
                          )}
                        </TableCell>
                        <TableCell>
                          <Badge className={getStatusBadgeVariant(plan.status)}>
                            {plan.status.charAt(0).toUpperCase() +
                              plan.status.slice(1)}
                          </Badge>
                        </TableCell>
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
                                  setSelectedPlan(plan);
                                  setIsEditPlanOpen(true);
                                }}
                              >
                                <Edit className="mr-2 h-4 w-4" />
                                Edit Plan
                              </DropdownMenuItem>
                              <DropdownMenuItem
                                onClick={() => handleDuplicatePlan(plan.id)}
                              >
                                <Copy className="mr-2 h-4 w-4" />
                                Duplicate
                              </DropdownMenuItem>
                              <DropdownMenuSeparator />
                              <DropdownMenuLabel>Status</DropdownMenuLabel>
                              <DropdownMenuItem
                                onClick={() =>
                                  handleStatusChange(plan.id, "active")
                                }
                                disabled={plan.status === "active"}
                              >
                                Set Active
                              </DropdownMenuItem>
                              <DropdownMenuItem
                                onClick={() =>
                                  handleStatusChange(plan.id, "draft")
                                }
                                disabled={plan.status === "draft"}
                              >
                                Set as Draft
                              </DropdownMenuItem>
                              <DropdownMenuItem
                                onClick={() =>
                                  handleStatusChange(plan.id, "inactive")
                                }
                                disabled={plan.status === "inactive"}
                              >
                                Set Inactive
                              </DropdownMenuItem>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem
                                onClick={() => handleDeletePlan(plan.id)}
                                className="text-red-600"
                              >
                                <Trash2 className="mr-2 h-4 w-4" />
                                Delete Plan
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </TabsContent>

            {/* Other tabs would filter the plans by status */}
            <TabsContent value="active" className="mt-0">
              {/* Similar table with only active plans */}
            </TabsContent>
            <TabsContent value="draft" className="mt-0">
              {/* Similar table with only draft plans */}
            </TabsContent>
            <TabsContent value="inactive" className="mt-0">
              {/* Similar table with only inactive plans */}
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      {/* Edit Plan Dialog */}
      <Dialog open={isEditPlanOpen} onOpenChange={setIsEditPlanOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Edit Investment Plan</DialogTitle>
            <DialogDescription>
              Update investment plan parameters and settings
            </DialogDescription>
          </DialogHeader>
          {selectedPlan && (
            <div className="grid gap-6 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <label htmlFor="edit-name" className="text-right">
                  Plan Name
                </label>
                <Input
                  id="edit-name"
                  defaultValue={selectedPlan.name}
                  className="col-span-3"
                />
              </div>

              <div className="grid grid-cols-4 items-center gap-4">
                <label htmlFor="edit-description" className="text-right">
                  Description
                </label>
                <Input
                  id="edit-description"
                  defaultValue={selectedPlan.description}
                  className="col-span-3"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="grid grid-cols-2 items-center gap-2">
                  <label
                    htmlFor="edit-min-amount"
                    className="text-right text-sm"
                  >
                    Min Amount
                  </label>
                  <Input
                    id="edit-min-amount"
                    type="number"
                    defaultValue={selectedPlan.minAmount}
                    min="1"
                  />
                </div>
                <div className="grid grid-cols-2 items-center gap-2">
                  <label
                    htmlFor="edit-max-amount"
                    className="text-right text-sm"
                  >
                    Max Amount
                  </label>
                  <Input
                    id="edit-max-amount"
                    type="number"
                    defaultValue={selectedPlan.maxAmount}
                    min="1"
                  />
                </div>
              </div>

              <div className="grid grid-cols-4 items-center gap-4">
                <label htmlFor="edit-return-type" className="text-right">
                  Return Type
                </label>
                <Select defaultValue={selectedPlan.returnType}>
                  <SelectTrigger className="col-span-3">
                    <SelectValue placeholder="Select return type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="fixed">Fixed Return</SelectItem>
                    <SelectItem value="compound">Compound Interest</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="grid grid-cols-2 items-center gap-2">
                  <label
                    htmlFor="edit-return-rate"
                    className="text-right text-sm"
                  >
                    Return Rate (%)
                  </label>
                  <Input
                    id="edit-return-rate"
                    type="number"
                    defaultValue={selectedPlan.returnRate}
                    step="0.1"
                    min="0.1"
                  />
                </div>
                <div className="grid grid-cols-2 items-center gap-2">
                  <label htmlFor="edit-duration" className="text-right text-sm">
                    Duration (days)
                  </label>
                  <Input
                    id="edit-duration"
                    type="number"
                    defaultValue={selectedPlan.duration}
                    min="1"
                  />
                </div>
              </div>

              <div className="grid grid-cols-4 items-center gap-4">
                <label htmlFor="edit-payout-interval" className="text-right">
                  Payout Interval
                </label>
                <Select defaultValue={selectedPlan.payoutInterval}>
                  <SelectTrigger className="col-span-3">
                    <SelectValue placeholder="Select payout interval" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="daily">Daily</SelectItem>
                    <SelectItem value="weekly">Weekly</SelectItem>
                    <SelectItem value="monthly">Monthly</SelectItem>
                    <SelectItem value="end">End of Term</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="grid grid-cols-4 items-center gap-4">
                <label htmlFor="edit-status" className="text-right">
                  Status
                </label>
                <Select defaultValue={selectedPlan.status}>
                  <SelectTrigger className="col-span-3">
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="draft">Draft</SelectItem>
                    <SelectItem value="inactive">Inactive</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="edit-allow-reinvestment">
                    Allow Reinvestment
                  </Label>
                  <p className="text-xs text-muted-foreground">
                    Let users reinvest their profits automatically
                  </p>
                </div>
                <Switch
                  id="edit-allow-reinvestment"
                  defaultChecked={selectedPlan.allowReinvestment}
                />
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditPlanOpen(false)}>
              Cancel
            </Button>
            <Button onClick={() => setIsEditPlanOpen(false)}>
              Save Changes
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default InvestmentPlanManagement;
