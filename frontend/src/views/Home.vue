<template>
  <div class="home">
    <!-- <ResultsComponent v-if="store.imgName" />
    <UploadComponent v-else /> -->
    <OnboardingSwiper />
  </div>
</template>

<script>
// @ is an alias to /src
import { store } from '@/store.js'
import UploadComponent from '@/components/UploadComponent.vue';
import ResultsComponent from '@/components/ResultsComponent.vue';
import OnboardingSwiper from '@/components/OnboardingSwiper.vue';

export default {
  name: 'HomePage',
  components: {
    UploadComponent,
    ResultsComponent,
    OnboardingSwiper
  },
  data() {
    return {
      store
    }
  }
}
</script>