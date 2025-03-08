import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Coins,
  TrendingUp,
  Shield,
  Users,
  BarChart3,
  Cpu,
  Globe,
  ChevronRight,
} from "lucide-react";

const LandingPage = () => {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Header */}
      <header className="border-b bg-background">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="h-10 w-10 rounded-md bg-primary flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-xl">
                HP
              </span>
            </div>
            <span className="text-2xl font-bold">HYIP Platform</span>
          </div>
          <nav className="hidden md:flex items-center gap-6">
            <Link
              to="#features"
              className="text-sm font-medium hover:text-primary"
            >
              Features
            </Link>
            <Link
              to="#plans"
              className="text-sm font-medium hover:text-primary"
            >
              Investment Plans
            </Link>
            <Link
              to="#mining"
              className="text-sm font-medium hover:text-primary"
            >
              Mining
            </Link>
            <Link
              to="#affiliate"
              className="text-sm font-medium hover:text-primary"
            >
              Affiliate Program
            </Link>
          </nav>
          <div className="flex items-center gap-4">
            <Button variant="outline" asChild>
              <Link to="/login">Sign In</Link>
            </Button>
            <Button asChild>
              <Link to="/register">Sign Up</Link>
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-primary text-primary-foreground py-20">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center gap-12">
            <div className="md:w-1/2 space-y-6">
              <h1 className="text-4xl md:text-5xl font-bold leading-tight">
                High-Yield Investment Platform with Mining Integration
              </h1>
              <p className="text-xl">
                Invest in our platform to earn high returns through
                cryptocurrency mining and investment plans.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button size="lg" variant="secondary" asChild>
                  <Link to="/register">Get Started</Link>
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="bg-transparent"
                  asChild
                >
                  <Link to="#plans">View Plans</Link>
                </Button>
              </div>
            </div>
            <div className="md:w-1/2">
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-8 shadow-xl">
                <div className="space-y-6">
                  <div className="flex items-center gap-4">
                    <div className="h-12 w-12 rounded-full bg-white/20 flex items-center justify-center">
                      <TrendingUp className="h-6 w-6" />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold">High Returns</h3>
                      <p>Up to 2.2% daily ROI on your investments</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="h-12 w-12 rounded-full bg-white/20 flex items-center justify-center">
                      <Cpu className="h-6 w-6" />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold">Mining Power</h3>
                      <p>Purchase mining power and earn daily</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="h-12 w-12 rounded-full bg-white/20 flex items-center justify-center">
                      <Users className="h-6 w-6" />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold">
                        Affiliate Program
                      </h3>
                      <p>Earn up to 5% commission on referrals</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Platform Features</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Our platform offers a comprehensive suite of investment and mining
              features
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-card rounded-lg p-6 shadow-sm border">
              <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                <Coins className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">
                Multiple Payment Methods
              </h3>
              <p className="text-muted-foreground">
                Deposit and withdraw using various cryptocurrencies including
                BTC, ETH, USDT, and TRX.
              </p>
            </div>

            <div className="bg-card rounded-lg p-6 shadow-sm border">
              <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                <Cpu className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">
                Mining Power Marketplace
              </h3>
              <p className="text-muted-foreground">
                Purchase mining power (GH/s) and earn daily profits from
                cryptocurrency mining operations.
              </p>
            </div>

            <div className="bg-card rounded-lg p-6 shadow-sm border">
              <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                <BarChart3 className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Investment Plans</h3>
              <p className="text-muted-foreground">
                Choose from various investment plans with fixed or compound
                returns and flexible terms.
              </p>
            </div>

            <div className="bg-card rounded-lg p-6 shadow-sm border">
              <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                <Users className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">
                Multi-tier Affiliate System
              </h3>
              <p className="text-muted-foreground">
                Earn commissions across multiple levels with our comprehensive
                affiliate program.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Investment Plans Section */}
      <section id="plans" className="py-20 bg-muted">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Investment Plans</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Choose an investment plan that suits your financial goals
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-card rounded-lg overflow-hidden shadow-sm border">
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2">Starter Plan</h3>
                <p className="text-muted-foreground mb-4">
                  Perfect for beginners with low risk tolerance
                </p>
                <div className="text-3xl font-bold mb-4">
                  1.2% <span className="text-sm font-normal">daily</span>
                </div>
                <ul className="space-y-2 mb-6">
                  <li className="flex justify-between">
                    <span className="text-muted-foreground">
                      Min Investment:
                    </span>
                    <span className="font-medium">$100</span>
                  </li>
                  <li className="flex justify-between">
                    <span className="text-muted-foreground">
                      Max Investment:
                    </span>
                    <span className="font-medium">$1,000</span>
                  </li>
                  <li className="flex justify-between">
                    <span className="text-muted-foreground">Term Length:</span>
                    <span className="font-medium">30 days</span>
                  </li>
                  <li className="flex justify-between">
                    <span className="text-muted-foreground">Total Return:</span>
                    <span className="font-medium">36%</span>
                  </li>
                </ul>
              </div>
              <div className="px-6 pb-6">
                <Button className="w-full" asChild>
                  <Link to="/register">Get Started</Link>
                </Button>
              </div>
            </div>

            <div className="bg-card rounded-lg overflow-hidden shadow-sm border">
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2">Silver Plan</h3>
                <p className="text-muted-foreground mb-4">
                  Balanced investment with moderate returns
                </p>
                <div className="text-3xl font-bold mb-4">
                  1.5% <span className="text-sm font-normal">daily</span>
                </div>
                <ul className="space-y-2 mb-6">
                  <li className="flex justify-between">
                    <span className="text-muted-foreground">
                      Min Investment:
                    </span>
                    <span className="font-medium">$500</span>
                  </li>
                  <li className="flex justify-between">
                    <span className="text-muted-foreground">
                      Max Investment:
                    </span>
                    <span className="font-medium">$5,000</span>
                  </li>
                  <li className="flex justify-between">
                    <span className="text-muted-foreground">Term Length:</span>
                    <span className="font-medium">60 days</span>
                  </li>
                  <li className="flex justify-between">
                    <span className="text-muted-foreground">Total Return:</span>
                    <span className="font-medium">90%</span>
                  </li>
                </ul>
              </div>
              <div className="px-6 pb-6">
                <Button className="w-full" asChild>
                  <Link to="/register">Get Started</Link>
                </Button>
              </div>
            </div>

            <div className="bg-card rounded-lg overflow-hidden shadow-sm border border-primary relative">
              <div className="bg-primary text-primary-foreground text-center py-1 text-sm font-medium">
                Most Popular
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2">Gold Plan</h3>
                <p className="text-muted-foreground mb-4">
                  Higher returns with compounding interest
                </p>
                <div className="text-3xl font-bold mb-4">
                  1.8% <span className="text-sm font-normal">daily</span>
                </div>
                <ul className="space-y-2 mb-6">
                  <li className="flex justify-between">
                    <span className="text-muted-foreground">
                      Min Investment:
                    </span>
                    <span className="font-medium">$1,000</span>
                  </li>
                  <li className="flex justify-between">
                    <span className="text-muted-foreground">
                      Max Investment:
                    </span>
                    <span className="font-medium">$10,000</span>
                  </li>
                  <li className="flex justify-between">
                    <span className="text-muted-foreground">Term Length:</span>
                    <span className="font-medium">90 days</span>
                  </li>
                  <li className="flex justify-between">
                    <span className="text-muted-foreground">Total Return:</span>
                    <span className="font-medium">162%</span>
                  </li>
                </ul>
              </div>
              <div className="px-6 pb-6">
                <Button className="w-full" asChild>
                  <Link to="/register">Get Started</Link>
                </Button>
              </div>
            </div>

            <div className="bg-card rounded-lg overflow-hidden shadow-sm border">
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2">Platinum Plan</h3>
                <p className="text-muted-foreground mb-4">
                  Maximum returns for serious investors
                </p>
                <div className="text-3xl font-bold mb-4">
                  2.2% <span className="text-sm font-normal">daily</span>
                </div>
                <ul className="space-y-2 mb-6">
                  <li className="flex justify-between">
                    <span className="text-muted-foreground">
                      Min Investment:
                    </span>
                    <span className="font-medium">$5,000</span>
                  </li>
                  <li className="flex justify-between">
                    <span className="text-muted-foreground">
                      Max Investment:
                    </span>
                    <span className="font-medium">$50,000</span>
                  </li>
                  <li className="flex justify-between">
                    <span className="text-muted-foreground">Term Length:</span>
                    <span className="font-medium">180 days</span>
                  </li>
                  <li className="flex justify-between">
                    <span className="text-muted-foreground">Total Return:</span>
                    <span className="font-medium">396%</span>
                  </li>
                </ul>
              </div>
              <div className="px-6 pb-6">
                <Button className="w-full" asChild>
                  <Link to="/register">Get Started</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mining Section */}
      <section id="mining" className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center gap-12">
            <div className="md:w-1/2">
              <div className="bg-primary/5 rounded-lg p-8">
                <img
                  src="https://images.unsplash.com/photo-1516245834210-c4c142787335?w=800&q=80"
                  alt="Mining Operation"
                  className="rounded-lg shadow-lg"
                />
              </div>
            </div>
            <div className="md:w-1/2 space-y-6">
              <h2 className="text-3xl font-bold">Mining Power Marketplace</h2>
              <p className="text-xl text-muted-foreground">
                Purchase mining power and earn daily profits from our
                cryptocurrency mining operations.
              </p>
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <div className="h-6 w-6 rounded-full bg-primary/10 flex items-center justify-center mt-1">
                    <ChevronRight className="h-4 w-4 text-primary" />
                  </div>
                  <p>
                    Purchase mining power (GH/s) with flexible contract
                    durations
                  </p>
                </li>
                <li className="flex items-start gap-3">
                  <div className="h-6 w-6 rounded-full bg-primary/10 flex items-center justify-center mt-1">
                    <ChevronRight className="h-4 w-4 text-primary" />
                  </div>
                  <p>
                    Select which cryptocurrency you want to mine (BTC, ETH, LTC,
                    XRP)
                  </p>
                </li>
                <li className="flex items-start gap-3">
                  <div className="h-6 w-6 rounded-full bg-primary/10 flex items-center justify-center mt-1">
                    <ChevronRight className="h-4 w-4 text-primary" />
                  </div>
                  <p>
                    Receive daily earnings based on your mining power and
                    cryptocurrency profitability
                  </p>
                </li>
                <li className="flex items-start gap-3">
                  <div className="h-6 w-6 rounded-full bg-primary/10 flex items-center justify-center mt-1">
                    <ChevronRight className="h-4 w-4 text-primary" />
                  </div>
                  <p>
                    Real-time monitoring of your mining operations and earnings
                  </p>
                </li>
              </ul>
              <Button size="lg" asChild>
                <Link to="/register">Start Mining Now</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Affiliate Section */}
      <section id="affiliate" className="py-20 bg-muted">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">
              Multi-tier Affiliate Program
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Earn commissions by referring others to our platform
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-card rounded-lg p-6 shadow-sm border text-center">
              <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-primary">5%</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Level 1</h3>
              <p className="text-muted-foreground">
                Earn 5% commission on all deposits and investments made by your
                direct referrals.
              </p>
            </div>

            <div className="bg-card rounded-lg p-6 shadow-sm border text-center">
              <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-primary">3%</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Level 2</h3>
              <p className="text-muted-foreground">
                Earn 3% commission on all deposits and investments made by your
                level 2 referrals.
              </p>
            </div>

            <div className="bg-card rounded-lg p-6 shadow-sm border text-center">
              <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-primary">1%</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Level 3</h3>
              <p className="text-muted-foreground">
                Earn 1% commission on all deposits and investments made by your
                level 3 referrals.
              </p>
            </div>
          </div>

          <div className="mt-12 text-center">
            <Button size="lg" asChild>
              <Link to="/register">Join Affiliate Program</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to Start Investing?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Join thousands of investors already earning high returns on our
            platform.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" variant="secondary" asChild>
              <Link to="/register">Create Account</Link>
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="bg-transparent"
              asChild
            >
              <Link to="/login">Sign In</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-background border-t py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="h-8 w-8 rounded-md bg-primary flex items-center justify-center">
                  <span className="text-primary-foreground font-bold">HP</span>
                </div>
                <span className="text-xl font-bold">HYIP Platform</span>
              </div>
              <p className="text-muted-foreground">
                High-yield investment platform with integrated cryptocurrency
                mining features.
              </p>
            </div>

            <div>
              <h3 className="font-semibold mb-4">Quick Links</h3>
              <ul className="space-y-2">
                <li>
                  <Link
                    to="#features"
                    className="text-muted-foreground hover:text-primary"
                  >
                    Features
                  </Link>
                </li>
                <li>
                  <Link
                    to="#plans"
                    className="text-muted-foreground hover:text-primary"
                  >
                    Investment Plans
                  </Link>
                </li>
                <li>
                  <Link
                    to="#mining"
                    className="text-muted-foreground hover:text-primary"
                  >
                    Mining
                  </Link>
                </li>
                <li>
                  <Link
                    to="#affiliate"
                    className="text-muted-foreground hover:text-primary"
                  >
                    Affiliate Program
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold mb-4">Legal</h3>
              <ul className="space-y-2">
                <li>
                  <Link
                    to="/terms"
                    className="text-muted-foreground hover:text-primary"
                  >
                    Terms of Service
                  </Link>
                </li>
                <li>
                  <Link
                    to="/privacy"
                    className="text-muted-foreground hover:text-primary"
                  >
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link
                    to="/risk"
                    className="text-muted-foreground hover:text-primary"
                  >
                    Risk Disclosure
                  </Link>
                </li>
                <li>
                  <Link
                    to="/aml"
                    className="text-muted-foreground hover:text-primary"
                  >
                    AML Policy
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold mb-4">Contact</h3>
              <ul className="space-y-2">
                <li className="text-muted-foreground">
                  Email: support@hyipplatform.com
                </li>
                <li className="text-muted-foreground">
                  Telegram: @hyipplatform
                </li>
                <li className="text-muted-foreground">
                  Discord: HYIP Platform
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t mt-12 pt-6 flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm text-muted-foreground">
              © {new Date().getFullYear()} HYIP Platform. All rights reserved.
            </p>
            <div className="flex items-center gap-4 mt-4 md:mt-0">
              <Link to="#" className="text-muted-foreground hover:text-primary">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-5 w-5"
                >
                  <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path>
                </svg>
              </Link>
              <Link to="#" className="text-muted-foreground hover:text-primary">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-5 w-5"
                >
                  <rect width="20" height="20" x="2" y="2" rx="5" ry="5"></rect>
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                  <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"></line>
                </svg>
              </Link>
              <Link to="#" className="text-muted-foreground hover:text-primary">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-5 w-5"
                >
                  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
                </svg>
              </Link>
              <Link to="#" className="text-muted-foreground hover:text-primary">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-5 w-5"
                >
                  <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                  <rect width="4" height="12" x="2" y="9"></rect>
                  <circle cx="4" cy="4" r="2"></circle>
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
