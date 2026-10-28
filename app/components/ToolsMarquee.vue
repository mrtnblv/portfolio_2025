<script setup lang="ts">
import type { Tool } from '#shared/types/content'

const { data } = await useFetch<Tool[]>('/api/content/tools.json', { key: 'tools', default: () => [] })
prerenderMedia(data.value)

// Shuffled once per visit, after hydration so the server and client markup match.
const tools = ref<Tool[]>(data.value)
onMounted(() => {
  const shuffled = [...data.value]
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[shuffled[i], shuffled[j]] = [shuffled[j]!, shuffled[i]!]
  }
  tools.value = shuffled
})
</script>

<template>
  <div v-if="tools.length" class="marquee">
    <ul class="marquee__track" aria-label="Outils">
      <li v-for="tool in tools" :key="tool.name">
        <img :src="tool.logo!.url" :alt="`Logo ${tool.name}`" width="40" height="40" loading="lazy" />
      </li>
      <li v-for="tool in tools" :key="`${tool.name}-copy`" aria-hidden="true">
        <img :src="tool.logo!.url" alt="" width="40" height="40" loading="lazy" />
      </li>
    </ul>
    <span class="marquee__fade" />
    <span class="marquee__fade marquee__fade--end" />
  </div>
</template>

<style scoped>
.marquee {
  display: block;
  height: 50px;
  overflow: hidden;
}

.marquee__track {
  display: inline-flex;
  align-items: center;
  column-gap: 12px;
  padding: 5px 0;
  white-space: nowrap;
  animation: marquee 12s linear infinite;
}

.marquee__track img {
  width: 40px;
  height: 40px;
  border-radius: 4px;
  object-fit: contain;
}

@keyframes marquee {
  from {
    transform: translateX(0);
  }
  to {
    transform: translateX(-50%);
  }
}

.marquee__fade {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  width: 40px;
  height: 50px;
  box-shadow: inset 20px 0 10px var(--cream);
}

@media (max-width: 991px) {
  .marquee__fade {
    left: -1px;
  }

  .marquee__fade--end {
    right: -1px;
    left: auto;
    transform: rotate(180deg);
  }
}
</style>
