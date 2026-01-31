import { useContext, useState } from "react";
import axios from "axios";
import { AuthContext } from "../../../context/authContext";
import "./ProjectForm.css";

/* 
   ProjectForm Component
   Used to create a new project (UI only)
 */
export default function ProjectForm() {
   // Local state for form fields
   const [name, setName] = useState("");
   const [description, setDescription] = useState("");
   const { token } = useContext(AuthContext);

   // Handle form submit
   async function handleSubmit(e: React.FormEvent) {
      e.preventDefault(); // Prevent default page reload
      try {
         // Make sure token exists

         if (!token) return; // <-- use token directly

         /* 
       Axios POST request to backend
       - URL: your backend endpoint
       - body: project data (name + description)
       - headers: Authorization with JWT token
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

         // Clear form fields
         setName("");
         setDescription("");
      } catch (err: any) {
         // Axios errors have response object
         if (err.response) {
            console.error("Error creating project:", err.response.data.message);
         } else {
            console.error("Something went wrong:", err.message);
         }
      }
   }

   // JSX for Project form
   return (
      <form onSubmit={handleSubmit} className="project-form">
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
      </form>
   );
}
