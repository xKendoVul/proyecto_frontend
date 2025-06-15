"use client";

import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { GenreData } from '../../interfaces/genre.interface';
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button, buttonVariants } from "../ui/button";
import { addGenre, updateGenre, getOneGenre } from "../../app/api/genre.api";

export function GenreForm({ genreId }: { genreId?: number }) {
  const { register, handleSubmit, reset } = useForm<GenreData>();
  const router = useRouter();
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (genreId) {
      setLoading(true)
      getOneGenre({ id: genreId }).then((genre) => {
        console.log("genero: ", genre)
        if (genre && genre.data) {
          reset({ "id": genre.data.id, "name": genre.data.name });
        }
        setLoading(false)
      });
    }
  }, [genreId, reset]);

  const onSubmit = handleSubmit(async (data) => {
    if (genreId) {
      await updateGenre({ ...data, id: genreId });
      alert("Genero Actualizado");
    } else {
      await addGenre(data);
      alert("Genero insertado");
    }
    router.push("/dashboard/genres");
    router.refresh();
  });

  if (genreId && loading) {
    return <div>Cargando los datos</div>
  }

  return (
    <form onSubmit={onSubmit}>
      <Label>Genero</Label>
      <Input {...register("name")} />
      <br />
      <Button className={buttonVariants({ variant: "default" })}>
        {genreId ? "Actualizar" : "Agregar"}
      </Button>
    </form>
  );                                        
}

export default GenreForm;