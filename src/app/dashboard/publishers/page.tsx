import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import PublisherTable from '../../../components/publishers/publisher-table';

function PublisherTablePage() {
  return (
    <div className="container mx-auto py-8">
      <Card className="w-full max-w-6xl mx-auto">
        <CardHeader>
          <CardTitle>Tabla de Editoriales</CardTitle>
        </CardHeader>
        <CardContent>
          <PublisherTable />
        </CardContent>
      </Card>
    </div>
  );
}

export default PublisherTablePage;