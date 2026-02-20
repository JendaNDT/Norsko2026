import React from 'react';
import { Map, Calculator, Tent, Bot, LayoutDashboard, CloudSun } from 'lucide-react';
import { AppView } from '../types';

interface NavbarProps {
    currentView: AppView;
    setView: (view: AppView) => void;
}

const Navbar: React.FC<NavbarProps> = ({ currentView, setView }) => {
    const navItems = [
        { id: AppView.DASHBOARD, icon: LayoutDashboard, label: 'Přehled' },
        { id: AppView.ITINERARY, icon: Map, label: 'Itinerář' },
        { id: AppView.AI_GUIDE, icon: Bot, label: 'AI Chat' },
        { id: AppView.BUDGET, icon: Calculator, label: 'Rozpočet' },
        { id: AppView.TOOLS, icon: Tent, label: 'Nástroje' },
    ];

    return (
        <nav className="fixed bottom-0 left-0 w-full bg-white border-t border-gray-200 pb-safe z-50">
            <div className="flex justify-around items-center h-16">
                {navItems.map((item) => (
                    <button
                        key={item.id}
                        onClick={() => setView(item.id)}
                        className={`flex flex-col items-center justify-center w-full h-full space-y-1 ${
                            currentView === item.id 
                            ? 'text-norway-red' 
                            : 'text-gray-500 hover:text-norway-blue'
                        }`}
                    >
                        <item.icon size={20} strokeWidth={currentView === item.id ? 2.5 : 2} />
                        <span className="text-[10px] font-medium">{item.label}</span>
                    </button>
                ))}
            </div>
        </nav>
    );
};

export default Navbar;