<template>
  <div :class="!isMobile ? 'centered' : ''">
    <InstructionsComponent />
  </div>
</template>
<script>
import { store } from '@/store/store.js';
import InstructionsComponent from '@/components/InstructionsComponent.vue'

export default {
    name: 'UploadComponent',
    components: {
      InstructionsComponent,
    },

data() {
    return {
        store,
    }
},

computed: {
    isMobile() {
      return screen.width <= 760 
    },
  },
}
</script>