
export interface ItineraryDay {
    day: number;
    title: string;
    description: string;
    locations: LocationPoint[];
    accommodation: string;
    tips: string[];
}

export interface LocationPoint {
    name: string;
    lat: number;
    lng: number;
    type: 'hike' | 'transport' | 'poi' | 'camp';
}

export interface GroceryItem {
    czech: string;
    english: string;
    norwegian: string;
    pronunciation: string;
    category: 'basic' | 'food' | 'transport' | 'nature' | 'shopping';
}

export interface PackingItem {
    id: string;
    text: string;
    category: 'clothing' | 'camping' | 'electronics' | 'hygiene' | 'documents' | 'food';
    isPacked: boolean;
}

export interface Expense {
    id: string;
    description: string;
    amountNOK: number;
    timestamp: number;
}

export enum AppView {
    DASHBOARD = 'dashboard',
    ITINERARY = 'itinerary',
    BUDGET = 'budget',
    TOOLS = 'tools',
    AI_GUIDE = 'ai_guide',
    TRANSPORT = 'transport',
    OFFLINE_MAPS = 'offline_maps',
    RECOMMENDATIONS = 'recommendations',
    WEATHER = 'weather'
}

export interface ChatMessage {
    id: string;
    role: 'user' | 'model';
    text: string;
    image?: string; // Base64 string for image attachment
    timestamp: number;
}

export interface TransportMode {
    id: string;
    name: string;
    icon: any;
    priceLevel: 'low' | 'mid' | 'high';
    pros: string[];
    cons: string[];
    link: string;
    description: string;
}