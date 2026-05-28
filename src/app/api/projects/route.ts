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
      github_url: body.github_url,
      live_url: body.live_url,
      created_at: body.created_at,
    },
  });

  return NextResponse.json(project);
}
