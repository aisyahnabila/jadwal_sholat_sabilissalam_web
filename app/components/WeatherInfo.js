import Image from 'next/image';
import logo from '../assets/images/logo.jpg';

const WeatherInfo = ({ weather }) => {
  if (!weather) {
    return (
      <div className="card border p-4 bg-gradient-to-r from-blue-400 to-blue-500 text-white rounded-xl shadow-xl">
        <h2 className="text-3xl font-bold mb-6 text-center">Info Cuaca - Hari ini</h2>
        <div className="text-center">MEMUAT</div>
      </div>
    );
  }

  const weatherData = weather.data[0].cuaca[0] || []; // Mengambil data cuaca dari array "data"
  console.log('dataku ', weatherData[0].image);

  // Fungsi untuk memilih file SVG berdasarkan deskripsi cuaca dan waktu
  const getWeatherIcon = (description, time) => {
    // Ambil jam dari waktu yang ada di item cuaca
    const hours = new Date(time).getHours();

    // Tentukan apakah jam tersebut siang (06:00 - 17:59) atau malam (18:00 - 05:59)
    const isDayTime = hours >= 6 && hours < 18;

    switch (description) {
      case 'Berawan':
        return isDayTime
          ? '/weather-icons-main/animated/cloudy-1-day.svg'
          : '/weather-icons-main/animated/cloudy-1-night.svg';
      case 'Hujan Ringan':
        return isDayTime
          ? '/weather-icons-main/animated/rainy-1-day.svg'
          : '/weather-icons-main/animated/rainy-1-night.svg';
      case 'Hujan Sedang':
        return isDayTime
          ? '/weather-icons-main/animated/rainy-2-day.svg'
          : '/weather-icons-main/animated/rainy-2-night.svg';
      case 'Hujan Lebat':
        return isDayTime
          ? '/weather-icons-main/animated/rainy-3-day.svg'
          : '/weather-icons-main/animated/rainy-3-night.svg';
      case 'Kabut':
        return isDayTime
          ? '/weather-icons-main/animated/fog-day.svg'
          : '/weather-icons-main/animated/fog-night.svg';
      case 'Cerah':
        return isDayTime
          ? '/weather-icons-main/animated/clear-day.svg'
          : '/weather-icons-main/animated/clear-night.svg';
      case 'Angin Kencang':
        return isDayTime
          ? '/weather-icons-main/animated/windy-1-day.svg'
          : '/weather-icons-main/animated/wind-night.svg';
      default:
        return isDayTime
          ? '/weather-icons-main/animated/clear-day.svg'
          : '/weather-icons-main/animated/clear-night.svg'; // Default jika tidak ada deskripsi
    }
  };

  return (
    <div>
      <div className="card border p-4 bg-gradient-to-r from-blue-400 to-blue-500 text-white rounded-xl shadow-xl">
        <h2 className="text-3xl font-bold mb-6 text-center">Cuaca Malang Hari ini</h2>

        <div className="grid justify-start items-center grid-cols-2 md:grid-cols-6 gap-1">
          {weatherData.map((item, index) => {
            // Parsing waktu untuk mengekstrak jam dan menit
            const date = new Date(item.local_datetime);
            const hours = date.getHours().toString().padStart(2, '0');
            const minutes = date.getMinutes().toString().padStart(2, '0');
            const time = `${hours}:${minutes}`;

            // Dapatkan ikon cuaca berdasarkan deskripsi dan waktu yang tepat
            const weatherIcon = getWeatherIcon(item.weather_desc, item.local_datetime);

            return (
              <div
                key={index}
                className="flex border flex-col items-center bg-white bg-opacity-20 rounded-lg"
              >
                <div>
                  <Image
                    src={weatherIcon} // Gunakan ikon yang sesuai
                    width={150}  // Sesuaikan ukuran sesuai kebutuhan
                    height={150} // Sesuaikan ukuran sesuai kebutuhan
                    alt="weather-icon"
                    className=" mt-3 text-center"
                  />
                </div>
                <h3 className="text-md font-bold">{item.t}°C</h3>
                <p className="text-sm">{time}</p> {/* Menampilkan waktu yang sudah diformat */}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default WeatherInfo;
