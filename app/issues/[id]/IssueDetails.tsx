import IssueBadge from "@/app/components/IssueBadge";
import { Issue } from "@prisma/client";
import { Heading, Flex, Card, Text } from "@radix-ui/themes";
import React from "react";
import ReactMarkdown from "react-markdown";

const IssueDetails = ({ issue }: { issue: Issue }) => {
  return (
    <>
      <Heading>{issue!.title}</Heading>
      <Flex gap="5" my="3">
        <IssueBadge status={issue!.status} />
        <Text>{issue!.createdAt.toDateString()}</Text>
      </Flex>
      <Card className="prose max-w-full">
        <ReactMarkdown>{issue!.description}</ReactMarkdown>
      </Card>
    </>
  );
};

export default IssueDetails;
