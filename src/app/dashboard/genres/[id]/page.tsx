import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import GenreForm from "@/components/genres/genre-form";

type Props = {
  params: Promise<{ id: string }>
}

async function GenresAddPage({ params }: Props ) {
  const resolvedParams = await params
  return (
    <div className="h-screen flex justify-center items-center">
      <Card>
        <CardHeader>
          <CardTitle>Agregar Genero</CardTitle>
        </CardHeader>
        <CardContent>
          <GenreForm genreId={Number(resolvedParams.id)} />
        </CardContent>
      </Card>
    </div>
  );
}

export default GenresAddPage;

export function GeneroInsertadoCard({ genero }) {
  if (!genero) return null;

  return (
    <div className="flex flex-col items-center justify-center bg-gradient-to-br from-emerald-100 via-white to-blue-100 border border-emerald-200 rounded-2xl shadow-xl p-8 max-w-sm mx-auto mt-8 animate-fade-in">
      <span className="text-4xl mb-4">✅</span>
      <h2 className="text-2xl font-bold text-emerald-700 mb-2">¡Género insertado!</h2>
      <p className="text-lg text-gray-700 mb-4">El género <span className="font-semibold text-emerald-600">{genero.name}</span> fue agregado correctamente.</p>
      {genero.image && (
        <img
          src={genero.image}
          alt={genero.name}
          className="w-24 h-24 object-cover rounded-full shadow mb-2"
        />
      )}
    </div>
  );
}