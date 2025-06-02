"use client";

import { useForm } from "react-hook-form";

import { useRouter } from "next/navigation";
import { GenreData } from '../../interfaces/genre.interface';
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button, buttonVariants } from "../ui/button";
import { addGenre, updateGenre } from "../../app/api/genre.api";

export function GenreForm({ genreId }: { genreId?: number }) {
  const { register, handleSubmit } = useForm<GenreData>();
  const router = useRouter();

  const onSubmit = handleSubmit(async (data) => {
    if (genreId) {
      await updateGenre({ ...data, id: genreId });
      alert("Libro Actualizado");
    } else {
      await addGenre(data);
      alert("Libro insertado");
    }
    router.push("/dashboard/genres");
    router.refresh();
  });

  return (
    <form onSubmit={onSubmit}>
      <Label>Genero</Label>
      <Input {...register("name")}/>
      <br/>
      <Button className={buttonVariants({ variant: "default" })}>
        {genreId? "Actualizar" : "Agregar"}
      </Button>
    </form>
  );
}

export default GenreForm;