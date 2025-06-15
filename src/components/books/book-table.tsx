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
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Book, BookResponse } from "@/interfaces/book.interface"
import { getAllBooks, deleteBook } from "@/app/api/book.api"
import { PiPlusCircleBold } from "react-icons/pi";
import { BiPencil, BiTrash } from "react-icons/bi";
import Image from 'next/image';

export function BookTable() {
  const [offset, setoffset] = useState(0);
  const [limit] = useState(3);
  const [booksData, setBooksData] = useState<BookResponse>({
    data: [],
    total: 0,
  })

  const router = useRouter();

  const loadBooks = async (newOffset: number) => {
    const result = await getAllBooks(newOffset, limit);
    setBooksData(result);
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
  }, []);

  return (
    <div className='space-y-4'>
      <div className="flex justify-end">
        <Link 
          href="/dashboard/books/add"
          className={buttonVariants({ variant: "default" })}
        >
          <PiPlusCircleBold className="mr-2 h-4 w-4" />
          Agregar Libro
        </Link>
      </div>
      <div className="rounded-md border">
          {(!booksData.data || booksData.data.length === 0) ? (
            <div className="p-4 text-center text-gray-500">No hay libros registrados.</div>
          ) : 
            booksData.data.map((book) => (
              <Card key={book.id} className="border-2">
              <CardHeader>
                <CardTitle>{book.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <Image
                  src={book.image}
                  alt="portada libro"
                  height={300}
                  width={200}
                  style={{ objectFit: "cover" }}
                />
                <div className="mt-2">
                  <h2 className="font-semibold">Generos</h2>
                  <div className="flex flex-wrap gap-2">
                    {book.genre && book.genre.length > 0 ? (
                      book.genre.map((g) => (
                        <span
                        key={g.id}
                        className="bg-gray-200 rounded px-2 py-1"
                        >
                          {g.name}
                        </span>
                      ))
                    ) : (
                      <span className="text-gray-400">Sin género</span>
                    )}
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex gap-2 justify-end">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => router.push(`/dashboard/books/${book.id}`)}
                >
                  Ver
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => router.push(`/dashboard/books/edit/${book.id}`)}
                >
                  <BiPencil className="mr-1" /> Editar
                </Button>
              </CardFooter>
            </Card>
          ))}
      </div>
    </div>
  )
  
}

export default BookTable;