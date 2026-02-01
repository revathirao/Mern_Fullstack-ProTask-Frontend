import { NavLink } from "react-router-dom";
import "./Header.css";

/**
 * Header Component
 ** - Uniform header visible on all pages
 * - Logo / App Name
 * - Navigation links (Dashboard, Projects, Logout)
 * - Navigation links highlight the active page using NavLink
 * - User info  + Logout button
 */

export default function Header() {
   return (
      <header className="header">
         {/* Left: Logo */}
         <div className="logo-container">
            <NavLink to="/dashboard" className="logo-text">
               Pro-Tasker
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
            {/* Add more nav links here if needed */}
         </nav>

         {/* Right: User info + Logout */}
         <div className="user-container">
            <span className="user-name">Hello, User!</span>
            <button
               className="logout-button"
               onClick={() => alert("Logout clicked")}>
               Logout
            </button>
         </div>
      </header>
   );
}
