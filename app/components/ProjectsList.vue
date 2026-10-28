<script setup lang="ts">
import type { Project } from '#shared/types/content'

const props = defineProps<{ active: boolean }>()
const { data: projects } = await useFetch<Project[]>('/api/content/projects', { key: 'projects', default: () => [] })
const { navigateWithLoader } = useSiteState()

function open(event: MouseEvent, project: Project) {
  // While the layer is closed, a click only opens the layer (handled by LayerPanel).
  if (!props.active) return
  if (event.metaKey || event.ctrlKey || event.shiftKey || event.button !== 0) return
  event.preventDefault()
  navigateWithLoader(`/projet/${project.slug}`)
}
</script>

<template>
  <ul class="projects">
    <li v-for="project in projects" :key="project.slug">
      <a :href="`/projet/${project.slug}`" class="project" @click="open($event, project)">
        <span class="project__thumb">
          <img
            v-if="project.cover"
            :src="project.cover.url"
            :width="project.cover.width"
            :height="project.cover.height"
            alt=""
            loading="lazy"
          />
        </span>
        <span class="project__info">
          <span class="project__title-wrap">
            <span class="project__title">{{ project.title }}</span>
            <span class="project__underline" />
          </span>
          <span class="project__year">{{ project.year }}</span>
        </span>
      </a>
    </li>
  </ul>
</template>

<style scoped>
.projects {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  row-gap: 24px;
  width: 100%;
  padding: 0 2px;
}

.projects li {
  display: contents;
}

.project {
  display: flex;
  column-gap: 24px;
  width: 80%;
  max-width: 80%;
  outline: 2px solid var(--ink);
  box-shadow: 0 4px 12px 0 #1010104d;
  cursor: crosshair;
}

.is-active .project {
  cursor: zoom-in;
}

.project__thumb {
  display: flex;
  flex-direction: column;
  border-right: 2px solid var(--ink);
}

.project__thumb img {
  width: 150px;
  height: auto;
  aspect-ratio: 1.33;
  object-fit: cover;
  filter: grayscale(100%);
  opacity: 0.5;
  transition:
    opacity 0.5s ease,
    filter 0.5s ease;
}

.project:hover .project__thumb img {
  opacity: 1;
}

.project__info {
  flex: 0 0 auto;
  align-self: center;
  display: flex;
  flex-direction: column;
  row-gap: 4px;
  color: var(--ink);
}

.project__title-wrap {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}

.project__title {
  position: relative;
  z-index: 2;
  font-size: 28px;
  font-weight: 700;
  line-height: 31px;
  text-shadow:
    3px 0 0 var(--cream),
    -3px 0 0 var(--cream),
    0 3px 0 var(--cream),
    0 -3px 0 var(--cream);
}

.project__underline {
  position: relative;
  z-index: 1;
  width: 0;
  height: 3px;
  background-color: var(--ink);
  transform: translateY(-2px);
  transition: width 0.3s ease;
}

.project:hover .project__underline {
  width: 100%;
}

.project__year {
  font-size: 14px;
  font-weight: 700;
}

@media (max-width: 767px) {
  .projects {
    width: auto;
    padding: 0 25px 0 5px;
  }

  .project {
    width: auto;
    max-width: 100%;
  }

  .project__thumb img {
    width: 130px;
    aspect-ratio: 1.5;
  }

  .project__underline {
    height: 2px;
  }
}
</style>
