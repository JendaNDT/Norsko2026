import React, { useState, useEffect } from 'react';
import { PRICES_2026 } from '../constants';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';
import { Calculator, Users, ArrowRightLeft, Coins, Plus, Trash2, Wallet, TrendingDown } from 'lucide-react';
import { Expense } from '../types';

const Budget: React.FC = () => {
    // Budget Calculator State
    const [age, setAge] = useState<number>(24);
    const [days, setDays] = useState<number>(14);
    const [persons, setPersons] = useState<number>(1);

    // Currency Converter State
    const [convAmount, setConvAmount] = useState<string>('');
    const [convMode, setConvMode] = useState<'NOK_TO_CZK' | 'CZK_TO_NOK'>('NOK_TO_CZK');

    // Expense Tracker State
    const [expenses, setExpenses] = useState<Expense[]>([]);
    const [newExpenseDesc, setNewExpenseDesc] = useState('');
    const [newExpenseAmount, setNewExpenseAmount] = useState('');

    // Load expenses from local storage
    useEffect(() => {
        const savedExpenses = localStorage.getItem('nord_expenses');
        if (savedExpenses) {
            setExpenses(JSON.parse(savedExpenses));
        }
    }, []);

    // Save expenses to local storage
    const saveExpenses = (newExpenses: Expense[]) => {
        setExpenses(newExpenses);
        localStorage.setItem('nord_expenses', JSON.stringify(newExpenses));
    };

    const addExpense = () => {
        if (!newExpenseDesc || !newExpenseAmount) return;
        const amount = parseFloat(newExpenseAmount);
        if (isNaN(amount)) return;

        const newExpense: Expense = {
            id: Date.now().toString(),
            description: newExpenseDesc,
            amountNOK: amount,
            timestamp: Date.now()
        };

        saveExpenses([newExpense, ...expenses]);
        setNewExpenseDesc('');
        setNewExpenseAmount('');
    };

    const removeExpense = (id: string) => {
        if(window.confirm("Opravdu smazat tento výdaj?")) {
            const filtered = expenses.filter(e => e.id !== id);
            saveExpenses(filtered);
        }
    };

    // Budget Calculation Logic (Estimated)
    const isYouth = age < 26;
    const perPersonTransport = isYouth ? PRICES_2026.REIS_UNG_MONTHLY : PRICES_2026.TRAVEL_PASS_NORDLAND;
    const perPersonFood = days * PRICES_2026.MEAL_CHEAP * 2; 
    const perPersonAccommodation = days * 150; 
    const perPersonMisc = 1000; 

    const totalTransport = perPersonTransport * persons;
    const totalFood = perPersonFood * persons;
    const totalAccommodation = perPersonAccommodation * persons;
    const totalMisc = perPersonMisc * persons;

    const totalEstimatedNOK = totalTransport + totalFood + totalAccommodation + totalMisc;
    const totalEstimatedCZK = Math.round(totalEstimatedNOK * PRICES_2026.EXCHANGE_RATE_CZK);

    // Actual Spending Logic
    const totalSpentNOK = expenses.reduce((sum, item) => sum + item.amountNOK, 0);
    const remainingNOK = totalEstimatedNOK - totalSpentNOK;
    const remainingPercent = Math.max(0, (remainingNOK / totalEstimatedNOK) * 100);

    const chartData = [
        { name: 'Doprava', value: totalTransport },
        { name: 'Jídlo', value: totalFood },
        { name: 'Ubytování', value: totalAccommodation },
        { name: 'Ostatní', value: totalMisc },
    ];

    const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

    // Converter Logic
    const toggleConvMode = () => {
        setConvMode(prev => prev === 'NOK_TO_CZK' ? 'CZK_TO_NOK' : 'NOK_TO_CZK');
    };

    const getConvertedValue = () => {
        const val = parseFloat(convAmount);
        if (isNaN(val)) return '---';
        
        if (convMode === 'NOK_TO_CZK') {
            return (val * PRICES_2026.EXCHANGE_RATE_CZK).toFixed(0) + ' CZK';
        } else {
            return (val / PRICES_2026.EXCHANGE_RATE_CZK).toFixed(1) + ' NOK';
        }
    };

    const inputClass = "w-full border border-gray-300 bg-white text-gray-900 rounded p-2 text-lg font-semibold focus:ring-2 focus:ring-norway-blue focus:border-transparent outline-none transition-all";

    return (
        <div className="p-4 pb-24 space-y-6">
            <h2 className="text-2xl font-bold text-norway-blue mb-4">Rozpočet & Výdaje</h2>

            {/* Currency Converter Section */}
            <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl p-5 text-white shadow-lg">
                <div className="flex justify-between items-center mb-4">
                    <h3 className="font-bold flex items-center gap-2">
                        <Coins size={18} className="text-yellow-400" /> 
                        Rychlý převodník
                    </h3>
                    <span className="text-xs text-gray-400 bg-gray-700 px-2 py-1 rounded">
                        1 NOK ≈ {PRICES_2026.EXCHANGE_RATE_CZK} CZK
                    </span>
                </div>

                <div className="flex items-center gap-2">
                    <div className="flex-1 relative">
                        <label className="absolute -top-2 left-2 bg-gray-700 px-1 text-[10px] text-gray-300 rounded">
                            {convMode === 'NOK_TO_CZK' ? 'Norská koruna (NOK)' : 'Česká koruna (CZK)'}
                        </label>
                        <input 
                            type="number" 
                            value={convAmount}
                            onChange={(e) => setConvAmount(e.target.value)}
                            placeholder="0"
                            className="w-full bg-gray-700 border border-gray-600 rounded-lg p-3 text-xl font-bold text-white focus:ring-2 focus:ring-yellow-500 outline-none"
                        />
                    </div>
                    
                    <button 
                        onClick={toggleConvMode}
                        className="p-3 bg-gray-600 rounded-full hover:bg-gray-500 transition-colors"
                    >
                        <ArrowRightLeft size={20} className="text-yellow-400" />
                    </button>

                    <div className="flex-1 bg-gray-800/50 border border-gray-700 rounded-lg p-3 flex flex-col justify-center h-[54px]">
                         <span className="text-[10px] text-gray-400 uppercase">
                             {convMode === 'NOK_TO_CZK' ? 'To se rovná' : 'To se rovná'}
                         </span>
                         <span className="text-xl font-bold text-yellow-400 truncate">
                             {getConvertedValue()}
                         </span>
                    </div>
                </div>
            </div>

            {/* Toggle Sections Title */}
            <div className="flex items-center gap-2 mt-8 mb-2">
                <Calculator size={20} className="text-norway-blue" />
                <h3 className="text-lg font-bold text-gray-800">Plánovač</h3>
            </div>
            
            <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-100">
                <div className="grid grid-cols-3 gap-3 mb-4">
                    <div>
                         <label className="block text-[10px] font-bold text-gray-500 mb-1 uppercase">Osob</label>
                        <input 
                            type="number" 
                            min="1"
                            value={persons} 
                            onChange={(e) => setPersons(Math.max(1, parseInt(e.target.value) || 1))}
                            className="w-full border border-gray-200 rounded p-2 font-bold text-center"
                        />
                    </div>
                    <div>
                        <label className="block text-[10px] font-bold text-gray-500 mb-1 uppercase">Věk</label>
                        <input 
                            type="number" 
                            value={age} 
                            onChange={(e) => setAge(parseInt(e.target.value) || 0)}
                            className="w-full border border-gray-200 rounded p-2 font-bold text-center"
                        />
                    </div>
                    <div>
                        <label className="block text-[10px] font-bold text-gray-500 mb-1 uppercase">Dní</label>
                        <input 
                            type="number" 
                            value={days} 
                            onChange={(e) => setDays(parseInt(e.target.value) || 0)}
                            className="w-full border border-gray-200 rounded p-2 font-bold text-center"
                        />
                    </div>
                </div>

                <div className="flex justify-between items-center bg-gray-50 p-3 rounded-lg border border-gray-100">
                    <span className="text-sm text-gray-600">Odhad celkem:</span>
                    <div className="text-right">
                        <span className="block font-bold text-lg text-norway-blue">{totalEstimatedNOK.toLocaleString()} NOK</span>
                        <span className="block text-xs text-gray-400">cca {totalEstimatedCZK.toLocaleString()} CZK</span>
                    </div>
                </div>
            </div>

            {/* EXPENSE TRACKER */}
            <div className="flex items-center gap-2 mt-8 mb-2">
                <Wallet size={20} className="text-norway-red" />
                <h3 className="text-lg font-bold text-gray-800">Moje Výdaje</h3>
            </div>

            <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-100">
                {/* Status Bar */}
                <div className="mb-6">
                    <div className="flex justify-between text-sm mb-1">
                        <span className="font-medium text-gray-600">Utraceno: {totalSpentNOK} NOK</span>
                        <span className={`font-bold ${remainingNOK < 0 ? 'text-red-600' : 'text-green-600'}`}>
                            Zbývá: {remainingNOK} NOK
                        </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
                        <div 
                            className={`h-full transition-all duration-500 ${remainingPercent < 20 ? 'bg-red-500' : 'bg-green-500'}`}
                            style={{ width: `${Math.min(100, (totalSpentNOK / totalEstimatedNOK) * 100)}%` }}
                        ></div>
                    </div>
                    <p className="text-xs text-center text-gray-400 mt-1">
                        Zbývá cca {Math.floor(remainingNOK / days)} NOK na den
                    </p>
                </div>

                {/* Add Expense Form */}
                <div className="flex gap-2 mb-6">
                    <input 
                        type="text" 
                        placeholder="Za co? (např. Rema)" 
                        value={newExpenseDesc}
                        onChange={(e) => setNewExpenseDesc(e.target.value)}
                        className="flex-1 border border-gray-300 rounded-lg px-3 py-2 text-sm focus:border-norway-blue outline-none"
                    />
                    <input 
                        type="number" 
                        placeholder="NOK" 
                        value={newExpenseAmount}
                        onChange={(e) => setNewExpenseAmount(e.target.value)}
                        className="w-20 border border-gray-300 rounded-lg px-3 py-2 text-sm focus:border-norway-blue outline-none"
                    />
                    <button 
                        onClick={addExpense}
                        className="bg-norway-blue text-white p-2 rounded-lg hover:bg-blue-900 transition-colors"
                    >
                        <Plus size={20} />
                    </button>
                </div>

                {/* Expense List */}
                <div className="space-y-2 max-h-60 overflow-y-auto">
                    {expenses.length === 0 && (
                        <p className="text-center text-gray-400 text-sm py-4 italic">Žádné výdaje zatím.</p>
                    )}
                    {expenses.map((expense) => (
                        <div key={expense.id} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg border border-gray-100">
                            <div>
                                <p className="font-bold text-gray-800 text-sm">{expense.description}</p>
                                <p className="text-[10px] text-gray-500">
                                    {new Date(expense.timestamp).toLocaleDateString()} • {new Date(expense.timestamp).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                                </p>
                            </div>
                            <div className="flex items-center gap-3">
                                <span className="font-mono font-bold text-norway-red">-{expense.amountNOK} kr</span>
                                <button onClick={() => removeExpense(expense.id)} className="text-gray-400 hover:text-red-500">
                                    <Trash2 size={14} />
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Visual Chart */}
            <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 mt-6">
                <h3 className="text-sm font-bold text-gray-800 mb-2 uppercase tracking-wide">Struktura plánu</h3>
                <div className="h-48 w-full relative">
                    <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                            <Pie
                                data={chartData}
                                cx="50%"
                                cy="50%"
                                innerRadius={40}
                                outerRadius={60}
                                fill="#8884d8"
                                paddingAngle={5}
                                dataKey="value"
                            >
                                {chartData.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                ))}
                            </Pie>
                            <Tooltip formatter={(value: number) => [`${value} NOK`, 'Částka']} />
                            <Legend />
                        </PieChart>
                    </ResponsiveContainer>
                </div>
            </div>
        </div>
    );
};

export default Budget;