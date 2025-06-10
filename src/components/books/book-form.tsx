"use client"

import { useForm } from "react-hook-form"
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
  const { register, handleSubmit, reset } = useForm<BookData>();
  const router = useRouter();
  const [loading, setLoading] = useState(false)
  const [genres, setGenres] = useState<{ value: number, label: string }[]>([])
  const [publishers, setPublishers] = useState<{ value: number, label: string }[]>([])
  const [authors, setAuthors] = useState<{ value: number, label: string }[]>([])

  const loadGenres = async (inputValue: string) => { 
    const result = await getAllGenres()
    return result.data.map((genre) => ({
      value: genre.id,
      label: genre.name,
    }));
  };

  const loadAuthors = async() => {
    const result = await getAllAuthors()
    const options = result.data.map((author) => ({
      value: author.id,
      label: author.name,
    }));
    setAuthors(options)
  }

  const loadPublishers = async() => {
    const result = await getAllPublishers()
    const options = result.data.map((publisher) => ({
      value: publisher.id,
      label: publisher.name,
    }));
    setPublishers(options)
  }

  useEffect(() => {
    if (bookId) {
      setLoading(true)
      getOneBook({ id: bookId}).then((book) => {
        console.log("libro: ", book)
          if (book && book.data) {
            reset({ "id": book.data.id, "title": book.data.title})
          }
          setLoading(false)
      });
    }
    loadGenres()
    loadAuthors()
    loadPublishers()
  }, [bookId, reset]);

  const onSubmit = handleSubmit(async (data) => {
    if (bookId) {
      await updateBook({ ...data, id: bookId});
      alert("Libro Actualizado");
    } else {
      await addBook(data);
      alert("Libro Insertado");
    }
    router.push("dashboard/books");
    router.refresh()
  });

  if (bookId && loading) {
    return <div>Cargando datos</div>
  }

  return (
    <form onSubmit={onSubmit}>
      <Label>Libro</Label>
      <Input {...register("title")}/>

      <Label>Autor</Label>
      <Select
        {...authors}
        options = {authors}
        placeholder="agregar author"
      />

      <Label>Fecha de Publicacion</Label>
      <Input {...register("publication_year")}/>
      <Label>Generos</Label>
      <Select
        isMulti
        options = {genres}
        isClearable
        placeholder="agregar generos"
      />

      <Label>Editorial</Label>
      <Select
        options = {publishers}
        placeholder="agregar editorial"
      />

      <Label>Disponibilidad</Label>
      <Select 
        options={[
          { value: true, label: "Disponible" },
          { value: false, label: "No disponible" }
        ]}
        placeholder="Seleccionar disponibilidad"
      />

      <Label>Link Imagen</Label>
      <Input placeholder="Link de Imagen" {...register("image")}/>
    </form>
  )
}