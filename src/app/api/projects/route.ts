import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  const projects = await prisma.project.findMany();
  return NextResponse.json(projects);
}

export async function POST(req: Request) {
  const body = await req.json();

  const project = await prisma.project.create({
    data: {
      project_name: body.project_name,
      description: body.description,
      github_url: body.github_url,
      live_url: body.live_url,
      created_at: body.created_at,
    },
  });

  return NextResponse.json(project);
}
