import { NextResponse } from "next/server";
import { fetchTeamDataFromUndashCop } from "@/lib/fetch-team-data";

export async function GET() {
  try {
    const teamMembers = await fetchTeamDataFromUndashCop();
    
    return NextResponse.json({
      success: true,
      team: teamMembers,
    });
  } catch (error) {
    console.error("Error fetching team data:", error);
    return NextResponse.json({
      success: false,
      team: [],
      error: "Failed to fetch team data",
    }, { status: 500 });
  }
}
