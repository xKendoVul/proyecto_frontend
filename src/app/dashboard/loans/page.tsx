import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LoansCards } from "@/components/loan/loan-table";

function LoansTablePage() {
  return (
    <div className="container mx-auto py-8">
      <Card className="w-full max-w-6xl mx-auto">
        <CardHeader>
          <CardTitle>Tabla de Prestamos</CardTitle>
        </CardHeader>
        <CardContent>
          <LoansCards />
        </CardContent>
      </Card>
    </div>
  );
}

export default LoansTablePage;