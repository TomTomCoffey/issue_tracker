import { Status } from "@prisma/client";
import { Card, Flex } from "@radix-ui/themes";
import Link from "next/link";
import React from "react";

interface Props {
  open: number;
  inProgress: number;
  closed: number;
}

const IssueSummary = ({ open, inProgress, closed }: Props) => {
  const stats: { label: string; value: number; status: Status }[] = [
    {
      label: "Open",
      value: open,
      status: Status.OPEN,
    },
    {
      label: "In Progress",
      value: inProgress,
      status: Status.IN_PROGRESS,
    },
    {
      label: "Closed",
      value: closed,
      status: Status.DONE,
    },
  ];

  return (
    <div>
      <Flex gap="3">
        {stats.map((stat) => (
          <Card key={stat.label} color="blue">
            <Flex direction="column" gap="1" align="center">
              <Link href={`/issues?status=${stat.status}`} className="font-meduim">{stat.label}</Link>
              <div className="font-bold">{stat.value}</div>
            </Flex>
          </Card>
        ))}
      </Flex>
    </div>
  );
};

export default IssueSummary;
