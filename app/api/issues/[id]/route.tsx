import { NextRequest, NextResponse } from "next/server";
import prisma from "@/prisma/client";
import { newIssueSchema } from "../../../newIssueSchema";

export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const body = await request.json();

  console.log(body);

  const validation = newIssueSchema.safeParse(body);

  if (!validation.success) {
    return NextResponse.json(
      { error: validation.error.errors },
      { status: 400 }
    );
  }

  if (body.assignedToUserId) {
    const user = await prisma.user.findUnique({
      where: {
        id: body.assignedToUserId,
      },
    });
    if (!user) {
      return NextResponse.json({ error: "Invalid User" }, { status: 400 });
    }
  }

  if (body.status) {
    if (
      body.status !== "OPEN" &&
      body.status !== "IN_PROGRESS" &&
      body.status !== "DONE"
    ) {
      return NextResponse.json({ error: "Invalid Status" }, { status: 400 });
    }
  }

  await prisma.issue.update({
    where: { id: parseInt(params.id) },
    data: {
      title: body.title,
      description: body.description,
      status: body.status,
      assignedToUserId: body.assignedToUserId,
    },
  });
  return NextResponse.json({ message: "Issue updated" }, { status: 200 });
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const issue = await prisma.issue.findUnique({
    where: {
      id: parseInt(params.id),
    },
  });
  if (!issue) {
    return NextResponse.json({ error: "Issue not found" }, { status: 404 });
  }
  await prisma.issue.delete({
    where: { id: parseInt(params.id) },
  });
  return NextResponse.json({ message: "Issue deleted" }, { status: 200 });
}
