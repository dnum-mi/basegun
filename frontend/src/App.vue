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
    console.log('onNeedRefresh')
    needRefresh.value = true
  },
  onOfflineReady() {},
})
</script>

<template>
  <div id="app">
    <HeaderMain v-show="store.isDisplay" />
    <router-view />
    <div v-show="needRefresh">
      <DsfrButton

        @click="updateSW()"
      >
        mise à jour
      </DsfrButton>
    </div>
    <div class="wrapper-snackbar">
      <snackbar-alert />
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

.wrapper-snackbar {
  display: flex;
  justify-content: center;
}

</style>
