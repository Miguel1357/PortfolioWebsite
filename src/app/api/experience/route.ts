import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  const experience = await prisma.experience.findMany();
  return NextResponse.json(experience);
}

export async function POST(req: Request) {
  const body = await req.json();

  const experience = await prisma.experience.create({
    data: {
      title: body.title,
      company: body.company,
      location: body.location,
      description: body.description,
      start_date: body.start_date,
      end_date: body.end_date,
    },
  });

  return NextResponse.json(experience);
}
