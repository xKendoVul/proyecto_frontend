"use client"

import { useForm, Controller } from "react-hook-form"
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { BookData } from "@/interfaces/book.interface"
import { Label } from "../ui/label"
import { Input } from "../ui/input"
import { Button, buttonVariants } from '@/components/ui/button';
import { addBook, updateBook, getOneBook } from "@/app/api/book.api"
import Select from "react-select"
import { getAllGenres } from "@/app/api/genre.api"
import { getAllAuthors } from "@/app/api/author.api"
import { getAllPublishers } from "@/app/api/publisher.api"

export function BookForm({ bookId }: { bookId?: number }) {
  const { register, handleSubmit, reset, control } = useForm<BookData>();
  const router = useRouter();
  const [loading, setLoading] = useState(false)
  const [loadingOptions, setLoadingOptions] = useState(true);
  const [genres, setGenres] = useState<{ value: number, label: string }[]>([])
  const [publishers, setPublishers] = useState<{ value: number, label: string }[]>([])
  const [authors, setAuthors] = useState<{ value: number, label: string }[]>([])

  useEffect(() => {
    const fetchOptions = async () => {
      const genresResult = await getAllGenres();
      setGenres(genresResult.data.map((genre) => ({
        value: genre.id,
        label: genre.name,
      })));
      const authorsResult = await getAllAuthors();
      setAuthors(authorsResult.data.map((author) => ({
        value: author.id,
        label: author.name,
      })));

      const publishersResult = await getAllPublishers();
      setPublishers(publishersResult.data.map((publisher) => ({
        value: publisher.id,
        label: publisher.name,
      })));
      setLoadingOptions(false);
    };
    fetchOptions();
  }, []);

  useEffect(() => {
    if (bookId) {
      setLoading(true)
      getOneBook({ id: bookId }).then((book) => {
        if (book && book.data) {
          reset({
            "title": book.data.title,
            "publication_year": book.data.publication_year,
            "genre_id": book.data.genre.id,
            "author_id": book.data.author.id,
            "publisher_id": book.data.publisher.id,
            "isAvailable": book.data.isAvailable,
            "available_copies": book.data.available_copies,
            "image": book.data.image,
          });
        }
        setLoading(false)
      });
    } else {
      reset(); // Limpia el form si es creación
    }
  }, [bookId, reset]);

  const onSubmit = handleSubmit(async (data) => {
    if (bookId) {
      await updateBook({ ...data, id: bookId });
      alert("Libro Actualizado");
    } else {
      await addBook(data);
      alert("Libro Insertado");
    }
    router.push("/dashboard/books");
    router.refresh();
  });

  if (bookId && loading) {
    return <div>Cargando datos</div>
  }

  if (loadingOptions) {
    return <div>Cargando opciones...</div>;
  }

  return (
    <form className="max-w-lg mx-auto bg-white rounded-2xl shadow-lg p-8 space-y-6" onSubmit={onSubmit}>
      <h2 className="text-2xl font-bold text-indigo-800 mb-4 text-center">Registrar Libro</h2>
      
      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-1">Título</label>
        <input
          type="text"
          className="w-full px-4 py-2 rounded-lg border border-indigo-200 focus:outline-none focus:ring-2 focus:ring-indigo-400"
          placeholder="Título del libro"
          required
          {...register("title")}
        />
      </div>

      <Label>Autor</Label>
      <Controller
        name="author_id"
        control={control}
        render={({ field }) => (
          <Select
            {...field}
            options={authors}
            placeholder="Agregar autor"
            value={authors.find(opt => opt.value === (typeof field.value === "object" && field.value !== null ? field.value.id : field.value)) || null}
            onChange={option => field.onChange(option ? option.value : null)}
            isClearable
          />
        )}
      />

      <Label>Fecha de Publicacion</Label>
      <Input type="number" {...register("publication_year", {valueAsNumber: true})} />

      <Label>Géneros</Label>
      <Controller
        name="genre_id"
        control={control}
        render={({ field }) => (
          <Select
            {...field}
            isMulti
            options={genres}
            isClearable
            placeholder="Agregar géneros"
            value={Array.isArray(field.value)
              ? genres.filter(opt => (field.value as (number | { id: number })[]).some(v =>
                  typeof v === "number" ? v === opt.value : typeof v === "object" && v !== null && "id" in v && v.id === opt.value
                ))
              : []
            }
            onChange={options => field.onChange(options ? options.map(opt => opt.value) : [])}
          />
        )}
      />

      <Label>Editorial</Label>
      <Controller
        name="publisher_id"
        control={control}
        render={({ field }) => (
          <Select
            {...field}
            options={publishers}
            placeholder="Agregar editorial"
            value={publishers.find(opt => opt.value === (typeof field.value === "object" && field.value !== null ? field.value.id : field.value)) || null}
            onChange={option => field.onChange(option ? option.value : null)}
            isClearable
          />
        )}
      />

      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-1">Género</label>
        <Controller
          name="genre_id"
          control={control}
          render={({ field }) => (
            <Select
              {...field}
              isMulti
              options={genres}
              isClearable
              placeholder="Agregar géneros"
              value={genres.filter(opt => field.value?.includes(opt.value))}
              onChange={options => field.onChange(options ? options.map(opt => opt.value) : [])}
              className="w-full px-4 py-2 rounded-lg border border-indigo-200 focus:outline-none focus:ring-2 focus:ring-indigo-400"
            />
          )}
        />
      </div>

      <Label>Unidades</Label>
      <Input type="number" {...register("available_copies", {valueAsNumber: true})} />

      <Label>Link Imagen</Label>
      <Input placeholder="Link de Imagen" {...register("image")} />

      <Button className={buttonVariants({ variant: "default" })}>
        {bookId ? "Actualizar" : "Agregar"}
      </Button>
    </form>
  )
}

export default BookForm;