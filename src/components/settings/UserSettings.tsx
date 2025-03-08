import React, { useState, useEffect } from "react";
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
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Bell,
  Mail,
  Smartphone,
  Globe,
  Moon,
  Sun,
  Check,
  RefreshCw,
  Trash2,
  AlertCircle,
  Lock,
  Eye,
  EyeOff,
} from "lucide-react";
import DashboardLayout from "../layout/DashboardLayout";
import { useTheme } from "./ThemeProvider";

const UserSettings = () => {
  const { theme, setTheme } = useTheme();
  const [activeTab, setActiveTab] = useState("preferences");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  // Notification settings - load from localStorage if available
  const [emailNotifications, setEmailNotifications] = useState(() => {
    try {
      const savedPrefs = localStorage.getItem("notificationPreferences");
      if (savedPrefs) {
        const prefs = JSON.parse(savedPrefs);
        return prefs.email !== undefined ? prefs.email : true;
      }
    } catch (e) {}
    return true;
  });

  const [smsNotifications, setSmsNotifications] = useState(() => {
    try {
      const savedPrefs = localStorage.getItem("notificationPreferences");
      if (savedPrefs) {
        const prefs = JSON.parse(savedPrefs);
        return prefs.sms !== undefined ? prefs.sms : false;
      }
    } catch (e) {}
    return false;
  });

  const [depositNotifications, setDepositNotifications] = useState(() => {
    try {
      const savedPrefs = localStorage.getItem("notificationPreferences");
      if (savedPrefs) {
        const prefs = JSON.parse(savedPrefs);
        return prefs.deposits !== undefined ? prefs.deposits : true;
      }
    } catch (e) {}
    return true;
  });

  const [withdrawalNotifications, setWithdrawalNotifications] = useState(() => {
    try {
      const savedPrefs = localStorage.getItem("notificationPreferences");
      if (savedPrefs) {
        const prefs = JSON.parse(savedPrefs);
        return prefs.withdrawals !== undefined ? prefs.withdrawals : true;
      }
    } catch (e) {}
    return true;
  });

  const [investmentNotifications, setInvestmentNotifications] = useState(() => {
    try {
      const savedPrefs = localStorage.getItem("notificationPreferences");
      if (savedPrefs) {
        const prefs = JSON.parse(savedPrefs);
        return prefs.investments !== undefined ? prefs.investments : true;
      }
    } catch (e) {}
    return true;
  });

  const [miningNotifications, setMiningNotifications] = useState(() => {
    try {
      const savedPrefs = localStorage.getItem("notificationPreferences");
      if (savedPrefs) {
        const prefs = JSON.parse(savedPrefs);
        return prefs.mining !== undefined ? prefs.mining : true;
      }
    } catch (e) {}
    return true;
  });

  const [securityNotifications, setSecurityNotifications] = useState(() => {
    try {
      const savedPrefs = localStorage.getItem("notificationPreferences");
      if (savedPrefs) {
        const prefs = JSON.parse(savedPrefs);
        return prefs.security !== undefined ? prefs.security : true;
      }
    } catch (e) {}
    return true;
  });

  const [marketingNotifications, setMarketingNotifications] = useState(() => {
    try {
      const savedPrefs = localStorage.getItem("notificationPreferences");
      if (savedPrefs) {
        const prefs = JSON.parse(savedPrefs);
        return prefs.marketing !== undefined ? prefs.marketing : false;
      }
    } catch (e) {}
    return false;
  });

  // Language settings - load from localStorage if available
  const [language, setLanguage] = useState(() => {
    const savedLanguage = localStorage.getItem("preferredLanguage");
    return savedLanguage || "en";
  });

  // Currency settings - load from localStorage if available
  const [currency, setCurrency] = useState(() => {
    const savedCurrency = localStorage.getItem("preferredCurrency");
    return savedCurrency || "USD";
  });

  // Timezone settings - load from localStorage if available
  const [timezone, setTimezone] = useState(() => {
    const savedTimezone = localStorage.getItem("preferredTimezone");
    return savedTimezone || "UTC";
  });

  // Privacy settings - load from localStorage if available
  const [activityTracking, setActivityTracking] = useState(() => {
    try {
      const savedSettings = localStorage.getItem("privacySettings");
      if (savedSettings) {
        const settings = JSON.parse(savedSettings);
        return settings.activityTracking !== undefined
          ? settings.activityTracking
          : true;
      }
    } catch (e) {}
    return true;
  });

  const [showBalance, setShowBalance] = useState(() => {
    try {
      const savedSettings = localStorage.getItem("privacySettings");
      if (savedSettings) {
        const settings = JSON.parse(savedSettings);
        return settings.showBalance !== undefined ? settings.showBalance : true;
      }
    } catch (e) {}
    return true;
  });

  const [twoFactorLogin, setTwoFactorLogin] = useState(() => {
    try {
      const savedSettings = localStorage.getItem("privacySettings");
      if (savedSettings) {
        const settings = JSON.parse(savedSettings);
        return settings.twoFactorLogin !== undefined
          ? settings.twoFactorLogin
          : true;
      }
    } catch (e) {}
    return true;
  });

  const [emailConfirmation, setEmailConfirmation] = useState(() => {
    try {
      const savedSettings = localStorage.getItem("privacySettings");
      if (savedSettings) {
        const settings = JSON.parse(savedSettings);
        return settings.emailConfirmation !== undefined
          ? settings.emailConfirmation
          : true;
      }
    } catch (e) {}
    return true;
  });

  // API Key settings - load from localStorage if available
  const [apiKey, setApiKey] = useState(() => {
    const savedKey = localStorage.getItem("apiKey");
    return savedKey || "sk_live_51NzT7JKG6HmNqXXXXXXXXXXXX";
  });

  const [showApiKey, setShowApiKey] = useState(false);

  const [apiKeyEnabled, setApiKeyEnabled] = useState(() => {
    const enabled = localStorage.getItem("apiKeyEnabled");
    return enabled === "true";
  });

  // Apply language change
  const applyLanguage = (selectedLanguage: string) => {
    // In a real app, this would load language files and update the UI
    localStorage.setItem("preferredLanguage", selectedLanguage);

    // Simulate language change with some UI text updates
    document.documentElement.lang = selectedLanguage;

    // In a real app, this would use i18n library to change all text
    // For demo purposes, we'll just update the document title with language code
    const languageNames: Record<string, string> = {
      en: "English",
      es: "Spanish",
      fr: "French",
      de: "German",
      pt: "Portuguese",
    };

    document.title = `HYIP Platform (${languageNames[selectedLanguage] || selectedLanguage})`;
  };

  // Apply currency change
  const applyCurrency = (selectedCurrency: string) => {
    // In a real app, this would update all currency displays
    localStorage.setItem("preferredCurrency", selectedCurrency);
  };

  // Apply timezone change
  const applyTimezone = (selectedTimezone: string) => {
    // In a real app, this would update date/time displays
    localStorage.setItem("preferredTimezone", selectedTimezone);
  };

  // Handle settings save
  const handleSaveSettings = () => {
    setIsSubmitting(true);

    // Apply all settings
    applyLanguage(language);
    applyCurrency(currency);
    applyTimezone(timezone);

    // Save notification preferences
    const notificationPrefs = {
      email: emailNotifications,
      sms: smsNotifications,
      deposits: depositNotifications,
      withdrawals: withdrawalNotifications,
      investments: investmentNotifications,
      mining: miningNotifications,
      security: securityNotifications,
      marketing: marketingNotifications,
    };
    localStorage.setItem(
      "notificationPreferences",
      JSON.stringify(notificationPrefs),
    );

    // Save privacy settings
    const privacySettings = {
      activityTracking,
      showBalance,
      twoFactorLogin,
      emailConfirmation,
    };
    localStorage.setItem("privacySettings", JSON.stringify(privacySettings));

    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setSuccessMessage("Settings saved successfully");
      setTimeout(() => setSuccessMessage(null), 3000);
    }, 1500);
  };

  // Generate new API key
  const handleGenerateApiKey = () => {
    setIsSubmitting(true);
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      const newKey =
        "sk_live_" +
        Math.random().toString(36).substring(2, 15) +
        Math.random().toString(36).substring(2, 15);

      setApiKey(newKey);
      localStorage.setItem("apiKey", newKey);
      localStorage.setItem("apiKeyEnabled", "true");
      setApiKeyEnabled(true);

      setSuccessMessage("New API key generated successfully");
      setTimeout(() => setSuccessMessage(null), 3000);
    }, 1500);
  };

  // Revoke API key
  const handleRevokeApiKey = () => {
    setIsSubmitting(true);
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setApiKeyEnabled(false);
      localStorage.setItem("apiKeyEnabled", "false");

      setSuccessMessage("API key revoked successfully");
      setTimeout(() => setSuccessMessage(null), 3000);
    }, 1500);
  };

  return (
    <DashboardLayout>
      <div className="p-6 space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Settings</h1>
          <p className="text-muted-foreground mt-2">
            Manage your account settings and preferences
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

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-4 mb-8">
            <TabsTrigger value="preferences">Preferences</TabsTrigger>
            <TabsTrigger value="notifications">Notifications</TabsTrigger>
            <TabsTrigger value="privacy">Privacy & Security</TabsTrigger>
            <TabsTrigger value="api">API Access</TabsTrigger>
          </TabsList>

          {/* Preferences Tab */}
          <TabsContent value="preferences" className="mt-0 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Appearance</CardTitle>
                <CardDescription>
                  Customize how the platform looks and feels
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Theme</Label>
                    <p className="text-sm text-muted-foreground">
                      Choose between light and dark mode
                    </p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Button
                      variant={theme === "light" ? "default" : "outline"}
                      size="sm"
                      className="flex items-center gap-2"
                      onClick={() => setTheme("light")}
                    >
                      <Sun className="h-4 w-4" />
                      Light
                    </Button>
                    <Button
                      variant={theme === "dark" ? "default" : "outline"}
                      size="sm"
                      className="flex items-center gap-2"
                      onClick={() => setTheme("dark")}
                    >
                      <Moon className="h-4 w-4" />
                      Dark
                    </Button>
                  </div>
                </div>

                <Separator />

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Language</Label>
                    <p className="text-sm text-muted-foreground">
                      Select your preferred language
                    </p>
                  </div>
                  <Select
                    value={language}
                    onValueChange={(value) => {
                      setLanguage(value);
                      applyLanguage(value);
                      // Show success message immediately for better UX
                      setSuccessMessage("Language changed successfully");
                      setTimeout(() => setSuccessMessage(null), 3000);
                    }}
                  >
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Select language" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="en">English</SelectItem>
                      <SelectItem value="es">Español</SelectItem>
                      <SelectItem value="fr">Français</SelectItem>
                      <SelectItem value="de">Deutsch</SelectItem>
                      <SelectItem value="pt">Português</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <Separator />

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Currency Display</Label>
                    <p className="text-sm text-muted-foreground">
                      Choose your preferred currency for display
                    </p>
                  </div>
                  <Select value={currency} onValueChange={setCurrency}>
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Select currency" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="USD">USD ($)</SelectItem>
                      <SelectItem value="EUR">EUR (€)</SelectItem>
                      <SelectItem value="GBP">GBP (£)</SelectItem>
                      <SelectItem value="JPY">JPY (¥)</SelectItem>
                      <SelectItem value="BTC">BTC (₿)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <Separator />

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Time Zone</Label>
                    <p className="text-sm text-muted-foreground">
                      Set your local time zone
                    </p>
                  </div>
                  <Select value={timezone} onValueChange={setTimezone}>
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Select time zone" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="UTC">UTC (GMT+0)</SelectItem>
                      <SelectItem value="EST">EST (GMT-5)</SelectItem>
                      <SelectItem value="CST">CST (GMT-6)</SelectItem>
                      <SelectItem value="PST">PST (GMT-8)</SelectItem>
                      <SelectItem value="CET">CET (GMT+1)</SelectItem>
                    </SelectContent>
                  </Select>
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
                    "Save Preferences"
                  )}
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>

          {/* Notifications Tab */}
          <TabsContent value="notifications" className="mt-0 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Notification Channels</CardTitle>
                <CardDescription>
                  Choose how you want to receive notifications
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Mail className="h-5 w-5 text-muted-foreground" />
                    <div className="space-y-0.5">
                      <Label>Email Notifications</Label>
                      <p className="text-sm text-muted-foreground">
                        Receive notifications via email
                      </p>
                    </div>
                  </div>
                  <Switch
                    checked={emailNotifications}
                    onCheckedChange={setEmailNotifications}
                  />
                </div>

                <Separator />

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Smartphone className="h-5 w-5 text-muted-foreground" />
                    <div className="space-y-0.5">
                      <Label>SMS Notifications</Label>
                      <p className="text-sm text-muted-foreground">
                        Receive notifications via SMS
                      </p>
                    </div>
                  </div>
                  <Switch
                    checked={smsNotifications}
                    onCheckedChange={setSmsNotifications}
                  />
                </div>

                <Separator />

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Bell className="h-5 w-5 text-muted-foreground" />
                    <div className="space-y-0.5">
                      <Label>In-App Notifications</Label>
                      <p className="text-sm text-muted-foreground">
                        Receive notifications within the platform
                      </p>
                    </div>
                  </div>
                  <Switch checked={true} disabled />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Notification Types</CardTitle>
                <CardDescription>
                  Select which types of notifications you want to receive
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Deposits</Label>
                    <p className="text-sm text-muted-foreground">
                      Notifications about deposit confirmations
                    </p>
                  </div>
                  <Switch
                    checked={depositNotifications}
                    onCheckedChange={setDepositNotifications}
                  />
                </div>

                <Separator />

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Withdrawals</Label>
                    <p className="text-sm text-muted-foreground">
                      Notifications about withdrawal requests and processing
                    </p>
                  </div>
                  <Switch
                    checked={withdrawalNotifications}
                    onCheckedChange={setWithdrawalNotifications}
                  />
                </div>

                <Separator />

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Investments</Label>
                    <p className="text-sm text-muted-foreground">
                      Notifications about investment returns and updates
                    </p>
                  </div>
                  <Switch
                    checked={investmentNotifications}
                    onCheckedChange={setInvestmentNotifications}
                  />
                </div>

                <Separator />

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Mining Operations</Label>
                    <p className="text-sm text-muted-foreground">
                      Notifications about mining earnings and status
                    </p>
                  </div>
                  <Switch
                    checked={miningNotifications}
                    onCheckedChange={setMiningNotifications}
                  />
                </div>

                <Separator />

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Security Alerts</Label>
                    <p className="text-sm text-muted-foreground">
                      Notifications about login attempts and security changes
                    </p>
                  </div>
                  <Switch
                    checked={securityNotifications}
                    onCheckedChange={setSecurityNotifications}
                  />
                </div>

                <Separator />

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Marketing & Promotions</Label>
                    <p className="text-sm text-muted-foreground">
                      Notifications about new features and promotions
                    </p>
                  </div>
                  <Switch
                    checked={marketingNotifications}
                    onCheckedChange={setMarketingNotifications}
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
                    "Save Notification Settings"
                  )}
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>

          {/* Privacy & Security Tab */}
          <TabsContent value="privacy" className="mt-0 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Privacy Settings</CardTitle>
                <CardDescription>
                  Control your privacy and data settings
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Activity Tracking</Label>
                    <p className="text-sm text-muted-foreground">
                      Allow us to collect usage data to improve your experience
                    </p>
                  </div>
                  <Switch
                    checked={activityTracking}
                    onCheckedChange={setActivityTracking}
                  />
                </div>

                <Separator />

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Show Balance</Label>
                    <p className="text-sm text-muted-foreground">
                      Show your balance on the dashboard
                    </p>
                  </div>
                  <Switch
                    checked={showBalance}
                    onCheckedChange={setShowBalance}
                  />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Security Settings</CardTitle>
                <CardDescription>Enhance your account security</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Two-Factor Authentication</Label>
                    <p className="text-sm text-muted-foreground">
                      Require 2FA for all logins
                    </p>
                  </div>
                  <Switch
                    checked={twoFactorLogin}
                    onCheckedChange={setTwoFactorLogin}
                  />
                </div>

                <Separator />

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Email Confirmation for Withdrawals</Label>
                    <p className="text-sm text-muted-foreground">
                      Require email confirmation for all withdrawal requests
                    </p>
                  </div>
                  <Switch
                    checked={emailConfirmation}
                    onCheckedChange={setEmailConfirmation}
                  />
                </div>

                <Separator />

                <div className="space-y-2">
                  <Label>Account Deletion</Label>
                  <p className="text-sm text-muted-foreground">
                    Permanently delete your account and all associated data
                  </p>
                  <Button
                    variant="destructive"
                    className="mt-2 flex items-center gap-2"
                  >
                    <Trash2 className="h-4 w-4" />
                    Delete Account
                  </Button>
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
                    "Save Security Settings"
                  )}
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>

          {/* API Access Tab */}
          <TabsContent value="api" className="mt-0 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>API Access</CardTitle>
                <CardDescription>
                  Manage API keys for programmatic access to your account
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <Alert className="bg-yellow-50 border-yellow-200">
                  <AlertCircle className="h-4 w-4 text-yellow-600" />
                  <AlertTitle>Important</AlertTitle>
                  <AlertDescription className="text-yellow-700">
                    API keys provide full access to your account. Keep them
                    secure and never share them with anyone.
                  </AlertDescription>
                </Alert>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>API Access</Label>
                    <p className="text-sm text-muted-foreground">
                      Enable or disable API access to your account
                    </p>
                  </div>
                  <Switch
                    checked={apiKeyEnabled}
                    onCheckedChange={(checked) => {
                      setApiKeyEnabled(checked);
                      localStorage.setItem("apiKeyEnabled", checked.toString());
                    }}
                  />
                </div>

                <Separator />

                <div className="space-y-2">
                  <Label>Your API Key</Label>
                  <div className="relative">
                    <Input
                      type={showApiKey ? "text" : "password"}
                      value={apiKey}
                      readOnly
                      disabled={!apiKeyEnabled}
                      className="pr-10"
                    />
                    <Button
                      variant="ghost"
                      size="icon"
                      className="absolute right-0 top-0 h-full"
                      onClick={() => setShowApiKey(!showApiKey)}
                      disabled={!apiKeyEnabled}
                    >
                      {showApiKey ? (
                        <EyeOff className="h-4 w-4" />
                      ) : (
                        <Eye className="h-4 w-4" />
                      )}
                    </Button>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    onClick={handleGenerateApiKey}
                    disabled={!apiKeyEnabled || isSubmitting}
                    className="flex items-center gap-2"
                  >
                    {isSubmitting ? (
                      <RefreshCw className="h-4 w-4 animate-spin" />
                    ) : (
                      <RefreshCw className="h-4 w-4" />
                    )}
                    Generate New Key
                  </Button>
                  <Button
                    variant="outline"
                    disabled={!apiKeyEnabled}
                    className="flex items-center gap-2"
                    onClick={handleRevokeApiKey}
                  >
                    <Lock className="h-4 w-4" />
                    Revoke Key
                  </Button>
                </div>

                <Separator />

                <div className="space-y-2">
                  <Label>API Documentation</Label>
                  <p className="text-sm text-muted-foreground">
                    Learn how to use our API to automate your account operations
                  </p>
                  <Button
                    variant="outline"
                    className="mt-2 flex items-center gap-2"
                  >
                    <Globe className="h-4 w-4" />
                    View API Documentation
                  </Button>
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
                    "Save API Settings"
                  )}
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

export default UserSettings;
