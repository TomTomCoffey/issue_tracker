import React from "react";
import dynamic from "next/dynamic";
import prisma from "@/prisma/client";
import LoadingSkel from "@/app/issues/components/LoadingSkel";


const IssueForm = dynamic(() => import("@/app/issues/components/IssueForm"), {
  ssr: false,
  loading() {
    return (
      <div>
        <LoadingSkel />
      </div>
    );
  },
});

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
