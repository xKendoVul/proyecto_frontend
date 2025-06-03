import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import AuthorTable from '../../../components/authors/author-table';

function AuthorTablePage() {
  return (
    <div className="container mx-auto py-8">
      <Card className="w-full max-w-6xl mx-auto">
        <CardHeader>
          <CardTitle>Tabla de Autores</CardTitle>
        </CardHeader>
        <CardContent>
          <AuthorTable />
        </CardContent>
      </Card>
    </div>
  );
}

export default AuthorTablePage;