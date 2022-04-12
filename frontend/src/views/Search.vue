<template>
  <div>
    <ResultsComponent v-if="store.imgName" />
    <UploadComponent v-else />
  </div>
</template>

<script>
// @ is an alias to /src
import { store } from '@/store.js'
import UploadComponent from '@/components/UploadComponent.vue';
import ResultsComponent from '@/components/ResultsComponent.vue';

export default {
  name: 'SearchPage',
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