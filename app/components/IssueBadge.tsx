import { Status } from "@prisma/client";
import { Badge, Flex } from "@radix-ui/themes";
import React from "react";

interface IssueBadgeProps {
  status: Status;
}

const map: Record<
  Status,
  { label: string; color: "red" | "orange" | "green" }
> = {
  OPEN: {
    label: "Open",
    color: "red",
  },
  IN_PROGRESS: {
    label: "In progress",
    color: "orange",
  },
  DONE: {
    label: "Closed",
    color: "green",
  },
};

const IssueBadge = ({ status }: IssueBadgeProps) => {
  return <Badge color={map[status].color}>{map[status].label}</Badge>;
};

export default IssueBadge;
