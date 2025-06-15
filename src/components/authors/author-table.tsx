"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Button, buttonVariants } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { getAllAuthors, deleteAuthor } from "@/app/api/author.api";
import { PiPlusCircleBold } from "react-icons/pi";
import { BiPencil, BiTrash } from "react-icons/bi";
import { AuthorResponse } from "@/interfaces/author.interface";

export function AuthorTable() {
  const [offset, setOffset] = useState(0);
  const [limit] = useState(3);
  const [AuthorsData, setAuthorsData] = useState<AuthorResponse>({
    data: [],
    total: 0,
  });

  const router = useRouter();

  const loadAuthors = async (newOffset: number) => {
    const result = await getAllAuthors(newOffset, limit);
    setAuthorsData(result);
    setOffset(newOffset);

    console.log(result)
  };

  const Delete = async (authorId: number) => {
    try {
      await deleteAuthor(authorId);
      alert('Autor eliminado correctamente');
      await loadAuthors(offset);
    } catch (error: any) {
      const msg = 
        error?.response?.data?.message ||
        error?.message ||
        'error al eliminar autor';
      alert(msg);
    }
  };

  useEffect(() => {
    loadAuthors(0);
  }, []);

  return (
    <div className="space-y-4">
      <div className="flex justify-end">
        <Link
          href="/dashboard/authors/add"
          className={buttonVariants({ variant: "default" })}
        >
          <PiPlusCircleBold className="mr-2 h-4 w-4" />
          Agregar Autor
        </Link>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>ID</TableHead>
              <TableHead>Nombre</TableHead>
              <TableHead className="text-right">Acciones</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {AuthorsData.data.map((author) => (
              <TableRow key={author.id}>
                <TableCell className="font-medium">{author.id}</TableCell>
                <TableCell>{author.name}</TableCell>
                <TableCell className="text-right">
                  <div className="flex gap-2 justify-end">
                    <Button onClick={() => router.push(`/dashboard/authors/${author.id}`)}
                      variant="outline"
                      size="sm"
                      className="bg-blue-600 text-white :hover:bg-blue-700"
                    >
                      <BiPencil className="h-4 w-4" /> Editar
                    </Button>
                    <Button onClick={() => Delete(author.id)}
                      variant="destructive"
                      size="sm"
                      className="bg-destructive text-destructive-foreground"
                    >
                      <BiTrash className="h-4 w-4" />
                      Eliminar
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <div className="flex items-center justify-center gap-4">
        <Button
          variant="outline"
          disabled={offset === 0}
          onClick={() => loadAuthors(offset - limit)}
        >
          Anterior
        </Button>
        <span className="text-sm text-muted-foreground">
          Página {Math.floor(offset / limit) + 1} de{" "}
          {Math.ceil(AuthorsData.total / limit)}
        </span>
        <Button
          variant="outline"
          className="hover:bg-gray-400/90"
          disabled={offset + limit >= AuthorsData.total}
          onClick={() => loadAuthors(offset + limit)}
        >
          Siguiente
        </Button>
      </div>
    </div>
  );
}

export default AuthorTable;