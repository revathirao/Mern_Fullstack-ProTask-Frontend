import { useState, useContext, useEffect } from "react";
import { AuthContext } from "../../../context/authContext";
import TaskItem from "../TaskItem/TaskItem";
import TaskForm from "../TaskForm/TaskForm";
import { useTasks } from "../../../hooks/useTasks";
import type { Task, TaskProps } from "../../../types";
import Modal from "../../SharedComponents/Modal/Modal";
import "./TaskLists.css";

/**
 * TaskList component
 * - Displays all tasks for a single project in a clean grid/table layout
 *  * Uses `useTasks` hook for centralized task state & CRUD operations.
 * @param projectId - ID of the current project
 * @returns JSX.Element - task list with header row and TaskItem rows
 */
export default function TaskList({ projectId }: TaskProps) {
   const { token } = useContext(AuthContext);
   const [editingTask, setEditingTask] = useState<Task | null>(null);

   if (!projectId || !token) return null;

   // Hook to fetch and manage tasks
   const { tasks, loading, error, addTask, loadTasks, removeTask, editTask } =
      useTasks(projectId, token);

   // Show/hide the TaskForm for adding a new task Local state for controlling "Add Task" modal
   const [showForm, setShowForm] = useState(false);

   // Optional: Show success messages
   const [toastMessage, setToastMessage] = useState("");

   /**
    * Handle creating a new task
    * Calls the hook's `addTask` and updates UI
    */
   async function handleCreateTask(taskBody: {
      title: string;
      description?: string;
      status?: string;
      priority?: string;
   }) {
      try {
         // Normalize task BEFORE sending it
         const normalizedTask = {
            ...taskBody,
            status: taskBody.status ?? "todo",
            priority: taskBody.priority ?? "low",
         };
         await addTask(normalizedTask); // hook handles projectId
         setToastMessage("Task added successfully! 🎉");
         setShowForm(false); // Close form after creation
      } catch (err) {
         console.error("Failed to add task:", err);
      }
   }

   /**
    * handleUpdateTask
    ** This function is called when the user submits the TaskForm
    * while editing an existing task.
    **@param taskData - The updated task object coming from the TaskForm.
    * It includes all task fields (title, description, status, etc.)
    * and MUST include `_id` so we know which task to update.
    */
   const handleUpdateTask = async (taskData: Task) => {
      // Safety check:
      // If the task does not have an ID, we cannot update it
      // (because the backend needs an ID to find the task)
      if (!taskData._id) return;

      // Call the editTask function (from useTasks hook)
      // Sends the updated task data to the backend API
      await editTask(taskData._id, taskData);

      // Clear the currently editing task
      // (so the UI knows we are done editing)
      setEditingTask(null);

      // Hide the task form after successful update
      setShowForm(false);

      // Show success feedback to the user
      setToastMessage("Task updated successfully ✨");
   };

   /**
    * Handle deleting a task
    * Calls the hook's removeTask
    */
   const handleDelete = async (taskId: string) => {
      try {
         await removeTask(taskId);
         setToastMessage("Task deleted successfully! 🗑️");
      } catch (err) {
         console.error("Failed to delete task:", err);
      }
   };

   // Open edit form
   const handleEdit = (task: Task) => {
      setEditingTask(task);
      setShowForm(true);
   };

   useEffect(() => {
      loadTasks();
   }, [projectId]);

   return (
      <div className="task-list-container">
         <h3>Project Tasks</h3>
         <h3>Tasks</h3>

         {/* Success / Toast message */}
         {toastMessage && (
            <div className="toast-message" onClick={() => setToastMessage("")}>
               {toastMessage}
            </div>
         )}

         {/* Toggle Add Task Form */}
         <button
            className="add-task-btn"
            onClick={() => setShowForm((prev) => !prev)}>
            {showForm ? "Close Form" : "Add New Task"}
         </button>

         {/* Task Form for creating a new task */}
         {showForm && (
            <Modal onClose={() => setShowForm(false)}>
               <TaskForm
                  projectId={projectId}
                  task={editingTask ?? undefined}
                  onTaskCreated={handleCreateTask}
                  onTaskUpdated={handleUpdateTask}
                  onClose={() => setShowForm(false)}
               />
            </Modal>
         )}

         {/* Loading and error states */}
         {loading && <p>Loading tasks…</p>}
         {error && <p className="error">{error}</p>}

         <div className="task-list">
            {/* Table/grid headers */}

            <div className="task-list-header">
               <span>Task Name</span>
               <span>Description</span>
               <span>Status</span>
               <span>Priority</span>
               <span>Actions</span>
            </div>

            {/* List of tasks */}
            {tasks.length > 0 && !loading ? (
               // {!loading && tasks.length === 0 ? (
               <p>No tasks found. Add your first task!</p>
            ) : (
               tasks.map((task: Task) => (
                  <TaskItem
                     // key={task._id}
                     key={`${task._id}-${task.title}`}
                     task={task}
                     onEdit={() => handleEdit(task)}
                     onDelete={handleDelete}
                  />
               ))
            )}
         </div>
      </div>
   );
}
