import React from "react";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import Login from "./pages/auth/Login";
import Signup from "./pages/auth/Signup";
import "./index.css";
import Dashboard from "./pages/dashboard/Dashboard";
import MealMedia from "./pages/mealmedia/MealMedia";
import GroceryList from "./pages/grocerylist/GroceryList";
import EditProfile from "./pages/editprofile/EditProfile";
// ProtectedRoute from routes/ uses the useAuth hook (HttpOnly cookie session).
// Do NOT import from components/auth/ — that one used localStorage.
import ProtectedRoute from "./routes/ProtectedRoute";
import { AuthProvider } from "./context/AuthContext.jsx";

const App = () => {
  return (
    <>
      <BrowserRouter>
        {/* AuthProvider must wrap all routes so every component can access
            the auth state and actions (login, logout) via useAuth(). */}
        <AuthProvider>
          <Routes>
            {/* Login is served at both / and /login so all redirects land correctly */}
            <Route element={<Login />} path="/" />
            <Route element={<Login />} path="/login" />
            <Route element={<Signup />} path="/signup" />

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

            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </>
  );
};

export default App;


