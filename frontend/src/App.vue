<script setup>
import { registerSW } from 'virtual:pwa-register'
import { ref } from 'vue'
import SnackbarAlert from './components/SnackbarAlert.vue';
import HeaderMain from './components/HeaderMain.vue';
import {store} from './store/store.js'

const needRefresh = ref(false)

const updateSW = registerSW({
  // immediate: true,
  onNeedRefresh() {
    needRefresh.value = true
  },
  onOfflineReady() {},
})
</script>

<template>
  <div id="app">
    <HeaderMain v-show="store.isDisplay" />
    <DsfrCallout
      v-show="needRefresh"
      class="col-lg-6 mx-auto"
      content=""
      title="Une mise à jour est disponible"
    >
      <DsfrButton
        secondary
        @click="updateSW()"
      >
        Mettre à jour 
      </DsfrButton>
    </DsfrCallout>
    <router-view />
    <div class="snackbar">
      <snackbar-alert class="text-center" />
    </div>
  </div>
</template>

<style>
#app {
  /* font-family: Avenir, Helvetica, Arial, sans-serif; */
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;

  /* text-align: center; */
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

.snackbar {
  display: flex;
  justify-content: center;
  z-index: 1000;
}

:deep(.fr-callout) {
  padding: 1rem 2rem;
}

</style>
