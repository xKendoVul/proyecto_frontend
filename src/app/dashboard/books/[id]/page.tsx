import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import BookForm from "@/components/books/book-form";

type Props = {
  params: Promise<{ id: string }>
}

async function BookEditPage({ params }: Props ) {
  const resolvedParams = await params
  return (
    <div className="h-screen flex justify-center items-center">
      <Card>
        <CardHeader>
          <CardTitle>Agregar Nueva Marca</CardTitle>
        </CardHeader>
        <CardContent>
          <BookForm bookId={Number(resolvedParams.id)} />
        </CardContent>
      </Card>
    </div>
  );
}

export default BookEditPage;