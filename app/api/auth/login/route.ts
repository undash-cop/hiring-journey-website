import { NextResponse } from "next/server";

const APP_API_URL =
  process.env.NEXT_PUBLIC_APP_URL ||
  "https://hiringjourney.com";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const upstreamResponse = await fetch(`${APP_API_URL}/api/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
      cache: "no-store",
    });

    const data = await upstreamResponse.json().catch(() => ({}));
    return NextResponse.json(data, { status: upstreamResponse.status });
  } catch {
    return NextResponse.json(
      { success: false, message: "Unable to process login request." },
      { status: 500 }
    );
  }
}

export async function OPTIONS() {
  return new NextResponse(null, { status: 204 });
}
