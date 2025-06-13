"use client"

import React, { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button, buttonVariants } from "../ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Book, BookResponse } from "@/interfaces/book.interface"
import { getAllBooks, deleteBook } from "@/app/api/book.api"
import { PiPlusCircleBold } from "react-icons/pi";
import { BiPencil, BiTrash } from "react-icons/bi";
import Image from 'next/image';

export function BookTable() {
  const [offset, setoffset] = useState(0);
  const [limit] = useState(4);
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
    <div>
      <div className="flex justify-end">
        <Link 
          href="/dashboard/books/add"
          className={buttonVariants({ variant: "default" })}
        >
          <PiPlusCircleBold className="mr-2 h-4 w-4" />
          Agregar Libro
        </Link>
      </div>
      <br />
      <div className="rounded-md border p-4">
        {(!booksData.data || booksData.data.length === 0) ? (
          <div className="p-4 text-center text-gray-500">No hay Libros</div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {booksData.data.map((book) => (
              <Card key={book.id} className="border-2 h-full flex flex-col shadow-md p-0">
              <CardHeader className="bg-gray-100 shadow-sm w-full p-0">
                <div className="w-full py-3 px-2 flex items-center justify-center">
                  <CardTitle 
                  className="text-lg font-bold text-center"
                  title={book.title}
                  >
                  {book.title}
                </CardTitle>
                </div>
              </CardHeader>
              <CardContent className="flex-1 flex flex-col items-center justify-between">
                <Image
                  src={book.image}
                  alt="portada libro"
                  height={200}
                  width={150}
                  style={{ objectFit: "cover" }}
                  className="mx-auto rounded"
                />
                <div className="mt-4 w-full">
                  <h2 className="font-semibold text-sm mb-1">Generos</h2>
                  <div className="flex flex-wrap gap-2">
                    {book.genre && book.genre.length > 0 ? (
                      book.genre.map((g) => (
                        <span
                        key={g.id}
                        className="bg-gray-200 rounded px-2 py-1 text-xs"
                        >
                          {g.name}
                        </span>
                      ))
                    ) : (
                      <span className="text-gray-400 text-xs">Sin género</span>
                    )}
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex gap-2 justify-end bg-gray-100 shadow-inner rounded-b-md">
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
                  onClick={() => router.push(`/dashboard/books/${book.id}`)}
                >
                  <BiPencil className="mr-1" /> Editar
                </Button>
              </CardFooter>
            </Card>
            ))}
          </div>
        )}
      </div>
      <div className="flex items-center justify-center gap-4 mt-4">
        <Button
          variant="outline"
          disabled={offset === 0}
          onClick={() => loadBooks(offset - limit)}
        >
          Anterior
        </Button>
        <span className="text-sm text-muted-foreground">
          Página {Math.floor(offset / limit) + 1} de{" "}
          {Math.ceil(booksData.total / limit)}
        </span>
        <Button
          variant="outline"
          className="hover:bg-gray-400/90"
          disabled={offset + limit >= booksData.total}
          onClick={() => loadBooks(offset + limit)}
        >
          Siguiente
        </Button>
      </div>
    </div>
  )
  
}

export default BookTable;