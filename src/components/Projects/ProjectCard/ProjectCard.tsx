import type { ProjectCardProps } from "../../../types/index";
import "./ProjectCard.css";

/**
 * ProjectCard Component
 *  * A functional React component that displays a summary of a project's details.
 * It provides interactive elements to view, edit, or delete a project.
 **@param project - An object containing the project's data (id, title, description, status).
 * @param onClick - Callback function triggered when the card body is clicked (view details).
 * @param onEdit - Callback function triggered when the 'Edit' button is clicked.
 * @param onDelete - Callback function triggered when the 'Delete' button is clicked.
 */
export default function ProjectCard({
   project,
   onClick,
   onEdit,
   onDelete,
}: ProjectCardProps) {
   return (
      // Main container: clicking anywhere triggers the onClick handler with the project ID
      <div
         className="project-card fade-in" // Applies CSS classes for styling and entry animation
         onClick={() => onClick(project._id)}>
         {/* Project Info */}
         <div className="project-content">
            <h3>{project.name}</h3>
            <p>{project.description}</p>
            <span className={`status ${project.status?.toLowerCase()}`}>
               {project.status}
            </span>
            {/* Displays the current status */}
         </div>

         {/* Container for the text-based project information */}
         <div
            className="project-actions"
            // e.stopPropagation() prevents the card's main onClick from firing when buttons are clicked
            onClick={(e) => e.stopPropagation()}>
            {/* Button to trigger the edit logic for this specific project */}
            <button className="edit-btn" onClick={() => onEdit(project)}>
               Edit
            </button>
            {/* Button to trigger the delete logic using the project's unique ID */}
            <button
               className="delete-btn"
               onClick={() => onDelete(project._id)}>
               Delete
            </button>
         </div>
      </div>
   );
}
