import { Flex, Card, Box } from '@radix-ui/themes'
import React from 'react'
import Skeleton from 'react-loading-skeleton'
import "react-loading-skeleton/dist/skeleton.css";

const loadingNewIssue = () => {
  return (
    <Box className="max-w-xl">
      <Skeleton />
      <Flex gap="5" my="3">
        <Skeleton width={100} height={20} />
        <Skeleton width={100} height={20} />
      </Flex>
      <Card className="prose">
        <Skeleton count={5} />
      </Card>
    </Box>
  )
}

export default loadingNewIssue