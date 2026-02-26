<script setup lang="ts">
import { computed } from "vue";
import type { CardModel } from "../types";
import { useDeckStore } from "../stores/decks";

const props = defineProps<{ card: CardModel }>();
const store = useDeckStore();

const inDeck = computed(() => store.countInActiveDeck(props.card.id));
const canAdd = computed(() => !!store.activeDeck && inDeck.value < 2);

const typeBadge = computed(() => {
    const map: Record<CardModel["type"], string> = {
        Beast: "🐾 Beast",
        Mage: "🪄 Mage",
        Tech: "⚙ Tech",
        Nature: "🌿 Nature",
    };
    return map[props.card.type];
});

const artBg = computed(() => {
    const v = props.card.artVariant;
    const grads = [
        "linear-gradient(135deg, rgba(124,92,255,.45), rgba(255,255,255,.05))",
        "linear-gradient(135deg, rgba(66,211,146,.45), rgba(255,255,255,.05))",
        "linear-gradient(135deg, rgba(255,196,92,.40), rgba(255,255,255,.05))",
        "linear-gradient(135deg, rgba(255,92,119,.40), rgba(255,255,255,.05))",
    ];
    return grads[v] ?? grads[0];
});
</script>

<template>
    <div
        class="panel"
        style="padding: 12px; border-radius: 16px;"
    >
        <!-- ART (simple, high-contrast) -->
        <div
            :style="{
        height: '110px',
        borderRadius: '14px',
        border: '1px solid var(--stroke)',
        background: artBg,
        display: 'flex',
        alignItems: 'flex-end',
        justifyContent: 'space-between',
        padding: '10px',
      }"
        >
      <span class="pill" style="background:rgba(0,0,0,0.25); color:rgba(255,255,255,0.85);">
        {{ typeBadge }}
      </span>
            
            <span class="pill" style="background:rgba(0,0,0,0.25); color:rgba(255,255,255,0.85);">
        ⚡ {{ card.cost }}
      </span>
        </div>
        
        <!-- TITLE + COUNTS -->
        <div style="margin-top:10px; display:flex; align-items:flex-start; justify-content:space-between; gap:8px;">
            <div>
                <div style="font-weight:800; font-size:14px; line-height:1.2;">
                    {{ card.name }}
                </div>
                <div style="color:var(--muted); font-size:12px; margin-top:2px;">
                    Collection: x{{ store.collectionCount(card.id) }}
                    <span v-if="store.activeDeck"> • In deck: x{{ inDeck }}</span>
                </div>
            </div>
            
            <button class="btn" style="padding:8px 10px;" @click="store.openCardDetails(card.id)">
                Details
            </button>
        </div>
        
        <!-- STATS (icons) -->
        <div style="margin-top:10px; display:flex; gap:8px; flex-wrap:wrap;">
            <span class="pill">⚔ {{ card.stats.atk }}</span>
            <span class="pill">🛡 {{ card.stats.def }}</span>
            <span class="pill">🏃 {{ card.stats.spd }}</span>
        </div>
        
        <!-- ACTIONS -->
        <div style="margin-top:12px; display:flex; gap:10px;">
            <button class="btn btnPrimary" style="flex:1;" :disabled="!canAdd" @click="store.addToActiveDeck(card.id)">
                + Add
            </button>
            <button class="btn" style="flex:1;" :disabled="!store.activeDeck || inDeck === 0" @click="store.removeFromActiveDeck(card.id)">
                − Remove
            </button>
        </div>
        
        <div v-if="store.activeDeck && inDeck >= 2" style="margin-top:8px; color:rgba(255,255,255,0.70); font-size:12px;">
            ✅ Max copies reached (2/2) for this deck
        </div>
        
        <div v-if="!store.activeDeck" style="margin-top:8px; color:rgba(255,255,255,0.70); font-size:12px;">
            Select or create a deck to add cards
        </div>
    </div>
</template>