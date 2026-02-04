import { useEffect, useState } from "react";
import type { ProjectFormProps } from "../../../types";
import "./ProjectForm.css";

/**
 * ProjectForm
 ** Pure UI component used for:
 * - Creating a new project
 * - Editing an existing project
 * * Responsibilities:
 * - Manage local form fields only
 * - Detect create vs edit mode
 * - Call parent handlers (onCreate / onUpdate)
 */
export default function ProjectForm({
   onClose,
   onProjectCreated,
   onProjectUpdated,
   editProject,
}: ProjectFormProps) {
   const [name, setName] = useState("");
   const [description, setDescription] = useState("");
   const [status, setStatus] = useState("");

   /**
    * Synchronizes form fields when switching between Creating and Editing.
    * Populates data if editProject is provided; otherwise, resets to defaults.
    */
   useEffect(() => {
      if (editProject) {
         setName(editProject.name ?? "");
         setDescription(editProject.description ?? "");
         setStatus(editProject.status ?? "Active");
      } else {
         setName("");
         setDescription("");
         setStatus("Active");
      }
   }, [editProject]);

   /**
    * Handle submit
    * - Create mode → onProjectCreated
    * - Edit mode   → onProjectUpdated
    */
   const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault(); // Prevent default page reload
      if (!name.trim()) return;
      const payload = {
         ...(editProject ?? {}), // Preserve original fields (like _id) if editing
         name, // Update with form value
         description, // Update with form value
         status,
      };

      if (editProject && onProjectUpdated) {
         onProjectUpdated(payload);
      } else {
         onProjectCreated(payload);
      }
      onClose();
   };

   return (
      <form className="project-form" onSubmit={handleSubmit}>
         <h2>{editProject ? "Edit Project" : "Create Project"}</h2>

         {/* Project name input */}
         <input
            type="text"
            placeholder="Project name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
         />

         {/* Project description input */}
         <textarea
            placeholder="Project description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={4}></textarea>

         {/* Project status */}
         <select value={status} onChange={(e) => setStatus(e.target.value)}>
            <option value="Active">Active</option>
            <option value="Completed">Completed</option>
         </select>

         <div className="actions">
            {/* Submit button/ Update Button */}
            <button type="submit" disabled={!name.trim()}>
               {editProject ? "Update Project" : "Create Projesct"}
            </button>

            {/* Cancel button uses onClose from parent */}
            <button type="button" onClick={onClose}>
               Cancel
            </button>
         </div>
      </form>
   );
}
