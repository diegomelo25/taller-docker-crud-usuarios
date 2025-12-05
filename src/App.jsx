import React from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import { Home } from "./pages/Home";
import { Users } from "./pages/Users";
import { CreateUser } from "./pages/CreateUser";
import { EditUser } from "./pages/EditUser";
import { Login } from "./pages/Login";
import { ProtectedRoute } from "./ProtectedRoute";
import { AuthProvider, useAuth } from "./contexts/AuthContext";

const Navbar = () => {
  const { user, logout } = useAuth();

  return (
    <nav className="bg-slate-900 text-white px-6 py-3 flex gap-4 items-center">
      <Link to="/">Home</Link>
      {user && <Link to="/users">Usuarios</Link>}
      {user && user.role === "admin" && <Link to="/users/create">Crear</Link>}
      {!user && <Link to="/login">Login</Link>}
      {user && (
        <button
          onClick={logout}
          className="ml-auto bg-red-500 px-3 py-1 rounded-2xl"
        >
          Logout
        </button>
      )}
    </nav>
  );
};

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Navbar />
        <main className="max-w-3xl mx-auto mt-8 px-4">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />

            <Route
              path="/users"
              element={
                <ProtectedRoute>
                  <Users />
                </ProtectedRoute>
              }
            />
            <Route
              path="/users/create"
              element={
                <ProtectedRoute>
                  <CreateUser />
                </ProtectedRoute>
              }
            />
            <Route
              path="/users/edit/:id"
              element={
                <ProtectedRoute>
                  <EditUser />
                </ProtectedRoute>
              }
            />
          </Routes>
        </main>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
