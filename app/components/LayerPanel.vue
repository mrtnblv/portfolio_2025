<script setup lang="ts">
import type { LayerConfig } from '#shared/utils/site'

const props = defineProps<{ layer: LayerConfig; activeIndex: number }>()
const { menuOpen } = useSiteState()

const isOpen = computed(() => props.activeIndex >= props.layer.index)
const isActive = computed(() => props.activeIndex === props.layer.index)
const href = computed(() => `/${props.layer.slug}`)

// The whole visible strip of a closed layer opens it, like in the original.
// Keyboard and assistive tech users get the real link in the label.
function onClick(event: MouseEvent) {
  if (isActive.value) return
  event.preventDefault()
  menuOpen.value = false
  navigateTo(href.value)
}
</script>

<template>
  <section
    :id="layer.slug"
    class="layer"
    :class="[`layer--${layer.slug}`, { 'is-open': isOpen, 'is-active': isActive, 'is-menu': menuOpen }]"
    :style="{
      '--layer-width': `${layer.width}px`,
      '--layer-closed': `${layer.closed}px`,
      '--layer-opened': `${layer.opened}px`,
      '--layer-closed-t': `${layer.closedTablet}px`,
      '--layer-closed-m': `${layer.closedMobile}px`,
      zIndex: layer.index * 10,
    }"
    :aria-labelledby="`${layer.slug}-label`"
    @click="onClick"
  >
    <h2 :id="`${layer.slug}-label`" class="layer__label">
      <NuxtLink :to="href" :aria-current="isActive ? 'page' : undefined">{{ layer.label }}</NuxtLink>
    </h2>

    <NuxtLink to="/" class="layer__back" @click.stop="menuOpen = false">
      <span class="layer__back-icon">
        <AppIcon name="arrow-top-left" />
        <AppIcon name="arrow-elbow-left" />
      </span>
      Retour
    </NuxtLink>

    <div class="layer__scroll" :inert="!isActive">
      <slot />
    </div>
  </section>
</template>

<style scoped>
.layer {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: space-between;
  gap: 50px;
  width: calc(100vw - var(--layer-width));
  padding: 112px 60px 60px;
  overflow: hidden;
  background-color: var(--cream);
  box-shadow: 0 0 50px #0000004d;
  cursor: crosshair;
  transform: translateX(calc(100vw - var(--layer-closed)));
  transition:
    transform 1s var(--ease-out),
    opacity 1s var(--ease-out),
    left 1s var(--ease-out);
}

.layer:hover {
  left: -10px;
}

.layer.is-open {
  transform: translateX(var(--layer-opened));
}

.layer.is-active {
  cursor: auto;
}

.layer__label {
  position: absolute;
  top: 30px;
  left: 10px;
  font-size: 16px;
  font-weight: 600;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  writing-mode: sideways-lr;
  text-orientation: mixed;
}

@supports not (writing-mode: sideways-lr) {
  .layer__label {
    writing-mode: vertical-rl;
    transform: rotate(180deg);
  }
}

.layer__label a {
  cursor: inherit;
}

/* "Retour": tablet and mobile only. */
.layer__back {
  position: absolute;
  z-index: 100;
  display: none;
  align-items: flex-start;
  column-gap: 8px;
  color: var(--ink);
  font-size: 16px;
  font-weight: 600;
  text-transform: uppercase;
  cursor: pointer;
}

.layer__back-icon {
  display: flex;
  align-self: center;
  width: 20px;
  height: 20px;
}

.layer__back-icon svg {
  width: 100%;
  height: 100%;
}

.layer__back-icon svg + svg,
.layer__back:hover .layer__back-icon svg:first-child {
  display: none;
}

.layer__back:hover .layer__back-icon svg + svg {
  display: block;
}

.layer__scroll {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 60px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 112px 0;
  overflow: auto;
}

/* Per-layer differences, as set in Weweb. */
.layer--projets,
.layer--contact {
  box-shadow: 0 0 50px #1010104d;
}

.layer--projets {
  align-items: stretch;
  box-shadow: 0 0 50px #0000004d;
}

.layer--projets .layer__label,
.layer--pl4ygr0und .layer__label {
  color: var(--ink);
}

.layer--pl4ygr0und .layer__label {
  font-family: var(--font-mono);
  letter-spacing: 0.15em;
}

.layer--projets .layer__scroll {
  right: -60px;
  align-items: stretch;
}

.layer--pl4ygr0und .layer__scroll {
  left: 0;
  align-items: stretch;
  padding: 180px 0 0;
}

@media (max-width: 991px) {
  .layer--services .layer__scroll,
  .layer--contact .layer__scroll {
    right: -60px;
  }

  .layer--pl4ygr0und {
    padding: 60px 0;
  }
}

@media (max-width: 991px) {
  .layer {
    width: 100vw;
    padding: 60px;
    transform: translateX(100vw);
  }

  .layer:hover {
    left: 0;
  }

  .layer.is-active,
  .layer.is-menu.is-open {
    transform: translateX(0);
  }

  .layer.is-menu:not(.is-open) {
    transform: translateX(calc(100vw - var(--layer-closed-t)));
  }

  .layer--services.is-menu:not(.is-open) {
    transform: translateX(var(--layer-closed-t));
  }

  .layer__back {
    top: 30px;
    right: 30px;
    display: flex;
    padding: 24px;
  }
}

@media (max-width: 767px) {
  .layer {
    padding: 60px 20px 60px 40px;
  }

  .layer.is-menu:not(.is-open) {
    transform: translateX(calc(100vw - var(--layer-closed-m)));
  }

  .layer--services.is-menu:not(.is-open) {
    transform: translateX(var(--layer-closed-m));
  }

  .layer__back {
    top: 0;
    right: 0;
  }

  .layer__scroll,
  .layer--services .layer__scroll,
  .layer--projets .layer__scroll,
  .layer--contact .layer__scroll {
    right: 0;
    left: 40px;
    padding: 80px 0;
  }

  .layer--pl4ygr0und {
    padding: 30px 0;
  }

  .layer--pl4ygr0und .layer__scroll {
    gap: 24px;
    padding: 50px 0;
  }
}
</style>
