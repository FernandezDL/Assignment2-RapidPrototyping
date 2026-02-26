export type StatKey = "atk" | "def" | "spd";

export type CardType = "Beast" | "Mage" | "Tech" | "Nature";
export type Strategy = "Aggro" | "Control" | "Balanced";

export type CardModel = {
    id: string;
    name: string;
    type: CardType;
    cost: number;
    stats: Record<StatKey, number>;
    description: string;
};

export type DeckModel = {
    id: string;
    name: string;
    description: string;
    cards: Record<string, number>; // max 2 per card in deck
    createdAt: number;
};
