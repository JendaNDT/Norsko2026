import React, { useState, useRef, useEffect } from 'react';
import { sendMessageToGemini } from '../services/geminiService';
import { ChatMessage } from '../types';
import { Send, Bot, User, Camera, Image as ImageIcon, X } from 'lucide-react';

const AiChat: React.FC = () => {
    const [messages, setMessages] = useState<ChatMessage[]>([
        {
            id: 'init',
            role: 'model',
            text: 'Ahoj! Jsem tvůj průvodce po Norsku. Můžeš mi poslat fotku jídla, mapy nebo krajiny a já ti řeknu, co to je!',
            timestamp: Date.now()
        }
    ]);
    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [selectedImage, setSelectedImage] = useState<string | null>(null);
    const messagesEndRef = useRef<HTMLDivElement>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setSelectedImage(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSend = async () => {
        if ((!input.trim() && !selectedImage) || isLoading) return;

        const userMsg: ChatMessage = {
            id: Date.now().toString(),
            role: 'user',
            text: input,
            image: selectedImage || undefined,
            timestamp: Date.now()
        };

        setMessages(prev => [...prev, userMsg]);
        setInput('');
        const imageToSend = selectedImage; // Store ref to send
        setSelectedImage(null); // Clear UI immediately
        setIsLoading(true);

        const history = messages.map(m => ({ role: m.role, text: m.text }));
        
        // Send to Gemini with image if present
        const responseText = await sendMessageToGemini(userMsg.text || "Co je na tomto obrázku?", history, imageToSend || undefined);

        const aiMsg: ChatMessage = {
            id: (Date.now() + 1).toString(),
            role: 'model',
            text: responseText,
            timestamp: Date.now()
        };

        setMessages(prev => [...prev, aiMsg]);
        setIsLoading(false);
    };

    return (
        <div className="flex flex-col h-full pb-20 bg-gray-50">
            <div className="bg-white p-4 shadow-sm border-b border-gray-200">
                <h2 className="text-lg font-bold text-norway-blue flex items-center gap-2">
                    <Bot size={20} /> AI Průvodce (Vision)
                </h2>
                <p className="text-xs text-gray-500">Zeptejte se nebo pošlete fotku k analýze.</p>
            </div>

            <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {messages.map((msg) => (
                    <div 
                        key={msg.id} 
                        className={`flex flex-col ${msg.role === 'user' ? 'items-end' : 'items-start'}`}
                    >
                        <div 
                            className={`max-w-[85%] p-3 rounded-2xl text-sm leading-relaxed shadow-sm ${
                                msg.role === 'user' 
                                ? 'bg-norway-blue text-white rounded-br-none' 
                                : 'bg-white text-gray-800 border border-gray-100 rounded-bl-none'
                            }`}
                        >
                            {msg.image && (
                                <img 
                                    src={msg.image} 
                                    alt="User upload" 
                                    className="w-full h-auto max-h-48 object-cover rounded-lg mb-2 border border-white/20"
                                />
                            )}
                            {msg.text && <p>{msg.text}</p>}
                        </div>
                        <span className="text-[10px] text-gray-400 mt-1 px-1">
                            {new Date(msg.timestamp).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                        </span>
                    </div>
                ))}
                {isLoading && (
                    <div className="flex justify-start">
                        <div className="bg-white p-3 rounded-2xl rounded-bl-none border border-gray-100 shadow-sm">
                            <div className="flex space-x-1">
                                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                            </div>
                        </div>
                    </div>
                )}
                <div ref={messagesEndRef} />
            </div>

            <div className="p-4 bg-white border-t border-gray-200">
                {selectedImage && (
                    <div className="relative w-16 h-16 mb-2">
                        <img src={selectedImage} className="w-full h-full object-cover rounded-lg border border-gray-300" />
                        <button 
                            onClick={() => setSelectedImage(null)}
                            className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-0.5 shadow-md"
                        >
                            <X size={12} />
                        </button>
                    </div>
                )}
                <div className="flex gap-2 items-end">
                    <button 
                        onClick={() => fileInputRef.current?.click()}
                        className="p-2 text-gray-500 hover:text-norway-blue bg-gray-100 rounded-full transition-colors mb-0.5"
                    >
                        <Camera size={20} />
                    </button>
                    <input 
                        type="file" 
                        ref={fileInputRef}
                        accept="image/*"
                        className="hidden" 
                        onChange={handleFileSelect}
                    />
                    
                    <div className="flex-1 relative">
                        <textarea
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            onKeyDown={(e) => {
                                if (e.key === 'Enter' && !e.shiftKey) {
                                    e.preventDefault();
                                    handleSend();
                                }
                            }}
                            placeholder={selectedImage ? "Co mám na obrázku?" : "Napiš zprávu..."}
                            className="w-full border border-gray-300 rounded-2xl px-4 py-2 text-sm focus:outline-none focus:border-norway-blue focus:ring-1 focus:ring-norway-blue resize-none max-h-24 overflow-y-auto"
                            rows={1}
                            style={{minHeight: '40px'}}
                        />
                    </div>
                    
                    <button 
                        onClick={handleSend}
                        disabled={isLoading || (!input.trim() && !selectedImage)}
                        className="bg-norway-red text-white p-2.5 rounded-full hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors mb-0.5 shadow-sm"
                    >
                        <Send size={18} />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default AiChat;