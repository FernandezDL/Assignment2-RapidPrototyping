<template>
  <teleport to="body">
    <div v-if="open" class="overlay" @click.self="emit('close')">
      <div class="modal" role="dialog" aria-modal="true" aria-label="New Deck">
        <h2 class="modal__title">New Deck</h2>

        <div class="modal__content">
          <!-- Columna izquierda: preview grande + deck art -->
          <div class="left">
            <div class="preview">
              <img
                v-if="selectedArt?.src"
                class="preview__img"
                :src="selectedArt.src"
                :alt="selectedArt.alt"
              />
              <div v-else class="preview__placeholder" aria-hidden="true"></div>
            </div>

            <p class="label">Deck art</p>
            <div class="artRow">
              <button
                v-for="art in arts"
                :key="art.id"
                type="button"
                class="art"
                :class="{ 'art--active': art.id === selectedArtId }"
                @click="selectedArtId = art.id"
                :aria-label="`Select deck art ${art.id}`"
              >
                <img v-if="art.src" class="art__img" :src="art.src" :alt="art.alt" />
                <div v-else class="art__placeholder" aria-hidden="true"></div>
              </button>
            </div>
          </div>

          <!-- Columna derecha: inputs + botones -->
          <div class="right">
            <label class="label" for="deckName">Choose a deck name</label>
            <input
              id="deckName"
              class="input"
              type="text"
              :value="name"
              @input="emit('update:name', ($event.target as HTMLInputElement).value)"
              placeholder="My awesome deck"
              maxlength="40"
            />

            <label class="label" for="deckDesc">Deck description</label>
            <textarea
              id="deckDesc"
              class="textarea"
              :value="description"
              @input="emit('update:description', ($event.target as HTMLTextAreaElement).value)"
              placeholder="What’s the plan for this deck?"
              rows="5"
              maxlength="240"
            />

            <div class="actions">
              <button class="btn btn--primary" type="button" :disabled="!canCreate" @click="onCreate">
                Create Deck
              </button>
              <button class="btn" type="button" @click="emit('close')">
                Cancel
              </button>
            </div>
          </div>
        </div>

        <p class="hint" v-if="!canCreate">
          * Deck name is required.
        </p>
      </div>
    </div>
  </teleport>
</template>

<script setup lang="ts">
import { computed, watch, ref } from "vue";

export type DeckArt = {
  id: string;
  src?: string; // si no hay src, se ve placeholder como en el mock
  alt: string;
};

const props = withDefaults(
  defineProps<{
    open: boolean;
    name: string;
    description: string;
    arts?: DeckArt[];
    initialArtId?: string;
  }>(),
  {
    arts: () => [
      { id: "a1", alt: "Art option 1" },
      { id: "a2", alt: "Art option 2" },
      { id: "a3", alt: "Art option 3" },
      { id: "a4", alt: "Art option 4" }
    ],
    initialArtId: "a1"
  }
);

const emit = defineEmits<{
  (e: "close"): void;
  (e: "create", payload: { name: string; description: string; artId: string }): void;
  (e: "update:name", value: string): void;
  (e: "update:description", value: string): void;
}>();

const selectedArtId = ref(props.initialArtId);

watch(
  () => props.open,
  (isOpen) => {
    if (isOpen) selectedArtId.value = props.initialArtId;
  }
);

const arts = computed(() => props.arts);
const selectedArt = computed(() => arts.value.find(a => a.id === selectedArtId.value) ?? arts.value[0]);

const canCreate = computed(() => props.name.trim().length > 0);

function onCreate() {
  if (!canCreate.value) return;
  emit("create", {
    name: props.name.trim(),
    description: props.description.trim(),
    artId: selectedArtId.value
  });
}
</script>

<style scoped>
/* Overlay */
.overlay {
  position: fixed;
  inset: 0;
  background: rgba(0,0,0,0.45);
  display: grid;
  place-items: center;
  padding: 18px;
  z-index: 9999;
}

/* Modal base (gris oscuro como mock) */
.modal {
  width: min(820px, 100%);
  background: #6f6f6f;
  border-radius: 14px;
  padding: 18px;
  box-sizing: border-box;
  color: #fff;
}

.modal__title {
  margin: 0 0 14px 0;
  font-size: 20px;
  font-weight: 800;
}

/* Layout interno */
.modal__content {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 22px;
}

/* Left */
.preview {
  width: 260px;
  height: 260px;
  border-radius: 10px;
  background: #d9d9d9;
  overflow: hidden;
  position: relative;
}

.preview__img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.preview__placeholder {
  width: 100%;
  height: 100%;
  position: relative;
}

/* X placeholder grande */
.preview__placeholder::before,
.preview__placeholder::after {
  content: "";
  position: absolute;
  inset: 0;
  margin: auto;
  width: 380px;
  height: 2px;
  background: rgba(0,0,0,0.45);
  transform-origin: center;
}
.preview__placeholder::before { transform: rotate(45deg); }
.preview__placeholder::after { transform: rotate(-45deg); }

.label {
  margin: 12px 0 6px;
  font-size: 13px;
  font-weight: 700;
  color: rgba(255,255,255,0.95);
}

.artRow {
  display: flex;
  gap: 12px;
}

.art {
  width: 56px;
  height: 56px;
  border-radius: 8px;
  border: 2px solid rgba(255,255,255,0.35);
  background: #d9d9d9;
  cursor: pointer;
  padding: 0;
  overflow: hidden;
}
.art--active {
  border-color: #ffffff;
  box-shadow: 0 0 0 3px rgba(255,255,255,0.25);
}

.art__img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.art__placeholder {
  width: 100%;
  height: 100%;
  position: relative;
}
/* X placeholder pequeño */
.art__placeholder::before,
.art__placeholder::after {
  content: "";
  position: absolute;
  inset: 0;
  margin: auto;
  width: 80px;
  height: 2px;
  background: rgba(0,0,0,0.45);
  transform-origin: center;
}
.art__placeholder::before { transform: rotate(45deg); }
.art__placeholder::after { transform: rotate(-45deg); }

/* Right */
.right {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.input,
.textarea {
  width: 100%;
  border: none;
  border-radius: 6px;
  background: #d9d9d9;
  color: #111;
  padding: 10px 12px;
  box-sizing: border-box;
  outline: none;
  font-size: 14px;
}

.textarea {
  resize: none;
  min-height: 120px;
}

.actions {
  margin-top: 8px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  align-items: flex-end; /* como en mock, botones a la derecha */
}

.btn {
  width: 160px;
  border: none;
  border-radius: 6px;
  background: #d9d9d9;
  color: #111;
  padding: 10px 12px;
  cursor: pointer;
  font-weight: 700;
}

.btn--primary {
  background: #eaeaea;
}

.btn:disabled {
  opacity: 0.55;
  cursor: not-allowed;
}

.hint {
  margin: 10px 0 0;
  font-size: 12px;
  color: rgba(255,255,255,0.9);
}
</style>