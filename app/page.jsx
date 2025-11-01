"use client";

import { useEffect, useState } from "react";

export default function HomePage() {
  const [data, setData] = useState({ temperature: 0, humidity: 0, distance: 0 });

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
      {/* Bubbles everywhere! */}
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
      <div
        style={{
          position: "absolute",
          top: "30%",
          right: "30%",
          width: "35px",
          height: "35px",
          borderRadius: "50%",
          background: "radial-gradient(circle at 30% 30%, rgba(255,255,255,0.8), rgba(173,216,230,0.4))",
          boxShadow: "inset -5px -5px 10px rgba(0,0,0,0.1)",
          animation: "bubble-float1 9s ease-in-out infinite 1s",
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
        {/* Title with SpongeBob style */}
        <div
          style={{
            marginBottom: "2rem",
            animation: "wave 3s ease-in-out infinite",
          }}
        >
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

        {/* Main pineapple house display */}
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
          {/* Pineapple texture diamonds */}
          <div
            style={{
              position: "absolute",
              top: "20px",
              left: "30px",
              width: "40px",
              height: "40px",
              background: "#FFA726",
              transform: "rotate(45deg)",
              opacity: 0.3,
            }}
          />
          <div
            style={{
              position: "absolute",
              top: "20px",
              right: "30px",
              width: "40px",
              height: "40px",
              background: "#FFA726",
              transform: "rotate(45deg)",
              opacity: 0.3,
            }}
          />
          <div
            style={{
              position: "absolute",
              bottom: "40px",
              left: "50px",
              width: "35px",
              height: "35px",
              background: "#FFA726",
              transform: "rotate(45deg)",
              opacity: 0.3,
            }}
          />

          <div
            style={{
              marginBottom: "2rem",
              paddingBottom: "2rem",
              borderBottom: "4px dashed #FF9800",
            }}
          >
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
              🌡️ 온도온도온도!!
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
              <span style={{ fontSize: "1.8rem", marginLeft: "0.5rem", color: "#FF6B35" }}>
                °C
              </span>
            </p>
          </div>

          <div
            style={{
              marginBottom: "2rem",
              paddingBottom: "2rem",
              borderBottom: "4px dashed #FF9800",
            }}
          >
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
              💧 습도습도습도!!
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
              <span style={{ fontSize: "1.8rem", marginLeft: "0.5rem", color: "#0288D1" }}>
                %
              </span>
            </p>
          </div>

          <div>
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
              📏 초음파 거리!!
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
              <span style={{ fontSize: "1.8rem", marginLeft: "0.5rem", color: "#D84315" }}>
                cm
              </span>
            </p>
          </div>
        </div>

        {/* Gary the snail timestamp */}
        <div
          style={{
            marginTop: "2.5rem",
            display: "inline-flex",
            alignItems: "center",
            gap: "1rem",
            padding: "1rem 2rem",
            background: "linear-gradient(135deg, #FFB6C1, #FF69B4)",
            borderRadius: "50px",
            border: "4px solid #FF1493",
            boxShadow: "0 5px 20px rgba(255,20,147,0.3)",
          }}
        >
          <div
            style={{
              width: "40px",
              height: "35px",
              background: "linear-gradient(135deg, #FF69B4, #FF1493)",
              borderRadius: "50% 50% 50% 0",
              position: "relative",
            }}
          >
            <div
              style={{
                position: "absolute",
                top: "-8px",
                left: "10px",
                width: "8px",
                height: "15px",
                background: "#FF1493",
                borderRadius: "50% 50% 0 0",
              }}
            />
            <div
              style={{
                position: "absolute",
                top: "-8px",
                right: "10px",
                width: "8px",
                height: "15px",
                background: "#FF1493",
                borderRadius: "50% 50% 0 0",
              }}
            />
          </div>
          <p style={{ color: "#8B008B", fontSize: "1rem", margin: 0, fontWeight: "bold" }}>
            마지막 갱신: {new Date().toLocaleTimeString()}
          </p>
        </div>

        <p
          style={{
            marginTop: "1.5rem",
            color: "#004E89",
            fontSize: "1.1rem",
            fontWeight: "bold",
            textShadow: "2px 2px 0 #FFD700",
          }}
        >
          "Ahahaha! Gary, look at this data!"
        </p>

        {/* Jellyfish decoration */}
        <div
          style={{
            position: "fixed",
            top: "20px",
            right: "20px",
            animation: "bubble-float1 5s ease-in-out infinite",
          }}
        >
          <div
            style={{
              width: "60px",
              height: "50px",
              background: "radial-gradient(circle at 40% 40%, rgba(255,182,193,0.9), rgba(255,105,180,0.6))",
              borderRadius: "50% 50% 50% 50%",
              position: "relative",
              boxShadow: "0 0 20px rgba(255,105,180,0.5)",
            }}
          >
            <div style={{ position: "absolute", bottom: "-20px", left: "15px", width: "3px", height: "20px", background: "rgba(255,105,180,0.6)" }} />
            <div style={{ position: "absolute", bottom: "-25px", left: "25px", width: "3px", height: "25px", background: "rgba(255,105,180,0.6)" }} />
            <div style={{ position: "absolute", bottom: "-20px", left: "35px", width: "3px", height: "20px", background: "rgba(255,105,180,0.6)" }} />
          </div>
        </div>
      </div>
    </main>
  );
}