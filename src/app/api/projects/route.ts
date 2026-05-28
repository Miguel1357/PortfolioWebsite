import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

// GET all projects
export async function GET() {
  const projects = await prisma.project.findMany();
  return NextResponse.json(projects);
}

// POST new project
export async function POST(req: Request) {
  const body = await req.json();

  const project = await prisma.project.create({
    data: {
      title: body.title,
      description: body.description,
    },
  });

  return NextResponse.json(project);
}
