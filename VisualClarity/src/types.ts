export type StatKey = "atk" | "def" | "spd";

export type CardModel = {
    id: string;        // unique per distinct card
    name: string;
    type: "Beast" | "Mage" | "Tech" | "Nature";
    cost: number;      // “energy”
    stats: Record<StatKey, number>; // 3 stats mínimo
    description: string;
    artVariant: number; // 0..3 solo mock
};

export type DeckModel = {
    id: string;
    name: string;
    description: string;
    coverArt: number; // 0..3 mock
    // Deck stores counts per card id (max 2 each)
    cards: Record<string, number>;
    createdAt: number;
};