// import { useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Login from "../src/pages/LoginPage/LoginPage";
import Register from "../src/pages/RegisterPage/RegisterPage";
import Dashboard from "../src/pages/DashboardPage/DashboardPage";
import ProtectedRoutes from "../src/routes/ProtectedRoutes.tsx";
import Projects from "./components/Project/Projects/Projects.tsx";
import "./App.css";
/*- Dashboard and Projects are protected
- User must be logged in to access them
*/
function App() {
   return (
      <>
         <h1>Pro-Tasker</h1>
         <p>Frontend initialized successfully</p>

         <Routes>
            <Route path="/" element={<Navigate to="/login" />} />
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
         </Routes>
      </>
   );
}

export default App;
