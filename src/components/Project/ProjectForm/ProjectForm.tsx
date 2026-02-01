import { useContext, useState } from "react";
import axios from "axios";
import Spinner from "../../SharedComponents/Spinner/Spinner";
import ErrorMessage from "../../SharedComponents/ErrorHandler/ErrorHandler";
import ToastMessage from "../../SharedComponents/ToastMessage/ToastMessage";

import { AuthContext } from "../../../context/authContext";
import type { ProjectFormProps } from "../../../types/index";
import "./ProjectForm.css";

/*
 ** ProjectForm Component
 **Purpose:
 * - Displays a form to create a new project
 * - Sends POST request to backend
 * - Calls onClose() after successful creation
 * - Calls onProjectCreated() to refresh project list
 */
export default function ProjectForm({
   onClose,
   onProjectCreated,
}: ProjectFormProps) {
   // Local state for form fields
   const [name, setName] = useState("");
   const [description, setDescription] = useState("");

   // State to store error messages
   const [error, setError] = useState("");

   // Track loading state to control Spinner visibility
   const [isLoading, setIsLoading] = useState<boolean>(false);

   // Get token from AuthContext
   const { token } = useContext(AuthContext);

   const [success, setSuccess] = useState(false);

   // Handle form submit
   async function handleSubmit(e: React.FormEvent) {
      e.preventDefault(); // Prevent default page reload

      // Clear any previous error
      setError("");

      //Inline Validation
      if (!name.trim()) {
         setError("Project name is required");
         return;
      }
      try {
         // Make sure token exists
         if (!token) return; //  use token directly

         // Enable spinner before API call
         setIsLoading(true);

         /*
          *Axios POST request to backend
          *- URL: your backend endpoint
          *- body: project data (name + description)
          *- headers: Authorization with JWT token
          */
         const res = await axios.post(
            `${import.meta.env.VITE_API_URL}/api/projects`,
            { name, description }, // request body
            {
               headers: {
                  Authorization: `Bearer ${token}`, // send JWT
               },
            },
         );

         // Log response from backend
         console.log("Project created:", res.data);

         // Refresh projects in parent
         // onProjectCreated();
         // Pass the newly created project to parent
         onProjectCreated(res.data); // res.data = new project object

         setSuccess(true);
         setTimeout(() => setSuccess(false), 2500);

         //Close the form
         onClose();

         // Clear form fields
         setName("");
         setDescription("");
      } catch (err: any) {
         console.error(
            "Error creating project:",
            err.response?.data?.message || err.message,
         );
      } finally {
         setIsLoading(false); //STOP loading
      }
   }

   // JSX for Project form
   return (
      //  Define the form element, attach the submission handle
      <form onSubmit={handleSubmit} className="project-form">
         {/* Header */}
         <h2>Create Project</h2>
         {/* Display an inline error message if the 'error' state contains a value
          *Shows validation errors (e.g., empty project name)*/}
         {error && <ErrorMessage message={error} />}
         {/* ToastMessage:
          *-Shows success feedback after project creation
          *- Appears for a few seconds and disappears automatically*/}
         {success && <ToastMessage message="Project created 🎉" />}
         {/* Project name input */}
         <input
            type="text"
            placeholder="Project Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
         />
         {/* Project description input */}
         <textarea
            placeholder="Project Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={4}
         />
         {/* Submit button */}
         <button type="submit" disabled={isLoading}>
            {isLoading ? (
               <>
                  Loading...
                  <Spinner />
               </>
            ) : (
               "Create Project"
            )}
         </button>{" "}
         {/* Cancel button uses onClose from parent */}
         <button type="button" onClick={onClose}>
            Cancel
         </button>
      </form>
   );
}
