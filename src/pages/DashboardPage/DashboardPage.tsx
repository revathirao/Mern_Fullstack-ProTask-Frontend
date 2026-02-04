import { useContext } from "react";
import { AuthContext } from "../../context/authContext";
import { useNavigate } from "react-router-dom";
import "./DashboardPage.css";

/**
 * Dashboard Component
 * Landing page after login
 * This page is accessible only by logged-in users.
 * Displays a welcome message and go to project button
 * Navigation hub for the app
 */
export default function Dashboard() {
   const navigate = useNavigate(); // Used for programmatic navigation
   const { user } = useContext(AuthContext); // Get current user and logout function from AuthContext

   return (
      <div className="dashboard-container">
         {/* Centered card */}
         {/* Welcome message for the user */}
         <h1>Welcome, {user?.username || user?.email}!</h1>
         {/* Navigate to Projects page */}
         <button className="projects-btn" onClick={() => navigate("/projects")}>
            Go to Projects
         </button>
      </div>
   );
}
