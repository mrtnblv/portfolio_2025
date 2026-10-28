<script setup lang="ts">
import type { Project } from '#shared/types/content'
import { SITE } from '#shared/utils/site'

const route = useRoute()
const { navigateWithLoader } = useSiteState()

const { data: projects } = await useFetch<Project[]>('/api/content/projects.json', { key: 'projects', default: () => [] })
prerenderMedia(projects.value)
const project = computed(() => projects.value.find(p => p.slug === route.params.slug))

if (!project.value) {
  throw createError({ statusCode: 404, statusMessage: 'Projet introuvable', fatal: true })
}

const details = computed(() =>
  [
    { label: 'Client', value: project.value!.client },
    { label: 'Année', value: project.value!.year },
    { label: 'Rôle', value: project.value!.role },
    { label: 'Collaboration', value: project.value!.collaboration },
    { label: 'Technique', value: project.value!.technique },
  ].filter(detail => detail.value),
)

const description = computed(() => {
  const text = project.value!.description.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim()
  return text.length > 160 ? `${text.slice(0, 157)}…` : text || SITE.defaultDescription
})

useSeoMeta({
  title: () => `${project.value!.title} | ${SITE.name}`,
  description,
  ogTitle: () => `${project.value!.title} | ${SITE.name}`,
  ogDescription: description,
  ogType: 'article',
  ogUrl: () => `${SITE.url}/projet/${project.value!.slug}`,
  ogImage: () => project.value!.ogImage ?? `${SITE.url}${SITE.image}`,
})
useHead({ link: [{ rel: 'canonical', href: () => `${SITE.url}/projet/${project.value!.slug}` }] })

function back(event: MouseEvent) {
  if (event.metaKey || event.ctrlKey || event.shiftKey || event.button !== 0) return
  event.preventDefault()
  navigateWithLoader('/projets')
}
</script>

<template>
  <main v-if="project" class="project-page">
    <div class="project-page__inner">
      <div class="project-page__left">
        <div class="project-page__sticky">
          <div class="project-page__intro">
            <h1 class="project-page__title">{{ project.title }}</h1>
            <!-- Written by Martin in Baserow, rendered at build time. -->
            <div class="project-page__description" v-html="project.description" />
          </div>

          <dl class="project-page__details">
            <div v-for="detail in details" :key="detail.label" class="project-page__detail">
              <dt>{{ detail.label }}</dt>
              <dd>{{ detail.value }}</dd>
            </div>
          </dl>

          <a href="/projets" class="project-page__back" @click="back">
            <AppIcon name="arrow-left" />
            <span>RETOUR AUX PROJETS</span>
          </a>
        </div>
      </div>

      <div class="project-page__shots">
        <figure v-for="(shot, index) in project.shots" :key="shot.url" class="project-page__shot">
          <img
            :src="shot.url"
            :srcset="shot.srcset"
            sizes="(max-width: 991px) 100vw, 55vw"
            :width="shot.width"
            :height="shot.height"
            :alt="`Capture d'écran #${index + 1} du projet ${project.title}`"
            :loading="index === 0 ? 'eager' : 'lazy'"
          />
        </figure>
      </div>
    </div>
  </main>
</template>

<style scoped>
.project-page {
  height: 100svh;
  overflow: auto;
  color: var(--cream);
}

.project-page__inner {
  display: flex;
  align-items: flex-start;
  column-gap: 40px;
  padding: 60px;
}

.project-page__left {
  flex: none;
  width: 40%;
  align-self: stretch;
}

.project-page__sticky {
  position: sticky;
  top: 80px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  row-gap: 24px;
}

.project-page__intro {
  display: flex;
  flex-direction: column;
  row-gap: 12px;
}

.project-page__title {
  font: 700 48px/52px var(--font-sans);
}

.project-page__description {
  font-size: 16px;
}

.project-page__description :deep(p) {
  margin: 0;
  font-size: 14px;
  font-weight: 400;
  line-height: 24px;
}

.project-page__description :deep(a) {
  font-size: 16px;
  text-decoration: underline;
}

.project-page__description :deep(h1),
.project-page__description :deep(h2) {
  margin: 42px 0 24px;
  font-size: 38px;
  font-weight: 600;
  line-height: 32px;
}

.project-page__description :deep(h2) {
  font-size: 32px;
}

.project-page__description :deep(h3) {
  margin: 24px 0;
  font-size: 24px;
  font-weight: 600;
  line-height: 32px;
}

.project-page__description :deep(h4) {
  margin: 18px 0 12px;
  font-size: 16px;
  font-weight: 600;
  line-height: 32px;
}

.project-page__description :deep(ul) {
  padding-left: 1.2em;
  list-style: disc;
}

.project-page__description :deep(img),
.project-page__description :deep(iframe) {
  width: 100%;
  margin: 24px 0;
}

.project-page__details {
  display: flex;
  flex-direction: column;
  row-gap: 8px;
  margin: 0;
}

.project-page__detail {
  display: flex;
  column-gap: 12px;
  font-size: 14px;
}

.project-page__detail dt {
  flex: none;
  width: 90px;
  text-align: right;
}

.project-page__detail dd {
  margin: 0;
  font-weight: 300;
  line-height: 20px;
}

.project-page__back {
  align-self: flex-start;
  display: flex;
  align-items: center;
  column-gap: 8px;
  margin-top: 24px;
  font-size: 14px;
}

.project-page__back svg {
  width: 20px;
  height: 20px;
}

.project-page__shots {
  flex: 1 1 0;
  min-width: 0;
  display: flex;
  flex-direction: column;
}

.project-page__shot {
  padding: 8px;
}

.project-page__shot img {
  display: block;
  width: 100%;
  height: auto;
}

@media (max-width: 991px) {
  .project-page__inner {
    flex-direction: column;
  }

  .project-page__left {
    width: 70%;
  }

  .project-page__shots {
    flex: none;
    width: 100%;
  }
}

@media (max-width: 767px) {
  .project-page__inner {
    row-gap: 40px;
    padding: 60px 0;
  }

  .project-page__left {
    width: 100%;
  }

  .project-page__sticky {
    padding: 0 20px;
  }
}
</style>
