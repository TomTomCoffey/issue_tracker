"use client";
import { Button, Callout, TextArea, TextField } from "@radix-ui/themes";
import SimpleMDE from "react-simplemde-editor";
import "easymde/dist/easymde.min.css";
import React, { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { useRouter } from "next/navigation";

interface Issue {
  title: string;
  description: string;
}

const newIssue = () => {
  const { register, control, handleSubmit } = useForm<Issue>();
  const router = useRouter();
  const [error, setError] = useState("");
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
            setError(
              "An error occured please ensure all fields are filled out."
            );
          }
        })}
      >
        <TextField.Root>
          <TextField.Input placeholder="Type here" {...register("title")} />
        </TextField.Root>
        <Controller
          name="description"
          control={control}
          render={({ field }) => (
            <SimpleMDE placeholder="description" {...field}></SimpleMDE>
          )}
        />

        <Button>Submit</Button>
      </form>
    </div>
  );
};

export default newIssue;
