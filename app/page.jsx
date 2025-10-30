"use client";

import { useEffect, useState } from "react";

export default function HomePage() {
  const [data, setData] = useState({ temperature: 0, humidity: 0, analog: 0 });

  async function fetchData() {
    try {
      const res = await fetch("/api/data");
      if (!res.ok) throw new Error("Failed to fetch");
      const json = await res.json();
      setData(json);
    } catch (err) {
      console.error(err);
    }
  }

  useEffect(() => {
    fetchData();
    const interval = setInterval(fetchData, 5000); // 5초마다 새로고침
    return () => clearInterval(interval);
  }, []);

  return (
    <main
      style={{
        fontFamily: "sans-serif",
        padding: "2rem",
        textAlign: "center",
        background: "#f9fafb",
        minHeight: "100vh",
      }}
    >
      <h1>🌡️ ESP32 센서 데이터 모니터</h1>
      <div
        style={{
          display: "inline-block",
          marginTop: "2rem",
          padding: "1.5rem 3rem",
          background: "white",
          borderRadius: "1rem",
          boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
        }}
      >
        <p style={{ fontSize: "1.5rem" }}>
          <strong>온도:</strong> {data.temperature.toFixed(1)} °C
        </p>
        <p style={{ fontSize: "1.5rem" }}>
          <strong>습도:</strong> {data.humidity.toFixed(1)} %
        </p>
        <p style={{ fontSize: "1.5rem" }}>
          <strong>아날로그:</strong> {data.analog}
        </p>
      </div>

      <p style={{ marginTop: "2rem", color: "#666" }}>
        마지막 갱신: {new Date().toLocaleTimeString()}
      </p>
    </main>
  );
}
