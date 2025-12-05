import { useEffect, useState } from "react";
import { getUsers, deleteUser } from "../services/api";
import { toast } from "sonner";

export const useUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const loadUsers = () => {
    setLoading(true);
    getUsers()
      .then((data) => {
        setUsers(data);
        setError("");
      })
      .catch(() => setError("No se pudieron cargar los usuarios"))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    loadUsers();
  }, []);

  const removeUser = (id) => {
    deleteUser(id)
      .then(() => {
        setUsers((prev) => prev.filter((u) => u.id !== id));
        toast.success("Usuario eliminado");
      })
      .catch(() => toast.error("No se pudo eliminar el usuario"));
  };

  return { users, loading, error, removeUser, reload: loadUsers };
};
