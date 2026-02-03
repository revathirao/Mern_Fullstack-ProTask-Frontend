import axios from "axios";

/*Base URL for all task-related API calls
    - All task routes are nested under projects, e.g., 
    POST /api/projects/:projectId/tasks
  - Having a BASE_URL makes it easier to maintain
*/
const BASE_URL = `${import.meta.env.VITE_API_URL}/api/projects`;
const BASE_URL_TASK = `${import.meta.env.VITE_API_URL}/api/tasks`; // for tasks (Delete nad Updat)

/*
 * Fetch all tasks for a given project
 * @param projectId - ID of the project whose tasks we want
 * @param token - JWT for authentication
 * @returns Array of tasks
 */
export async function fetchTasks(projectId: string, token: string) {
   try {
      if (!token || !projectId)
         throw new Error("Missing auth token or projectId"); // Safety check

      // Axios GET request to /api/projects/:projectId/tasks
      const response = await axios.get(`${BASE_URL}/${projectId}/tasks`, {
         headers: {
            Authorization: `Bearer ${token}`, // Include JWT in request headers
         },
      });

      // Return the array of tasks from the API
      return response.data;
   } catch (error: any) {
      // Throw the error so the calling component can handle it
      //   throw new Error(error.response?.data?.message || error.message);
      console.error(
         "Error fetching tasks:",
         error.response?.data?.message || error.message,
      );
      throw error;
   }
}

/**
 * Create a new task for a specific project
 **@param projectId - ID of the project this task belongs to
 * @param  Body - Task payload (title, description, status, priority, etc.)
 * @param token - Auth token for protected route
 **@returns Newly created task from backend
 */
export async function createTask(projectId: string, body: any, token: string) {
   try {
      if (!token) throw new Error("No auth token provided"); // Safety check

      const response = await axios.post(
         `${BASE_URL}/${projectId}/tasks`,
         body,
         {
            headers: {
               Authorization: `Bearer ${token}`,
            },
         },
      );
      console.log("Tasks created successfully 🎉");
      // Return created task
      return response.data;
   } catch (error: any) {
      console.error(
         "Error creating tasks:",
         error.response?.data?.message || error.message,
      );
      throw error;
   }
}

/**
 * Update an existing task
 **@param projectId - Parent project ID
 * @param taskId - Task ID to update
 * @param body - Updated task fields
 * @param token - Auth token
 **@returns Updated task
 */
export async function updateTask(
   projectId: string,
   taskId: string,
   body: any,
   token: string,
) {
   try {
      if (!token) throw new Error("No auth token provided");

      const response = await axios.put(`${BASE_URL_TASK}/${taskId}`, body, {
         headers: {
            Authorization: `Bearer ${token}`,
         },
      });

      return response.data;
   } catch (error: any) {
      console.error(
         "Error updating tasks:",
         error.response?.data?.message || error.message,
      );
      throw error;
   }
}

/**
 * Delete a task
 * @param projectId - Parent project ID
 * @param taskId - Task ID to delete
 * @param token - Auth token
 */
export async function deleteTask(
   // projectId: string,
   taskId: string,
   token: string,
) {
   try {
      if (!token) throw new Error("No auth token provided");

      const response = await axios.delete(
         // `${BASE_URL}/tasks/${taskId}`,
         `${BASE_URL_TASK}/${taskId}`,

         {
            headers: {
               Authorization: `Bearer ${token}`,
            },
         },
      );

      console.log("Task deleted successfully 🎉");
      return response.data;
   } catch (error: any) {
      console.error(
         "Error deleting task:",
         error.response?.data?.message || error.message,
      );
      throw error;
   }
}
