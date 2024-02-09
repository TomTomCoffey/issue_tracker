import { Button, Flex } from "@radix-ui/themes";
import Link from "next/link";
import React from "react";
import IssueStatusFilter from "../issues/IssueStatusFilter";

const NewIssueButton = () => {
  return (
    <Flex justify="between" mb="5">
      <IssueStatusFilter />
      <Button>
        <Link href="/issues/new">Create Issue</Link>
      </Button>
    </Flex>
  );
};

export default NewIssueButton;
