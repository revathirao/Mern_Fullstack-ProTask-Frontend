import type { TaskItemProps } from "../../../types";
import "./TaskItem.css";

/**
 * TaskItem Component
 * - Represents a single task row in the TaskList
 * - Displays: Title | Description | Status | Priority | Actions
 **@param task - The task object to display
 * @param onEdit - Function called when user clicks edit
 * @param onDelete - Function called when user clicks delete
 * @returns JSX.Element - single task row
 */
export default function TaskItem({ task, onEdit, onDelete }: TaskItemProps) {
   return (
      <div className="task-item-row">
         {/* Column 1: Task Title */}
         <div className="task-item-column task-title">{task.title}</div>

         {/* Column 2: Task Description (optional) */}
         <div className="task-item-column task-desc">
            {task.description || "-"}
         </div>

         {/* Column 3: Status */}
         <div className="task-item-column task-status">
            {/* Fallback to "todo" if undefined */}
            <span
               className={`status-badge ${task.status?.toLowerCase() || "todo"}`}>
               {task.status || "todo"}
            </span>
         </div>

         {/* Column 4: Priority */}
         <div className="task-item-column task-priority">
            <span
               className={`priority-badge ${task.priority?.toLowerCase() || "low"}`}>
               {task.priority || "low"}
            </span>
         </div>

         {/* Column 5: Actions */}
         <div className="task-item-column task-actions">
            <button
               className="edit-btn"
               onClick={() => onEdit(task)}
               title="Edit Task">
               ✏️
            </button>
            <button
               className="delete-btn"
               // onClick={() => onDelete(task._id)}
               onClick={() => {
                  if (!task._id) return alert("Task ID missing!");
                  onDelete(task._id);
               }}
               title="Delete Task">
               🗑️
            </button>
         </div>
      </div>
   );
}
