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

  const searchParams = useSearchParams();

  return (
    <Select.Root
      onValueChange={(status) => {
        const params = new URLSearchParams();
        if (status) params.append("status", status);
        if (searchParams.get("orderBy")) {
          params.append("orderBy", searchParams.get("orderBy")!);
        }
        const query = params.size ? "?" + params.toString() : "";

        if (status === "ALL") {
          router.push(`/issues${query}`);
          return;
        }
        router.push("/issues" + query);
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
