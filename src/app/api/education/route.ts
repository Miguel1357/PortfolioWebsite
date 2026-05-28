import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  const education = await prisma.education.findMany();
  return NextResponse.json(education);
}

export async function POST(req: Request) {
  const body = await req.json();

  const education = await prisma.education.create({
    data: {
      school: body.school,
      degree: body.degree,
      field_of_study: body.field_of_study,
      start_date: body.start_date,
      graduation_date: body.graduation_date,
    },
  });

  return NextResponse.json(education);
}
