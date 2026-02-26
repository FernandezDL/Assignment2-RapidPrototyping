<template>
  <div class="app">
    <section class="main">
      <TopSearchBar v-model="searchQuery" placeholder="Search" @back="onBack" />

      <div class="contentScroll">
        <div class="grid">
          <div
            v-for="c in filteredCards"
            :key="c.id"
            class="draggableCard"
            draggable="true"
            @dragstart="onCardDragStart($event, c.id)"
          >
            <Card
              :name="c.name"
              :description="c.description"
              :stats="toStatsArray(c)"
              :image-src="c.image"
            />
          </div>
        </div>
      </div>
    </section>

    <!-- Sidebar -->
    <DeckSidebarOpen
      v-if="activeDeck"
      class="sidebar"
      :deck-name="activeDeck.name"
      :cards-count="activeDeck.cardIds.length"
      :max-cards="10"
      :deck-cards="deckCards"
      @close-deck="closeDeck"
      @rename-deck="renameDeck"
      @drop-card="addCardToActiveDeck"
    />

    <DeckSidebarList
      v-else-if="decks.length > 0"
      class="sidebar"
      :decks="decks"
      @add-deck="onAddDeck"
      @select-deck="selectDeck"
    />

    <DeckSidebar
      v-else
      class="sidebar"
      @add-deck="onAddDeck"
    />

    <!-- Modal create deck -->
    <NewDeckModal
      :open="isNewDeckOpen"
      v-model:name="newDeckName"
      v-model:description="newDeckDesc"
      @close="closeNewDeck"
      @create="createDeck"
    />
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from "vue";

import TopSearchBar from "@/components/TopSearchBar.vue";
import DeckSidebar from "@/components/DeckSidebar.vue";
import DeckSidebarOpen from "@/components/DeckSidebarOpen.vue";
import DeckSidebarList from "@/components/DeckSidebarList.vue";
import Card from "@/components/Card.vue";
import NewDeckModal from "@/components/NewDeckModal.vue";

import starterCardsRaw from "@/data/starterCards.json";
import type { Card as CardType } from "@/types/card";

type Deck = {
  id: string;
  name: string;
  description: string;
  artId: string;
  cardIds: string[];
};

const MAX_DECK_CARDS = 10;

/* -----------------------------
   Cards + search
------------------------------ */
const searchQuery = ref("");
const cards = ref<CardType[]>([]);

onMounted(() => {
  cards.value = starterCardsRaw as CardType[];
});

const filteredCards = computed(() => {
  const q = searchQuery.value.trim().toLowerCase();

  const inDeck = new Set(activeDeck.value?.cardIds ?? []);

  return cards.value
    // hide cards
    .filter((c) => !inDeck.has(c.id))
    // apply search
    .filter((c) => {
      if (!q) return true;
      return (
        c.name.toLowerCase().includes(q) ||
        c.description.toLowerCase().includes(q)
      );
    });
});

function toStatsArray(c: CardType) {
  return [`ATK ${c.stats.attack}`, `DEF ${c.stats.defense}`, `SPD ${c.stats.speed}`];
}

function onBack() {
  window.history.back();
}

/* -----------------------------
   Decks state
------------------------------ */
const decks = ref<Deck[]>([]);
const activeDeck = ref<Deck | null>(null);

function selectDeck(deckId: string) {
  activeDeck.value = decks.value.find((d) => d.id === deckId) ?? null;
}

function closeDeck() {
  activeDeck.value = null;
}

function renameDeck(newName: string) {
  if (!activeDeck.value) return;

  const trimmed = newName.trim();
  if (!trimmed) return;

  activeDeck.value = { ...activeDeck.value, name: trimmed };

  decks.value = decks.value.map((d) =>
    d.id === activeDeck.value!.id ? { ...d, name: trimmed } : d
  );
}

/* -----------------------------
   New deck modal
------------------------------ */
const isNewDeckOpen = ref(false);
const newDeckName = ref("");
const newDeckDesc = ref("");

function onAddDeck() {
  isNewDeckOpen.value = true;
}

function closeNewDeck() {
  isNewDeckOpen.value = false;
  newDeckName.value = "";
  newDeckDesc.value = "";
}

function createDeck(payload: { name: string; description: string; artId: string }) {
  const deck: Deck = {
    id: crypto.randomUUID(),
    name: payload.name,
    description: payload.description,
    artId: payload.artId,
    cardIds: []
  };

  decks.value = [deck, ...decks.value];
  activeDeck.value = deck;             

  closeNewDeck();
}

/* -----------------------------
   Drag & Drop
------------------------------ */
function onCardDragStart(e: DragEvent, cardId: string) {
  if (!e.dataTransfer) return;

  e.dataTransfer.effectAllowed = "copy";
  e.dataTransfer.setData("text/plain", cardId);
  e.dataTransfer.setData("application/x-card-id", cardId);
}

function addCardToActiveDeck(cardId: string) {
  if (!activeDeck.value) return;

  if (activeDeck.value.cardIds.length >= MAX_DECK_CARDS) return;

  if (activeDeck.value.cardIds.includes(cardId)) return;

  const updated: Deck = {
    ...activeDeck.value,
    cardIds: [...activeDeck.value.cardIds, cardId]
  };

  activeDeck.value = updated;

  decks.value = decks.value.map((d) => (d.id === updated.id ? updated : d));
}

/* -----------------------------
   Deck cards previews (para MiniCard)
------------------------------ */
const deckCards = computed(() => {
  if (!activeDeck.value) return [];

  const map = new Map(cards.value.map((c) => [c.id, c]));

  return activeDeck.value.cardIds
    .map((id) => map.get(id))
    .filter(Boolean)
    .map((c) => ({ id: c!.id, name: c!.name }));
});
</script>

<style scoped>
.app {
  height: 100vh;
  display: grid;
  grid-template-columns: 1fr 340px;
  gap: 18px;
  padding: 18px;
  max-width: 1320px;
  margin: 0 auto;
  position: relative;
}

.app::before {
  content: "";
  position: absolute;
  inset: -40px;
  pointer-events: none;
  background:
    radial-gradient(900px 500px at 20% 10%, rgba(255, 255, 255, 0.08), transparent 60%),
    radial-gradient(900px 500px at 80% 20%, rgba(255, 255, 255, 0.06), transparent 62%);
  filter: blur(2px);
}

.main {
  min-width: 0;
  height: 96vh;
  border-radius: var(--r-lg);
  padding: 12px;
  background: var(--panel);
  border: 1px solid var(--stroke);
  backdrop-filter: blur(14px);
  -webkit-backdrop-filter: blur(14px);
  box-shadow: var(--shadow-1);
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
}

.contentScroll {
  margin-top: 12px;
  background: rgba(255, 255, 255, 0.08);
  border: 1px solid var(--stroke);
  border-radius: var(--r-md);
  padding: 14px;
  box-sizing: border-box;
  box-shadow: inset 0 1px 0 rgba(255,255,255,0.10);

  flex: 1;
  min-height: 0;
  overflow-y: auto;
  overflow-x: hidden;
}

.grid {
  display: grid;
  gap: 16px;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  align-items: start;
}

.sidebar {
  height: calc(100vh - 36px);
}

.draggableCard {
  cursor: grab;
  transition: transform 140ms ease;
}
.draggableCard:active {
  cursor: grabbing;
}

.draggableCard:hover {
  transform: translateY(-2px);
}

@media (max-width: 980px) {
  .app {
    grid-template-columns: 1fr;
    padding: 14px;
  }

  .sidebar {
    height: auto;
  }
}
</style>