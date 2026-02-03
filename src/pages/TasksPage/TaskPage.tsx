import { useParams, Link } from "react-router-dom";
import TaskForm from "../../components/Tasks/TaskForm/TaskForm";
import TaskList from "../../components/Tasks/TaskLists/TaskLists";
import { useTasks } from "../../hooks/useTasks";

import { useContext, useState } from "react";
import { AuthContext } from "../../context/authContext";

/**
 * TasksPage
 * Responsible ONLY for task-related logic of a project.
 * - Reads projectId from URL
 * - Fetches tasks for that project
 * - Renders TaskForm + TaskList
 */
export function TasksPage() {
   const { projectId } = useParams<{ projectId: string }>();

   const { token } = useContext(AuthContext);
   // const [showForm, setShowForm] = useState(false); // toggle TaskForm visibility

   // Filters
   const [statusFilter, setStatusFilter] = useState("");
   const [priorityFilter, setPriorityFilter] = useState("");
   const [searchQuery, setSearchQuery] = useState("");
   if (!projectId || !token) return <p>Invalid project ID and Token</p>;

   return (
      <div>
         <h1>Project Tasks Page</h1>
         <p>Project ID: {projectId}</p>

         {/* Button to show TaskForm */}
         {/* {!showForm && (
            <button onClick={() => setShowForm(true)}>+ Add Task</button>
         )} */}

         {/* Render TaskList using projectId only */}
         {projectId && <TaskList projectId={projectId} />}

         {/* TaskForm */}
         {projectId && <TaskForm projectId={projectId} onClose={() => {}} />}

         <Link to={`/projects/${projectId}`}>← Back to Project</Link>
      </div>
   );
}

export default TasksPage;
