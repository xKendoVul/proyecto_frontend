import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BookForm } from "@/components/books/book-form";

function BrandsAddPage() {
  return (
    <div className="h-screen flex justify-center items-center">
      <Card>
        <CardHeader>
          <CardTitle>Agregar Nuevo Autor</CardTitle>
        </CardHeader>
        <CardContent>
          <BookForm />
        </CardContent>
      </Card>
    </div>
  );
}

export default BrandsAddPage;
