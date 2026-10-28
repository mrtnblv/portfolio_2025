<script setup lang="ts">
import { PROJECT_CATEGORIES } from '#shared/utils/site'

const { formSubmitted } = useSiteState()

const form = reactive({ name: '', email: '', phone: '', company: '', description: '', website: '' })
const categories = ref<string[]>([])
const touched = ref(false)
const sending = ref(false)
const error = ref('')

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const nameInvalid = computed(() => touched.value && !form.name.trim())
const emailInvalid = computed(() => touched.value && !EMAIL.test(form.email.trim()))

function toggle(category: string) {
  const i = categories.value.indexOf(category)
  if (i === -1) categories.value.push(category)
  else categories.value.splice(i, 1)
}

async function submit() {
  touched.value = true
  error.value = ''
  if (nameInvalid.value || emailInvalid.value) return

  sending.value = true
  try {
    await $fetch('/api/contact', { method: 'POST', body: { ...form, categories: categories.value } })
    Object.assign(form, { name: '', email: '', phone: '', company: '', description: '', website: '' })
    categories.value = []
    touched.value = false
    formSubmitted.value = true
    await navigateTo('/')
  } catch {
    error.value = `L'envoi n'a pas abouti. Réessayez, ou écrivez-moi directement à contact@martinblevy.com.`
  } finally {
    sending.value = false
  }
}
</script>

<template>
  <form class="contact" novalidate @submit.prevent="submit">
    <div class="contact__header">
      <h3 class="contact__title">Rencontrons-nous !</h3>
      <div>
        <p class="contact__subtitle">Prêt à construire un nouveau projet ?</p>
        <p class="contact__subtitle">Décrivez ici votre projet et laissez-moi vos coordonnées.</p>
      </div>
    </div>

    <div class="contact__fields">
      <div class="contact__field">
        <label for="contact-name" class="contact__label" :class="{ 'is-error': nameInvalid }">Nom *</label>
        <input
          id="contact-name"
          v-model="form.name"
          class="contact__input"
          type="text"
          name="name"
          autocomplete="name"
          required
          :aria-invalid="nameInvalid"
        />
      </div>
      <div class="contact__field">
        <label for="contact-email" class="contact__label" :class="{ 'is-error': emailInvalid }">Email *</label>
        <input
          id="contact-email"
          v-model="form.email"
          class="contact__input contact__input--email"
          type="email"
          name="email"
          autocomplete="email"
          required
          :aria-invalid="emailInvalid"
        />
      </div>
      <div class="contact__field">
        <label for="contact-phone" class="contact__label">Téléphone</label>
        <input id="contact-phone" v-model="form.phone" class="contact__input" type="tel" name="phone" autocomplete="tel" />
      </div>
      <div class="contact__field">
        <label for="contact-company" class="contact__label">Entreprise</label>
        <input
          id="contact-company"
          v-model="form.company"
          class="contact__input"
          type="text"
          name="company"
          autocomplete="organization"
        />
      </div>
    </div>

    <fieldset class="contact__categories">
      <legend class="contact__label">En quoi consiste votre projet ?</legend>
      <div class="contact__chips">
        <button
          v-for="category in PROJECT_CATEGORIES"
          :key="category"
          type="button"
          class="contact__chip"
          :class="{ 'is-selected': categories.includes(category) }"
          :aria-pressed="categories.includes(category)"
          @click="toggle(category)"
        >
          {{ category }}
        </button>
      </div>
    </fieldset>

    <div class="contact__description">
      <label for="contact-description" class="contact__label">Décrivez votre projet</label>
      <textarea
        id="contact-description"
        v-model="form.description"
        class="contact__textarea"
        name="description"
        rows="5"
        placeholder="Dans les grandes lignes..."
      />
    </div>

    <div class="contact__honeypot" aria-hidden="true">
      <label for="contact-website">Site web</label>
      <input id="contact-website" v-model="form.website" type="text" name="website" tabindex="-1" autocomplete="off" />
    </div>

    <p v-if="error" class="contact__error" role="alert">{{ error }}</p>

    <div class="contact__submit">
      <button type="submit" class="pill contact__button" :disabled="sending">Envoyer</button>
    </div>
  </form>
</template>

<style scoped>
.contact {
  display: flex;
  flex-direction: column;
  row-gap: 32px;
  width: 90%;
  max-width: 650px;
  color: var(--ink);
}

.contact__header {
  display: flex;
  flex-direction: column;
  row-gap: 16px;
}

.contact__title {
  font-size: 48px;
  font-weight: 900;
}

.contact__subtitle {
  font-size: 18px;
  font-weight: 600;
}

.contact__fields {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 32px;
}

.contact__field {
  display: flex;
  flex-direction: column;
}

.contact__label {
  padding: 0;
  font-size: 16px;
  font-weight: 600;
}

.contact__label.is-error {
  color: var(--error);
}

.contact__input,
.contact__textarea {
  width: 100%;
  padding: 8px 16px;
  border: none;
  border-bottom: 1px solid #000;
  border-radius: 0;
  background-color: transparent;
  font: inherit;
  font-size: 16px;
  font-weight: 400;
  color: #000;
  outline: none;
}

.contact__input--email {
  padding: 12px 16px;
}

.contact__input:focus-visible,
.contact__textarea:focus-visible {
  border-bottom-width: 2px;
  margin-bottom: -1px;
}

.contact__categories {
  display: flex;
  flex-direction: column;
  row-gap: 16px;
  margin: 0;
  padding: 0;
  border: 0;
}

.contact__categories legend {
  float: left;
  width: 100%;
}

.contact__chips {
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
}

.contact__chip {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 8px 16px;
  border: 1px solid var(--ink);
  border-radius: 50px;
  color: var(--ink);
  font-size: 14px;
  opacity: 0.5;
  transition: all 0.2s ease;
}

.contact__chip:hover,
.contact__chip:focus-visible {
  opacity: 1;
}

.contact__chip.is-selected {
  opacity: 1;
  background-color: var(--ink);
  color: var(--cream);
}

.contact__description {
  display: flex;
  flex-direction: column;
  row-gap: 16px;
}

.contact__textarea {
  display: block;
  padding: 16px;
  resize: vertical;
}

.contact__textarea::placeholder {
  color: #757575;
}

.contact__honeypot {
  position: absolute;
  left: -10000px;
  width: 1px;
  height: 1px;
  overflow: hidden;
}

.contact__error {
  color: var(--error);
  font-weight: 600;
}

.contact__submit {
  display: flex;
  justify-content: flex-end;
  margin-top: 16px;
}

.contact__button {
  background-color: var(--ink);
  color: var(--cream);
}

.contact__button:disabled {
  opacity: 0.5;
  cursor: progress;
}

@media (max-width: 767px) {
  .contact {
    width: auto;
    padding-right: 20px;
  }

  .contact__title {
    font-size: 24px;
  }

  .contact__subtitle {
    font-size: 16px;
  }

  .contact__fields {
    grid-template-columns: 1fr;
  }

  .contact__chips {
    gap: 8px;
  }

  .contact__chip {
    padding: 6px 12px;
  }
}
</style>
