// /app/api/data/route.js
import { NextResponse } from "next/server";

let sensorData = {
  temperature: 0,
  humidity: 0,
  analog: 0, // ✅ 아날로그 데이터 추가
};

export async function POST(req) {
  try {
    const body = await req.json();
    const { temperature, humidity, analog } = body;

    if (typeof temperature === "number") sensorData.temperature = temperature;
    if (typeof humidity === "number") sensorData.humidity = humidity;
    if (typeof analog === "number") sensorData.analog = analog;

    return NextResponse.json({ success: true, sensorData });
  } catch (err) {
    return NextResponse.json({ error: "Invalid data" }, { status: 400 });
  }
}

export async function GET() {
  return NextResponse.json(sensorData);
}
