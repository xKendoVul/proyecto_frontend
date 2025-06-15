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
import { Genre } from "../../interfaces/genre.interface";
import { getAllGenres, deleteGenre } from "../../app/api/genre.api";
import { PiPlusCircleBold } from "react-icons/pi";
import { BiPencil, BiTrash } from "react-icons/bi";

interface GenreResponse {
  data: Genre[];
  total: number;
}

export function GenreTable() {
  const [offset, setOffset] = useState(0);
  const [limit] = useState(3);
  const [genresData, setGenresData] = useState<GenreResponse>({
    data: [],
    total: 0,
  });

  const router = useRouter();

  const loadGenres = async (newOffset: number) => {
    const result = await getAllGenres(newOffset, limit);
    setGenresData(result);
    setOffset(newOffset);

    console.log(result)
  };

  const Delete = async (genreId: number) => {
    try {
      await deleteGenre(genreId);
      alert('Marca eliminada correctamente');
      await loadGenres(offset);
    } catch (error) {
      console.log(error)
      alert('Error al eliminar marca')
    }
  };

  useEffect(() => {
    loadGenres(0);
  }, []);

  return (
    <div className="space-y-4">
      <div className="flex justify-end">
        <Link
          href="/dashboard/genres/add"
          className={buttonVariants({ variant: "default" })}
        >
          <PiPlusCircleBold className="mr-2 h-4 w-4" />
          Agregar Genero
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
            {genresData.data.map((genre) => (
              <TableRow key={genre.id}>
                <TableCell className="font-medium">{genre.id}</TableCell>
                <TableCell>{genre.name}</TableCell>
                <TableCell className="text-right">
                  <div className="flex gap-2 justify-end">
                    <Button onClick={() => router.push(`/dashboard/genres/${genre.id}`)}
                      //   variant="outline"
                      size="sm"
                      className="bg-blue-600 text-white :hover:bg-blue-700"
                    >
                      <BiPencil className="h-4 w-4" /> Editar
                    </Button>
                    <Button onClick={() => Delete(genre.id)}
                      //   variant="destructive"
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
          onClick={() => loadGenres(offset - limit)}
        >
          Anterior
        </Button>
        <span className="text-sm text-muted-foreground">
          Página {Math.floor(offset / limit) + 1} de{" "}
          {Math.ceil(genresData.total / limit)}
        </span>
        <Button
          variant="outline"
          className="hover:bg-gray-400/90"
          disabled={offset + limit >= genresData.total}
          onClick={() => loadGenres(offset + limit)}
        >
          Siguiente
        </Button>
      </div>
    </div>
  );
}

export default GenreTable;