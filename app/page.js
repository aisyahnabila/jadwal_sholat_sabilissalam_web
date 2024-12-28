"use client";

import React, { useState, useEffect } from "react";
import { Rubik } from "next/font/google";
import WeatherInfo from "./components/WeatherInfo";
import PrayerTimes from "./components/PrayerTimes";
import { fetchWeather, fetchPrayerTimes } from "./utils/api";

const rubik = Rubik({ subsets: ["latin"] });

export default function Home() {
  const [weather, setWeather] = useState(null);
  const [prayerTimes, setPrayerTimes] = useState(null);
  const [loadingWeather, setLoadingWeather] = useState(true);
  const [loadingPrayer, setLoadingPrayer] = useState(true);

  useEffect(() => {
    const getWeather = async () => {
      const weatherData = await fetchWeather();
      setWeather(weatherData);
      setLoadingWeather(false);
    };

    const getPrayerTimes = async () => {
      const prayerTimesData = await fetchPrayerTimes();
      setPrayerTimes(prayerTimesData);
      setLoadingPrayer(false);
    };

    getWeather();
    getPrayerTimes();
  }, []);

  return (
    <div className={`p-6 ${rubik.className}`}>
      {/* Header utama */}
      <div className="text-center mb-8">
        <h1 className="text-5xl font-bold">Masjidil Salabisalam</h1>
        <h2 className="text-2xl">Ahlan Wa Sahlan</h2>
      </div>

      {/* Grid tata letak */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Kolom pertama: Suhu, Kelembapan, dan Gambar */}
        {loadingWeather ? (
          <div>Loading weather data...</div>
        ) : (
          <WeatherInfo weather={weather} />
        )}

        <div className="flex flex-col">
          {/* Jam Sekarang */}
          <div className="card border p-6 mb-4 flex justify-center items-center bg-gradient-to-r from-yellow-500 to-orange-500 rounded-lg shadow-xl">
            <div>
              <h1 className="text-5xl font-bold text-center">
                {new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
              </h1>
              <h2 className="text-center text-lg">Jam Sekarang</h2>
            </div>
          </div>

          {/* Jadwal Solat */}
          {loadingPrayer ? (
            <div>Loading prayer times...</div>
          ) : (
            <PrayerTimes prayerTimes={prayerTimes} />
          )}
        </div>
      </div>
    </div>
  );
}
