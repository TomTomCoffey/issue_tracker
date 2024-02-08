import prisma from "@/prisma/client";
import { notFound } from "next/navigation";
import { Box, Flex, Grid } from "@radix-ui/themes";
import EditIssueButton from "./EditIssueButton";
import IssueDetails from "./IssueDetails";
import DeleteIssueButton from "./edit/DeleteIssueButton";
import AssignSelect from "./AssignSelect";

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
    <Grid columns={{ initial: "1", md: "5" }} gap="5">
      <Box className="lg:col-span-4">
        <IssueDetails issue={issue} />
      </Box>
      <Box>
        <Flex gap="5" direction="column">
          <AssignSelect issue={issue} />
          <EditIssueButton issueId={issue!.id} />
          <DeleteIssueButton issueId={issue!.id} />
        </Flex>
      </Box>
    </Grid>
  );
};

export default IssueIdPage;
