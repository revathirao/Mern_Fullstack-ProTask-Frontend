
/**Projects Page Component
Purpose:
- Displays all projects created by the logged-in user
- Entry point for project management
- Protected route (only accessible after login)
*/

export default function Projects() {
   return (
      <div className="projects-pagecontainer">
         {/* Page heading */}
         <h1> Projects</h1>

         {/* Button placeholder for creating a new project */}
         <button className="create-project-btn">Create Project</button>

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
