import { NextRequest, NextResponse } from "next/server";
import prisma from "@/prisma/client";
import { NextAuthOptions } from "next-auth";
import schemea from "./schema";
import bcrypt from "bcrypt";

export async function GET(request: NextRequest) {
  const users = await prisma.user.findMany({
    orderBy: {
      name: "asc",
    },
  });
  return NextResponse.json(users);
}

export async function POST(request: NextRequest) {
  const body = await request.json();
  const validation = schemea.safeParse(body);
  if (!validation.success) {
    return NextResponse.json(
      { error: validation.error.errors },
      { status: 400 }
    );
  }

  const user = await prisma.user.findUnique({
    where: {
      email: body.email,
    },
  });

  if (user) {
    return NextResponse.json({ error: "User already exists" }, { status: 400 });
  }

  const hashedPassword = await bcrypt.hash(body.password, 10);

  const newUser = await prisma.user.create({
    data: {
      email: body.email,
      name: body.name,
      hashedPassword,
    },
  });

  return NextResponse.json(newUser, { status: 201 });
}
