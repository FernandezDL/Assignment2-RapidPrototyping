<template>
  <header class="topbar">
    <div class="search">
      <!-- Lupa -->
      <svg viewBox="0 0 24 24" class="search__icon" aria-hidden="true">
        <path
          d="M10.5 18a7.5 7.5 0 1 1 0-15 7.5 7.5 0 0 1 0 15Z"
          fill="none"
          stroke="currentColor"
          stroke-width="2.2"
        />
        <path
          d="M16.2 16.2 21 21"
          fill="none"
          stroke="currentColor"
          stroke-width="2.2"
          stroke-linecap="round"
        />
      </svg>

      <input
        class="search__input"
        type="search"
        :placeholder="placeholder"
        :value="modelValue"
        @input="$emit('update:modelValue', ($event.target as HTMLInputElement).value)"
      />
    </div>
  </header>
</template>

<script setup lang="ts">
defineProps<{
  modelValue: string;
  placeholder?: string;
}>();

defineEmits<{
  (e: "update:modelValue", value: string): void;
  (e: "back"): void;
}>();
</script>

<style scoped>
.topbar {
  width: 100%;
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 10px 12px;
  border-radius: var(--r-md);
  background: rgba(255, 255, 255, 0.06);
  border: 1px solid var(--stroke);
  box-shadow: inset 0 1px 0 rgba(255,255,255,0.08);
}

.topbar__back {
  width: 44px;
  height: 44px;
  border: none;
  border-radius: 12px;
  background: transparent;
  display: grid;
  place-items: center;
  cursor: pointer;
}

.icon {
  width: 26px;
  height: 26px;
  color: #111;
}

/* Caja de search como la imagen */
.search {
  flex: 1;
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 10px 14px;
  border-radius: 18px;
  background: rgba(255, 255, 255, 0.12);
  border: 1px solid rgba(255, 255, 255, 0.16);
  box-shadow: 0 10px 24px rgba(0,0,0,0.22);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
}

.search__icon {
  width: 22px;
  height: 22px;
  color: rgba(255,255,255,0.80);
  flex: 0 0 auto;
}

.search__input {
  width: 100%;
  border: none;
  outline: none;
  background: transparent;
  font-size: 16px;
  color: rgba(255,255,255,0.92);
}

.search__input::placeholder {
  color: rgba(255,255,255,0.55);
}
</style>