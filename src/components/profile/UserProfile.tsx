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
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
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
  User,
  Mail,
  Phone,
  MapPin,
  Calendar,
  Shield,
  Key,
  AlertCircle,
  Check,
  Upload,
  RefreshCw,
  Smartphone,
  Copy,
} from "lucide-react";
import DashboardLayout from "../layout/DashboardLayout";

interface UserProfileProps {
  userData?: {
    name: string;
    email: string;
    phone: string;
    country: string;
    joinDate: string;
    avatar: string;
    kycStatus: "verified" | "pending" | "not submitted";
    twoFactorEnabled: boolean;
  };
}

const UserProfile = ({
  userData = {
    name: "John Investor",
    email: "john.investor@example.com",
    phone: "+1 (555) 123-4567",
    country: "United States",
    joinDate: "January 15, 2023",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=investment",
    kycStatus: "verified" as const,
    twoFactorEnabled: true,
  },
}: UserProfileProps) => {
  const [activeTab, setActiveTab] = useState("personal");
  const [isEditProfileOpen, setIsEditProfileOpen] = useState(false);
  const [isChangePasswordOpen, setIsChangePasswordOpen] = useState(false);
  const [is2FADialogOpen, setIs2FADialogOpen] = useState(false);
  const [isKYCDialogOpen, setIsKYCDialogOpen] = useState(false);
  const [isCopied, setIsCopied] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  // Form states
  const [name, setName] = useState(userData.name);
  const [email, setEmail] = useState(userData.email);
  const [phone, setPhone] = useState(userData.phone);
  const [country, setCountry] = useState(userData.country);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  // KYC states
  const [selectedIdType, setSelectedIdType] = useState("passport");
  const [idNumber, setIdNumber] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [zipCode, setZipCode] = useState("");
  const [frontIdFile, setFrontIdFile] = useState<File | null>(null);
  const [backIdFile, setBackIdFile] = useState<File | null>(null);
  const [selfieFile, setSelfieFile] = useState<File | null>(null);

  // 2FA states
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(
    userData.twoFactorEnabled,
  );
  const [verificationCode, setVerificationCode] = useState("");
  const [qrCodeUrl] = useState(
    "https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=otpauth://totp/HYIP:john.investor@example.com?secret=JBSWY3DPEHPK3PXP&issuer=HYIP",
  );
  const [secretKey] = useState("JBSWY3DPEHPK3PXP");

  // Handle profile update
  const handleProfileUpdate = () => {
    setIsSubmitting(true);
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setIsEditProfileOpen(false);
      setSuccessMessage("Profile updated successfully");
      setTimeout(() => setSuccessMessage(null), 3000);
    }, 1500);
  };

  // Handle password change
  const handlePasswordChange = () => {
    setIsSubmitting(true);
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setIsChangePasswordOpen(false);
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
      setSuccessMessage("Password changed successfully");
      setTimeout(() => setSuccessMessage(null), 3000);
    }, 1500);
  };

  // Handle 2FA toggle
  const handle2FAToggle = () => {
    if (twoFactorEnabled) {
      // Disable 2FA
      setTwoFactorEnabled(false);
      setSuccessMessage("Two-factor authentication disabled");
      setTimeout(() => setSuccessMessage(null), 3000);
    } else {
      // Enable 2FA - show dialog
      setIs2FADialogOpen(true);
    }
  };

  // Handle 2FA verification
  const handle2FAVerification = () => {
    setIsSubmitting(true);
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setIs2FADialogOpen(false);
      setTwoFactorEnabled(true);
      setVerificationCode("");
      setSuccessMessage("Two-factor authentication enabled");
      setTimeout(() => setSuccessMessage(null), 3000);
    }, 1500);
  };

  // Handle KYC submission
  const handleKYCSubmission = () => {
    setIsSubmitting(true);
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setIsKYCDialogOpen(false);
      setSuccessMessage(
        "KYC documents submitted successfully. Verification in progress.",
      );
      setTimeout(() => setSuccessMessage(null), 3000);
    }, 1500);
  };

  // Copy secret key to clipboard
  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  // Get KYC status badge
  const getKYCStatusBadge = (status: string) => {
    switch (status) {
      case "verified":
        return <Badge className="bg-green-100 text-green-800">Verified</Badge>;
      case "pending":
        return <Badge className="bg-yellow-100 text-yellow-800">Pending</Badge>;
      case "not submitted":
        return (
          <Badge className="bg-gray-100 text-gray-800">Not Submitted</Badge>
        );
      default:
        return null;
    }
  };

  return (
    <DashboardLayout>
      <div className="p-6 space-y-6">
        <div>
          <h1 className="text-3xl font-bold">My Profile</h1>
          <p className="text-muted-foreground mt-2">
            Manage your account information and security settings
          </p>
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

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {/* Profile Summary Card */}
          <Card className="md:col-span-1">
            <CardContent className="pt-6">
              <div className="flex flex-col items-center text-center">
                <div className="relative mb-4">
                  <img
                    src={userData.avatar}
                    alt="Profile"
                    className="h-24 w-24 rounded-full border-4 border-background"
                  />
                  <Button
                    variant="outline"
                    size="icon"
                    className="absolute bottom-0 right-0 h-8 w-8 rounded-full bg-primary text-primary-foreground"
                    onClick={() => setIsEditProfileOpen(true)}
                  >
                    <Upload className="h-4 w-4" />
                  </Button>
                </div>
                <h2 className="text-xl font-bold">{userData.name}</h2>
                <p className="text-sm text-muted-foreground">
                  {userData.email}
                </p>
                <div className="mt-2 flex items-center justify-center gap-2">
                  {getKYCStatusBadge(userData.kycStatus)}
                  {userData.twoFactorEnabled && (
                    <Badge
                      variant="outline"
                      className="bg-blue-100 text-blue-800"
                    >
                      2FA Enabled
                    </Badge>
                  )}
                </div>
                <div className="mt-4 w-full">
                  <Button
                    variant="outline"
                    className="w-full"
                    onClick={() => setIsEditProfileOpen(true)}
                  >
                    Edit Profile
                  </Button>
                </div>
              </div>

              <Separator className="my-4" />

              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <Mail className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">{userData.email}</span>
                </div>
                <div className="flex items-center gap-3">
                  <Phone className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">{userData.phone}</span>
                </div>
                <div className="flex items-center gap-3">
                  <MapPin className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">{userData.country}</span>
                </div>
                <div className="flex items-center gap-3">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">Joined {userData.joinDate}</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Main Content */}
          <div className="md:col-span-3">
            <Tabs
              value={activeTab}
              onValueChange={setActiveTab}
              className="w-full"
            >
              <TabsList className="grid w-full grid-cols-3 mb-8">
                <TabsTrigger value="personal">Personal Info</TabsTrigger>
                <TabsTrigger value="security">Security</TabsTrigger>
                <TabsTrigger value="kyc">KYC Verification</TabsTrigger>
              </TabsList>

              {/* Personal Info Tab */}
              <TabsContent value="personal" className="mt-0">
                <Card>
                  <CardHeader>
                    <CardTitle>Personal Information</CardTitle>
                    <CardDescription>
                      Manage your personal details and contact information
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label>Full Name</Label>
                        <div className="rounded-md border px-4 py-3">
                          <div className="flex items-center gap-3">
                            <User className="h-4 w-4 text-muted-foreground" />
                            <span>{userData.name}</span>
                          </div>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label>Email Address</Label>
                        <div className="rounded-md border px-4 py-3">
                          <div className="flex items-center gap-3">
                            <Mail className="h-4 w-4 text-muted-foreground" />
                            <span>{userData.email}</span>
                          </div>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label>Phone Number</Label>
                        <div className="rounded-md border px-4 py-3">
                          <div className="flex items-center gap-3">
                            <Phone className="h-4 w-4 text-muted-foreground" />
                            <span>{userData.phone}</span>
                          </div>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label>Country</Label>
                        <div className="rounded-md border px-4 py-3">
                          <div className="flex items-center gap-3">
                            <MapPin className="h-4 w-4 text-muted-foreground" />
                            <span>{userData.country}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button onClick={() => setIsEditProfileOpen(true)}>
                      Edit Information
                    </Button>
                  </CardFooter>
                </Card>
              </TabsContent>

              {/* Security Tab */}
              <TabsContent value="security" className="mt-0 space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Password</CardTitle>
                    <CardDescription>
                      Change your password to keep your account secure
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between">
                      <div className="space-y-1">
                        <p className="font-medium">Password</p>
                        <p className="text-sm text-muted-foreground">
                          Last changed 30 days ago
                        </p>
                      </div>
                      <Button
                        variant="outline"
                        onClick={() => setIsChangePasswordOpen(true)}
                      >
                        Change Password
                      </Button>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Two-Factor Authentication</CardTitle>
                    <CardDescription>
                      Add an extra layer of security to your account
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between">
                      <div className="space-y-1">
                        <p className="font-medium">Two-Factor Authentication</p>
                        <p className="text-sm text-muted-foreground">
                          {twoFactorEnabled
                            ? "Enabled - Using Authenticator App"
                            : "Disabled - Your account is less secure"}
                        </p>
                      </div>
                      <Switch
                        checked={twoFactorEnabled}
                        onCheckedChange={handle2FAToggle}
                      />
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Login Sessions</CardTitle>
                    <CardDescription>
                      Manage your active sessions and devices
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="rounded-md border p-4">
                        <div className="flex items-start justify-between">
                          <div className="space-y-1">
                            <p className="font-medium">Current Session</p>
                            <p className="text-sm text-muted-foreground">
                              Chrome on Windows • IP: 192.168.1.1
                            </p>
                            <Badge className="mt-1 bg-green-100 text-green-800">
                              Active Now
                            </Badge>
                          </div>
                          <Button variant="ghost" size="sm" disabled>
                            Current
                          </Button>
                        </div>
                      </div>

                      <div className="rounded-md border p-4">
                        <div className="flex items-start justify-between">
                          <div className="space-y-1">
                            <p className="font-medium">Mobile App</p>
                            <p className="text-sm text-muted-foreground">
                              iPhone 13 • Last active 2 hours ago
                            </p>
                          </div>
                          <Button
                            variant="outline"
                            size="sm"
                            className="text-red-600"
                          >
                            Revoke
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* KYC Verification Tab */}
              <TabsContent value="kyc" className="mt-0">
                <Card>
                  <CardHeader>
                    <CardTitle>KYC Verification</CardTitle>
                    <CardDescription>
                      Verify your identity to unlock all platform features
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      <div className="rounded-md border p-4">
                        <div className="flex items-center justify-between">
                          <div className="space-y-1">
                            <p className="font-medium">Verification Status</p>
                            <div className="flex items-center gap-2">
                              {getKYCStatusBadge(userData.kycStatus)}
                              <p className="text-sm text-muted-foreground">
                                {userData.kycStatus === "verified"
                                  ? "Your identity has been verified"
                                  : userData.kycStatus === "pending"
                                    ? "Your documents are being reviewed"
                                    : "Please submit your documents for verification"}
                              </p>
                            </div>
                          </div>
                          {userData.kycStatus !== "verified" && (
                            <Button onClick={() => setIsKYCDialogOpen(true)}>
                              {userData.kycStatus === "pending"
                                ? "Check Status"
                                : "Submit Documents"}
                            </Button>
                          )}
                        </div>
                      </div>

                      {userData.kycStatus === "verified" && (
                        <div className="rounded-md bg-green-50 p-4 border border-green-200">
                          <div className="flex items-start gap-3">
                            <Shield className="h-5 w-5 text-green-600 mt-0.5" />
                            <div>
                              <h4 className="font-medium text-green-800">
                                Verification Complete
                              </h4>
                              <p className="text-sm text-green-700 mt-1">
                                Your identity has been verified. You have full
                                access to all platform features.
                              </p>
                            </div>
                          </div>
                        </div>
                      )}

                      {userData.kycStatus === "pending" && (
                        <div className="rounded-md bg-yellow-50 p-4 border border-yellow-200">
                          <div className="flex items-start gap-3">
                            <AlertCircle className="h-5 w-5 text-yellow-600 mt-0.5" />
                            <div>
                              <h4 className="font-medium text-yellow-800">
                                Verification in Progress
                              </h4>
                              <p className="text-sm text-yellow-700 mt-1">
                                Your documents are being reviewed. This process
                                typically takes 1-2 business days.
                              </p>
                            </div>
                          </div>
                        </div>
                      )}

                      {userData.kycStatus === "not submitted" && (
                        <div className="rounded-md bg-blue-50 p-4 border border-blue-200">
                          <div className="flex items-start gap-3">
                            <AlertCircle className="h-5 w-5 text-blue-600 mt-0.5" />
                            <div>
                              <h4 className="font-medium text-blue-800">
                                Verification Required
                              </h4>
                              <p className="text-sm text-blue-700 mt-1">
                                Please submit your identification documents to
                                verify your identity and gain full access to all
                                platform features.
                              </p>
                              <Button
                                className="mt-3"
                                onClick={() => setIsKYCDialogOpen(true)}
                              >
                                Start Verification
                              </Button>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>

        {/* Edit Profile Dialog */}
        <Dialog open={isEditProfileOpen} onOpenChange={setIsEditProfileOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Edit Profile</DialogTitle>
              <DialogDescription>
                Update your personal information
              </DialogDescription>
            </DialogHeader>

            <div className="grid gap-6 py-4">
              <div className="flex items-center justify-center">
                <div className="relative">
                  <img
                    src={userData.avatar}
                    alt="Profile"
                    className="h-24 w-24 rounded-full border-4 border-background"
                  />
                  <Button
                    variant="outline"
                    size="icon"
                    className="absolute bottom-0 right-0 h-8 w-8 rounded-full bg-primary text-primary-foreground"
                  >
                    <Upload className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="name" className="text-right">
                  Full Name
                </Label>
                <Input
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="col-span-3"
                />
              </div>

              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="email" className="text-right">
                  Email
                </Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="col-span-3"
                />
              </div>

              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="phone" className="text-right">
                  Phone
                </Label>
                <Input
                  id="phone"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="col-span-3"
                />
              </div>

              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="country" className="text-right">
                  Country
                </Label>
                <Input
                  id="country"
                  value={country}
                  onChange={(e) => setCountry(e.target.value)}
                  className="col-span-3"
                />
              </div>
            </div>

            <DialogFooter>
              <Button
                variant="outline"
                onClick={() => setIsEditProfileOpen(false)}
              >
                Cancel
              </Button>
              <Button onClick={handleProfileUpdate} disabled={isSubmitting}>
                {isSubmitting ? (
                  <>
                    <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                    Saving...
                  </>
                ) : (
                  "Save Changes"
                )}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Change Password Dialog */}
        <Dialog
          open={isChangePasswordOpen}
          onOpenChange={setIsChangePasswordOpen}
        >
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Change Password</DialogTitle>
              <DialogDescription>
                Update your password to keep your account secure
              </DialogDescription>
            </DialogHeader>

            <div className="grid gap-6 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="current-password" className="text-right">
                  Current Password
                </Label>
                <Input
                  id="current-password"
                  type="password"
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  className="col-span-3"
                />
              </div>

              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="new-password" className="text-right">
                  New Password
                </Label>
                <Input
                  id="new-password"
                  type="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="col-span-3"
                />
              </div>

              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="confirm-password" className="text-right">
                  Confirm Password
                </Label>
                <Input
                  id="confirm-password"
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="col-span-3"
                />
              </div>

              {newPassword &&
                confirmPassword &&
                newPassword !== confirmPassword && (
                  <Alert variant="destructive">
                    <AlertCircle className="h-4 w-4" />
                    <AlertTitle>Error</AlertTitle>
                    <AlertDescription>
                      Passwords do not match. Please try again.
                    </AlertDescription>
                  </Alert>
                )}
            </div>

            <DialogFooter>
              <Button
                variant="outline"
                onClick={() => setIsChangePasswordOpen(false)}
              >
                Cancel
              </Button>
              <Button
                onClick={handlePasswordChange}
                disabled={
                  isSubmitting ||
                  !currentPassword ||
                  !newPassword ||
                  !confirmPassword ||
                  newPassword !== confirmPassword
                }
              >
                {isSubmitting ? (
                  <>
                    <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                    Updating...
                  </>
                ) : (
                  "Update Password"
                )}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* 2FA Setup Dialog */}
        <Dialog open={is2FADialogOpen} onOpenChange={setIs2FADialogOpen}>
          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle>Set Up Two-Factor Authentication</DialogTitle>
              <DialogDescription>
                Enhance your account security with two-factor authentication
              </DialogDescription>
            </DialogHeader>

            <div className="grid gap-6 py-4">
              <div className="space-y-2">
                <h3 className="font-medium">Step 1: Scan QR Code</h3>
                <p className="text-sm text-muted-foreground">
                  Scan this QR code with your authenticator app (Google
                  Authenticator, Authy, etc.)
                </p>
                <div className="flex justify-center py-4">
                  <img
                    src={qrCodeUrl}
                    alt="2FA QR Code"
                    className="h-48 w-48 border p-2 rounded-md"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <h3 className="font-medium">Step 2: Enter Secret Key</h3>
                <p className="text-sm text-muted-foreground">
                  If you can't scan the QR code, enter this secret key manually
                  in your app
                </p>
                <div className="relative">
                  <Input value={secretKey} readOnly className="pr-10" />
                  <Button
                    variant="ghost"
                    size="icon"
                    className="absolute right-0 top-0 h-full"
                    onClick={() => copyToClipboard(secretKey)}
                  >
                    {isCopied ? (
                      <Check className="h-4 w-4 text-green-500" />
                    ) : (
                      <Copy className="h-4 w-4" />
                    )}
                  </Button>
                </div>
              </div>

              <div className="space-y-2">
                <h3 className="font-medium">Step 3: Verify Code</h3>
                <p className="text-sm text-muted-foreground">
                  Enter the 6-digit code from your authenticator app to verify
                  setup
                </p>
                <Input
                  placeholder="Enter 6-digit code"
                  value={verificationCode}
                  onChange={(e) => setVerificationCode(e.target.value)}
                  maxLength={6}
                />
              </div>

              <Alert className="bg-blue-50 border-blue-200">
                <Smartphone className="h-4 w-4 text-blue-600" />
                <AlertTitle>Important</AlertTitle>
                <AlertDescription className="text-blue-700">
                  Store your backup codes in a safe place. If you lose access to
                  your authenticator app, you'll need these codes to log in.
                </AlertDescription>
              </Alert>
            </div>

            <DialogFooter>
              <Button
                variant="outline"
                onClick={() => setIs2FADialogOpen(false)}
              >
                Cancel
              </Button>
              <Button
                onClick={handle2FAVerification}
                disabled={isSubmitting || verificationCode.length !== 6}
              >
                {isSubmitting ? (
                  <>
                    <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                    Verifying...
                  </>
                ) : (
                  "Enable 2FA"
                )}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* KYC Verification Dialog */}
        <Dialog open={isKYCDialogOpen} onOpenChange={setIsKYCDialogOpen}>
          <DialogContent className="sm:max-w-[600px]">
            <DialogHeader>
              <DialogTitle>KYC Verification</DialogTitle>
              <DialogDescription>
                Complete your identity verification to unlock all platform
                features
              </DialogDescription>
            </DialogHeader>

            <div className="grid gap-6 py-4">
              <div className="space-y-2">
                <h3 className="font-medium">Personal Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="id-type">ID Type</Label>
                    <select
                      id="id-type"
                      className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                      value={selectedIdType}
                      onChange={(e) => setSelectedIdType(e.target.value)}
                    >
                      <option value="passport">Passport</option>
                      <option value="drivers_license">Driver's License</option>
                      <option value="national_id">National ID Card</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="id-number">ID Number</Label>
                    <Input
                      id="id-number"
                      placeholder="Enter ID number"
                      value={idNumber}
                      onChange={(e) => setIdNumber(e.target.value)}
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <h3 className="font-medium">Address Information</h3>
                <div className="grid grid-cols-1 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="address">Address</Label>
                    <Textarea
                      id="address"
                      placeholder="Enter your full address"
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                    />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="city">City</Label>
                      <Input
                        id="city"
                        placeholder="City"
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="zip-code">Zip/Postal Code</Label>
                      <Input
                        id="zip-code"
                        placeholder="Zip/Postal Code"
                        value={zipCode}
                        onChange={(e) => setZipCode(e.target.value)}
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <h3 className="font-medium">Document Upload</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="front-id">ID Front Side</Label>
                    <div className="flex items-center justify-center w-full">
                      <label
                        htmlFor="front-id-upload"
                        className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100"
                      >
                        <div className="flex flex-col items-center justify-center pt-5 pb-6">
                          <Upload className="h-6 w-6 text-gray-500 mb-2" />
                          <p className="text-xs text-gray-500">
                            {frontIdFile ? frontIdFile.name : "Click to upload"}
                          </p>
                        </div>
                        <input
                          id="front-id-upload"
                          type="file"
                          className="hidden"
                          onChange={(e) =>
                            e.target.files && setFrontIdFile(e.target.files[0])
                          }
                        />
                      </label>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="back-id">ID Back Side</Label>
                    <div className="flex items-center justify-center w-full">
                      <label
                        htmlFor="back-id-upload"
                        className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100"
                      >
                        <div className="flex flex-col items-center justify-center pt-5 pb-6">
                          <Upload className="h-6 w-6 text-gray-500 mb-2" />
                          <p className="text-xs text-gray-500">
                            {backIdFile ? backIdFile.name : "Click to upload"}
                          </p>
                        </div>
                        <input
                          id="back-id-upload"
                          type="file"
                          className="hidden"
                          onChange={(e) =>
                            e.target.files && setBackIdFile(e.target.files[0])
                          }
                        />
                      </label>
                    </div>
                  </div>
                </div>
                <div className="space-y-2 mt-4">
                  <Label htmlFor="selfie">Selfie with ID</Label>
                  <div className="flex items-center justify-center w-full">
                    <label
                      htmlFor="selfie-upload"
                      className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100"
                    >
                      <div className="flex flex-col items-center justify-center pt-5 pb-6">
                        <Upload className="h-6 w-6 text-gray-500 mb-2" />
                        <p className="text-xs text-gray-500">
                          {selfieFile
                            ? selfieFile.name
                            : "Click to upload a selfie holding your ID"}
                        </p>
                      </div>
                      <input
                        id="selfie-upload"
                        type="file"
                        className="hidden"
                        onChange={(e) =>
                          e.target.files && setSelfieFile(e.target.files[0])
                        }
                      />
                    </label>
                  </div>
                </div>
              </div>

              <Alert className="bg-yellow-50 border-yellow-200">
                <AlertCircle className="h-4 w-4 text-yellow-600" />
                <AlertTitle>Important</AlertTitle>
                <AlertDescription className="text-yellow-700">
                  Please ensure all documents are clear, legible, and valid.
                  Verification typically takes 1-2 business days.
                </AlertDescription>
              </Alert>
            </div>

            <DialogFooter>
              <Button
                variant="outline"
                onClick={() => setIsKYCDialogOpen(false)}
              >
                Cancel
              </Button>
              <Button
                onClick={handleKYCSubmission}
                disabled={
                  isSubmitting ||
                  !idNumber ||
                  !address ||
                  !city ||
                  !zipCode ||
                  !frontIdFile ||
                  !backIdFile ||
                  !selfieFile
                }
              >
                {isSubmitting ? (
                  <>
                    <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                    Submitting...
                  </>
                ) : (
                  "Submit Documents"
                )}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </DashboardLayout>
  );
};

export default UserProfile;
