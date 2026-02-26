<script setup lang="ts">
import { useRouter } from "vue-router";
import { useWizardStore } from "../stores/wizard";
import type { Strategy } from "../types";

const store = useWizardStore();
const router = useRouter();

function pick(s: Strategy) {
    store.setStrategy(s);
}

function next() {
    router.push("/wizard/core");
}
function back() {
    router.push("/wizard/decks");
}
</script>

<template>
    <div class="screen">
        <div class="header">
            <button class="btn" @click="back">← Back</button>
            <div>
                <div class="h2">Step 2 — Choose Strategy</div>
                <div class="muted">One choice that drives recommendations.</div>
            </div>
            <button class="btnPrimary" @click="next" :disabled="!store.activeDeck">Continue →</button>
        </div>
        
        <div class="grid3">
            <button class="card" :class="{ active: store.strategy === 'Aggro' }" @click="pick('Aggro')">
                <div class="title">🔥 Aggro</div>
                <div class="muted">High ATK + SPD, low cost.</div>
            </button>
            
            <button class="card" :class="{ active: store.strategy === 'Control' }" @click="pick('Control')">
                <div class="title">🧊 Control</div>
                <div class="muted">High DEF, safer tempo.</div>
            </button>
            
            <button class="card" :class="{ active: store.strategy === 'Balanced' }" @click="pick('Balanced')">
                <div class="title">⚖ Balanced</div>
                <div class="muted">Even distribution.</div>
            </button>
        </div>
        
        <div class="panelInner">
            <div class="label">Top recommendations (preview)</div>
            <div class="rec">
                <div v-for="c in store.recommendedCards" :key="c.id" class="mini">
                    <div class="miniName">{{ c.name }}</div>
                    <div class="miniMeta">⚡ {{ c.cost }} • ⚔ {{ c.stats.atk }} • 🛡 {{ c.stats.def }} • 🏃 {{ c.stats.spd }}</div>
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
.btn{
    padding:10px 12px; border-radius:12px; font-weight:900; cursor:pointer;
    border:1px solid var(--stroke); background:rgba(255,255,255,0.06); color:white;
}
.btnPrimary{
    padding:10px 12px; border-radius:12px; font-weight:900; cursor:pointer;
    border:1px solid rgba(124,92,255,0.35);
    background:rgba(124,92,255,0.25); color:white;
}
.grid3{ display:grid; grid-template-columns: repeat(3, 1fr); gap:12px; }
.card{
    text-align:left; border-radius:16px; padding:14px; cursor:pointer;
    border:1px solid var(--stroke); background:rgba(255,255,255,0.06); color:white;
}
.card.active{ background:rgba(124,92,255,0.22); border-color:rgba(124,92,255,0.38); }
.title{ font-weight:900; font-size:16px; }
.panelInner{ border:1px solid var(--stroke); background:rgba(255,255,255,0.05); border-radius:16px; padding:12px; }
.label{ font-size:12px; font-weight:900; color:rgba(255,255,255,0.7); margin-bottom:10px; }
.rec{ display:grid; grid-template-columns: repeat(3, 1fr); gap:10px; }
.mini{ border:1px solid var(--stroke); border-radius:14px; padding:10px; background:rgba(0,0,0,0.12); }
.miniName{ font-weight:900; }
.miniMeta{ font-size:12px; color:rgba(255,255,255,0.65); margin-top:4px; }
@media (max-width: 980px){
    .header{ grid-template-columns: 1fr; }
    .grid3{ grid-template-columns: 1fr; }
    .rec{ grid-template-columns: 1fr; }
}
</style>