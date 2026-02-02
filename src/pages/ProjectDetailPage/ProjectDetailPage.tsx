import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useProjects } from "../../hooks/useProjects";

import ProjectForm from "../../components/Projects/ProjectForm/ProjectForm";
import Modal from "../../components/SharedComponents/Modal/Modal";
import Spinner from "../../components/SharedComponents/Spinner/Spinner";
import ErrorMessage from "../../components/SharedComponents/ErrorHandler/ErrorHandler";
import ToastMessage from "../../components/SharedComponents/ToastMessage/ToastMessage";

import { deleteProject, updateProject } from "../../utils/projectUtils";

import "./ProjectDetailPage.css";

/**
 * ProjectDetails Page
 * - View single project
 * - Edit project
 * - Delete project
 */
export default function ProjectDetails() {
   const { id } = useParams<{ id: string }>();
   const navigate = useNavigate();

   const {
      projects,
      loading,
      error,
      loadProjects,
      editProject,
      removeProject,
   } = useProjects(localStorage.getItem("token") || "");

   const [project, setProject] = useState<any>(null);
   const [showEditModal, setShowEditModal] = useState(false);
   const [success, setSuccess] = useState("");
   const [localError, setLocalError] = useState("");

   /* Load projects if not already loaded */
   useEffect(() => {
      if (!projects.length) loadProjects();
   }, []);

   /* Find current project */
   useEffect(() => {
      const found = projects.find((p) => p._id === id);
      if (found) setProject(found);
   }, [projects, id]);

   /* Delete handler */
   const handleDelete = async () => {
      const confirmed = window.confirm(
         "Are you sure you want to delete this project?",
      );
      if (!confirmed) return;

      try {
         await deleteProject(project._id, removeProject);
         setSuccess("Project deleted successfully 🎉");
         setTimeout(() => navigate("/projects"), 1500);
      } catch (err: any) {
         setLocalError(err.message || "Failed to delete project");
      }
   };

   /* Update handler */
   const handleUpdate = async (updatedData: any) => {
      try {
         const updated = await updateProject(
            project._id,
            updatedData,
            editProject,
         );
         setProject(updated);
         setShowEditModal(false);
         setSuccess("Project updated successfully 🎉");
      } catch (err: any) {
         setLocalError(err.message || "Failed to update project");
      }
   };

   /* Loading state */
   if (loading) return <Spinner />;

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

   if (!project) return null;

   return (
      <div className="project-details-container">
         {/* Success Toast */}
         {success && <ToastMessage message={success} />}

         {/* Header */}
         <div className="project-details-header">
            <h1>{project.name}</h1>
            {project.status && (
               <span className={`status ${project.status.toLowerCase()}`}>
                  {project.status}
               </span>
            )}
         </div>

         {/* Description */}
         <div className="project-description">
            <p>{project.description}</p>
         </div>

         {/* Actions */}
         <div className="project-details-actions">
            <button className="edit-btn" onClick={() => setShowEditModal(true)}>
               Edit
            </button>

            <button className="delete-btn" onClick={handleDelete}>
               Delete
            </button>

            <button className="back-btn" onClick={() => navigate("/projects")}>
               Back
            </button>
         </div>

         {/* Edit Modal */}
         {showEditModal && (
            <Modal onClose={() => setShowEditModal(false)}>
               <ProjectForm
                  project={project}
                  isEdit
                  onClose={() => setShowEditModal(false)}
                  onProjectCreated={() => {}}
                  onProjectUpdated={handleUpdate}
               />
            </Modal>
         )}
      </div>
   );
}
