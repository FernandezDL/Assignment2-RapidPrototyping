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
  background: rgba(0,0,0,0.58);
  display: grid;
  place-items: center;
  padding: 18px;
  z-index: 9999;
}

/* Modal base */
.modal {
  width: min(860px, 100%);
  background: rgba(255, 255, 255, 0.10);
  border: 1px solid rgba(255, 255, 255, 0.18);
  border-radius: 18px;
  padding: 18px;
  box-sizing: border-box;
  color: rgba(255,255,255,0.92);
  backdrop-filter: blur(18px);
  -webkit-backdrop-filter: blur(18px);
  box-shadow: var(--shadow-2);
}

.modal__title {
  margin: 0 0 14px 0;
  font-size: 20px;
  font-weight: 900;
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
  border-radius: 16px;
  background: linear-gradient(135deg, rgba(124, 58, 237, 0.25), rgba(34, 211, 238, 0.18));
  border: 1px solid rgba(255,255,255,0.16);
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
  background: rgba(255,255,255,0.45);
  transform-origin: center;
}
.preview__placeholder::before { transform: rotate(45deg); }
.preview__placeholder::after { transform: rotate(-45deg); }

.label {
  margin: 12px 0 6px;
  font-size: 13px;
  font-weight: 800;
  color: rgba(255,255,255,0.86);
}

.artRow {
  display: flex;
  gap: 12px;
}

.art {
  width: 56px;
  height: 56px;
  border-radius: 14px;
  border: 1px solid rgba(255,255,255,0.20);
  background: rgba(255,255,255,0.12);
  cursor: pointer;
  padding: 0;
  overflow: hidden;
  transition: transform 140ms ease, border-color 140ms ease;
}
.art:hover { transform: translateY(-1px); }
.art--active {
  border-color: rgba(34, 211, 238, 0.65);
  box-shadow: 0 0 0 3px rgba(34, 211, 238, 0.18);
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
  background: rgba(255,255,255,0.45);
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
  border: 1px solid rgba(255, 255, 255, 0.18);
  border-radius: 14px;
  background: rgba(255, 255, 255, 0.10);
  color: rgba(255,255,255,0.92);
  padding: 10px 12px;
  box-sizing: border-box;
  outline: none;
  font-size: 14px;
}

.input::placeholder,
.textarea::placeholder {
  color: rgba(255,255,255,0.55);
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
  align-items: flex-end;
}

.btn {
  width: 160px;
  border: 1px solid rgba(255, 255, 255, 0.16);
  border-radius: 14px;
  background: rgba(255, 255, 255, 0.10);
  color: rgba(255,255,255,0.92);
  padding: 10px 12px;
  cursor: pointer;
  font-weight: 900;
  transition: transform 140ms ease, background 140ms ease;
}

.btn:hover {
  transform: translateY(-1px);
  background: rgba(255, 255, 255, 0.14);
}

.btn--primary {
  border: none;
  background: linear-gradient(135deg, rgba(124,58,237,0.92), rgba(34,211,238,0.78));
  color: rgba(255,255,255,0.96);
}

.btn:disabled {
  opacity: 0.55;
  cursor: not-allowed;
}

.hint {
  margin: 10px 0 0;
  font-size: 12px;
  color: rgba(255,255,255,0.75);
}

@media (max-width: 860px) {
  .modal__content {
    grid-template-columns: 1fr;
  }

  .preview {
    width: 100%;
    height: 220px;
  }
}
</style>