import React from 'react'
import prisma from "@/prisma/client";
import { notFound } from 'next/navigation';


interface Props{
    params: {
        id: string
    
    }
}

const IssueIdPage = async ({params} : Props) => {
    const issue = await prisma.issue.findUnique({
        where: {
            id: parseInt(params.id)
        }
    })
    if(!issue){
        notFound();
    }
  return (
    <div>
      <h1>{issue!.title}</h1>
      <p>{issue!.description}</p>
      <p>{issue!.status}</p>
    </div>
  )
}

export default IssueIdPage