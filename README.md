## Task Management Application

A full-stack task management application that allows users to create projects, manage tasks, and track progress using status-based workflows. The app includes authentication, protected routes, and a clean UI focused on usability

## Project Overview

This project is a secure task and project management system where:
Users must log in or register to access the app
Each user can create projects.
Inside each project, users can create and manage tasks
Tasks move through statuses: To Do → In Progress → Done
The application follows a frontend–backend separation, with authentication handled via tokens.This README is about only frontend.

## Features

**Authentication**

User registration & login
Token-based authentication
Protected routes (unauthenticated users are redirected to login)

**Project Management**

Create, view, update, and delete projects
Each project acts as a container for related tasks
See the status of the project -Active or Completed

**Task Management**

Create tasks under a specific project
Task properties include:
Title
Description
Status (To Do, InProgress, Done)
Priority
Edit and delete tasks
Filter tasks by status/Priority
Search Tasks

**Task Insights**

Task statistics (Total, To Do, In Progress, Done)
Real-time UI updates after CRUD operations\*\*

**Route Protection**

Dashboard, projects, and tasks are accessible only after login by the user or else directed to login
Authentication state managed using AuthContext

**UI & UX**

Clean grid-based task list
Status and priority badges
Responsive layout with media queries
Subtle hover effects for better usability

**Fully responsive layout**

Fully responsive layout for desktop, tablet, and mobile

## Tech Stack -Frontend

React (Vite)
React Router DOM
Context API for global authentication state
Axios for API requests
CSS (custom, responsive layout)

## How It Works (High-Level)

User registers or logs in
Backend validates credentials
JWT token is returned
Token is stored in frontend state
Protected routes become accessible
User creates projects
Tasks are created and managed inside projects
Task status updates reflect workflow progress

## Application Workflow

User → Login/Register
→ Token issued
→ AuthContext stores token
→ Protected Routes unlocked
→ Dashboard
→ Project List
→ Project Details
→ Task Management

## User Actions

1. Login / Register

User enters credentials
If valid, user is redirected to the dashboard
If invalid, error message is shown

2. Dashboard

Displays user’s projects with 'Create Projectbtn'
Navigates to ProjectPage which displays Projectcard

3. Project Page
   Option to create a new project
   Stats -Completd and Active
   User clicks a card
   navigates to Project Detail page

4. Project Detail page
   Displaysdetails about the project and Create, Edit, ViewTask and Delete buutton
   Create Task btn- Creates Task
   Edit - Edits existing tasks
   Delete- Delete Tasks
   View Task - User can view list of tasks by clicking the button

5. Task Page
   Displays all tasks related to the selected project
   Shows task status and priority
   Allows filtering and searching
   Task Actions:
   Add new tasks
   Update task status
   Delete tasks

## Running the Project

1.Clone the Repository
git clone <repository-url>
cd <frontend-folder-name> 2. Install Dependencies 3. Configure Backend API UR
VITE_API_URL=http://localhost:3000 4. Start the Frontend
npm run dev 5. Open in Browser
http://localhost:3001

## Pro-Tasker: Challenges & Solutions

1. Projects not loading / blank page

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

2. onProjectCreated TypeScript error

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

3. Modal + Spinner + Toast integration
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

4. Inline validation

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

5. React + TypeScript safety

Problems:
prev not iterable errors (prevProjects sometimes undefined).
Passing props incorrectly caused TS redlines.
Solutions:
Safe state updates using:
setProjects((prevProjects) => Array.isArray(prevProjects) ? [...prevProjects, newProject] : [newProject]);
Updated TS types for props and state.

5. Page Kept Loading When Clicking a Card

Problem
Clicking a project card caused the page to keep loading indefinitely. There was no response or error shown on the UI.
Cause
The API call did not properly handle the final response state. The component was waiting for data that was never finalized.
Solution
Fixed the API flow to ensure the request always resolves.
Properly handled loading state and response completion. Added setLoading false in the finally

6. Project Form Error Due to Missing Props

Problem
The Project Form was throwing errors when rendering.
Cause
Props were passed from the parent component but were not destructured correctly in the child component.
Solution
Properly destructured props in the ProjectForm component.
Ensured all required props were defined before usage.

7. Task List Was Not Populating

Problem
Tasks were not displaying even though the API was returning data.
Cause
The frontend was expecting an array directly, but the backend response wrapped tasks inside an object.
Incorrect Code
setTasks(Array.isArray(data) ? data : []);
Fixed Code
setTasks(Array.isArray(data.tasks) ? data.tasks : data);
Solution
Matched frontend state handling with the backend response structure.

8. Delete Task Was Not Working

Problem
Clicking “Delete” did nothing.
Cause
The delete API route in the frontend did not match the backend route.
Solution
Updated the frontend API call to exactly match the backend delete route.
Verified request method and URL consistency.

9. Update Task Was Not Reflecting in UI

Problem
Task updates succeeded in the backend but did not reflect immediately in the UI.
Cause
Local state was not updated after a successful API call, so React did not re-render.
Solution
Manually updated local state using setTasks and .map() to trigger re-render:
const updatedTask = await updateTask(projectId, taskId, taskBody, token);
setTasks((prev) =>
prev.map((task) =>
task.\_id === taskId
? { ...task, ...taskBody, ...updatedTask }
: task
)
);
This ensured:
Immediate UI update
No page refresh required
Correct task data synchronization

10. Statistics Were Not Populating

Problem
Task statistics (To Do, In Progress, Done) showed incorrect or empty values.
Cause
Status values in the backend ("To Do", "InProgress", "Done") did not exactly match frontend comparisons.
Solution
Standardized status values between backend and frontend.
Ensured consistent naming for accurate filtering and counting.
Project Not Loading After Creation

11. Project Not Loading After Creation
    Problem
    After creating a project, it did not appear immediately on the project list page.
    Cause
    Local state was not updated after project creation.
    Solution
    Updated the project list state immediately after successful creation.
    Avoided unnecessary page refreshes.

## References / Resources Used

Feature Resource / Reference
Axios API calls Axios Docs
React Context / JWT Custom AuthContext (pattern from official React docs)
useEffect + async React Hooks FAQ
TypeScript Props & Interfaces TypeScript Handbook
Modal overlay CSS CSS Tricks: Centering with flex
https://www.w3schools.com/cssref/css3_pr_animation-fill-mode.php

## Frontend Wireframes

The following wireframes were created by using ASCII wireframe ((letters, lines, boxes).)before implementation to plan
layout, routing, and component responsibilities.

**Login / Register Page**

+----------------------------+
| Pro-Tasker |
+----------------------------+

Email:
[__________________________]

Password:
[__________________________]

[ Login ] Don't have an account?
→ Register

**Dashboard (Projects)**

+--------------------------------------------------+
| Pro-Tasker Logout |
+--------------------------------------------------+

- Create New Project

Project Name: [_____________________]
Description: [_____________________]
[ Create Project ]

\*_My Projects_

| Project Card | Project Card | Project Card |
| Project Card | Project Card | Project Card |

**Project Details (Tasks)**

+--------------------------------------------------+
| Pro-Tasker Logout |
+--------------------------------------------------+

Project: Website Redesign

- Add New Task

Title: [_____________________]
Status: [ To Do ▾ ]
[ Add Task ]

**Tasks**

[ Task Title ] To Do Edit | Delete
[ Task Title ] In Progress Edit | Delete
[ Task Title ] Done Edit | Delete

## Key Learnings

Frontend and backend must agree on data shape
React UI will not update unless local state changes
Route mismatches silently break functionality
Consistent naming prevents logic bugs
Debugging state issues is as important as fixing API er###rors

## Screenshots

Homepage: ![alt text](image-1.png)
LoginPage: ![alt text](image-2.png)
RegisterPage: ![alt text](image-3.png)
DashboardPage: ![alt text](image-5.png)
ProjectPage: ![alt text](image-6.png)
Create ProjectPage: ![alt text](image-7.png)
ProjectDEtailPage:![alt text](image-8.png)
TaskPage: ![alt text](image-9.png)
Create Task - ![alt text](image.png)

## Deployment Link:

https://mern-fullstack-protask-frontend.onrender.com
https://mern-fullstack-protask-api-backend.onrender.com
