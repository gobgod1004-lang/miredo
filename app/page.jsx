"use client";

import { useEffect, useState } from "react";

export default function HomePage() {
  const [data, setData] = useState({
    temperature: 0,
    humidity: 0,
    distance: 0,
    waterVolume: 0,
  });

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
    const interval = setInterval(fetchData, 1000);
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
      {/* Bubbles */}
      <div
        style={{
          position: "absolute",
          top: "10%",
          left: "10%",
          width: "40px",
          height: "40px",
          borderRadius: "50%",
          background: "radial-gradient(circle at 30% 30%, rgba(255,255,255,0.8), rgba(173,216,230,0.4))",
          boxShadow: "inset -5px -5px 10px rgba(0,0,0,0.1)",
          animation: "bubble-float1 6s ease-in-out infinite",
        }}
      />
      <div
        style={{
          position: "absolute",
          top: "50%",
          right: "15%",
          width: "60px",
          height: "60px",
          borderRadius: "50%",
          background: "radial-gradient(circle at 30% 30%, rgba(255,255,255,0.8), rgba(173,216,230,0.4))",
          boxShadow: "inset -5px -5px 10px rgba(0,0,0,0.1)",
          animation: "bubble-float2 8s ease-in-out infinite",
        }}
      />
      <div
        style={{
          position: "absolute",
          bottom: "20%",
          left: "20%",
          width: "50px",
          height: "50px",
          borderRadius: "50%",
          background: "radial-gradient(circle at 30% 30%, rgba(255,255,255,0.8), rgba(173,216,230,0.4))",
          boxShadow: "inset -5px -5px 10px rgba(0,0,0,0.1)",
          animation: "bubble-float3 7s ease-in-out infinite",
        }}
      />

      <style>
        {`
          @keyframes bubble-float1 {
            0% { transform: translateY(0) scale(1); opacity: 0.7; }
            50% { transform: translateY(-100px) scale(1.1); opacity: 0.9; }
            100% { transform: translateY(-200px) scale(0.8); opacity: 0; }
          }
          @keyframes bubble-float2 {
            0% { transform: translateY(0) scale(1); opacity: 0.7; }
            50% { transform: translateY(-120px) scale(1.15); opacity: 0.9; }
            100% { transform: translateY(-250px) scale(0.7); opacity: 0; }
          }
          @keyframes bubble-float3 {
            0% { transform: translateY(0) scale(1); opacity: 0.7; }
            50% { transform: translateY(-90px) scale(1.05); opacity: 0.9; }
            100% { transform: translateY(-180px) scale(0.9); opacity: 0; }
          }
          @keyframes wave {
            0%, 100% { transform: rotate(-2deg); }
            50% { transform: rotate(2deg); }
          }
          @keyframes bounce {
            0%, 100% { transform: translateY(0); }
            50% { transform: translateY(-10px); }
          }
          @keyframes wiggle {
            0%, 100% { transform: rotate(0deg); }
            25% { transform: rotate(-5deg); }
            75% { transform: rotate(5deg); }
          }
        `}
      </style>

      <div style={{ position: "relative", zIndex: 1 }}>
        <div style={{ marginBottom: "2rem", animation: "wave 3s ease-in-out infinite" }}>
          <h1
            style={{
              color: "#FFD700",
              fontSize: "3.5rem",
              fontWeight: "bold",
              margin: "0.5rem 0",
              textShadow: "4px 4px 0 #FF6B35, -2px -2px 0 #004E89",
              letterSpacing: "2px",
              transform: "rotate(-2deg)",
            }}
          >
            🍍 비키니 시티 센서 🧽
          </h1>
          <p
            style={{
              color: "#FF6B35",
              fontSize: "1.2rem",
              fontWeight: "bold",
              margin: "0.5rem 0",
              textShadow: "2px 2px 0 #FFD700",
              transform: "rotate(1deg)",
            }}
          >
            "I'm ready! I'm ready! I'm ready!"
          </p>
        </div>

        {/* 센서 카드 */}
        <div
          style={{
            display: "inline-block",
            padding: "3rem 3rem",
            background: "linear-gradient(135deg, #FFEB3B 0%, #FFC107 100%)",
            borderRadius: "50% 50% 45% 45%",
            border: "8px solid #FF9800",
            boxShadow: "0 15px 40px rgba(0,0,0,0.3), inset 0 -20px 30px rgba(255,152,0,0.3)",
            maxWidth: "90vw",
            width: "550px",
            position: "relative",
            boxSizing: "border-box",
            animation: "bounce 2s ease-in-out infinite",
          }}
        >
          {/* 온도 */}
          <div style={{ marginBottom: "2rem", paddingBottom: "2rem", borderBottom: "4px dashed #FF9800" }}>
            <p
              style={{
                fontSize: "1rem",
                color: "#D84315",
                marginBottom: "0.8rem",
                fontWeight: "bold",
                letterSpacing: "2px",
                textTransform: "uppercase",
                textShadow: "2px 2px 0 #FFEB3B",
              }}
            >
              🌡️ 온도
            </p>
            <p
              style={{
                fontSize: "3.5rem",
                color: "#D84315",
                fontWeight: "bold",
                margin: 0,
                textShadow: "3px 3px 0 #FFEB3B, -2px -2px 0 #FF9800",
                animation: "wiggle 1s ease-in-out infinite",
              }}
            >
              {data.temperature.toFixed(1)}
              <span style={{ fontSize: "1.8rem", marginLeft: "0.5rem", color: "#FF6B35" }}>°C</span>
            </p>
          </div>

          {/* 습도 */}
          <div style={{ marginBottom: "2rem", paddingBottom: "2rem", borderBottom: "4px dashed #FF9800" }}>
            <p
              style={{
                fontSize: "1rem",
                color: "#1976D2",
                marginBottom: "0.8rem",
                fontWeight: "bold",
                letterSpacing: "2px",
                textTransform: "uppercase",
                textShadow: "2px 2px 0 #FFEB3B",
              }}
            >
              💧 습도
            </p>
            <p
              style={{
                fontSize: "3.5rem",
                color: "#1976D2",
                fontWeight: "bold",
                margin: 0,
                textShadow: "3px 3px 0 #FFEB3B, -2px -2px 0 #4FC3F7",
                animation: "wiggle 1.2s ease-in-out infinite",
              }}
            >
              {data.humidity.toFixed(1)}
              <span style={{ fontSize: "1.8rem", marginLeft: "0.5rem", color: "#0288D1" }}>%</span>
            </p>
          </div>

          {/* 거리 */}
          <div style={{ marginBottom: "2rem", paddingBottom: "2rem", borderBottom: "4px dashed #FF9800" }}>
            <p
              style={{
                fontSize: "1rem",
                color: "#FF6B35",
                marginBottom: "0.8rem",
                fontWeight: "bold",
                letterSpacing: "2px",
                textTransform: "uppercase",
                textShadow: "2px 2px 0 #FFEB3B",
              }}
            >
              📏 초음파 거리
            </p>
            <p
              style={{
                fontSize: "3.5rem",
                color: "#FF6B35",
                fontWeight: "bold",
                margin: 0,
                textShadow: "3px 3px 0 #FFEB3B, -2px -2px 0 #FF9800",
                animation: "wiggle 1.3s ease-in-out infinite",
              }}
            >
              {data.distance.toFixed(1)}
              <span style={{ fontSize: "1.8rem", marginLeft: "0.5rem", color: "#D84315" }}>cm</span>
            </p>
          </div>

          {/* 남은 물 부피 */}
          <div>
            <p
              style={{
                fontSize: "1rem",
                color: "#008080",
                marginBottom: "0.8rem",
                fontWeight: "bold",
                letterSpacing: "2px",
                textTransform: "uppercase",
                textShadow: "2px 2px 0 #00CED1",
              }}
            >
              💧 남은 물 부피
            </p>
            <p
              style={{
                fontSize: "3.5rem",
                color: "#008080",
                fontWeight: "bold",
                margin: 0,
                textShadow: "3px 3px 0 #00CED1, -2px -2px 0 #20B2AA",
                animation: "wiggle 1.4s ease-in-out infinite",
              }}
            >
              {data.waterVolume.toFixed(1)}
              <span style={{ fontSize: "1.8rem", marginLeft: "0.5rem", color: "#20B2AA" }}>mL</span>
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
