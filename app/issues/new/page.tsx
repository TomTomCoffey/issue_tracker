"use client";
import { Button, TextArea, TextField } from "@radix-ui/themes";
import React from "react";

const newIssue = () => {
  return (
    <div className="max-w-xl space-y-4">
      <TextField.Root>
        <TextField.Input placeholder="Type here" />
      </TextField.Root>
      <TextArea placeholder="description"></TextArea>
      <Button>Submit</Button>
    </div>
  );
};

export default newIssue;
