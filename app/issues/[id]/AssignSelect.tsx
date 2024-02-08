"use client";
import { Issue, User } from "@prisma/client";
import { Select } from "@radix-ui/themes";
import { useQuery } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";

const AssignSelect = ({issue}: {issue: Issue}) => {
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    const getThemUsers = async () => {
      const res = await fetch("/api/users");
      const data: User[] = await res.json();
      setUsers(data);
    };
    getThemUsers();
  }, []);

  return (
    <>
      <Select.Root onValueChange={(userId)=>{
        fetch(`/api/issues/${issue.id}`, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({assignedToUserId: userId}),
        });

      }}>
        <Select.Trigger placeholder="Assign"></Select.Trigger>
        <Select.Content>
          <Select.Group>
            <Select.Label>Suggestions</Select.Label>
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
