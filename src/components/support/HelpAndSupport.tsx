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
import { Textarea } from "@/components/ui/textarea";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Separator } from "@/components/ui/separator";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  FileQuestion,
  MessageSquare,
  Mail,
  Phone,
  HelpCircle,
  Check,
  RefreshCw,
  Search,
  BookOpen,
  ArrowRight,
} from "lucide-react";
import DashboardLayout from "../layout/DashboardLayout";

interface FAQItem {
  question: string;
  answer: string;
  category: string;
}

const faqs: FAQItem[] = [
  {
    question: "How do I make a deposit?",
    answer:
      "To make a deposit, navigate to the Deposit page from the main menu. Select your preferred payment method (cryptocurrency or fiat), enter the amount you wish to deposit, and follow the instructions provided.",
    category: "deposits",
  },
  {
    question: "What is the minimum deposit amount?",
    answer:
      "The minimum deposit amount varies depending on the cryptocurrency or payment method you choose. For Bitcoin, the minimum deposit is 0.001 BTC, for Ethereum it's 0.01 ETH, for USDT it's 10 USDT, and for TRX it's 50 TRX.",
    category: "deposits",
  },
  {
    question: "How long does it take for my deposit to be credited?",
    answer:
      "Cryptocurrency deposits typically require 1-3 blockchain confirmations before being credited to your account. This usually takes 10-60 minutes depending on network congestion. Fiat deposits may take 1-3 business days to process.",
    category: "deposits",
  },
  {
    question: "How do I withdraw my earnings?",
    answer:
      "To withdraw your earnings, go to the Earnings & Withdrawals page, click on the 'Withdraw' button, enter the amount you wish to withdraw and your wallet address, then confirm the withdrawal request.",
    category: "withdrawals",
  },
  {
    question: "What is the minimum withdrawal amount?",
    answer:
      "The minimum withdrawal amount is $10 equivalent in the cryptocurrency of your choice.",
    category: "withdrawals",
  },
  {
    question: "How long do withdrawals take to process?",
    answer:
      "Withdrawals are typically processed within 24-48 hours. Once processed, the transaction will be sent to the blockchain network and may take additional time to confirm depending on network congestion.",
    category: "withdrawals",
  },
  {
    question: "What investment plans do you offer?",
    answer:
      "We offer various investment plans with different terms and returns. Our plans range from 30 to 180 days with daily returns between 1.2% and 2.2%. You can view all available plans on the Investments page.",
    category: "investments",
  },
  {
    question: "Can I withdraw my investment before the term ends?",
    answer:
      "This depends on the specific investment plan. Some plans allow early withdrawals with a penalty fee, while others require you to wait until the end of the term. Check the details of your specific plan for more information.",
    category: "investments",
  },
  {
    question: "How does mining power work?",
    answer:
      "When you purchase mining power, you're essentially renting a portion of our mining hardware. The mining power (measured in GH/s) determines how much cryptocurrency you can mine. Your earnings will depend on the amount of mining power you purchase, the cryptocurrency you choose to mine, and current network difficulty.",
    category: "mining",
  },
  {
    question: "How are mining earnings calculated?",
    answer:
      "Mining earnings are calculated based on your mining power, the current cryptocurrency difficulty, and the market price of the cryptocurrency. We use a transparent formula that takes these factors into account to determine your daily earnings.",
    category: "mining",
  },
  {
    question: "How does the affiliate program work?",
    answer:
      "Our affiliate program allows you to earn commissions by referring new users to the platform. You'll receive a percentage of the deposits made by your referrals. We offer a 3-tier commission structure: 5% for direct referrals (Level 1), 3% for their referrals (Level 2), and 1% for third-level referrals (Level 3).",
    category: "affiliate",
  },
  {
    question: "How do I get my referral link?",
    answer:
      "Your unique referral link can be found on the Affiliate Program page. Simply copy this link and share it with potential referrals through social media, email, or any other channel.",
    category: "affiliate",
  },
  {
    question: "Is KYC verification required?",
    answer:
      "Yes, KYC (Know Your Customer) verification is required for all users to comply with international regulations. You'll need to submit identification documents and proof of address to complete the verification process.",
    category: "account",
  },
  {
    question: "How do I enable two-factor authentication?",
    answer:
      "To enable two-factor authentication, go to the Settings page, navigate to the Security tab, and follow the instructions to set up 2FA using an authenticator app like Google Authenticator or Authy.",
    category: "account",
  },
];

const HelpAndSupport = () => {
  const [activeTab, setActiveTab] = useState("faq");
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredFaqs, setFilteredFaqs] = useState<FAQItem[]>(faqs);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [contactName, setContactName] = useState("");
  const [contactEmail, setContactEmail] = useState("");
  const [contactSubject, setContactSubject] = useState("");
  const [contactMessage, setContactMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  // Handle search and filtering
  const handleSearch = (query: string) => {
    setSearchQuery(query);
    filterFaqs(query, selectedCategory);
  };

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
    filterFaqs(searchQuery, category);
  };

  const filterFaqs = (query: string, category: string) => {
    let filtered = faqs;

    // Filter by category if not 'all'
    if (category !== "all") {
      filtered = filtered.filter((faq) => faq.category === category);
    }

    // Filter by search query if not empty
    if (query.trim() !== "") {
      const lowerQuery = query.toLowerCase();
      filtered = filtered.filter(
        (faq) =>
          faq.question.toLowerCase().includes(lowerQuery) ||
          faq.answer.toLowerCase().includes(lowerQuery),
      );
    }

    setFilteredFaqs(filtered);
  };

  // Handle contact form submission
  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setSuccessMessage(
        "Your message has been sent successfully. Our support team will get back to you shortly.",
      );

      // Reset form
      setContactName("");
      setContactEmail("");
      setContactSubject("");
      setContactMessage("");

      setTimeout(() => setSuccessMessage(null), 5000);
    }, 1500);
  };

  return (
    <DashboardLayout>
      <div className="p-6 space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Help & Support</h1>
          <p className="text-muted-foreground mt-2">
            Find answers to common questions or contact our support team
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
          <TabsList className="grid w-full grid-cols-3 mb-8">
            <TabsTrigger value="faq" className="flex items-center gap-2">
              <FileQuestion className="h-4 w-4" />
              <span>FAQ</span>
            </TabsTrigger>
            <TabsTrigger value="contact" className="flex items-center gap-2">
              <MessageSquare className="h-4 w-4" />
              <span>Contact Support</span>
            </TabsTrigger>
            <TabsTrigger
              value="documentation"
              className="flex items-center gap-2"
            >
              <BookOpen className="h-4 w-4" />
              <span>Documentation</span>
            </TabsTrigger>
          </TabsList>

          {/* FAQ Tab */}
          <TabsContent value="faq" className="mt-0 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Frequently Asked Questions</CardTitle>
                <CardDescription>
                  Find answers to the most common questions about our platform
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex flex-col md:flex-row gap-4">
                  <div className="relative flex-1">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                      type="search"
                      placeholder="Search for answers..."
                      className="pl-8"
                      value={searchQuery}
                      onChange={(e) => handleSearch(e.target.value)}
                    />
                  </div>
                  <div className="flex gap-2">
                    <Button
                      variant={
                        selectedCategory === "all" ? "default" : "outline"
                      }
                      size="sm"
                      onClick={() => handleCategoryChange("all")}
                    >
                      All
                    </Button>
                    <Button
                      variant={
                        selectedCategory === "deposits" ? "default" : "outline"
                      }
                      size="sm"
                      onClick={() => handleCategoryChange("deposits")}
                    >
                      Deposits
                    </Button>
                    <Button
                      variant={
                        selectedCategory === "withdrawals"
                          ? "default"
                          : "outline"
                      }
                      size="sm"
                      onClick={() => handleCategoryChange("withdrawals")}
                    >
                      Withdrawals
                    </Button>
                    <Button
                      variant={
                        selectedCategory === "investments"
                          ? "default"
                          : "outline"
                      }
                      size="sm"
                      onClick={() => handleCategoryChange("investments")}
                    >
                      Investments
                    </Button>
                  </div>
                </div>

                <Accordion type="single" collapsible className="w-full">
                  {filteredFaqs.length === 0 ? (
                    <div className="text-center py-8">
                      <HelpCircle className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                      <h3 className="text-lg font-medium">No results found</h3>
                      <p className="text-muted-foreground">
                        Try adjusting your search or filter to find what you're
                        looking for
                      </p>
                    </div>
                  ) : (
                    filteredFaqs.map((faq, index) => (
                      <AccordionItem key={index} value={`item-${index}`}>
                        <AccordionTrigger className="text-left">
                          {faq.question}
                        </AccordionTrigger>
                        <AccordionContent className="text-muted-foreground">
                          {faq.answer}
                        </AccordionContent>
                      </AccordionItem>
                    ))
                  )}
                </Accordion>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Contact Support Tab */}
          <TabsContent value="contact" className="mt-0">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="md:col-span-2">
                <Card>
                  <CardHeader>
                    <CardTitle>Contact Support</CardTitle>
                    <CardDescription>
                      Fill out the form below to get in touch with our support
                      team
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <form onSubmit={handleContactSubmit} className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="name">Your Name</Label>
                          <Input
                            id="name"
                            placeholder="John Doe"
                            value={contactName}
                            onChange={(e) => setContactName(e.target.value)}
                            required
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="email">Email Address</Label>
                          <Input
                            id="email"
                            type="email"
                            placeholder="john@example.com"
                            value={contactEmail}
                            onChange={(e) => setContactEmail(e.target.value)}
                            required
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="subject">Subject</Label>
                        <Input
                          id="subject"
                          placeholder="How can we help you?"
                          value={contactSubject}
                          onChange={(e) => setContactSubject(e.target.value)}
                          required
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="message">Message</Label>
                        <Textarea
                          id="message"
                          placeholder="Please describe your issue in detail..."
                          rows={6}
                          value={contactMessage}
                          onChange={(e) => setContactMessage(e.target.value)}
                          required
                        />
                      </div>

                      <Button
                        type="submit"
                        className="w-full"
                        disabled={isSubmitting}
                      >
                        {isSubmitting ? (
                          <>
                            <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                            Sending...
                          </>
                        ) : (
                          "Send Message"
                        )}
                      </Button>
                    </form>
                  </CardContent>
                </Card>
              </div>

              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Contact Information</CardTitle>
                    <CardDescription>
                      Alternative ways to reach our support team
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-start gap-3">
                      <Mail className="h-5 w-5 text-muted-foreground mt-0.5" />
                      <div>
                        <h3 className="font-medium">Email Support</h3>
                        <p className="text-sm text-muted-foreground">
                          support@hyipplatform.com
                        </p>
                        <p className="text-sm text-muted-foreground">
                          Response time: 24-48 hours
                        </p>
                      </div>
                    </div>

                    <Separator />

                    <div className="flex items-start gap-3">
                      <MessageSquare className="h-5 w-5 text-muted-foreground mt-0.5" />
                      <div>
                        <h3 className="font-medium">Live Chat</h3>
                        <p className="text-sm text-muted-foreground">
                          Available Monday to Friday
                        </p>
                        <p className="text-sm text-muted-foreground">
                          9:00 AM - 5:00 PM UTC
                        </p>
                        <Button variant="outline" size="sm" className="mt-2">
                          Start Chat
                        </Button>
                      </div>
                    </div>

                    <Separator />

                    <div className="flex items-start gap-3">
                      <Phone className="h-5 w-5 text-muted-foreground mt-0.5" />
                      <div>
                        <h3 className="font-medium">Phone Support</h3>
                        <p className="text-sm text-muted-foreground">
                          +1 (555) 123-4567
                        </p>
                        <p className="text-sm text-muted-foreground">
                          Available for premium users only
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Support Hours</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">
                          Monday - Friday:
                        </span>
                        <span>9:00 AM - 5:00 PM UTC</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Saturday:</span>
                        <span>10:00 AM - 2:00 PM UTC</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Sunday:</span>
                        <span>Closed</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          {/* Documentation Tab */}
          <TabsContent value="documentation" className="mt-0 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Platform Documentation</CardTitle>
                <CardDescription>
                  Comprehensive guides and tutorials for using our platform
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  <Card className="bg-muted/40">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg">Getting Started</CardTitle>
                    </CardHeader>
                    <CardContent className="text-sm">
                      <p>
                        Learn the basics of our platform and how to set up your
                        account
                      </p>
                    </CardContent>
                    <CardFooter>
                      <Button
                        variant="outline"
                        className="w-full flex items-center justify-between"
                      >
                        <span>Read Guide</span>
                        <ArrowRight className="h-4 w-4" />
                      </Button>
                    </CardFooter>
                  </Card>

                  <Card className="bg-muted/40">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg">
                        Investment Strategies
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="text-sm">
                      <p>
                        Discover different investment strategies to maximize
                        your returns
                      </p>
                    </CardContent>
                    <CardFooter>
                      <Button
                        variant="outline"
                        className="w-full flex items-center justify-between"
                      >
                        <span>Read Guide</span>
                        <ArrowRight className="h-4 w-4" />
                      </Button>
                    </CardFooter>
                  </Card>

                  <Card className="bg-muted/40">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg">Mining Guide</CardTitle>
                    </CardHeader>
                    <CardContent className="text-sm">
                      <p>
                        Understand how cryptocurrency mining works on our
                        platform
                      </p>
                    </CardContent>
                    <CardFooter>
                      <Button
                        variant="outline"
                        className="w-full flex items-center justify-between"
                      >
                        <span>Read Guide</span>
                        <ArrowRight className="h-4 w-4" />
                      </Button>
                    </CardFooter>
                  </Card>

                  <Card className="bg-muted/40">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg">
                        Affiliate Marketing
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="text-sm">
                      <p>
                        Learn how to effectively promote our platform and earn
                        commissions
                      </p>
                    </CardContent>
                    <CardFooter>
                      <Button
                        variant="outline"
                        className="w-full flex items-center justify-between"
                      >
                        <span>Read Guide</span>
                        <ArrowRight className="h-4 w-4" />
                      </Button>
                    </CardFooter>
                  </Card>

                  <Card className="bg-muted/40">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg">
                        Security Best Practices
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="text-sm">
                      <p>
                        Tips and recommendations for keeping your account secure
                      </p>
                    </CardContent>
                    <CardFooter>
                      <Button
                        variant="outline"
                        className="w-full flex items-center justify-between"
                      >
                        <span>Read Guide</span>
                        <ArrowRight className="h-4 w-4" />
                      </Button>
                    </CardFooter>
                  </Card>

                  <Card className="bg-muted/40">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg">
                        API Documentation
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="text-sm">
                      <p>
                        Technical documentation for developers integrating with
                        our API
                      </p>
                    </CardContent>
                    <CardFooter>
                      <Button
                        variant="outline"
                        className="w-full flex items-center justify-between"
                      >
                        <span>Read Guide</span>
                        <ArrowRight className="h-4 w-4" />
                      </Button>
                    </CardFooter>
                  </Card>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Video Tutorials</CardTitle>
                <CardDescription>
                  Step-by-step video guides for using platform features
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="rounded-lg border overflow-hidden">
                    <div className="aspect-video bg-muted flex items-center justify-center">
                      <PlayButton />
                    </div>
                    <div className="p-4">
                      <h3 className="font-medium">Platform Introduction</h3>
                      <p className="text-sm text-muted-foreground">
                        A complete overview of the platform and its features
                      </p>
                    </div>
                  </div>

                  <div className="rounded-lg border overflow-hidden">
                    <div className="aspect-video bg-muted flex items-center justify-center">
                      <PlayButton />
                    </div>
                    <div className="p-4">
                      <h3 className="font-medium">
                        How to Make Your First Investment
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        Step-by-step guide to making your first investment
                      </p>
                    </div>
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

// Simple play button component for video thumbnails
const PlayButton = () => (
  <div className="h-12 w-12 rounded-full bg-primary/90 flex items-center justify-center cursor-pointer hover:bg-primary transition-colors">
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
      className="text-primary-foreground"
    >
      <polygon points="5 3 19 12 5 21 5 3" />
    </svg>
  </div>
);

export default HelpAndSupport;
