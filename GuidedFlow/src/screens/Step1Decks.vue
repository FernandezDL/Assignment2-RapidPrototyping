<script setup lang="ts">
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useWizardStore } from "../stores/wizard";

const store = useWizardStore();
const router = useRouter();

const name = ref("");
const desc = ref("");

function next() {
    if (!store.activeDeck) return;
    router.push("/wizard/strategy");
}
</script>

<template>
    <div class="screen">
        <div class="header">
            <div>
                <div class="h2">Step 1 — Select / Create Deck</div>
                <div class="muted">Single decision: pick a deck to work on.</div>
            </div>
            <button class="btnPrimary" @click="next" :disabled="!store.activeDeck">Continue →</button>
        </div>
        
        <div class="grid2">
            <div class="panelInner">
                <div class="label">Your decks</div>
                <div v-if="store.decks.length === 0" class="muted">No decks yet.</div>
                <div class="deckList">
                    <button
                        v-for="d in store.decks"
                        :key="d.id"
                        class="deckBtn"
                        :class="{ active: d.id === store.activeDeckId }"
                        @click="store.setActiveDeck(d.id)"
                    >
                        <div class="deckName">{{ d.name }}</div>
                        <div class="mutedSmall">{{ Object.values(d.cards).reduce((a,b)=>a+b,0) }} cards</div>
                    </button>
                </div>
            </div>
            
            <div class="panelInner">
                <div class="label">Create new deck</div>
                <input class="input" v-model="name" placeholder="Deck name" />
                <textarea class="textarea" v-model="desc" placeholder="Short description (mock)"></textarea>
                <button class="btnPrimary" @click="store.createDeck(name, desc)">＋ Create</button>
                
                <div class="hint">
                    Clarity trick: user only chooses “a deck” here — no cards yet.
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
.screen{ padding:14px; display:grid; gap:14px; }
.header{ display:flex; justify-content:space-between; align-items:flex-start; gap:12px; }
.h2{ font-weight:900; font-size:18px; }
.muted{ color:rgba(255,255,255,0.65); }
.grid2{ display:grid; grid-template-columns: 1fr 1fr; gap:12px; }
.panelInner{ border:1px solid var(--stroke); background:rgba(255,255,255,0.05); border-radius:16px; padding:12px; display:grid; gap:10px; }
.label{ font-size:12px; font-weight:900; color:rgba(255,255,255,0.7); }
.deckList{ display:grid; gap:10px; }
.deckBtn{ text-align:left; border-radius:14px; border:1px solid var(--stroke); background:rgba(255,255,255,0.06); padding:10px; cursor:pointer; }
.deckBtn.active{ background:rgba(124,92,255,0.22); border-color:rgba(124,92,255,0.38); }
.deckName{ font-weight:900; }
.mutedSmall{ font-size:12px; color:rgba(255,255,255,0.65); }
.input,.textarea{
    width:100%; border:1px solid var(--stroke); border-radius:12px;
    background:rgba(255,255,255,0.06); color:white; padding:10px 12px; outline:none;
}
.textarea{ min-height:90px; resize:vertical; }
.btnPrimary{
    padding:10px 12px; border-radius:12px; font-weight:900; cursor:pointer;
    border:1px solid rgba(124,92,255,0.35);
    background:rgba(124,92,255,0.25); color:white;
}
.btnPrimary:disabled{ opacity:.45; cursor:not-allowed; }
.hint{ margin-top:8px; font-size:12px; color:rgba(255,255,255,0.6); }
@media (max-width: 980px){ .grid2{ grid-template-columns: 1fr; } }
</style>