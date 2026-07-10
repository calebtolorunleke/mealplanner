import React from "react";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import Login from "./pages/auth/Login";
import Signup from "./pages/auth/Signup";
import "./index.css";
import Dashboard from "./pages/dashboard/Dashboard";
import MealMedia from "./pages/mealmedia/MealMedia";
import GroceryList from "./pages/grocerylist/GroceryList"
import EditProfile from "./pages/editprofile/EditProfile";
import ProtectedRoute from "./components/auth/ProtectedRoute";

const App = () => {
  return (
    <>
      <BrowserRouter>
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

          <Route
            element={
              <ProtectedRoute>
                <GroceryList />
              </ProtectedRoute>
            }
            path="/grocerylist"
          />

          <Route
            element={
              <ProtectedRoute>
                <EditProfile />
              </ProtectedRoute>
            }
            path="/editprofile"
          />

          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;

