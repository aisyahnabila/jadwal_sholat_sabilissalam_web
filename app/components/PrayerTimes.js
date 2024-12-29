const PrayerTimes = ({ prayerTimes }) => {
  if (!prayerTimes || !prayerTimes.results) {
    return (
      <div className="card border bg-white bg-opacity-80 rounded-xl">
        <div className="bg-red-500 text-white p-2 text-xl font-bold rounded-t-lg">Jadwal Solat</div>
        <div className="p-2">
          <table className="table-auto w-full border-collapse">
            <thead>
              <tr className="border">
                <th className="text-left px-4 py-2">Sholat</th>
                <th className="text-left px-4 py-2">Waktu</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border">
                <td className="px-4 py-2 capitalize">N/A</td>
                <td className="px-4 py-2">N/A</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    );
  }

  const convertTo24Hour = (time) => {
    console.log(`Original Time: ${time}`); // Debugging output

    // Hilangkan simbol '%' dari string waktu
    const cleanedTime = time.replace(/%/g, "").trim();

    // Pisahkan waktu menjadi bagian jam:menit dan periode (AM/PM)
    const [hourMinute, period] = cleanedTime.split(" ");
    if (!hourMinute || !period) {
      console.error("Invalid time format:", time);
      return time; // Kembalikan waktu asli jika format tidak valid
    }

    let [hours, minutes] = hourMinute.split(":").map((value) => parseInt(value, 10));

    // Konversi ke format 24 jam
    if (period.toUpperCase() === "PM" && hours !== 12) {
      hours += 12;
    } else if (period.toUpperCase() === "AM" && hours === 12) {
      hours = 0;
    }

    // Pastikan formatnya menjadi HH:MM
    return `${hours.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}`;
  };


  const isCurrentPrayerTime = (prayerTime) => {
    const currentTime = new Date();
    const [prayerHour, prayerMinute] = prayerTime.split(":").map(Number);

    const prayerDate = new Date(currentTime);
    prayerDate.setHours(prayerHour, prayerMinute, 0, 0);

    const nextPrayerDate = new Date(prayerDate);
    nextPrayerDate.setMinutes(nextPrayerDate.getMinutes() + 30); // Durasi aktif 30 menit

    return currentTime >= prayerDate && currentTime < nextPrayerDate;
  };

  const times = prayerTimes.results;

  return (
    <div className="card border bg-white bg-opacity-80 rounded-xl shadow-lg">
      <div className="bg-gradient-to-r from-blue-500 to-purple-600 text-white p-2 text-xl font-semibold rounded-t-lg">
        Jadwal Solat
      </div>
      <div className="p-2">
        <table className="min-w-full table-auto border-collapse">
          <tbody>
            {Object.entries(times)
              .filter(([prayer]) => prayer.toLowerCase() !== "duha") // Kecualikan Duha
              .map(([prayer, time]) => {
                const formattedTime = convertTo24Hour(time); // Konversi ke format 24 jam
                console.log(`Prayer: ${prayer}, Formatted Time: ${formattedTime}`); // Debugging output
                const isActive = isCurrentPrayerTime(formattedTime);

                return (
                  <tr
                    className={`border-b hover:bg-gray-100 transition-colors ${isActive ? "bg-gradient-to-r from-purple-500 to-blue-500 text-white" : ""
                      }`}
                    key={prayer}
                  >
                    <td className="px-4 py-2 capitalize text-gray-700">{prayer}</td>
                    <td className="px-4 py-2 text-gray-700">{formattedTime}</td>
                  </tr>
                );
              })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PrayerTimes;
