import { NextResponse } from "next/server";

// Mock job openings - Replace with database queries
const jobOpenings = [
  {
    id: 1,
    title: "Senior Frontend Developer",
    department: "Engineering",
    location: "Remote / Bangalore",
    type: "Full-time",
    posted: "2025-02-01",
  },
  {
    id: 2,
    title: "Product Designer",
    department: "Design",
    location: "Remote / Mumbai",
    type: "Full-time",
    posted: "2025-01-28",
  },
  {
    id: 3,
    title: "AI/ML Engineer",
    department: "Engineering",
    location: "Remote / Hyderabad",
    type: "Full-time",
    posted: "2025-01-25",
  },
  {
    id: 4,
    title: "Content Marketing Manager",
    department: "Marketing",
    location: "Remote",
    type: "Full-time",
    posted: "2025-01-20",
  },
];

export async function GET() {
  return NextResponse.json({ jobs: jobOpenings });
}
