import { useState, useEffect, type FormEvent } from "react";
import axios from "axios";
import type { TaskFormProps } from "../../../types";

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

         
      </form>
   );
}
