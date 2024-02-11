import React from "react";
import prisma from "@/prisma/client";
import { Avatar, Flex, Table } from "@radix-ui/themes";
import IssueBadge from "./components/IssueBadge";
import Link from "next/link";

const LastestIssues = async () => {
  const lastestIssues = await prisma.issue.findMany({
    orderBy: {
      createdAt: "desc",
    },
    take: 5,
    include: {
        assignedToUser: true,
        },
  });
  return (
    <Table.Root variant="surface">
      <Table.Row>
        <Table.ColumnHeaderCell>Latest Issues</Table.ColumnHeaderCell>
      </Table.Row>
      {lastestIssues.map((issue) => (
        <Table.Row key={issue.id}>
          <Table.Cell>
            <Flex justify="between">
            <Flex align="start" gap="2" direction="column">
              <Link href={`/issues/${issue.id}`}>{issue.title}</Link>
              <IssueBadge status={issue.status} />
            </Flex>
            {issue.assignedToUser && (
                <Avatar src={issue.assignedToUser.image!}
                fallback="?"/>)}
            </Flex>
          </Table.Cell>
        </Table.Row>
      ))}
    </Table.Root>
  );
};

export default LastestIssues;
