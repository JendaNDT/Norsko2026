import React, { useState, useEffect } from 'react';
import { Loader2, MapPin, Wind, Droplets, CloudSun, CloudRain, Sun, Cloud, CloudFog, CloudLightning, CloudSnow, ArrowUp } from 'lucide-react';

// Met.no API interface (simplified)
interface MetNoSeries {
    time: string;
    data: {
        instant: {
            details: {
                air_temperature: number;
                wind_speed: number;
                wind_from_direction: number;
                precipitation_amount?: number;
            }
        };
        next_1_hours?: {
            summary: { symbol_code: string };
            details: { precipitation_amount: number };
        };
        next_6_hours?: {
            summary: { symbol_code: string };
        };
    };
}

const Weather: React.FC = () => {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [coords, setCoords] = useState<{ lat: number; lng: number } | null>(null);
    const [weatherData, setWeatherData] = useState<MetNoSeries[]>([]);
    const [locationName, setLocationName] = useState('Vaše poloha');

    // Mapping Met.no symbol codes to Lucide icons
    const getWeatherIcon = (symbolCode: string, size: number = 24, className: string = "") => {
        const code = symbolCode?.split('_')[0]; // Remove _day / _night suffix
        
        const props = { size, className };
        
        switch (code) {
            case 'clearsky': return <Sun {...props} className={`text-yellow-500 ${className}`} />;
            case 'fair': return <CloudSun {...props} className={`text-yellow-400 ${className}`} />;
            case 'partlycloudy': return <CloudSun {...props} className={`text-gray-400 ${className}`} />;
            case 'cloudy': return <Cloud {...props} className={`text-gray-500 ${className}`} />;
            case 'rain': 
            case 'rainshowers':
            case 'lightrain': return <CloudRain {...props} className={`text-blue-500 ${className}`} />;
            case 'heavyrain': return <CloudRain {...props} className={`text-blue-700 ${className}`} />;
            case 'snow': 
            case 'snowshowers': return <CloudSnow {...props} className={`text-cyan-300 ${className}`} />;
            case 'sleet': return <CloudSnow {...props} className={`text-blue-300 ${className}`} />;
            case 'fog': return <CloudFog {...props} className={`text-gray-400 ${className}`} />;
            case 'thunder': return <CloudLightning {...props} className={`text-purple-500 ${className}`} />;
            default: return <CloudSun {...props} className={`text-gray-400 ${className}`} />;
        }
    };

    useEffect(() => {
        if (!navigator.geolocation) {
            setError("Geolokace není podporována.");
            setLoading(false);
            return;
        }

        navigator.geolocation.getCurrentPosition(
            async (pos) => {
                const { latitude, longitude } = pos.coords;
                setCoords({ lat: latitude, lng: longitude });
                
                try {
                    // Fetch Weather from Met.no (Official YR source)
                    const response = await fetch(
                        `https://api.met.no/weatherapi/locationforecast/2.0/compact?lat=${latitude}&lon=${longitude}`
                    );
                    
                    if (!response.ok) throw new Error("Chyba při načítání dat.");
                    
                    const data = await response.json();
                    setWeatherData(data.properties.timeseries);
                    setLoading(false);

                    // Optional: Reverse geocoding could go here, for now using static
                } catch (err) {
                    setError("Nepodařilo se načíst počasí. Zkontrolujte připojení.");
                    setLoading(false);
                }
            },
            (err) => {
                setError("Nelze získat polohu. Povolte GPS.");
                setLoading(false);
            }
        );
    }, []);

    if (loading) return (
        <div className="h-full flex flex-col items-center justify-center p-8 text-norway-blue">
            <Loader2 size={48} className="animate-spin mb-4" />
            <p className="font-bold">Hledám satelity...</p>
        </div>
    );

    if (error || !weatherData.length) return (
        <div className="p-6 text-center">
            <div className="bg-red-50 p-6 rounded-2xl border border-red-100 mb-4">
                <CloudRain size={48} className="text-red-400 mx-auto mb-4" />
                <h3 className="font-bold text-red-900 mb-2">Chyba načítání</h3>
                <p className="text-sm text-red-700">{error}</p>
            </div>
            <button 
                onClick={() => window.location.reload()}
                className="bg-norway-blue text-white px-6 py-3 rounded-xl font-bold shadow-md"
            >
                Zkusit znovu
            </button>
        </div>
    );

    const current = weatherData[0];
    const details = current.data.instant.details;
    const nextHour = current.data.next_1_hours;

    // Filter for Daily Forecast (approx every 24h at noon)
    const dailyForecast = weatherData.filter(item => item.time.includes('12:00:00')).slice(0, 5);

    return (
        <div className="p-4 pb-24 space-y-6">
            <style dangerouslySetInnerHTML={{__html: `
                .weather-scrollbar::-webkit-scrollbar {
                    height: 12px;
                }
                .weather-scrollbar::-webkit-scrollbar-track {
                    background: #f1f5f9;
                    border-radius: 6px;
                }
                .weather-scrollbar::-webkit-scrollbar-thumb {
                    background: #94a3b8;
                    border-radius: 6px;
                    border: 3px solid #f1f5f9;
                }
                .weather-scrollbar::-webkit-scrollbar-thumb:hover {
                    background: #64748b;
                }
                .weather-scrollbar {
                    scrollbar-width: auto;
                    scrollbar-color: #94a3b8 #f1f5f9;
                }
            `}} />

            <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold text-norway-blue flex items-center gap-2">
                   Počasí (YR.no)
                </h2>
                {coords && (
                    <div className="text-xs text-gray-500 flex items-center gap-1 bg-gray-100 px-2 py-1 rounded-full">
                        <MapPin size={12} /> {coords.lat.toFixed(2)}, {coords.lng.toFixed(2)}
                    </div>
                )}
            </div>

            {/* Main Current Weather Card */}
            <div className="bg-gradient-to-br from-blue-500 to-blue-700 rounded-3xl p-6 text-white shadow-xl relative overflow-hidden">
                <div className="relative z-10 flex flex-col items-center">
                    <div className="flex items-start gap-4 mb-2">
                        {getWeatherIcon(nextHour?.summary?.symbol_code || 'fair', 84, "drop-shadow-lg")}
                        <div className="text-7xl font-bold tracking-tighter">
                            {Math.round(details.air_temperature)}°
                        </div>
                    </div>
                    
                    <p className="text-blue-100 text-lg font-medium mb-6 capitalize opacity-90">
                        {nextHour?.summary?.symbol_code.replace(/_/g, ' ')}
                    </p>

                    {/* Grid for Wind/Rain */}
                    <div className="grid grid-cols-2 gap-4 w-full bg-white/10 rounded-xl p-4 backdrop-blur-sm">
                        <div className="flex items-center gap-3">
                            <Wind className="text-blue-200" size={24} />
                            <div>
                                <p className="text-xs text-blue-200 font-bold uppercase">Vítr</p>
                                <p className="font-bold text-lg">{details.wind_speed.toFixed(1)} <span className="text-sm font-normal">m/s</span></p>
                            </div>
                        </div>
                        <div className="flex items-center gap-3">
                            <Droplets className="text-blue-200" size={24} />
                            <div>
                                <p className="text-xs text-blue-200 font-bold uppercase">Srážky (1h)</p>
                                <p className="font-bold text-lg">{nextHour?.details?.precipitation_amount || 0} <span className="text-sm font-normal">mm</span></p>
                            </div>
                        </div>
                    </div>
                </div>
                
                {/* Decorative background circle */}
                <div className="absolute top-[-50px] right-[-50px] w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>
            </div>

            {/* Hourly Scroll */}
            <div>
                <h3 className="font-bold text-gray-800 mb-3 text-sm uppercase tracking-wide">Příštích 24 hodin</h3>
                {/* Applied custom class weather-scrollbar and ensured overflow-x-auto is present */}
                <div className="flex overflow-x-auto gap-3 pb-4 snap-x snap-mandatory weather-scrollbar">
                    {weatherData.slice(0, 24).map((hour, idx) => (
                        <div key={idx} className="flex-shrink-0 w-16 bg-white p-3 rounded-2xl border border-gray-100 flex flex-col items-center justify-between gap-2 shadow-sm snap-center">
                            <span className="text-xs font-bold text-gray-500">
                                {new Date(hour.time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                            </span>
                            {getWeatherIcon(hour.data.next_1_hours?.summary?.symbol_code || 'fair', 24)}
                            <span className="font-bold text-norway-blue">{Math.round(hour.data.instant.details.air_temperature)}°</span>
                            
                            {/* Wind warning if high */}
                            {hour.data.instant.details.wind_speed > 8 && (
                                <span className="text-[10px] text-red-500 font-bold flex items-center">
                                    <Wind size={8} className="mr-0.5" />
                                    {Math.round(hour.data.instant.details.wind_speed)}
                                </span>
                            )}
                        </div>
                    ))}
                </div>
            </div>

            {/* Daily Forecast */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4">
                <h3 className="font-bold text-gray-800 mb-4 text-sm uppercase tracking-wide">Výhled na další dny</h3>
                <div className="space-y-4">
                    {dailyForecast.map((day, idx) => {
                        const date = new Date(day.time);
                        const dayName = date.toLocaleDateString('cs-CZ', { weekday: 'long' });
                        const code = day.data.next_6_hours?.summary?.symbol_code || 'fair'; // Met.no returns next_6h symbol for future points usually

                        return (
                            <div key={idx} className="flex items-center justify-between border-b border-gray-50 last:border-0 pb-2 last:pb-0">
                                <div className="w-24">
                                    <p className="font-bold text-gray-800 capitalize">{dayName}</p>
                                    <p className="text-xs text-gray-400">{date.getDate()}. {date.getMonth() + 1}.</p>
                                </div>
                                <div className="flex items-center gap-2">
                                     {getWeatherIcon(code, 24)}
                                     <span className="text-xs text-gray-400 w-16 truncate">{code.split('_')[0]}</span>
                                </div>
                                <div className="flex gap-4 w-16 justify-end">
                                    <span className="font-bold text-gray-800">{Math.round(day.data.instant.details.air_temperature)}°</span>
                                </div>
                            </div>
                        );
                    })}
                    {dailyForecast.length === 0 && <p className="text-sm text-gray-500">Data pro dlouhodobou předpověď nejsou momentálně dostupná.</p>}
                </div>
            </div>

            <div className="bg-blue-50 p-4 rounded-xl text-xs text-blue-800 leading-relaxed">
                <strong>Tip pro Norsko:</strong> Počasí se mění extrémně rychle. Vždy mějte záložní plán a nepromokavé oblečení, i když hlásí slunečno ("Clearsky"). Sledujte rychlost větru (Wind Speed) - nad 10 m/s už je chůze po horách náročná.
            </div>
        </div>
    );
};

export default Weather;