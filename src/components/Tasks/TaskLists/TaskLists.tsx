import TaskItem from "../TaskItem/TaskItem";
import type { Task } from "../../../types";

interface TaskListProps {
   tasks: Task[];
   onEdit: (task: Task) => void;
   onDelete: (taskId: string) => void;
}

export default function TaskList({ tasks, onEdit, onDelete }: TaskListProps) {
   if (tasks.length === 0) {
      return <p>No tasks found.</p>;
   }

   return (
      <div className="task-list">
         <div className="task-list-header">
            <span>Title</span>
            <span>Description</span>
            <span>Status</span>
            <span>Priority</span>
            <span>Actions</span>
         </div>

         {tasks.map((task) => (
            <TaskItem
               key={task._id}
               task={task}
               onEdit={() => onEdit(task)}
               onDelete={() => onDelete(task._id!)}
            />
         ))}
      </div>
   );
}
