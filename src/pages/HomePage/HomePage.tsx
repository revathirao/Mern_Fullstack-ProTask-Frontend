// import { useContext } from "react";
// import { AuthContext } from "../../context/authContext";
import { useNavigate } from "react-router-dom";
// import React from "react";
import "./HomePage.css";
/**
 * Dashboard Component
 * Landing page after login
 * This page is accessible only by logged-in users.
 * Displays a welcome message and a logout button.
 * Navigation hub for the app
 */
export default function Homepage() {
   const navigate = useNavigate(); // Used for programmatic navigation
   //    const { use } = useContext(AuthContext); // Get current user and logout function from AuthContext

   // return <h1>Welcome to Dashboard page</h1>; //To check the page initially
   return (
      <div className="homepage-container">
         <h1>Welcome To ProTasker!</h1>

         <div className="homepage-buttons">
            <button
               className="register-btn"
               onClick={() => navigate("/register")}>
               Register
            </button>

            <button className="login-btn" onClick={() => navigate("/login")}>
               Login
            </button>
         </div>
      </div>
   );
}
