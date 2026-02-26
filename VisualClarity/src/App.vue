<script setup lang="ts">
import { computed } from "vue";
import { useDeckStore } from "./stores/decks";

import TopSearchBar from "./components/TopSearchBar.vue";
import CardGrid from "./components/CardGrid.vue";
import DeckSidebar from "./components/DeckSidebar.vue";
import ModalNewDeck from "./components/ModalNewDeck.vue";
import ModalCardDetails from "./components/ModalCardDetails.vue";

const store = useDeckStore();

const openedCard = computed(() => store.cards.find(c => c.id === store.openedCardId) ?? null);
</script>

<template>
    <div class="container">
        <section class="panel main">
            <TopSearchBar />
            <div class="scroll">
                <CardGrid />
            </div>
        </section>
        
        <aside class="panel">
            <DeckSidebar />
        </aside>
        
        <ModalNewDeck v-if="store.newDeckModalOpen" />
        <ModalCardDetails v-if="openedCard" :card="openedCard" />
    </div>
</template>