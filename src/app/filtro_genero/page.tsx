"use client";
import React, { useEffect, useState } from "react";
import { ChevronLeft } from "lucide-react";
import BuscadorGeneros from "./BuscadorGeneros";

export default function FiltroGeneroPage() {
  const [generos, setGeneros] = useState([]);
  const [libros, setLibros] = useState([]);
  const [librosFiltrados, setLibrosFiltrados] = useState([]);
  const [generoSeleccionado, setGeneroSeleccionado] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    Promise.all([
      fetch("http://localhost:4000/api/v1/genre").then(res => res.json()),
      fetch("http://localhost:4000/api/v1/books").then(res => res.json()),
    ])
      .then(([generosData, librosData]) => {
        setGeneros(generosData.data || generosData);
        const allBooks = librosData?.data?.data || [];
        setLibros(allBooks);
        setLibrosFiltrados(allBooks);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const filtrarPorGenero = (genero: any) => {
    setGeneroSeleccionado(genero);
    const filtrados = libros.filter((libro: any) =>
      libro.genre?.some((g: any) => g.id === genero.id)
    );
    setLibrosFiltrados(filtrados);
  };

  const volverAGeneros = () => {
    setGeneroSeleccionado(null);
    setLibrosFiltrados(libros);
  };

  const manejarFiltrado = (generosFiltrados: any) => {
    setGeneros(generosFiltrados);
    if (generoSeleccionado) {
      const filtrados = generosFiltrados.filter((libro: any) =>
        libro.genre?.some((g: any) => g.id === generoSeleccionado.id)
      );
      setLibrosFiltrados(filtrados);
    }
  };

  if (loading) {
    return <div className="text-center py-20 text-lg text-gray-600">Cargando datos...</div>;
  }

  if (generoSeleccionado) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-white via-blue-50 to-emerald-100 py-12 px-4">
        <div className="max-w-6xl mx-auto mb-10 flex items-center gap-4">
          <button
            onClick={volverAGeneros}
            className="inline-flex items-center gap-2 bg-white text-emerald-600 border border-emerald-200 px-4 py-2 rounded-full shadow hover:bg-emerald-50 transition"
          >
            <ChevronLeft className="w-5 h-5" />
            Volver a géneros
          </button>
          <h2 className="text-2xl font-semibold text-emerald-800">
            Libros del género: <span className="font-bold">{generoSeleccionado.name}</span>
          </h2>
        </div>

        {librosFiltrados.length === 0 ? (
          <div className="text-center text-gray-500">No hay libros disponibles para este género.</div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {librosFiltrados.map((libro: any) => (
              <div
                key={libro.id}
                className="bg-white/80 backdrop-blur-md rounded-2xl p-6 shadow-lg border border-gray-100 hover:scale-[1.02] transition-all duration-300"
              >
                {libro.image && (
                  <img
                    src={libro.image}
                    alt={libro.title}
                    className="w-full h-48 object-cover rounded-xl mb-4"
                  />
                )}
                <h3 className="text-lg font-bold text-emerald-700">{libro.title}</h3>
                <p className="text-gray-600 text-sm">{libro.author?.name || "Autor desconocido"}</p>
                <p className="text-gray-400 text-sm">{libro.publisher?.name || "Editorial desconocida"}</p>
                <p className="text-gray-400 text-xs">{libro.publication_year}</p>
                <div className="flex flex-wrap gap-1 mt-2">
                  {libro.genre?.map((g: any) => (
                    <span
                      key={g.id}
                      className="bg-emerald-100 text-emerald-700 px-2 py-0.5 text-xs rounded-full"
                    >
                      {g.name}
                    </span>
                  ))}
                </div>
                <span
                  className={`mt-3 inline-block px-3 py-1 text-xs rounded-full font-medium ${
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
        )}
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-blue-50 to-emerald-100 py-12 px-4">
      <h1 className="text-4xl font-extrabold text-center text-emerald-800 mb-12">Explora por Géneros</h1>
      <BuscadorGeneros generos={generos} onFiltrar={manejarFiltrado} />
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10 max-w-6xl mx-auto">
        {generos.map((genero: any) => (
          <div
            key={genero.id}
            className="group relative bg-white/80 backdrop-blur-md rounded-2xl p-6 shadow-lg hover:shadow-2xl hover:scale-[1.02] transition-all border border-gray-100"
          >
            {genero.image && (
              <img
                src={genero.image}
                alt={genero.name}
                className="w-20 h-20 object-cover rounded-full mx-auto mb-3"
              />
            )}
            <h3 className="text-center text-xl font-semibold text-emerald-700">{genero.name}</h3>
            <p className="text-center text-sm text-gray-500 mb-4">
              {genero.descripcion || genero.description || "Sin descripción"}
            </p>
            <button
              onClick={() => filtrarPorGenero(genero)}
              className="w-full bg-gradient-to-r from-blue-500 to-emerald-500 hover:from-blue-600 hover:to-emerald-600 text-white font-bold py-2 rounded-full shadow transition"
            >
              Ver libros
            </button>
            <span className="absolute top-3 right-4 text-emerald-100 text-4xl opacity-20 group-hover:opacity-40">
              📚
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
