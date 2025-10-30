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
    const interval = setInterval(fetchData, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <main
      style={{
        fontFamily: "'Cinzel', 'Georgia', serif",
        padding: "2rem",
        textAlign: "center",
        background: "radial-gradient(ellipse at center, #3d2817 0%, #1a0f08 100%)",
        minHeight: "100vh",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Renaissance texture overlay */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' /%3E%3C/filter%3E%3Crect width='100' height='100' filter='url(%23noise)' opacity='0.05'/%3E%3C/svg%3E")`,
          opacity: 0.3,
          pointerEvents: "none",
        }}
      />

      {/* Vignette effect */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          boxShadow: "inset 0 0 200px rgba(0,0,0,0.8)",
          pointerEvents: "none",
        }}
      />

      <style>
        {`
          @import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@400;600;700&family=Crimson+Text:ital@0;1&display=swap');
          
          @keyframes fadeIn {
            from { opacity: 0; transform: translateY(20px); }
            to { opacity: 1; transform: translateY(0); }
          }
          
          .renaissance-border {
            background: linear-gradient(135deg, #8b7355 0%, #d4af37 50%, #8b7355 100%);
            padding: 3px;
            border-radius: 8px;
          }
        `}
      </style>

      <div style={{ position: "relative", zIndex: 1 }}>
        {/* Ornate header */}
        <div
          style={{
            marginBottom: "2rem",
            animation: "fadeIn 1s ease-out",
          }}
        >
          <div
            style={{
              color: "#d4af37",
              fontSize: "1rem",
              marginBottom: "0.5rem",
              letterSpacing: "4px",
              fontWeight: "400",
            }}
          >
            ✦ ANNO DOMINI MMXXV ✦
          </div>
          <h1
            style={{
              color: "#f5e6d3",
              fontSize: "3rem",
              fontWeight: "700",
              margin: "0.5rem 0",
              textShadow: "2px 2px 8px rgba(0,0,0,0.8)",
              letterSpacing: "2px",
            }}
          >
            ESP32 Sensorum
          </h1>
          <div
            style={{
              fontSize: "0.9rem",
              color: "#c9a961",
              fontStyle: "italic",
              fontFamily: "'Crimson Text', serif",
              marginTop: "0.5rem",
            }}
          >
            "La Gioconda della Technologia"
          </div>
          <div
            style={{
              width: "150px",
              height: "2px",
              background: "linear-gradient(90deg, transparent, #d4af37, transparent)",
              margin: "1.5rem auto",
            }}
          />
        </div>

        {/* Ornate frame */}
        <div
          className="renaissance-border"
          style={{
            display: "inline-block",
            animation: "fadeIn 1.2s ease-out",
          }}
        >
          <div
            style={{
              padding: "4rem 5rem",
              background: "linear-gradient(135deg, #2d1f15 0%, #1a0f08 100%)",
              borderRadius: "6px",
              minWidth: "500px",
              boxShadow: "inset 0 0 50px rgba(0,0,0,0.8), 0 10px 50px rgba(0,0,0,0.9)",
              border: "2px solid #3d2817",
            }}
          >
            {/* Decorative corner ornaments */}
            <div style={{ position: "relative" }}>
              <div style={{ position: "absolute", top: "-2.5rem", left: "-2.5rem", color: "#d4af37", fontSize: "2rem", opacity: 0.6 }}>❧</div>
              <div style={{ position: "absolute", top: "-2.5rem", right: "-2.5rem", color: "#d4af37", fontSize: "2rem", opacity: 0.6 }}>❧</div>
              <div style={{ position: "absolute", bottom: "-2.5rem", left: "-2.5rem", color: "#d4af37", fontSize: "2rem", opacity: 0.6 }}>❧</div>
              <div style={{ position: "absolute", bottom: "-2.5rem", right: "-2.5rem", color: "#d4af37", fontSize: "2rem", opacity: 0.6 }}>❧</div>

              <div
                style={{
                  marginBottom: "2.5rem",
                  paddingBottom: "2.5rem",
                  borderBottom: "1px solid rgba(212, 175, 55, 0.3)",
                }}
              >
                <p
                  style={{
                    fontSize: "0.75rem",
                    color: "#c9a961",
                    marginBottom: "1rem",
                    fontWeight: "600",
                    letterSpacing: "3px",
                    textTransform: "uppercase",
                  }}
                >
                  ⚜ Temperatura ⚜
                </p>
                <p
                  style={{
                    fontSize: "4rem",
                    color: "#f5e6d3",
                    fontWeight: "400",
                    margin: 0,
                    textShadow: "0 0 30px rgba(212, 175, 55, 0.3)",
                    fontFamily: "'Cinzel', serif",
                  }}
                >
                  {data.temperature.toFixed(1)}
                  <span style={{ fontSize: "2rem", marginLeft: "0.5rem", color: "#d4af37" }}>
                    °C
                  </span>
                </p>
              </div>

              <div
                style={{
                  marginBottom: "2.5rem",
                  paddingBottom: "2.5rem",
                  borderBottom: "1px solid rgba(212, 175, 55, 0.3)",
                }}
              >
                <p
                  style={{
                    fontSize: "0.75rem",
                    color: "#c9a961",
                    marginBottom: "1rem",
                    fontWeight: "600",
                    letterSpacing: "3px",
                    textTransform: "uppercase",
                  }}
                >
                  ⚜ Humiditas ⚜
                </p>
                <p
                  style={{
                    fontSize: "4rem",
                    color: "#f5e6d3",
                    fontWeight: "400",
                    margin: 0,
                    textShadow: "0 0 30px rgba(212, 175, 55, 0.3)",
                    fontFamily: "'Cinzel', serif",
                  }}
                >
                  {data.humidity.toFixed(1)}
                  <span style={{ fontSize: "2rem", marginLeft: "0.5rem", color: "#d4af37" }}>
                    %
                  </span>
                </p>
              </div>

              <div>
                <p
                  style={{
                    fontSize: "0.75rem",
                    color: "#c9a961",
                    marginBottom: "1rem",
                    fontWeight: "600",
                    letterSpacing: "3px",
                    textTransform: "uppercase",
                  }}
                >
                  ⚜ Valor Analogicus ⚜
                </p>
                <p
                  style={{
                    fontSize: "4rem",
                    color: "#f5e6d3",
                    fontWeight: "400",
                    margin: 0,
                    textShadow: "0 0 30px rgba(212, 175, 55, 0.3)",
                    fontFamily: "'Cinzel', serif",
                  }}
                >
                  {data.analog}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Artist signature style timestamp */}
        <div
          style={{
            marginTop: "2.5rem",
            animation: "fadeIn 1.4s ease-out",
          }}
        >
          <p
            style={{
              color: "#8b7355",
              fontSize: "0.85rem",
              margin: 0,
              fontFamily: "'Crimson Text', serif",
              fontStyle: "italic",
            }}
          >
            Ultima Renovatio: {new Date().toLocaleTimeString()}
          </p>
          <div
            style={{
              width: "80px",
              height: "1px",
              background: "#8b7355",
              margin: "0.5rem auto 0",
            }}
          />
        </div>
      </div>
    </main>
  );
}