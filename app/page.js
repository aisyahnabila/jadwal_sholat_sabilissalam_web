"use client";

import React, { useState, useEffect } from 'react';
import { Rubik } from 'next/font/google';
import WeatherInfo from './components/WeatherInfo';
import PrayerTimes from './components/PrayerTimes';
import logo from './assets/images/logo.jpg'
import { fetchWeather, fetchPrayerTimes } from './utils/api';
import Image from 'next/image';
const rubik = Rubik({ subsets: ['latin'] });

export default function Home() {
  const [weather, setWeather] = useState(null);
  const [prayerTimes, setPrayerTimes] = useState(null);
  const [loadingWeather, setLoadingWeather] = useState(true);
  const [loadingPrayer, setLoadingPrayer] = useState(true);
  const [currentTime, setCurrentTime] = useState("");

  useEffect(() => {
    // Fetch data cuaca
    const getWeather = async () => {
      const weatherData = await fetchWeather();
      setWeather(weatherData);
      setLoadingWeather(false);
    };

    // Fetch data waktu sholat
    const getPrayerTimes = async () => {
      const prayerTimesData = await fetchPrayerTimes();
      setPrayerTimes(prayerTimesData);
      setLoadingPrayer(false);
    };

    getWeather();
    getPrayerTimes();

    // Update waktu setiap detik
    const interval = setInterval(() => {
      setCurrentTime(
        new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      );
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className={`p-6 ${rubik.className}`}>
      {/* Header utama */}
      <div className="text-center mb-8">
        <h1 className="text-5xl text-white font-bold">Masjidil Salabisalam</h1>
        <h1 className="text-3xl text-white">اهلا و سهلا</h1>
      </div>

      {/* Grid taimta letak */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Kolom pertama: Suhu, Kelembapan, dan Gambar */}
        <div className='flex flex-col'>
          {loadingWeather ? (
            <div className="card border p-4 bg-gradient-to-r from-blue-400 to-blue-500 text-white rounded-xl shadow-xl">
              <h2 className="text-3xl font-bold mb-6">Cuaca Malang Hari ini</h2>
              <div className="text-center">
                MEMUAT
              </div>
            </div>
          ) : (
            <WeatherInfo weather={weather} />
          )}
          <div className='card border p-2'>
            [INFORMASI HARI INI]
          </div>
        </div>

        <div className="flex flex-col">
          {/* Jam Sekarang */}
          <div className="card border p-6 flex justify-center items-center bg-gradient-to-r from-yellow-500 to-orange-500 rounded-lg shadow-xl">
            <div>
              <h1 className="text-5xl font-bold text-center">{currentTime}</h1>
              <h2 className="text-center text-lg">Jam Sekarang</h2>
            </div>
          </div>

          {/* Jadwal Solat */}
          {loadingPrayer || !prayerTimes ? (
            <div className="card border bg-white bg-opacity-80 rounded-xl">
              <div className="bg-red-500 text-white p-2 text-xl font-bold rounded-t-lg">Jadwal Solat</div>
              <div className="p-2">Memuat data jadwal solat...</div>
            </div>
          ) : (
            <PrayerTimes prayerTimes={prayerTimes} />
          )}

        </div>
        
        <div className="card border w-full h-96" height={100}>
          
          <Image
            src="/dummy/1.png"
            className="w-full h-full object-cover"
            width={1000}
            height={500}
            alt="Poster"
          />
        </div>

      </div>
    </div>
  );
}
