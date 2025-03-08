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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
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
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import {
  Copy,
  Users,
  Check,
  Share2,
  UserPlus,
  DollarSign,
  Layers,
  ArrowUpRight,
  Info,
} from "lucide-react";
import DashboardLayout from "../layout/DashboardLayout";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

interface Referral {
  id: string;
  username: string;
  email: string;
  registrationDate: string;
  status: "active" | "pending";
  totalDeposits: number;
  totalEarnings: number;
  level: 1 | 2 | 3;
}

interface CommissionTier {
  level: number;
  rate: number;
  description: string;
}

const mockReferrals: Referral[] = [
  {
    id: "1",
    username: "james_wilson",
    email: "james.w@example.com",
    registrationDate: "2023-05-15",
    status: "active",
    totalDeposits: 2500,
    totalEarnings: 125,
    level: 1,
  },
  {
    id: "2",
    username: "sarah_johnson",
    email: "sarah.j@example.com",
    registrationDate: "2023-05-20",
    status: "active",
    totalDeposits: 1000,
    totalEarnings: 50,
    level: 1,
  },
  {
    id: "3",
    username: "michael_brown",
    email: "m.brown@example.com",
    registrationDate: "2023-06-02",
    status: "pending",
    totalDeposits: 0,
    totalEarnings: 0,
    level: 1,
  },
  {
    id: "4",
    username: "emma_davis",
    email: "emma.d@example.com",
    registrationDate: "2023-06-10",
    status: "active",
    totalDeposits: 5000,
    totalEarnings: 250,
    level: 2,
  },
  {
    id: "5",
    username: "robert_miller",
    email: "robert.m@example.com",
    registrationDate: "2023-06-15",
    status: "active",
    totalDeposits: 3000,
    totalEarnings: 90,
    level: 3,
  },
];

const commissionTiers: CommissionTier[] = [
  {
    level: 1,
    rate: 5,
    description: "Direct referrals",
  },
  {
    level: 2,
    rate: 3,
    description: "Second-level referrals",
  },
  {
    level: 3,
    rate: 1,
    description: "Third-level referrals",
  },
];

const earningsData = [
  { date: "Jan", earnings: 120 },
  { date: "Feb", earnings: 180 },
  { date: "Mar", earnings: 150 },
  { date: "Apr", earnings: 230 },
  { date: "May", earnings: 300 },
  { date: "Jun", earnings: 280 },
];

const AffiliateProgram = () => {
  const [isCopied, setIsCopied] = useState(false);
  const [timeRange, setTimeRange] = useState("6months");
  const [referralLink] = useState("https://hyip-platform.com/ref/user123");

  // Copy referral link to clipboard
  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  // Calculate total earnings
  const totalEarnings = mockReferrals.reduce(
    (sum, referral) => sum + referral.totalEarnings,
    0,
  );

  // Calculate total referrals
  const totalReferrals = mockReferrals.length;
  const activeReferrals = mockReferrals.filter(
    (referral) => referral.status === "active",
  ).length;

  return (
    <DashboardLayout>
      <div className="p-6 space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Affiliate Program</h1>
          <p className="text-muted-foreground mt-2">
            Refer users and earn commissions on their deposits and investments
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Referral Stats */}
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg font-medium">
                Your Referrals
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="mr-4 rounded-full bg-primary/10 p-2">
                    <Users className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <div className="text-3xl font-bold">{totalReferrals}</div>
                    <div className="text-xs text-muted-foreground">
                      {activeReferrals} active
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-sm font-medium">Conversion Rate</div>
                  <div className="text-2xl font-bold">
                    {Math.round((activeReferrals / totalReferrals) * 100)}%
                  </div>
                </div>
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
                  <div className="mr-4 rounded-full bg-green-100 p-2">
                    <DollarSign className="h-6 w-6 text-green-600" />
                  </div>
                  <div>
                    <div className="text-3xl font-bold">
                      ${totalEarnings.toFixed(2)}
                    </div>
                    <div className="text-xs text-muted-foreground">
                      Lifetime earnings
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-sm font-medium">This Month</div>
                  <div className="text-2xl font-bold text-green-600">
                    +$280.00
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Commission Tiers */}
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg font-medium">
                Commission Tiers
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {commissionTiers.map((tier) => (
                  <div key={tier.level} className="flex items-center">
                    <div className="mr-4 rounded-full bg-primary/10 p-2">
                      <Layers className="h-5 w-5 text-primary" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <div className="font-medium">Level {tier.level}</div>
                        <div className="font-bold text-green-600">
                          {tier.rate}%
                        </div>
                      </div>
                      <div className="text-xs text-muted-foreground">
                        {tier.description}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Referral Link */}
        <Card>
          <CardHeader>
            <CardTitle>Your Referral Link</CardTitle>
            <CardDescription>
              Share this link with your friends and earn commissions when they
              join
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="relative">
                <Input value={referralLink} readOnly className="pr-20" />
                <Button
                  variant="ghost"
                  size="sm"
                  className="absolute right-0 top-0 h-full px-3"
                  onClick={() => copyToClipboard(referralLink)}
                >
                  {isCopied ? (
                    <>
                      <Check className="mr-2 h-4 w-4" /> Copied
                    </>
                  ) : (
                    <>
                      <Copy className="mr-2 h-4 w-4" /> Copy
                    </>
                  )}
                </Button>
              </div>

              <div className="flex flex-wrap gap-2">
                <Button className="flex items-center gap-2">
                  <Share2 className="h-4 w-4" />
                  Share on Twitter
                </Button>
                <Button variant="outline" className="flex items-center gap-2">
                  <Share2 className="h-4 w-4" />
                  Share on Facebook
                </Button>
                <Button variant="outline" className="flex items-center gap-2">
                  <Share2 className="h-4 w-4" />
                  Share on Telegram
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Earnings Chart */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <div>
              <CardTitle>Earnings Overview</CardTitle>
              <CardDescription>
                Your affiliate earnings over time
              </CardDescription>
            </div>
            <Select value={timeRange} onValueChange={setTimeRange}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select time range" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="30days">Last 30 Days</SelectItem>
                <SelectItem value="6months">Last 6 Months</SelectItem>
                <SelectItem value="1year">Last Year</SelectItem>
              </SelectContent>
            </Select>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart
                  data={earningsData}
                  margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line
                    type="monotone"
                    dataKey="earnings"
                    stroke="#8884d8"
                    strokeWidth={2}
                    activeDot={{ r: 8 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Referrals Table */}
        <Card>
          <CardHeader>
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div>
                <CardTitle>Your Referrals</CardTitle>
                <CardDescription>
                  List of users you've referred to the platform
                </CardDescription>
              </div>
              <Button className="flex items-center gap-2">
                <UserPlus className="h-4 w-4" />
                <span>Invite Friends</span>
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="all" className="w-full">
              <TabsList className="mb-4">
                <TabsTrigger value="all">All Referrals</TabsTrigger>
                <TabsTrigger value="active">Active</TabsTrigger>
                <TabsTrigger value="pending">Pending</TabsTrigger>
              </TabsList>

              <TabsContent value="all" className="mt-0">
                <div className="rounded-md border">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>User</TableHead>
                        <TableHead>Level</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Registration Date</TableHead>
                        <TableHead>Total Deposits</TableHead>
                        <TableHead>Your Earnings</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {mockReferrals.map((referral) => (
                        <TableRow key={referral.id}>
                          <TableCell>
                            <div className="flex items-center gap-3">
                              <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                                <span className="font-medium text-primary">
                                  {referral.username.charAt(0).toUpperCase()}
                                </span>
                              </div>
                              <div>
                                <div className="font-medium">
                                  {referral.username}
                                </div>
                                <div className="text-sm text-muted-foreground">
                                  {referral.email}
                                </div>
                              </div>
                            </div>
                          </TableCell>
                          <TableCell>
                            <Badge variant="outline">
                              Level {referral.level}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <Badge
                              className={
                                referral.status === "active"
                                  ? "bg-green-100 text-green-800"
                                  : "bg-yellow-100 text-yellow-800"
                              }
                            >
                              {referral.status.charAt(0).toUpperCase() +
                                referral.status.slice(1)}
                            </Badge>
                          </TableCell>
                          <TableCell>{referral.registrationDate}</TableCell>
                          <TableCell>
                            ${referral.totalDeposits.toFixed(2)}
                          </TableCell>
                          <TableCell>
                            <span className="font-medium text-green-600">
                              ${referral.totalEarnings.toFixed(2)}
                            </span>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </TabsContent>

              <TabsContent value="active" className="mt-0">
                {/* Similar table with only active referrals */}
              </TabsContent>

              <TabsContent value="pending" className="mt-0">
                {/* Similar table with only pending referrals */}
              </TabsContent>
            </Tabs>
          </CardContent>
          <CardFooter>
            <Button variant="outline" className="w-full">
              <ArrowUpRight className="mr-2 h-4 w-4" />
              View All Referrals
            </Button>
          </CardFooter>
        </Card>

        {/* How It Works */}
        <Card>
          <CardHeader>
            <CardTitle>How the Affiliate Program Works</CardTitle>
            <CardDescription>
              Learn how to maximize your earnings with our multi-tier affiliate
              program
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="rounded-lg border p-4 text-center">
                  <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                    <UserPlus className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="mb-2 font-medium">Step 1: Invite Friends</h3>
                  <p className="text-sm text-muted-foreground">
                    Share your unique referral link with friends, on social
                    media, or your website.
                  </p>
                </div>

                <div className="rounded-lg border p-4 text-center">
                  <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                    <Users className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="mb-2 font-medium">
                    Step 2: They Join & Invest
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    When they sign up using your link and make deposits or
                    investments, you earn commissions.
                  </p>
                </div>

                <div className="rounded-lg border p-4 text-center">
                  <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                    <DollarSign className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="mb-2 font-medium">Step 3: Earn Commissions</h3>
                  <p className="text-sm text-muted-foreground">
                    Earn up to 5% on direct referrals and additional commissions
                    on their referrals.
                  </p>
                </div>
              </div>

              <Alert className="bg-blue-50 border-blue-200">
                <Info className="h-4 w-4 text-blue-600" />
                <AlertTitle>Multi-Tier Commission Structure</AlertTitle>
                <AlertDescription className="text-blue-700">
                  Our affiliate program offers a 3-level commission structure.
                  You earn 5% on direct referrals (Level 1), 3% on their
                  referrals (Level 2), and 1% on third-level referrals (Level
                  3).
                </AlertDescription>
              </Alert>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default AffiliateProgram;
