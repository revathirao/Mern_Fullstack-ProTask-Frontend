import { useEffect, useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../../context/authContext";
import ProjectForm from "../../components/Projects/ProjectForm/ProjectForm";
import Modal from "../../components/SharedComponents/Modal/Modal";
import Spinner from "../../components/SharedComponents/Spinner/Spinner";
import ErrorMessage from "../../components/SharedComponents/ErrorHandler/ErrorHandler";
import ToastMessage from "../../components/SharedComponents/ToastMessage/ToastMessage";
import "./ProjectDetailPage.css";

/**
 * ProjectDetails Page
 * Fetches and displays details of a single project based on the URL param `id`.
 * Provides options to:
 *  - View project info
 *  - Edit project (opens a modal)
 *  - Delete project
 */
export default function ProjectDetails() {
   const { id } = useParams<{ id: string }>(); // get project ID from route
   const navigate = useNavigate(); // Used to redirect user (ex: after delete)

   // Access user token from AuthContext for authenticated requests
   const { token } = useContext(AuthContext);

   // Store project data fetched from backend
   const [project, setProject] = useState<any>(null);

   // State to store error messages
   const [error, setError] = useState("");

   // Track loading state to control Spinner visibility
   const [isLoading, setIsLoading] = useState<boolean>(false);

   // Modal visibility for edit
   const [showEditModal, setShowEditModal] = useState<boolean>(false);

   // Toast for success messages
   const [success, setSuccess] = useState<string>("");
   // useEffect(() => {
   //    //Fetch project by id
   async function fetchProjectById() {
      // useEffect(() => {
      if (!id || !token) return;

      try {
         setIsLoading(true);
         setError("");

         // if (!token || !id) return; // Safety check

         const res = await axios.get(
            `${import.meta.env.VITE_API_URL}/api/projects/${id}`,
            {
               headers: {
                  Authorization: `Bearer ${token}`,
               },
            },
         );
         console.log("Before setProject:", res.data, "isLoading:", isLoading);
         setProject(res.data);
         console.log("After setProject:", res.data, "isLoading:", isLoading);

         // console.log("Fetched project by ID:", res.data);
         // setProject(res.data); // Update project state
      } catch (err: any) {
         console.error(
            "Error fetching project:",
            err.response?.data?.message || err.message,
         );
      } finally {
         setIsLoading(false);
      }
   }

   /* Fetch project whenever:
    * - project ID changes
    * - auth token changes
    */
   useEffect(() => {
      fetchProjectById();
   }, [id, token]);

   /**UPDATE HANDLER
    * Handle project updates after editing
    * Updates the local state so changes reflect immediately
    */
   const handleProjectUpdated = (updatedProject: any) => {
      setProject(updatedProject);
      setShowEditModal(false); // Close modal after update
      setSuccess("Project updated successfully 🎉"); // show success
   };

   // Handle delete
   async function handleDelete() {
      const confirmed = window.confirm(
         "Are you sure you want to delete this project?",
      );
      if (!confirmed) return;

      try {
         setIsLoading(true);
         await axios.delete(
            `${import.meta.env.VITE_API_URL}/api/projects/${id}`,
            {
               headers: { Authorization: `Bearer ${token}` },
            },
         );

         setSuccess("Project deleted successfully 🎉");

         // Redirect back to projects list after 1.5s
         setTimeout(() => navigate("/projects"), 1500);
      } catch (err: any) {
         console.error("Error deleting project:", err);
         setError(err.response?.data?.message || "Failed to delete project");
      } finally {
         setIsLoading(false);
      }
   }

   // Loading state
   if (isLoading) {
      return (
         <div className="project-details-container">
            <Spinner />
         </div>
      );
   }

   // Error state
   if (error) {
      return (
         <div className="project-details-container">
            <ErrorMessage message={error} />
            <button onClick={() => navigate("/projects")}>
               Back to Projects
            </button>
         </div>
      );
   }

   // Safety fallback
   if (!project) return null;

   console.log(
      "Rendering ProjectDetailPage, project:",
      project,
      "isLoading:",
      isLoading,
      "error:",
      error,
   );

   //Render
   return (
      // <div>
      //    <h1>Project Details</h1>
      //    <p>Project ID: {id}</p>
      // </div>

      <div className="project-details-container">
         {/* success message */}
         {success && <ToastMessage message={success} />}
         <div className="project-details-header">
            {/* Project Info */}
            <h1>{project.name}</h1>
            {/* <p>{project.description}</p> */}
            <span className={`status ${project.status?.toLowerCase()}`}>
               {project.status}
            </span>
         </div>

         <div className="project-description">
            <p>{project.description}</p>
         </div>

         {/* Actions */}
         <div className="project-details-actions">
            <button onClick={() => setShowEditModal(true)} className="edit-btn">
               Edit
            </button>
            <button onClick={handleDelete} className="delete-btn">
               Delete
            </button>
            <button onClick={() => navigate("/projects")} className="back-btn">
               Back to Projects
            </button>
         </div>

         {/* Edit modal */}
         {showEditModal && project && (
            <Modal onClose={() => setShowEditModal(false)}>
               <ProjectForm
                  project={project}
                  isEdit={true}
                  onClose={() => setShowEditModal(false)}
                  onProjectCreated={() => {}} // noop
                  onProjectUpdated={handleProjectUpdated}
               />
            </Modal>
         )}
      </div>
   );
}
