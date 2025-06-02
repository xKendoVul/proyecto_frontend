import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import GenreForm from "@/components/genres/genre-form";

function BrandsAddPage() {
  return (
    <div className="h-screen flex justify-center items-center">
      <Card>
        <CardHeader>
          <CardTitle>Agregar Nuevo Genero</CardTitle>
        </CardHeader>
        <CardContent>
          <GenreForm />
        </CardContent>
      </Card>
    </div>
  );
}

export default BrandsAddPage;
