import { Button, Table } from "@radix-ui/themes";
import Link from "next/link";
import React from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import IssueBadge from "../components/IssueBadge";
import NewIssueButton from "../components/NewIssueButton";

const loadingIssues = () => {
  const temp = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
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
        {temp.map((issue) => (
          <Table.Row key={issue}>
            <Table.Cell>
              <Skeleton />
            </Table.Cell>
            <Table.Cell className="hidden: md:table-cell">
              <Skeleton />
            </Table.Cell>
            <Table.Cell className="hidden: md:table-cell">
              <Skeleton />
            </Table.Cell>
          </Table.Row>
        ))}
      </Table.Root>
    </div>
  );
};

export default loadingIssues;
