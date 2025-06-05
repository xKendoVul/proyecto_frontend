"use client"

import React, { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button, buttonVariants } from "../ui/button"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { Book, BookResponse } from "@/interfaces/book.interface"
import { getAllBooks, deleteBook } from "@/app/api/book.api"
import { PiPlusCircleBold } from "react-icons/pi";
import { BiPencil, BiTrash } from "react-icons/bi";

export function BookTable() {
  const [offset, setoffset] = useState(0);
  const [limit] = useState(3);
  const [booksData, setBooksData] = useState<BookResponse>({
    data: [],
    total: 0,
  })

  const router = useRouter();

  const loadBooks = async (newOffset: number) => {
    const result = await getAllBooks(newOffset, limit);0
    setBookData(result);
    setoffset(newOffset);
    console.log(result)
  };

  const Delete = async (bookId: number) => {
    try {
      await deleteBook(bookId);
      alert("libro eliminado correctamente");
      await loadBooks(offset);
    } catch (error) {
      console.log(error)
      alert('Error al eliminar el libro')
    }
  };

  useEffect(() => {
    loadBooks(0);
  } []);

  return (
    <div className='space-y-4'>
      <div className="flex justify-end">
        <Link 
          href="dashboard/books/add"
          className={buttonVariants({ variant: "default" })}
        >
          <PiPlusCircleBold className="mr-2 h-4 w-4" />
          Agregar Libro
        </Link>
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader></TableHeader>
        </Table>
      </div>
    </div>
  )
  
}

export default BookTable;