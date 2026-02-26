<script setup lang="ts">
import { useRoute, useRouter } from "vue-router";

const route = useRoute();
const router = useRouter();

const steps = [
    { key: "decks", label: "Deck", path: "/wizard/decks" },
    { key: "strategy", label: "Strategy", path: "/wizard/strategy" },
    { key: "core", label: "Core", path: "/wizard/core" },
    { key: "fill", label: "Fill", path: "/wizard/fill" },
    { key: "review", label: "Review", path: "/wizard/review" },
];

function isActive(path: string) {
    return route.path === path;
}
</script>

<template>
    <div class="steps">
        <button
            v-for="s in steps"
            :key="s.key"
            class="step"
            :class="{ active: isActive(s.path) }"
            @click="router.push(s.path)"
        >
            {{ s.label }}
        </button>
    </div>
</template>

<style scoped>
.steps{ display:flex; gap:8px; flex-wrap:wrap; justify-content:flex-end; }
.step{
    padding:10px 12px;
    border-radius:999px;
    border:1px solid gray;
    background:rgba(255,255,255,0.05);
    color:rgba(255,255,255,0.75);
    font-weight:800;
    cursor:pointer;
}
.step.active{
    background:rgba(124,92,255,0.25);
    border-color:rgba(124,92,255,0.35);
    color:rgba(255,255,255,0.92);
}
</style>