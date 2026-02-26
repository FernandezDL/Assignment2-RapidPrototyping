<script setup lang="ts">
import { computed } from "vue";
import { useRouter } from "vue-router";
import { useWizardStore } from "../stores/wizard";

const store = useWizardStore();
const router = useRouter();
const deck = computed(() => store.activeDeck);

function back(){ router.push("/wizard/fill"); }
function finish(){
    router.push("/wizard/decks");
}
</script>

<template>
    <div class="screen">
        <div class="header">
            <button class="btn" @click="back">← Back</button>
            <div>
                <div class="h2">Step 5 — Review & Save</div>
                <div class="muted">Single confirm step: check warnings, then finish.</div>
            </div>
            <button class="btnPrimary" @click="finish" :disabled="!deck">Save ✓</button>
        </div>
        
        <div class="panelInner" v-if="deck">
            <div class="name">{{ deck.name }}</div>
            <div class="muted">{{ deck.description || "No description" }}</div>
            
            <div class="hr"></div>
            
            <div class="label">Cards in deck</div>
            <div class="chips">
                <div v-for="[id,count] in Object.entries(deck.cards)" :key="id" class="chip">
                    {{ store.cards.find(c=>c.id===id)?.name ?? id }} ×{{ count }}
                </div>
            </div>
            
            <div class="hr"></div>
            
            <div class="label">Warnings</div>
            <ul v-if="store.warnings.length" class="warn">
                <li v-for="w in store.warnings" :key="w">{{ w }}</li>
            </ul>
            <div v-else class="ok">✅ Looks good!</div>
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
.panelInner{ border:1px solid var(--stroke); background:rgba(255,255,255,0.05); border-radius:16px; padding:12px; }
.hr{ height:1px; background:var(--stroke); margin:12px 0; }
.label{ font-size:12px; font-weight:900; color:rgba(255,255,255,0.7); margin-bottom:10px; }
.name{ font-weight:900; font-size:16px; }
.chips{ display:flex; gap:8px; flex-wrap:wrap; }
.chip{ border:1px solid var(--stroke); border-radius:999px; padding:7px 10px; font-size:12px; background:rgba(0,0,0,0.15); }
.warn{ margin:0; padding-left:18px; color:rgba(255,255,255,0.80); }
.ok{ color:rgba(255,255,255,0.85); font-weight:900; }
@media (max-width: 980px){ .header{ grid-template-columns: 1fr; } }
</style>