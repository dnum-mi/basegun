<template>
  <div>
    <UploadComponent />
  </div>
</template>

<script>
// @ is an alias to /src
import { store } from '@/store/store.js'
import UploadComponent from '@/components/UploadComponent.vue';

export default {
  name: 'StartPage',
  components: {
    UploadComponent,
  },
  data() {
    return {
      store,
    }
  },
}
</script>