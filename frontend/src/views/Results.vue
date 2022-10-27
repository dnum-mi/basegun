<template>
  <div>
    <ResultsComponent v-if="store.img" />
    <UploadComponent v-else />
  </div>
</template>
  
  <script>
  // @ is an alias to /src
  import { store } from '@/store/store.js'
  import ResultsComponent from '@/components/ResultsComponent.vue';
  import UploadComponent from '@/components/UploadComponent.vue';

  export default {
    name: 'ResultsPage',
    components: {
      ResultsComponent,
      UploadComponent,   
    },
    data() {
      return {
        store,
      }
    },
  }
  </script>