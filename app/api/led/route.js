
import { NextResponse } from "next/server";

let ledState = { red: false, green: false, blue: false };

export async function GET() {
  return NextResponse.json(ledState);
}

export async function POST(req) {
  try {
    const { color, state } = await req.json();
    if (!["red","green","blue"].includes(color) || !["on","off"].includes(state)) {
      return NextResponse.json({ error: "Invalid request" }, { status: 400 });
    }
    ledState[color] = state === "on";
    return NextResponse.json({ success: true, ledState });
  } catch {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }
}
