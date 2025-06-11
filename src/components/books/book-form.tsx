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
  const { register, handleSubmit, reset, control, setValue } = useForm<BookData>();
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

  // Si es edición, cargar datos del libro y resetear el form
  useEffect(() => {
    if (bookId) {
      setLoading(true)
      getOneBook({ id: bookId }).then((book) => {
        if (book && book.data) {
          reset({
            "title": book.data.title,
            "publication_year": book.data.publication_year,
            "genre": book.data.genre, // array de ids
            "author_id": book.data.author_id,
            "publisher_id": book.data.publisher_id,
            "isAvaliable": book.data.isAvaliable,
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
    // data.genre es array de ids, author_id y publisher_id son ids, isAvaliable es boolean
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
    <form onSubmit={onSubmit}>
      <Label>Libro</Label>
      <Input {...register("title")} />

      <Label>Autor</Label>
      <Controller
        name="author_id"
        control={control}
        render={({ field }) => (
          <Select
            {...field}
            options={authors}
            placeholder="Agregar autor"
            value={authors.find(opt => opt.value === field.value) || null}
            onChange={option => field.onChange(option ? option.value : null)}
            isClearable
          />
        )}
      />

      <Label>Fecha de Publicacion</Label>
      <Input type="number" {...register("publication_year")} />

      <Label>Géneros</Label>
      <Controller
        name="genre"
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
            value={publishers.find(opt => opt.value === field.value) || null}
            onChange={option => field.onChange(option ? option.value : null)}
            isClearable
          />
        )}
      />

      <Label>Disponibilidad</Label>
      <Controller
        name="isAvaliable"
        control={control}
        render={({ field }) => (
          <Select
            {...field}
            options={[
              { value: true, label: "Disponible" },
              { value: false, label: "No disponible" }
            ]}
            placeholder="Seleccionar disponibilidad"
            value={
              field.value === undefined
                ? null
                : [{ value: true, label: "Disponible" }, { value: false, label: "No disponible" }]
                    .find(opt => opt.value === field.value)
            }
            onChange={option => field.onChange(option ? option.value : null)}
            isClearable
          />
        )}
      />

      <Label>Link Imagen</Label>
      <Input placeholder="Link de Imagen" {...register("image")} />

      <Button className={buttonVariants({ variant: "default" })}>
        {bookId ? "Actualizar" : "Agregar"}
      </Button>
    </form>
  )
}

export default BookForm;