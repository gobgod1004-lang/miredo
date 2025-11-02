import { NextResponse } from "next/server";

// 전역으로 센서 데이터 저장
let sensorData = {
  temperature: 0,
  humidity: 0,
  distance: 0, // 초음파 센서 거리(cm)
  waterVolume: 0, // 물의 양(mL)
  magnetAttached: true, // 자석 센서 상태 (true: 붙어있음, false: 떨어짐)
};

export async function POST(req) {
  try {
    const body = await req.json();
    const { temperature, humidity, distance, waterVolume, magnetAttached } = body;

    if (typeof temperature === "number") sensorData.temperature = temperature;
    if (typeof humidity === "number") sensorData.humidity = humidity;
    if (typeof distance === "number") sensorData.distance = distance;
    if (typeof waterVolume === "number") sensorData.waterVolume = waterVolume;
    if (typeof magnetAttached === "boolean") sensorData.magnetAttached = magnetAttached;

    return NextResponse.json({ success: true, sensorData });
  } catch (err) {
    return NextResponse.json({ error: "Invalid data" }, { status: 400 });
  }
}

export async function GET() {
  return NextResponse.json(sensorData);
}