const WeatherInfo = ({ weather }) => {
    if (!weather) {
      return <div>Loading weather data...</div>;
    }
  
    return (
      <div className="card border p-4 flex flex-col items-center bg-white bg-opacity-80 rounded-xl">
        <h2 className="text-2xl font-bold mb-4">Info Cuaca</h2>
        <p className="text-lg">Suhu: {weather?.temperature || "N/A"}°C</p>
        <p className="text-lg">Kelembapan: {weather?.humidity || "N/A"}%</p>
      </div>
    );
  };
  
  export default WeatherInfo;
  