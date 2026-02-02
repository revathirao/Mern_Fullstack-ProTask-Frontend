import { useEffect, useState, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../../../context/authContext";
import type { Task, TaskProps } from "../../../types";
import TaskItem from "../TaskItem/TaskItem";
import TaskForm from "../TaskForm/TaskForm";
// import TaskRow from "./TaskRow";
// import TaskForm from "./TaskForm";

export default function TaskList({ projectId }: TaskProps) {
   const { token } = useContext(AuthContext);
   const [tasks, setTasks] = useState<Task[]>([]);
   // State to store error messages
   const [error, setError] = useState("");

   // Track loading state to control Spinner visibility
   const [isLoading, setIsLoading] = useState<boolean>(false);

   useEffect(() => {
      fetchTasks();
   }, [projectId]);

   async function fetchTasks() {
      try {
         setIsLoading(true);
         setError("");

         const res = await axios.get(
            ` ${import.meta.env.VITE_API_URL}/api/projects/${projectId}/tasks`,
            {
               headers: { Authorization: `Bearer ${token}` },
            },
         );
         console.log("Fetched Tasks:", res.data);
         setTasks(res.data);
      } catch (err: any) {
         // Log specific error messages from the server response or general network errors
         console.error(
            "Failed to fetch tasks:",
            err.response?.data?.message || err.message,
         );
      } finally {
         setIsLoading(false);
      }
   }

   const handleDelete = async (taskId: string) => {
      await axios.delete(
         ` ${import.meta.env.VITE_API_URL}/api/projects/${projectId}/tasks/${taskId}`,
         {
            headers: { Authorization: `Bearer ${token}` },
         },
      );
      setTasks((prev) => prev.filter((t) => t._id !== taskId));
   };

   function handleSave(savedTask: Task) {
      setTasks((prev) => {
         const exists = prev.find((t) => t._id === savedTask._id);
         if (exists) {
            return prev.map((t) => (t._id === savedTask._id ? savedTask : t));
         }
         return [...prev, savedTask];
      });
      setEditingTask(null);
   }

   if (isLoading) return <p>Loading tasks…</p>;

   return (
      <div>
         <h3>Tasks</h3>

         <TaskForm
            projectId={projectId}
            task={editingTask}
            onSave={handleSave}
            onCancel={() => setEditingTask(null)}
         />

         <table>
            <thead>
               <tr>
                  <th>Title</th>
                  <th>Priority</th>
                  <th>Status</th>
                  <th />
               </tr>
            </thead>
            <tbody>
               {tasks.map((task) => (
                  <TaskItem
                     key={task._id}
                     task={task}
                     onEdit={setEditingTask}
                     onDelete={handleDelete}
                  />
               ))}
            </tbody>
         </table>
      </div>
   );
}
