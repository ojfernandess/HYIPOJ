import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Search,
  MoreHorizontal,
  UserPlus,
  Filter,
  Download,
} from "lucide-react";

interface User {
  id: string;
  name: string;
  email: string;
  status: "active" | "suspended" | "pending";
  balance: number;
  investments: number;
  miningPower: number;
  registrationDate: string;
  lastLogin: string;
  kycStatus: "verified" | "pending" | "rejected" | "not submitted";
}

const mockUsers: User[] = [
  {
    id: "1",
    name: "John Smith",
    email: "john.smith@example.com",
    status: "active",
    balance: 2450.75,
    investments: 1500,
    miningPower: 75,
    registrationDate: "2023-01-15",
    lastLogin: "2023-06-20 14:30",
    kycStatus: "verified",
  },
  {
    id: "2",
    name: "Sarah Johnson",
    email: "sarah.j@example.com",
    status: "active",
    balance: 5670.5,
    investments: 4000,
    miningPower: 120,
    registrationDate: "2023-02-22",
    lastLogin: "2023-06-19 09:45",
    kycStatus: "verified",
  },
  {
    id: "3",
    name: "Michael Brown",
    email: "m.brown@example.com",
    status: "suspended",
    balance: 150.25,
    investments: 0,
    miningPower: 0,
    registrationDate: "2023-03-10",
    lastLogin: "2023-05-05 11:20",
    kycStatus: "rejected",
  },
  {
    id: "4",
    name: "Emma Wilson",
    email: "emma.w@example.com",
    status: "pending",
    balance: 0,
    investments: 0,
    miningPower: 0,
    registrationDate: "2023-06-18",
    lastLogin: "2023-06-18 16:15",
    kycStatus: "pending",
  },
  {
    id: "5",
    name: "David Lee",
    email: "david.lee@example.com",
    status: "active",
    balance: 12350.8,
    investments: 10000,
    miningPower: 250,
    registrationDate: "2022-11-05",
    lastLogin: "2023-06-20 10:10",
    kycStatus: "verified",
  },
];

const UserManagement = () => {
  const [users, setUsers] = useState<User[]>(mockUsers);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [kycFilter, setKycFilter] = useState<string>("all");
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [isUserDetailsOpen, setIsUserDetailsOpen] = useState(false);
  const [isEditUserOpen, setIsEditUserOpen] = useState(false);

  // Filter users based on search term and filters
  const filteredUsers = users.filter((user) => {
    const matchesSearch =
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus =
      statusFilter === "all" || user.status === statusFilter;

    const matchesKyc = kycFilter === "all" || user.kycStatus === kycFilter;

    return matchesSearch && matchesStatus && matchesKyc;
  });

  const handleStatusChange = (
    userId: string,
    newStatus: "active" | "suspended" | "pending",
  ) => {
    setUsers(
      users.map((user) =>
        user.id === userId ? { ...user, status: newStatus } : user,
      ),
    );
  };

  const handleKycStatusChange = (
    userId: string,
    newStatus: "verified" | "pending" | "rejected" | "not submitted",
  ) => {
    setUsers(
      users.map((user) =>
        user.id === userId ? { ...user, kycStatus: newStatus } : user,
      ),
    );
  };

  const getStatusBadgeVariant = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-800";
      case "suspended":
        return "bg-red-100 text-red-800";
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      default:
        return "";
    }
  };

  const getKycStatusBadgeVariant = (status: string) => {
    switch (status) {
      case "verified":
        return "bg-green-100 text-green-800";
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      case "rejected":
        return "bg-red-100 text-red-800";
      case "not submitted":
        return "bg-gray-100 text-gray-800";
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
                User Management
              </CardTitle>
              <CardDescription>
                Manage user accounts, view details, and modify settings
              </CardDescription>
            </div>
            <div className="flex items-center gap-2">
              <Dialog>
                <DialogTrigger asChild>
                  <Button className="flex items-center gap-2">
                    <UserPlus className="h-4 w-4" />
                    <span>Add User</span>
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Add New User</DialogTitle>
                    <DialogDescription>
                      Create a new user account in the system
                    </DialogDescription>
                  </DialogHeader>
                  <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                      <label htmlFor="name" className="text-right">
                        Name
                      </label>
                      <Input
                        id="name"
                        placeholder="Full Name"
                        className="col-span-3"
                      />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <label htmlFor="email" className="text-right">
                        Email
                      </label>
                      <Input
                        id="email"
                        placeholder="email@example.com"
                        className="col-span-3"
                      />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <label htmlFor="status" className="text-right">
                        Status
                      </label>
                      <Select defaultValue="active">
                        <SelectTrigger className="col-span-3">
                          <SelectValue placeholder="Select status" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="active">Active</SelectItem>
                          <SelectItem value="pending">Pending</SelectItem>
                          <SelectItem value="suspended">Suspended</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <DialogFooter>
                    <Button type="submit">Create User</Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
              <Button variant="outline">
                <Download className="h-4 w-4 mr-2" />
                Export
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="all-users" className="w-full">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4 gap-4">
              <TabsList>
                <TabsTrigger value="all-users">All Users</TabsTrigger>
                <TabsTrigger value="active">Active</TabsTrigger>
                <TabsTrigger value="pending">Pending</TabsTrigger>
                <TabsTrigger value="suspended">Suspended</TabsTrigger>
              </TabsList>
              <div className="flex items-center gap-2">
                <div className="relative">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    type="search"
                    placeholder="Search users..."
                    className="pl-8 w-[200px] sm:w-[300px]"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" size="icon">
                      <Filter className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-[200px]">
                    <DropdownMenuLabel>Filter Users</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <div className="p-2">
                      <div className="space-y-2">
                        <h4 className="text-sm font-medium">Status</h4>
                        <Select
                          value={statusFilter}
                          onValueChange={setStatusFilter}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Filter by status" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="all">All Statuses</SelectItem>
                            <SelectItem value="active">Active</SelectItem>
                            <SelectItem value="pending">Pending</SelectItem>
                            <SelectItem value="suspended">Suspended</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2 mt-4">
                        <h4 className="text-sm font-medium">KYC Status</h4>
                        <Select value={kycFilter} onValueChange={setKycFilter}>
                          <SelectTrigger>
                            <SelectValue placeholder="Filter by KYC status" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="all">
                              All KYC Statuses
                            </SelectItem>
                            <SelectItem value="verified">Verified</SelectItem>
                            <SelectItem value="pending">Pending</SelectItem>
                            <SelectItem value="rejected">Rejected</SelectItem>
                            <SelectItem value="not submitted">
                              Not Submitted
                            </SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>

            <TabsContent value="all-users" className="mt-0">
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>User</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>KYC Status</TableHead>
                      <TableHead>Balance</TableHead>
                      <TableHead>Registration Date</TableHead>
                      <TableHead>Last Login</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredUsers.length === 0 ? (
                      <TableRow>
                        <TableCell colSpan={7} className="h-24 text-center">
                          No users found.
                        </TableCell>
                      </TableRow>
                    ) : (
                      filteredUsers.map((user) => (
                        <TableRow key={user.id}>
                          <TableCell>
                            <div className="flex items-center gap-3">
                              <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                                <span className="font-medium text-primary">
                                  {user.name
                                    .split(" ")
                                    .map((n) => n[0])
                                    .join("")}
                                </span>
                              </div>
                              <div>
                                <div className="font-medium">{user.name}</div>
                                <div className="text-sm text-muted-foreground">
                                  {user.email}
                                </div>
                              </div>
                            </div>
                          </TableCell>
                          <TableCell>
                            <Badge
                              className={getStatusBadgeVariant(user.status)}
                            >
                              {user.status.charAt(0).toUpperCase() +
                                user.status.slice(1)}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <Badge
                              className={getKycStatusBadgeVariant(
                                user.kycStatus,
                              )}
                            >
                              {user.kycStatus
                                .split(" ")
                                .map(
                                  (word) =>
                                    word.charAt(0).toUpperCase() +
                                    word.slice(1),
                                )
                                .join(" ")}
                            </Badge>
                          </TableCell>
                          <TableCell>${user.balance.toFixed(2)}</TableCell>
                          <TableCell>{user.registrationDate}</TableCell>
                          <TableCell>{user.lastLogin}</TableCell>
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
                                    setSelectedUser(user);
                                    setIsUserDetailsOpen(true);
                                  }}
                                >
                                  View Details
                                </DropdownMenuItem>
                                <DropdownMenuItem
                                  onClick={() => {
                                    setSelectedUser(user);
                                    setIsEditUserOpen(true);
                                  }}
                                >
                                  Edit User
                                </DropdownMenuItem>
                                <DropdownMenuSeparator />
                                <DropdownMenuLabel>Status</DropdownMenuLabel>
                                <DropdownMenuItem
                                  onClick={() =>
                                    handleStatusChange(user.id, "active")
                                  }
                                  disabled={user.status === "active"}
                                >
                                  Set Active
                                </DropdownMenuItem>
                                <DropdownMenuItem
                                  onClick={() =>
                                    handleStatusChange(user.id, "suspended")
                                  }
                                  disabled={user.status === "suspended"}
                                >
                                  Suspend User
                                </DropdownMenuItem>
                                <DropdownMenuSeparator />
                                <DropdownMenuLabel>KYC</DropdownMenuLabel>
                                <DropdownMenuItem
                                  onClick={() =>
                                    handleKycStatusChange(user.id, "verified")
                                  }
                                  disabled={user.kycStatus === "verified"}
                                >
                                  Approve KYC
                                </DropdownMenuItem>
                                <DropdownMenuItem
                                  onClick={() =>
                                    handleKycStatusChange(user.id, "rejected")
                                  }
                                  disabled={user.kycStatus === "rejected"}
                                >
                                  Reject KYC
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </TableCell>
                        </TableRow>
                      ))
                    )}
                  </TableBody>
                </Table>
              </div>
            </TabsContent>

            {/* Other tabs content would be similar but with filtered data */}
            <TabsContent value="active" className="mt-0">
              {/* Similar table with only active users */}
            </TabsContent>
            <TabsContent value="pending" className="mt-0">
              {/* Similar table with only pending users */}
            </TabsContent>
            <TabsContent value="suspended" className="mt-0">
              {/* Similar table with only suspended users */}
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      {/* User Details Dialog */}
      <Dialog open={isUserDetailsOpen} onOpenChange={setIsUserDetailsOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>User Details</DialogTitle>
            <DialogDescription>
              Detailed information about the user account
            </DialogDescription>
          </DialogHeader>
          {selectedUser && (
            <div className="grid gap-4 py-4">
              <div className="flex items-center gap-4">
                <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center">
                  <span className="text-xl font-medium text-primary">
                    {selectedUser.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </span>
                </div>
                <div>
                  <h3 className="text-xl font-semibold">{selectedUser.name}</h3>
                  <p className="text-muted-foreground">{selectedUser.email}</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 mt-4">
                <div className="space-y-1">
                  <p className="text-sm text-muted-foreground">
                    Account Status
                  </p>
                  <Badge className={getStatusBadgeVariant(selectedUser.status)}>
                    {selectedUser.status.charAt(0).toUpperCase() +
                      selectedUser.status.slice(1)}
                  </Badge>
                </div>
                <div className="space-y-1">
                  <p className="text-sm text-muted-foreground">KYC Status</p>
                  <Badge
                    className={getKycStatusBadgeVariant(selectedUser.kycStatus)}
                  >
                    {selectedUser.kycStatus
                      .split(" ")
                      .map(
                        (word) => word.charAt(0).toUpperCase() + word.slice(1),
                      )
                      .join(" ")}
                  </Badge>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <p className="text-sm text-muted-foreground">Balance</p>
                  <p className="font-medium">
                    ${selectedUser.balance.toFixed(2)}
                  </p>
                </div>
                <div className="space-y-1">
                  <p className="text-sm text-muted-foreground">Investments</p>
                  <p className="font-medium">
                    ${selectedUser.investments.toFixed(2)}
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <p className="text-sm text-muted-foreground">Mining Power</p>
                  <p className="font-medium">{selectedUser.miningPower} GH/s</p>
                </div>
                <div className="space-y-1">
                  <p className="text-sm text-muted-foreground">
                    Registration Date
                  </p>
                  <p className="font-medium">{selectedUser.registrationDate}</p>
                </div>
              </div>

              <div className="space-y-1">
                <p className="text-sm text-muted-foreground">Last Login</p>
                <p className="font-medium">{selectedUser.lastLogin}</p>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsUserDetailsOpen(false)}
            >
              Close
            </Button>
            <Button
              onClick={() => {
                setIsUserDetailsOpen(false);
                setIsEditUserOpen(true);
              }}
            >
              Edit User
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit User Dialog */}
      <Dialog open={isEditUserOpen} onOpenChange={setIsEditUserOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit User</DialogTitle>
            <DialogDescription>
              Update user account information
            </DialogDescription>
          </DialogHeader>
          {selectedUser && (
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <label htmlFor="edit-name" className="text-right">
                  Name
                </label>
                <Input
                  id="edit-name"
                  defaultValue={selectedUser.name}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <label htmlFor="edit-email" className="text-right">
                  Email
                </label>
                <Input
                  id="edit-email"
                  defaultValue={selectedUser.email}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <label htmlFor="edit-status" className="text-right">
                  Status
                </label>
                <Select defaultValue={selectedUser.status}>
                  <SelectTrigger className="col-span-3">
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="suspended">Suspended</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <label htmlFor="edit-kyc" className="text-right">
                  KYC Status
                </label>
                <Select defaultValue={selectedUser.kycStatus}>
                  <SelectTrigger className="col-span-3">
                    <SelectValue placeholder="Select KYC status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="verified">Verified</SelectItem>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="rejected">Rejected</SelectItem>
                    <SelectItem value="not submitted">Not Submitted</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <label htmlFor="edit-balance" className="text-right">
                  Balance
                </label>
                <Input
                  id="edit-balance"
                  type="number"
                  defaultValue={selectedUser.balance}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <label htmlFor="edit-mining" className="text-right">
                  Mining Power
                </label>
                <Input
                  id="edit-mining"
                  type="number"
                  defaultValue={selectedUser.miningPower}
                  className="col-span-3"
                />
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditUserOpen(false)}>
              Cancel
            </Button>
            <Button onClick={() => setIsEditUserOpen(false)}>
              Save Changes
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default UserManagement;
