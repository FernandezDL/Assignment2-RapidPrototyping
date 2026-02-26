<script setup lang="ts">
import { RouterView } from "vue-router";
import ProgressSteps from "./ProgressSteps.vue";
import DeckSidebarFocus from "./DeckSidebarFocus.vue";
</script>

<template>
    <div class="layout">
        <section class="panel main">
            <div class="top">
                <div class="title">
                    <div class="h1">Deck Builder Wizard</div>
                    <div class="sub">Prototype 3 • Guided flow to reduce cognitive load</div>
                </div>
                <ProgressSteps />
            </div>
            
            <div class="content">
                <RouterView />
            </div>
        </section>
        
        <aside class="panel side">
            <DeckSidebarFocus />
        </aside>
    </div>
</template>