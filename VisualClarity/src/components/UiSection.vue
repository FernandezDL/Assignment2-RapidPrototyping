<script setup lang="ts">
import { ref } from "vue";

const props = defineProps<{ title: string; icon?: string; defaultOpen?: boolean }>();
const open = ref(props.defaultOpen ?? true);
</script>

<template>
    <div style="padding: 12px;">
        <button
            class="btn"
            style="width:100%; display:flex; justify-content:space-between; align-items:center; padding:10px 12px;"
            @click="open = !open"
        >
      <span style="display:flex; gap:10px; align-items:center;">
        <span v-if="icon" style="opacity:.9;">{{ icon }}</span>
        <span style="font-weight:800;">{{ title }}</span>
      </span>
            <span style="color:var(--muted); font-weight:900;">{{ open ? "▾" : "▸" }}</span>
        </button>
        
        <div v-if="open" style="margin-top:10px;">
            <slot />
        </div>
    </div>
</template>