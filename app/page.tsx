import Image from "next/image";
import Pagination from "./components/Pagination";
import LastestIssues from "./LastestIssues";

export default function Home({
  searchParams,
}: {
  searchParams: { page: string };
}) {
  return (
    <div>
      <LastestIssues />
    </div>
  );
}
