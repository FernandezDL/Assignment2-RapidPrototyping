<script setup lang="ts">
import { computed } from "vue";
import { useRouter } from "vue-router";
import { useWizardStore } from "../stores/wizard";
import { TARGET_DECK_SIZE } from "../stores/data";

const store = useWizardStore();
const router = useRouter();

const deck = computed(() => store.activeDeck);
const canContinue = computed(() => store.activeDeckTotal === TARGET_DECK_SIZE);

function next(){ router.push("/wizard/review"); }
function back(){ router.push("/wizard/core"); }
</script>

<template>
    <div class="screen">
        <div class="header">
            <button class="btn" @click="back">← Back</button>
            <div>
                <div class="h2">Step 4 — Fill the Deck</div>
                <div class="muted">Use quick fill, then tweak manually.</div>
            </div>
            <button class="btnPrimary" @click="next" :disabled="!canContinue">Continue →</button>
        </div>
        
        <div class="panelInner">
            <div class="row">
                <div class="pill">🧾 {{ store.activeDeckTotal }}/{{ TARGET_DECK_SIZE }}</div>
                <button class="btnPrimary" @click="store.quickFillFromRecommendations()" :disabled="!deck">
                    ⚡ Quick Fill
                </button>
            </div>
            
            <div class="list">
                <div v-for="c in store.cards" :key="c.id" class="line">
                    <div class="name">{{ c.name }}</div>
                    <div class="meta">⚡ {{ c.cost }} • ⚔ {{ c.stats.atk }} • 🛡 {{ c.stats.def }} • 🏃 {{ c.stats.spd }}</div>
                    
                    <div class="actions">
                        <button class="btn" @click="store.removeCard(c.id)">−</button>
                        <div class="count">{{ store.activeDeck?.cards[c.id] ?? 0 }}</div>
                        <button class="btn" @click="store.addCard(c.id)">＋</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
.screen{ padding:14px; display:grid; gap:14px; }
.header{ display:grid; grid-template-columns: 110px 1fr 140px; gap:12px; align-items:center; }
.h2{ font-weight:900; font-size:18px; }
.muted{ color:rgba(255,255,255,0.65); }
.btn{ padding:10px 12px; border-radius:12px; font-weight:900; cursor:pointer; border:1px solid var(--stroke); background:rgba(255,255,255,0.06); color:white; }
.btnPrimary{ padding:10px 12px; border-radius:12px; font-weight:900; cursor:pointer; border:1px solid rgba(124,92,255,0.35); background:rgba(124,92,255,0.25); color:white; }
.btnPrimary:disabled{ opacity:.45; cursor:not-allowed; }
.panelInner{ border:1px solid var(--stroke); background:rgba(255,255,255,0.05); border-radius:16px; padding:12px; }
.row{ display:flex; justify-content:space-between; align-items:center; gap:10px; margin-bottom:12px; }
.pill{ border:1px solid var(--stroke); border-radius:999px; padding:7px 10px; font-size:12px; background:rgba(0,0,0,0.15); }
.list{ display:grid; gap:10px; }
.line{ display:grid; grid-template-columns: 1fr 2fr 140px; gap:10px; align-items:center; border:1px solid var(--stroke); border-radius:14px; padding:10px; background:rgba(0,0,0,0.12); }
.name{ font-weight:900; }
.meta{ color:rgba(255,255,255,0.65); font-size:12px; }
.actions{ display:flex; justify-content:flex-end; align-items:center; gap:8px; }
.count{ width:28px; text-align:center; font-weight:900; }
@media (max-width: 980px){
    .header{ grid-template-columns: 1fr; }
    .line{ grid-template-columns: 1fr; }
    .actions{ justify-content:flex-start; }
}
</style>