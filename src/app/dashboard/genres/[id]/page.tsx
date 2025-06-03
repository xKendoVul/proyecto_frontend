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
          <CardTitle>Agregar Nueva Marca</CardTitle>
        </CardHeader>
        <CardContent>
          <GenreForm genreId={Number(resolvedParams.id)} />
        </CardContent>
      </Card>
    </div>
  );
}

export default GenresAddPage;