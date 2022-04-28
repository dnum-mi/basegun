<template>
  <div>
    <HeaderMain />
    <a href="/a-propos">À propos</a>
    <br>
    <a href="/mentions-legales">Mentions légales</a>
    <br>
    <a href="/contact">Contact</a>
  </div>
</template>

<script>
// @ is an alias to /src
import HeaderMain from '@/components/HeaderMain.vue';

export default {
  name: 'InformationsPage',
  components: {
    HeaderMain
  }
}
</script>

<style scoped>

</style>