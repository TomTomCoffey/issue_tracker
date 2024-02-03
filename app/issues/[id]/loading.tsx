import IssueBadge from "@/app/components/IssueBadge";
import { Heading, Flex, Card, Text } from "@radix-ui/themes";
import delay from "delay";
import React from "react";
import Skeleton from "react-loading-skeleton";

const loadingByIssueId = async () => {
 await delay(2000);
 
  return <div>Loading...</div>;
};

export default loadingByIssueId;
