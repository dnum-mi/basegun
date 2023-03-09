<script setup>
import { useRouter } from 'vue-router'

const router = useRouter()

const logoText = [
  'Ministère',
  'de l’intérieur',
  'et de l\'Outre-Mer',
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

</script>

<template>
  <div>
    <DsfrHeader
      v-model="modelValue"
      :quick-links="quickLinks"
      :logo-text="logoText"
      @click="onClickOnLogo"
    />
  </div>
</template>
