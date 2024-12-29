import React from 'react';

const PrayerTimes = ({ prayerTimes }) => {
  if (!prayerTimes || !prayerTimes.data || !prayerTimes.data.timings) {
    return <div>Loading...</div>;
  }

  // Assuming prayerTimes is an object with keys as prayer names and values as times
  const times = prayerTimes.data.timings;

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
            {Object.entries(times).map(([prayer, time]) => (
              <tr className="border" key={prayer}>
                <td className="px-4 py-2 capitalize">{prayer}</td>
                <td className="px-4 py-2">{time}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PrayerTimes;