<script setup lang="ts">
import { computed } from "vue";
import { useDeckStore } from "../stores/decks";
import UiSection from "./UiSection.vue";

const store = useDeckStore();

const active = computed(() => store.activeDeck);
const stats = computed(() => store.activeDeckStats);
</script>

<template>
    <div style="padding: 14px;">
        <div style="display:flex; align-items:center; justify-content:space-between;">
            <div>
                <div style="font-weight:900; font-size:16px;">Player’s Decks</div>
                <div style="color:var(--muted); font-size:12px;">Create multiple decks • Select one to edit</div>
            </div>
            <button class="btn btnPrimary" @click="store.openNewDeckModal()">＋</button>
        </div>
        
        <div class="hr"></div>
        
        <!-- Deck list -->
        <div style="display:grid; gap:10px;">
            <button
                v-for="d in store.decks"
                :key="d.id"
                class="btn"
                :style="{
          textAlign: 'left',
          background: d.id === store.activeDeckId ? 'rgba(124,92,255,0.22)' : 'rgba(255,255,255,0.06)',
          borderColor: d.id === store.activeDeckId ? 'rgba(124,92,255,0.38)' : 'var(--stroke)'
        }"
                @click="store.setActiveDeck(d.id)"
            >
                <div style="font-weight:900;">{{ d.name }}</div>
                <div style="color:var(--muted); font-size:12px;">
                    {{ Object.values(d.cards).reduce((a,b)=>a+b,0) }} cards • {{ new Date(d.createdAt).toLocaleDateString() }}
                </div>
            </button>
            
            <div v-if="store.decks.length === 0" style="color:var(--muted); font-size:13px; padding: 8px 2px;">
                No decks yet. Click <b>＋</b> to create one.
            </div>
        </div>
        
        <div class="hr"></div>
        
        <!-- Active deck clarity sections -->
        <div v-if="active">
            <UiSection title="Deck Summary" icon="📌" :defaultOpen="true">
                <div class="panel" style="padding:12px; border-radius:16px;">
                    <div style="font-weight:900; font-size:14px;">{{ active.name }}</div>
                    <div style="color:var(--muted); font-size:12px; margin-top:2px;">
                        {{ active.description || "No description" }}
                    </div>
                    
                    <div style="margin-top:10px; display:flex; gap:8px; flex-wrap:wrap;">
                        <span class="pill">🧾 Cards: {{ store.activeDeckTotalCards }}</span>
                        <span class="pill">⚡ Avg cost: {{ stats.avgCost }}</span>
                    </div>
                </div>
            </UiSection>
            
            <UiSection title="Deck Stats" icon="📊" :defaultOpen="true">
                <div style="display:grid; gap:10px;">
                    <div class="panel" style="padding:12px; border-radius:16px;">
                        <div style="display:flex; justify-content:space-between;">
                            <span style="font-weight:800;">⚔ ATK</span>
                            <span style="color:var(--muted)">{{ stats.atk }}</span>
                        </div>
                        <div style="display:flex; justify-content:space-between; margin-top:6px;">
                            <span style="font-weight:800;">🛡 DEF</span>
                            <span style="color:var(--muted)">{{ stats.def }}</span>
                        </div>
                        <div style="display:flex; justify-content:space-between; margin-top:6px;">
                            <span style="font-weight:800;">🏃 SPD</span>
                            <span style="color:var(--muted)">{{ stats.spd }}</span>
                        </div>
                    </div>
                    
                    <div style="color:var(--muted); font-size:12px;">
                        Clarity note: stats are icon-based for faster scanning (feedback-friendly).
                    </div>
                </div>
            </UiSection>
            
            <UiSection title="Deck Management" icon="🧰" :defaultOpen="false">
                <div style="display:flex; gap:10px;">
                    <button class="btn" style="flex:1;" @click="store.clearActiveDeck()">Clear deck</button>
                    <button class="btn btnDanger" style="flex:1;" @click="store.deleteActiveDeck()">Delete deck</button>
                </div>
                <div style="margin-top:10px; color:var(--muted); font-size:12px;">
                    Rule reminder: Max 2 copies per card in a deck.
                </div>
            </UiSection>
        </div>
        
        <div v-else style="color:var(--muted); font-size:13px;">
            Select a deck to see its stats and edit it.
        </div>
    </div>
</template>