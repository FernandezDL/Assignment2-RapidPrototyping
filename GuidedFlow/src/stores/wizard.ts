import { defineStore } from "pinia";
import type { CardModel, DeckModel, Strategy } from "../types";
import { starterCards, MAX_COPIES_IN_DECK, TARGET_DECK_SIZE, CORE_TARGET } from "./data";

const uid = () => Math.random().toString(36).slice(2, 10);

function deckTotal(deck: DeckModel) {
    return Object.values(deck.cards).reduce((a,b)=>a+b,0);
}

export const useWizardStore = defineStore("wizard", {
    state: () => ({
        cards: starterCards as CardModel[],
        decks: [] as DeckModel[],
        activeDeckId: "" as string,
        
        strategy: "Balanced" as Strategy,
        core: [] as string[], // cardIds 
        search: "" as string,
    }),
    
    getters: {
        activeDeck(state): DeckModel | null {
            return state.decks.find(d => d.id === state.activeDeckId) ?? null;
        },
        activeDeckTotal(): number {
            const d = this.activeDeck;
            return d ? deckTotal(d) : 0;
        },
        
        recommendedCards(): CardModel[] {
            const score = (c: CardModel) => {
                if (this.strategy === "Aggro") return c.stats.atk * 2 + c.stats.spd - c.cost;
                if (this.strategy === "Control") return c.stats.def * 2 + (10 - c.cost) + (c.stats.spd * 0.2);
                return (c.stats.atk + c.stats.def + c.stats.spd) - c.cost;
            };
            return this.cards.slice().sort((a,b)=>score(b)-score(a)).slice(0, 6);
        },
        warnings(): string[] {
            const d = this.activeDeck;
            if (!d) return ["No deck selected."];
            const warnings: string[] = [];
            if (deckTotal(d) < TARGET_DECK_SIZE) warnings.push(`Deck is not full (${deckTotal(d)}/${TARGET_DECK_SIZE}).`);
            if (this.core.length < CORE_TARGET) warnings.push(`Core picks missing (${this.core.length}/${CORE_TARGET}).`);
            return warnings;
        }
    },
    
    actions: {
        createDeck(name: string, description: string) {
            const deck: DeckModel = {
                id: uid(),
                name: name.trim() || `Deck ${this.decks.length + 1}`,
                description: description.trim(),
                cards: {},
                createdAt: Date.now()
            };
            this.decks.unshift(deck);
            this.activeDeckId = deck.id;
            this.core = [];
        },
        
        setActiveDeck(id: string) {
            this.activeDeckId = id;
            this.core = [];
        },
        
        setStrategy(s: Strategy) {
            this.strategy = s;
            this.core = [];
        },
        
        toggleCore(cardId: string) {
            if (this.core.includes(cardId)) {
                this.core = this.core.filter(x => x !== cardId);
                return;
            }
            if (this.core.length >= CORE_TARGET) return;
            this.core.push(cardId);
        },
        
        addCard(cardId: string) {
            const d = this.activeDeck;
            if (!d) return;
            
            const current = d.cards[cardId] ?? 0;
            if (current >= MAX_COPIES_IN_DECK) return;
            if (deckTotal(d) >= TARGET_DECK_SIZE) return;
            
            d.cards[cardId] = current + 1;
        },
        
        removeCard(cardId: string) {
            const d = this.activeDeck;
            if (!d) return;
            
            const current = d.cards[cardId] ?? 0;
            if (current <= 1) delete d.cards[cardId];
            else d.cards[cardId] = current - 1;
        },
        
        quickFillFromRecommendations() {
            const d = this.activeDeck;
            if (!d) return;
            
            for (const id of this.core) {
                if (deckTotal(d) >= TARGET_DECK_SIZE) break;
                this.addCard(id);
            }
            
            for (const c of this.recommendedCards) {
                while ((d.cards[c.id] ?? 0) < 2 && deckTotal(d) < TARGET_DECK_SIZE) {
                    this.addCard(c.id);
                }
                if (deckTotal(d) >= TARGET_DECK_SIZE) break;
            }
        },
        
        resetWizardForDeck() {
            const d = this.activeDeck;
            if (!d) return;
            d.cards = {};
            this.core = [];
            this.strategy = "Balanced";
        }
    }
});