import React from 'react'
import prisma from '@/prisma/client'
import { Link, Table } from '@radix-ui/themes'
import IssueBadge from './components/IssueBadge'

const LastestIssues = async () => {
    const lastestIssues = await prisma.issue.findMany({
        orderBy: {
            createdAt: 'desc'
        },
        take: 5
    })
  return (
    
    <Table.Root variant="surface">
      <Table.Row>
        <Table.ColumnHeaderCell>Issue</Table.ColumnHeaderCell>
        <Table.ColumnHeaderCell>Status</Table.ColumnHeaderCell>
        <Table.ColumnHeaderCell>Created</Table.ColumnHeaderCell>
      </Table.Row>
      {lastestIssues.map((issue) => (
        <Table.Row key={issue.id}>
          <Table.Cell>
            <Link href={`/issues/${issue.id}`}>{issue.title}</Link>
          </Table.Cell>
          <Table.Cell>
            <IssueBadge status={issue.status} />
          </Table.Cell>
          <Table.Cell>{issue.createdAt.toString()}</Table.Cell>
        </Table.Row>
      ))}
    </Table.Root>
  )
}

export default LastestIssues