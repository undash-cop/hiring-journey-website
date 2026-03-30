import { NextResponse } from "next/server";
import { careerSummaries } from "@/lib/content-data";
import { careerIdToSlug } from "@/lib/careers-data";

export async function GET() {
  const jobs = careerSummaries.map((job) => ({
    ...job,
    slug: careerIdToSlug[String(job.id)],
  }));
  return NextResponse.json({ jobs });
}
