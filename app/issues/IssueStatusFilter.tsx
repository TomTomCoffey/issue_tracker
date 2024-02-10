"use client";
import { Status } from "@prisma/client";
import { Select } from "@radix-ui/themes";
import { useRouter, useSearchParams } from "next/navigation";

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
  const router = useRouter();

  const search = useSearchParams();

  return (
    <Select.Root
      onValueChange={(status) => {
        const params = new URLSearchParams();
        console.log(params.toString());
        if (status) {
          params.append("status", status);
        }
        const order = search.get("orderBy");

        if (status === "ALL") {
          router.push("/issues");
          return;
        }
        const query = status ? `?status=${status}&orderBy=${order}` : "";
        router.push(`/issues${query}`);
      }}
    >
      <Select.Trigger placeholder="Filter by status" />
      <Select.Content>
        {status.map((s) => (
          <Select.Item key={s.label} value={s.value ?? "ALL"}>
            {s.label}
          </Select.Item>
        ))}
      </Select.Content>
    </Select.Root>
  );
};

export default IssueStatusFilter;
