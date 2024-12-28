import axios from 'axios';

export const fetchWeather = async () => {
  try {
    const response = await axios.get(
      'https://api.bmkg.go.id/publik/prakiraan-cuaca?adm4=35.73.05.1010'
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching weather data:", error);
    return null; // Pastikan null jika terjadi error
  }
};

export const fetchPrayerTimes = async () => {
  try {
    const response = await axios.get(
      'https://islamicfinder.us/index.php/api/prayer_times?latitude=-7.9666&longitude=112.6326&timezone=Asia/Jakarta'
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching prayer times data:", error);
    return null; // Pastikan null jika terjadi error
  }
};
