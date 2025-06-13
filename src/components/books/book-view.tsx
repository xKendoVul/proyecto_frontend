"use client"

import Image from "next/image";
import { Badge } from "../ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "../ui/separator";
import { CheckCircle, XCircle } from "lucide-react";
import { BookOneResponse } from '../../interfaces/book.interface';
import { useEffect, useState } from "react";
import { getOneBook } from "@/app/api/book.api";

export default function BookView({ bookId }: { bookId?: number }) {

  const [bookData, setBookData] = useState<BookOneResponse | undefined>(undefined);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!bookId) return;
    const loadBook = async () => {
      try {
        const result = await getOneBook({id: bookId});
        setBookData(result);
        console.log(result)
      } finally {
        setLoading(false)
      }
    };
    loadBook();
  }, [bookId]);

  if (loading) return <div>Cargando libro...</div>;
  if (!bookData || !bookData.data) return <div>No se encontró el libro.</div>;

  const book = bookData.data

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-3x1 font-bold">{book.title}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wide mb-2">Autor</h3>
                <p className="text-x1 font-semibold">{book.author.name}</p>
              </div>
              <Separator/>
              <div>
                <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wide mb-2">Generos</h3>
                <div className="flex flex-wrap gap-2">
                  {book.genre.map((genre) => (
                    <Badge key={genre.id} variant="secondary" className="text-sm">
                      {genre.name}
                    </Badge>
                  ))}
                </div>
              </div>
              <Separator/>
              <div>
                <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wide mb-2">Año de publicacion</h3>
                <p className="text-x1 font-semibold">{book.publication_year}</p>
              </div>
              <Separator/>
              <div>
                <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wide mb-2">Editorial</h3>
                <p className="text-x1 font-semibold">{book.publisher.name}</p>
              </div>
              <Separator/>
              <div>
                <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wide mb-3">Estado</h3>
                <div className="flex items-center gap-2">
                  {book.isAvailable ? (
                    <>
                      <CheckCircle className="h-5 w-5 text-green-600" />
                      <Badge variant="default" className="bg-green-100 text-green-800 hover:bg-green-100">
                        Disponible
                      </Badge>
                    </>
                  ) : (
                    <>
                      <XCircle className="h-5 w-5 text-red-600" />
                      <Badge variant="destructive" className="bg-red-100 text-red-800 hover:bg-red-100">
                        No disponible
                      </Badge>
                    </>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
          </div>
          <div className="flex justify-center items-start">
            <div className="relative">
              <Image
                src={book.image}
                alt={`Portada de ${book.title}`}
                width={370}
                height={500}
                className="rounded-lg shadow-2xl border object-cover"
                priority
              />
            </div>
          </div>
      </div>
    </div>
  )
}