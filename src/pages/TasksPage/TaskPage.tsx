import { useContext, useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { AuthContext } from "../../context/authContext";
import { useTasks } from "../../hooks/useTasks";
import TaskList from "../../components/Tasks/TaskLists/TaskLists";
import TaskForm from "../../components/Tasks/TaskForm/TaskForm";
import Modal from "../../components/SharedComponents/Modal/Modal";
import type { Task } from "../../types";
import "./TaskPage.css";

export default function TasksPage() {
   const { projectId } = useParams<{ projectId: string }>();
   const { token } = useContext(AuthContext);

   if (!projectId || !token) return null;

   const { tasks, loading, addTask, editTask, removeTask, loadTasks } =
      useTasks(projectId, token);

   const [searchTerm, setSearchTerm] = useState("");
   const [showForm, setShowForm] = useState(false);
   const [editingTask, setEditingTask] = useState<Task | null>(null);
   const [statusFilter, setStatusFilter] = useState<
      "All" | "To Do" | "In Progress" | "Done"
   >("All");
   const [priorityFilter, setPriorityFilter] = useState<
      "All" | "Low" | "Medium" | "High"
   >("All");

   useEffect(() => {
      loadTasks();
   }, [projectId]);

   // FILTER
   const filteredTasks = tasks.filter((task) => {
      const searchMatched =
         task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
         task.description?.toLowerCase().includes(searchTerm.toLowerCase());

      const statusMatched =
         statusFilter === "All" ||
         task.status?.toLowerCase() === statusFilter.toLowerCase();

      const priorityMatched =
         priorityFilter === "All" ||
         task.priority?.toLowerCase() === priorityFilter.toLowerCase();

      return searchMatched && statusMatched && priorityMatched;
   });

   // STATS
   const total = tasks.length;
   const todo = tasks.filter((t) => t.status === "To Do").length;
   const inProgress = tasks.filter((t) => t.status === "In Progress").length;
   const done = tasks.filter((t) => t.status === "Done").length;

   return (
      <div className="task-page-container">
         <h2>Project Tasks</h2>
         <Link to={`/projects/${projectId}`} className="back-btn">
            ← Back to Project
         </Link>

         {/*  TASK STATS */}
         {!loading && tasks.length > 0 && (
            <div className="task-stats">
               <div className="stat total">
                  Total
                  <br />
                  {total}
               </div>
               <div className="stat todo">
                  To Do
                  <br />
                  {todo}
               </div>
               <div className="stat inprogress">
                  In Progress
                  <br />
                  {inProgress}
               </div>
               <div className="stat done">
                  Done
                  <br />
                  {done}
               </div>
            </div>
         )}

         {/* SEARCH + FILTER + ADD BUTTON */}
         <div className="task-controls-wrapper">
            <input
               type="text"
               placeholder="Search tasks..."
               value={searchTerm}
               onChange={(e) => setSearchTerm(e.target.value)}
               className="task-search-input"
            />

            <select
               value={statusFilter}
               onChange={(e) => setStatusFilter(e.target.value as any)}>
               <option value="All">All Status</option>
               <option value="To Do">To Do</option>
               <option value="In Progress">In Progress</option>
               <option value="Done">Done</option>
            </select>

            <select
               value={priorityFilter}
               onChange={(e) => setPriorityFilter(e.target.value as any)}>
               <option value="All">All Priority</option>
               <option value="Low">Low</option>
               <option value="Medium">Medium</option>
               <option value="High">High</option>
            </select>

            <button className="add-task-btn" onClick={() => setShowForm(true)}>
               Add Task
            </button>
         </div>

         {showForm && (
            <Modal onClose={() => setShowForm(false)}>
               <TaskForm
                  projectId={projectId}
                  task={editingTask ?? undefined}
                  onTaskCreated={async (data) => {
                     addTask(data);
                     setShowForm(false);
                     setEditingTask(null);
                  }}
                  onTaskUpdated={async (task) => {
                     await editTask(task._id!, task);
                     setShowForm(false);
                     setEditingTask(null);
                  }}
                  onClose={() => setShowForm(false)}
               />
            </Modal>
         )}

         {/*  STATES */}
         {loading && <p>Loading...</p>}
         {/* {error && <p>{error}</p>} */}

         {/*  TASK TABLE */}
         <TaskList
            tasks={filteredTasks}
            onEdit={(task) => {
               setEditingTask(task);
               setShowForm(true);
            }}
            onDelete={removeTask}
         />
      </div>
   );
}
