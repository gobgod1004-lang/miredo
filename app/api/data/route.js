//\app\api\data
import { NextResponse } from "next/server";

let sensorData = {
  temperature: 0,
  humidity: 0,
  red: false,
  green: false,
  blue: false,
};

export async function POST(req) {
  try {
    const body = await req.json();
    const { temperature, humidity } = body;
    if (typeof temperature === "number") sensorData.temperature = temperature;
    if (typeof humidity === "number") sensorData.humidity = humidity;
    return NextResponse.json({ success: true, sensorData });
  } catch (err) {
    return NextResponse.json({ error: "Invalid data" }, { status: 400 });
  }
}

export async function GET() {
  return NextResponse.json(sensorData);
}
