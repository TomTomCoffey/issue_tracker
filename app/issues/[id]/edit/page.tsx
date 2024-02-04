import React from "react";
import IssueForm from "../../components/IssueForm";
import prisma from "@/prisma/client";

interface Props {
  params: {
    id: string;
  };
}

const EditIssuePage = async ({params}: Props) => {

    const issue = await prisma.issue.findUnique({
        where: {
            id: parseInt(params.id),
        },
        });

  return (
    <>
      <IssueForm issue={issue!}/>
    </>
  );
};

export default EditIssuePage;
