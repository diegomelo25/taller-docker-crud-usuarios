import React from "react";
import { useNavigate } from "react-router-dom";
import { createUser } from "../services/api";
import { UserForm } from "../components/UserForm";
import { toast } from "sonner";

export const CreateUser = () => {
  const navigate = useNavigate();

  const handleCreate = (user) => {
    createUser(user)
      .then(() => {
        toast.success("Usuario creado correctamente");
        navigate("/users");
      })
      .catch(() => {
        toast.error("No se pudo crear el usuario");
      });
  };

  return <UserForm onSubmit={handleCreate} />;
};
