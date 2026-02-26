<script setup lang="ts">
import { computed } from "vue";
import { useDeckStore } from "../stores/decks";

const store = useDeckStore();

const typeOptions = ["All", "Beast", "Mage", "Tech", "Nature"] as const;

const sortLabel = computed(() => {
    const arrow = store.sortDir === "asc" ? "↑" : "↓";
    return `${store.sortKey.toUpperCase()} ${arrow}`;
});
</script>

<template>
    <div style="padding: 12px; display:flex; gap:10px; align-items:center;">
        <button class="btn" title="Back">←</button>
        
        <input
            class="input"
            style="flex:1;"
            placeholder="Search cards by name..."
            :value="store.search"
            @input="store.setSearch(($event.target as HTMLInputElement).value)"
        />
        
        <select class="select" style="width: 140px;" :value="store.typeFilter" @change="store.setTypeFilter(($event.target as HTMLSelectElement).value)">
            <option v-for="t in typeOptions" :key="t" :value="t">{{ t }}</option>
        </select>
        
        <button class="btn" @click="store.setSort('name')">{{ sortLabel }}</button>
        
        <button class="btn btnPrimary" @click="store.openNewDeckModal()">＋ New Deck</button>
    </div>
    
    <div class="hr"></div>
    
    <div style="padding: 0 12px 12px; display:flex; gap:10px; flex-wrap:wrap;">
        <span class="pill">🧠 Prototype 2: Clarity</span>
        <span class="pill">🧩 Hover/click for details</span>
        <span class="pill">📌 Max 2 copies per deck</span>
    </div>
</template>