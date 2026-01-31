import { useState } from "react";
import "./ProjectForm.css";

/* 
   ProjectForm Component
   Used to create a new project (UI only)
 */
export default function ProjectForm() {
   // Local state for form fields
   const [name, setName] = useState("");
   const [description, setDescription] = useState("");

   // Handle form submit
   function handleSubmit(e: React.FormEvent) {
      e.preventDefault(); // Prevent default page reload
      console.log({
         name,
         description,
      });

      // Clear form after submit
      setName("");
      setDescription("");
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
