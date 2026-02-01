## Frontend Wireframes

The following wireframes were created before implementation to plan
layout, routing, and component responsibilities.

---

### Login / Register Page

+----------------------------+
| Pro-Tasker |
+----------------------------+

Email:
[__________________________]

Password:
[__________________________]

[ Login ]

Don't have an account?
→ Register

---

### Dashboard (Projects)

+--------------------------------------------------+
| Pro-Tasker Logout |
+--------------------------------------------------+

- Create New Project

---

Project Name: [_____________________]
Description: [_____________________]
[ Create Project ]

---

## Your Projects

| Project Card | Project Card | Project Card |
| Project Card | Project Card | Project Card |

---

---

### Project Details (Tasks)

+--------------------------------------------------+
| Pro-Tasker Logout |
+--------------------------------------------------+

Project: Website Redesign

- Add New Task

---

Title: [_____________________]
Status: [ To Do ▾ ]
[ Add Task ]

---

## Tasks

[ Task Title ] To Do Edit | Delete
[ Task Title ] In Progress Edit | Delete
[ Task Title ] Done Edit | Delete

---

“AuthContext centralizes authentication logic, persists login state using localStorage, and automatically injects JWT tokens into Axios requests using a side-effect.”

“The Login page uses AuthContext to call the backend login API. On success, the JWT token and user info are stored in context and localStorage, and Axios automatically includes the token in all requests. This keeps the user logged in across page refreshes.”s

Summary of Login Flow

User types email & password.

User clicks Login → handleSubmit triggers.

login(email, password) is called from AuthContext.

Backend validates credentials → returns user + token.

User info and JWT token are saved in:

React context (user, token)

localStorage (persist across refresh)

Axios default headers updated → all future requests authenticated

User is redirected to dashboard.

Errors displayed if login fails.
https://picsum.photos for images

---

Pro-Tasker: Challenges & Solutions
1️⃣ Projects not loading / blank page

Problem:

Visiting /projects sometimes showed a blank page.

Console showed: projects.map is not a function.

Cause:

API response was not always an array (sometimes wrapped in { projects: [...] }).

Initial state could be undefined or invalid type.

Solution:

Always normalize response before setting state:

setProjects(
Array.isArray(res.data)
? res.data
: Array.isArray(res.data.projects)
? res.data.projects
: [],
);

Added Array.isArray(projects) check before .map() in JSX.

2️⃣ onProjectCreated TypeScript error

Problem:

Redline: Type '(newProject: any) => void' is not assignable to type '() => void'.

Cause:

ProjectFormProps originally expected onProjectCreated: () => void, but we were passing (newProject) => ....

Solution:

Update ProjectFormProps interface to accept new project:

export interface ProjectFormProps {
onClose: () => void;
onProjectCreated: (newProject: any) => void; // new project object
}

Pass the new project in ProjectForm:

onProjectCreated(res.data.newProject);

Updated parent Projects.tsx to handle adding new project to state safely:

const handleProjectCreated = (newProject: any) => {
setProjects((prevProjects) =>
Array.isArray(prevProjects) ? [newProject, ...prevProjects] : [newProject]
);
};

3️⃣ Modal + Spinner + Toast integration

Problems:

Modal was added but ProjectForm inside modal caused double forms if inline form was still rendered.

Spinner didn’t show correctly in some cases.

Success toast message was tricky to display and auto-hide.

Solutions:

Wrap form inside Modal component only if showForm is true.

Removed inline ProjectForm from page outside modal.

Added isLoading state and conditional rendering:

<button type="submit" disabled={isLoading}>
  {isLoading ? <><Spinner /> Loading...</> : "Create Project"}
</button>

Added success toast feedback:

{success && <ToastMessage message="Project created 🎉" />}

Auto-hide success toast using setTimeout.

4️⃣ Inline validation

Problem:

Users could submit empty project names.

Solution:

Minimal inline validation inside handleSubmit:

if (!name.trim()) {
setError("Project name is required");
return;
}

Error displayed using reusable ErrorMessage component:

{error && <ErrorMessage message={error} />}

5️⃣ React + TypeScript safety

Problems:

prev not iterable errors (prevProjects sometimes undefined).

Passing props incorrectly caused TS redlines.

Solutions:

Safe state updates using:

setProjects((prevProjects) => Array.isArray(prevProjects) ? [...prevProjects, newProject] : [newProject]);

Updated TS types for props and state.

6️⃣ CSS / Layout issues

Problem:

Initial page looked very basic and unprofessional.

Solution:

Added full-page gradient background, spacing, responsive grid, project cards, hover effects.

Result: clean, professional, responsive layout with cards and header.

References / Resources Used
Feature Resource / Reference
Axios API calls Axios Docs

React Context / JWT Custom AuthContext (pattern from official React docs)
useEffect + async React Hooks FAQ

TypeScript Props & Interfaces TypeScript Handbook

Modal overlay CSS CSS Tricks: Centering with flex

Spinner component Reused approach from RegisterPage
Toast notifications Lightweight custom toast (React component + CSS)
Inline validation React forms best practices

✅ Summary:

Most issues came from state type mismatch, props misalignment, and API response inconsistencies.

Solutions involved safe state handling, TypeScript updates, modal encapsulation, and loading / toast UX improvements.Animation -[W3Schools' Animation Fill Mode.](https://www.w3schools.com/cssref/css3_pr_animation-fill-mode.php)

Project status not showing correctly:
Initially, the status badge in ProjectCard wasn’t displayed because the span element was commented out.
Solution: We uncommented and updated it to:

<span className={`status ${project.status?.toLowerCase()}`}>{project.status}</span>

This ensures the status appears with proper styling based on its value.

Edit and Delete buttons interfering with card click:
Clicking on the buttons sometimes triggered the card’s onClick.
Solution: We added e.stopPropagation() to the buttons’ container:

<div className="project-actions" onClick={(e) => e.stopPropagation()}>

Now the buttons work independently without firing the card click.

Unable to navigate to project details on card click:
Clicking the card logged the project ID but didn’t navigate because the onClick prop was replaced with a console log.
Solution: We restored the prop call to trigger navigation:

onClick={() => onClick(project.\_id)}

And ensured Projects.tsx passes navigate as the callback:

onClick={(id) => navigate(`/projects/${id}`)}

Temporary console logs not removed:
During debugging, multiple console.log() statements were left in ProjectCard and Projects.tsx.
Solution: We removed or commented unnecessary logs to clean up the console.
