'use client';

import { useState } from "react";
import { useRouter } from "next/navigation";
import { loginUser } from "./login.api";
import Link from "next/link";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [mensaje, setMensaje] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMensaje("");
    try {
      const res = await loginUser({ email, password });
      setMensaje(res.message || "¡Bienvenido!");
      // Si tienes token, puedes guardarlo aquí: localStorage.setItem('token', res.token)
      if (email.endsWith("@bibliotecang.com")) {
        router.push("/dashboard");
      } else {
        router.push("/Home");
      }
    } catch (error: any) {
      setMensaje(error.message || "Error al iniciar sesión");
    }
  };

  return (
    <main className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-emerald-100 via-white to-emerald-200 p-4">
      {/* Fondo desenfocado */}
      <div
        className="absolute inset-0 bg-cover bg-center filter blur-lg brightness-75"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=80')",
        }}
        aria-hidden="true"
      />
      <div className="absolute inset-0 bg-gradient-to-br from-black/40 via-white/10 to-black/60 z-0" />

      <form
        onSubmit={handleSubmit}
        className="relative z-10 bg-white/80 backdrop-blur-lg rounded-2xl shadow-xl p-8 w-full max-w-sm flex flex-col gap-6"
      >
        <h2 className="text-3xl font-bold text-emerald-800 text-center mb-2">
          Iniciar sesión en la biblioteca
        </h2>
        <div className="flex flex-col gap-2">
          <label htmlFor="email" className="text-sm font-semibold text-gray-700">
            Correo electrónico
          </label>
          <input
            id="email"
            type="email"
            required
            value={email}
            onChange={e => setEmail(e.target.value)}
            className="rounded px-3 py-2 border border-emerald-300 focus:outline-none focus:ring-2 focus:ring-emerald-400"
            placeholder="tucorreo@ejemplo.com"
          />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="password" className="text-sm font-semibold text-gray-700">
            Contraseña
          </label>
          <div className="relative w-full">
            <input
              id="password"
              type={showPassword ? "text" : "password"}
              required
              value={password}
              onChange={e => setPassword(e.target.value)}
              className="rounded px-3 py-2 border border-emerald-300 focus:outline-none focus:ring-2 focus:ring-emerald-400 w-full pr-10"
              placeholder="********"
            />
            <button
              type="button"
              tabIndex={-1}
              className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500 hover:text-emerald-700"
              onClick={() => setShowPassword((v) => !v)}
              aria-label={showPassword ? "Ocultar contraseña" : "Mostrar contraseña"}
            >
              {showPassword ? (
                // Ojo abierto
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none"
                  viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                    d="M2.458 12C3.732 7.943 7.523 5 12 5c4.477 0 8.268 2.943 9.542 7-1.274 4.057-5.065 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
              ) : (
                // Ojo cerrado
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none"
                  viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                    d="M13.875 18.825A10.05 10.05 0 0112 19c-4.477 0-8.268-2.943-9.542-7a9.956 9.956 0 012.293-3.95M6.873 6.872A9.956 9.956 0 0112 5c4.477 0 8.268 2.943 9.542 7a9.956 9.956 0 01-4.043 5.306M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                    d="M3 3l18 18" />
                </svg>
              )}
            </button>
          </div>
        </div>
        {/* Botón Entrar arriba */}
        <div className="flex flex-col gap-2 mt-2">
          <button
            type="submit"
            className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-2 px-6 rounded-full shadow-md transition-all duration-300 text-base w-full"
          >
            Entrar
          </button>
          <Link
            href="/register"
            className="flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded-full shadow transition-all duration-300 text-base w-full"
            style={{ letterSpacing: "0.5px" }}
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
            </svg>
            Registrarse
          </Link>
        </div>
        {mensaje && (
          <div className="text-center mt-2 text-sm text-emerald-700 font-semibold">
            {mensaje}
          </div>
        )}
      </form>
    </main>
  );
}