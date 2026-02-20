import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Dashboard from './components/Dashboard';
import Itinerary from './components/Itinerary';
import Budget from './components/Budget';
import Tools from './components/Tools';
import AiChat from './components/AiChat';
import Transport from './components/Transport';
import OfflineMaps from './components/OfflineMaps';
import Recommendations from './components/Recommendations';
import Weather from './components/Weather';
import { AppView } from './types';

const App: React.FC = () => {
    const [currentView, setView] = useState<AppView>(AppView.DASHBOARD);

    const renderView = () => {
        switch (currentView) {
            case AppView.DASHBOARD:
                return <Dashboard setView={setView} />;
            case AppView.ITINERARY:
                return <Itinerary />;
            case AppView.BUDGET:
                return <Budget />;
            case AppView.TOOLS:
                return <Tools />;
            case AppView.AI_GUIDE:
                return <AiChat />;
            case AppView.TRANSPORT:
                return <Transport />;
            case AppView.OFFLINE_MAPS:
                return <OfflineMaps />;
            case AppView.RECOMMENDATIONS:
                return <Recommendations />;
            case AppView.WEATHER:
                return <Weather />;
            default:
                return <Dashboard setView={setView} />;
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 font-sans text-gray-900 max-w-md mx-auto shadow-2xl overflow-hidden relative border-x border-gray-200">
            <main className="h-screen overflow-hidden flex flex-col">
                <div className="flex-1 overflow-y-auto no-scrollbar">
                    {renderView()}
                </div>
            </main>
            <Navbar currentView={currentView} setView={setView} />
        </div>
    );
};

export default App;