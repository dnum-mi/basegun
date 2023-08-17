<script setup>
import { useRoute, useRouter } from 'vue-router'

const router = useRouter()
const route = useRoute()

const logoText = [
  'Ministère',
  'de l’intérieur',
  'et des Outre-Mer',
]

const quickLinks = [
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
  router.push({ name: 'Start' })
}

function onClickOnInfo (event) {
  event.stopPropagation()
  router.push({ name: 'Home' })
}

</script>

<template>
  <DsfrHeader
    :quick-links="quickLinks"
    :logo-text="logoText"
    @click="onClickOnLogo"
  >
    <span
      v-if="route.name !== 'Home'"
      class="information fr-icon-info-line"
      aria-hidden="true"
      @click="onClickOnInfo"
    />
  </DsfrHeader>
</template>

<style scoped>
  :deep(.fr-container) {
    position: relative;
  }

  :deep(.fr-header__navbar .fr-btn--menu) {
    color : var(--text-action-high-blue-france);
  }

.information {
    position: absolute;
    top: 12%;
    right: 12%;
    z-index: 999;
    color: #000091;
    cursor: pointer;
  }

@screen lg {
  .information {
    --uno: top-4\/10 right-3.5\/10;
  }
}

</style>
