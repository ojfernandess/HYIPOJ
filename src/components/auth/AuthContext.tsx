import React, { createContext, useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  role?: "user" | "admin";
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
  isLoading: boolean;
  error: string | null;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  // Check if user is already logged in on mount
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setIsLoading(false);
  }, []);

  // Login function
  const login = async (email: string, password: string) => {
    setIsLoading(true);
    setError(null);

    try {
      // Check for admin credentials
      if (
        (email === "ojfernandes" || email === "admin") &&
        password === "Soberano200"
      ) {
        const adminUser: User = {
          id: "admin-" + Math.random().toString(36).substr(2, 9),
          name: email === "ojfernandes" ? "OJ Fernandes" : "Admin User",
          email:
            email === "ojfernandes"
              ? "ojfernandes@admin.com"
              : "admin@hyipplatform.com",
          avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=admin`,
          role: "admin",
        };

        // Simulate API delay
        await new Promise((resolve) => setTimeout(resolve, 1000));

        // Save admin user to localStorage
        localStorage.setItem("user", JSON.stringify(adminUser));
        setUser(adminUser);
        navigate("/dashboard?tab=admin");
        return;
      }

      // Regular user login logic
      // Check if user is admin based on email (in a real app, this would be from the database)
      const isAdmin = email.includes("admin");

      const mockUser: User = {
        id: "user-" + Math.random().toString(36).substr(2, 9),
        name: email.split("@")[0],
        email,
        avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${email}`,
        role: isAdmin ? "admin" : "user",
      };

      // Simulate API delay
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Save user to localStorage
      localStorage.setItem("user", JSON.stringify(mockUser));
      setUser(mockUser);

      // Redirect admin users to admin panel
      if (isAdmin) {
        navigate("/dashboard?tab=admin");
      } else {
        navigate("/dashboard");
      }
    } catch (err) {
      setError("Failed to login. Please check your credentials.");
    } finally {
      setIsLoading(false);
    }
  };

  // Register function
  const register = async (name: string, email: string, password: string) => {
    setIsLoading(true);
    setError(null);

    try {
      // In a real app, this would be an API call
      // For demo, we'll simulate a successful registration
      // Check if user is admin based on email (in a real app, this would be from the database)
      const isAdmin = email.includes("admin");

      const mockUser: User = {
        id: "user-" + Math.random().toString(36).substr(2, 9),
        name,
        email,
        avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${email}`,
        role: isAdmin ? "admin" : "user",
      };

      // Simulate API delay
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Save user to localStorage
      localStorage.setItem("user", JSON.stringify(mockUser));
      setUser(mockUser);

      // Redirect admin users to admin panel
      if (isAdmin) {
        navigate("/dashboard?tab=admin");
      } else {
        navigate("/dashboard");
      }
    } catch (err) {
      setError("Failed to register. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  // Logout function
  const logout = () => {
    localStorage.removeItem("user");
    setUser(null);
    navigate("/login");
  };

  return (
    <AuthContext.Provider
      value={{ user, login, register, logout, isLoading, error }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use auth context
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
