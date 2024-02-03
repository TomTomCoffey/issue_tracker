import IssueBadge from "@/app/components/IssueBadge";
import { Heading, Flex, Card, Text, Box } from "@radix-ui/themes";
import delay from "delay";
import React from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import ReactMarkdown from "react-markdown";

const loadingByIssueId = async () => {
  await delay(2000);

  return (
    <Box className="max-w-xl">
      <Skeleton />
      <Flex gap="5" my="3">
        <Skeleton width={100} height={20} />
        <Skeleton width={100} height={20} />
      </Flex>
      <Card className="prose">
        <Skeleton count={5} />
      </Card>
    </Box>
  );
};

export default loadingByIssueId;
