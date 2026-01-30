// import { useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Login from "../src/pages/LoginPage/LoginPage";
import Register from "../src/pages/RegisterPage/RegisterPage";
import Dashboard from "../src/pages/DashboardPage/DashboardPage";
import ProtectedRoutes from "../routes/ProtectedRoutes";

import "./App.css";

function App() {
   return (
      <>
         <h1>Pro-Tasker</h1>
         <p>Frontend initialized successfully</p>

         {/* <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />

            <Route
               path="/dashboard"
               element={
                  <ProtectedRoute>
                     <Dashboard />
                  </ProtectedRoute>
               }
            />

            <Route
               path="/projects/:id"
               element={
                  <ProtectedRoutes>
                     <ProjectDetails />
                  </ProtectedRoute>
               }
            />
         </Routes> */}

         <Routes>
            <Route path="/" element={<Navigate to="/login" />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route
               path="/dashboard"
               element={
                  <ProtectedRoutes>
                     <Dashboard />
                  </ProtectedRoutes>
               }
            />
         </Routes>
      </>
   );
}

export default App;
