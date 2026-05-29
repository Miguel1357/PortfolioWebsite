import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  console.log("DATABASE_URL:", process.env.DATABASE_URL);
  const profile = await prisma.profile.findMany();
  return NextResponse.json(profile);
}

export async function POST(req: Request) {
  const body = await req.json();

  const profile = await prisma.profile.create({
    data: {
      name: body.name,
      bio: body.bio,
    },
  });

  return NextResponse.json(profile);
}
