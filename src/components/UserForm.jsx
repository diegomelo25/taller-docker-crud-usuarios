import React, { useState, useEffect } from "react";

export const UserForm = ({ onSubmit, initialValues }) => {
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [error, setError] = useState("");

  useEffect(() => {
    if (initialValues) {
      setUser({
        name: initialValues.name || "",
        email: initialValues.email || "",
        password: "",
      });
    }
  }, [initialValues]);

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!user.name || !user.email) {
      setError("Todos los campos excepto contraseña son obligatorios.");
      return;
    }

    if (
      user.password &&
      user.password.trim() !== "" &&
      user.password.length < 6
    ) {
      setError("La contraseña debe tener mínimo 6 caracteres.");
      return;
    }

    setError("");
    onSubmit(user);
  };

  return (
    <div className="flex justify-center">
      <div className="w-full bg-white p-6 rounded-2xl shadow-lg">
        <form onSubmit={handleSubmit} className="grid gap-4">
          <h2 className="text-xl font-bold text-center">
            {initialValues ? "Editar Usuario" : "Crear Usuario"}
          </h2>

          <input
            name="name"
            placeholder="Nombre"
            value={user.name}
            onChange={handleChange}
            className="w-full p-3 border rounded-2xl"
          />

          <input
            name="email"
            placeholder="Email"
            value={user.email}
            onChange={handleChange}
            className="w-full p-3 border rounded-2xl"
          />

          <input
            name="password"
            placeholder={
              initialValues ? "Nueva contraseña (opcional)" : "Contraseña"
            }
            type="password"
            value={user.password}
            onChange={handleChange}
            className="w-full p-3 border rounded-2xl"
          />

          {error && <p className="text-red-500 text-center text-sm">{error}</p>}

          <button
            type="submit"
            className="w-full py-3 font-semibold rounded-2xl shadow bg-emerald-500 text-white hover:bg-emerald-600"
          >
            {initialValues ? "Guardar cambios" : "Crear usuario"}
          </button>
        </form>
      </div>
    </div>
  );
};
