// /app/api/data/route.js
import { NextResponse } from "next/server";

let sensorData = {
  temperature: 0,
  humidity: 0,
  analog: 0,   // ✅ 기존
  distance: 0, // ✅ 초음파 센서 값 추가
};

export async function POST(req) {
  try {
    const body = await req.json();
    const { temperature, humidity, analog, distance } = body; // ✅ distance 포함

    if (typeof temperature === "number") sensorData.temperature = temperature;
    if (typeof humidity === "number") sensorData.humidity = humidity;
    if (typeof analog === "number") sensorData.analog = analog;
    if (typeof distance === "number") sensorData.distance = distance; // ✅ 저장

    return NextResponse.json({ success: true, sensorData });
  } catch (err) {
    return NextResponse.json({ error: "Invalid data" }, { status: 400 });
  }
}

export async function GET() {
  return NextResponse.json(sensorData);
}
