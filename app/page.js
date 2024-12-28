import Image from "next/image";
import { Rubik } from 'next/font/google';

// Mengimpor font Rubik
const rubik = Rubik({ subsets: ['latin'] });

export default function Home() {
  return (
    <div className={`p-6 ${rubik.className}`} >
      {/* Header utama */}
      <div className="text-center mb-3">
        <h1 className="text-5xl font-bold">Masjidil Salabisalam </h1>
        <h2 className="text-2xl ">Ahlan Wa Sahlan</h2>
      </div>

      {/* Grid tata letak */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Kolom pertama: Suhu, Kelembapan, dan Gambar */}
        <div className="card border p-4 flex flex-col items-center bg-white bg-opacity-80 rounded-xl">
        </div>

        <div className="flex flex-col">
          {/* Jam Sekarang */}
          <div className="card border p-6 mb-4 flex justify-center items-center bg-gradient-to-r from-yellow-500 to-orange-500 rounded-lg shadow-xl">
            <div>
              <h1 className="text-5xl font-bold text-center">14:00</h1>
              <h2 className="text-center text-lg">Jam Sekarang</h2>
            </div>
          </div>

          {/* Jadwal Solat */}
          <div className="card border bg-white bg-opacity-80 rounded-xl">
            <div className="bg-red p-2 text-xl font-bold rounded-t-lg">Jadwal Solat</div>
            <div className="p-2 ">
              <table className="table-auto w-full border-collapse">
                <thead>
                  <tr className="border">
                    <th className="text-left px-4 py-2">Sholat</th>
                    <th className="text-left px-4 py-2">Waktu</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border">
                    <td className="px-4 py-2">Subuh</td>
                    <td className="px-4 py-2">04:30</td>
                  </tr>
                  <tr className="border">
                    <td className="px-4 py-2">Dzuhur</td>
                    <td className="px-4 py-2">12:00</td>
                  </tr>
                  <tr className="border">
                    <td className="px-4 py-2">Asar</td>
                    <td className="px-4 py-2">15:30</td>
                  </tr>
                  <tr className="border">
                    <td className="px-4 py-2">Maghrib</td>
                    <td className="px-4 py-2">18:00</td>
                  </tr>
                  <tr className="border">
                    <td className="px-4 py-2">Isya</td>
                    <td className="px-4 py-2">19:30</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
