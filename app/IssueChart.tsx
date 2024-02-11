'use client';
import { Card } from '@radix-ui/themes';
import React from 'react'
import {ResponsiveContainer, XAxis, YAxis, BarChart, Bar} from "recharts";

interface Props {
    open: number;
    inProgress: number;
    closed: number;
  }

const IssueChart = ({open, inProgress, closed}: Props) => {

    const stats = [
        {
          label: "Open",
          value: open,
        },
        {
          label: "In Progress",
          value: inProgress,
        },
        {
          label: "Closed",
          value: closed,
        },
    ]
  return (
     <Card>
        <ResponsiveContainer width="100%" height={300}>
            <BarChart data={stats}>
              <XAxis dataKey="label" />
                <YAxis />
                <Bar dataKey="value" fill="#8884d8" barSize={80} />
            </BarChart>
        </ResponsiveContainer>  
     </Card>
  )
}

export default IssueChart