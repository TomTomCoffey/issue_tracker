"use client";
import { Status } from "@prisma/client";
import { Select } from "@radix-ui/themes";

const status: { label: string; value?: Status }[] = [
  {
    label: "All",
  },
  {
    label: "Open",
    value: "OPEN",
  },
  {
    label: "Closed",
    value: "DONE",
  },
  {
    label: "In Progress",
    value: "IN_PROGRESS",
  },
];

const IssueStatusFilter = () => {
  return (
    <Select.Root>
      <Select.Trigger placeholder="Filter by status" />
      <Select.Content>
        {status.map((s) => (
          <Select.Item key={s.label} value={s.value || 'ALL'}>
            {s.label}
          </Select.Item>
        ))}
      </Select.Content>
    </Select.Root>
   
  );
};

export default IssueStatusFilter;
