import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import GenreForm from "@/components/genres/genre-form";

function GenresAddPage({ params }: { params: { id: string}}) {
  return (
    <div className="h-screen flex justify-center items-center">
      <Card>
        <CardHeader>
          <CardTitle>Agregar Nueva Marca</CardTitle>
        </CardHeader>
        <CardContent>
          <GenreForm genreId={Number(params.id)}/>
        </CardContent>
      </Card>
    </div>
  );
}

export default GenresAddPage;