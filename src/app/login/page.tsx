"use client";

import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function LoginPage() {
  const { register, handleSubmit } = useForm();
  const router = useRouter();
  const [error, setError] = useState("");

  const onSubmit = async (data: any) => {
    setError("");

    try {
      const res = await fetch("http://localhost:4000/api/v1/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const result = await res.json();

      if (!res.ok) {
        setError(result.message || "Error al iniciar sesión");
        return;
      }

      const token = result.access_token || result.token;
      const user = result.user || { id: result.id, email: result.email };

      if (token && user?.id) {
        // Asegúrate de que esto solo se ejecute en el cliente
        if (typeof window !== "undefined") {
          localStorage.setItem("token", token);
          localStorage.setItem("user_id", user.id);
        }

        router.push("/cars");
      } else {
        setError("Datos de usuario incompletos.");
      }
    } catch (err) {
      setError("No se pudo conectar con el servidor.");
      console.error(err);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      style={{
        maxWidth: 350,
        margin: "60px auto",
        padding: 20,
        border: "1px solid #ccc",
        borderRadius: 4,
        background: "#fafafa",
        display: "flex",
        flexDirection: "column",
        gap: 12,
      }}
    >
      <h1 style={{ fontSize: 22, fontWeight: "bold", marginBottom: 10 }}>
        Iniciar Sesión
      </h1>

      <input
        {...register("email", { required: true })}
        type="email"
        placeholder="Correo electrónico"
        style={{
          padding: 8,
          border: "1px solid #ccc",
          borderRadius: 3,
        }}
      />

      <input
        {...register("password", { required: true })}
        type="password"
        placeholder="Contraseña"
        style={{
          padding: 8,
          border: "1px solid #ccc",
          borderRadius: 3,
        }}
      />

      {error && <div style={{ color: "red" }}>{error}</div>}

      <button
        type="submit"
        style={{
          padding: 10,
          background: "#1976d2",
          color: "#fff",
          border: "none",
          borderRadius: 3,
          cursor: "pointer",
          fontWeight: "bold",
        }}
      >
        Entrar
      </button>
    </form>
  );
}
