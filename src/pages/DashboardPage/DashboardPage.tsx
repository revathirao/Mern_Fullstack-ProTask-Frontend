import { useContext } from "react";
import { AuthContext } from "../../context/authContext";
import { useNavigate } from "react-router-dom";
import React from "react";
import "./DashboardPage.css";
/**
 * Dashboard Component
 * Landing page after login
 * This page is accessible only by logged-in users.
 * Displays a welcome message and a logout button.
 * Navigation hub for the app
 */
export default function Dashboard() {
   const navigate = useNavigate(); // Used for programmatic navigation
   const { user, logout } = useContext(AuthContext); // Get current user and logout function from AuthContext

   // return <h1>Welcome to Dashboard page</h1>; //To check the page initially
   return (
      <div className="dashboard-container">
         {/* Centered card */}
         {/* Welcome message for the user */}
         <h1>Welcome, {user?.username || user?.email}!</h1>
         {/* Navigate to Projects page */}
         <button onClick={() => navigate("/projects")}>Go to Projects</button>
         {/* Logout button */}
         <button onClick={logout}>Logout</button>{" "}
         {/* Calls logout function from AuthContext Logout */}
      </div>
   );
}
