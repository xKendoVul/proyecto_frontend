import { AuthorData, AuthorOneResponse, AuthorResponse } from "@/interfaces/author.interface";

export async function getOneAuthor(data: { id: number }): Promise<AuthorOneResponse> {
  const res = await fetch(
    `http://localhost:4000/api/v1/author/${data.id}`,
    { cache: "no-store" }
  );
  return await res.json();
}

export async function getAllAuthors(
  offset: number = 0,
  limit: number = 5
): Promise<AuthorResponse> {
  const res = await fetch(
    `http://localhost:4000/api/v1/author?limit=${limit}&offset=${offset}`,
    { cache: "no-store" }
  );
  return await res.json();
}

export async function addAuthor(data: AuthorData) {
  const res = await fetch("http://localhost:4000/api/v1/author", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    throw new Error("Error al agregar el autor");
  }

  return await res.json();
}

export async function updateAuthor(data: AuthorData) {
  const res = await fetch(`http://localhost:4000/api/v1/author/${data.id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return await res.json();
}

export async function deleteAuthor(authorId: number) {
  const res = await fetch(`http://localhost:4000/api/v1/author/${authorId}`, {method: "DELETE"});
  if (!res.ok) {
    const errorData = await res.json()
    throw { response: { data: errorData } };
  }
  return
}