<template>
  <aside class="sidebar">
    <div class="header">
      <h2 class="title">Player’s Decks</h2>
      <button class="addBtn" type="button" @click="$emit('add-deck')" aria-label="Add deck">
        +
      </button>
    </div>

    <div class="list">
      <button
        v-for="deck in decks"
        :key="deck.id"
        class="deckRow"
        type="button"
        @click="$emit('select-deck', deck.id)"
      >
        <div class="thumb" aria-hidden="true"></div>
        <div class="deckName">{{ deck.name }}</div>
      </button>
    </div>
  </aside>
</template>

<script setup lang="ts">
export type DeckListItem = {
  id: string;
  name: string;
  artId?: string; // por ahora lo dejamos, luego podemos mapear artId -> imagen
};

defineProps<{
  decks: DeckListItem[];
}>();

defineEmits<{
  (e: "add-deck"): void;
  (e: "select-deck", deckId: string): void;
}>();
</script>

<style scoped>
.sidebar {
  width: 280px;
  min-height: 100vh;
  background: rgba(255, 255, 255, 0.08);
  border-radius: var(--r-lg);
  padding: 14px;
  box-sizing: border-box;
  border: 1px solid var(--stroke);
  backdrop-filter: blur(14px);
  -webkit-backdrop-filter: blur(14px);
  box-shadow: var(--shadow-1);
}

/* header */
.header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
  margin-bottom: 14px;
}

.title {
  margin: 0;
  font-size: 18px;
  font-weight: 800;
  color: rgba(255,255,255,0.92);
}

.addBtn {
  width: 30px;
  height: 30px;
  border: none;
  border-radius: 8px;
  background: linear-gradient(135deg, rgba(124,58,237,0.85), rgba(34,211,238,0.70));
  color: rgba(255,255,255,0.95);
  font-size: 20px;
  line-height: 1;
  cursor: pointer;
  box-shadow: 0 12px 24px rgba(0,0,0,0.25);
}

/* list */
.list {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.deckRow {
  width: 100%;
  display: flex;
  align-items: center;
  gap: 12px;

  border: 1px solid rgba(255, 255, 255, 0.14);
  cursor: pointer;

  background: rgba(255, 255, 255, 0.10);
  border-radius: 12px;
  padding: 10px;
  text-align: left;
  transition: transform 140ms ease, background 140ms ease, border-color 140ms ease;
}

.deckRow:hover {
  transform: translateY(-1px);
  background: rgba(255, 255, 255, 0.14);
  border-color: rgba(255, 255, 255, 0.22);
}

.thumb {
  width: 46px;
  height: 46px;
  border-radius: 10px;
  background: rgba(255, 255, 255, 0.14);
  border: 1px solid rgba(255, 255, 255, 0.16);
  position: relative;
  flex: 0 0 auto;
  overflow: hidden;
}

/* X placeholder mini */
.thumb::before,
.thumb::after {
  content: "";
  position: absolute;
  inset: 0;
  margin: auto;
  width: 70px;
  height: 2px;
  background: rgba(255,255,255,0.40);
  transform-origin: center;
}
.thumb::before { transform: rotate(45deg); }
.thumb::after { transform: rotate(-45deg); }

.deckName {
  font-size: 14px;
  font-weight: 700;
  color: rgba(255,255,255,0.92);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>