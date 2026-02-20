import { GoogleGenAI } from "@google/genai";
import { GEMINI_API_KEY } from "../constants";

// Initialize the client
const ai = new GoogleGenAI({ apiKey: GEMINI_API_KEY });

const SYSTEM_INSTRUCTION = `
Jste expertní cestovní průvodce pro nízkonákladovou expedici do Norska v roce 2026.
Vaším úkolem je pomáhat uživatelům s:
1. Pravidly 'Allemannsretten' (právo volného pohybu a kempování).
2. Nízkonákladovým cestováním (využití 'Reis Ung', 'Minipris', Free Ferries).
3. Plánováním itineráře (Lofoty -> Bodø -> Trondheim -> Oslo).
4. Identifikací norských potravin, památek a přírodních úkazů z fotek.
5. Překladem nápisů a menu z norštiny.

Odpovídejte stručně, prakticky a v češtině. Vycházejte z toho, že uživatel má omezený rozpočet.
Pokud se uživatel ptá na ceny, uvádějte odhady v NOK a CZK (kurz cca 2.15 CZK/NOK).
`;

export const sendMessageToGemini = async (message: string, history: {role: 'user' | 'model', text: string}[], imageBase64?: string) => {
    try {
        // Prepare the current user message parts
        const currentParts: any[] = [{ text: message }];
        
        // Add image if present
        if (imageBase64) {
            // Remove data URL prefix if present (e.g., "data:image/jpeg;base64,")
            const base64Data = imageBase64.split(',')[1] || imageBase64;
            
            currentParts.push({
                inlineData: {
                    mimeType: "image/jpeg",
                    data: base64Data
                }
            });
        }

        const response = await ai.models.generateContent({
            model: 'gemini-3-flash-preview',
            contents: [
                { role: 'user', parts: [{ text: SYSTEM_INSTRUCTION }] },
                ...history.map(msg => ({
                    role: msg.role,
                    parts: [{ text: msg.text }]
                })),
                { role: 'user', parts: currentParts }
            ],
            config: {
                systemInstruction: SYSTEM_INSTRUCTION,
            }
        });
        
        return response.text || "Omlouvám se, ale nemohu momentálně odpovědět.";
    } catch (error) {
        console.error("Gemini API Error:", error);
        return "Došlo k chybě při komunikaci s AI asistentem. Zkontrolujte připojení.";
    }
};

export const getRecommendations = async (preferences: string[], location?: { lat: number, lng: number }) => {
    let context = "";
    
    if (location) {
        context = `
        Uživatel se aktuálně nachází na GPS souřadnicích: ${location.lat}, ${location.lng}.
        Ignoruj původní itinerář. Najdi a doporuč 3-5 zajímavých míst nebo aktivit POUZE v okruhu přibližně 100 km od tohoto bodu.
        U každého bodu uveď orientační vzdálenost od uživatele.
        `;
    } else {
        context = `
        Na základě celého itineráře cesty (Lofoty -> Bodø -> Trondheim -> Dovrefjell -> Oslo) doporuč 5 konkrétních aktivit nebo míst podél této trasy.
        `;
    }

    const prompt = `
    ${context}
    
    Preference uživatele: ${preferences.join(', ')}.
    
    Formátuj výstup jako jednoduchý seznam HTML bodů (<ul><li>...</li></ul>), kde každý bod obsahuje název místa a krátký důvod (max 1 věta).
    Zaměř se na low-cost nebo zdarma dostupné aktivity.
    `;

    try {
        const response = await ai.models.generateContent({
            model: 'gemini-3-flash-preview',
            contents: [{ role: 'user', parts: [{ text: prompt }] }],
            config: {
                systemInstruction: SYSTEM_INSTRUCTION,
            }
        });
        return response.text;
    } catch (error) {
        console.error("Gemini Recs Error:", error);
        return "<ul><li>Nepodařilo se načíst doporučení. Zkuste to prosím později.</li></ul>";
    }
};