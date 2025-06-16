"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogClose, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { createLoan } from "@/app/api/loans.api";
import type { CreateLoanDto } from "@/interfaces/loan.interface";

export function LoanRequestDialog({ userId, bookId, bookTitle }: { userId: number, bookId: number, bookTitle: string }) {
  const { register, handleSubmit, reset, formState: { errors } } = useForm<CreateLoanDto>();
  const [loading, setLoading] = useState(false);

  const onSubmit = async (data: any) => {
    setLoading(true);
    try {
      await createLoan({
        user_id: userId,
        book_id: [bookId],
        loan_date: data.loan_date,
        return_date: data.return_date,
      });
      reset();
      alert("Solicitud enviada");
    } catch (e) {
      alert("Error al solicitar el préstamo");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Solicitar préstamo</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Solicitar préstamo</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className="block mb-1">Libro</label>
            <input
              type="text"
              value={bookTitle}
              disabled
              className="w-full border rounded px-2 py-1 bg-gray-100"
            />
          </div>
          <div>
            <label className="block mb-1">Fecha de préstamo</label>
            <input type="date" {...register("loan_date", { required: true })} className="w-full border rounded px-2 py-1" />
          </div>
          <div>
            <label className="block mb-1">Fecha de devolución</label>
            <input type="date" {...register("return_date", { required: true })} className="w-full border rounded px-2 py-1" />
          </div>
          <DialogFooter>
            <Button type="submit" disabled={loading}>
              {loading ? "Enviando..." : "Enviar solicitud"}
            </Button>
            <DialogClose asChild>
              <Button type="button" variant="outline">Cancelar</Button>
            </DialogClose>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}