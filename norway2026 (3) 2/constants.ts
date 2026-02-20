
import { ItineraryDay, GroceryItem, TransportMode, PackingItem } from './types';
import { TrainFront, Ship, Bus, Car, Plane } from 'lucide-react';

export const GEMINI_API_KEY = "AIzaSyCi_1V-1a_RoFUJLjNXyOoAa12SgGofAf8";

export const ITINERARY_DATA: ItineraryDay[] = [
    {
        day: 1,
        title: "Přílet & Aklimatizace (Leknes)",
        description: "Přílet na letiště Leknes (LKN). Přesun do centra, nákup zásob a aktivace Travel Pass Nordland.",
        accommodation: "Haukland Beach (Kempování)",
        locations: [
            { name: "Leknes Airport", lat: 68.1536, lng: 13.6133, type: 'transport' },
            { name: "Haukland Beach", lat: 68.1982, lng: 13.5284, type: 'camp' }
        ],
        tips: ["Aktivovat aplikaci Reis", "Nakoupit v Rema 1000/Kiwi", "Pozor na vítr"]
    },
    {
        day: 2,
        title: "Izolovaná divočina (Kvalvika & Ryten)",
        description: "Trek na pláž Kvalvika a výstup na horu Ryten (543 m n.m.).",
        accommodation: "Stanování poblíž Fredvang nebo Kvalvika",
        locations: [
            { name: "Kvalvika Beach Trailhead", lat: 68.0694, lng: 13.1287, type: 'hike' },
            { name: "Ryten", lat: 68.0864, lng: 13.0898, type: 'hike' }
        ],
        tips: ["Žádná pitná voda na pláži - nabrat předem", "Dřevěné chodníky - nešlapat mimo"]
    },
    {
        day: 3,
        title: "Estetické vyvrcholení (Reine)",
        description: "Přesun do Reine. Ikonické výhledy, Reinebringen.",
        accommodation: "Stanování u Å nebo Reine (pozor na zákazy)",
        locations: [
            { name: "Reine", lat: 67.9284, lng: 13.0858, type: 'poi' },
            { name: "Reinebringen Trail", lat: 67.9255, lng: 13.0728, type: 'hike' }
        ],
        tips: ["Schody na Reinebringen (1560 schodů)", "Koupit Stockfish snack"]
    },
    {
        day: 4,
        title: "Konec cesty (Å i Lofoten)",
        description: "Nejjižnější bod E10. Muzeum rybolovu, pekárna.",
        accommodation: "Moskenes Camping nebo divoko",
        locations: [
            { name: "Å i Lofoten", lat: 67.8803, lng: 12.9822, type: 'poi' },
            { name: "Moskenes Ferry Terminal", lat: 67.8927, lng: 13.0475, type: 'transport' }
        ],
        tips: ["Ochutnat skořicové šneky v pekárně", "Zkontrolovat odjezd trajektu na zítra"]
    },
    {
        day: 5,
        title: "Překonání Vestfjordu (Bodø)",
        description: "Trajekt Moskenes -> Bodø (cca 4h). Prohlídka Bodø.",
        accommodation: "Bodø (Hostel nebo kemp)",
        locations: [
            { name: "Bodø Terminal", lat: 67.2882, lng: 14.3949, type: 'transport' },
            { name: "Keiservarden (Vyhlídka)", lat: 67.3114, lng: 14.4756, type: 'hike' }
        ],
        tips: ["Trajekt pro pěší zdarma (ověřit 2026)", "Nákup zásob na cestu vlakem"]
    },
    {
        day: 6,
        title: "Nordlandsbanen (Vlak na jih)",
        description: "Cesta vlakem po 'Polární dráze' přes Saltfjellet.",
        accommodation: "Vlak / Trondheim",
        locations: [
            { name: "Polární kruh (Vlak)", lat: 66.5540, lng: 15.3235, type: 'poi' },
            { name: "Trondheim S", lat: 63.4363, lng: 10.4005, type: 'transport' }
        ],
        tips: ["Sledovat slevy Minipris", "Jízdenky koupit 60-90 dní předem"]
    },
    {
        day: 8,
        title: "Historické centrum Trondheimu",
        description: "Nidarosdomen, starý most, Bakklandet.",
        accommodation: "Trondheim",
        locations: [
            { name: "Nidarosdomen", lat: 63.4269, lng: 10.3969, type: 'poi' },
            { name: "Gamle Bybro", lat: 63.4282, lng: 10.4014, type: 'poi' }
        ],
        tips: ["Vstup do katedrály je placený", "Procházka podél řeky Nidelva zdarma"]
    },
    {
        day: 10,
        title: "Tundra & Pižmoni (Dovrefjell)",
        description: "Národní park Dovrefjell. Hledání pižmoňů.",
        accommodation: "Stanování v horách (povolené zóny)",
        locations: [
            { name: "Snøhetta Viewpoint", lat: 62.2241, lng: 9.5028, type: 'hike' },
            { name: "Hjerkinn Station", lat: 62.2233, lng: 9.5544, type: 'transport' }
        ],
        tips: ["Dodržovat odstup 200m od pižmoňů", "Velmi silný vítr - pevný stan"]
    },
    {
        day: 12,
        title: "Metropole Oslo",
        description: "Příjezd do Osla. Opera, Vigeland Park.",
        accommodation: "Oslo (drahé - hledat budget hostel)",
        locations: [
            { name: "Oslo Opera House", lat: 59.9075, lng: 10.7531, type: 'poi' },
            { name: "Vigeland Park", lat: 59.9270, lng: 10.7008, type: 'poi' }
        ],
        tips: ["Vigeland Park je zdarma", "Pít vodu z kohoutku"]
    }
];

export const GROCERY_VOCABULARY: GroceryItem[] = [
    // BASIC
    { czech: "Ahoj", english: "Hi / Hello", norwegian: "Hei", pronunciation: "hai", category: "basic" },
    { czech: "Dobré ráno", english: "Good morning", norwegian: "God morgen", pronunciation: "gu morn", category: "basic" },
    { czech: "Dobrou noc", english: "Good night", norwegian: "God natt", pronunciation: "gu nat", category: "basic" },
    { czech: "Děkuji", english: "Thank you", norwegian: "Takk", pronunciation: "tak", category: "basic" },
    { czech: "Ano / Ne", english: "Yes / No", norwegian: "Ja / Nei", pronunciation: "ja / nai", category: "basic" },
    { czech: "Prosím", english: "Please", norwegian: "Vær så snill", pronunciation: "var so snil", category: "basic" },
    { czech: "Promiňte", english: "Sorry / Excuse me", norwegian: "Unnskyld", pronunciation: "unn-šyl", category: "basic" },
    { czech: "Mluvíte anglicky?", english: "Do you speak English?", norwegian: "Snakker du engelsk?", pronunciation: "snaker du engelsk", category: "basic" },
    { czech: "Nerozumím", english: "I don't understand", norwegian: "Jeg forstår ikke", pronunciation: "jai for-stor ikke", category: "basic" },
    { czech: "Kde je toaleta?", english: "Where is the toilet?", norwegian: "Hvor er toalettet?", pronunciation: "vor ar tua-lete", category: "basic" },
    { czech: "Pomoc!", english: "Help!", norwegian: "Hjelp!", pronunciation: "jelp", category: "basic" },
    { czech: "Na shledanou", english: "Goodbye", norwegian: "Ha det bra", pronunciation: "ha de bra", category: "basic" },

    // SHOPPING (FOOD)
    { czech: "Chléb", english: "Bread", norwegian: "Brød", pronunciation: "brø", category: "food" },
    { czech: "Mléko", english: "Milk", norwegian: "Melk", pronunciation: "melk", category: "food" },
    { czech: "Sýr", english: "Cheese", norwegian: "Ost", pronunciation: "ust", category: "food" },
    { czech: "Hnědý sýr", english: "Brown cheese", norwegian: "Brunost", pronunciation: "brun-ust", category: "food" },
    { czech: "Máslo", english: "Butter", norwegian: "Smør", pronunciation: "smør", category: "food" },
    { czech: "Párek v rohlíku", english: "Hot dog", norwegian: "Pølse", pronunciation: "pøl-se", category: "food" },
    { czech: "Rybí karbanátky", english: "Fish cakes", norwegian: "Fiskekaker", pronunciation: "fiske-ka-ker", category: "food" },
    { czech: "Voda (z kohoutku)", english: "Water (tap)", norwegian: "Vann (fra springen)", pronunciation: "vann", category: "food" },
    { czech: "Vejce", english: "Eggs", norwegian: "Egg", pronunciation: "eg", category: "food" },
    { czech: "Kuře", english: "Chicken", norwegian: "Kylling", pronunciation: "šyl-ing", category: "food" },
    { czech: "Brambory", english: "Potatoes", norwegian: "Poteter", pronunciation: "po-te-ter", category: "food" },
    { czech: "Ovesné vločky", english: "Oatmeal", norwegian: "Havregryn", pronunciation: "havre-gryn", category: "food" },
    { czech: "Jahody", english: "Strawberries", norwegian: "Jordbær", pronunciation: "jur-bar", category: "food" },
    { czech: "Pivo", english: "Beer", norwegian: "Øl", pronunciation: "øl", category: "food" },
    { czech: "Káva", english: "Coffee", norwegian: "Kaffe", pronunciation: "kaffe", category: "food" },

    // SHOPPING (GENERAL)
    { czech: "Sleva / Akce", english: "Sale / Offer", norwegian: "Tilbud", pronunciation: "til-bud", category: "shopping" },
    { czech: "Vratná záloha", english: "Bottle deposit", norwegian: "Pant", pronunciation: "pant", category: "shopping" },
    { czech: "Kolik to stojí?", english: "How much is it?", norwegian: "Hvor mye koster det?", pronunciation: "vor mye koster de", category: "shopping" },
    { czech: "Levné", english: "Cheap", norwegian: "Billig", pronunciation: "bi-li", category: "shopping" },
    { czech: "Drahé", english: "Expensive", norwegian: "Dyrt", pronunciation: "dyrt", category: "shopping" },
    { czech: "Účtenka", english: "Receipt", norwegian: "Kvittering", pronunciation: "kvi-te-ring", category: "shopping" },
    { czech: "Taška", english: "Bag", norwegian: "Pose", pronunciation: "pu-se", category: "shopping" },
    { czech: "Hotovost", english: "Cash", norwegian: "Kontanter", pronunciation: "kon-tan-ter", category: "shopping" },
    { czech: "Otevřeno / Zavřeno", english: "Open / Closed", norwegian: "Åpent / Stengt", pronunciation: "o-pent / stengt", category: "shopping" },
    { czech: "Pouze kartou", english: "Card only", norwegian: "Kun kort", pronunciation: "kun kort", category: "shopping" },

    // TRANSPORT
    { czech: "Kde je...?", english: "Where is...?", norwegian: "Hvor er...?", pronunciation: "vor ar", category: "transport" },
    { czech: "Vlakové nádraží", english: "Train station", norwegian: "Togstasjon", pronunciation: "tog-sta-šon", category: "transport" },
    { czech: "Odjezd", english: "Departure", norwegian: "Avgang", pronunciation: "av-gang", category: "transport" },
    { czech: "Příjezd", english: "Arrival", norwegian: "Ankomst", pronunciation: "an-komst", category: "transport" },
    { czech: "Zpoždění", english: "Delayed", norwegian: "Forsinket", pronunciation: "for-sink-et", category: "transport" },
    { czech: "Nástupiště", english: "Platform", norwegian: "Spor", pronunciation: "spur", category: "transport" },
    { czech: "Trajekt", english: "Ferry", norwegian: "Ferge", pronunciation: "fer-ge", category: "transport" },
    { czech: "Autobus", english: "Bus", norwegian: "Buss", pronunciation: "buss", category: "transport" },
    { czech: "Letiště", english: "Airport", norwegian: "Flyplass", pronunciation: "fly-plas", category: "transport" },
    { czech: "Jízdenka", english: "Ticket", norwegian: "Billett", pronunciation: "bi-let", category: "transport" },
    { czech: "Zastávka", english: "Stop", norwegian: "Holdeplass", pronunciation: "hol-de-plas", category: "transport" },
    { czech: "Čerpací stanice", english: "Gas station", norwegian: "Bensinstasjon", pronunciation: "bensin-sta-šun", category: "transport" },
    { czech: "Stopování", english: "Hitchhiking", norwegian: "Haik", pronunciation: "haik", category: "transport" },

    // NATURE / HIKING
    { czech: "Stezka / Cesta", english: "Trail / Path", norwegian: "Sti / Vei", pronunciation: "sti / vai", category: "nature" },
    { czech: "Chata", english: "Cabin", norwegian: "Hytte", pronunciation: "hy-te", category: "nature" },
    { czech: "Hora", english: "Mountain", norwegian: "Fjell", pronunciation: "fjel", category: "nature" },
    { czech: "Vrchol", english: "Summit", norwegian: "Topp", pronunciation: "top", category: "nature" },
    { czech: "Jezero", english: "Lake", norwegian: "Innsjø / Vatnet", pronunciation: "in-šø", category: "nature" },
    { czech: "Mapa", english: "Map", norwegian: "Kart", pronunciation: "kart", category: "nature" },
    { czech: "Stan", english: "Tent", norwegian: "Telt", pronunciation: "telt", category: "nature" },
    { czech: "Zákaz kempování", english: "No camping", norwegian: "Camping forbudt", pronunciation: "kemping for-bud", category: "nature" },
    { czech: "Pitná voda", english: "Drinking water", norwegian: "Drikkevann", pronunciation: "drike-van", category: "nature" },
    { czech: "Déšť / Vítr", english: "Rain / Wind", norwegian: "Regn / Vind", pronunciation: "rain / vind", category: "nature" },
    { czech: "Komár", english: "Mosquito", norwegian: "Mygg", pronunciation: "myg", category: "nature" },
    { czech: "Nebezpečí", english: "Danger", norwegian: "Fare", pronunciation: "fa-re", category: "nature" }
];

export const EMERGENCY_NUMBERS = [
    { name: "Hasiči (Brann)", number: "110", description: "Požáry, nehody" },
    { name: "Policie (Politi)", number: "112", description: "Trestné činy, záchranné akce" },
    { name: "Záchranka (Ambulanse)", number: "113", description: "Ohrožení života" },
    { name: "Pohotovost", number: "116 117", description: "Lékařská služba" }
];

// Budget constants (in NOK)
export const PRICES_2026 = {
    REIS_UNG_MONTHLY: 440, // Youth ticket Nordland
    TRAVEL_PASS_NORDLAND: 1350, // Adult
    HOSTEL_AVG: 850,
    MEAL_CHEAP: 150,
    TRAIN_MINIPRIS_BASE: 299,
    EXCHANGE_RATE_CZK: 2.15 // 1 NOK = 2.15 CZK
};

export const TRANSPORT_INFO: TransportMode[] = [
    {
        id: 'train',
        name: 'Vlak (Vy / SJ Nord)',
        icon: TrainFront,
        priceLevel: 'mid',
        description: 'Páteřní doprava z Bodø do Osla (Nordlandsbanen & Dovrebanen).',
        pros: ['Nádherné výhledy', 'Minipris (levné jízdenky)', 'Noční vlaky šetří ubytování'],
        cons: ['Nutná rezervace předem', 'Méně flexibilní'],
        link: 'https://www.vy.no/en'
    },
    {
        id: 'ferry',
        name: 'Trajekty (Torghatten)',
        icon: Ship,
        priceLevel: 'low',
        description: 'Nezbytné pro Lofoty. Spoj Moskenes - Bodø.',
        pros: ['Zdarma pro pěší (často)', 'Krásné výhledy', 'Odpočinek'],
        cons: ['Závislé na počasí', 'Fronty v sezóně'],
        link: 'https://www.torghatten-nord.no/'
    },
    {
        id: 'bus',
        name: 'Autobus (Reis Nordland)',
        icon: Bus,
        priceLevel: 'low',
        description: 'Lokální doprava po Lofotech a okolí.',
        pros: ['Travel Pass Nordland / Reis Ung', 'Hustá síť'],
        cons: ['Řídce o víkendech', 'Někdy přeplněné'],
        link: 'https://www.reisnordland.no/'
    },
    {
        id: 'car',
        name: 'Pronájem Auta',
        icon: Car,
        priceLevel: 'high',
        description: 'Pro maximální svobodu, ale drahé.',
        pros: ['Svoboda pohybu', 'Dostupnost odlehlých míst'],
        cons: ['Vysoká cena (benzín, mýtné, půjčovné)', 'Parkování'],
        link: 'https://www.rentalcars.com/'
    },
    {
        id: 'plane',
        name: 'Letadlo (Widerøe)',
        icon: Plane,
        priceLevel: 'high',
        description: 'Rychlé přesuny mezi malými letišti (STOL).',
        pros: ['Rychlost', 'Výhledy z výšky'],
        cons: ['Velmi drahé bez slevy', 'Závislost na počasí'],
        link: 'https://www.wideroe.no/'
    }
];

export const MAP_REGIONS = [
    { name: "Lofoty (Celé)", lat: 68.1, lng: 13.6, link: "https://en.mapy.cz/turisticka?x=13.6&y=68.1&z=9" },
    { name: "Bodø & Okolí", lat: 67.3, lng: 14.4, link: "https://en.mapy.cz/turisticka?x=14.4&y=67.3&z=11" },
    { name: "Trondheim", lat: 63.4, lng: 10.4, link: "https://en.mapy.cz/turisticka?x=10.4&y=63.4&z=12" },
    { name: "Dovrefjell (Park)", lat: 62.2, lng: 9.4, link: "https://en.mapy.cz/turisticka?x=9.4&y=62.2&z=10" },
    { name: "Oslo Centrum", lat: 59.9, lng: 10.7, link: "https://en.mapy.cz/turisticka?x=10.7&y=59.9&z=12" }
];

export const DEFAULT_PACKING_LIST: PackingItem[] = [
    // Clothing
    { id: 'c1', text: 'Nepromokavá bunda (Hard shell)', category: 'clothing', isPacked: false },
    { id: 'c2', text: 'Nepromokavé kalhoty', category: 'clothing', isPacked: false },
    { id: 'c3', text: 'Péřová bunda (zateplovací)', category: 'clothing', isPacked: false },
    { id: 'c4', text: 'Vlněné spodní prádlo (Merino set)', category: 'clothing', isPacked: false },
    { id: 'c5', text: 'Vlněné ponožky (3x)', category: 'clothing', isPacked: false },
    { id: 'c6', text: 'Pevné pohorky', category: 'clothing', isPacked: false },
    { id: 'c7', text: 'Čepice a rukavice (i v létě!)', category: 'clothing', isPacked: false },
    { id: 'c8', text: 'Mikina / Fleece', category: 'clothing', isPacked: false },

    // Camping
    { id: 'k1', text: 'Stan (odolný větru)', category: 'camping', isPacked: false },
    { id: 'k2', text: 'Spacák (komfort min. 0°C)', category: 'camping', isPacked: false },
    { id: 'k3', text: 'Karimatka (vyšší R-value)', category: 'camping', isPacked: false },
    { id: 'k4', text: 'Vařič + Plyn (závitový)', category: 'camping', isPacked: false },
    { id: 'k5', text: 'Ešus a lžíce', category: 'camping', isPacked: false },
    { id: 'k6', text: 'Nůž / Multitool', category: 'camping', isPacked: false },

    // Electronics
    { id: 'e1', text: 'Powerbanka (20 000 mAh)', category: 'electronics', isPacked: false },
    { id: 'e2', text: 'Kabely (USB-C/Lightning)', category: 'electronics', isPacked: false },
    { id: 'e3', text: 'Adaptér do sítě', category: 'electronics', isPacked: false },
    { id: 'e4', text: 'Čelovka + náhradní baterie', category: 'electronics', isPacked: false },
    { id: 'e5', text: 'Offline mapy (stažené)', category: 'electronics', isPacked: false },

    // Hygiene & First Aid
    { id: 'h1', text: 'Náplasti na puchýře (Compeed)', category: 'hygiene', isPacked: false },
    { id: 'h2', text: 'Léky (bolest, horečka)', category: 'hygiene', isPacked: false },
    { id: 'h3', text: 'Opalovací krém + brýle', category: 'hygiene', isPacked: false },
    { id: 'h4', text: 'Repelent (silný)', category: 'hygiene', isPacked: false },
    { id: 'h5', text: 'Ručník (rychleschnoucí)', category: 'hygiene', isPacked: false },
    { id: 'h6', text: 'Toaletní papír + lopatka', category: 'hygiene', isPacked: false },

    // Documents & Money
    { id: 'd1', text: 'Pas / Občanský průkaz', category: 'documents', isPacked: false },
    { id: 'd2', text: 'Kreditní karta (fyzická)', category: 'documents', isPacked: false },
    { id: 'd3', text: 'Cestovní pojištění (kartička)', category: 'documents', isPacked: false },
    { id: 'd4', text: 'Jízdenky (vlak/letadlo)', category: 'documents', isPacked: false }
];