<script setup>
import { registerSW } from 'virtual:pwa-register'
import { useAppStore } from './stores/app.js'
import HeaderMain from './components/HeaderMain.vue'

const appStore = useAppStore()

registerSW({ immediate: true })

</script>

<template>
  <HeaderMain v-show="appStore.displayHeader" />
  <router-view />
</template>

<style scoped>
#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}

.refresh {
  z-index: 999 !important;
}

</style>
