<script setup lang="ts">
import { computed } from "vue";
import { useRouter } from "vue-router";
import { useWizardStore } from "../stores/wizard";
import { CORE_TARGET } from "../stores/data";

const store = useWizardStore();
const router = useRouter();

const canContinue = computed(() => store.core.length === CORE_TARGET);

function next(){ router.push("/wizard/fill"); }
function back(){ router.push("/wizard/strategy"); }
</script>

<template>
    <div class="screen">
        <div class="header">
            <button class="btn" @click="back">← Back</button>
            <div>
                <div class="h2">Step 3 — Pick Core Cards</div>
                <div class="muted">Pick {{ CORE_TARGET }} core cards (recommended first).</div>
            </div>
            <button class="btnPrimary" @click="next" :disabled="!canContinue">Continue →</button>
        </div>
        
        <div class="panelInner">
            <div class="label">Recommended</div>
            <div class="list">
                <button
                    v-for="c in store.recommendedCards"
                    :key="c.id"
                    class="item"
                    :class="{ active: store.core.includes(c.id) }"
                    @click="store.toggleCore(c.id)"
                >
                    <div class="name">{{ c.name }}</div>
                    <div class="meta">⚡ {{ c.cost }} • ⚔ {{ c.stats.atk }} • 🛡 {{ c.stats.def }} • 🏃 {{ c.stats.spd }}</div>
                </button>
            </div>
            
            <div class="hint">Engagement trick: “Core picks” feels like a mini-goal.</div>
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
.label{ font-size:12px; font-weight:900; color:rgba(255,255,255,0.7); margin-bottom:10px; }
.list{ display:grid; grid-template-columns: repeat(3, 1fr); gap:10px; }
.item{ text-align:left; border:1px solid var(--stroke); border-radius:14px; padding:10px; background:rgba(0,0,0,0.12); cursor:pointer; color:white; }
.item.active{ background:rgba(124,92,255,0.22); border-color:rgba(124,92,255,0.38); }
.name{ font-weight:900; }
.meta{ font-size:12px; color:rgba(255,255,255,0.65); margin-top:4px; }
.hint{ margin-top:10px; font-size:12px; color:rgba(255,255,255,0.6); }
@media (max-width: 980px){
    .header{ grid-template-columns: 1fr; }
    .list{ grid-template-columns: 1fr; }
}
</style>