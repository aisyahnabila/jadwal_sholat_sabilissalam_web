"use client";

import React, { useState, useEffect } from 'react';
import { Rubik } from 'next/font/google';
import WeatherInfo from './components/WeatherInfo';
import PrayerTimes from './components/PrayerTimes';
import { fetchWeather, fetchPrayerTimes } from './utils/api';
import Image from 'next/image';
import WeatherStats from './components/WeatherStats';
const rubik = Rubik({ subsets: ['latin'] });

export default function Home() {
  const [weather, setWeather] = useState(null);
  const [currentWeather, setCurrentWeather] = useState(null);
  const [prayerTimes, setPrayerTimes] = useState(null);
  const [loadingWeather, setLoadingWeather] = useState(true);
  const [loadingPrayer, setLoadingPrayer] = useState(true);
  const [currentTime, setCurrentTime] = useState("");
  const weatherStatsData = [
    { label: 'SUHU', value: '30°C' },
    { label: 'ANGIN', value: '2.3m/s' },
    { label: 'KELEMBAPAN', value: '30%' },
    { label: 'AWAN', value: '20%' },
  ];
  useEffect(() => {
    // Fetch data cuaca
    const getWeather = async () => {
      try {
        const weatherData = await fetchWeather();
        setWeather(weatherData);

        if (weatherData?.data?.[0]?.cuaca?.[0]) {
          const cuacaList = weatherData.data[0].cuaca[0];
          const now = new Date();
          const nowTime = now.getHours() * 60 + now.getMinutes(); // Waktu sekarang dalam menit

          let closestWeather = null;
          let closestTimeDiff = Infinity;

          cuacaList.forEach((cuaca) => {
            const localTime = new Date(cuaca.local_datetime); // Parse waktu
            const localTimeInMinutes = localTime.getHours() * 60 + localTime.getMinutes();

            // Pastikan waktu cuaca <= waktu sekarang
            if (localTimeInMinutes <= nowTime) {
              const timeDiff = nowTime - localTimeInMinutes; // Selisih waktu
              if (timeDiff < closestTimeDiff) {
                closestTimeDiff = timeDiff;
                closestWeather = cuaca;
              }
            }
          });

          if (closestWeather) {
            console.log("Cuaca Terdekat:", closestWeather);
            setCurrentWeather(closestWeather);
            console.log("Deskripsi Cuaca:", closestWeather.weather_desc);
            console.log("Waktu Cuaca:", closestWeather.local_datetime);
          } else {
            console.warn("Tidak ada data cuaca yang sesuai dengan waktu sekarang.");
          }
        } else {
          console.warn("Data cuaca tidak ditemukan.");
        }
      } catch (error) {
        console.error("Gagal mengambil data cuaca:", error);
      } finally {
        setLoadingWeather(false);
      }
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
        new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit', hour12: false })
      );
    }, 1000);

    const weatherInterval = setInterval(() => {
      console.log("Mengupdate data cuaca...");
      getWeather();
    }, 3600000); // 3600000 ms = 1 jam
    return () => {
      clearInterval(interval);
      clearInterval(weatherInterval);
    }
  }, []);

  return (
    <div className={`p-6 ${rubik.className}`}>
      {/* Header utama */}
      <div className="text-center mb-8">
        <h1 className="text-5xl text-white font-bold">Masjid Sabilissalam</h1>
        <h1 className="text-3xl text-white">حافظه الله</h1>
      </div>

      {/* Grid layout */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Kolom pertama */}
        <div className="flex flex-col min-h-full">
          {/* Gunakan komponen WeatherStats */}
          <WeatherStats data={currentWeather} />
          {loadingWeather ? (
            <div className="card border p-4 bg-gradient-to-r from-blue-400 to-blue-500 text-white rounded-xl shadow-xl">
              <h2 className="text-3xl font-bold mb-6">Cuaca Malang Hari ini</h2>
              <div className="text-center">MEMUAT</div>
            </div>
          ) : (
            <WeatherInfo weather={weather} />
          )}
        </div>

        {/* Kolom kedua */}
        <div className="flex flex-col min-h-full">
          {/* Jam Sekarang */}
          <div className="card border p-6 flex justify-center items-center bg-gradient-to-r from-yellow-500 to-orange-500 rounded-lg shadow-xl text-white">
            <div>
              <h1 className="text-7xl font-bold  text-center">{currentTime}</h1>
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

        {/* Kolom ketiga */}
        <div className="flex flex-col min-h-full">
          <div className="card p-3 border text-3xl font-bold overflow-hidden ">
            <div className="scrolling-text">
              SELAMAT DATANG JAMA'AH MASJID SABILISSALAM MALANG KEC LOWOKWARU, TULUSREJO
            </div>
          </div>
          <div className="card border w-full h-96">
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

    </div>
  );
}
