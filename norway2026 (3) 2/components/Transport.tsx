import React, { useState } from 'react';
import { TRANSPORT_INFO } from '../constants';
import { ExternalLink, ChevronDown, ChevronUp, Banknote } from 'lucide-react';

const Transport: React.FC = () => {
    const [openId, setOpenId] = useState<string | null>(null);

    const toggle = (id: string) => {
        setOpenId(openId === id ? null : id);
    };

    return (
        <div className="p-4 pb-24 space-y-6">
            <h2 className="text-2xl font-bold text-norway-blue">Místní Doprava</h2>
            <p className="text-sm text-gray-600">
                Přehled možností cestování po severním Norsku. Pro nejnižší ceny rezervujte vlaky 90 dní předem (Minipris).
            </p>

            <div className="space-y-3">
                {TRANSPORT_INFO.map((mode) => {
                    const isOpen = openId === mode.id;
                    const Icon = mode.icon;

                    return (
                        <div key={mode.id} className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden transition-all">
                            <button 
                                onClick={() => toggle(mode.id)}
                                className="w-full flex items-center justify-between p-4 bg-white hover:bg-gray-50 transition-colors"
                            >
                                <div className="flex items-center gap-3">
                                    <div className={`p-2 rounded-lg ${isOpen ? 'bg-norway-blue text-white' : 'bg-blue-50 text-norway-blue'}`}>
                                        <Icon size={20} />
                                    </div>
                                    <div className="text-left">
                                        <h3 className="font-bold text-gray-800">{mode.name}</h3>
                                        <div className="flex items-center gap-1 text-xs text-gray-500">
                                            <Banknote size={12} />
                                            Cena: {mode.priceLevel === 'low' ? 'Nízká' : mode.priceLevel === 'mid' ? 'Střední' : 'Vysoká'}
                                        </div>
                                    </div>
                                </div>
                                {isOpen ? <ChevronUp size={20} className="text-gray-400" /> : <ChevronDown size={20} className="text-gray-400" />}
                            </button>

                            {isOpen && (
                                <div className="p-4 pt-0 border-t border-gray-100 bg-gray-50/50">
                                    <p className="text-sm text-gray-700 mt-3 mb-3 leading-relaxed">
                                        {mode.description}
                                    </p>
                                    
                                    <div className="grid grid-cols-2 gap-4 mb-4">
                                        <div>
                                            <h4 className="text-xs font-bold text-green-700 uppercase mb-1">Výhody</h4>
                                            <ul className="text-xs text-gray-600 list-disc list-inside">
                                                {mode.pros.map((p, i) => <li key={i}>{p}</li>)}
                                            </ul>
                                        </div>
                                        <div>
                                            <h4 className="text-xs font-bold text-red-700 uppercase mb-1">Nevýhody</h4>
                                            <ul className="text-xs text-gray-600 list-disc list-inside">
                                                {mode.cons.map((c, i) => <li key={i}>{c}</li>)}
                                            </ul>
                                        </div>
                                    </div>

                                    <a 
                                        href={mode.link}
                                        target="_blank" 
                                        rel="noopener noreferrer"
                                        className="inline-flex items-center gap-2 text-sm font-medium text-blue-600 hover:text-blue-800 hover:underline"
                                    >
                                        Rezervovat / Jízdní řády <ExternalLink size={14} />
                                    </a>
                                </div>
                            )}
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default Transport;