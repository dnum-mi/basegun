<template>
  <div>
    <HeaderMain />
    <h1>Erreur</h1>
  </div>
</template>

<script>
// @ is an alias to /src
import HeaderMain from '@/components/HeaderMain.vue';

export default {
  name: 'ErrorPage',
  components: {
    HeaderMain
  },
  data() {
    return {
    }
  }
}
</script>