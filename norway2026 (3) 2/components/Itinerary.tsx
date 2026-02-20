import React, { useState, useEffect } from 'react';
import { ITINERARY_DATA } from '../constants';
import { MapPin, ExternalLink, Mountain, Ship, Train, Edit, Plus, Trash2, Save, FileText, Calendar } from 'lucide-react';
import { ItineraryDay } from '../types';

const Itinerary: React.FC = () => {
    const [activeTab, setActiveTab] = useState<'fixed' | 'custom'>('fixed');
    const [customItinerary, setCustomItinerary] = useState<ItineraryDay[]>([]);
    
    // Edit Form State
    const [isEditing, setIsEditing] = useState(false);
    const [editId, setEditId] = useState<number | null>(null);
    const [editDay, setEditDay] = useState<number>(0);
    const [editTitle, setEditTitle] = useState('');
    const [editDesc, setEditDesc] = useState('');
    const [editAcc, setEditAcc] = useState('');

    useEffect(() => {
        const saved = localStorage.getItem('nord_custom_itinerary');
        if (saved) {
            setCustomItinerary(JSON.parse(saved));
        }
    }, []);

    const saveCustom = (data: ItineraryDay[]) => {
        setCustomItinerary(data);
        localStorage.setItem('nord_custom_itinerary', JSON.stringify(data));
    };

    const importFixed = () => {
        if (window.confirm("Chcete importovat doporučenou trasu do svého plánu? Přepíše to stávající vlastní plán.")) {
            saveCustom([...ITINERARY_DATA]);
        }
    };

    const deleteDay = (dayNum: number) => {
        if (window.confirm("Opravdu smazat tento den?")) {
            const newData = customItinerary.filter(d => d.day !== dayNum);
            saveCustom(newData);
        }
    };

    const startEdit = (day?: ItineraryDay) => {
        setIsEditing(true);
        if (day) {
            setEditId(day.day);
            setEditDay(day.day);
            setEditTitle(day.title);
            setEditDesc(day.description);
            setEditAcc(day.accommodation);
        } else {
            // New Day
            setEditId(null);
            const nextDay = customItinerary.length > 0 ? Math.max(...customItinerary.map(d => d.day)) + 1 : 1;
            setEditDay(nextDay);
            setEditTitle('');
            setEditDesc('');
            setEditAcc('');
        }
    };

    const saveEdit = () => {
        const newDay: ItineraryDay = {
            day: editDay,
            title: editTitle,
            description: editDesc,
            accommodation: editAcc,
            locations: [],
            tips: []
        };

        if (editId !== null) {
            // Update existing
            const newData = customItinerary.map(d => d.day === editId ? newDay : d);
            // Sort by day
            newData.sort((a, b) => a.day - b.day);
            saveCustom(newData);
        } else {
            // Add new
            const newData = [...customItinerary, newDay];
            newData.sort((a, b) => a.day - b.day);
            saveCustom(newData);
        }
        setIsEditing(false);
    };

    const openMap = (lat: number, lng: number, provider: 'google' | 'mapycz') => {
        const url = provider === 'google' 
            ? `https://www.google.com/maps/search/?api=1&query=${lat},${lng}`
            : `https://en.mapy.cz/turisticka?x=${lng}&y=${lat}&z=13&source=coor&id=${lng}%2C${lat}`;
        window.open(url, '_blank');
    };

    const getIcon = (type: string) => {
        switch (type) {
            case 'hike': return <Mountain size={14} className="text-green-600" />;
            case 'transport': return <Train size={14} className="text-blue-600" />;
            case 'camp': return <Ship size={14} className="text-orange-600" />;
            default: return <MapPin size={14} className="text-gray-600" />;
        }
    };

    const renderList = (data: ItineraryDay[], isCustom: boolean) => (
        <div className="space-y-4">
            {data.length === 0 && isCustom && (
                <div className="text-center py-10 bg-white rounded-xl border border-dashed border-gray-300">
                    <p className="text-gray-500 mb-4">Váš plán je prázdný.</p>
                    <button onClick={importFixed} className="bg-gray-100 text-gray-700 px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-200">
                        Importovat doporučenou trasu
                    </button>
                </div>
            )}
            
            {data.map((day) => (
                <div key={day.day} className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden group">
                    <div className="bg-norway-blue/5 p-3 border-b border-gray-100 flex justify-between items-center">
                        <h3 className="font-bold text-norway-blue">Den {day.day}: {day.title}</h3>
                        {isCustom && (
                            <div className="flex gap-2">
                                <button onClick={() => startEdit(day)} className="text-gray-400 hover:text-blue-600 p-1">
                                    <Edit size={16} />
                                </button>
                                <button onClick={() => deleteDay(day.day)} className="text-gray-400 hover:text-red-600 p-1">
                                    <Trash2 size={16} />
                                </button>
                            </div>
                        )}
                    </div>
                    <div className="p-4 space-y-3">
                        <p className="text-gray-600 text-sm leading-relaxed whitespace-pre-wrap">{day.description}</p>
                        
                        {day.accommodation && (
                            <div className="bg-yellow-50 p-2 rounded-lg text-xs text-yellow-800 border border-yellow-100">
                                <strong>Ubytování:</strong> {day.accommodation}
                            </div>
                        )}

                        {day.locations && day.locations.length > 0 && (
                            <div className="space-y-2">
                                {day.locations.map((loc, idx) => (
                                    <div key={idx} className="flex items-center justify-between text-sm bg-gray-50 p-2 rounded">
                                        <div className="flex items-center gap-2">
                                            {getIcon(loc.type)}
                                            <span className="font-medium text-gray-700">{loc.name}</span>
                                        </div>
                                        <div className="flex gap-2">
                                            <button 
                                                onClick={() => openMap(loc.lat, loc.lng, 'google')}
                                                className="text-xs text-blue-600 hover:underline flex items-center gap-1"
                                            >
                                                GMaps <ExternalLink size={10} />
                                            </button>
                                            <button 
                                                onClick={() => openMap(loc.lat, loc.lng, 'mapycz')}
                                                className="text-xs text-red-600 hover:underline flex items-center gap-1"
                                            >
                                                Mapy.cz <ExternalLink size={10} />
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}

                        {day.tips && day.tips.length > 0 && (
                            <div className="mt-2">
                                <p className="text-xs font-bold text-gray-500 uppercase mb-1">Tipy</p>
                                <ul className="list-disc list-inside text-xs text-gray-600">
                                    {day.tips.map((tip, i) => <li key={i}>{tip}</li>)}
                                </ul>
                            </div>
                        )}
                    </div>
                </div>
            ))}
        </div>
    );

    return (
        <div className="p-4 space-y-6 pb-24">
            <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold text-norway-blue">Itinerář</h2>
                {activeTab === 'custom' && !isEditing && (
                    <button 
                        onClick={() => startEdit()}
                        className="bg-norway-red text-white p-2 rounded-full shadow-lg hover:bg-red-700 transition-colors"
                    >
                        <Plus size={24} />
                    </button>
                )}
            </div>

            {/* Tabs */}
            <div className="bg-gray-100 p-1 rounded-xl flex gap-1">
                <button 
                    onClick={() => setActiveTab('fixed')}
                    className={`flex-1 py-2 text-sm font-bold rounded-lg transition-all flex items-center justify-center gap-2 ${
                        activeTab === 'fixed' 
                        ? 'bg-white text-norway-blue shadow-sm' 
                        : 'text-gray-500 hover:text-gray-700'
                    }`}
                >
                    <Calendar size={16} /> Doporučený
                </button>
                <button 
                    onClick={() => setActiveTab('custom')}
                    className={`flex-1 py-2 text-sm font-bold rounded-lg transition-all flex items-center justify-center gap-2 ${
                        activeTab === 'custom' 
                        ? 'bg-white text-norway-blue shadow-sm' 
                        : 'text-gray-500 hover:text-gray-700'
                    }`}
                >
                    <Edit size={16} /> Můj Plán
                </button>
            </div>
            
            {isEditing ? (
                <div className="bg-white p-5 rounded-xl shadow-lg border border-gray-200 animate-in fade-in slide-in-from-bottom-4">
                    <h3 className="font-bold text-gray-800 mb-4">{editId !== null ? 'Upravit den' : 'Nový den'}</h3>
                    
                    <div className="space-y-4">
                        <div>
                            <label className="block text-xs font-bold text-gray-500 mb-1">Číslo dne</label>
                            <input 
                                type="number" 
                                value={editDay} 
                                onChange={(e) => setEditDay(parseInt(e.target.value) || 0)}
                                className="w-full border border-gray-300 rounded-lg p-2 focus:border-norway-blue outline-none"
                            />
                        </div>
                        <div>
                            <label className="block text-xs font-bold text-gray-500 mb-1">Název dne</label>
                            <input 
                                type="text" 
                                value={editTitle} 
                                onChange={(e) => setEditTitle(e.target.value)}
                                placeholder="Např. Výlet na Reinebringen"
                                className="w-full border border-gray-300 rounded-lg p-2 focus:border-norway-blue outline-none"
                            />
                        </div>
                         <div>
                            <label className="block text-xs font-bold text-gray-500 mb-1">Ubytování</label>
                            <input 
                                type="text" 
                                value={editAcc} 
                                onChange={(e) => setEditAcc(e.target.value)}
                                placeholder="Kde budu spát?"
                                className="w-full border border-gray-300 rounded-lg p-2 focus:border-norway-blue outline-none"
                            />
                        </div>
                        <div>
                            <label className="block text-xs font-bold text-gray-500 mb-1">Popis / Poznámky</label>
                            <textarea 
                                value={editDesc} 
                                onChange={(e) => setEditDesc(e.target.value)}
                                placeholder="Detailní plán..."
                                rows={5}
                                className="w-full border border-gray-300 rounded-lg p-2 focus:border-norway-blue outline-none"
                            />
                        </div>

                        <div className="flex gap-2 pt-2">
                            <button 
                                onClick={() => setIsEditing(false)}
                                className="flex-1 py-3 bg-gray-100 text-gray-600 rounded-xl font-bold hover:bg-gray-200"
                            >
                                Zrušit
                            </button>
                            <button 
                                onClick={saveEdit}
                                className="flex-1 py-3 bg-norway-blue text-white rounded-xl font-bold hover:bg-blue-900 flex items-center justify-center gap-2"
                            >
                                <Save size={18} /> Uložit
                            </button>
                        </div>
                    </div>
                </div>
            ) : (
                renderList(activeTab === 'fixed' ? ITINERARY_DATA : customItinerary, activeTab === 'custom')
            )}
        </div>
    );
};

export default Itinerary;