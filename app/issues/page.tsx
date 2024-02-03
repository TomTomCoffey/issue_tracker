import React from "react";
import { Button, Table } from "@radix-ui/themes";
import Link from "next/link";
import prisma from "@/prisma/client";
import IssueBadge from "../components/IssueBadge";
import NewIssueButton from "../components/NewIssueButton";
import delay from "delay";

const page = async () => {
  const issues = await prisma.issue.findMany();
  //await delay(3000);

  return (
    <div>
      <NewIssueButton />
      <Table.Root variant="surface">
        <Table.Row>
          <Table.ColumnHeaderCell>Title</Table.ColumnHeaderCell>
          <Table.ColumnHeaderCell className="hidden: md:table-cell">
            Status
          </Table.ColumnHeaderCell>
          <Table.ColumnHeaderCell className="hidden: md:table-cell">
            Created
          </Table.ColumnHeaderCell>
        </Table.Row>
        {issues.map((issue) => (

          <Table.Row key={issue.id}>
            <Link href={`/issues/${issue.id}`} className="block hover:bg-gray-200">
              <Table.Cell>{issue.title}</Table.Cell>
            </Link>
            <Table.Cell className="hidden: md:table-cell">
              <IssueBadge status={issue.status} />
            </Table.Cell>
            <Table.Cell className="hidden: md:table-cell">
              {issue.createdAt.toDateString()}
            </Table.Cell>
          </Table.Row>
        ))}
      </Table.Root>
    </div>
  );
};

export default page;
