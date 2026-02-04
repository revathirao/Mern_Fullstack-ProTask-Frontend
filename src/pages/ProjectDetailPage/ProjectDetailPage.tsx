import { useContext, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useProjects } from "../../hooks/useProjects";
import { AuthContext } from "../../context/authContext";
import ProjectForm from "../../components/Projects/ProjectForm/ProjectForm";
import Modal from "../../components/SharedComponents/Modal/Modal";
import Spinner from "../../components/SharedComponents/Spinner/Spinner";
import ToastMessage from "../../components/SharedComponents/ToastMessage/ToastMessage";
import {
   deleteProject as deleteProjectAction,
   updateProject as updateProjectAction,
} from "../../utils/projectUtils";
import "./ProjectDetailPage.css";

/**
 * ProjectDetails Page
 * - View single project info
 * - Edit project
 * - Delete project
 * - Navigates to tasks page
 */
export default function ProjectDetails() {
   const { id } = useParams<{ id: string }>();
   const navigate = useNavigate();
   const { token } = useContext(AuthContext);

   const { projects, loading, loadProjectId, editProject, removeProject } =
      useProjects(token || "");

   const [project, setProject] = useState<any>(null);
   const [showEditModal, setShowEditModal] = useState(false);
   const [success, setSuccess] = useState("");

   /* Load projects if not already loaded */
   useEffect(() => {
      if (id) {
         loadProjectId(id);
      }
   }, [id]);

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
         await deleteProjectAction(project._id, removeProject);
         setSuccess("Project deleted successfully 🎉");
         setTimeout(() => navigate("/projects"), 1500);
      } catch (err: any) {
         setSuccess(""); // clear previous success
         alert(err.message || "Failed to delete project"); // or toast error
      }
   };

   /* Update handler */
   const handleUpdate = async (updatedData: any) => {
      try {
         const updated = await updateProjectAction(
            project._id,
            updatedData,
            editProject,
         );
         setProject(updated); // update local state
         setShowEditModal(false); //close modal
         setSuccess("Project updated successfully 🎉"); //show toast
         // navigate after small delay
         setTimeout(
            () => navigate("/projects", { state: { refetch: true } }),
            10000,
         );
      } catch (err: any) {
         setSuccess(""); // clear previous success
         alert(err.message || "Failed to delete project"); // or toast error         }
      }
   };

   /* Loading state */
   if (loading) return <Spinner />;

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

            <button
               className="tasks-btn"
               onClick={() => navigate(`/projects/${project._id}/tasks`)}>
               View Tasks
            </button>

            <button className="back-btn" onClick={() => navigate("/projects")}>
               Back
            </button>
         </div>

         {/* Edit Modal */}
         {showEditModal && (
            <Modal onClose={() => setShowEditModal(false)}>
               <ProjectForm
                  editProject={project}
                  onClose={() => setShowEditModal(false)}
                  onProjectCreated={() => {}}
                  onProjectUpdated={handleUpdate}
               />
            </Modal>
         )}
      </div>
   );
}
