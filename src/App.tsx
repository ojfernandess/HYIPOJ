import { Suspense, lazy } from "react";
import { useRoutes, Routes, Route, Navigate } from "react-router-dom";
import Home from "./components/home";
import routes from "tempo-routes";

// Auth Pages
const LandingPage = lazy(() => import("./components/landing/LandingPage"));
const LoginForm = lazy(() => import("./components/auth/LoginForm"));
const RegisterForm = lazy(() => import("./components/auth/RegisterForm"));
const ForgotPasswordForm = lazy(
  () => import("./components/auth/ForgotPasswordForm"),
);

// Dashboard Pages
const AdminDashboard = lazy(() => import("./components/admin/AdminDashboard"));
const MiningPowerMarketplace = lazy(
  () => import("./components/mining/MiningPowerMarketplace"),
);
const DepositFunds = lazy(() => import("./components/deposit/DepositFunds"));
const AffiliateProgram = lazy(
  () => import("./components/affiliate/AffiliateProgram"),
);
const EarningsWithdrawals = lazy(
  () => import("./components/earnings/EarningsWithdrawals"),
);
const UserProfile = lazy(() => import("./components/profile/UserProfile"));
const UserSettings = lazy(() => import("./components/settings/UserSettings"));
const InvestmentPlans = lazy(
  () => import("./components/investments/InvestmentPlans"),
);
const HelpAndSupport = lazy(
  () => import("./components/support/HelpAndSupport"),
);

// Simple auth check - in a real app, this would check tokens, etc.
const isAuthenticated = () => {
  // For demo purposes, we'll just check if there's a user in localStorage
  return localStorage.getItem("user") !== null;
};

// Protected route component
const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  if (!isAuthenticated()) {
    // Redirect to login if not authenticated
    return <Navigate to="/login" replace />;
  }
  return <>{children}</>;
};

function App() {
  return (
    <Suspense
      fallback={
        <div className="flex items-center justify-center h-screen">
          Loading...
        </div>
      }
    >
      <>
        {/* For Tempo routes */}
        {import.meta.env.VITE_TEMPO === "true" && useRoutes(routes)}

        <Routes>
          {/* Public Routes */}
          <Route path="/landing" element={<LandingPage />} />
          <Route path="/login" element={<LoginForm />} />
          <Route path="/register" element={<RegisterForm />} />
          <Route path="/forgot-password" element={<ForgotPasswordForm />} />

          {/* Redirect root to landing for non-authenticated users or dashboard for authenticated users */}
          <Route
            path="/"
            element={
              isAuthenticated() ? (
                <Navigate to="/dashboard" replace />
              ) : (
                <LandingPage />
              )
            }
          />

          {/* Protected Routes */}
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin"
            element={
              <ProtectedRoute>
                <AdminDashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/mining"
            element={
              <ProtectedRoute>
                <MiningPowerMarketplace />
              </ProtectedRoute>
            }
          />
          <Route
            path="/deposit"
            element={
              <ProtectedRoute>
                <DepositFunds />
              </ProtectedRoute>
            }
          />
          <Route
            path="/affiliate"
            element={
              <ProtectedRoute>
                <AffiliateProgram />
              </ProtectedRoute>
            }
          />
          <Route
            path="/earnings"
            element={
              <ProtectedRoute>
                <EarningsWithdrawals />
              </ProtectedRoute>
            }
          />
          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <UserProfile />
              </ProtectedRoute>
            }
          />
          <Route
            path="/settings"
            element={
              <ProtectedRoute>
                <UserSettings />
              </ProtectedRoute>
            }
          />
          <Route
            path="/investments"
            element={
              <ProtectedRoute>
                <InvestmentPlans />
              </ProtectedRoute>
            }
          />
          <Route
            path="/support"
            element={
              <ProtectedRoute>
                <HelpAndSupport />
              </ProtectedRoute>
            }
          />

          {/* Add this before the catchall route for Tempo */}
          {import.meta.env.VITE_TEMPO === "true" && (
            <Route path="/tempobook/*" />
          )}

          {/* Catch all - redirect to landing or dashboard */}
          <Route
            path="*"
            element={
              isAuthenticated() ? (
                <Navigate to="/dashboard" replace />
              ) : (
                <Navigate to="/landing" replace />
              )
            }
          />
        </Routes>
      </>
    </Suspense>
  );
}

export default App;
