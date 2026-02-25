export type CardStatKey = "attack" | "defense" | "speed" | "magic" | "health" | "luck";

export type CardStats = Record<CardStatKey, number>;

export type Card = {
  id: string;          // único
  name: string;        // distinto por carta
  description: string;
  cost: number;        // energía / mana
  stats: CardStats;    // 3+ stats con números
  tags?: string[];     // opcional (e.g. "warrior", "spell")
  image?: string;      // opcional
};