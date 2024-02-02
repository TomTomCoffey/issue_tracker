"use client";
import { Button, TextArea, TextField } from "@radix-ui/themes";
import SimpleMDE from "react-simplemde-editor";
import "easymde/dist/easymde.min.css";
import React from "react";

const newIssue = () => {
  return (
    <div className="max-w-xl space-y-4">
      <TextField.Root>
        <TextField.Input placeholder="Type here" />
      </TextField.Root>
      <SimpleMDE placeholder="description"></SimpleMDE>
      <Button>Submit</Button>
    </div>
  );
};

export default newIssue;
