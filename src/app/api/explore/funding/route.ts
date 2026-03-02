import { NextResponse } from "next/server"

export const dynamic = "force-static"

export async function GET() {
  return NextResponse.json(
    { error: "This endpoint has been removed. Explore APIs are deprecated." },
    { status: 410 }
  )
}
