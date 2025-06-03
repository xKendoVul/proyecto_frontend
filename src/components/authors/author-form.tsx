"use client";

import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { AuthorData } from "@/interfaces/author.interface";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button, buttonVariants } from "../ui/button";
import { addAuthor, updateAuthor, getOneAuthor } from "@/app/api/author.api";

export function AuthorForm({ authorId }: { authorId?: number }) {
  const { register, handleSubmit, reset } = useForm<AuthorData>();
  const router = useRouter();
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (authorId) {
      setLoading(true)
      getOneAuthor({ id: authorId }).then((author) => {
        console.log("autor: ", author)
        if (author && author.data) {
          reset({ "id": author.data.id, "name": author.data.name });
        }
        setLoading(false)
      }); 
    }
  }, [authorId, reset]);

  const onSubmit = handleSubmit(async (data) => {
    if (authorId) {
      await updateAuthor({ ...data, id: authorId });
      alert("Autor Actualizado");
    } else {
      await addAuthor(data);
      alert("Autor insertado");
    }
    router.push("/dashboard/authors");
    router.refresh();
  });

  if (authorId && loading) {
    return <div>Cargando los datos</div>
  }

  return (
    <form onSubmit={onSubmit}>
      <Label>Autor</Label>
      <Input {...register("name")} />
      <br />
      <Button className={buttonVariants({ variant: "default" })}>
        {authorId ? "Actualizar" : "Agregar"}
      </Button>
    </form>
  );
}

export default AuthorForm;