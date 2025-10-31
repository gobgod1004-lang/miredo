"use client";

import { useEffect, useState } from "react";

export default function HomePage() {
  const [data, setData] = useState({ temperature: 0, humidity: 0, analog: 0 });
  const [glitchActive, setGlitchActive] = useState(false);

  async function fetchData() {
    try {
      const res = await fetch("/api/data");
      if (!res.ok) throw new Error("Failed to fetch");
      const json = await res.json();
      setData(json);
      
      // Random glitch effect
      if (Math.random() > 0.7) {
        setGlitchActive(true);
        setTimeout(() => setGlitchActive(false), 200);
      }
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
        fontFamily: "'Courier New', monospace",
        padding: "2rem",
        textAlign: "center",
        background: "#000000",
        minHeight: "100vh",
        position: "relative",
        overflow: "hidden",
        filter: glitchActive ? "hue-rotate(180deg) brightness(1.5)" : "none",
        transition: "filter 0.1s",
      }}
    >
      {/* VHS scan lines */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: "repeating-linear-gradient(0deg, rgba(0,0,0,0.15) 0px, rgba(0,0,0,0.15) 1px, transparent 1px, transparent 2px)",
          pointerEvents: "none",
          zIndex: 10,
          animation: "scanline 8s linear infinite",
        }}
      />

      {/* Static noise */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
          opacity: 0.08,
          pointerEvents: "none",
          animation: "noise 0.2s steps(10) infinite",
        }}
      />

      {/* Flickering lights */}
      <div
        style={{
          position: "absolute",
          top: "10%",
          left: "15%",
          width: "3px",
          height: "3px",
          borderRadius: "50%",
          background: "#ff0000",
          boxShadow: "0 0 40px 10px #ff0000",
          animation: "flicker 3s ease-in-out infinite",
        }}
      />
      <div
        style={{
          position: "absolute",
          top: "70%",
          right: "20%",
          width: "3px",
          height: "3px",
          borderRadius: "50%",
          background: "#ff0000",
          boxShadow: "0 0 40px 10px #ff0000",
          animation: "flicker 4s ease-in-out infinite 1s",
        }}
      />

      <style>
        {`
          @keyframes scanline {
            0% { transform: translateY(-100%); }
            100% { transform: translateY(100%); }
          }
          
          @keyframes flicker {
            0%, 100% { opacity: 0.3; }
            5%, 95% { opacity: 0.1; }
            10%, 90% { opacity: 0.8; }
            15%, 85% { opacity: 0.2; }
            20%, 80% { opacity: 1; }
            25%, 75% { opacity: 0.1; }
            30%, 70% { opacity: 0.7; }
            50% { opacity: 0.4; }
          }
          
          @keyframes glitch {
            0%, 100% { transform: translate(0); }
            33% { transform: translate(-2px, 2px); }
            66% { transform: translate(2px, -2px); }
          }
          
          @keyframes noise {
            0%, 100% { transform: translate(0, 0); }
            10% { transform: translate(-5%, -5%); }
            20% { transform: translate(-10%, 5%); }
            30% { transform: translate(5%, -10%); }
            40% { transform: translate(-5%, 15%); }
            50% { transform: translate(-10%, 5%); }
            60% { transform: translate(15%, 0); }
            70% { transform: translate(0, 10%); }
            80% { transform: translate(-15%, 0); }
            90% { transform: translate(10%, 5%); }
          }
          
          @keyframes blink-text {
            0%, 49%, 100% { opacity: 1; }
            50%, 99% { opacity: 0.3; }
          }
        `}
      </style>

      <div style={{ position: "relative", zIndex: 1 }}>
        {/* CCTV header */}
        <div
          style={{
            marginBottom: "1rem",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "1rem",
          }}
        >
          <div
            style={{
              width: "15px",
              height: "15px",
              borderRadius: "50%",
              background: "#ff0000",
              boxShadow: "0 0 20px #ff0000",
              animation: "blink-text 2s infinite",
            }}
          />
          <p
            style={{
              color: "#ff0000",
              fontSize: "1.2rem",
              margin: 0,
              fontWeight: "bold",
              letterSpacing: "3px",
              textShadow: "0 0 10px #ff0000",
            }}
          >
            ● REC
          </p>
        </div>

        <h1
          style={{
            color: "#ffffff",
            fontSize: "2rem",
            fontWeight: "bold",
            margin: "1rem 0",
            textShadow: "0 0 10px rgba(255,255,255,0.5)",
            letterSpacing: "2px",
            animation: glitchActive ? "glitch 0.3s infinite" : "none",
          }}
        >
          곤지암 정신병원 - 401호
        </h1>

        <p
          style={{
            color: "#888",
            fontSize: "0.9rem",
            marginBottom: "2rem",
            letterSpacing: "2px",
          }}
        >
          ESP32 SURVEILLANCE SYSTEM
        </p>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            maxWidth: "600px",
            margin: "0 auto 1.5rem",
            color: "#888",
            fontSize: "0.85rem",
            fontFamily: "monospace",
          }}
        >
          <span>CAM_04</span>
          <span>{new Date().toLocaleDateString()} {new Date().toLocaleTimeString()}</span>
        </div>

        {/* Main monitor display */}
        <div
          style={{
            display: "inline-block",
            padding: "2rem 3rem",
            background: "rgba(20, 20, 20, 0.9)",
            border: "3px solid #333",
            borderRadius: "0",
            boxShadow: "0 0 30px rgba(0,0,0,0.9), inset 0 0 50px rgba(0,0,0,0.5)",
            minWidth: "550px",
            position: "relative",
          }}
        >
          {/* Warning tape */}
          <div
            style={{
              position: "absolute",
              top: "-15px",
              left: "50%",
              transform: "translateX(-50%)",
              background: "repeating-linear-gradient(45deg, #ff0000, #ff0000 10px, #ffff00 10px, #ffff00 20px)",
              padding: "5px 20px",
              fontSize: "0.7rem",
              fontWeight: "bold",
              color: "#000",
              letterSpacing: "2px",
              boxShadow: "0 2px 10px rgba(0,0,0,0.5)",
            }}
          >
            ⚠ RESTRICTED AREA ⚠
          </div>

          <div
            style={{
              marginBottom: "2rem",
              paddingBottom: "2rem",
              borderBottom: "1px solid #333",
            }}
          >
            <p
              style={{
                fontSize: "0.75rem",
                color: "#ff0000",
                marginBottom: "0.8rem",
                fontWeight: "bold",
                letterSpacing: "2px",
                textShadow: "0 0 5px #ff0000",
              }}
            >
              [TEMPERATURE ANOMALY DETECTED]
            </p>
            <p
              style={{
                fontSize: "4rem",
                color: glitchActive ? "#00ff00" : "#ffffff",
                fontWeight: "bold",
                margin: 0,
                fontFamily: "'Courier New', monospace",
                textShadow: glitchActive ? "0 0 20px #00ff00" : "0 0 10px rgba(255,255,255,0.5)",
                animation: glitchActive ? "glitch 0.1s infinite" : "none",
              }}
            >
              {data.temperature.toFixed(1)}
              <span style={{ fontSize: "1.5rem", marginLeft: "0.5rem", color: "#888" }}>
                °C
              </span>
            </p>
          </div>

          <div
            style={{
              marginBottom: "2rem",
              paddingBottom: "2rem",
              borderBottom: "1px solid #333",
            }}
          >
            <p
              style={{
                fontSize: "0.75rem",
                color: "#ff0000",
                marginBottom: "0.8rem",
                fontWeight: "bold",
                letterSpacing: "2px",
                textShadow: "0 0 5px #ff0000",
              }}
            >
              [HUMIDITY LEVEL CRITICAL]
            </p>
            <p
              style={{
                fontSize: "4rem",
                color: glitchActive ? "#00ff00" : "#ffffff",
                fontWeight: "bold",
                margin: 0,
                fontFamily: "'Courier New', monospace",
                textShadow: glitchActive ? "0 0 20px #00ff00" : "0 0 10px rgba(255,255,255,0.5)",
                animation: glitchActive ? "glitch 0.1s infinite" : "none",
              }}
            >
              {data.humidity.toFixed(1)}
              <span style={{ fontSize: "1.5rem", marginLeft: "0.5rem", color: "#888" }}>
                %
              </span>
            </p>
          </div>

          <div>
            <p
              style={{
                fontSize: "0.75rem",
                color: "#ff0000",
                marginBottom: "0.8rem",
                fontWeight: "bold",
                letterSpacing: "2px",
                textShadow: "0 0 5px #ff0000",
              }}
            >
              [PARANORMAL ACTIVITY INDEX]
            </p>
            <p
              style={{
                fontSize: "4rem",
                color: glitchActive ? "#00ff00" : "#ffffff",
                fontWeight: "bold",
                margin: 0,
                fontFamily: "'Courier New', monospace",
                textShadow: glitchActive ? "0 0 20px #00ff00" : "0 0 10px rgba(255,255,255,0.5)",
                animation: glitchActive ? "glitch 0.1s infinite" : "none",
              }}
            >
              {data.analog}
            </p>
          </div>
        </div>

        {/* Warning message */}
        <div
          style={{
            marginTop: "2rem",
            padding: "1rem 2rem",
            background: "rgba(255, 0, 0, 0.1)",
            border: "2px solid #ff0000",
            display: "inline-block",
            maxWidth: "500px",
          }}
        >
          <p style={{ color: "#ff0000", fontSize: "0.85rem", margin: 0, lineHeight: 1.6 }}>
            ⚠️ WARNING: Multiple sensor anomalies detected in Room 401<br/>
            DO NOT ENTER AFTER DARK
          </p>
        </div>

        <p
          style={{
            marginTop: "1.5rem",
            color: "#444",
            fontSize: "0.75rem",
            fontFamily: "monospace",
            animation: "blink-text 3s infinite",
          }}
        >
          Last contact with research team: [SIGNAL LOST]
        </p>
      </div>
    </main>
  );
}