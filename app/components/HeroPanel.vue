<script setup lang="ts">
import { SOCIALS } from '#shared/utils/site'

const props = defineProps<{ dimmed: boolean }>()
const { menuOpen, formSubmitted } = useSiteState()

const eyes = ref<HTMLElement>()

// The pupils follow the cursor (same maths as the original inline script).
function onPointerMove(event: PointerEvent) {
  if (frame) return
  frame = requestAnimationFrame(() => {
    frame = 0
    for (const eye of eyes.value?.querySelectorAll<HTMLElement>('.hero__eye') ?? []) {
      const rect = eye.getBoundingClientRect()
      const x = rect.left + rect.width / 2
      const y = rect.top + rect.height / 2
      const rotation = Math.atan2(event.clientX - x, event.clientY - y) * (180 / Math.PI) * -1 + 270
      eye.style.transform = `rotate(${rotation}deg)`
    }
  })
}

let frame = 0
onMounted(() => window.addEventListener('pointermove', onPointerMove, { passive: true }))
onBeforeUnmount(() => {
  window.removeEventListener('pointermove', onPointerMove)
  cancelAnimationFrame(frame)
})

// Clicking the dark panel closes whatever covers it: the open layer on
// desktop, the menu on tablet and mobile.
function onPanelClick(event: MouseEvent) {
  if (!props.dimmed || (event.target as HTMLElement).closest('a, button')) return
  if (window.matchMedia('(max-width: 991px)').matches) menuOpen.value = false
  else navigateTo('/')
}
</script>

<template>
  <header class="hero" :class="{ 'is-dimmed': dimmed }" @click="onPanelClick">
    <button
      class="hero__menu"
      type="button"
      :aria-expanded="menuOpen"
      aria-controls="contenu"
      @click.stop="menuOpen = !menuOpen"
    >
      <AppIcon name="menu" />
      <span class="visually-hidden">{{ menuOpen ? 'Fermer le menu' : 'Ouvrir le menu' }}</span>
    </button>

    <div class="hero__logo">
      <img src="/images/cuicui.svg" alt="Logo MARTIN B. LEVY" width="180" height="180" />
      <span ref="eyes" class="hero__eyes" aria-hidden="true">
        <span class="hero__eye"><span class="hero__pupil" /></span>
        <span class="hero__eye"><span class="hero__pupil" /></span>
      </span>
      <span v-if="formSubmitted" class="hero__thanks" role="status">Merci pour<br />votre message !</span>
    </div>

    <!-- The name comes first in the document (h1 before h2), CSS order puts it back at the bottom. -->
    <div class="hero__signature">
      <p class="hero__role">Product Builder<br />Creative Developer</p>
      <h1 class="hero__name">Martin B. Levy</h1>
    </div>

    <div class="hero__intro">
      <h2 class="hero__title">Façonnons ensemble votre projet digital.</h2>
      <p class="hero__text">
        Je réalise pour vous des projets de développement&nbsp;sur-mesure, porté par un esprit d'innovation, une
        expertise technique et&nbsp;une&nbsp;créativité sans limite.
      </p>
      <p class="hero__text">Depuis Marseille, je travaille partout en France.</p>
      <p class="hero__text">Rencontrons-nous sans plus attendre !</p>
      <NuxtLink to="/contact" class="pill hero__cta">Démarrer un projet</NuxtLink>
    </div>

    <ul class="hero__socials">
      <li v-for="social in SOCIALS" :key="social.name">
        <a
          :href="social.href"
          :title="social.name"
          :target="social.external ? '_blank' : undefined"
          :rel="social.external ? 'noopener' : undefined"
        >
          <AppIcon :name="social.icon" />
          <span class="visually-hidden">{{ social.name }}</span>
        </a>
      </li>
    </ul>
  </header>
</template>

<style scoped>
.hero {
  position: absolute;
  inset: 0 auto auto 0;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: space-between;
  row-gap: 24px;
  width: 100vw;
  height: 100dvh;
  padding: 112px 380px 60px 60px;
  overflow: auto;
  background-color: var(--ink);
  color: var(--cream);
  transition:
    transform 1s var(--ease-out),
    opacity 1s var(--ease-out),
    left 1s var(--ease-out);
}

.hero.is-dimmed {
  cursor: alias;
}

/* Menu button: tablet and mobile only. */
.hero__menu {
  position: absolute;
  top: 60px;
  right: 60px;
  display: none;
  width: 50px;
  height: 50px;
  color: var(--cream);
}

.hero__menu svg {
  width: 100%;
  height: 100%;
}

.hero__logo {
  position: relative;
  flex: none;
  display: block;
  width: 180px;
  height: 180px;
  border-radius: 200px;
  background-color: var(--cream);
  transform: translate(-30px, -82px);
  transition: background-color 1s var(--ease-out);
}

.is-dimmed .hero__logo {
  background-color: #f3ede280;
}

.hero__logo img {
  width: 100%;
  height: 100%;
}

.hero__eyes {
  position: absolute;
  top: 40%;
  right: 28%;
  display: flex;
  justify-content: space-between;
  width: 25%;
  height: 9%;
  transform: rotate(-6deg);
}

.hero__eye {
  display: flex;
  align-items: center;
  height: 100%;
  aspect-ratio: 1;
  padding: 1px;
  border: 1px solid #000;
  border-radius: 200px;
  background-color: #fff;
}

.hero__pupil {
  width: 50%;
  height: 50%;
  border-radius: 200px;
  background-color: #000;
}

@media (hover: none), (pointer: coarse) {
  .hero__eyes {
    display: none;
  }
}

.hero__thanks {
  position: absolute;
  top: 40%;
  right: -120%;
  color: #fff;
  font-size: 24px;
  font-weight: 800;
  letter-spacing: 2px;
  white-space: nowrap;
  mix-blend-mode: difference;
  opacity: 0;
  transform: translateY(-50%) rotate(-5deg);
  animation: thanks 5s 0.5s 1;
}

@keyframes thanks {
  0% {
    opacity: 0;
  }
  10%,
  90% {
    opacity: 1;
  }
  100% {
    opacity: 0;
  }
}

.hero__intro {
  flex: 1 0 auto;
  align-self: center;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: space-between;
  row-gap: 12px;
  max-width: 600px;
  max-height: 350px;
  transform: translateY(-52px);
  transition: opacity 1s var(--ease-out);
}

.hero__title {
  font-size: 24px;
  font-weight: 700;
  line-height: 1.3em;
  letter-spacing: 1px;
}

.hero__text {
  font-size: 18px;
  font-weight: 500;
  line-height: 1.3em;
  letter-spacing: 1px;
}

.hero__cta {
  margin-top: 24px;
  background-color: var(--cream);
  color: var(--ink);
}

.hero__signature {
  order: 1;
  align-self: flex-end;
  display: flex;
  flex-direction: column;
  transition: opacity 1s var(--ease-out);
}

.is-dimmed .hero__intro,
.is-dimmed .hero__signature {
  opacity: 0.3;
}

.hero__role {
  font-size: 18px;
  font-weight: 600;
  line-height: 1.3em;
  letter-spacing: 1px;
  text-align: right;
  mix-blend-mode: difference;
}

.hero__name {
  font-size: 3.5vw;
  font-weight: 700;
  letter-spacing: 2px;
  text-transform: uppercase;
  mix-blend-mode: difference;
  transform: translateX(-3px);
}

.hero__socials {
  order: 2;
  position: absolute;
  bottom: 60px;
  left: 60px;
  display: flex;
  column-gap: 12px;
}

.hero__socials a {
  display: flex;
  width: 20px;
  height: 20px;
}

.hero__socials svg {
  width: 100%;
  height: 100%;
}

@media (max-width: 991px) {
  .hero {
    padding: 112px 60px 60px;
  }

  .hero__menu {
    display: block;
  }

  .hero__socials a {
    width: 40px;
    height: 40px;
  }
}

@media (max-width: 767px) {
  .hero {
    padding: 30px;
  }

  .hero__menu {
    top: 30px;
    right: 30px;
    width: 40px;
    height: 40px;
  }

  .hero__logo {
    width: 100px;
    height: 100px;
    transform: none;
  }

  .hero__intro {
    transform: none;
  }

  .hero__title {
    font-size: 18px;
  }

  .hero__text {
    font-size: 14px;
  }

  .hero__cta {
    margin-top: 12px;
    padding: 8px 18px;
    font-size: 14px;
  }

  .hero__role {
    font-size: 14px;
  }

  .hero__name {
    font-size: 24px;
  }

  .hero__socials {
    position: static;
    align-self: flex-end;
    column-gap: 18px;
  }

  .hero__socials a {
    width: 35px;
    height: 35px;
  }
}
</style>
