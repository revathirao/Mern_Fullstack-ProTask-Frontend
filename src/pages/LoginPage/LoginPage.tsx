import React, { useState, useContext } from "react"; // React + hooks for state and context
import { AuthContext } from "../../context/authContext"; // Import AuthContext to access login()
import { useNavigate } from "react-router-dom"; // Hook for redirecting after loginconst { login } = useContext(AuthContext);

/**
 * Login Component
 * Displays a login form that allows users to log in using their email and password.
 * Connects to AuthContext to handle authentication and store user/token.
 */
export default function Login() {
   // return <h1>Blog Index Works</h1>;//To check the page initially  // Get the login function from AuthContext
   // Get the login function from AuthContext
   //useState() → stores email, password, and error locally
   const { login } = useContext(AuthContext); // Destructure login function from context
   const navigate = useNavigate(); // Hook for redirecting to another route
   const [email, setEmail] = useState(""); // Controlled input for email
   const [password, setPassword] = useState(""); // Controlled input for password
   const [error, setError] = useState(""); // State to display login errors

   /**
    * handleSubmit
    * Handles the login form submission.
    * Steps:
    * Prevent the default form submission to avoid page reload.
    * Clear any previous error messages.
    * Call the login function from AuthContext with email & password.
    * Redirect the user to the dashboard on successful login.
    * Catch and display any errors from the backend.
    * * @param {React.FormEvent} e - The form submit event
    */
   async function handleSubmit(e: React.FormEvent) {
      e.preventDefault(); // Prevent default page reload
      setError(""); // Clear previous errors if any
      try {
         // Call login from AuthContext
         await login(email, password);

         // Redirect user after successful login
         navigate("/dashboard");
      } catch (err: any) {
         // Handle errors returned from backend
         if (err.response && err.response.data?.message) {
            setError(err.response.data.message); // Show backend error
         } else {
            setError("Login failed. Please try again."); // Fallback error
         }
      }
   }

   // JSX for login form
   return (
      <div
         className="login-container"
         style={{
            maxWidth: "400px",
            margin: "50px auto",
            padding: "20px",
            border: "1px solid #ccc",
            borderRadius: "8px",
         }}>
         {/* Page title */}
         <h2>Login</h2>

         {/* Form */}
         <form
            onSubmit={handleSubmit}
            style={{ display: "flex", flexDirection: "column", gap: "15px" }}>
            {/* Display error message if any */}
            {error && <div style={{ color: "red" }}>{error}</div>}

            {/* Email input */}
            <div>
               <label>Email:</label>
               <input
                  type="email"
                  value={email} // Bind state to input
                  onChange={(e) => setEmail(e.target.value)} // Update state on change
                  required
                  placeholder="you@example.com"
               />
            </div>

            {/* Password input */}
            <div>
               <label>Password:</label>
               <input
                  type="password"
                  value={password} // Bind state to input
                  onChange={(e) => setPassword(e.target.value)} // Update state on change
                  required
                  placeholder="Enter password"
               />
            </div>

            {/* Submit button */}
            <button type="submit">Login</button>
         </form>
      </div>
   );
}
