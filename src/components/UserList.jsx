import React from "react";
import { Link } from "react-router-dom";

export const UserList = ({ users, onDelete }) => {
  if (!users.length) {
    return (
      <div className="bg-white rounded-2xl shadow p-6">
        <h2 className="text-xl font-bold mb-2">Usuarios</h2>
        <p className="text-sm text-slate-600">
          No hay usuarios. Crea uno desde el menú "Crear usuario".
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl shadow p-6">
      <h2 className="text-xl font-bold mb-4">Usuarios</h2>

      <div className="grid gap-3">
        {users.map((user) => (
          <div
            key={user.id}
            className="flex items-center justify-between border rounded-2xl px-4 py-3"
          >
            <div>
              <p className="font-semibold">{user.name}</p>
              <p className="text-sm text-slate-500">{user.email}</p>
            </div>

            <div className="flex gap-2">
              <Link to={`/users/edit/${user.id}`}>
                <button className="px-3 py-1 text-sm rounded-2xl bg-blue-500 text-white hover:bg-blue-600">
                  Editar
                </button>
              </Link>
              <button
                onClick={() => onDelete(user.id)}
                className="px-3 py-1 text-sm rounded-2xl bg-red-500 text-white hover:bg-red-600"
              >
                Eliminar
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
