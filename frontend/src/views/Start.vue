<template>
  <div>
    <UploadComponent />
  </div>
</template>

<script>
import { store } from '@/store/store.js'
import UploadComponent from '@/components/UploadComponent.vue';

export default {
  name: 'StartPage',
  components: {
    UploadComponent,
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