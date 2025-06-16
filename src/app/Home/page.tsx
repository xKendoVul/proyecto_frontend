"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const sampleBooks = [
  {
    id: 1,
    title: "Cien años de soledad",
    author: "Gabriel García Márquez",
    cover:
      "https://images.cdn1.buscalibre.com/fit-in/360x360/b9/4f/b94f5bcdafbc7e78abf47764c09c1776.jpg",
  },
  {
    id: 2,
    title: "1984",
    author: "George Orwell",
    cover:
      "https://images.cdn1.buscalibre.com/fit-in/360x360/9a/b3/9ab3e4e0451ee927a3c25d7a2174a661.jpg",
  },
  {
    id: 3,
    title: "Orgullo y prejuicio",
    author: "Jane Austen",
    cover:
      "https://images.cdn1.buscalibre.com/fit-in/360x360/0c/34/0c3443510d3f183bbf70b73539cfefc6.jpg",
  },
  {
    id: 4,
    title: "El principito",
    author: "Antoine de Saint-Exupéry",
    cover:
      "https://images.cdn1.buscalibre.com/fit-in/360x360/ba/7c/ba7c1998c287f843671fcde64c1141d7.jpg",
  },
];

export default function HomePage() {
  const [user, setUser] = useState<{ fullname: string } | null>(null);
  const [search, setSearch] = useState("");
  const [libros, setLibros] = useState([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  useEffect(() => {
    fetch("http://localhost:4000/api/v1/books")
      .then((res) => res.json())
      .then((data) => {
        const librosArray = data?.data?.data || [];
        console.log("Libros desde el backend:", librosArray);
        setLibros(librosArray);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const filteredBooks = sampleBooks.filter((book) =>
    book.title.toLowerCase().includes(search.toLowerCase())
  );

  const handleCerrarSesion = () => {
    // Aquí puedes limpiar el localStorage, cookies o cualquier estado de autenticación
    localStorage.removeItem("token"); // Ejemplo si usas token
    // Redirige al login o página principal
    router.push("/login");
  };

  if (loading) {
    return <div className="text-center py-10">Cargando libros...</div>;
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-emerald-100 via-white to-blue-100 p-6">
      {/* Encabezado */}
      <section className="text-center mb-8">
        <h1 className="text-4xl font-bold text-emerald-800 font-serif mb-2">
          Bienvenido{user ? `, ${user.fullname}` : ""} 📚
        </h1>
        <p className="text-lg text-gray-700">
          Explora libros por género, autor o busca tu favorito.
        </p>
      </section>

      {/* Buscador */}
      <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8">
        <input
          type="text"
          placeholder="🔍 Buscar libros..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full sm:w-1/2 px-4 py-2 rounded-lg border border-emerald-300 shadow focus:outline-none focus:ring-2 focus:ring-emerald-400"
        />
        <div className="flex gap-2 flex-wrap justify-center">
          <button
            className="bg-emerald-500 hover:bg-emerald-600 text-white px-4 py-2 rounded-lg transition"
            onClick={() => router.push("/filtro_genero")}
          >
            📖 Géneros
          </button>
          <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg transition">
            📚 Libros
          </button>
          <button className="bg-purple-500 hover:bg-purple-600 text-white px-4 py-2 rounded-lg transition">
            ✍️ Autores
          </button>
        </div>
      </div>

      {/* Libros */}
      <section className="max-w-6xl mx-auto">
        <h2 className="text-2xl font-bold text-emerald-700 mb-6 text-center">
          📚 Libros para leer
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {libros.map((libro: any) => (
            <div
              key={libro.id}
              className="bg-white rounded-3xl shadow-xl p-8 flex flex-col items-center justify-center border border-emerald-100 hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 cursor-pointer relative overflow-hidden"
            >
              {libro.image && (
                <img
                  src={libro.image}
                  alt={libro.title}
                  className="w-32 h-40 object-cover rounded-xl mb-4 shadow"
                />
              )}
              <span className="text-emerald-600 text-2xl font-bold mb-2">
                {libro.title}
              </span>
              <span className="text-gray-500 mb-1">
                {libro.author?.name || "Autor desconocido"}
              </span>
              <span className="text-gray-400 text-sm mb-1">
                {libro.publisher?.name || "Editorial desconocida"}
              </span>
              <span className="text-gray-400 text-sm mb-1">
                {libro.publication_year}
              </span>
              <div className="flex flex-wrap gap-2 mt-2">
                {libro.genre?.map((g: any) => (
                  <span
                    key={g.id}
                    className="bg-emerald-100 text-emerald-700 px-2 py-1 rounded-full text-xs"
                  >
                    {g.name}
                  </span>
                ))}
              </div>
              <span
                className={`mt-3 px-3 py-1 rounded-full text-xs font-bold ${
                  libro.isAvailable
                    ? "bg-emerald-200 text-emerald-800"
                    : "bg-red-200 text-red-800"
                }`}
              >
                {libro.isAvailable ? "Disponible" : "No disponible"}
              </span>
            </div>
          ))}
        </div>

        {filteredBooks.length === 0 && (
          <p className="text-center text-gray-500 mt-10">
            No se encontraron libros con ese título.
          </p>
        )}
      </section>

      {/* Botón de cerrar sesión */}
      <div className="fixed bottom-4 right-4">
        <button
          onClick={handleCerrarSesion}
          className="bg-red-500 hover:bg-red-600 text-white font-bold px-5 py-2 rounded-full shadow-md transition duration-300"
        >
          Cerrar sesión
        </button>
      </div>

      {/* Botón de perfil de usuario */}
      <div className="fixed top-6 right-6">
        <button
          onClick={() => router.push("/perfil")}
          className="bg-white border-2 border-emerald-400 shadow-lg rounded-full p-3 hover:bg-emerald-100 hover:scale-110 transition-all duration-300 z-50 flex items-center justify-center"
          title="Ver perfil de usuario"
        >
          <svg
            className="w-7 h-7 text-emerald-600"
            fill="none"
            stroke="currentColor"
            strokeWidth={2.2}
            viewBox="0 0 24 24"
          >
            <circle cx="12" cy="8" r="4" stroke="currentColor" strokeWidth="2" />
            <path
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M4 20c0-3.314 3.582-6 8-6s8 2.686 8 6"
            />
          </svg>
        </button>
      </div>
    </main>
  );
}
