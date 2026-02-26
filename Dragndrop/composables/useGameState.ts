import { ref } from "vue";
import type { Card } from "@/types/card";
import starterCardsRaw from "../data/starterCards.json";

function assertCards(cards: unknown): Card[] {
  // Cast simple + validación mínima
  const arr = cards as Card[];
  if (!Array.isArray(arr)) throw new Error("starterCards.json no es un array");

  const nameSet = new Set<string>();
  for (const c of arr) {
    if (!c.id || !c.name) throw new Error("Carta sin id o name");
    if (nameSet.has(c.name)) throw new Error(`Nombre repetido: ${c.name}`);
    nameSet.add(c.name);

    const stats = c.stats as Record<string, number>;
    const statCount = Object.entries(stats ?? {}).filter(([, v]) => typeof v === "number").length;
    if (statCount < 3) throw new Error(`La carta ${c.name} tiene menos de 3 stats`);
  }

  if (arr.length < 15) throw new Error("Debe haber al menos 15 cartas base");
  return arr;
}

const starterCards = assertCards(starterCardsRaw);

export function useGameState() {
  const collection = ref<Card[]>([]);
  const deck = ref<Card[]>([]);

  function initNewGame() {
    // colección inicial = starter cards
    collection.value = [...starterCards];

    // deck inicial (opcional): las primeras 10, o vacío
    deck.value = starterCards.slice(0, 10);
  }

  return {
    collection,
    deck,
    initNewGame,
  };
}