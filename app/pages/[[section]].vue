<script setup lang="ts">
import { LAYERS, SITE } from '#shared/utils/site'

// One page for "/", "/services", "/projets", "/pl4ygr0und" and "/contact":
// the same instance is kept between them so the layers can slide.
definePageMeta({
  key: 'layers',
  validate: route => {
    const section = route.params.section
    return !section || LAYERS.some(layer => layer.slug === section)
  },
})

const route = useRoute()
const { menuOpen, formSubmitted } = useSiteState()

const current = computed(() => LAYERS.find(layer => layer.slug === route.params.section))
const activeIndex = computed(() => current.value?.index ?? 0)

watch(
  () => route.params.section,
  section => {
    menuOpen.value = false
    if (section === 'contact') formSubmitted.value = false
  },
)

const title = computed(() => (current.value ? `${current.value.title} | ${SITE.name}` : SITE.defaultTitle))
const description = computed(() => current.value?.description ?? SITE.defaultDescription)
// The sections are views of one page: they all point search engines to "/".
const url = `${SITE.url}/`

useSeoMeta({
  title,
  description,
  ogTitle: title,
  ogDescription: description,
  ogType: 'website',
  ogUrl: url,
  ogImage: `${SITE.url}${SITE.image}`,
})

useHead({
  link: [{ rel: 'canonical', href: url }],
  script: [
    {
      type: 'application/ld+json',
      innerHTML: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'Person',
        name: 'Martin B. Levy',
        jobTitle: 'Product Builder freelance',
        url: SITE.url,
        email: `mailto:${SITE.email}`,
        address: { '@type': 'PostalAddress', addressLocality: 'Marseille', addressCountry: 'FR' },
        sameAs: ['https://github.com/mrtnblv', 'https://www.linkedin.com/in/martinblevy/'],
      }),
    },
  ],
})
</script>

<template>
  <div class="site">
    <a href="#contenu" class="skip-link">Aller au contenu</a>

    <HeroPanel :dimmed="activeIndex > 0 || menuOpen" />

    <main id="contenu" class="layers">
      <LayerPanel v-for="layer in LAYERS" :key="layer.slug" :layer="layer" :active-index="activeIndex">
        <ServicesContent v-if="layer.slug === 'services'" />
        <ProjectsList v-else-if="layer.slug === 'projets'" :active="activeIndex === layer.index" />
        <PlaygroundList v-else-if="layer.slug === 'pl4ygr0und'" />
        <ContactForm v-else />
      </LayerPanel>
    </main>
  </div>
</template>

<style scoped>
.site {
  position: relative;
  width: 100%;
  height: 100dvh;
  overflow: hidden;
}

.layers {
  position: absolute;
  inset: 0;
  overflow: hidden;
  pointer-events: none;
}

.layers > :deep(.layer) {
  pointer-events: auto;
}
</style>
