<template>
  <aside
    class="sidebar"
    :class="{ 'sidebar--dragOver': isDragOver }"
    @dragenter.prevent="onDragEnter"
    @dragover.prevent="onDragOver"
    @dragleave="onDragLeave"
    @drop.prevent="onDrop"
  >
    <!-- Header -->
    <div class="header">
      <h2 class="title">{{ deckName }}</h2>

      <div class="headerActions">
        <button class="iconBtn" type="button" @click="startEdit" aria-label="Edit deck name">
          ✎
        </button>
        <button class="iconBtn" type="button" @click="$emit('close-deck')" aria-label="Close deck">
          ✕
        </button>
      </div>
    </div>

    <!-- Preview grande -->
    <div class="preview" aria-hidden="true"></div>

    <!-- Row: 0/10 + checkbox deck stats -->
    <div class="row">
      <div class="count">
        <span class="box" aria-hidden="true"></span>
        <span>{{ cardsCount }}/{{ maxCards }}</span>
      </div>

      <label class="check">
        <input type="checkbox" v-model="showStats" />
        <span>Deck stats</span>
      </label>
    </div>

    <div class="divider"></div>

    <div class="warningsTitle">Deck warnings</div>
    <div class="divider dashed"></div>

    <!-- Área de contenido: grilla de mini cartas -->
    <div class="content">
      <p class="placeholder" v-if="deckCards.length === 0">
        Drag cards here to add them to your deck.
      </p>

      <div class="miniGrid" v-else>
        <MiniCard
          v-for="c in deckCards"
          :key="c.id"
          :name="c.name"
        />
      </div>
    </div>

    <!-- Modal chiquito para editar nombre -->
    <teleport to="body">
      <div v-if="editing" class="overlay" @click.self="cancelEdit">
        <div class="editModal" role="dialog" aria-modal="true" aria-label="Edit deck name">
          <h3 class="editTitle">Edit deck name</h3>
          <input
            class="editInput"
            type="text"
            v-model="draftName"
            maxlength="40"
            @keydown.enter="saveEdit"
            autofocus
          />

          <div class="editActions">
            <button class="btn btnPrimary" type="button" @click="saveEdit" :disabled="!draftName.trim()">
              Save
            </button>
            <button class="btn" type="button" @click="cancelEdit">
              Cancel
            </button>
          </div>
        </div>
      </div>
    </teleport>
  </aside>
</template>

<script setup lang="ts">
import { computed, ref, watch } from "vue";
import MiniCard from "@/components/MiniCard.vue";

type DeckCardPreview = {
  id: string;
  name: string;
};

const props = withDefaults(
  defineProps<{
    deckName: string;
    cardsCount: number;
    maxCards?: number;
    warnings?: string[];
    deckCards?: DeckCardPreview[]; // <-- lista de mini cards (id + name)
  }>(),
  {
    maxCards: 10,
    warnings: () => [],
    deckCards: () => []
  }
);

const emit = defineEmits<{
  (e: "close-deck"): void;
  (e: "rename-deck", newName: string): void;
  (e: "drop-card", cardId: string): void;
}>();

const deckCards = computed(() => props.deckCards);

/* checkbox (por ahora solo UI) */
const showStats = ref(false);

/* -------- Drag & Drop -------- */
const isDragOver = ref(false);
let dragDepth = 0;

function onDragEnter() {
  dragDepth += 1;
  isDragOver.value = true;
}

function onDragOver(e: DragEvent) {
  if (e.dataTransfer) e.dataTransfer.dropEffect = "copy";
}

function onDragLeave() {
  dragDepth -= 1;
  if (dragDepth <= 0) {
    dragDepth = 0;
    isDragOver.value = false;
  }
}

function onDrop(e: DragEvent) {
  dragDepth = 0;
  isDragOver.value = false;

  const cardId =
    e.dataTransfer?.getData("application/x-card-id") ||
    e.dataTransfer?.getData("text/plain");

  if (!cardId) return;
  emit("drop-card", cardId);
}

/* -------- Edit deck name -------- */
const editing = ref(false);
const draftName = ref(props.deckName);

watch(
  () => props.deckName,
  (v) => {
    if (!editing.value) draftName.value = v;
  }
);

function startEdit() {
  draftName.value = props.deckName;
  editing.value = true;
}

function saveEdit() {
  const next = draftName.value.trim();
  if (!next) return;
  emit("rename-deck", next);
  editing.value = false;
}

function cancelEdit() {
  editing.value = false;
}
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

.sidebar--dragOver {
  outline: 3px dashed rgba(0, 0, 0, 0.45);
  outline-offset: -6px;
  background: #c9c9c9;
}

.header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
  margin-bottom: 10px;
}

.title {
  margin: 0;
  font-size: 18px;
  font-weight: 800;
  color: #111;
  line-height: 1.1;
}

.headerActions {
  display: flex;
  gap: 8px;
}

.iconBtn {
  width: 26px;
  height: 26px;
  border: none;
  border-radius: 6px;
  background: #b5b5b5;
  color: #111;
  cursor: pointer;
  font-weight: 800;
  display: grid;
  place-items: center;
}

.preview {
  width: 100%;
  height: 190px;
  border-radius: 12px;
  background: #a6a6a6;
  position: relative;
  overflow: hidden;
  margin-bottom: 10px;
}

.preview::before,
.preview::after {
  content: "";
  position: absolute;
  inset: 0;
  margin: auto;
  width: 250px;
  height: 2px;
  background: rgba(0,0,0,0.35);
  transform-origin: center;
}
.preview::before { transform: rotate(45deg); }
.preview::after { transform: rotate(-45deg); }

.row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  margin: 6px 0 10px;
  color: #111;
  font-size: 12px;
}

.count {
  display: inline-flex;
  align-items: center;
  gap: 8px;
}

.box {
  width: 12px;
  height: 12px;
  background: #bdbdbd;
  border: 1px solid rgba(0,0,0,0.25);
  border-radius: 3px;
}

.check {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  user-select: none;
}

.check input {
  width: 14px;
  height: 14px;
}

.divider {
  height: 1px;
  background: rgba(0,0,0,0.25);
  margin: 8px 0;
}

.divider.dashed {
  background: transparent;
  border-top: 1px dashed rgba(0,0,0,0.35);
  margin-top: 6px;
}

.warningsTitle {
  text-align: center;
  font-size: 12px;
  font-weight: 700;
  color: #111;
}

.content {
  padding: 10px 2px;
  box-sizing: border-box;

  /* SCROLL */
  height: 320px;        /* ajustalo a tu gusto */
  overflow-y: auto;
  overflow-x: hidden;

  /* se mira más limpio */
  border-radius: 10px;
}

.placeholder {
  margin: 0;
  text-align: center;
  font-size: 12px;
  color: rgba(0,0,0,0.65);
}

/* Grilla de mini cards */
.miniGrid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 10px;
  align-items: start;
}

/* modal editar */
.overlay {
  position: fixed;
  inset: 0;
  background: rgba(0,0,0,0.45);
  display: grid;
  place-items: center;
  z-index: 9999;
  padding: 18px;
}

.editModal {
  width: min(360px, 100%);
  background: #e6e6e6;
  border-radius: 12px;
  padding: 14px;
  box-sizing: border-box;
  color: #111;
}

.editTitle {
  margin: 0 0 10px 0;
  font-size: 16px;
  font-weight: 800;
}

.editInput {
  width: 100%;
  border: none;
  border-radius: 8px;
  padding: 10px 12px;
  background: #cfcfcf;
  outline: none;
  box-sizing: border-box;
}

.editActions {
  display: flex;
  justify-content: flex-end;
  gap: 10px;
  margin-top: 12px;
}

.btn {
  border: none;
  border-radius: 8px;
  padding: 10px 12px;
  background: #cfcfcf;
  cursor: pointer;
  font-weight: 700;
}

.btnPrimary {
  background: #ffffff;
}
.btn:disabled {
  opacity: 0.55;
  cursor: not-allowed;
}
</style>