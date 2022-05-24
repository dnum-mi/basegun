<template>
  <div class="home">
    <OnboardingSwiper />
  </div>
</template>

<script>
// @ is an alias to /src
import OnboardingSwiper from '@/components/OnboardingSwiper.vue';

export default {
  name: 'HomePage',
  components: {
    OnboardingSwiper
  }
}
</script>