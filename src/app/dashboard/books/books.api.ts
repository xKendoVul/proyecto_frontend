export interface CreateBookDto {
  title: string;
  publication_year?: number;
  isAvailable?: boolean;
  author_id: number;
  publisher_id: number;
  genre_id: number[];
}

export type UpdateBookDto = Partial<CreateBookDto>;

export interface Book {
  id: number;
  title: string;
  publication_year?: number;
  isAvailable?: boolean;
  author_id: number;
  publisher_id: number;
  genre_id: number[];
}

const API_URL = "http://localhost:4000/api/v1/books";

// Función para obtener el token desde localStorage
function getToken() {
  if (typeof window !== "undefined") {
    return localStorage.getItem("token");
  }
  return null;
}

export async function getBooksAll(params?: { limit?: number; offset?: number; title?: string }) {
  const query = params
    ? "?" +
      Object.entries(params)
        .filter(([_, v]) => v !== undefined && v !== "")
        .map(([k, v]) => `${encodeURIComponent(k)}=${encodeURIComponent(v as string)}`)
        .join("&")
    : "";
  const token = getToken();
  const res = await fetch(`${API_URL}${query}`, {
    headers: token ? { Authorization: `Bearer ${token}` } : {},
  });
  if (!res.ok) throw new Error("Error al obtener libros");
  return res.json();
}

export async function getBookById(id: number) {
  const token = getToken();
  const res = await fetch(`${API_URL}/${id}`, {
    headers: token ? { Authorization: `Bearer ${token}` } : {},
  });
  if (!res.ok) throw new Error("Libro no encontrado");
  return res.json();
}

export async function createBook(dto: CreateBookDto) {
  const token = getToken();
  const res = await fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
    body: JSON.stringify(dto),
  });
  if (!res.ok) throw new Error("Error al crear libro");
  return res.json();
}

export async function updateBook(id: number, dto: UpdateBookDto) {
  const token = getToken();
  const res = await fetch(`${API_URL}/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
    body: JSON.stringify(dto),
  });
  if (!res.ok) throw new Error("Error al actualizar libro");
  return res.json();
}

export async function deleteBook(id: number) {
  const token = getToken();
  const res = await fetch(`${API_URL}/${id}`, {
    method: "DELETE",
    headers: token ? { Authorization: `Bearer ${token}` } : {},
  });
  if (!res.ok) throw new Error("Error al eliminar libro");
  return res.json();
}

export async function deleteAllBooks() {
  const token = getToken();
  const res = await fetch(API_URL, {
    method: "DELETE",
    headers: token ? { Authorization: `Bearer ${token}` } : {},
  });
  if (!res.ok) throw new Error("Error al eliminar todos los libros");
  return res.json();
}