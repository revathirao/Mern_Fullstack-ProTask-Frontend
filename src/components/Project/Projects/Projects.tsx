import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { AuthContext } from "../../../context/authContext";
import ProjectForm from "../../Project/ProjectForm/ProjectForm";
import "./projects.css";

/**Projects Page Component
Purpose:
- Displays all projects created by the logged-in user
- Entry point for project management
- Protected route (only accessible after login)
- Controls ProjectForm visibility
*/
export default function Projects() {
   const [projects, setProjects] = useState<any[]>([]); // stores fetched projects
   const { token } = useContext(AuthContext);

   // Toggle Project Form visibility
   const [showForm, setShowForm] = useState(false);

   // Define an asynchronous function to handle the API request and fetch projects from backend
   async function fetchProjects() {
      try {
         // Exit early if no authentication token exists to prevent unauthorized errors
         if (!token) return;

         // Send a GET request to the local server with the JWT in the Authorization header
         const res = await axios.get(
            `${import.meta.env.VITE_API_URL}/api/projects`,
            {
               headers: {
                  Authorization: `Bearer ${token}`,
               },
            },
         );

         // Update the component state with the array of projects returned from the server
         setProjects(res.data);
      } catch (err: any) {
         // Log specific error messages from the server response or general network errors
         console.error(
            "Error fetching projects:",
            err.response?.data?.message || err.message,
         );
      }
   }

   /*
    *The following hook handles the side effect of retrieving project data
    *from the backend whenever the user's authentication status changes.
    */
   useEffect(() => {
      // Execute the fetch functio
      fetchProjects();
      // Re-run this effect only when the 'token' variable changes
   }, [token]);

   return (
      <div className="projects-pagecontainer">
         {/* Header section: title + action */}
         <div className="projects-header">
            <div>
               <h1>Your Projects</h1>
               <p>Manage all your projects in one place</p>
            </div>

            {/*  create button */}
            <button
               className="create-project-btn"
               onClick={() => setShowForm(true)}>
               Create Project
            </button>
         </div>

         {/* Show Project Form */}
         {showForm && (
            <ProjectForm
               onClose={() => setShowForm(false)}
               onProjectCreated={fetchProjects}
            />
         )}
         {/**Project list container*/}
         <div className="projects-list">
            {projects.length === 0 ? (
               <p>No projects yet. Create your first project!</p>
            ) : (
               <div className="project-items">
                  {/* Display fetched projects */}
                  {projects.map((project) => (
                     <div key={project._id} className="project-card">
                        <h3>{project.name}</h3>
                        <p>{project.description}</p>
                     </div>
                  ))}
               </div>
            )}
         </div>
      </div>
   );
}
