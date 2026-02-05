import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../../context/authContext";
import ProjectForm from "../ProjectForm/ProjectForm";
import Modal from "../../SharedComponents/Modal/Modal";
import ProjectCard from "../ProjectCard/ProjectCard";
import Spinner from "../../SharedComponents/Spinner/Spinner";
import ErrorMessage from "../../SharedComponents/ErrorHandler/ErrorHandler";
import ToastMessage from "../../SharedComponents/ToastMessage/ToastMessage";

import { useProjects } from "../../../hooks/useProjects"; // Shared hook
import {
   deleteProject as deleteProjectAction,
   createProjectUtil,
   updateProject as updateProjectAction,
} from "../../../utils/projectUtils"; // Util for deletion

import "./projects.css";

/**
 * Projects Page Component
 * * Purpose:
 * - Display all projects for the logged-in user
 * - Create new projects using ProjectForm modal
 * - Delete projects using ProjectCard buttons
 * - Uses shared `useProjects` hook to sync state across pages
 * * @returns JSX.Element - The rendered Projects page
 */
export default function Projects() {
   /** Get JWT token from context */
   const { token } = useContext(AuthContext);

   if (!token) return <p>Please log in to view projects</p>;

   /** Navigation function */
   const navigate = useNavigate();

   /** Hook provides projects, loading state, error, and actions */
   const { projects, loading, error, loadProjects, addProject, removeProject } =
      useProjects(token || "");

   /** Modal visibility for ProjectForm */
   const [showForm, setShowForm] = useState(false);

   /** Stores project selected for edit (optional) */
   const [editProject, setEditProject] = useState<any>(null);

   /** Success toast message */
   const [success, setSuccess] = useState("");

   const [project, setProject] = useState<any>(null);
   const [localError, setLocalError] = useState("");

   const handleCloseModal = () => {
      setEditProject(null); // clear edit mode
      setShowForm(false); // close modal
   };

 /** 
 * Summary Statistics calculation
 * Note: These calculations depend on the 'status' field returned by the API.
 * The backend uses string values "Active" and "Completed".
 */
//  Total Projects: The length of the entire projects array
const totalProjects = projects.length;

//  Active Projects: Filter projects where status matches exactly "Active"
const activeProjects = projects.filter((p) => p.status === "Active").length;

// Completed Projects: Filter projects where status matches exactly "Completed"
const completedProjects = projects.filter((p) => p.status === "Completed").length;


   / * Load projects when component mounts or token changes*/;
   useEffect(() => {
      if (token) loadProjects(); // Fetch projects from backend via hook
   }, [token]);

   /**
    * handleProjectCreated
    * Callback after creating a project
    * @param newProject - The newly created project
    */
   const handleProjectCreated = async (projectBody: any) => {
      try {
         await createProjectUtil(projectBody, addProject);
         setSuccess("Project created successfully 🎉");
         setShowForm(false);
         // Clear it after 3 seconds without needing useEffect
         setTimeout(() => setSuccess(""), 3000);
      } catch (err) {
         console.error(err);
      }
   };

   const handleUpdate = async (updatedData: any) => {
      try {
         const updated = await updateProjectAction(
            project._id,
            updatedData,
            editProject,
         );
         setProject(updated); // update local state
         setSuccess("Project updated successfully 🎉"); //show toast
         // navigate after small delay
         setTimeout(
            () => navigate("/projects", { state: { refetch: true } }),
            5000,
         );
      } catch (err: any) {
         setLocalError(err.message || "Failed to update project");
      }
   };

   /**
    * Delete a project by ID
    * Calls backend util and updates hook state
    * @param id - Project _id to delete
    */
   const handleDelete = async (id: string) => {
      const confirmed = window.confirm(
         "Are you sure you want to delete this project?",
      );
      if (!confirmed) return; // Stop if user cancels

      try {
         await deleteProjectAction(id, removeProject); // Delete in backend + hook
         setSuccess("Project deleted successfully 🎉"); // Show toast
      } catch (err: any) {
         console.error("Failed to delete project:", err); // Log errors
      }
   };

   /** Show spinner while loading projects */
   if (loading) return <Spinner />;

   /** Show error message if fetch failed */
   if (error) return <ErrorMessage message={error} />;

   /* Error state */
   if (error || localError)
      return (
         <div className="project-details-container">
            <ErrorMessage message={error || localError} />
            <button onClick={() => navigate("/projects")}>
               Back to Projects
            </button>
         </div>
      );

   /** Main render */
   return (
      <div className="projects-pagecontainer">
         {/* Success toast */}
         {success && <ToastMessage message={success} />}

         {/* Header: title + create button */}
         <div className="projects-header">
            <div className="page-header">
               <h1>My Projects</h1>
               <p>Manage all your projects in one place</p>
            </div>
            <button
               className="create-project-btn"
               onClick={() => setShowForm(true)} // Open modal
            >
               Create Project
            </button>
         </div>

         {/* Stats Section */}
         <div className="project-stats-top">
            <div className="stat-card total">
               <div className="stat-icon">📁</div>
               <div className="stat-number">{totalProjects}</div>
               <div className="stat-label">Total Projects</div>
            </div>

            <div className="stat-card active">
               <div className="stat-icon">🚀</div>
               <div className="stat-number">{activeProjects}</div>
               <div className="stat-label">Active Projects</div>
            </div>

            <div className="stat-card completed">
               <div className="stat-icon">✅</div>
               <div className="stat-number">{completedProjects}</div>
               <div className="stat-label">Completed Projects</div>
            </div>
         </div>

         {/* Modal for creating new project */}
         {showForm && (
            <Modal onClose={() => setShowForm(false)}>
               <ProjectForm
                  editProject={editProject} //  pass explicitly
                  onClose={handleCloseModal} // Close modal
                  onProjectCreated={handleProjectCreated} // Callback on create
                  onProjectUpdated={handleUpdate}
               />
            </Modal>
         )}

         {/* Project list */}
         <div className="projects-list">
            {projects.length === 0 ? (
               <p>No projects yet. Create your first project!</p> // Empty state
            ) : (
               <div className="project-items">
                  {/* Display fetched projects */}
                  {Array.isArray(projects) &&
                     projects.map((project) => (
                        <ProjectCard
                           key={project._id}
                           project={project}
                           onClick={(id) => navigate(`/projects/${id}`)}
                           onEdit={(project) => {
                              setEditProject(project); // store project to edit
                              setShowForm(true); // open modal
                           }}
                           onDelete={(id) => handleDelete(id)}
                        />
                     ))}
               </div>
            )}
         </div>
      </div>
   );
}
