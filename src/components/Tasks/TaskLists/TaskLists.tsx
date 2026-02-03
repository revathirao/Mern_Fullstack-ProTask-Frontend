import { useState, useContext } from "react";
import { AuthContext } from "../../../context/authContext";
import TaskItem from "../TaskItem/TaskItem";
import TaskForm from "../TaskForm/TaskForm";
import { useTasks } from "../../../hooks/useTasks";
import type { Task, TaskProps } from "../../../types";
import "./TaskList.css";

/**
 * TaskList Component
 * Displays all tasks for a project and allows creating new tasks.
 * Uses `useTasks` hook for centralized task state & CRUD operations.
 */
export default function TaskList({ projectId }: TaskProps) {
   const { token } = useContext(AuthContext);

   if (!projectId || !token) return null;

   // Hook managing tasks
   const { tasks, loading, error, addTask, removeTask } = useTasks(
      projectId,
      token,
   );

   // Show/hide the TaskForm for adding a new task
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
         await addTask(taskBody); // Create task via hook
         setToastMessage("Task added successfully! 🎉");
         setShowForm(false); // Close form after creation
      } catch (err) {
         console.error("Failed to add task:", err);
      }
   }

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

   return (
      <div className="task-list">
         <h3>Project Tasks</h3>
         <h3>Tasks</h3>

         {/* Success / Toast message */}
         {toastMessage && (
            <div className="toast-message" onClick={() => setToastMessage("")}>
               {toastMessage}
            </div>
         )}

         {/* Toggle Add Task Form */}
         <button onClick={() => setShowForm((prev) => !prev)}>
            {showForm ? "Close Form" : "Add New Task"}
         </button>

         {/* Task Form for creating a new task */}
         {showForm && (
            <TaskForm
               projectId={projectId}
               onTaskCreated={handleCreateTask}
               onClose={() => setShowForm(false)}
            />
         )}

         {/* Loading and error states */}
         {loading && <p>Loading tasks…</p>}
         {error && <p className="error">{error}</p>}

         {/* List of tasks */}
         {tasks.length === 0 && !loading ? (
            <p>No tasks found. Add your first task!</p>
         ) : (
            tasks.map((task: Task) => (
               <TaskItem
                  key={task._id}
                  task={task}
                  onEdit={() => {}}
                  onDelete={handleDelete}
               />
            ))
         )}
      </div>
   );
}
