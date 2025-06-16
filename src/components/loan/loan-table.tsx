"use client"

import { useEffect, useState } from "react";
import { getLoans, confirmLoan, denyLoan } from "@/app/api/loans.api";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export function LoansCards() {
  const [loans, setLoans] = useState([]);

  const fetchLoans = async () => {
    const data = await getLoans();
    setLoans(data);
  };

  useEffect(() => {
    fetchLoans();
  }, []);

  const handleConfirm = async (id: number) => {
    await confirmLoan(id);
    fetchLoans();
  };

  const handleDeny = async (id: number) => {
    await denyLoan(id);
    fetchLoans();
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {loans.map((loan) => (
        <Card key={loan.id} className="flex flex-col items-center">
          <CardHeader className="w-full flex flex-col items-center">
            <img
              src={loan.books[0]?.image || "/placeholder.jpg"}
              alt={loan.books[0]?.title}
              className="w-32 h-48 object-cover rounded mb-2"
            />
            <CardTitle className="text-center">{loan.books[0]?.title}</CardTitle>
          </CardHeader>
          <CardContent className="w-full flex flex-col items-center">
            {/* <p className="text-sm mb-1">
              <span className="font-semibold">Solicitante:</span> {loan.user?.name || loan.user}
            </p> */}
            <p className="text-xs text-gray-500 mb-2">
              Fecha préstamo: {loan.loan_date?.slice(0, 10)}
            </p>
          </CardContent>
          <CardFooter className="w-full flex flex-col items-center gap-2">
            <div className="flex gap-2">
              <Button
                onClick={() => handleConfirm(loan.id)}
                disabled={loan.state}
                variant="default"
              >
                Confirmar
              </Button>
              <Button
                onClick={() => handleDeny(loan.id)}
                disabled={loan.state}
                variant="destructive"
              >
                Denegar
              </Button>
            </div>
            <p className="mt-1 text-xs">
              Estado:{" "}
              {loan.state
                ? "Confirmado"
                : loan.isReturned
                ? "Devuelto"
                : "Pendiente"}
            </p>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
}