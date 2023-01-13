<template>
  <div>
    <ResultComponent v-if="img" />
  </div>
</template>

<script>
import { useStorage } from '@vueuse/core'
import { store } from '@/store.js'
import ResultComponent from '@/components/ResultComponent.vue'

const img = useStorage('img')

export default {
  name: 'ResultPage',
  components: {
    ResultComponent,
  },

  beforeRouteEnter (to, from, next) {
    // redirect to start page if one goes to result route
    // without having gone through the upload process
    next(vm => {
      if (img.value === null) {
        vm.$router.push({ name: 'Start' }).catch(() => { })
      }
    })
  },

  beforeRouteLeave () {
    store.uploadMessage = null
    store.displayHeader = true
  },

  data () {
    return {
      img,
      store,
    }
  },
}
</script>
