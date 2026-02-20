import React, { useState } from 'react';
import { getRecommendations } from '../services/geminiService';
import { Sparkles, Loader2, Tag, MapPin, Route, Navigation } from 'lucide-react';

const Recommendations: React.FC = () => {
    const [preferences, setPreferences] = useState<string[]>([]);
    const [result, setResult] = useState<string>('');
    const [loading, setLoading] = useState(false);
    
    // Geolocation logic
    const [mode, setMode] = useState<'itinerary' | 'location'>('itinerary');
    const [coords, setCoords] = useState<{lat: number, lng: number} | null>(null);
    const [locating, setLocating] = useState(false);
    const [locError, setLocError] = useState('');

    const tags = [
        "Příroda & Výhledy", 
        "Historie & Kultura", 
        "Adrenalin", 
        "Relax", 
        "Low-Budget", 
        "Gastronomie"
    ];

    const toggleTag = (tag: string) => {
        setPreferences(prev => 
            prev.includes(tag) ? prev.filter(t => t !== tag) : [...prev, tag]
        );
    };

    const handleGetLocation = () => {
        if (!navigator.geolocation) {
            setLocError("Geolokace není podporována.");
            return;
        }
        setLocating(true);
        setLocError('');
        
        navigator.geolocation.getCurrentPosition(
            (pos) => {
                setCoords({ lat: pos.coords.latitude, lng: pos.coords.longitude });
                setLocating(false);
            },
            (err) => {
                console.warn("Geo Error:", err);
                let msg = "Nelze získat polohu.";
                switch(err.code) {
                    case 1: // PERMISSION_DENIED
                        msg = "Přístup k poloze byl zamítnut. Povolte jej v nastavení prohlížeče.";
                        break;
                    case 2: // POSITION_UNAVAILABLE
                        msg = "Informace o poloze nejsou dostupné. Zkontrolujte GPS.";
                        break;
                    case 3: // TIMEOUT
                        msg = "Vypršel časový limit pro získání polohy. Zkuste to znovu.";
                        break;
                    default:
                        msg = "Neznámá chyba při získávání polohy.";
                }
                setLocError(msg);
                setLocating(false);
            },
            {
                enableHighAccuracy: true,
                timeout: 10000,
                maximumAge: 0
            }
        );
    };

    const handleGenerate = async () => {
        if (preferences.length === 0) return;
        if (mode === 'location' && !coords) {
            setLocError("Nejdříve musíte zjistit svou polohu.");
            return;
        }

        setLoading(true);
        // If mode is location, pass coords, otherwise undefined
        const locationData = mode === 'location' && coords ? coords : undefined;
        const html = await getRecommendations(preferences, locationData);
        setResult(html);
        setLoading(false);
    };

    return (
        <div className="p-4 pb-24 space-y-6">
            <div className="bg-gradient-to-r from-purple-600 to-indigo-700 p-6 rounded-2xl text-white shadow-lg">
                <h2 className="text-2xl font-bold flex items-center gap-2 mb-2">
                    <Sparkles size={24} /> AI Doporučení
                </h2>
                <p className="text-purple-100 text-sm">
                    Vyberte, co vás zajímá, a nechte AI navrhnout nejlepší zastávky.
                </p>
            </div>

            {/* Mode Switcher */}
            <div className="bg-white p-1 rounded-xl border border-gray-200 flex shadow-sm">
                <button 
                    onClick={() => { setMode('itinerary'); setResult(''); }}
                    className={`flex-1 py-2 text-sm font-medium rounded-lg flex items-center justify-center gap-2 transition-all ${
                        mode === 'itinerary' ? 'bg-purple-100 text-purple-700 shadow-sm' : 'text-gray-500 hover:bg-gray-50'
                    }`}
                >
                    <Route size={16} /> Podle trasy
                </button>
                <button 
                    onClick={() => { setMode('location'); setResult(''); }}
                    className={`flex-1 py-2 text-sm font-medium rounded-lg flex items-center justify-center gap-2 transition-all ${
                        mode === 'location' ? 'bg-purple-100 text-purple-700 shadow-sm' : 'text-gray-500 hover:bg-gray-50'
                    }`}
                >
                    <Navigation size={16} /> V mém okolí
                </button>
            </div>

            {/* Location Finder UI */}
            {mode === 'location' && (
                <div className="bg-blue-50 p-4 rounded-xl border border-blue-100 animate-in fade-in slide-in-from-top-2">
                    <div className="flex justify-between items-center mb-2">
                        <h3 className="font-bold text-blue-900 text-sm">GPS Poloha (okruh 100 km)</h3>
                        {coords && <span className="text-xs font-mono text-blue-600">Lat: {coords.lat.toFixed(3)}, Lng: {coords.lng.toFixed(3)}</span>}
                    </div>
                    
                    {!coords ? (
                        <button 
                            onClick={handleGetLocation}
                            disabled={locating}
                            className="w-full bg-blue-600 text-white py-2 rounded-lg font-medium text-sm flex items-center justify-center gap-2 hover:bg-blue-700 transition-colors disabled:opacity-50"
                        >
                            {locating ? <Loader2 className="animate-spin" size={16}/> : <MapPin size={16}/>}
                            {locating ? 'Zjišťuji polohu...' : 'Použít mou aktuální polohu'}
                        </button>
                    ) : (
                        <div className="flex items-center gap-2 text-green-700 text-sm bg-green-100 p-2 rounded-lg border border-green-200">
                            <MapPin size={16} /> Poloha úspěšně zaměřena
                        </div>
                    )}
                    {locError && <p className="text-red-500 text-xs mt-2">{locError}</p>}
                </div>
            )}

            <div className="space-y-3">
                <h3 className="font-bold text-gray-800 text-sm uppercase">Vaše preference</h3>
                <div className="flex flex-wrap gap-2">
                    {tags.map(tag => (
                        <button
                            key={tag}
                            onClick={() => toggleTag(tag)}
                            className={`px-3 py-2 rounded-lg text-sm font-medium transition-all flex items-center gap-2 ${
                                preferences.includes(tag)
                                ? 'bg-purple-600 text-white shadow-md transform scale-105'
                                : 'bg-white text-gray-600 border border-gray-200 hover:border-purple-300'
                            }`}
                        >
                           <Tag size={14} /> {tag}
                        </button>
                    ))}
                </div>
            </div>

            <button
                onClick={handleGenerate}
                disabled={preferences.length === 0 || loading || (mode === 'location' && !coords)}
                className={`w-full py-3 rounded-xl font-bold flex items-center justify-center gap-2 transition-all shadow-md ${
                    preferences.length === 0 || loading || (mode === 'location' && !coords)
                    ? 'bg-gray-200 text-gray-400 cursor-not-allowed' 
                    : 'bg-norway-red text-white hover:bg-red-700'
                }`}
            >
                {loading ? <Loader2 className="animate-spin" /> : <Sparkles size={20} />}
                {loading ? 'Generuji...' : 'Získat tipy'}
            </button>

            {result && (
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 animate-fade-in">
                    <h3 className="font-bold text-gray-800 mb-4 border-b pb-2">
                        {mode === 'location' ? 'Tipy v okolí' : 'Tipy na trase'}
                    </h3>
                    <div 
                        className="prose prose-sm prose-purple text-gray-700"
                        dangerouslySetInnerHTML={{ __html: result }}
                    />
                </div>
            )}
        </div>
    );
};

export default Recommendations;