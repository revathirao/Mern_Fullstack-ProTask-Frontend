import React, { useContext } from "react";
import { AuthContext } from "../../context/authContext";
/**
 * Dashboard Component
 * This page is accessible only by logged-in users.
 * Displays a welcome message and a logout button.
 */
export default function Dashboard() {
   const { user, logout } = useContext(AuthContext); // Get current user and logout function from AuthContext

   // return <h1>Welcome to Dashboard page</h1>; //To check the page initially
   return (
      <div className="dashboard-container">
         {/* Centered card */}
         <div className="dashboard-card">
            {/* Welcome message for the user */}
            <h1>Welcome, {user?.username || user?.email}!</h1>

            {/* Logout button */}
            <button onClick={logout}>
               {" "}
               // Calls logout function from AuthContext Logout
            </button>
         </div>
      </div>
   );
}
