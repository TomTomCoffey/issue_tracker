"use client";
import { Button, Callout, Flex, RadioGroup, TextArea, TextField, Text } from "@radix-ui/themes";
//import SimpleMDE from "react-simplemde-editor";
import "easymde/dist/easymde.min.css";
import React, { cache, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { newIssueSchema } from "@/app/newIssueSchema";
import Spinner from "@/app/components/Spinner";
import delay from "delay";
import dynamic from "next/dynamic";

const SimpleMDE = dynamic(() => import("react-simplemde-editor"), {
  ssr: false,
});

interface Issue {
  id: number;
  title: string;
  description: string;
}

const IssueForm = ({ issue }: { issue?: Issue }) => {
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
  
  delay(3000);

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
          if (issue) {
            fetch(`/api/issues/${issue.id}`, {
              method: "PATCH",
              body: JSON.stringify(data),
              headers: {
                "Content-Type": "application/json",
              },
            }).then(() => {
              router.push("/issues");
              router.refresh();
            });
          }

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
              router.refresh();
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
          <TextField.Input
            defaultValue={issue?.title}
            placeholder="Type here"
            {...register("title")}
          />
        </TextField.Root>
        {errors.title && <TextArea>{errors.title.message}</TextArea>}
        <Controller
          name="description"
          control={control}
          defaultValue={issue?.description}
          render={({ field }) => (
            <SimpleMDE placeholder="description" {...field}></SimpleMDE>
          )}
        />
        {errors.description && (
          <TextArea color="red">{errors.description.message}</TextArea>
        )}

        {issue && (<RadioGroup.Root defaultValue="1">
  <Flex gap="2" direction="column">
    <Text as="label" size="2">
      <Flex gap="2">
        <RadioGroup.Item value="1" /> Open
      </Flex>
    </Text>
    <Text as="label" size="2">
      <Flex gap="2">
        <RadioGroup.Item value="2" /> In Progress
      </Flex>
    </Text>
    <Text as="label" size="2">
      <Flex gap="2">
        <RadioGroup.Item value="3" /> Closed
      </Flex>
    </Text>
  </Flex>
</RadioGroup.Root>)}

        <Button disabled={spin}>
          {issue ? "Update Issue" : "Create Issue"}
          {spin && <Spinner />}
        </Button>
      </form>
    </div>
  );
};

export default IssueForm;
