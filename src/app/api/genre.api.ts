import { GenreData, GenreResponse, Genre } from "@/interfaces/genre.interface";

export async function getOneGenre(data: { id: number }): Promise<Genre> {
  const res = await fetch (
    `http://localhost:4000/api/v1/genre/${data.id}`,
    { cache: "no-store" }
  );
  return await res.json();
}

export async function getAllGenres(
  // offset: number = 0,
  // limit: number = 5
): Promise<GenreResponse> {
  const res = await fetch (
    `http://localhost:4000/api/v1/genre`,
    { cache: "no-store" }
  );
  return await res.json();
}

export async function addGenre(data: GenreData) {
  const res = await fetch("http://localhost:4000/api/v1/genre", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    throw new Error("Error al agregar la marca");
  }

  return await res.json();
}

export async function updateGenre(data: GenreData) {
  const res = await fetch(`http://localhost:4000/api/v1/genre/${data.id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return await res.json();
}

export async function deleteGenre(genreId: number) {
  await fetch(`http://localhost:4000/api/v1/genre/${genreId}`, {
    method: "DELETE",
  });
}