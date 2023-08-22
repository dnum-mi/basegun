<script setup>
import {
  useRouter,
} from 'vue-router'

const router = useRouter()

const isMobile = window.innerWidth <= 640

const logoText = !isMobile
  ? [
      'Ministère',
      'de l’intérieur',
      'et des Outre-Mer',
    ]
  : []

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

function onClickOnLogo () {
  router.push({ name: 'StartPage' })
}

</script>

<template>
  <DsfrHeader
    :quick-links="quickLinks"
    :logo-text="logoText"
    @click="onClickOnLogo"
  />
</template>

<style scoped>
:deep(.fr-container) {
  position: relative;
}

@screen lt-sm {
  :deep(.fr-logo::after) {
    display: none;
  }
}

:deep(.fr-header__navbar .fr-btn--menu) {
  color : var(--text-action-high-blue-france);
}

:deep(.fr-header__logo .fr-logo::before) {
  background-size: cover;
  background-position: inherit;
  height: 1.2rem;
  margin-bottom: .25rem;
  width: 3rem;
}

.information {
    position: absolute;
    top: 12%;
    right: 12%;
    z-index: 999;
    color: var(--blue-france-sun-113-625);
    cursor: pointer;
  }

</style>
