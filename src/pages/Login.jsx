import React, { useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

export const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!form.email || !form.password) {
      toast.error("Llena todos los campos");
      return;
    }

    if (form.email === "admin@example.com" && form.password === "123456") {
      login({ email: form.email, role: "admin" });
      toast.success("Inicio de sesión como administrador");
      navigate("/users");
      return;
    }

    login({ email: form.email, role: "user" });
    toast.success("Inicio de sesión como usuario");
    navigate("/users");
  };

  return (
    <div className="flex justify-center mt-10">
      <div className="bg-white p-6 shadow rounded-2xl w-full max-w-md">
        <h2 className="text-xl font-bold text-center mb-4">Iniciar sesión</h2>
        <form onSubmit={handleSubmit} className="grid gap-3">
          <input
            name="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            className="p-3 border rounded-2xl"
          />

          <input
            name="password"
            type="password"
            placeholder="Contraseña"
            value={form.password}
            onChange={handleChange}
            className="p-3 border rounded-2xl"
          />

          <button className="bg-blue-600 text-white p-3 rounded-2xl">
            Ingresar
          </button>
        </form>
      </div>
    </div>
  );
};
