import React, { useState } from 'react';
import { MAP_REGIONS, ITINERARY_DATA } from '../constants';
import { Download, CheckCircle, ExternalLink, Smartphone, MapPin, X } from 'lucide-react';

const OfflineMaps: React.FC = () => {
    const [saved, setSaved] = useState(false);
    const [activeRegion, setActiveRegion] = useState<number | null>(null);

    const handleSaveOffline = () => {
        // Simple mock of caching essential data to localStorage
        localStorage.setItem('nord_itinerary', JSON.stringify(ITINERARY_DATA));
        setSaved(true);
        setTimeout(() => setSaved(false), 3000);
    };

    // Calculate relative position on a 500x300 abstract map
    // Lat range approx: 69 (top) to 59 (bottom) -> 10 deg span
    // Lng range approx: 5 (left) to 16 (right) -> 11 deg span
    const getPosition = (lat: number, lng: number) => {
        const minLat = 59;
        const maxLat = 69;
        const minLng = 4;
        const maxLng = 16;
        
        const top = ((maxLat - lat) / (maxLat - minLat)) * 100;
        const left = ((lng - minLng) / (maxLng - minLng)) * 100;
        
        return { top: `${top}%`, left: `${left}%` };
    };

    return (
        <div className="p-4 pb-24 space-y-6">
            <h2 className="text-2xl font-bold text-norway-blue">Offline Mapy</h2>
            
            {/* Interactive Map Visual */}
            <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-100">
                <h3 className="font-bold text-gray-800 mb-4">Interaktivní přehled oblastí</h3>
                <div className="relative w-full h-[400px] bg-blue-50/50 rounded-lg border border-blue-100 overflow-hidden">
                    {/* Abstract Norway Shape/Path - Simplified Line */}
                    <div className="absolute top-[10%] left-[60%] bottom-[10%] w-0.5 border-l-2 border-dashed border-gray-300 transform -skew-x-12 origin-bottom"></div>
                    <div className="absolute bottom-2 right-2 text-[10px] text-gray-400 font-mono">NORSKO (Schematické)</div>

                    {MAP_REGIONS.map((region, idx) => {
                        const pos = getPosition(region.lat, region.lng);
                        const isActive = activeRegion === idx;

                        return (
                            <div 
                                key={idx}
                                className="absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer group"
                                style={pos}
                                onClick={() => setActiveRegion(idx)}
                            >
                                <div className={`relative flex flex-col items-center ${isActive ? 'z-20' : 'z-10'}`}>
                                    <MapPin 
                                        size={isActive ? 32 : 24} 
                                        className={`drop-shadow-md transition-all ${isActive ? 'text-norway-red fill-current' : 'text-norway-blue group-hover:text-norway-red'}`} 
                                    />
                                    {/* Label underneath pin if not active */}
                                    {!isActive && (
                                        <span className="text-[10px] font-bold text-gray-600 bg-white/80 px-1 rounded mt-1 whitespace-nowrap backdrop-blur-sm">
                                            {region.name.split(' ')[0]}
                                        </span>
                                    )}
                                </div>

                                {/* Active Popover */}
                                {isActive && (
                                    <div className="absolute top-8 left-1/2 transform -translate-x-1/2 bg-white p-3 rounded-lg shadow-xl border border-gray-200 w-48 z-30 animate-in fade-in zoom-in duration-200">
                                        <div className="flex justify-between items-start mb-2">
                                            <h4 className="font-bold text-sm text-gray-800">{region.name}</h4>
                                            <button 
                                                onClick={(e) => { e.stopPropagation(); setActiveRegion(null); }}
                                                className="text-gray-400 hover:text-gray-600"
                                            >
                                                <X size={14} />
                                            </button>
                                        </div>
                                        <a 
                                            href={region.link}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="block w-full bg-norway-red text-white text-xs font-bold py-2 px-3 rounded text-center hover:bg-red-700 transition-colors"
                                        >
                                            Otevřít na Mapy.cz
                                        </a>
                                    </div>
                                )}
                            </div>
                        );
                    })}
                </div>
            </div>

            {/* App Data Cache */}
            <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-100">
                <h3 className="font-bold text-gray-800 mb-2">1. Data aplikace</h3>
                <p className="text-sm text-gray-600 mb-4">
                    Uložte si textový itinerář, slovník a tipy přímo do paměti prohlížeče, aby aplikace fungovala i bez signálu.
                </p>
                <button 
                    onClick={handleSaveOffline}
                    className={`w-full py-3 rounded-lg font-bold flex items-center justify-center gap-2 transition-all ${
                        saved ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                    }`}
                >
                    {saved ? <CheckCircle size={20} /> : <Download size={20} />}
                    {saved ? 'Uloženo offline' : 'Uložit data aplikace'}
                </button>
            </div>

            {/* Mapy.cz Integration */}
            <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-100">
                <h3 className="font-bold text-gray-800 mb-2">2. Mapové podklady</h3>
                <div className="bg-orange-50 p-3 rounded-lg border border-orange-100 mb-4">
                    <div className="flex items-start gap-2">
                        <Smartphone className="text-orange-600 mt-1 shrink-0" size={18} />
                        <div className="text-sm text-orange-800">
                            <strong>Důležité:</strong> Mapy lze stáhnout pouze v <strong>mobilní aplikaci Mapy.cz</strong> (ne v prohlížeči).
                        </div>
                    </div>
                    <ol className="list-decimal list-inside text-xs text-orange-700 mt-2 space-y-1 ml-1">
                        <li>Nainstalujte si aplikaci Mapy.cz do telefonu.</li>
                        <li>Jděte do <strong>Menu &gt; Offline mapy</strong>.</li>
                        <li>Vyberte <strong>Evropa &gt; Norsko</strong> a stáhněte region "Nordland".</li>
                    </ol>
                </div>
                
                <p className="text-xs text-gray-500 mb-2">Rychlé odkazy na oblasti (pro online náhled):</p>
                <div className="space-y-2">
                    {MAP_REGIONS.map((region, idx) => (
                        <div 
                            key={idx}
                            className={`flex justify-between items-center p-3 rounded-lg transition-colors border cursor-pointer ${
                                activeRegion === idx 
                                ? 'bg-blue-50 border-norway-blue' 
                                : 'bg-gray-50 border-gray-200 hover:bg-gray-100'
                            }`}
                            onClick={() => {
                                setActiveRegion(idx);
                                window.scrollTo({ top: 0, behavior: 'smooth' });
                            }}
                        >
                            <span className="font-medium text-gray-700">{region.name}</span>
                            <a 
                                href={region.link}
                                target="_blank"
                                rel="noopener noreferrer"
                                onClick={(e) => e.stopPropagation()}
                                className="text-norway-red hover:bg-red-50 p-1 rounded"
                            >
                                <ExternalLink size={16} />
                            </a>
                        </div>
                    ))}
                </div>
            </div>

            {/* Saved Locations List */}
            <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-100">
                <h3 className="font-bold text-gray-800 mb-3">Uložené body</h3>
                <div className="max-h-60 overflow-y-auto space-y-2 pr-1">
                    {ITINERARY_DATA.flatMap(day => day.locations).map((loc, idx) => (
                        <div key={idx} className="flex justify-between text-sm border-b border-gray-100 last:border-0 py-2">
                            <span className="text-gray-700">{loc.name}</span>
                            <span className="font-mono text-xs text-gray-400">{loc.lat.toFixed(3)}, {loc.lng.toFixed(3)}</span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default OfflineMaps;