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
  width: 98%;
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 10px 12px;
  background: #d8d7d7;
  border-radius: 15px;
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
  background: #bfbfbf;
  box-shadow: 0 6px 10px rgba(0,0,0,0.18);
}

.search__icon {
  width: 22px;
  height: 22px;
  color: #444;
  flex: 0 0 auto;
}

.search__input {
  width: 100%;
  border: none;
  outline: none;
  background: transparent;
  font-size: 16px;
  color: #111;
}

.search__input::placeholder {
  color: #4a4a4a;
}
</style>