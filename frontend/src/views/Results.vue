<template>
  <div>
    <ResultsComponent v-if="store.img" />
    <Instructions v-else />
  </div>
</template>
  
  <script>
  import { store } from '@/store/store.js'
  import ResultsComponent from '@/components/ResultsComponent.vue';
  import Instructions from '@/views/Instructions.vue';

  export default {
    name: 'ResultsPage',
    components: {
    ResultsComponent,
    Instructions,
  },

    beforeRouteLeave(){
        store.uploadMessage = null 
        store.instructionsRead = null
        store.isInstruction = null
        store.isDisplayHeader = true
    },

    data() {
      return {
        store,
      }
    },
    
  }
  </script>