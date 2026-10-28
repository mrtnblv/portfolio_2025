<script setup lang="ts">
// Five black bars: they fold up on first paint (pure CSS, so the page never
// stays hidden without JavaScript) and drop down before a page change.
const { loaderCovering } = useSiteState()
const route = useRoute()

watch(
  () => route.fullPath,
  () => {
    loaderCovering.value = false
  },
)
</script>

<template>
  <div class="loader" :class="{ 'is-covering': loaderCovering }" aria-hidden="true">
    <span v-for="i in 5" :key="i" class="loader__bar" :style="{ '--delay': `${(i - 1) * 100}ms` }" />
  </div>
</template>

<style scoped>
.loader {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 9999;
  display: flex;
  width: 100%;
  pointer-events: none;
}

.loader__bar {
  flex: 1 1 0;
  height: 0;
  background: #000;
  transition: height 0.5s ease var(--delay);
  animation: loader-intro 0.5s ease calc(var(--delay) + 150ms) backwards;
}

.loader.is-covering .loader__bar {
  height: 100vh;
}

@keyframes loader-intro {
  from {
    height: 100vh;
  }
  to {
    height: 0;
  }
}
</style>
