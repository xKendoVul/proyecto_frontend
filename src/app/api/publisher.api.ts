import { PublisherData, PublisherResponse, PublisherOneResponse } from "@/interfaces/publisher.interface";

export async function getOnePublisher(data: { id: number }): Promise<PublisherOneResponse> {
  const res = await fetch (
    `http://localhost:4000/api/v1/publisher/${data.id}`,
    { cache: "no-store" }
  );
  return await res.json();
}

export async function getAllPublishers(
  offset: number = 0,
  limit: number = 5
): Promise<PublisherResponse> {
  const res = await fetch (
    `http://localhost:4000/api/v1/publisher?limit=${limit}&offset=${offset}`,
    { cache: "no-store" }
  );
  return await res.json();
}

export async function addPublisher(data: PublisherData) {
  const res = await fetch("http://localhost:4000/api/v1/publisher", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    throw new Error("Error al agregar publisher");
  }

  return await res.json();
}

export async function updatePublisher(data: PublisherData) {
  const res = await fetch(`http://localhost:4000/api/v1/publisher/${data.id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return await res.json();
}

export async function deletePublisher(genreId: number) {
  await fetch(`http://localhost:4000/api/v1/publisher/${genreId}`, {
    method: "DELETE",
  });
}