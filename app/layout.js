'use client';  // Menandakan komponen ini dijalankan di sisi klien

import { Geist, Geist_Mono, Rubik } from "next/font/google";
import { useEffect, useState } from "react"; // Import useState dan useEffect
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});
const rubik = Rubik({
  subsets: ['latin'],
  weight: ['300', '400', '500', '700'],
  style: ['normal', 'italic'],
});
const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function RootLayout({ children }) {
  const [backgroundImage, setBackgroundImage] = useState("");

  useEffect(() => {
    // Mendapatkan jam saat ini
    const hours = new Date().getHours();

    // Menentukan gambar background berdasarkan waktu
    if (hours >= 6 && hours < 18) {
      // Pagi (6 AM - 6 PM)
      setBackgroundImage("morning.jpg");
    } else {
      // Malam (6 PM - 6 AM)
      setBackgroundImage("night.jpg");
    }
  }, []); // Menjalankan sekali saat komponen pertama kali dimuat

  return (
    <html lang="en">
      <body
        className={`${rubik.variable}`}
        style={{
          display: "flex", // Menggunakan flexbox
          justifyContent: "center", // Menyusun konten di tengah secara horizontal
          alignItems: "center", // Menyusun konten di tengah secara vertikal
          height: "100vh", // Menggunakan 100% tinggi viewport
          backgroundImage: `url('${backgroundImage}')`, // Menambahkan layer gelap di atas gambar
          backgroundSize: "cover", // Agar gambar memenuhi seluruh area
          backgroundPosition: "center", // Agar gambar tetap berada di tengah
        }}
      >
        {children}
      </body>

    </html>
  );
}
