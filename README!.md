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