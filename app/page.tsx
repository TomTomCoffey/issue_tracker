import LastestIssues from "./LastestIssues";
import IssueSummary from "./IssueSummary";
import prisma from "@/prisma/client";
import IssueChart from "./IssueChart";
import { Card, Flex, Grid } from "@radix-ui/themes";
import { Metadata } from "next";


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

    <div className="blue text-bold mb-3 font-bold from-neutral-600 mt-5">
      {" "}
      Welcome Back 
      <Grid columns={{ initial: "1", md: "2" }} gap="5">
        <Flex direction="column" gap="5">
          <Card className="justify-center">
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

export const metadata: Metadata = {
  title: "Home",
  description: "Welcome to the home page"
}
