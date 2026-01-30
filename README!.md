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
