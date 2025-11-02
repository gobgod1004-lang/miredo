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

  const [dailyIntake, setDailyIntake] = useState(0); // 하루 총 마신 물

  const DAILY_GOAL = 2000; // 하루 권장량 (mL)
  const CUP_SIZE = 362; // 컵 용량 (mL)

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

  const getDailyProgress = () => {
    return ((dailyIntake / DAILY_GOAL) * 100).toFixed(0);
  };

  const handleDrinkCup = () => {
    setDailyIntake(prev => Math.min(prev + CUP_SIZE, DAILY_GOAL));
  };

  const handleReset = () => {
    setDailyIntake(0);
  };

  const remainingIntake = Math.max(DAILY_GOAL - dailyIntake, 0);
  const cupsRemaining = Math.ceil(remainingIntake / CUP_SIZE);

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

        {/* 하루 물 섭취량 트래커 */}
        <div className="bg-gradient-to-r from-blue-50 to-cyan-50 rounded-xl shadow-md p-6 border-2 border-blue-200 mb-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-xl font-bold text-slate-800 mb-1">
                💧 오늘의 물 섭취량
              </h2>
              <p className="text-sm text-slate-600">
                목표: {DAILY_GOAL}mL | 남은 양: {remainingIntake}mL ({cupsRemaining}컵)
              </p>
            </div>
            <div className="text-right">
              <div className="text-3xl font-bold text-blue-600">
                {dailyIntake}
                <span className="text-lg text-slate-500 ml-1">mL</span>
              </div>
              <div className="text-sm text-slate-600 mt-1">
                {getDailyProgress()}% 달성
              </div>
            </div>
          </div>

          {/* 진행 바 */}
          <div className="w-full bg-slate-200 rounded-full h-10 overflow-hidden mb-4">
            <div
              className="h-full bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full transition-all duration-500 flex items-center justify-center"
              style={{ width: `${getDailyProgress()}%` }}
            >
              {parseInt(getDailyProgress()) > 15 && (
                <span className="text-white font-bold text-sm">
                  {dailyIntake} / {DAILY_GOAL} mL
                </span>
              )}
            </div>
          </div>

          {/* 버튼들 */}
          <div className="flex gap-3">
            <button
              onClick={handleDrinkCup}
              disabled={dailyIntake >= DAILY_GOAL}
              className="flex-1 bg-blue-600 hover:bg-blue-700 disabled:bg-slate-300 disabled:cursor-not-allowed text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200 shadow-md hover:shadow-lg"
            >
              🥤 한 컵 마심 (+{CUP_SIZE}mL)
            </button>
            <button
              onClick={handleReset}
              className="bg-slate-600 hover:bg-slate-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200 shadow-md hover:shadow-lg"
            >
              🔄 초기화
            </button>
          </div>

          {dailyIntake >= DAILY_GOAL && (
            <div className="mt-4 p-3 bg-green-100 border border-green-300 rounded-lg text-center">
              <span className="text-green-700 font-semibold">
                🎉 축하합니다! 오늘의 물 섭취 목표를 달성했습니다!
              </span>
            </div>
          )}
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