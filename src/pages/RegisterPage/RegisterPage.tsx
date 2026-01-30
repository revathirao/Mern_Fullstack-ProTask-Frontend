import type { ChangeEvent, FormEvent, JSX } from "react";
import { useState, useContext } from "react";
import Spinner from "../../components/SharedComponents/Spinner/Spinner";
import ErrorMessage from "../../components/SharedComponents/ErrorHandler/ErrorHandler";
import type { RegisterCredentials } from "../../types";
import { AuthContext } from "../../context/authContext";

/**
 * Register Page
 ** Allows a new user to create an account.
 * Uses AuthContext.register() for API interaction.
 * Displays Spinner while registering and ErrorMessage on failure.
 */
export default function Register(): JSX.Element {
   // Access register function from AuthContext
   const { register } = useContext(AuthContext);

   //State to store user input values
   const [formData, setFormData] = useState<RegisterCredentials>({
      email: "",
      password: "",
      username: "",
   });

   // State to store error messages
   const [error, setError] = useState<string>();
   // Track loading state to control Spinner visibility
   const [isLoading, setIsLoading] = useState<boolean>(false);

   // Destructure form data for easier access
   const { email, password, username } = formData;

   /**
    * Handles input field changes
    * Updates form state dynamically based on input name
    */
   function handleChange(e: ChangeEvent<HTMLInputElement>): void {
      setFormData({
         ...formData,
         [e.target.name]: e.target.value,
      });
   }

   /**
    * Handle form submission
    * Validates input and sends data to backend
    */
   async function handleSubmit(e: FormEvent<HTMLFormElement>): Promise<void> {
      e.preventDefault();

      // Clear any previous error
      setError("");

      // Basic validation
      if (!email || !password) {
         setError("Email and password are required.");
         return;
      }

      if (password.length < 6) {
         setError("Password must be at least 6 characters long.");
         return;
      }

      try {
         // Enable spinner before API call
         setIsLoading(true);

         // Call register from AuthContext
         await register({ email, password, username });
         alert("Registration successful! Please log in.");
      } catch (err: any) {
         // Handle backend vs fallback errors (same as Login)
         if (err.response && err.response.data?.message) {
            setError(err.response.data.message);
         } else {
            setError("Registration failed. Please try again.");
         }
      } finally {
         // Disable spinner after request completes
         setIsLoading(false);
      }
   }

   return (
      <div className="register-container">
         <h2>Create Account</h2>

         {/* Render error message */}
         {error && <ErrorMessage message={error} />}
         
         <form onSubmit={handleSubmit}>
            <input
               type="text"
               name="username"
               placeholder="Username (optional)"
               value={username}
               onChange={handleChange}
            />

            <input
               type="email"
               name="email"
               placeholder="Email"
               value={email}
               onChange={handleChange}
               required
            />

            <input
               type="password"
               name="password"
               placeholder="Password (min 6 characters)"
               value={password}
               onChange={handleChange}
               required
            />

            {/* Submit button */}
            <button type="submit" disabled={isLoading}>
               {isLoading ? "Registering..." : "Register"}
            </button>
         </form>

         {/* Spinner component is clearly and separately rendered */}
         {isLoading && (
            <div style={{ marginTop: "12px", textAlign: "center" }}>
               <Spinner />
            </div>
         )}
      </div>
   );
}
