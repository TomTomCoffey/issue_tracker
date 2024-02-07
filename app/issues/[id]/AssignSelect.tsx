"use client";
import { Select } from "@radix-ui/themes";
import React from "react";

const AssignSelect = () => {
  return (
    <>
      <Select.Root>
        <Select.Trigger placeholder="Assign"></Select.Trigger>
        <Select.Content>
          <Select.Group>
            <Select.Label>Suggestions</Select.Label>
            <Select.Item value="1">One</Select.Item>
            <Select.Item value="2">Two</Select.Item>
            <Select.Item value="3">Three</Select.Item>
          </Select.Group>
        </Select.Content>
      </Select.Root>
    </>
  );
};

export default AssignSelect;
