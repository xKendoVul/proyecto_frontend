import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import PublisherForm from "@/components/publishers/publisher-form";

type Props = {
  params: Promise<{ id: string }>
}

async function PublishersAddPage({ params }: Props ) {
  const resolvedParams = await params
  return (
    <div className="h-screen flex justify-center items-center">
      <Card>
        <CardHeader>
          <CardTitle>Actualizar Editorial</CardTitle>
        </CardHeader>
        <CardContent>
          <PublisherForm publisherId={Number(resolvedParams.id)} />
        </CardContent>
      </Card>
    </div>
  );
}

export default PublishersAddPage;