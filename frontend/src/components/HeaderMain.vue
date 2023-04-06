<script setup>
import { useRouter } from 'vue-router'
import { isPreprod } from '@/config.js'

const router = useRouter()

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
      v-if="isPreprod"
      class="preprod information mr-24"
    >
      Preprod
    </span>
    <span
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

  .preprod {
    font-weight: 700;
    color: #fff !important;
    background-color: #000091;
    padding: .25rem .5rem;
    border-radius: .6rem;
  }

  .information {
    position: absolute;
    top: 40%;
    right: 30%;
    z-index: 999;
    color: #000091;
    cursor: pointer;
  }

@media (max-width: 1024px) {
  .information {
    top: 12%;
    right: 12%;
  }
}
.banner {
  padding: .5rem 1rem;
  position: relative;
  left: 5%;
  /* transform: rotate(-20deg); */
}

.nav-container {
  margin: 0.2em auto;
  display: flex;
  justify-content: space-between;
}
</style>
