import React from 'react';

const WeatherStats = ({ data }) => {
    return (
        <div className="card border p-2 bg-gradient-to-br from-blue-500 to-indigo-500 text-dark">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                <div className="text-center card p-1 border">
                    <h1 className="text-3xl font-bold">{data?.t}°C</h1>
                    <h1 className="text-md">SUHU</h1> 
                </div>
                <div className="text-center card p-1 border">
                    <h1 className="text-3xl font-bold">{data?.ws} m/s</h1>
                    <h1 className="text-md">ANGIN</h1> 
                </div>
                <div className="text-center card p-1 border">
                    <h1 className="text-3xl font-bold">{data?.hu}%</h1>
                    <h1 className="text-md">KELEMBAPAN</h1> 
                </div>
                <div className="text-center card p-1 border">
                    <h1 className="text-3xl font-bold">{data?.tcc}%</h1>
                    <h1 className="text-md">BERAWAN</h1> 
                </div>
            </div>
        </div>
    );
};

export default WeatherStats;
