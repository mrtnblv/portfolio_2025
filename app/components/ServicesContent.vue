<script setup lang="ts">
import { SERVICES } from '~/utils/services'
</script>

<template>
  <div class="services">
    <article v-for="block in SERVICES" :key="block.title" class="services__block" :class="{ 'has-tools': block.tools }">
      <h3 class="services__title">{{ block.title }}</h3>
      <p v-for="(paragraph, i) in block.paragraphs" :key="i" class="services__text">
        <em v-if="block.italic?.includes(i)">{{ paragraph }}</em>
        <template v-else>{{ paragraph }}</template>
      </p>
      <ToolsMarquee v-if="block.tools" class="services__tools" />
    </article>
  </div>
</template>

<style scoped>
.services {
  display: flex;
  flex-direction: column;
  row-gap: 50px;
  width: 60%;
}

.services__block {
  position: relative;
  display: flex;
  flex-direction: column;
  row-gap: 12px;
}

.services__block.has-tools {
  padding-bottom: 80px;
}

.services__title {
  color: var(--ink);
  font: 700 36px/40px var(--font-sans);
}

.services__text {
  color: var(--ink);
  font-size: 16px;
  font-weight: 500;
  line-height: 1.3em;
}

.services__tools {
  position: absolute;
  bottom: 0;
  left: 0;
  width: calc(100vw - 330px - 60px);
}

@media (max-width: 991px) {
  .services {
    width: 100%;
    max-width: 700px;
  }

  .services__tools {
    width: 100%;
  }
}

@media (max-width: 767px) {
  .services {
    width: auto;
    padding-right: 20px;
  }

  .services__title {
    font: 700 24px/30px var(--font-sans);
  }

  .services__text {
    font-size: 14px;
  }
}
</style>
