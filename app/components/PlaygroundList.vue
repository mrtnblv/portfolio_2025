<script setup lang="ts">
import type { PlaygroundItem } from '#shared/types/content'
import { PLAYGROUND_COLORS } from '#shared/utils/site'

const { data: items } = await useFetch<PlaygroundItem[]>('/api/content/playground', {
  key: 'playground',
  default: () => [],
})

const color = (index: number) => PLAYGROUND_COLORS[index % PLAYGROUND_COLORS.length]
</script>

<template>
  <p class="playground__big" aria-hidden="true">playgro</p>
  <ul class="playground">
    <li v-for="(item, index) in items" :key="item.number" :style="{ '--row-color': color(index) }">
      <a :href="item.url" target="_blank" rel="noopener" class="playground__row">
        <span class="playground__number">{{ item.number }}</span>
        <span class="playground__title">{{ item.title }}</span>
        <span v-if="item.categories.length" class="playground__tags">
          <span v-for="category in item.categories" :key="category" class="playground__tag">{{ category }}</span>
        </span>
      </a>
    </li>
  </ul>
</template>

<style scoped>
.playground__big {
  position: absolute;
  top: 0;
  right: 0;
  font-family: var(--font-serif);
  font-size: 100px;
  font-style: italic;
  font-weight: 400;
}

.playground {
  width: 100%;
  border-top: 1px dashed var(--ink);
}

.playground__row {
  display: flex;
  align-items: center;
  column-gap: 48px;
  padding: 8px 30px 8px 15px;
  border-bottom: 1px dashed var(--ink);
  cursor: crosshair;
}

.is-active .playground__row {
  cursor: help;
}

.playground__row:hover {
  background-color: var(--row-color);
}

.playground__number {
  flex: none;
  width: 30px;
  height: 30px;
  padding: 4px 5px 5px;
  border: 1px solid var(--row-color);
  border-radius: 200px;
  background-color: var(--row-color);
  font-size: 16px;
  font-weight: 300;
  text-align: center;
}

.playground__row:hover .playground__number {
  border-color: #000;
  background-color: var(--cream);
}

.playground__title {
  flex: 0 1 auto;
  color: var(--ink);
  font-family: var(--font-mono);
  font-size: 18px;
  font-weight: 300;
  line-height: 18px;
  letter-spacing: 2px;
}

.playground__tags {
  display: flex;
  align-items: center;
  column-gap: 12px;
}

.playground__tag {
  flex: 0 1 auto;
  padding: 3px 12px;
  border: 1px solid var(--ink);
  border-radius: 200px;
  color: var(--ink);
  font-size: 12px;
  line-height: 18px;
}

.playground__row:hover .playground__tag {
  background-color: var(--cream);
}

@media (max-width: 991px) {
  .playground__big {
    top: 60px;
    font-size: 80px;
  }
}

@media (max-width: 767px) {
  .playground__big {
    position: relative;
    top: auto;
    align-self: flex-end;
    transform: translateX(60px);
  }

  .playground__row {
    background-color: var(--cream);
  }

  .playground__tags {
    display: none;
  }
}
</style>
