import React from "react";
import { Link } from "react-router-dom";

interface AuthLayoutProps {
  children: React.ReactNode;
  title: string;
  description: string;
  footer?: React.ReactNode;
}

const AuthLayout = ({
  children,
  title,
  description,
  footer,
}: AuthLayoutProps) => {
  return (
    <div className="min-h-screen flex flex-col">
      <div className="flex flex-col sm:flex-row flex-1">
        {/* Left side - Branding and Info */}
        <div className="hidden sm:flex flex-col w-full sm:w-1/2 bg-primary text-primary-foreground p-10 justify-between">
          <div>
            <Link to="/" className="flex items-center gap-2">
              <div className="h-10 w-10 rounded-md bg-white flex items-center justify-center">
                <span className="text-primary font-bold text-xl">HP</span>
              </div>
              <span className="text-2xl font-bold">HYIP Platform</span>
            </Link>
          </div>
          <div className="space-y-6">
            <h1 className="text-4xl font-bold">
              High-Yield Investment Platform with Mining Integration
            </h1>
            <p className="text-xl">
              Invest in our platform to earn high returns through cryptocurrency
              mining and investment plans.
            </p>
            <div className="flex flex-col space-y-2">
              <div className="flex items-center gap-2">
                <div className="h-4 w-4 rounded-full bg-white"></div>
                <span>Multiple investment plans with daily returns</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="h-4 w-4 rounded-full bg-white"></div>
                <span>Cryptocurrency mining power marketplace</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="h-4 w-4 rounded-full bg-white"></div>
                <span>Multi-tier affiliate program</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="h-4 w-4 rounded-full bg-white"></div>
                <span>Secure and transparent platform</span>
              </div>
            </div>
          </div>
          <div className="text-sm">
            © {new Date().getFullYear()} HYIP Platform. All rights reserved.
          </div>
        </div>

        {/* Right side - Auth Form */}
        <div className="w-full sm:w-1/2 p-6 sm:p-10 flex flex-col justify-center items-center">
          <div className="w-full max-w-md space-y-6">
            <div className="text-center sm:text-left space-y-2">
              <h2 className="text-3xl font-bold">{title}</h2>
              <p className="text-muted-foreground">{description}</p>
            </div>

            {children}

            {footer && <div className="mt-6">{footer}</div>}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
