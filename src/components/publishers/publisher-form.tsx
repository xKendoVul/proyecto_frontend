"use client";

import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { PublisherData } from "@/interfaces/publisher.interface";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button, buttonVariants } from "../ui/button";
import { addPublisher, updatePublisher, getOnePublisher } from "@/app/api/publisher.api";

export function PublisherForm({ publisherId }: { publisherId?: number }) {
  const { register, handleSubmit, reset } = useForm<PublisherData>();
  const router = useRouter();
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (publisherId) {
      setLoading(true)
      getOnePublisher({ id: publisherId }).then((publisher) => {
        console.log("autor: ", publisher)
        if (publisher && publisher.data) {
          reset({ "id": publisher.data.id, "name": publisher.data.name });
        }
        setLoading(false)
      }); 
    }
  }, [publisherId, reset]);

  const onSubmit = handleSubmit(async (data) => {
    if (publisherId) {
      await updatePublisher({ ...data, id: publisherId });
      alert("Editorial Actualizada");
    } else {
      await addPublisher(data);
      alert("Editorial insertada");
    }
    router.push("/dashboard/publishers");
    router.refresh();
  });

  if (publisherId && loading) {
    return <div>Cargando los datos</div>
  }

  return (
    <form onSubmit={onSubmit}>
      <Label>Editorial</Label>
      <Input {...register("name")} />
      <br />
      <Button className={buttonVariants({ variant: "default" })}>
        {publisherId ? "Actualizar" : "Agregar"}
      </Button>
    </form>
  );
}

export default PublisherForm;