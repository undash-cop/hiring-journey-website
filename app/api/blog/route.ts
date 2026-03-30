import { NextResponse } from "next/server";
import { blogSummaries } from "@/lib/content-data";

export async function GET() {
  return NextResponse.json({ posts: blogSummaries });
}
