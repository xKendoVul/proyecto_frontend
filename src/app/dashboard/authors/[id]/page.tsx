import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import AuthorForm from "@/components/authors/author-form";

type Props = {
  params: Promise<{ id: string }>
}

async function GenresAddPage({ params }: Props ) {
  const resolvedParams = await params
  return (
    <div className="h-screen flex justify-center items-center">
      <Card>
        <CardHeader>
          <CardTitle>Acutalzar Autor</CardTitle>
        </CardHeader>
        <CardContent>
          <AuthorForm authorId={Number(resolvedParams.id)} />
        </CardContent>
      </Card>
    </div>
  );
}

export default GenresAddPage;