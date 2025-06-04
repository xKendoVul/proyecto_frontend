import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import AuthorForm from "@/components/authors/author-form";

function BrandsAddPage() {
  return (
    <div className="h-screen flex justify-center items-center">
      <Card>
        <CardHeader>
          <CardTitle>Agregar Nueva Editorial</CardTitle>
        </CardHeader>
        <CardContent>
          <AuthorForm />
        </CardContent>
      </Card>
    </div>
  );
}

export default BrandsAddPage;
