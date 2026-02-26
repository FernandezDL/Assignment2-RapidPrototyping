<script setup lang="ts">
import type { CardModel } from "../types";
import { computed } from "vue";
import { useDeckStore } from "../stores/decks";

const props = defineProps<{ card: CardModel }>();
const store = useDeckStore();

const inDeck = computed(() => store.countInActiveDeck(props.card.id));

const arts = [
    "linear-gradient(135deg, rgba(124,92,255,.55), rgba(255,255,255,.06))",
    "linear-gradient(135deg, rgba(66,211,146,.55), rgba(255,255,255,.06))",
    "linear-gradient(135deg, rgba(255,196,92,.50), rgba(255,255,255,.06))",
    "linear-gradient(135deg, rgba(255,92,119,.50), rgba(255,255,255,.06))",
];

function setVariant(v: number) {
    store.setArtVariant(props.card.id, v);
}
</script>

<template>
    <div class="modalOverlay" @click.self="store.closeCardDetails()">
        <div class="modal">
            <div class="modalHeader">
                <div>
                    <div style="font-weight:900;">{{ card.name }}</div>
                    <div style="color:var(--muted); font-size:12px;">
                        {{ card.type }} • Cost ⚡ {{ card.cost }} • In deck x{{ inDeck }}
                    </div>
                </div>
                <button class="btn" @click="store.closeCardDetails()">✕</button>
            </div>
            
            <div class="modalBody" style="grid-template-columns: 1fr 1fr; gap:14px;">
                <div class="panel" style="padding:14px; border-radius:16px;">
                    <div
                        :style="{
              height:'220px',
              borderRadius:'16px',
              border:'1px solid var(--stroke)',
              background: arts[card.artVariant],
            }"
                    />
                    <div style="margin-top:10px; display:flex; gap:10px;">
                        <button class="btn" v-for="i in 4" :key="i" @click="setVariant(i-1)">
                            Art {{ i }}
                        </button>
                    </div>
                </div>
                
                <div class="panel" style="padding:14px; border-radius:16px;">
                    <div style="font-weight:900;">Card info</div>
                    <div style="color:var(--muted); margin-top:6px;">{{ card.description }}</div>
                    
                    <div style="margin-top:12px; display:flex; gap:8px; flex-wrap:wrap;">
                        <span class="pill">⚔ ATK {{ card.stats.atk }}</span>
                        <span class="pill">🛡 DEF {{ card.stats.def }}</span>
                        <span class="pill">🏃 SPD {{ card.stats.spd }}</span>
                    </div>
                    
                    <div style="display:flex; gap:10px; margin-top:14px;">
                        <button class="btn btnPrimary" style="flex:1;" :disabled="!store.activeDeck || inDeck >= 2" @click="store.addToActiveDeck(card.id)">
                            + Add to deck
                        </button>
                        <button class="btn" style="flex:1;" :disabled="!store.activeDeck || inDeck === 0" @click="store.removeFromActiveDeck(card.id)">
                            − Remove
                        </button>
                    </div>
                    
                    <div style="margin-top:10px; color:var(--muted); font-size:12px;">
                        Clarity choice: minimal on-card info; full detail lives here.
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>