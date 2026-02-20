import React, { useState, useEffect } from 'react';
import { GROCERY_VOCABULARY, EMERGENCY_NUMBERS, DEFAULT_PACKING_LIST } from '../constants';
import { Phone, ShoppingCart, Tent, Compass, Languages, Filter, Backpack, CheckSquare, Trash2, RefreshCw, Mountain, Timer, TrendingUp, Weight } from 'lucide-react';
import { PackingItem } from '../types';

const Tools: React.FC = () => {
    const [activeTab, setActiveTab] = useState<'vocabulary' | 'safety' | 'camp' | 'packing' | 'hike'>('vocabulary');
    const [vocabCategory, setVocabCategory] = useState<string>('all');
    
    // Packing List State
    const [packingList, setPackingList] = useState<PackingItem[]>([]);

    // Hike Calculator State
    const [hikeDist, setHikeDist] = useState<number>(10);
    const [hikeElev, setHikeElev] = useState<number>(500);
    const [hikeHeavyPack, setHikeHeavyPack] = useState<boolean>(true);

    useEffect(() => {
        // Load from LocalStorage on mount
        const savedList = localStorage.getItem('nord_packing_list');
        if (savedList) {
            setPackingList(JSON.parse(savedList));
        } else {
            setPackingList(DEFAULT_PACKING_LIST);
        }
    }, []);

    const savePackingList = (newList: PackingItem[]) => {
        setPackingList(newList);
        localStorage.setItem('nord_packing_list', JSON.stringify(newList));
    };

    const toggleItem = (id: string) => {
        const newList = packingList.map(item => 
            item.id === id ? { ...item, isPacked: !item.isPacked } : item
        );
        savePackingList(newList);
    };

    const resetPackingList = () => {
        if (window.confirm("Opravdu chcete resetovat celý seznam balení?")) {
            savePackingList(DEFAULT_PACKING_LIST);
        }
    };

    // Hiking Calculation Logic (DNT based approximation)
    const calculateHikeTime = () => {
        // Base: 3km/h on flat rough terrain
        const timeDist = hikeDist / 3.0;
        
        // Elevation: +1h for every 350m (DNT varies between 300-400 based on steepness)
        const timeElev = hikeElev / 350;

        let totalHours = timeDist + timeElev;

        // Heavy pack penalty (+15%)
        if (hikeHeavyPack) {
            totalHours = totalHours * 1.15;
        }

        const h = Math.floor(totalHours);
        const m = Math.round((totalHours - h) * 60);
        return { h, m };
    };

    const hikeTime = calculateHikeTime();

    const filteredVocabulary = vocabCategory === 'all' 
        ? GROCERY_VOCABULARY 
        : GROCERY_VOCABULARY.filter(item => item.category === vocabCategory);

    // Packing List Calculations
    const totalItems = packingList.length;
    const packedItems = packingList.filter(i => i.isPacked).length;
    const progress = totalItems > 0 ? (packedItems / totalItems) * 100 : 0;

    const categories = {
        clothing: "Oblečení & Obuv",
        camping: "Kemping & Vaření",
        electronics: "Elektronika",
        hygiene: "Hygiena & Lékárna",
        documents: "Doklady & Peníze",
        food: "Jídlo"
    };

    return (
        <div className="p-4 pb-24 h-full flex flex-col">
            <h2 className="text-2xl font-bold text-norway-blue mb-4">Nástroje</h2>
            
            <div className="flex gap-2 mb-6 overflow-x-auto no-scrollbar pb-2">
                <button 
                    onClick={() => setActiveTab('vocabulary')}
                    className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap ${activeTab === 'vocabulary' ? 'bg-norway-blue text-white' : 'bg-gray-100 text-gray-600'}`}
                >
                    <Languages size={16} /> Slovník
                </button>
                <button 
                    onClick={() => setActiveTab('hike')}
                    className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap ${activeTab === 'hike' ? 'bg-green-700 text-white' : 'bg-gray-100 text-gray-600'}`}
                >
                    <Mountain size={16} /> Túra
                </button>
                <button 
                    onClick={() => setActiveTab('packing')}
                    className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap ${activeTab === 'packing' ? 'bg-orange-500 text-white' : 'bg-gray-100 text-gray-600'}`}
                >
                    <Backpack size={16} /> Balení
                </button>
                <button 
                    onClick={() => setActiveTab('safety')}
                    className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap ${activeTab === 'safety' ? 'bg-red-600 text-white' : 'bg-gray-100 text-gray-600'}`}
                >
                    <Phone size={16} /> Nouze
                </button>
                <button 
                    onClick={() => setActiveTab('camp')}
                    className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap ${activeTab === 'camp' ? 'bg-green-600 text-white' : 'bg-gray-100 text-gray-600'}`}
                >
                    <Tent size={16} /> Kemp
                </button>
            </div>

            <div className="flex-1 overflow-y-auto">
                {activeTab === 'vocabulary' && (
                    <div className="space-y-4">
                        <div className="bg-yellow-50 p-4 rounded-xl border border-yellow-100 mb-2">
                            <h3 className="font-bold text-yellow-800 mb-1 text-sm">Levné značky (White-labels)</h3>
                            <p className="text-xs text-yellow-700">Hledejte v obchodech tyto nízkonákladové řady:</p>
                            <ul className="text-sm text-yellow-900 space-y-1 mt-2">
                                <li>🥝 <strong>Kiwi:</strong> "First Price" (Nejnižší ceny)</li>
                                <li>🔴 <strong>Rema 1000:</strong> "Prima"</li>
                                <li>🔵 <strong>Coop Extra:</strong> "Xtra"</li>
                            </ul>
                        </div>

                        {/* Vocabulary Filter */}
                        <div className="flex gap-2 overflow-x-auto pb-2 mb-2 no-scrollbar">
                             <button onClick={() => setVocabCategory('all')} className={`text-xs px-3 py-1 rounded-full border ${vocabCategory === 'all' ? 'bg-gray-800 text-white border-gray-800' : 'bg-white text-gray-600 border-gray-200'}`}>Vše</button>
                             <button onClick={() => setVocabCategory('basic')} className={`text-xs px-3 py-1 rounded-full border ${vocabCategory === 'basic' ? 'bg-blue-600 text-white border-blue-600' : 'bg-white text-gray-600 border-gray-200'}`}>Základ</button>
                             <button onClick={() => setVocabCategory('food')} className={`text-xs px-3 py-1 rounded-full border ${vocabCategory === 'food' ? 'bg-orange-500 text-white border-orange-500' : 'bg-white text-gray-600 border-gray-200'}`}>Jídlo</button>
                             <button onClick={() => setVocabCategory('shopping')} className={`text-xs px-3 py-1 rounded-full border ${vocabCategory === 'shopping' ? 'bg-yellow-500 text-white border-yellow-500' : 'bg-white text-gray-600 border-gray-200'}`}>Nákupy</button>
                             <button onClick={() => setVocabCategory('transport')} className={`text-xs px-3 py-1 rounded-full border ${vocabCategory === 'transport' ? 'bg-purple-600 text-white border-purple-600' : 'bg-white text-gray-600 border-gray-200'}`}>Cesta</button>
                             <button onClick={() => setVocabCategory('nature')} className={`text-xs px-3 py-1 rounded-full border ${vocabCategory === 'nature' ? 'bg-green-600 text-white border-green-600' : 'bg-white text-gray-600 border-gray-200'}`}>Příroda</button>
                        </div>

                        <div className="grid gap-2">
                            {filteredVocabulary.map((item, idx) => (
                                <div key={idx} className="bg-white p-3 rounded-lg shadow-sm border border-gray-100 flex flex-col gap-1">
                                    <div className="flex justify-between items-baseline">
                                        <span className="font-bold text-gray-900 text-lg">{item.norwegian}</span>
                                        <span className="text-gray-400 text-sm italic font-mono">[{item.pronunciation}]</span>
                                    </div>
                                    <div className="flex justify-between items-center border-t border-gray-50 pt-2 mt-1">
                                        <span className="text-gray-700 font-medium">{item.czech}</span>
                                        <span className="text-gray-400 text-xs">{item.english}</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {activeTab === 'hike' && (
                    <div className="space-y-6">
                        <div className="bg-gradient-to-br from-green-700 to-green-900 p-6 rounded-2xl text-white shadow-lg text-center">
                            <p className="text-green-200 text-xs font-bold uppercase tracking-wider mb-2">Odhadovaný čas (bez přestávek)</p>
                            <div className="flex justify-center items-baseline gap-2">
                                <span className="text-6xl font-bold tracking-tighter">{hikeTime.h}</span>
                                <span className="text-xl opacity-80 font-medium">h</span>
                                <span className="text-6xl font-bold tracking-tighter ml-4">{hikeTime.m}</span>
                                <span className="text-xl opacity-80 font-medium">min</span>
                            </div>
                            <div className="mt-4 flex justify-center gap-2 text-xs bg-black/20 rounded-full py-1 px-3 w-fit mx-auto">
                                <Timer size={14} />
                                <span>Metodika DNT (Norský standard)</span>
                            </div>
                        </div>

                        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 space-y-6">
                            {/* Distance Slider */}
                            <div>
                                <div className="flex justify-between mb-2">
                                    <label className="font-bold text-gray-700 flex items-center gap-2">
                                        <Compass size={18} className="text-blue-500" /> Vzdálenost
                                    </label>
                                    <span className="font-mono font-bold text-blue-600">{hikeDist} km</span>
                                </div>
                                <input 
                                    type="range" 
                                    min="1" 
                                    max="40" 
                                    step="0.5"
                                    value={hikeDist} 
                                    onChange={(e) => setHikeDist(parseFloat(e.target.value))}
                                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
                                />
                                <div className="flex justify-between text-[10px] text-gray-400 mt-1">
                                    <span>1 km</span>
                                    <span>40 km</span>
                                </div>
                            </div>

                            {/* Elevation Slider */}
                            <div>
                                <div className="flex justify-between mb-2">
                                    <label className="font-bold text-gray-700 flex items-center gap-2">
                                        <TrendingUp size={18} className="text-red-500" /> Převýšení
                                    </label>
                                    <span className="font-mono font-bold text-red-600">{hikeElev} m</span>
                                </div>
                                <input 
                                    type="range" 
                                    min="0" 
                                    max="2000" 
                                    step="50"
                                    value={hikeElev} 
                                    onChange={(e) => setHikeElev(parseInt(e.target.value))}
                                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-red-600"
                                />
                                <div className="flex justify-between text-[10px] text-gray-400 mt-1">
                                    <span>0 m</span>
                                    <span>2000 m</span>
                                </div>
                            </div>

                            {/* Pack Weight Toggle */}
                            <div className="flex items-center justify-between pt-2 border-t border-gray-100">
                                <div className="flex items-center gap-2">
                                    <div className={`p-2 rounded-lg ${hikeHeavyPack ? 'bg-orange-100 text-orange-600' : 'bg-gray-100 text-gray-400'}`}>
                                        <Weight size={20} />
                                    </div>
                                    <div>
                                        <p className="font-bold text-gray-800 text-sm">Těžký batoh</p>
                                        <p className="text-xs text-gray-500">Expediční náklad (+15% času)</p>
                                    </div>
                                </div>
                                <button 
                                    onClick={() => setHikeHeavyPack(!hikeHeavyPack)}
                                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${hikeHeavyPack ? 'bg-orange-500' : 'bg-gray-300'}`}
                                >
                                    <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition transition-transform ${hikeHeavyPack ? 'translate-x-6' : 'translate-x-1'}`} />
                                </button>
                            </div>
                        </div>

                        <div className="bg-blue-50 p-4 rounded-xl text-xs text-blue-800 leading-relaxed border border-blue-100">
                            <strong>Poznámka:</strong> Tento výpočet je orientační pro průměrně zdatného turistu v norském terénu (mokřady, kameny). Vždy sledujte reálný čas a mějte rezervu.
                        </div>
                    </div>
                )}

                {activeTab === 'packing' && (
                    <div className="space-y-4">
                        <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 sticky top-0 z-10">
                            <div className="flex justify-between items-end mb-2">
                                <div>
                                    <h3 className="font-bold text-gray-800">Stav balení</h3>
                                    <p className="text-xs text-gray-500">{packedItems} z {totalItems} položek</p>
                                </div>
                                <span className="text-2xl font-bold text-orange-500">{Math.round(progress)}%</span>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-2.5">
                                <div className="bg-orange-500 h-2.5 rounded-full transition-all duration-500" style={{ width: `${progress}%` }}></div>
                            </div>
                            <button 
                                onClick={resetPackingList}
                                className="mt-3 text-xs text-gray-400 flex items-center gap-1 hover:text-red-500 transition-colors w-full justify-center"
                            >
                                <RefreshCw size={10} /> Resetovat seznam
                            </button>
                        </div>

                        <div className="space-y-6">
                            {(Object.keys(categories) as Array<keyof typeof categories>).map((catKey) => {
                                const items = packingList.filter(i => i.category === catKey);
                                if (items.length === 0) return null;

                                return (
                                    <div key={catKey}>
                                        <h3 className="text-sm font-bold text-norway-blue uppercase tracking-wider mb-2 ml-1 border-b border-gray-200 pb-1">
                                            {categories[catKey]}
                                        </h3>
                                        <div className="space-y-2">
                                            {items.map(item => (
                                                <div 
                                                    key={item.id} 
                                                    onClick={() => toggleItem(item.id)}
                                                    className={`flex items-start gap-3 p-3 rounded-lg cursor-pointer transition-all border ${
                                                        item.isPacked 
                                                        ? 'bg-green-50 border-green-200' 
                                                        : 'bg-white border-gray-100 shadow-sm'
                                                    }`}
                                                >
                                                    <div className={`mt-0.5 w-5 h-5 rounded border flex items-center justify-center transition-colors ${
                                                        item.isPacked 
                                                        ? 'bg-green-500 border-green-500 text-white' 
                                                        : 'bg-white border-gray-300'
                                                    }`}>
                                                        {item.isPacked && <CheckSquare size={14} />}
                                                    </div>
                                                    <span className={`text-sm font-medium ${item.isPacked ? 'text-green-800 line-through opacity-75' : 'text-gray-800'}`}>
                                                        {item.text}
                                                    </span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                )}

                {activeTab === 'safety' && (
                    <div className="space-y-3">
                        {EMERGENCY_NUMBERS.map((num, idx) => (
                            <div key={idx} className="bg-white p-4 rounded-xl shadow-sm border-l-4 border-red-500 flex justify-between items-center">
                                <div>
                                    <h3 className="font-bold text-gray-900">{num.name}</h3>
                                    <p className="text-xs text-gray-500">{num.description}</p>
                                </div>
                                <a href={`tel:${num.number.replace(/\s/g, '')}`} className="bg-red-100 text-red-700 px-4 py-2 rounded-lg font-bold text-lg">
                                    {num.number}
                                </a>
                            </div>
                        ))}
                        <div className="bg-blue-50 p-4 rounded-xl mt-4">
                            <h3 className="font-bold text-blue-900 mb-2">Moje Poloha</h3>
                            <p className="text-sm text-blue-700 mb-2">V případě nouze nahlaste tyto souřadnice:</p>
                            <LocationFinder />
                        </div>
                    </div>
                )}

                {activeTab === 'camp' && (
                    <div className="space-y-4">
                         <div className="bg-green-50 p-4 rounded-xl border border-green-100">
                            <h3 className="font-bold text-green-800 mb-2 flex items-center gap-2"><Compass size={18}/> Pravidlo 150 metrů</h3>
                            <p className="text-sm text-green-700">
                                Stanovat můžete na "neobdělávané půdě" (utmark) minimálně <strong>150 metrů</strong> od nejbližšího obydleného domu nebo chaty.
                            </p>
                        </div>
                        <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
                            <h3 className="font-bold text-gray-800 mb-2">Pravidlo 48 hodin</h3>
                            <p className="text-sm text-gray-600">
                                Na jednom místě můžete zůstat max. 2 noci, pokud nejste v odlehlých horách. Poté se musíte přesunout.
                            </p>
                        </div>
                         <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
                            <h3 className="font-bold text-gray-800 mb-2">Oheň</h3>
                            <p className="text-sm text-gray-600">
                                Zákaz rozdělávání otevřeného ohně v lesích a v jejich blízkosti od <strong>15. dubna do 15. září</strong>. Používejte vařiče.
                            </p>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

const LocationFinder: React.FC = () => {
    const [coords, setCoords] = useState<{lat: number, lng: number} | null>(null);
    const [error, setError] = useState<string>('');

    const getLocation = () => {
        if (!navigator.geolocation) {
            setError("Geolokace není podporována");
            return;
        }
        navigator.geolocation.getCurrentPosition(
            (position) => {
                setCoords({
                    lat: position.coords.latitude,
                    lng: position.coords.longitude
                });
                setError('');
            },
            () => {
                setError("Nelze získat polohu");
            }
        );
    };

    return (
        <div>
            {coords ? (
                <div className="font-mono text-lg font-bold bg-white p-2 rounded text-center">
                    {coords.lat.toFixed(5)}, {coords.lng.toFixed(5)}
                </div>
            ) : (
                <button onClick={getLocation} className="w-full bg-blue-600 text-white py-2 rounded-lg font-medium text-sm">
                    Zjistit GPS
                </button>
            )}
            {error && <p className="text-red-500 text-xs mt-2">{error}</p>}
        </div>
    );
};

export default Tools;