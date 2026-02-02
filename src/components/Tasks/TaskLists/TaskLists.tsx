import { useEffect, useState, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../../../context/authContext";
import type { Task, TaskProps } from "../../../types";
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
         setLoading(false);
      }
   }
}
