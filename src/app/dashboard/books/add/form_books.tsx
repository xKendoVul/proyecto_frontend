'use client';

import { useEffect, useState } from "react";
import { createBook } from "../books.api";
import { getAllAuthors } from "@/app/api/author.api";

async function getEditoriales() {
  const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;
  const res = await fetch("http://localhost:4000/api/v1/publishers", {
    headers: token ? { Authorization: `Bearer ${token}` } : {},
  });
  if (!res.ok) throw new Error("Error al obtener editoriales");
  return res.json();
}

async function getGeneros() {
  const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;
  const res = await fetch("http://localhost:4000/api/v1/genres", {
    headers: token ? { Authorization: `Bearer ${token}` } : {},
  });
  if (!res.ok) throw new Error("Error al obtener géneros");
  return res.json();
}

export default function FormBook() {
  const [title, setTitle] = useState("");
  const [publication_year, setPublicationYear] = useState<number | "">("");
  const [isAvailable, setIsAvailable] = useState(true);
  const [author_id, setAuthorId] = useState<number | "">("");
  const [publisher_id, setPublisherId] = useState<number | "">("");
  const [genre_id, setGenreId] = useState<number[]>([]);
  const [mensaje, setMensaje] = useState<string | null>(null);

  const [autores, setAutores] = useState<{ id: number; nombre: string }[]>([]);
  const [editoriales, setEditoriales] = useState<{ id: number; nombre: string }[]>([]);
  const [generos, setGeneros] = useState<{ id: number; nombre: string }[]>([]);

  useEffect(() => {
    getAllAuthors().then(data => setAutores(data.data || data)).catch(() => setAutores([]));
    getEditoriales().then(data => setEditoriales(data.data || data)).catch(() => setEditoriales([]));
    getGeneros().then(data => {
      setGeneros(data.data || data);
      console.log("Generos cargados:", data.data || data); // <-- Agrega esto
    }).catch(() => setGeneros([]));
  }, []);

  const handleGenreChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selected = Array.from(e.target.selectedOptions).map(opt => Number(opt.value));
    setGenreId(selected);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMensaje(null);
    const data = {
      title,
      publication_year: publication_year === "" ? undefined : Number(publication_year),
      isAvailable,
      author_id: Number(author_id),
      publisher_id: Number(publisher_id),
      genre_id: genre_id,
    };
    try {
      await createBook(data);
      setMensaje("Libro guardado correctamente");
      setTitle("");
      setPublicationYear("");
      setIsAvailable(true);
      setAuthorId("");
      setPublisherId("");
      setGenreId([]);
    } catch (error: any) {
      setMensaje(error.message || "Error al guardar el libro");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white rounded-2xl shadow-lg p-8 max-w-md mx-auto flex flex-col gap-6"
    >
      <h2 className="text-2xl font-bold text-emerald-700 text-center mb-2">Agregar libro</h2>
      <div className="flex flex-col gap-2">
        <label className="font-semibold text-gray-700">Título</label>
        <input
          type="text"
          value={title}
          onChange={e => setTitle(e.target.value)}
          required
          minLength={3}
          className="rounded px-3 py-2 border border-emerald-300 focus:outline-none focus:ring-2 focus:ring-emerald-400"
          placeholder="Título del libro"
        />
      </div>
      <div className="flex flex-col gap-2">
        <label className="font-semibold text-gray-700">Año de publicación</label>
        <input
          type="number"
          value={publication_year}
          onChange={e => setPublicationYear(e.target.value === "" ? "" : Number(e.target.value))}
          min={0}
          className="rounded px-3 py-2 border border-emerald-300 focus:outline-none focus:ring-2 focus:ring-emerald-400"
          placeholder="Ej: 2020"
        />
      </div>
      <div className="flex flex-col gap-2">
        <label className="font-semibold text-gray-700">¿Disponible?</label>
        <select
          value={isAvailable ? "true" : "false"}
          onChange={e => setIsAvailable(e.target.value === "true")}
          className="rounded px-3 py-2 border border-emerald-300 focus:outline-none focus:ring-2 focus:ring-emerald-400"
        >
          <option value="true">Sí</option>
          <option value="false">No</option>
        </select>
      </div>
      <div className="flex flex-col gap-2">
        <label className="font-semibold text-gray-700">Autor</label>
        <select
          value={author_id}
          onChange={e => setAuthorId(Number(e.target.value))}
          required
          className="rounded px-3 py-2 border border-emerald-300 focus:outline-none focus:ring-2 focus:ring-emerald-400"
        >
          <option value="">Selecciona un autor</option>
          {autores.map((autor) => (
            <option key={autor.id} value={autor.id}>
              {autor.nombre || autor.name}
            </option>
          ))}
        </select>
      </div>
      <div className="flex flex-col gap-2">
        <label className="font-semibold text-gray-700">Editorial</label>
        <select
          value={publisher_id}
          onChange={e => setPublisherId(Number(e.target.value))}
          required
          className="rounded px-3 py-2 border border-emerald-300 focus:outline-none focus:ring-2 focus:ring-emerald-400"
        >
          <option value="">Selecciona una editorial</option>
          {editoriales.map((editorial) => (
            <option key={editorial.id} value={editorial.id}>
              {editorial.nombre}
            </option>
          ))}
        </select>
      </div>
      <div className="flex flex-col gap-2">
        <label className="font-semibold text-gray-700">Géneros (puedes seleccionar varios)</label>
        <select
          multiple
          value={genre_id.map(String)}
          onChange={handleGenreChange}
          required
          className="rounded px-3 py-2 border border-emerald-300 focus:outline-none focus:ring-2 focus:ring-emerald-400 h-32"
        >
          {generos.map((genero) => (
            <option key={genero.id} value={genero.id}>
              {genero.nombre || genero.name || JSON.stringify(genero)}
            </option>
          ))}
        </select>
        <span className="text-xs text-gray-500">Mantén presionada Ctrl (Windows) o Cmd (Mac) para seleccionar varios.</span>
      </div>
      {mensaje && (
        <div className="text-center">
          <span className="text-emerald-600 font-semibold">{mensaje}</span>
        </div>
      )}
      <button
        type="submit"
        className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-2 px-8 rounded-full shadow-md transition-all duration-300 text-base mt-2"
      >
        Guardar libro
      </button>
    </form>
  );
}