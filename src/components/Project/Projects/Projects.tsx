import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { AuthContext } from "../../../context/authContext";
import ProjectForm from "../../Project/ProjectForm/ProjectForm";
import "./projects.css";
import Modal from "../../SharedComponents/Modal/Modal";

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
         console.log("Fetched projects:", res.data);
         // Update the component state with the array of projects returned from the server
         // setProjects(res.data);
         // setProjects(
         //    Array.isArray(res.data) ? res.data : res.data.projects || [],
         // );

         setProjects(
            Array.isArray(res.data)
               ? res.data
               : Array.isArray(res.data.projects)
                 ? res.data.projects
                 : [],
         );
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

   /**
    * Handles a newly created project
    * Adds it to existing projects array
    * Keeps state safe (array always)
    */
   // const handleProjectCreated = (newProject: any) => {
   //    setProjects((prevProjects) => {
   //       // Ensure previous state is an array
   //       return [...prevProjects, newProject];
   //    });
   // };

   const handleProjectCreated = (newProject: any) => {
      setProjects((prevProjects) => {
         // 🛡 Safety check
         if (!Array.isArray(prevProjects)) {
            return [newProject];
         }
         return [...prevProjects, newProject];
      });
   };

   return (
      <div className="projects-pagecontainer">
         <h1>Test Projects Page</h1>
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
         {/* {showForm && (
            <ProjectForm
               onClose={() => setShowForm(false)}
               onProjectCreated={fetchProjects}
            />
         )} */}

         {/* showForm controls modal visibility */}
         {showForm && (
            <Modal onClose={() => setShowForm(false)}>
               {/*
                **ProjectForm is wrapped inside Modal
                *- onClose: closes the modal
                *- onProjectCreated: updates parent project list
                *- newProject is added to the top of projects array
                */}
               <ProjectForm
                  onClose={() => setShowForm(false)}
                  onProjectCreated={handleProjectCreated}
                  // (newProject) =>
                  // setProjects((prev) => [newProject, ...prev])
                  // }
               />
            </Modal>
         )}

         {/* Project creation form */}
         {/* <ProjectForm onProjectCreated={handleProjectCreated} /> */}

         {/**Project list container*/}
         <div className="projects-list">
            {projects.length === 0 ? (
               <p>No projects yet. Create your first project!</p>
            ) : (
               <div className="project-items">
                  {/* Display fetched projects */}
                  {Array.isArray(projects) &&
                     projects.map((project) => (
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
