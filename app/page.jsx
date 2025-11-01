"use client";

import { useEffect, useState } from "react";

export default function HomePage() {
  const [data, setData] = useState({ temperature: 0, humidity: 0, analog: 0, distance: 0 }); // ✅ distance 추가

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
    const interval = setInterval(fetchData, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <main
      style={{
        fontFamily: "'Comic Sans MS', 'Chalkboard SE', 'Comic Neue', cursive",
        padding: "2rem",
        textAlign: "center",
        background: "linear-gradient(180deg, #87CEEB 0%, #4FB4E8 50%, #2E8BC0 100%)",
        minHeight: "100vh",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* 기존 버블, 애니메이션 그대로 유지 */}
      {/* ... 생략 ... */}

      <div style={{ position: "relative", zIndex: 1 }}>
        {/* 기존 타이틀, 파인애플 하우스, 온도, 습도, 아날로그 표시 유지 */}
        {/* ... 생략 ... */}

        {/* 🔹 초음파 센서 거리 표시 추가 */}
        <div
          style={{
            marginTop: "2rem",
            padding: "1rem 0",
            borderTop: "4px dashed #FF9800",
          }}
        >
          <p
            style={{
              fontSize: "1rem",
              color: "#009688",
              marginBottom: "0.8rem",
              fontWeight: "bold",
              letterSpacing: "2px",
              textTransform: "uppercase",
              textShadow: "2px 2px 0 #FFEB3B",
            }}
          >
            📏 거리거리거리!!
          </p>
          <p
            style={{
              fontSize: "3.5rem",
              color: "#00796B",
              fontWeight: "bold",
              margin: 0,
              textShadow: "3px 3px 0 #FFEB3B, -2px -2px 0 #26A69A",
              animation: "wiggle 1.6s ease-in-out infinite",
            }}
          >
            {data.distance.toFixed(1)}
            <span style={{ fontSize: "1.8rem", marginLeft: "0.5rem", color: "#004D40" }}>
              cm
            </span>
          </p>
        </div>

        {/* 기존 Gary the snail timestamp, 문구, 젤리피쉬 애니메이션 유지 */}
        {/* ... 생략 ... */}
      </div>
    </main>
  );
}
