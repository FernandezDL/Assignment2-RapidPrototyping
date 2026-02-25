<template>
  <div class="app">
    <!-- Columna izquierda (topbar + contenido scrolleable) -->
    <section class="main">
      <TopSearchBar v-model="searchQuery" placeholder="Search" @back="onBack" />

      <!-- Área scrolleable con la grilla -->
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

    <!-- Sidebar derecha: 3 estados -->
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

    <!-- Modal: crear deck -->
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

  // ids del deck activo (si no hay deck abierto, es vacío)
  const inDeck = new Set(activeDeck.value?.cardIds ?? []);

  return cards.value
    // 1) ocultar cartas que ya están en el deck activo
    .filter((c) => !inDeck.has(c.id))
    // 2) aplicar búsqueda
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

  // actualizar el activo
  activeDeck.value = { ...activeDeck.value, name: trimmed };

  // actualizar la lista
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

  decks.value = [deck, ...decks.value]; // aparece arriba en la lista
  activeDeck.value = deck;              // se abre automático

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

  // límite
  if (activeDeck.value.cardIds.length >= MAX_DECK_CARDS) return;

  // evitar duplicados (si querés permitir duplicados, borrá este if)
  if (activeDeck.value.cardIds.includes(cardId)) return;

  const updated: Deck = {
    ...activeDeck.value,
    cardIds: [...activeDeck.value.cardIds, cardId]
  };

  activeDeck.value = updated;

  // mantener sincronizada la lista de decks
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
  grid-template-columns: 1fr 320px;
  gap: 16px;
  padding: 14px;
  box-sizing: border-box;
  background: #ffffff;
}

.main {
  min-width: 0;
  background: #e5e5e5;
  border-radius: 18px;
  padding: 10px;
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
}

.contentScroll {
  margin-top: 10px;
  background: #cfcfcf;
  border-radius: 16px;
  padding: 12px;
  box-sizing: border-box;

  flex: 1;
  min-height: 0;
  overflow-y: auto;
  overflow-x: hidden;
}

.grid {
  display: grid;
  gap: 14px;
  grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
  align-items: start;
}

.sidebar {
  height: calc(100vh - 28px);
}

.draggableCard {
  cursor: grab;
}
.draggableCard:active {
  cursor: grabbing;
}
</style>