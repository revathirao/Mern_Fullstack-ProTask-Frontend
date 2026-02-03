import type { TaskItemProps } from "../../../types";

// Functional component for a single task row
export default function TaskItem({ task, onEdit, onDelete }: TaskItemProps) {
   return (
      <div className="task-item" /* Main container for the row */>
         {/* Left side: Task details */}
         <div className="task-info">
            <h4 className="task-title">{task.title}</h4>
            {task.description && (
               <p className="task-desc">{task.description}</p>
            )}
         </div>

         {/* Middle: Status and Priority */}
         <div className="task-meta">
            <span className={`status ${task.status.toLowerCase() ?? "todo"}`}>
               {task.status}
            </span>
            <span
               className={`priority ${task.priority.toLowerCase() ?? "low"}`}>
               {task.priority}
            </span>
         </div>

         {/* Right side: Action buttons */}
         <div className="task-actions">
            <button onClick={() => onEdit(task)} className="edit-btn">
               Edit
            </button>
            <button onClick={() => onDelete(task._id)} className="delete-btn">
               Delete
            </button>
         </div>
      </div>
   );
}
