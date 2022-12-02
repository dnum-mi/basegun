<template>
  <div>
    <InstructionsComponent />
  </div>
</template>

<script>
import { store } from '@/store/store.js'
import InstructionsComponent from '@/components/InstructionsComponent.vue'

export default {
  name: 'UploadComponent',
  components: {
    InstructionsComponent,
  },

  data () {
    return {
      store,
    }
  },

}
</script>
