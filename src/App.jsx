import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./pages/auth/Login";
import Signup from "./pages/auth/Signup";
import "./index.css";
import Dashboard from "./pages/dashboard/Dashboard";
import MealMedia from "./pages/mealmedia/MealMedia";

const App = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route element={<Login />} path="/" />
          <Route element={<Signup />} path="signup" />

          <Route
            element={
              <protectedroute>
                <Dashboard />
              </protectedroute>
            }
            path="/dashboard"
          />

          <Route
            element={
              <protectedroute>
                <MealMedia />
              </protectedroute>
            }
            path="/meals"
          />

          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
