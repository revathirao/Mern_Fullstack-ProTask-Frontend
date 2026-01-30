// import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import Login from "../src/pages/LoginPage/LoginPage";
import Dashboard from "../src/pages/DashboardPage/DashboardPage";

import "./App.css";

function App() {
   return (
      <div>
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
                  <ProtectedRoute>
                     <ProjectDetails />
                  </ProtectedRoute>
               }
            />
         </Routes> */}

         <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/dashboard" element={<Dashboard />} />
         </Routes>
      </div>
   );
}

export default App;
