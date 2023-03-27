<script setup>
import { useRouter } from 'vue-router'

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

function onClickOnInfo () {
  router.push({ name: 'Home' })
}

</script>

<template>
  <div style="position: relative;">
    <DsfrHeader
      :quick-links="quickLinks"
      :logo-text="logoText"
      @click="onClickOnLogo"
    />
    <span
      class="information fr-icon-info-fill"
      aria-hidden="true"
      @click="onClickOnInfo"
    />
  </div>
</template>

<style scoped>
  .information {
    position: absolute;
    top: 40%;
    right: 32%;
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
</style>
