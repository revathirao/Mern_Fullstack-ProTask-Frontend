import "./projects.css";

/**Projects Page Component
Purpose:
- Displays all projects created by the logged-in user
- Entry point for project management
- Protected route (only accessible after login)
*/

export default function Projects() {
   return (
      <div className="projects-pagecontainer">
         {/* Header section: title + action */}
         <div className="projects-header">
            <div>
               <h1>Your Projects</h1>
               <p>Manage all your projects in one place</p>
            </div>
            {/* Button placeholder for creating a new project */}
            <button className="create-project-btn">Create Project</button>
         </div>
         {/* 
        Project list container
        - This is where all projects will be rendered
        - Later we will map over projects from API
      */}
         <div className="projects-list">
            {/* Temporary placeholder text */}
            <p>No projects yet. Create your first project!</p>
         </div>
      </div>
   );
}
