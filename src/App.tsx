// import { useState } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import Login from "../src/pages/LoginPage/LoginPage";
import Register from "../src/pages/RegisterPage/RegisterPage";
import Dashboard from "../src/pages/DashboardPage/DashboardPage";
import ProtectedRoutes from "../src/routes/ProtectedRoutes";
import Projects from "./components/Projects/Projects/Projects.tsx";
import Header from "./components/SharedComponents/Header/Header";
import { AuthContext } from "./context/authContext.tsx";
import { useContext } from "react";
import ProjectDetails from "./pages/ProjectDetailPage/ProjectDetailPage.tsx";
import TasksPage from "./pages/TasksPage/TaskPage.tsx";
import Homepage from "./pages/HomePage/HomePage.tsx";
import "./App.css";

/*- Dashboard and Projects are protected
- User must be logged in to access them
*/
function App() {
   const { user } = useContext(AuthContext);
   const location = useLocation();
   const noHeaderRoutes = [
      "/",
      "/login",
      "/register",
      "Dashboard",
      "ProjectDetails",
      "TasksPage",
   ];

   return (
      <>
         {/* Header is outside Routes - visible on all pages */}
         {/* Show header only if user is logged in */}
         {user && !noHeaderRoutes.includes(location.pathname) && (
            <Header />
         )}{" "}
         <Routes>
            <Route path="/" element={<Homepage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />

            {/* Protected Dashboard */}
            <Route
               path="/dashboard"
               element={
                  <ProtectedRoutes>
                     <Dashboard />
                  </ProtectedRoutes>
               }
            />

            {/* Protected Projects Page */}
            <Route
               path="/projects"
               element={
                  <ProtectedRoutes>
                     <Projects />
                  </ProtectedRoutes>
               }
            />

            {/* Protected ProjectDetailPage Page */}
            <Route
               path="/projects/:id"
               element={
                  <ProtectedRoutes>
                     <ProjectDetails />
                  </ProtectedRoutes>
               }
            />

            {/* Protected TaskPage Page */}
            <Route
               path="/projects/:projectId/tasks"
               element={
                  <ProtectedRoutes>
                     <TasksPage />
                  </ProtectedRoutes>
               }
            />
         </Routes>
      </>
   );
}

export default App;
