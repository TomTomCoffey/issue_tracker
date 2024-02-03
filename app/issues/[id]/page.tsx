import React from "react";
import prisma from "@/prisma/client";
import { notFound } from "next/navigation";
import { Card, Flex, Heading, Text } from "@radix-ui/themes";
import IssueBadge from "@/app/components/IssueBadge";
import ReactMarkdown from "react-markdown";

interface Props {
  params: {
    id: string;
  };
}

const IssueIdPage = async ({ params }: Props) => {
  const issue = await prisma.issue.findUnique({
    where: {
      id: parseInt(params.id),
    },
  });
  if (!issue) {
    notFound();
  }
  return (
    <div>
      <Heading>{issue!.title}</Heading>
      <Flex gap="5" my="3">
        <IssueBadge status={issue!.status} />
        <Text>{issue!.createdAt.toDateString()}</Text>
      </Flex>
      <Card className="prose">
        <ReactMarkdown>{issue!.description}</ReactMarkdown>
      </Card>
    </div>
  );
};

export default IssueIdPage;
