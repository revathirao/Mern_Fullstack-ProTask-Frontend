import { useNavigate } from "react-router-dom";
import "./HomePage.css";

/**
 * Homepage Component
 * Displays a welcome message and a register and login button
 **/
export default function Homepage() {
   const navigate = useNavigate(); // Used for programmatic navigation

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
