"use client";
import React, { useState } from "react";
import { AlertDialog, Button, Flex } from "@radix-ui/themes";
import { useRouter } from "next/navigation";
import Spinner from "@/app/components/Spinner";

const DeleteIssueButton = ({ issueId }: { issueId: number }) => {
  const router = useRouter();
  const [spin, setSpin] = useState(false);
  return (
    <>
      <AlertDialog.Root>
        <AlertDialog.Trigger>
          <Button color="red" disabled={spin}>
            {spin && <Spinner />}
            Delete Issue
          </Button>
        </AlertDialog.Trigger>
        <AlertDialog.Content style={{ maxWidth: 450 }}>
          <AlertDialog.Title>Delete Issue</AlertDialog.Title>
          <AlertDialog.Description size="2">
            Are you sure you want to delete this issue?
          </AlertDialog.Description>

          <Flex gap="3" mt="4" justify="end">
            <AlertDialog.Cancel>
              <Button variant="soft" color="gray">
                Cancel
              </Button>
            </AlertDialog.Cancel>
            <AlertDialog.Action>
              <Button
                variant="solid"
                color="red"
                onClick={async () => {
                  setSpin(true);
                  fetch(`/api/issues/${issueId}`, {
                    method: "DELETE",
                  }).then(() => {
                    router.push("/issues");
                    router.refresh();
                  });
                }}
              >
                Delete Issue
              </Button>
            </AlertDialog.Action>
          </Flex>
        </AlertDialog.Content>
      </AlertDialog.Root>
    </>
  );
};

export default DeleteIssueButton;
