<script setup lang="ts">
import { ref } from "vue";
import { useDeckStore } from "../stores/decks";

const store = useDeckStore();

const name = ref("");
const desc = ref("");
const coverArt = ref(0);

const arts = [
    "linear-gradient(135deg, rgba(124,92,255,.55), rgba(255,255,255,.06))",
    "linear-gradient(135deg, rgba(66,211,146,.55), rgba(255,255,255,.06))",
    "linear-gradient(135deg, rgba(255,196,92,.50), rgba(255,255,255,.06))",
    "linear-gradient(135deg, rgba(255,92,119,.50), rgba(255,255,255,.06))",
];
</script>

<template>
    <div class="modalOverlay" @click.self="store.closeNewDeckModal()">
        <div class="modal">
            <div class="modalHeader">
                <div style="font-weight:900;">Create Deck</div>
                <button class="btn" @click="store.closeNewDeckModal()">✕</button>
            </div>
            
            <div class="modalBody" style="grid-template-columns: 1fr 1fr; gap:14px;">
                <div class="panel" style="padding:14px; border-radius:16px;">
                    <div style="font-weight:900; margin-bottom:8px;">Deck cover</div>
                    <div
                        :style="{
              height:'160px',
              borderRadius:'16px',
              border:'1px solid var(--stroke)',
              background: arts[coverArt],
            }"
                    />
                    <div style="display:flex; gap:10px; margin-top:10px;">
                        <button class="btn" v-for="i in 4" :key="i" @click="coverArt = i-1">
                            Art {{ i }}
                        </button>
                    </div>
                </div>
                
                <div class="panel" style="padding:14px; border-radius:16px;">
                    <div style="font-weight:900; margin-bottom:8px;">Deck info</div>
                    <label style="color:var(--muted); font-size:12px;">Name</label>
                    <input class="input" v-model="name" placeholder="e.g. Control Build" />
                    
                    <div style="height:10px;"></div>
                    
                    <label style="color:var(--muted); font-size:12px;">Description</label>
                    <textarea class="textarea" v-model="desc" placeholder="Short description (mock)" />
                    
                    <div style="display:flex; gap:10px; margin-top:12px;">
                        <button class="btn btnPrimary" style="flex:1;" @click="store.createDeck(name, desc, coverArt)">
                            Create
                        </button>
                        <button class="btn" style="flex:1;" @click="store.closeNewDeckModal()">Cancel</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>