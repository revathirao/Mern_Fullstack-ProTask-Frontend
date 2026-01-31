import { useContext, useState } from "react";
import axios from "axios";
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

   // Get token from AuthContext
   const { token } = useContext(AuthContext);

   // Handle form submit
   async function handleSubmit(e: React.FormEvent) {
      e.preventDefault(); // Prevent default page reload
      try {
         // Make sure token exists
         if (!token) return; // <-- use token directly

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
         onProjectCreated();

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
      }
   }

   // JSX for Project form
   return (
      <form onSubmit={handleSubmit} className="project-form">
         <h2>Create Project</h2>

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
         <button type="submit">Create Project</button>
         {/* Cancel button uses onClose from parent */}
         <button type="button" onClick={onClose}>
            Cancel
         </button>
      </form>
   );
}
