import { useState } from "react";
import {
   fetchTasks,
   createTask,
   updateTask,
   deleteTask,
} from "../services/taskApi";

/**
 * useTasks Hook
 ** Centralized task state + CRUD logic for a single project.
 * This hook:
 * - Fetches tasks for a project
 * - Creates new tasks
 * - Updates existing tasks
 * - Deletes tasks
 * - Manages loading & error state
 * * UI components should ONLY call these functions.
 **@param projectId - ID of the project whose tasks are managed
 * @param token - Auth token for protected API calls
 **@returns Task state + CRUD handlers
 */
export function useTasks(projectId: string, token: string) {
   // Holds all tasks for the project
   const [tasks, setTasks] = useState<any[]>([]);

   // Indicates API activity (used for spinners)
   const [loading, setLoading] = useState<boolean>(false);

   // Holds API error messages (shown in UI)
   const [error, setError] = useState<string>("");

   /**
    * Fetch all tasks for the current project
    **- Sets loading state
    * - Calls API
    * - Stores tasks in state
    */
   async function loadTasks() {
      try {
         setLoading(true); // Start loading
         setError(""); // Reset previous errors

         const data = await fetchTasks(projectId, token);
         console.log("Fetched tasks:", data);
         // setTasks(data); //save tasks to state
         // setTasks(Array.isArray(data) ? data : []);
         setTasks(Array.isArray(data.tasks) ? data.tasks : data);
      } catch (error: any) {
         setError(error.message || "Failed to load tasks");
      } finally {
         setLoading(false); //stoploadingsuccess or error
      }
   }

   /**
    * Create a new task
    ** @param body - Task fields (title, description, status, priority, etc.)
    ** @returns Newly created task
    */
   async function addTask(taskBody: any) {
      try {
         setLoading(true); // Start loading
         setError(""); // Reset previous errors
         const newTask = await createTask(projectId, taskBody, token);

         // Add new task to existing list
         setTasks((prev) => [...prev, newTask]);
         return newTask;
      } catch (error: any) {
         setError(error.message || "Failed to add tasks");
      } finally {
         setLoading(false); //stoploadingsuccess or error
      }
   }

   /**
    * Update an existing task
    **@param taskId - ID of the task to update
    * @param taskData - Updated task fields
    **@returns Updated task
    */
   async function editTask(taskId: string, taskBody: any) {
      try {
         setLoading(true); // Start loading
         setError(""); // Reset previous errors
         const updatedTask = await updateTask(
            projectId,
            taskId,
            taskBody,
            token,
         );

         // Replace updated task in state
         // setTasks((prev) =>
         //    prev.map((task) => (task._id === taskId ? updatedTask : task)),
         // setTasks((prevTasks) =>
         //    prevTasks.map((task) =>
         //       task.id === taskId ? { ...task, ...updatedTask } : task,
         //    ),

         // 2. Update state immediately
         setTasks((prev) =>
            prev.map((task) =>
               // If IDs match, merge the old task, the new body, and the API response
               task._id === taskId
                  ? { ...task, ...taskBody, ...updatedTask }
                  : task,
            ),
         );

         return updatedTask;
      } catch (error: any) {
         setError(error.message || "Failed to update tasks");
      } finally {
         setLoading(false); //stoploadingsuccess or error
      }
   }

   /**
    * Delete a task
    ** @param taskId - ID of the task to delete
    */
   async function removeTask(taskId: string) {
      try {
         setLoading(true); // Start loading
         setError(""); // Reset previous errors

         await deleteTask(taskId, token);

         // Remove deleted task from state
         setTasks((prev) => prev.filter((task) => task._id !== taskId));
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
      tasks,
      loading,
      error,
      loadTasks,
      addTask,
      editTask,
      removeTask,
   };
}
