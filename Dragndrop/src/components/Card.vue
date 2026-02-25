<template>
  <article class="card">
    <!-- Imagen (o placeholder si no hay) -->
    <div class="card__media">
      <img
        v-if="imageSrc"
        class="card__img"
        :src="imageSrc"
        :alt="name"
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
  width: 250px;
  height: 340px;
  border-radius: 22px;
  background: #ffffff;
  padding: 14px;
  box-sizing: border-box;
}

/* Imagen arriba */
.card__media {
  width: 100%;
}

.card__img,
.card__img-placeholder {
  width: 100%;
  height: 120px;
  border-radius: 18px;
  display: block;
  background: #bfbfbf; /* gris como placeholder */
}

/* Para que la imagen no se deforme */
.card__img {
  object-fit: cover;
}

/* Panel gris abajo */
.card__body {
  margin-top: 14px;
  background: #bfbfbf;
  border-radius: 18px;
  padding: 18px 16px;
  text-align: center;
  height: 130px;
}

.card__name {
  margin: 0;
  font-size: 24px;
  font-weight: 600;
  line-height: 1.1;
  color: #111;
}

.card__stats {
  margin: 6px 0 10px 0;
  font-size: 18px;
  font-weight: 500;
  color: #222;
}

.card__desc {
  margin: 0;
  font-size: 16px;
  line-height: 1.3;
  color: #222;
}
</style>