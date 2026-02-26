<template>
  <article class="card">
    <!-- Imagen (o placeholder si no hay) -->
    <div class="card__media">
      <img
        v-if="imageSrc"
        class="card__img"
        :src="imageSrc"
        :alt="name"
        draggable="false"
        />
      <div v-else class="card__img-placeholder" aria-hidden="true"></div>
    </div>

    <!-- Panel inferior -->
    <section class="card__body">
      <h3 class="card__name">{{ name }}</h3>

      <!-- Stats: puede ser string o array -->
      <p class="card__stats" v-if="statsText">
        {{ statsText }}
      </p>

      <p class="card__desc">
        {{ description }}
      </p>
    </section>
  </article>
</template>

<script setup lang="ts">
import { computed } from "vue";

type Props = {
  name: string;
  description: string;

  /** Puede venir como string ("ATK 5 • DEF 2 • SPD 3")
   *  o como array (["ATK 5", "DEF 2", "SPD 3"])
   */
  stats?: string | string[];

  /** URL de imagen opcional */
  imageSrc?: string;
};

const props = defineProps<Props>();

const statsText = computed(() => {
  if (!props.stats) return "";
  return Array.isArray(props.stats) ? props.stats.join(" • ") : props.stats;
});
</script>

<style scoped>
.card {
  width: 100%;
  height: 360px;
  border-radius: 24px;
  padding: 14px;
  background:
    linear-gradient(180deg, rgba(255,255,255,0.16), rgba(255,255,255,0.06));
  border: 1px solid rgba(255, 255, 255, 0.16);
  box-shadow: var(--shadow-1);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  position: relative;
  overflow: hidden;
  transition: transform 160ms ease, box-shadow 160ms ease, border-color 160ms ease;
}

.card::before {
  content: "";
  position: absolute;
  inset: -80px;
  background:
    radial-gradient(280px 180px at 10% 10%, rgba(124, 58, 237, 0.18), transparent 60%),
    radial-gradient(260px 180px at 90% 10%, rgba(34, 211, 238, 0.14), transparent 60%);
  pointer-events: none;
}

.card:hover {
  transform: translateY(-3px);
  box-shadow: var(--shadow-2);
  border-color: rgba(255, 255, 255, 0.26);
}

/* Imagen arriba */
.card__media {
  width: 100%;
}

.card__img,
.card__img-placeholder {
  width: 100%;
  height: 132px;
  border-radius: 18px;
  display: block;
  background:
    linear-gradient(135deg, rgba(124, 58, 237, 0.25), rgba(34, 211, 238, 0.20));
  border: 1px solid rgba(255, 255, 255, 0.16);
}

/* Para que la imagen no se deforme */
.card__img {
  object-fit: cover;
}

/* Panel gris abajo */
.card__body {
  margin-top: 14px;
  background: rgba(255, 255, 255, 0.85);
  border-radius: 18px;
  padding: 18px 16px;
  text-align: center;
  height: 160px;
  border: 1px solid rgba(255, 255, 255, 0.35);
  box-shadow: inset 0 1px 0 rgba(255,255,255,0.55);
  position: relative;
  z-index: 1;
}

.card__name {
  margin: 0;
  font-size: 22px;
  font-weight: 800;
  line-height: 1.1;
  color: var(--ink);
}

.card__stats {
  margin: 6px 0 10px 0;
  font-size: 13px;
  font-weight: 700;
  letter-spacing: 0.02em;
  color: rgba(14, 18, 32, 0.72);
}

.card__desc {
  margin: 0;
  font-size: 14px;
  line-height: 1.35;
  color: rgba(14, 18, 32, 0.78);
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>