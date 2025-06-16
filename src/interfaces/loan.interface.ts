import { Book } from "./book.interface";
// import { User } from "./user.interface";

export interface Loan {
  id: number;
  books: Book[];
  user: 1;
  loan_date: string;
  return_date: string;
  state: boolean;
  isReturned: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface CreateLoanDto {
  user_id: number;
  book_id: number[]; // IDs de los libros a prestar
  loan_date: string; // formato ISO
  return_date: string; // formato ISO
  state?: boolean;
}

