import { useState } from "react";
import {
   fetchProjects,
   fetchProjectById,
   createProject,
   updateProject,
   deleteProject,
} from "../services/projectApi";

/**
 * useProject Hook
 ** Centralized project state + CRUD logic for projects.
 * This hook:
 * - Fetches projects
 * - Creates new projects
 * - Updates existing projects
 * - Deletes projects
 * - Manages loading & error state
 * * UI components should ONLY call these functions.
 * @param token - Auth token for protected API calls
 **@returns Task state + CRUD handlers
 */
export function useProjects(token: string) {
   // Holds all projects
   const [projects, setProjects] = useState<any[]>([]);

   // Indicates API activity (used for spinners)
   const [loading, setLoading] = useState<boolean>(false);

   // Holds API error messages (shown in UI)
   const [error, setError] = useState<string>("");

   /**
    * Fetch all projects
    **- Sets loading state
    * - Calls API
    * - Stores projects in state
    */
   async function loadProjects() {
      try {
         setLoading(true); // Start loading
         setError(""); // Reset previous errors

         const data = await fetchProjects(token);
         // Ensure we store an array in state
         setProjects(Array.isArray(data) ? data : data.projects || []); //save projects to state
      } catch (error: any) {
         setError(error.message || "Failed to load projects");
      } finally {
         setLoading(false); //stoploadingsuccess or error
      }
   }

   /**
    * Fetch  project by id
    **- Sets loading state
    * - Calls API
    * - Stores projects in state
    */
   async function loadProjectId(projectId: string) {
      try {
         setLoading(true); // Start loading
         setError(""); // Reset previous errors

         const data = await fetchProjectById(token, projectId);
         console.log("TOKEN:", token);
         setProjects([data]); //save projects to state
      } catch (error: any) {
         setError(error.message || "Failed to load project by Id");
      } finally {
         setLoading(false); //stoploadingsuccess or error
      }
   }

   /**
    * Create a new project
    **@param body - project fields (title, description, status, etc.)
    **@returns Newly created project
    */
   async function addProject(projectBody: any) {
      try {
         setLoading(true); // Start loading
         setError(""); // Reset previous errors
         const newProject = await createProject(projectBody, token);

         // Add new project to existing list
         setProjects((prev) => [...prev, { ...projectBody, ...newProject }]);
         return newProject;
      } catch (error: any) {
         setError(error.message || "Failed to add project");
      } finally {
         setLoading(false); //stoploadingsuccess or error
      }
   }

   /**
    * Update an existing Project
    **@param ProjectId - ID of the project to update
    * @param projectBody - Updated project fields
    **@returns Updated project
    */
   async function editProject(projectId: string, projectBody: any) {
      try {
         setLoading(true); // Start loading
         setError(""); // Reset previous errors
         const updatedProject = await updateProject(
            projectId,
            projectBody,
            token,
         );

         // Replace updated project in state
         setProjects((prev) =>
            prev.map((proj) =>
               proj._id === projectId
                  ? { ...proj, ...projectBody, ...updatedProject }
                  : proj,
            ),
         );

         return updatedProject;
      } catch (error: any) {
         setError(error.message || "Failed to update project");
      } finally {
         setLoading(false); //stoploadingsuccess or error
      }
   }

   /**
    * Delete a project
    ** @param ProjectId - ID of the Project to delete
    */
   async function removeProject(projectId: string) {
      try {
         setLoading(true); // Start loading
         setError(""); // Reset previous errors

         await deleteProject(projectId, token);

         // Remove deleted project from state
         setProjects((prev) =>
            prev.filter((project) => project._id !== projectId),
         );
      } catch (error: any) {
         setError(error.message || "Failed to delete tasks");
      } finally {
         setLoading(false); //stoploadingsuccess or error
      }
   }

   /**
    * Expose task state and handlers to components
    */
   return {
      projects,
      loading,
      error,
      loadProjects,
      loadProjectId,
      addProject,
      editProject,
      removeProject,
   };
}
