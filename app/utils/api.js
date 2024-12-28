// utils/api.js
export const fetchWeather = async () => {
  try {
    const response = await fetch('https://api.bmkg.go.id/publik/prakiraan-cuaca?adm4=35.73.05.1010');
    const data = await response.json();
    console.log('Weather data:', data); // Tambahkan log untuk memeriksa data
    return data;
  } catch (error) {
    console.error('Error fetching weather data:', error);
    return null;
  }
};

export const fetchPrayerTimes = async () => {
  try {
    const response = await fetch('https://islamicfinder.us/index.php/api/prayer_times?latitude=-7.9666&longitude=112.6326&timezone=Asia/Jakarta');
    const data = await response.json();
    console.log('Prayer times data:', data); // Tambahkan log untuk memeriksa data
    return data;
  } catch (error) {
    console.error('Error fetching prayer times:', error);
    return null;
  }
};