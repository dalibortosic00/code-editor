import { NextRequest, NextResponse } from "next/server";
import { executeCode } from "@/lib/piston";

export async function POST(request: NextRequest) {
  const body = await request.json();

  try {
    const result = await executeCode(body);
    return NextResponse.json(result);
  } catch (err) {
    const message = err instanceof Error ? err.message : "Execution failed";
    return NextResponse.json({ error: message }, { status: 502 });
  }
}
