import { NavLink } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../../context/authContext";
import "./Header.css";

/**
 * Header Component
 ** -Uniform header visible on all pages
 * - Logo / App Name
 * - Navigation links (Dashboard, Projects, Logout)
 * - Navigation links highlight the active page using NavLink
 * - User info  + Logout button
 */
export default function Header() {
   const { logout } = useContext(AuthContext); // Get current user and logout function from AuthContext

   return (
      <header className="header">
         {/* Left: Logo */}
         <div className="logo-container">
            <NavLink to="/dashboard" className="logo-text">
               <b>Pro-Tasker</b>
            </NavLink>
         </div>

         {/* Center: Navigation Links */}
         <nav className="nav-links">
            <NavLink
               to="/dashboard"
               className={({ isActive }) =>
                  isActive ? "active-link" : "inactive-link"
               }>
               Dashboard
            </NavLink>

            <NavLink
               to="/projects"
               className={({ isActive }) =>
                  isActive ? "active-link" : "inactive-link"
               }>
               Projects
            </NavLink>
         </nav>

         {/* Right: User info + Logout */}
         <div className="user-container">
            <span className="user-name">Hello, User!</span>
            {/* Logout button */}
            <button className="logout-btn" onClick={logout}>
               Logout
            </button>{" "}
         </div>
      </header>
   );
}
