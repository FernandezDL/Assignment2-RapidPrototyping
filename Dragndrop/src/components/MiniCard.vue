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
  background: #ffffff;
  border-radius: 14px;
  padding: 10px;
  box-sizing: border-box;
  box-shadow: 0 6px 10px rgba(0,0,0,0.14);
  display: flex;
  flex-direction: column;
  gap: 10px;
  text-align: center;
}

.miniCard__img {
  width: 100%;
  height: 70px;
  border-radius: 12px;
  background: #d3d3d3;
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
  background: rgba(0,0,0,0.35);
  transform-origin: center;
}
.miniCard__img::before { transform: rotate(45deg); }
.miniCard__img::after { transform: rotate(-45deg); }

.miniCard__name {
  font-size: 16px;
  font-weight: 800;
  color: #111;
  line-height: 1.1;

  /* por si el nombre es largo */
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.miniCard--clickable {
  cursor: pointer;
}
.miniCard--clickable:hover {
  transform: translateY(-1px);
}
</style>