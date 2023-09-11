<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'
import { registerSW } from 'virtual:pwa-register'
import HeaderMain from '@/components/HeaderMain.vue'

const online = ref(navigator.onLine)

const updateOnlineStatus = () => {
  online.value = navigator.onLine
}

onMounted(() => {
  window.addEventListener('online', updateOnlineStatus)
  window.addEventListener('offline', updateOnlineStatus)
})

onBeforeUnmount(() => {
  window.removeEventListener('online', updateOnlineStatus)
  window.removeEventListener('offline', updateOnlineStatus)
})

registerSW({ immediate: true })

</script>

<template>
  <HeaderMain v-show="online" />
  <router-view v-if="online" />
  <div
    v-else
    id="app"
  >
    <HeaderMain />
    <div class="text-center relative top-1/6 m-4">
      <h1>Problème de connexion</h1>
      <p>Vous n'avez pas accès à Internet.</p>
    </div>
  </div>
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

</style>
