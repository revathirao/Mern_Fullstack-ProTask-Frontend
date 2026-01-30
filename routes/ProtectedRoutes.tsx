import { Navigate } from "react-router-dom";
import { AuthContext } from "../src/context/authContext";
import { useContext } from "react";
import type { ReactNode } from "react";

/**
 * PrivateRoute Component
 * Protects routes that require authentication.
 * If the user is not logged in, redirects to the login page.
 * Wrapper component for protected routes
 */
export default function ProtectedRoute({ children }: { children: ReactNode }) {
   const { user } = useContext(AuthContext); // Get user from AuthContext
   // If no user is logged in, redirect to login page
   if (!user) {
      return <Navigate to="/login" replace />;
   }
   // If user is logged in, render the protected page
   return children;
}
