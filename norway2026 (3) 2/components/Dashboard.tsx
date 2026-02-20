import React from 'react';
import { AppView } from '../types';
import { Map, Tent, TrainFront, Compass, MapPinned, Sparkles, CloudSun, Bot, ChevronRight, Camera } from 'lucide-react';

interface DashboardProps {
    setView: (view: AppView) => void;
}

const Dashboard: React.FC<DashboardProps> = ({ setView }) => {
    // Countdown logic to Summer 2026 (approx June 15)
    const targetDate = new Date('2026-06-15').getTime();
    const now = new Date().getTime();
    const daysLeft = Math.max(0, Math.floor((targetDate - now) / (1000 * 60 * 60 * 24)));

    return (
        <div className="p-6 pb-24 space-y-6">
            <header className="mb-6">
                <h1 className="text-3xl font-extrabold text-norway-blue tracking-tight">Nord<span className="text-norway-red">Expedition</span></h1>
                <p className="text-gray-500 font-medium">Léto 2026 • Lofoty -> Oslo</p>
            </header>

            {/* Countdown Card */}
            <div className="bg-gradient-to-r from-norway-blue to-blue-900 rounded-2xl p-6 text-white shadow-lg relative overflow-hidden">
                <div className="relative z-10">
                    <p className="text-blue-200 text-sm font-medium uppercase tracking-wider mb-1">Odpočet</p>
                    <div className="flex items-baseline gap-2">
                        <span className="text-5xl font-bold">{daysLeft}</span>
                        <span className="text-lg opacity-80">dní do odjezdu</span>
                    </div>
                </div>
                <div className="absolute right-[-20px] bottom-[-20px] opacity-10">
                   <Map size={150} />
                </div>
            </div>

            {/* AI Assistant Big Button */}
            <button 
                onClick={() => setView(AppView.AI_GUIDE)} 
                className="w-full bg-white border border-gray-200 p-4 rounded-xl shadow-sm flex items-center justify-between group hover:border-norway-blue transition-all"
            >
                <div className="flex items-center gap-4">
                    <div className="bg-norway-blue text-white p-3 rounded-full shadow-md">
                        <Bot size={24} />
                    </div>
                    <div className="text-left">
                        <h3 className="font-bold text-gray-900 text-lg flex items-center gap-2">
                            AI Průvodce
                            <span className="text-[10px] bg-norway-red text-white px-1.5 py-0.5 rounded uppercase tracking-wide">Vision</span>
                        </h3>
                        <p className="text-xs text-gray-500 flex items-center gap-1">
                            <Camera size={12} /> Rozpoznání fotek & Chat
                        </p>
                    </div>
                </div>
                <ChevronRight size={20} className="text-gray-400 group-hover:text-norway-blue transition-colors" />
            </button>

            {/* AI Recommendations */}
            <button onClick={() => setView(AppView.RECOMMENDATIONS)} className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 p-4 rounded-xl shadow-md text-white flex items-center justify-between group hover:shadow-lg transition-all">
                <div className="flex items-center gap-3">
                    <div className="bg-white/20 p-2 rounded-lg">
                        <Sparkles size={20} className="text-white" />
                    </div>
                    <div className="text-left">
                        <h3 className="font-bold text-lg">AI Doporučení</h3>
                        <p className="text-xs text-purple-100">Aktivity na míru vašemu stylu</p>
                    </div>
                </div>
                <Compass size={24} className="opacity-50 group-hover:opacity-100 transition-opacity" />
            </button>

            {/* Main Navigation Grid */}
            <div className="grid grid-cols-2 gap-4">
                <button onClick={() => setView(AppView.ITINERARY)} className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 hover:border-norway-red transition-colors text-left group">
                    <div className="bg-red-50 w-10 h-10 rounded-lg flex items-center justify-center text-norway-red mb-3 group-hover:bg-red-100 transition-colors">
                        <Map size={20} />
                    </div>
                    <h3 className="font-bold text-gray-800">Trasa</h3>
                    <p className="text-xs text-gray-500 mt-1">14 dní dobrodružství</p>
                </button>

                <button onClick={() => setView(AppView.WEATHER)} className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 hover:border-blue-400 transition-colors text-left group">
                    <div className="bg-blue-50 w-10 h-10 rounded-lg flex items-center justify-center text-blue-500 mb-3 group-hover:bg-blue-100 transition-colors">
                        <CloudSun size={20} />
                    </div>
                    <h3 className="font-bold text-gray-800">Počasí (YR)</h3>
                    <p className="text-xs text-gray-500 mt-1">Lokální předpověď</p>
                </button>

                <button onClick={() => setView(AppView.TOOLS)} className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 hover:border-green-600 transition-colors text-left group">
                    <div className="bg-green-50 w-10 h-10 rounded-lg flex items-center justify-center text-green-600 mb-3 group-hover:bg-green-100 transition-colors">
                        <Tent size={20} />
                    </div>
                    <h3 className="font-bold text-gray-800">Přežití</h3>
                    <p className="text-xs text-gray-500 mt-1">Kemping & Jídlo</p>
                </button>

                <button onClick={() => setView(AppView.TRANSPORT)} className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 hover:border-blue-600 transition-colors text-left group">
                    <div className="bg-blue-50 w-10 h-10 rounded-lg flex items-center justify-center text-blue-600 mb-3 group-hover:bg-blue-100 transition-colors">
                        <TrainFront size={20} />
                    </div>
                    <h3 className="font-bold text-gray-800">Doprava</h3>
                    <p className="text-xs text-gray-500 mt-1">Vlaky & Trajekty</p>
                </button>

                 <button onClick={() => setView(AppView.OFFLINE_MAPS)} className="col-span-2 bg-white p-4 rounded-xl shadow-sm border border-gray-100 hover:border-orange-600 transition-colors text-left group flex items-center justify-between">
                    <div>
                        <div className="flex items-center gap-2 mb-1">
                            <div className="bg-orange-50 w-8 h-8 rounded-lg flex items-center justify-center text-orange-600 group-hover:bg-orange-100 transition-colors">
                                <MapPinned size={16} />
                            </div>
                            <h3 className="font-bold text-gray-800">Offline Mapy</h3>
                        </div>
                        <p className="text-xs text-gray-500">Stáhnout data pro oblasti</p>
                    </div>
                    <ChevronRight size={20} className="text-gray-300 group-hover:text-orange-600" />
                </button>
            </div>

            <div className="bg-white p-5 rounded-xl border border-gray-200">
                <h3 className="font-bold text-gray-800 mb-3 flex items-center gap-2">
                    <TrainFront size={18} className="text-blue-600"/>
                    Rychlé info
                </h3>
                <ul className="space-y-3">
                    <li className="flex justify-between text-sm">
                        <span className="text-gray-600">Měna (1 NOK)</span>
                        <span className="font-medium">~2.15 CZK</span>
                    </li>
                    <li className="flex justify-between text-sm">
                        <span className="text-gray-600">Reis Ung (Měsíc)</span>
                        <span className="font-medium text-green-600">440 NOK</span>
                    </li>
                    <li className="flex justify-between text-sm">
                        <span className="text-gray-600">Nouzové číslo</span>
                        <span className="font-bold text-red-600">112 / 113</span>
                    </li>
                </ul>
            </div>
        </div>
    );
};

export default Dashboard;