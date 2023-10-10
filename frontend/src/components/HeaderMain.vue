<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()

const wholeLogo = computed(() => route.meta.wholeLogo)

const isMobile = window.innerWidth <= 640

const logoText = computed(() => (!isMobile || wholeLogo.value)
  ? ['Ministère',
      'de l’intérieur',
      'et des Outre-Mer']
  : [])

const quickLinks = [
  {
    label: 'Important',
    to: '/',
  },
  {
    label: 'A propos',
    to: '/a-propos',
  },
  {
    label: 'Mentions légales',
    to: '/mentions-legales',
  },
  {
    label: 'Contact',
    to: '/contact',
  },
]

</script>

<template>
  <DsfrHeader
    :class="{ 'marianne-only': !wholeLogo }"
    :quick-links="quickLinks"
    :show-beta="true"
    service-title=" "
    :home-to="{ name: 'StartPage' }"
    :logo-text="logoText"
  />
</template>

<style scoped>
:deep(.fr-container) {
  position: relative;
}

@screen lt-sm {
  .marianne-only :deep(.fr-logo::after) {
    display: none;
  }
}

:deep(.fr-header__navbar .fr-btn--menu) {
  color : var(--text-action-high-blue-france);
}

.marianne-only :deep(.fr-header__logo .fr-logo::before) {
  background-size: cover;
  background-position: inherit;
  height: 1.2rem;
  margin-bottom: .25rem;
  width: 3rem;
}

:deep(.fr-header__service) {
  box-shadow: none;
  margin: 0;
  padding: 0;
  height: 0;
}

:deep(.fr-badge) {
  position: absolute;
  left: 4.25rem;
  bottom: 1rem;
}

</style>
