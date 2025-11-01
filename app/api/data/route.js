// /app/api/data/route.js
import { NextResponse } from "next/server";

let sensorData = {
  temperature: 0,
  humidity: 0,
  distance: 0, // 초음파 센서 거리값
};

export async function POST(req) {
  try {
    const body = await req.json();
    const { temperature, humidity, distance } = body;

    if (typeof temperature === "number") sensorData.temperature = temperature;
    if (typeof humidity === "number") sensorData.humidity = humidity;
    if (typeof distance === "number") sensorData.distance = distance;

    return NextResponse.json({ success: true, sensorData });
  } catch (err) {
    return NextResponse.json({ error: "Invalid data" }, { status: 400 });
  }
}

export async function GET() {
  return NextResponse.json(sensorData);
}