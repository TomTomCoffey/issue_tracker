import Image from "next/image";
import Pagination from "./components/Pagination";
import LastestIssues from "./LastestIssues";
import IssueSummary from "./IssueSummary";
import prisma from "@/prisma/client";
import IssueChart from "./IssueChart";
import { Card, Flex, Grid } from "@radix-ui/themes";

export default async function Home() {
  const open = await prisma.issue.count({
    where: { status: "OPEN" },
  });
  const inProgress = await prisma.issue.count({
    where: { status: "IN_PROGRESS" },
  });
  const closed = await prisma.issue.count({
    where: { status: "DONE" },
  });

  return (
    <div className="blue">
      <Grid columns={{ initial: "1", md: "2" }} gap="5">
        <Flex direction='column' gap="5">
          <Card>
        <IssueSummary open={open} inProgress={inProgress} closed={closed} />
        </Card>
        <Card>
        <IssueChart open={open} inProgress={inProgress} closed={closed} />
        </Card>
        </Flex>
        <Card>
        <LastestIssues />
        </Card>
      </Grid>
    </div>
  );
}
