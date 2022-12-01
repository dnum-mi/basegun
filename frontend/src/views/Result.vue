<template>
  <div>
    <ResultComponent v-if="store.img" />
  </div>
</template>
  
  <script>
  import { store } from '@/store/store.js'
  import ResultComponent from '@/components/ResultComponent.vue';
  import Instructions from '@/views/Instructions.vue';

  export default {
    name: 'ResultPage',
    components: {
    ResultComponent,
    Instructions,
  },

    beforeRouteEnter (to, from, next) {
      // redirect to start page if one goes to result route
      // without having gone through the upload process
      next(vm => {
        if (store.img === null) {
          vm.$router.push({ name: 'Start' }).catch(() => { })
        }
      })
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