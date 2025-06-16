"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";

export default function BuscadorGeneros({ generos, onFiltrar }) {
  const [busqueda, setBusqueda] = useState("");
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const valor = e.target.value;
    setBusqueda(valor);
    const filtrados = generos.filter((g: any) =>
      g.name.toLowerCase().includes(valor.toLowerCase())
    );
    onFiltrar(filtrados);
  };

  return (
    <div className="flex flex-col md:flex-row justify-between items-center gap-6 mb-12 px-4">
      {/* Buscador */}
      <div className="relative w-full md:max-w-md">
        <input
          type="text"
          value={busqueda}
          onChange={handleChange}
          placeholder="Buscar género..."
          className="w-full pl-12 pr-4 py-3 rounded-full border border-emerald-200 bg-white/70 shadow-md focus:outline-none focus:ring-2 focus:ring-emerald-400 text-base md:text-lg text-emerald-800 placeholder:text-emerald-400 transition-all duration-300"
        />
        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-emerald-400">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-6 h-6"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21 21l-4.35-4.35m0 0A7.5 7.5 0 104.5 4.5a7.5 7.5 0 0012.15 12.15z"
            />
          </svg>
        </span>
      </div>

      {/* Botón Volver */}
      <button
        onClick={() => router.push("/Home")}
        className="flex items-center gap-2 bg-gradient-to-r from-blue-500 to-emerald-500 hover:from-blue-600 hover:to-emerald-600 text-white font-semibold px-6 py-2.5 rounded-full shadow-lg hover:scale-105 active:scale-95 transition-all duration-300"
      >
        <svg
          className="w-5 h-5"
          fill="none"
          stroke="currentColor"
          strokeWidth={2}
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M15 19l-7-7 7-7"
          />
        </svg>
        Volver al Home
      </button>
    </div>
  );
}
