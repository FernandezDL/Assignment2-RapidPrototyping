<script setup lang="ts">
import { computed } from "vue";
import { useRouter } from "vue-router";
import { useWizardStore } from "../stores/wizard";
import { CORE_TARGET, TARGET_DECK_SIZE } from "../stores/data";

const store = useWizardStore();
const router = useRouter();

const deck = computed(() => store.activeDeck);
</script>

<template>
    <div class="sideWrap">
        <div class="sideTitle">Focus Panel</div>
        
        <div class="cardBox">
            <div class="label">Current step goal</div>
            <div class="goal" v-if="deck">
                <div class="pill">🎯 Core: {{ store.core.length }}/{{ CORE_TARGET }}</div>
                <div class="pill">🧾 Deck: {{ store.activeDeckTotal }}/{{ TARGET_DECK_SIZE }}</div>
                <div class="pill">🧠 Strategy: {{ store.strategy }}</div>
            </div>
            <div v-else class="muted">Create/select a deck to begin.</div>
        </div>
        
        <div class="cardBox">
            <div class="label">Warnings</div>
            <div v-if="store.warnings.length === 0" class="muted">No warnings.</div>
            <ul v-else class="warn">
                <li v-for="w in store.warnings" :key="w">{{ w }}</li>
            </ul>
        </div>
        
        <div class="cardBox">
            <div class="label">Quick actions</div>
            <div class="btnRow">
                <button class="btn" @click="store.resetWizardForDeck()" :disabled="!deck">Reset</button>
                <button class="btnPrimary" @click="router.push('/wizard/review')" :disabled="!deck">Go Review</button>
            </div>
        </div>
    </div>
</template>

<style scoped>
.sideWrap{ padding:14px; display:grid; gap:12px; }
.sideTitle{ font-weight:900; font-size:16px; }
.cardBox{
    border:1px solid var(--stroke);
    background:rgba(255,255,255,0.05);
    border-radius:16px;
    padding:12px;
}
.label{ font-size:12px; color:rgba(255,255,255,0.65); font-weight:800; margin-bottom:8px; }
.muted{ color:rgba(255,255,255,0.65); font-size:13px; }
.goal{ display:flex; gap:8px; flex-wrap:wrap; }
.pill{
    border:1px solid grey;
    border-radius:999px;
    padding:7px 10px;
    font-size:12px;
    color:rgba(255,255,255,0.85);
    background:rgba(0,0,0,0.15);
}
.warn{ margin:0; padding-left:18px; color:rgba(255,255,255,0.80); font-size:13px; }
.btnRow{ display:flex; gap:10px; }
.btn, .btnPrimary{
    flex:1;
    padding:10px 12px;
    border-radius:12px;
    font-weight:900;
    cursor:pointer;
    border:1px solid grey;
}
.btn{ background:rgba(255,255,255,0.06); color:rgba(255,255,255,0.9); }
.btnPrimary{ background:rgba(124,92,255,0.25); border-color:rgba(124,92,255,0.35); color:white; }
.btn:disabled,.btnPrimary:disabled{ opacity:.45; cursor:not-allowed; }
</style>