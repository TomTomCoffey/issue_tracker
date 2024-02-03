"use client";
import { Button, Callout, TextArea, TextField } from "@radix-ui/themes";
import SimpleMDE from "react-simplemde-editor";
import "easymde/dist/easymde.min.css";
import React, { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { newIssueSchema } from "@/app/newIssueSchema";
import Spinner from "@/app/components/Spinner";

interface Issue {
  title: string;
  description: string;
}

const newIssue = () => {
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<Issue>({
    resolver: zodResolver(newIssueSchema),
  });
  const router = useRouter();
  const [error, setError] = useState("");
  const [spin, setSpin] = useState(false);
  return (
    <div>
      {error && (
        <Callout.Root color="red">
          <Callout.Text>{error}</Callout.Text>
        </Callout.Root>
      )}
      <form
        className="max-w-xl space-y-4"
        onSubmit={handleSubmit((data) => {
          try {
            setSpin(true);
            fetch("/api/issues", {
              method: "POST",
              body: JSON.stringify(data),
              headers: {
                "Content-Type": "application/json",
              },
            }).then(() => {
              router.push("/issues");
            });
          } catch (errors) {
            setSpin(false);
            setError(
              "An error occured please ensure all fields are filled out idiot."
            );
          }
        })}
      >
        <TextField.Root>
          <TextField.Input placeholder="Type here" {...register("title")} />
        </TextField.Root>
        {errors.title && <TextArea>{errors.title.message}</TextArea>}
        <Controller
          name="description"
          control={control}
          render={({ field }) => (
            <SimpleMDE placeholder="description" {...field}></SimpleMDE>
          )}
        />
        {errors.description && (
          <TextArea color="red">{errors.description.message}</TextArea>
        )}

        <Button disabled={spin}>Submit{spin && <Spinner />}</Button>
      </form>
    </div>
  );
};

export default newIssue;
