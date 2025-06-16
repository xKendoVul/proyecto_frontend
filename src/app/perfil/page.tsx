"use client";
import React, { useEffect, useState } from "react";

const AVATARES = [
  "https://randomuser.me/api/portraits/men/32.jpg",
  "https://randomuser.me/api/portraits/women/44.jpg",
  "https://randomuser.me/api/portraits/men/45.jpg",
  "https://randomuser.me/api/portraits/women/65.jpg",
  "https://randomuser.me/api/portraits/men/12.jpg",
  "https://randomuser.me/api/portraits/women/12.jpg",
];

export default function PerfilUsuario() {
  const [usuario, setUsuario] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [nuevoNombre, setNuevoNombre] = useState("");
  const [nuevaPassword, setNuevaPassword] = useState("");
  const [mensaje, setMensaje] = useState("");
  const [avatarSeleccionado, setAvatarSeleccionado] = useState<string>("");

  useEffect(() => {
    fetch("http://localhost:4000/api/v1/user/me")
      .then((res) => res.json())
      .then((data) => {
        setUsuario(data);
        setNuevoNombre(data.fullname || "");
        setAvatarSeleccionado(data.avatar || AVATARES[0]);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const handleNombreChange = async (e: React.FormEvent) => {
    e.preventDefault();
    setMensaje("");
    if (!nuevoNombre.trim()) {
      setMensaje("El nombre no puede estar vacío.");
      return;
    }
    const res = await fetch("http://localhost:4000/api/v1/user/change-name", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ fullname: nuevoNombre }),
    });
    if (res.ok) {
      setMensaje("Nombre actualizado correctamente.");
      setUsuario((prev: any) => ({ ...prev, fullname: nuevoNombre }));
    } else {
      setMensaje("Error al actualizar el nombre.");
    }
  };

  const handlePasswordChange = async (e: React.FormEvent) => {
    e.preventDefault();
    setMensaje("");
    if (!nuevaPassword) {
      setMensaje("La contraseña no puede estar vacía.");
      return;
    }
    const res = await fetch("http://localhost:4000/api/v1/user/change-password", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password: nuevaPassword }),
    });
    if (res.ok) {
      setMensaje("Contraseña actualizada correctamente.");
      setNuevaPassword("");
    } else {
      setMensaje("Error al actualizar la contraseña.");
    }
  };

  const handleAvatarChange = async (nuevoAvatar: string) => {
    setAvatarSeleccionado(nuevoAvatar);
    setMensaje("");
    const res = await fetch("http://localhost:4000/api/v1/user/change-avatar", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ avatar: nuevoAvatar }),
    });
    if (res.ok) {
      setMensaje("Foto de perfil actualizada.");
      setUsuario((prev: any) => ({ ...prev, avatar: nuevoAvatar }));
    } else {
      setMensaje("Error al actualizar la foto de perfil.");
    }
  };

  if (loading) {
    return <div className="text-center py-10">Cargando perfil...</div>;
  }

  if (!usuario) {
    return <div className="text-center py-10 text-red-500">No se pudo cargar el perfil.</div>;
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-gray-100 via-white to-gray-200 py-12">
      <div className="bg-white rounded-xl shadow-lg p-10 flex flex-col items-center border border-gray-200 max-w-md w-full">
        {/* Foto de perfil */}
        <img
          src={avatarSeleccionado}
          alt={usuario.fullname}
          className="w-28 h-28 object-cover rounded-full border-2 border-gray-300 shadow mb-6"
        />
        {/* Selector de avatares */}
        <div className="flex gap-2 mb-6 flex-wrap justify-center">
          {AVATARES.map((url) => (
            <button
              key={url}
              type="button"
              onClick={() => handleAvatarChange(url)}
              className={`border rounded-full p-1 transition-all duration-200 ${
                avatarSeleccionado === url
                  ? "border-blue-600 ring-2 ring-blue-400"
                  : "border-gray-200 hover:border-blue-300"
              }`}
              title="Seleccionar este avatar"
            >
              <img src={url} alt="avatar" className="w-10 h-10 object-cover rounded-full" />
            </button>
          ))}
        </div>
        {/* Cambiar nombre */}
        <form onSubmit={handleNombreChange} className="flex flex-col gap-2 w-full mb-4">
          <label className="text-gray-700 font-semibold text-sm">Nombre completo</label>
          <input
            type="text"
            value={nuevoNombre}
            onChange={e => setNuevoNombre(e.target.value)}
            className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-300"
            placeholder="Nuevo nombre"
            required
          />
          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded transition"
          >
            Guardar nombre
          </button>
        </form>
        {/* Cambiar contraseña */}
        <form onSubmit={handlePasswordChange} className="flex flex-col gap-2 w-full mb-2">
          <label className="text-gray-700 font-semibold text-sm">Nueva contraseña</label>
          <input
            type="password"
            value={nuevaPassword}
            onChange={e => setNuevaPassword(e.target.value)}
            className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-300"
            placeholder="Escribe tu nueva contraseña"
            required
          />
          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded transition"
          >
            Cambiar contraseña
          </button>
        </form>
        {mensaje && (
          <div className="mt-3 text-center text-blue-700 font-semibold">{mensaje}</div>
        )}
        {/* Botones extra */}
        <div className="flex gap-3 mt-6">
          <button
            onClick={() => window.location.href = "/"}
            className="bg-gray-200 hover:bg-gray-300 text-gray-700 font-semibold px-4 py-2 rounded-full shadow transition"
          >
            Ir al inicio
          </button>
          <button
            onClick={() => window.location.href = "/filtro_genero"}
            className="bg-blue-100 hover:bg-blue-200 text-blue-700 font-semibold px-4 py-2 rounded-full shadow transition"
          >
            Explorar géneros
          </button>
        </div>
      </div>
    </div>
  );
}