import { CreateLoanDto, Loan } from "@/interfaces/loan.interface";

export async function getLoans(): Promise<Loan[]> {
    const response = await fetch("http://localhost:4000/api/v1/loans", {
    method: "GET",
    headers: { "Content-Type": "application/json" },
    });
    if (!response.ok) {
        throw new Error("Error al obtener los préstamos");
    }
  const result = await response.json();
  return result.data;
}

export async function confirmLoan(id: number) {
  await fetch(`http://localhost:4000/api/v1/loans/${id}/confirm`, { method: "PATCH" });
}

export async function denyLoan(id: number) {
  await fetch(`http://localhost:4000/api/v1/loans/${id}/deny`, { method: "PATCH" });
}

export async function createLoan(data: CreateLoanDto): Promise<Loan> {
  const response = await fetch("http://localhost:4000/api/v1/loans", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error("Error al crear el préstamo");
  }

  const result = await response.json();
  return result.data; 
}