import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import BookTable from "@/components/books/book-table";

function AuthorTablePage() {
  return (
    <div className="container mx-auto py-8">
      <Card className="w-full max-w-6xl mx-auto">
        <CardHeader>
          <CardTitle>Libros</CardTitle>
        </CardHeader>
        <CardContent className="grid-cols-4">
          <BookTable />
        </CardContent>
      </Card>
    </div>
  );
}

export default AuthorTablePage;