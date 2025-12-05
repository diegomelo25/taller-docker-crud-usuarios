import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getUser, updateUser } from "../services/api";
import { UserForm } from "../components/UserForm";
import { toast } from "sonner";

export const EditUser = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [initialValues, setInitialValues] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getUser(id)
      .then((data) => setInitialValues(data))
      .catch(() => toast.error("No se pudo cargar el usuario"))
      .finally(() => setLoading(false));
  }, [id]);

  const handleUpdate = (user) => {
    updateUser(id, user)
      .then(() => {
        toast.success("Usuario actualizado correctamente");
        navigate("/users");
      })
      .catch(() => toast.error("No se pudo actualizar el usuario"));
  };

  if (loading || !initialValues) {
    return (
      <p className="text-center text-slate-600 mt-10">Cargando usuario...</p>
    );
  }

  return <UserForm onSubmit={handleUpdate} initialValues={initialValues} />;
};
