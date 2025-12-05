const API_URL = "http://localhost:8080/api/users";

export const getUsers = async () => {
  const res = await fetch(API_URL);
  if (!res.ok) throw new Error("Error al obtener usuarios");
  return res.json();
};

export const getUser = async (id) => {
  const res = await fetch(`${API_URL}/${id}`);
  if (!res.ok) throw new Error("Error al obtener usuario");
  return res.json();
};

export const createUser = async (user) => {
  const res = await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(user),
  });

  if (!res.ok) throw new Error("Error al crear usuario");
  return res.json();
};

export const updateUser = async (id, user) => {
  const payload = {
    name: user.name,
    email: user.email,
  };

  if (user.password && user.password.trim() !== "") {
    payload.password = user.password;
  }

  const res = await fetch(`${API_URL}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    const text = await res.text();
    console.error("ERROR PUT:", text);
    throw new Error("Error al actualizar usuario");
  }

  return res.json();
};

export const deleteUser = async (id) => {
  const res = await fetch(`${API_URL}/${id}`, {
    method: "DELETE",
  });

  if (!res.ok) throw new Error("Error al eliminar usuario");

  return true;
};
