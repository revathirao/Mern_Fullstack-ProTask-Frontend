import axios from "axios";

/*Base URL for all project-related API calls
  - Having a BASE_URL makes it easier to maintain
*/
const BASE_URL = `${import.meta.env.VITE_API_URL}/api/projects`;

/*
 * Fetch all projects for a owner
 * @param token - JWT for authentication
 * @returns Array of [projects]
 */
export async function fetchProjects(token: string) {
   try {
      if (!token) throw new Error("No auth token provided"); // Safety check

      // Axios GET request to /api/projects
      const response = await axios.get(`${BASE_URL}`, {
         headers: {
            Authorization: `Bearer ${token}`, // Include JWT in request headers
         },
      });

      // Return the array of projects from the API
      return response.data;
   } catch (error: any) {
      // Throw the error so the calling component can handle it
      console.error(
         "Error fetching projects:",
         error.response?.data?.message || error.message,
      );
      throw error;
   }
}

/*
 * Fetch  projects by projectId
 * @param token - JWT for authentication
 * @returns Array of [projects]
 */
export async function fetchProjectById(token: string, projectId: string) {
   try {
      if (!token) throw new Error("No auth token provided"); // Safety check

      // Axios GET request to /api/projects/projectid
      const response = await axios.get(`${BASE_URL}/${projectId}`, {
         headers: {
            Authorization: `Bearer ${token}`, // Include JWT in request headers
         },
      });

      // Return  a projects from the API
      return response.data;
   } catch (error: any) {
      // Throw the error so the calling component can handle it
      console.error(
         "Error fetching project:",
         error.response?.data?.message || error.message,
      );
      throw error;
   }
}

/**
 * Create a new project for a specific project
 * @param  Body - Task payload (title, description, status, priority, etc.)
 * @param token - Auth token for protected route
 ** @returns Newly created project from backend
 */
export async function createProject(body: any, token: string) {
   try {
      if (!token) throw new Error("No auth token provided"); // Safety check

      const response = await axios.post(`${BASE_URL}`, body, {
         headers: {
            Authorization: `Bearer ${token}`,
         },
      });
      console.log("projects created successfully 🎉");
      // Return created project
      return response.data;
   } catch (error: any) {
      console.error(
         "Error creating projects:",
         error.response?.data?.message || error.message,
      );
      throw error;
   }
}

/**
 * Update an existing project
 **@param projectId to update
 * @param body - Updated project fields
 * @param token - Auth token
 **@returns Updated project
 */
export async function updateProject(
   projectId: string,
   body: any,
   token: string,
) {
   try {
      if (!token) throw new Error("No auth token provided"); // Safety check

      const response = await axios.put(`${BASE_URL}/${projectId}`, body, {
         headers: {
            Authorization: `Bearer ${token}`,
         },
      });
      return response.data;
   } catch (error: any) {
      console.error(
         "Error updating project:",
         error.response?.data?.message || error.message,
      );
      throw error;
   }
}

/**
 * Delete a project
 **@param projectId - project ID to delete
 * @param token - Auth token
 */
export async function deleteProject(projectId: string, token: string) {
   try {
      if (!token) throw new Error("No auth token provided"); // Safety check

      const response = await axios.delete(
         `${import.meta.env.VITE_API_URL}/${projectId}`,
         {
            headers: {
               Authorization: `Bearer ${token}`,
            },
         },
      );
      console.log("Projects deleted successfully 🎉");
      return response.data;
   } catch (error: any) {
      console.error(
         "Error deleting projects:",
         error.response?.data?.message || error.message,
      );
      throw error;
   }
}
