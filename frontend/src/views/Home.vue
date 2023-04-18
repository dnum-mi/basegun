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
  <div
    v-if="isLoading"
    class="relative <lg:top-24"
  >
    <SplashScreen :is-loading="isLoading" />
  </div>
  <div
    v-else
    class="<lg:top-24"
  >
    <OnboardingSwiper />
  </div>
</template>
