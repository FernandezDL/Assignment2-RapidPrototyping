<template>
  <div class="app">
    <!-- Columna izquierda (topbar + contenido scrolleable) -->
    <section class="main">
      <TopSearchBar v-model="searchQuery" placeholder="Search" @back="onBack" />

      <!-- Aquí va el área scrolleable con la grilla -->
      <div class="contentScroll">
        <!-- (Opcional) chips de filtros como en la foto -->
        <div class="chips">
          <button class="chip" v-for="chip in mockChips" :key="chip" type="button">
            <span class="chip__x" aria-hidden="true">×</span>
            {{ chip }}
          </button>
        </div>

        <div class="grid">
          <Card
            v-for="c in filteredCards"
            :key="c.id"
            :name="c.name"
            :description="c.description"
            :stats="toStatsArray(c)"
            :image-src="c.image"
          />
        </div>
      </div>
    </section>

    <!-- Sidebar derecha -->
    <DeckSidebar class="sidebar" @add-deck="onAddDeck" />
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from "vue";

import TopSearchBar from "@/components/TopSearchBar.vue";
import DeckSidebar from "@/components/DeckSidebar.vue";
import Card from "@/components/Card.vue";

import starterCardsRaw from "@/data/starterCards.json";
import type { Card as CardType } from "@/types/card";

const searchQuery = ref("");
const cards = ref<CardType[]>([]);

onMounted(() => {
  cards.value = starterCardsRaw as CardType[];
});

const filteredCards = computed(() => {
  const q = searchQuery.value.trim().toLowerCase();
  if (!q) return cards.value;

  return cards.value.filter((c) => {
    return (
      c.name.toLowerCase().includes(q) ||
      c.description.toLowerCase().includes(q)
    );
  });
});

function toStatsArray(c: CardType) {
  // 3 stats como pide la tarea (podés cambiar los que querás mostrar)
  return [`ATK ${c.stats.attack}`, `DEF ${c.stats.defense}`, `SPD ${c.stats.speed}`];
}

const mockChips = ["Filter name", "Filter name", "Filter name", "Filter name"];

function onBack() {
  window.history.back();
}

function onAddDeck() {
  console.log("Add deck");
}
</script>

<style scoped>
/* Layout general: izquierda (contenido) + derecha (sidebar) */
.app {
  height: 100vh;
  display: grid;
  grid-template-columns: 1fr 320px; /* sidebar fijo */
  gap: 16px;
  padding: 14px;
  box-sizing: border-box;
  background: #ffffff;
}

/* Columna izquierda */
.main {
  min-width: 0; /* importante para que la grid no haga overflow horizontal raro */
  background: #e5e5e5;
  border-radius: 18px;
  padding: 10px;
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
}

/* Área que hace scroll vertical */
.contentScroll {
  margin-top: 10px;
  background: #cfcfcf;
  border-radius: 16px;
  padding: 12px;
  box-sizing: border-box;

  flex: 1;             /* ocupa el alto restante */
  min-height: 0;       /* CLAVE para que el overflow funcione en flex */
  overflow-y: auto;    /* scroll vertical */
  overflow-x: hidden;
}

/* Chips (opcionales, como tu mock) */
.chips {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-bottom: 12px;
}

.chip {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  border: none;
  background: #8f8f8f;
  color: #111;
  padding: 6px 10px;
  border-radius: 999px;
  font-size: 12px;
  cursor: pointer;
}

.chip__x {
  width: 16px;
  height: 16px;
  border-radius: 999px;
  display: grid;
  place-items: center;
  background: rgba(255, 255, 255, 0.45);
  font-weight: 700;
}

/* Grilla de cartas */
.grid {
  display: grid;
  gap: 14px;

  /* Responsive: se acomodan como en el mock */
  grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
  align-items: start;
}

/* Sidebar a la derecha */
.sidebar {
  height: calc(100vh - 28px); /* para que se alinee con padding del contenedor */
}
</style>