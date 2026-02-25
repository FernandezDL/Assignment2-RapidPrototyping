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
  background: #d3d3d3;
  border-radius: 18px;
  padding: 14px;
  box-sizing: border-box;
  border: 2px solid rgba(0, 0, 0, 0.15);
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
  color: #111;
}

.addBtn {
  width: 30px;
  height: 30px;
  border: none;
  border-radius: 8px;
  background: #6f6f6f;
  color: #fff;
  font-size: 20px;
  line-height: 1;
  cursor: pointer;
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

  border: none;
  cursor: pointer;

  background: #6f6f6f;
  border-radius: 10px;
  padding: 10px;
  text-align: left;
}

.thumb {
  width: 46px;
  height: 46px;
  border-radius: 8px;
  background: #d9d9d9;
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
  background: rgba(0,0,0,0.35);
  transform-origin: center;
}
.thumb::before { transform: rotate(45deg); }
.thumb::after { transform: rotate(-45deg); }

.deckName {
  font-size: 14px;
  font-weight: 700;
  color: #fff;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>