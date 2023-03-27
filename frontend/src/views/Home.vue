<script setup>
import { ref, onMounted } from 'vue'
import OnboardingSwiper from '@/components/OnboardingSwiper.vue'

import SplashScreen from './SplashScreen.vue'

const isLoading = ref(true)

onMounted(() => {
  setTimeout(() => {
    isLoading.value = false
  }, 1000)
})
</script>

<template>
  <div class="relative top-1/6 <md:top-4">
    <SplashScreen :is-loading="isLoading" />
    <div
      v-if="!isLoading"
      class="<lg:top-24 centered"
    >
      <OnboardingSwiper />
    </div>
  </div>
</template>
