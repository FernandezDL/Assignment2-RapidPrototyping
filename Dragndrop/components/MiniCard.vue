<template>
  <article class="miniCard" :class="{ 'miniCard--clickable': clickable }" @click="onClick">
    <div class="miniCard__img" aria-hidden="true"></div>
    <div class="miniCard__name">{{ name }}</div>
  </article>
</template>

<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    name: string;
    clickable?: boolean;
  }>(),
  { clickable: false }
);

const emit = defineEmits<{
  (e: "click"): void;
}>();

function onClick() {
  if (!props.clickable) return;
  emit("click");
}
</script>

<style scoped>
.miniCard {
  width: 110px;
  background: rgba(255, 255, 255, 0.10);
  border: 1px solid rgba(255, 255, 255, 0.14);
  border-radius: 16px;
  padding: 10px;
  box-sizing: border-box;
  box-shadow: 0 10px 24px rgba(0,0,0,0.22);
  display: flex;
  flex-direction: column;
  gap: 10px;
  text-align: center;
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  transition: transform 140ms ease, background 140ms ease, border-color 140ms ease;
}

.miniCard__img {
  width: 100%;
  height: 70px;
  border-radius: 12px;
  background: linear-gradient(135deg, rgba(124, 58, 237, 0.20), rgba(34, 211, 238, 0.16));
  border: 1px solid rgba(255, 255, 255, 0.16);
  position: relative;
  overflow: hidden;
}

/* X placeholder */
.miniCard__img::before,
.miniCard__img::after {
  content: "";
  position: absolute;
  inset: 0;
  margin: auto;
  width: 90px;
  height: 2px;
  background: rgba(255,255,255,0.42);
  transform-origin: center;
}
.miniCard__img::before { transform: rotate(45deg); }
.miniCard__img::after { transform: rotate(-45deg); }

.miniCard__name {
  font-size: 15px;
  font-weight: 800;
  color: rgba(255,255,255,0.92);
  line-height: 1.1;

  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.miniCard--clickable {
  cursor: pointer;
}
.miniCard--clickable:hover {
  transform: translateY(-2px);
  background: rgba(255, 255, 255, 0.14);
  border-color: rgba(255, 255, 255, 0.22);
}
</style>