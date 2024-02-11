"use client";
import { Issue, User } from "@prisma/client";
import { Select } from "@radix-ui/themes";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { useToaster } from "react-hot-toast";

const AssignSelect = ({ issue }: { issue: Issue }) => {
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    const getThemUsers = async () => {
      const res = await fetch("/api/users");
      const data: User[] = await res.json();
      setUsers(data);
    };
    getThemUsers();
  }, []);

  const router = useRouter();

  return (
    <>
      <Toaster />
      <Select.Root
        defaultValue={issue.assignedToUserId || ""}
        onValueChange={(userId) => {
          fetch(`/api/issues/${issue.id}`, {
            method: "PATCH",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              assignedToUserId: userId || null,
            }),
          })
            .then(() => {
              console.log("Assigned");
              toast.success("Issue assigned");
              router.refresh();
            })
            .catch(() => {
              toast.error("Failed to assign issue");
            });
        }}
      >
        <Select.Trigger placeholder="Assign"></Select.Trigger>
        <Select.Content>
          <Select.Group>
            <Select.Label>Suggestions</Select.Label>
            {/* <Select.Item value="">Unassigned</Select.Item>  will get back to this for unassigning users*/}
            {users.map((user) => (
              <Select.Item key={user.id} value={user.id}>
                {user.name}
              </Select.Item>
            ))}
          </Select.Group>
        </Select.Content>
      </Select.Root>
    </>
  );
};

export default AssignSelect;
