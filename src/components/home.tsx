import React, { useEffect } from "react";
import DashboardLayout from "./layout/DashboardLayout";
import DashboardOverview from "./dashboard/DashboardOverview";
import AdminDashboard from "./admin/AdminDashboard";
import { useAuth } from "./auth/AuthContext";
import { useLocation, useNavigate } from "react-router-dom";

const Home = () => {
  const { user } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const isAdmin = user?.role === "admin";
  const searchParams = new URLSearchParams(location.search);
  const tab = searchParams.get("tab");

  // If user is admin and tab=admin, show admin dashboard
  const showAdminDashboard = isAdmin && tab === "admin";

  // Redirect non-admin users away from admin tab
  useEffect(() => {
    if (tab === "admin" && !isAdmin) {
      navigate("/dashboard");
    }
  }, [tab, isAdmin, navigate]);

  // Prevent duplicate rendering of admin dashboard
  return (
    <>
      {showAdminDashboard ? (
        <AdminDashboard />
      ) : (
        <DashboardLayout>
          <DashboardOverview username={user?.name} userAvatar={user?.avatar} />
        </DashboardLayout>
      )}
    </>
  );
};

export default Home;
