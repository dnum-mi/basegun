<template>
  <div>
    <StartComponent />
  </div>
</template>

<script>
import { store } from '@/store/store.js'
import StartComponent from '@/components/StartComponent.vue';

export default {
  name: 'StartPage',
  components: {
    StartComponent,
  },

  beforeRouteLeave() {
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