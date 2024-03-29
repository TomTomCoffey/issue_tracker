import React, { useState } from "react";
import { Button, Table } from "@radix-ui/themes";
import Link from "next/link";
import prisma from "@/prisma/client";
import IssueBadge from "../components/IssueBadge";
import NewIssueButton from "../components/NewIssueButton";
import delay from "delay";
import { Issue, Status } from "@prisma/client";
import Pagination from "../components/Pagination";
import SearchIssue from "./[id]/SearchIssue";
import { Metadata } from "next";

interface Props {
  searchParams: { status: Status; orderBy: keyof Issue; page: string };
}

const page = async ({ searchParams }: Props) => {
  const colums: { label: string; value: keyof Issue; className?: string }[] = [
    { label: "Issue", value: "title" },
    { label: "Status", value: "status", className: "hidden: md:table-cell" },
    {
      label: "Created",
      value: "createdAt",
      className: "hidden: md:table-cell",
    },
  ];

  const stauses = Object.values(Status);

  const orderby = searchParams.orderBy
    ? { [searchParams.orderBy]: "asc" }
    : undefined;

  const page = parseInt(searchParams.page) || 1;
  const pageSize = 10;

  const issues = await prisma.issue.findMany({
    where: {
      status: searchParams.status,
    },
    orderBy: orderby,
    skip: (page - 1) * pageSize,
    take: pageSize,
  });

  const issuesCount = await prisma.issue.count({
    where: {
      status: searchParams.status,
    },
  });

  //await delay(3000);

  return (
    <div>
      <NewIssueButton />
      <SearchIssue />
      <Table.Root variant="surface">
        <Table.Row>
          {colums.map((column) => (
            <Table.ColumnHeaderCell
              key={column.value}
              className={column.className}
            >
              <Link
                href={{
                  query: {
                    ...searchParams,
                    orderBy: column.value,
                  },
                }}
              >
                {column.label}
              </Link>
            </Table.ColumnHeaderCell>
          ))}
        </Table.Row>
        {issues.map((issue) => (
          <Table.Row key={issue.id}>
            <Link
              href={`/issues/${issue.id}`}
              className="block hover:bg-gray-200"
            >
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
      <Pagination
        itemCount={issuesCount}
        pageSize={pageSize}
        currentPage={page}
      />
    </div>
  );
};

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Issues",
  description: "Search through all issues.",
};

export default page;
