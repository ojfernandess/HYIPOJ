import React from "react";
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import {
  Home,
  Wallet,
  HardHat,
  LineChart,
  Users,
  BarChart3,
  Settings,
  LogOut,
  HelpCircle,
  ShieldAlert,
  FileQuestion,
  BookOpen,
  LifeBuoy,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useAuth } from "../auth/AuthContext";

interface SidebarProps {
  className?: string;
}

interface NavItemProps {
  icon: React.ReactNode;
  label: string;
  href: string;
  active?: boolean;
}

const NavItem = ({ icon, label, href, active = false }: NavItemProps) => {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Link to={href} className="w-full">
            <Button
              variant={active ? "secondary" : "ghost"}
              className={cn(
                "w-full justify-start gap-3 mb-1",
                active ? "bg-secondary" : "hover:bg-secondary/50",
              )}
            >
              {icon}
              <span>{label}</span>
            </Button>
          </Link>
        </TooltipTrigger>
        <TooltipContent side="right">{label}</TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

const Sidebar = ({ className = "" }: SidebarProps) => {
  // Get the current path to determine active route
  const location = useLocation();
  const activePath = location.pathname;
  const { user, logout } = useAuth();

  // Check if user is admin (in a real app, this would be based on user roles)
  const isAdmin =
    user?.role === "admin" || user?.email?.includes("admin") || false;

  return (
    <div
      className={cn(
        "w-[280px] h-full bg-background border-r flex flex-col",
        className,
      )}
    >
      {/* Logo and Brand */}
      <div className="p-6">
        <div className="flex items-center gap-2">
          <div className="h-8 w-8 rounded-md bg-primary flex items-center justify-center">
            <span className="text-primary-foreground font-bold">HP</span>
          </div>
          <h1 className="text-xl font-bold">HYIP Platform</h1>
        </div>
      </div>

      {/* Navigation */}
      <div className="flex-1 px-4 py-2">
        <div className="mb-6">
          <p className="text-xs text-muted-foreground mb-2 px-4">MAIN</p>
          <nav className="space-y-1">
            <NavItem
              icon={<Home size={18} />}
              label="Dashboard"
              href="/"
              active={activePath === "/" || activePath === "/dashboard"}
            />
            <NavItem
              icon={<Wallet size={18} />}
              label="Deposit"
              href="/deposit"
              active={activePath === "/deposit"}
            />
            <NavItem
              icon={<HardHat size={18} />}
              label="Mining Power"
              href="/mining"
              active={activePath === "/mining"}
            />
            <NavItem
              icon={<LineChart size={18} />}
              label="Investments"
              href="/investments"
              active={activePath === "/investments"}
            />
            <NavItem
              icon={<Users size={18} />}
              label="Affiliate Program"
              href="/affiliate"
              active={activePath === "/affiliate"}
            />
            <NavItem
              icon={<BarChart3 size={18} />}
              label="Earnings & Withdrawals"
              href="/earnings"
              active={activePath === "/earnings"}
            />
          </nav>
        </div>

        <div className="mb-6">
          <p className="text-xs text-muted-foreground mb-2 px-4">ACCOUNT</p>
          <nav className="space-y-1">
            <NavItem
              icon={<Settings size={18} />}
              label="Settings"
              href="/settings"
              active={activePath === "/settings"}
            />
            <NavItem
              icon={<HelpCircle size={18} />}
              label="Help & Support"
              href="/support"
              active={activePath === "/support"}
            />
          </nav>
        </div>

        {/* Only show admin section if user is admin */}
        {isAdmin && (
          <div className="mb-6">
            <p className="text-xs text-muted-foreground mb-2 px-4">ADMIN</p>
            <nav className="space-y-1">
              <NavItem
                icon={<ShieldAlert size={18} />}
                label="Admin Panel"
                href="/dashboard?tab=admin"
                active={
                  activePath === "/dashboard" &&
                  location.search.includes("tab=admin")
                }
              />
            </nav>
          </div>
        )}
      </div>

      {/* User Profile & Logout */}
      <div className="p-4 border-t">
        <div className="flex items-center gap-3 mb-4">
          <div className="h-10 w-10 rounded-full bg-muted flex items-center justify-center overflow-hidden">
            <img
              src={
                user?.avatar ||
                "https://api.dicebear.com/7.x/avataaars/svg?seed=investment"
              }
              alt="User Avatar"
              className="h-full w-full object-cover"
            />
          </div>
          <div>
            <p className="font-medium">{user?.name || "User"}</p>
            <p className="text-xs text-muted-foreground">
              {user?.email || "user@example.com"}
            </p>
          </div>
        </div>
        <Button
          variant="outline"
          className="w-full justify-start gap-2"
          onClick={logout}
        >
          <LogOut size={18} />
          <span>Logout</span>
        </Button>
      </div>
    </div>
  );
};

export default Sidebar;
