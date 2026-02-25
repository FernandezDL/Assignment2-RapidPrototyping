<template>
  <aside class="sidebar">
    <!-- Header -->
    <div class="sidebar__header">
      <h2 class="sidebar__title">Player’s Decks</h2>

      <button class="sidebar__add" type="button" @click="$emit('add-deck')" aria-label="Add deck">
        +
      </button>
    </div>

    <!-- Pro tips card -->
    <section class="tipcard">
      <div class="tipcard__image" aria-hidden="true"></div>

      <h3 class="tipcard__title">{{ activeTip.title }}</h3>

      <!-- Transición suave cuando cambia -->
      <transition name="fade" mode="out-in">
        <p class="tipcard__text" :key="activeIndex">
          {{ activeTip.text }}
        </p>
      </transition>

      <!-- Dots opcionales (se ve bonito y ayuda a ver el carrusel) -->
      <div class="tipcard__dots" aria-hidden="true">
        <span
          v-for="i in tips.length"
          :key="i"
          class="dot"
          :class="{ 'dot--active': i - 1 === activeIndex }"
        />
      </div>
    </section>
  </aside>
</template>

<script setup lang="ts">
import { computed, onMounted, onBeforeUnmount, ref } from "vue";

type Tip = { title: string; text: string };

const props = withDefaults(
  defineProps<{
    tips?: Tip[];
    intervalMs?: number;
  }>(),
  {
    intervalMs: 3500,
    tips: () => [
      {
        title: "Pro tip",
        text: "Balanceá tu deck: llevá cartas ofensivas y defensivas para no quedarte sin respuesta."
      },
      {
        title: "Pro tip",
        text: "Priorizá sinergias: cartas con tags similares suelen escalar mejor juntas."
      },
      {
        title: "Pro tip",
        text: "Probá iterar: cambiá 1–2 cartas por partida para aprender qué realmente funciona."
      }
    ]
  }
);

defineEmits<{
  (e: "add-deck"): void;
}>();

const activeIndex = ref(0);
let timer: number | undefined;

const tips = computed(() => props.tips);
const activeTip = computed(() => tips.value[activeIndex.value] ?? tips.value[0]);

function nextTip() {
  activeIndex.value = (activeIndex.value + 1) % tips.value.length;
}

onMounted(() => {
  if (tips.value.length <= 1) return;
  timer = window.setInterval(nextTip, props.intervalMs);
});

onBeforeUnmount(() => {
  if (timer) window.clearInterval(timer);
});
</script>

<style scoped>
/* Sidebar base */
.sidebar {
  width: 280px;
  min-height: 80vh;
  background: #d3d3d3; /* gris como la imagen */
  border-radius: 18px;
  padding: 16px 14px;
  box-sizing: border-box;
  border: 2px solid rgba(0, 0, 0, 0.15);
}

/* Header */
.sidebar__header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  margin-bottom: 18px;
}

.sidebar__title {
  margin: 0;
  font-size: 22px;
  font-weight: 800;
  color: #111;
}

.sidebar__add {
  width: 34px;
  height: 34px;
  border: none;
  border-radius: 8px;
  background: #6f6f6f;
  color: #fff;
  font-size: 22px;
  line-height: 1;
  cursor: pointer;
}

.sidebar__add:hover {
  filter: brightness(1.05);
}

/* Tip card */
.tipcard {
  background: transparent;
  text-align: center;
  padding: 10px 6px;
}

.tipcard__image {
  width: 170px;
  height: 170px;
  margin: 0 auto 14px auto;
  border-radius: 14px;
  background: #6f6f6f;
  position: relative;
  overflow: hidden;
}

/* dibujar la X del placeholder */
.tipcard__image::before,
.tipcard__image::after {
  content: "";
  position: absolute;
  inset: 0;
  margin: auto;
  width: 240px;
  height: 2px;
  background: rgba(255, 255, 255, 0.8);
  transform-origin: center;
}
.tipcard__image::before {
  transform: rotate(45deg);
}
.tipcard__image::after {
  transform: rotate(-45deg);
}

.tipcard__title {
  margin: 0 0 8px 0;
  font-size: 18px;
  font-weight: 700;
  color: #111;
}

.tipcard__text {
  margin: 0 auto;
  max-width: 220px;
  font-size: 14px;
  line-height: 1.35;
  color: #222;
}

/* Dots */
.tipcard__dots {
  display: flex;
  justify-content: center;
  gap: 6px;
  margin-top: 12px;
}

.dot {
  width: 7px;
  height: 7px;
  border-radius: 999px;
  background: rgba(0, 0, 0, 0.25);
}
.dot--active {
  background: rgba(0, 0, 0, 0.7);
}

/* Fade animation */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 220ms ease, transform 220ms ease;
}
.fade-enter-from {
  opacity: 0;
  transform: translateY(4px);
}
.fade-leave-to {
  opacity: 0;
  transform: translateY(-4px);
}
</style>