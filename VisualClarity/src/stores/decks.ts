import { defineStore } from "pinia";
import type { CardModel, DeckModel, StatKey } from "../types";

const uid = () => Math.random().toString(36).slice(2, 10);

function clamp(n: number, min: number, max: number) {
    return Math.max(min, Math.min(max, n));
}

const starterCards: CardModel[] = [
    { id: "c1", name: "Aether Fox", type: "Beast", cost: 2, stats: { atk: 4, def: 2, spd: 6 }, description: "Quick strike specialist.", artVariant: 0 },
    { id: "c2", name: "Iron Tortoise", type: "Beast", cost: 3, stats: { atk: 2, def: 7, spd: 1 }, description: "Slow, extremely durable.", artVariant: 1 },
    { id: "c3", name: "Spark Librarian", type: "Tech", cost: 2, stats: { atk: 3, def: 3, spd: 4 }, description: "Balanced utility unit.", artVariant: 2 },
    { id: "c4", name: "Vine Warden", type: "Nature", cost: 3, stats: { atk: 3, def: 6, spd: 2 }, description: "Protects allies with roots.", artVariant: 3 },
    { id: "c5", name: "Null Mage", type: "Mage", cost: 4, stats: { atk: 7, def: 2, spd: 3 }, description: "High attack, low defense.", artVariant: 0 },
    { id: "c6", name: "Copper Drone", type: "Tech", cost: 1, stats: { atk: 2, def: 1, spd: 5 }, description: "Cheap and fast.", artVariant: 1 },
    { id: "c7", name: "Moss Giant", type: "Nature", cost: 5, stats: { atk: 6, def: 6, spd: 1 }, description: "Big stats, big cost.", artVariant: 2 },
    { id: "c8", name: "Glitch Runner", type: "Tech", cost: 2, stats: { atk: 3, def: 2, spd: 7 }, description: "Speed-focused attacker.", artVariant: 3 },
    { id: "c9", name: "Frost Sigil", type: "Mage", cost: 3, stats: { atk: 5, def: 3, spd: 2 }, description: "Controls tempo.", artVariant: 1 },
    { id: "c10", name: "Sunleaf Healer", type: "Nature", cost: 2, stats: { atk: 2, def: 4, spd: 3 }, description: "Sustain and support.", artVariant: 0 },
    { id: "c11", name: "Gravel Hound", type: "Beast", cost: 2, stats: { atk: 4, def: 3, spd: 3 }, description: "Reliable frontline.", artVariant: 2 },
    { id: "c12", name: "Arc Prism", type: "Mage", cost: 4, stats: { atk: 6, def: 3, spd: 4 }, description: "Strong spell amplifier.", artVariant: 3 },
    { id: "c13", name: "Bramble Archer", type: "Nature", cost: 2, stats: { atk: 5, def: 2, spd: 4 }, description: "Ranged pressure.", artVariant: 1 },
    { id: "c14", name: "Steel Monk", type: "Tech", cost: 3, stats: { atk: 4, def: 5, spd: 3 }, description: "Disciplined defender.", artVariant: 0 },
    { id: "c15", name: "Night Moth", type: "Beast", cost: 1, stats: { atk: 2, def: 1, spd: 6 }, description: "Evasive nuisance.", artVariant: 3 },
];

// Player “collection”: 3 copies each, but decks DO NOT consume them (rule)
const collectionCopiesPerCard = 3;

export const useDeckStore = defineStore("decks", {
    state: () => ({
        cards: starterCards as CardModel[],
        decks: [] as DeckModel[],
        activeDeckId: "" as string,
        search: "" as string,
        typeFilter: "All" as "All" | CardModel["type"],
        sortKey: "name" as "name" | "cost" | "atk" | "def" | "spd",
        sortDir: "asc" as "asc" | "desc",
        openedCardId: "" as string, // card details modal
        newDeckModalOpen: false,
    }),
    
    getters: {
        activeDeck(state): DeckModel | null {
            return state.decks.find(d => d.id === state.activeDeckId) ?? null;
        },
        
        filteredCards(state): CardModel[] {
            const q = state.search.trim().toLowerCase();
            let list = state.cards.slice();
            
            if (state.typeFilter !== "All") list = list.filter(c => c.type === state.typeFilter);
            if (q) list = list.filter(c => c.name.toLowerCase().includes(q));
            
            const dir = state.sortDir === "asc" ? 1 : -1;
            
            list.sort((a, b) => {
                const get = (c: CardModel) => {
                    if (state.sortKey === "name") return c.name.toLowerCase();
                    if (state.sortKey === "cost") return c.cost;
                    return c.stats[state.sortKey as StatKey];
                };
                
                const A = get(a);
                const B = get(b);
                
                if (typeof A === "string" && typeof B === "string") return A.localeCompare(B) * dir;
                return (Number(A) - Number(B)) * dir;
            });
            
            return list;
        },
        
        deckCount(): number {
            return this.decks.length;
        },
        
        // total cards in deck (sum of counts)
        activeDeckTotalCards(): number {
            const deck = this.activeDeck;
            if (!deck) return 0;
            return Object.values(deck.cards).reduce((a, b) => a + b, 0);
        },
        
        // card count for specific card in active deck
        countInActiveDeck(): (cardId: string) => number {
            return (cardId: string) => {
                const deck = this.activeDeck;
                if (!deck) return 0;
                return deck.cards[cardId] ?? 0;
            };
        },
        
        // collection is always 3, but still shown for clarity
        collectionCount(): (cardId: string) => number {
            return (_cardId: string) => collectionCopiesPerCard;
        },
        
        // stats summary for active deck (weighted by counts)
        activeDeckStats(): { atk: number; def: number; spd: number; avgCost: number } {
            const deck = this.activeDeck; // <- NO lo pongas como any
            if (!deck) return { atk: 0, def: 0, spd: 0, avgCost: 0 };
            
            let atk = 0, def = 0, spd = 0, cost = 0, total = 0;
            
            for (const [cardId, count] of Object.entries(deck.cards) as [string, number][]) {
                const c = this.cards.find(x => x.id === cardId);
                if (!c) continue;
                
                atk += c.stats.atk * count;
                def += c.stats.def * count;
                spd += c.stats.spd * count;
                cost += c.cost * count;
                total += count;
            }
            
            const avgCost = total ? cost / total : 0;
            return { atk, def, spd, avgCost: Math.round(avgCost * 10) / 10 };
        }
    },
    
    actions: {
        openNewDeckModal() {
            this.newDeckModalOpen = true;
        },
        closeNewDeckModal() {
            this.newDeckModalOpen = false;
        },
        
        createDeck(name: string, description: string, coverArt: number) {
            const deck: DeckModel = {
                id: uid(),
                name: name.trim() || `Deck ${this.decks.length + 1}`,
                description: description.trim(),
                coverArt,
                cards: {},
                createdAt: Date.now(),
            };
            this.decks.unshift(deck);
            this.activeDeckId = deck.id;
            this.newDeckModalOpen = false;
        },
        
        deleteActiveDeck() {
            if (!this.activeDeckId) return;
            this.decks = this.decks.filter(d => d.id !== this.activeDeckId);
            this.activeDeckId = this.decks[0]?.id ?? "";
        },
        
        setActiveDeck(id: string) {
            this.activeDeckId = id;
        },
        
        openCardDetails(cardId: string) {
            this.openedCardId = cardId;
        },
        
        closeCardDetails() {
            this.openedCardId = "";
        },
        
        addToActiveDeck(cardId: string) {
            const deck = this.activeDeck;
            if (!deck) return;
            
            const current = deck.cards[cardId] ?? 0;
            // rule: max 2 copies per deck
            if (current >= 2) return;
            
            deck.cards[cardId] = current + 1;
        },
        
        removeFromActiveDeck(cardId: string) {
            const deck = this.activeDeck;
            if (!deck) return;
            
            const current = deck.cards[cardId] ?? 0;
            if (current <= 1) {
                delete deck.cards[cardId];
            } else {
                deck.cards[cardId] = current - 1;
            }
        },
        
        clearActiveDeck() {
            const deck = this.activeDeck;
            if (!deck) return;
            deck.cards = {};
        },
        
        setSearch(v: string) {
            this.search = v;
        },
        
        setTypeFilter(v: any) {
            this.typeFilter = v;
        },
        
        setSort(key: any) {
            if (this.sortKey === key) {
                this.sortDir = this.sortDir === "asc" ? "desc" : "asc";
            } else {
                this.sortKey = key;
                this.sortDir = "asc";
            }
        },
        
        setArtVariant(cardId: string, variant: number) {
            const c = this.cards.find(x => x.id === cardId);
            if (!c) return;
            c.artVariant = clamp(variant, 0, 3);
        },
    },
});