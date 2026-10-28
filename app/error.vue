<script setup lang="ts">
import type { NuxtError } from '#app'

const props = defineProps<{ error: NuxtError }>()
useSeoMeta({ title: props.error.statusCode === 404 ? 'Page introuvable | MARTIN B. LEVY' : 'Erreur | MARTIN B. LEVY', robots: 'noindex' })
</script>

<template>
  <main class="error">
    <img src="/images/cuicui.svg" alt="" width="120" height="120" class="error__logo" />
    <h1 class="error__title">{{ error.statusCode === 404 ? 'Cette page s’est envolée.' : 'Quelque chose s’est mal passé.' }}</h1>
    <button type="button" class="pill error__button" @click="clearError({ redirect: '/' })">Retour à l’accueil</button>
  </main>
</template>

<style scoped>
.error {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 24px;
  min-height: 100dvh;
  padding: 30px;
  color: var(--cream);
  text-align: center;
}

.error__logo {
  border-radius: 50%;
  background: var(--cream);
}

.error__title {
  font-size: 24px;
  font-weight: 700;
  letter-spacing: 1px;
}

.error__button {
  background: var(--cream);
  color: var(--ink);
}
</style>
