import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./pages/auth/Login";
import Signup from "./pages/auth/Signup";
import "./index.css";
import Dashboard from "./pages/dashboard/Dashboard";
import MealMedia from "./pages/mealmedia/MealMedia";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import MealDetail from "./pages/dayos/MealDetail";
import AddMeal from "./pages/dayos/AddMeal";

const App = () => {
  return (
    <>
      <AddMeal/>
      {/* <BrowserRouter>
        <Routes>
          <Route element={<Login />} path="/" />
          <Route element={<Signup />} path="signup" />

          <Route
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>

            }
            path="/dashboard"
          />

          <Route
            element={
              <ProtectedRoute>
                <MealMedia />
              </ProtectedRoute>
            }
            path="/meals"
          />

          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      </BrowserRouter> */}
    </>
  );
};

export default App;
