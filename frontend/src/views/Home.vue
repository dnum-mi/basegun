<template>
  <div class="home">
    <ResultsComponent v-if="store.imgUploaded" />
    <UploadComponent v-else />
  </div>
</template>

<script>
// @ is an alias to /src
import UploadComponent from '@/components/UploadComponent.vue';
import ResultsComponent from '@/components/ResultsComponent.vue';
import { store } from '@/store.js'

export default {
  name: 'HomePage',
  components: {
    UploadComponent,
    ResultsComponent
  },
  data() {
    return {
      store
    }
  }
}
</script>