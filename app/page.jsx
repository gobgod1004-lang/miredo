"use client";

import { useEffect, useState } from "react";

export default function HomePage() {
  const [data, setData] = useState({
    temperature: 0,
    humidity: 0,
    distance: 0,
    waterVolume: 0,
    magnetAttached: true,
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

  const getWaterPercentage = () => {
    return ((data.waterVolume / 362) * 100).toFixed(0);
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-6">
      <div className="max-w-4xl mx-auto">
        {/* 헤더 */}
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-bold text-slate-800 mb-2">
            센서 모니터링
          </h1>
          <p className="text-slate-500">실시간 환경 및 수위 데이터</p>
        </div>

        {/* 자석 센서 상태 */}
        <div className="mb-6">
          <div
            className={`p-4 rounded-lg border-2 ${
              data.magnetAttached
                ? "bg-green-50 border-green-300"
                : "bg-red-50 border-red-300"
            } transition-colors duration-300`}
          >
            <div className="flex items-center justify-center gap-3">
              <span className="text-2xl">
                {data.magnetAttached ? "🧲" : "⚠️"}
              </span>
              <span className="font-semibold text-lg">
                {data.magnetAttached
                  ? "컵 감지됨 - 측정 중"
                  : "컵 없음 - 측정 대기"}
              </span>
            </div>
          </div>
        </div>

        {/* 센서 카드들 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          {/* 온도 */}
          <div className="bg-white rounded-xl shadow-md p-6 border border-slate-200">
            <div className="flex items-center justify-between mb-2">
              <span className="text-slate-600 font-medium">온도</span>
              <span className="text-2xl">🌡️</span>
            </div>
            <div className="text-3xl font-bold text-slate-800">
              {data.temperature.toFixed(1)}
              <span className="text-lg text-slate-500 ml-1">°C</span>
            </div>
          </div>

          {/* 습도 */}
          <div className="bg-white rounded-xl shadow-md p-6 border border-slate-200">
            <div className="flex items-center justify-between mb-2">
              <span className="text-slate-600 font-medium">습도</span>
              <span className="text-2xl">💧</span>
            </div>
            <div className="text-3xl font-bold text-slate-800">
              {data.humidity.toFixed(1)}
              <span className="text-lg text-slate-500 ml-1">%</span>
            </div>
          </div>

          {/* 거리 */}
          <div className="bg-white rounded-xl shadow-md p-6 border border-slate-200">
            <div className="flex items-center justify-between mb-2">
              <span className="text-slate-600 font-medium">측정 거리</span>
              <span className="text-2xl">📏</span>
            </div>
            <div className="text-3xl font-bold text-slate-800">
              {data.distance.toFixed(1)}
              <span className="text-lg text-slate-500 ml-1">cm</span>
            </div>
          </div>

          {/* 물 부피 */}
          <div className="bg-white rounded-xl shadow-md p-6 border border-slate-200">
            <div className="flex items-center justify-between mb-2">
              <span className="text-slate-600 font-medium">물 부피</span>
              <span className="text-2xl">💦</span>
            </div>
            <div className="text-3xl font-bold text-slate-800">
              {data.waterVolume.toFixed(1)}
              <span className="text-lg text-slate-500 ml-1">mL</span>
            </div>
          </div>
        </div>

        {/* 물 양 게이지 */}
        <div className="bg-white rounded-xl shadow-md p-6 border border-slate-200">
          <div className="flex items-center justify-between mb-4">
            <span className="text-slate-700 font-semibold text-lg">
              수위 게이지
            </span>
            <span className="text-slate-600 font-medium">
              {getWaterPercentage()}%
            </span>
          </div>
          <div className="w-full bg-slate-200 rounded-full h-8 overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-blue-400 to-blue-600 rounded-full transition-all duration-500 flex items-center justify-end pr-3"
              style={{ width: `${getWaterPercentage()}%` }}
            >
              {parseInt(getWaterPercentage()) > 10 && (
                <span className="text-white font-semibold text-sm">
                  {data.waterVolume.toFixed(0)} mL
                </span>
              )}
            </div>
          </div>
          <div className="flex justify-between text-xs text-slate-500 mt-2">
            <span>0 mL</span>
            <span>362 mL</span>
          </div>
        </div>
      </div>
    </main>
  );
}