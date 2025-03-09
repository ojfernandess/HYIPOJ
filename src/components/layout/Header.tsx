import React, { useState } from "react";
import {
  Bell,
  Settings,
  LogOut,
  User,
  Search,
  Menu,
  Shield,
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Sheet, SheetContent, SheetTrigger } from "../ui/sheet";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Badge } from "../ui/badge";
import { Link } from "react-router-dom";
import { useAuth } from "../auth/AuthContext";

interface HeaderProps {
  username?: string;
  userAvatar?: string;
  unreadNotifications?: number;
}

interface Notification {
  id: string;
  title: string;
  description: string;
  time: string;
  read: boolean;
  type: "system" | "transaction" | "security";
}

const mockNotifications: Notification[] = [
  {
    id: "1",
    title: "Deposit Confirmed",
    description: "Your deposit of 0.05 BTC has been confirmed.",
    time: "5 minutes ago",
    read: false,
    type: "transaction",
  },
  {
    id: "2",
    title: "New Referral",
    description: "You have a new referral signup: james_wilson.",
    time: "2 hours ago",
    read: false,
    type: "system",
  },
  {
    id: "3",
    title: "Mining Earnings",
    description: "You earned 0.0025 BTC from mining operations today.",
    time: "5 hours ago",
    read: true,
    type: "transaction",
  },
  {
    id: "4",
    title: "Security Alert",
    description: "New login detected from a new device.",
    time: "1 day ago",
    read: true,
    type: "security",
  },
  {
    id: "5",
    title: "Investment Return",
    description: "You received $125.50 from your Gold Plan investment.",
    time: "2 days ago",
    read: true,
    type: "transaction",
  },
];

const Header = ({
  username,
  userAvatar,
  unreadNotifications = 3,
}: HeaderProps) => {
  const { user, logout } = useAuth();
  const [notifications, setNotifications] =
    useState<Notification[]>(mockNotifications);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Use user data from auth context if available, otherwise use props
  const displayName = user?.name || username || "User";
  const avatarUrl = user?.avatar || userAvatar;
  const isAdmin =
    user?.role === "admin" || user?.email?.includes("admin") || false;

  const unreadCount = notifications.filter(
    (notification) => !notification.read,
  ).length;

  const markAllAsRead = () => {
    setNotifications(
      notifications.map((notification) => ({
        ...notification,
        read: true,
      })),
    );
  };

  const markAsRead = (id: string) => {
    setNotifications(
      notifications.map((notification) =>
        notification.id === id ? { ...notification, read: true } : notification,
      ),
    );
  };

  const getNotificationIcon = (type: Notification["type"]) => {
    switch (type) {
      case "system":
        return <Bell className="h-4 w-4 text-blue-500" />;
      case "transaction":
        return <Bell className="h-4 w-4 text-green-500" />;
      case "security":
        return <Bell className="h-4 w-4 text-red-500" />;
      default:
        return <Bell className="h-4 w-4" />;
    }
  };

  const handleLogout = () => {
    logout();
  };

  return (
    <header className="bg-background border-b border-border h-auto min-h-20 w-full flex flex-wrap items-center justify-between px-4 py-3 sm:px-6">
      {/* Mobile Menu Button - Only visible on small screens */}
      <div className="lg:hidden">
        <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" className="lg:hidden">
              <Menu className="h-5 w-5" />
              <span className="sr-only">Toggle menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-[280px] sm:w-[350px]">
            <div className="py-4">
              <div className="flex items-center gap-2 px-4 mb-6">
                <div className="h-8 w-8 rounded-md bg-primary flex items-center justify-center">
                  <span className="text-primary-foreground font-bold">HP</span>
                </div>
                <h1 className="text-xl font-bold">HYIP Platform</h1>
              </div>
              <nav className="flex flex-col space-y-1 px-2">
                <Link
                  to="/dashboard"
                  className="flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Dashboard
                </Link>
                <Link
                  to="/deposit"
                  className="flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Deposit
                </Link>
                <Link
                  to="/mining"
                  className="flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Mining Power
                </Link>
                <Link
                  to="/investments"
                  className="flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Investments
                </Link>
                <Link
                  to="/affiliate"
                  className="flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Affiliate Program
                </Link>
                <Link
                  to="/earnings"
                  className="flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Earnings & Withdrawals
                </Link>
                {isAdmin && (
                  <Link
                    to="/dashboard?tab=admin"
                    className="flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium bg-primary/10 text-primary hover:bg-primary/20"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <Shield className="h-4 w-4" />
                    Admin Panel
                  </Link>
                )}
              </nav>
            </div>
          </SheetContent>
        </Sheet>
      </div>

      {/* Search Bar */}
      <div className="w-full md:w-auto md:flex-1 md:flex md:items-center md:gap-4 md:px-4 order-3 md:order-2 mt-3 md:mt-0">
        <div className="relative w-full max-w-sm">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search..."
            className="w-full bg-background pl-8 md:w-[300px] lg:w-[400px]"
          />
        </div>
      </div>

      {/* Right Side Actions */}
      <div className="flex items-center gap-2 order-2 md:order-3">
        {/* Notifications */}
        <Popover
          open={isNotificationsOpen}
          onOpenChange={setIsNotificationsOpen}
        >
          <PopoverTrigger asChild>
            <Button variant="ghost" size="icon" className="relative">
              <Bell className="h-5 w-5" />
              {unreadCount > 0 && (
                <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-[10px] font-medium text-white">
                  {unreadCount}
                </span>
              )}
              <span className="sr-only">Notifications</span>
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-[320px] sm:w-[380px] p-0" align="end">
            <div className="flex items-center justify-between border-b px-4 py-3">
              <h3 className="font-semibold">Notifications</h3>
              <Button variant="ghost" size="sm" onClick={markAllAsRead}>
                Mark all as read
              </Button>
            </div>
            <div className="max-h-[300px] overflow-y-auto">
              {notifications.length === 0 ? (
                <div className="flex h-[100px] items-center justify-center">
                  <p className="text-sm text-muted-foreground">
                    No notifications
                  </p>
                </div>
              ) : (
                <div>
                  {notifications.map((notification) => (
                    <div
                      key={notification.id}
                      className={`flex items-start gap-3 border-b px-4 py-3 ${!notification.read ? "bg-muted/50" : ""}`}
                      onClick={() => markAsRead(notification.id)}
                    >
                      <div className="mt-1">
                        {getNotificationIcon(notification.type)}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-start justify-between gap-2">
                          <h4 className="text-sm font-medium">
                            {notification.title}
                          </h4>
                          <p className="text-xs text-muted-foreground">
                            {notification.time}
                          </p>
                        </div>
                        <p className="text-xs text-muted-foreground">
                          {notification.description}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
            <div className="border-t p-2">
              <Button
                variant="ghost"
                size="sm"
                className="w-full justify-center"
              >
                View all notifications
              </Button>
            </div>
          </PopoverContent>
        </Popover>

        {/* User Profile Dropdown */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="flex items-center space-x-2 p-1">
              <Avatar className="h-8 w-8">
                <AvatarImage src={avatarUrl} alt={displayName} />
                <AvatarFallback className="bg-primary text-primary-foreground">
                  {displayName
                    .split(" ")
                    .map((name) => name[0])
                    .join("")}
                </AvatarFallback>
              </Avatar>
              <span className="font-medium hidden sm:inline">
                {displayName}
              </span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <User className="mr-2 h-4 w-4" />
              <Link to="/profile">Profile</Link>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Settings className="mr-2 h-4 w-4" />
              <Link to="/settings">Settings</Link>
            </DropdownMenuItem>
            {isAdmin && (
              <DropdownMenuItem>
                <Shield className="mr-2 h-4 w-4" />
                <Link to="/dashboard?tab=admin">Admin Panel</Link>
              </DropdownMenuItem>
            )}
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={handleLogout}>
              <LogOut className="mr-2 h-4 w-4" />
              <span>Log out</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
};

export default Header;
