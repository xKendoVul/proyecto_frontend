import { BookData, BookOneResponse, BookResponse } from "@/interfaces/book.interface";

export async function getOneBook(data: { id: number }): Promise<BookOneResponse> {
  const res = await fetch(
    `http://localhost:4000/api/v1/books/${data.id}`,
    { cache: "no-store" }
  );
  return await res.json();
}

export async function getAllBooks(
  offset: number = 0,
  limit: number = 5
): Promise<BookResponse> {
  const res = await fetch(
    `http://localhost:4000/api/v1/books?limit=${limit}&offset=${offset}`,
    { cache: "no-store" }
  );
  return await res.json();
}

export async function addBook(data: BookData) {
  const res = await fetch("http://localhost:4000/api/v1/books", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    throw new Error("Error al agregar el libro");
  }

  return await res.json();
}

export async function updateBook(data: BookData) {
  const res = await fetch(`http://localhost:4000/api/v1/books/${data.id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return await res.json();
}

export async function deleteBook(bookId: number) {
  await fetch(`http://localhost:4000/api/v1/books/${bookId}`, {
    method: "DELETE",
  });
}