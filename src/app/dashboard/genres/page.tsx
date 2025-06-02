import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import GenreTable from "../../../components/genres/genre-table";

function BrandsTablePage() {
  return (
    <div className="container mx-auto py-8">
      <Card className="w-full max-w-6xl mx-auto">
        <CardHeader>
          <CardTitle>Tabla de Marcas</CardTitle>
        </CardHeader>
        <CardContent>
          <GenreTable />
        </CardContent>
      </Card>
    </div>
  );
}

export default BrandsTablePage;
