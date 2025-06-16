'use client';

import { BookResponse } from "@/interfaces/book.interface";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { getAllBooks } from "../api/book.api";
import Image from "next/image";
export default function HomePage() {
  const [user, setUser] = useState<{ fullname: string } | null>(null);
  const [offset, setOffset] = useState(0)
  const [limit] = useState(8)
  const [bookData, setBookData] = useState<BookResponse>({
    data: [],
    total: 0,
  })
  const [search, setSearch] = useState("");

  const router = useRouter();

  const loadBooks = async (newOffset: number) => {
    const result = await getAllBooks(newOffset, limit)
    console.log(result)
    setBookData(result);
    setOffset(newOffset);
  }

  useEffect(() => {
    loadBooks(0);
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const filteredBooks = bookData.data.filter((book) =>
    book.title.toLowerCase().includes(search.toLowerCase())
  );

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
          <button className="bg-emerald-500 hover:bg-emerald-600 text-white px-4 py-2 rounded-lg transition">
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
          {filteredBooks.map((book) => (
            <div
              key={book.id}
              className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transform hover:-translate-y-1 transition"
            >
              <Image
                src={book.image}
                alt="portada libro"
                height={200}
                width={170}
                style={{ objectFit: "cover" }}
                className="mx-auto rounded"
              />
              <div className="p-4">
                <h3 className="text-lg font-semibold text-emerald-800">{book.title}</h3>
                <p className="text-sm text-gray-600 mb-2">de {book.author.name}</p>
                <button onClick={() => router.push(`home/book/${book.id}`)} className="bg-emerald-600 text-white text-sm px-4 py-2 rounded-lg hover:bg-emerald-700 transition">
                  Ver Info
                </button>
              </div>
            </div>
          ))}
        </div>

        {filteredBooks.length === 0 && (
          <p className="text-center text-gray-500 mt-10">
            No se encontraron libros con ese título.
          </p>
        )}
      </section>
    </main>
  );
}
