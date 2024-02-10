'use client';
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  DoubleArrowLeftIcon,
  DoubleArrowRightIcon,
} from "@radix-ui/react-icons";
import { Flex, Text, Button } from "@radix-ui/themes";
import { useRouter, useSearchParams } from "next/navigation";
import React from "react";

interface Props {
  itemCount: number;
  pageSize: number;
  currentPage: number;
}

const Pagination = ({ itemCount, pageSize, currentPage }: Props) => {
  const pagesCount = Math.ceil(itemCount / pageSize);
  const router = useRouter();
  const searchParams = useSearchParams();
  if (pagesCount === 1) return null;

const changePage = (page: number) => {
    const params = new URLSearchParams();
    params.set("page", page.toString());
    router.push('?'+params.toString());
    }


  return (
    <Flex align="center" gap="9">
      <Text size="1">
        Page {currentPage} of {pagesCount}{" "}
        <Button color="blue" variant="soft" disabled={currentPage === 1} onClick={()=>changePage(1)}>
          <DoubleArrowLeftIcon />
        </Button>
        <Button color="blue" variant="soft" disabled={currentPage === 1} onClick={()=> changePage(currentPage-1)}>
          <ChevronLeftIcon />
        </Button>
        <Button
          color="blue"
          variant="soft"
          disabled={currentPage === pagesCount}
        onClick={()=>changePage(currentPage+1)}>
          <ChevronRightIcon />
        </Button>
        <Button
          color="blue"
          variant="soft"
          disabled={currentPage === pagesCount}
        onClick={()=> changePage(pagesCount)}>
          <DoubleArrowRightIcon />
        </Button>
      </Text>
    </Flex>
  );
};

export default Pagination;
