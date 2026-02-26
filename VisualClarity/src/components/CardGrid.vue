<script setup lang="ts">
import { useDeckStore } from "../stores/decks";
import CardTile from "./CardTile.vue";

const store = useDeckStore();
</script>

<template>
    <div style="display:flex; align-items:center; justify-content:space-between; margin-bottom:10px;">
        <div>
            <div style="font-weight:800; font-size:18px;">Card Collection</div>
            <div style="color:var(--muted); font-size:13px;">
                15 distinct cards • 3 copies each (shown as “x3”) • Decks don’t consume collection
            </div>
        </div>
        
        <div style="display:flex; gap:8px;">
            <button class="btn" @click="store.setSort('cost')">⚡ Cost</button>
            <button class="btn" @click="store.setSort('atk')">⚔ ATK</button>
            <button class="btn" @click="store.setSort('def')">🛡 DEF</button>
            <button class="btn" @click="store.setSort('spd')">🏃 SPD</button>
        </div>
    </div>
    
    <div class="gridCards">
        <CardTile v-for="c in store.filteredCards" :key="c.id" :card="c" />
    </div>
</template>