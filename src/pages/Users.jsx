import React from "react";
import { useUsers } from "../hooks/useUsers";
import { UserList } from "../components/UserList";

export const Users = () => {
  const { users, loading, error, removeUser } = useUsers();

  if (loading) {
    return (
      <p className="text-center text-slate-600 mt-10">Cargando usuarios...</p>
    );
  }

  return (
    <>
      {error && (
        <p className="mb-3 text-sm text-red-500 text-center">{error}</p>
      )}
      <UserList users={users} onDelete={removeUser} />
    </>
  );
};
