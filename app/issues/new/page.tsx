import React from "react";
import dynamic from "next/dynamic";
import LoadingSkel from "../components/LoadingSkel";

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
const NewIssuePage = () => {
  return (
    <>
      <IssueForm />
    </>
  );
};

export default NewIssuePage;
