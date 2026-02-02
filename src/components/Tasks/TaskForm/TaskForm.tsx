import { useState, useEffect, type FormEvent } from "react";
import axios from "axios";
import type { TaskFormProps } from "../../../types";
import ErrorMessage from "../../SharedComponents/ErrorHandler/ErrorHandler";

/**
 * TaskForm Component
 * Handles both creating a new task and editing an existing task.
 */
export default function TaskForm({
   projectId,
   task,
   onTaskCreated,
   onTaskUpdated,
   onClose,
}: TaskFormProps) {
   // Local state for form fields
   const [title, setTitle] = useState(task?.title || "");
   const [description, setDescription] = useState(task?.description || "");
   const [status, setStatus] = useState(task?.status || "To Do");
   const [priority, setPriority] = useState(task?.priority || "Medium"); // Optional: Priority
   const [error, setError] = useState("");

   // Track loading state during API requests
   const [isSubmitting, setIsSubmitting] = useState(false);

   // Function to handle form submission
   const handleSubmit = async (e: FormEvent) => {
      e.preventDefault();
      // We will fill API calls here next
   };

   return (
      <form onSubmit={handleSubmit} className="task-form">
         {/* Title Field  */}
         <div className="form-group">
            <label htmlFor="title">
               Title <span style={{ color: "red" }}>*</span>
            </label>
            <input
               type="text"
               id="title"
               value={title} // controlled input using state
               onChange={(e) => setTitle(e.target.value)} // update state on change
               placeholder="Enter task title"
               required // HTML5 validation
            />
         </div>

         {/*  Description field*/}
         <div className="form-group">
            <label htmlFor="Description">Description </label>
            <textarea
               id="description"
               value={description} // controlled input using state
               onChange={(e) => setDescription(e.target.value)} // update state on change
               placeholder="Enter task description"
            />
         </div>

         {/* Status Select */}
         <div className="form-group">
            <label htmlFor="status">Status</label>
            <select
               id="status"
               value={status}
               onChange={(e) => setStatus(e.target.value)}>
               <option value="To Do">To Do</option>
               <option value="In Progress">In Progress</option>
               <option value="Done">Done</option>
            </select>
         </div>

         {/* PrioritySelect */}
         <div className="form-group">
            <label htmlFor="priority">Priority</label>
            <select
               id="priority"
               value={priority}
               onChange={(e) => setPriority(e.target.value)}>
               <option value="Low">Low</option>
               <option value="Medium">Medium</option>
               <option value="High">High</option>
            </select>
         </div>

         {/* Display an inline error message if the 'error' state contains a value
          *Shows validation errors (e.g., empty project name)*/}
         {error && <ErrorMessage message={error} />}

         {/* Form Acion Buttons */}

         <div className="form-actions">
            <button type="submit" disabled={isSubmitting}>
               {task ? "Update Task" : "Create Task"}
            </button>
            <button type="button" onClick={onClose}>
               Cancel
            </button>
         </div>
      </form>
   );
}
