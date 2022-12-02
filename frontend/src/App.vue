<script setup>
import { registerSW } from 'virtual:pwa-register'
import { watch, ref } from 'vue'
import { useRoute } from 'vue-router'
import HeaderMain from './components/HeaderMain.vue'
import FooterMain from './components/FooterMain.vue'

import { store } from './store.js'

const route = useRoute()
watch(route, () => {
  store.confidence = null,
  store.confidenceLevel = null,
  store.isHome = null,
  // store.isDisplayHeader = true,
  store.isDisplayFooter = false,
  store.isFactice = true,
  store.isSemiAuto = null,
  store.geolocation = null,
  store.img = null,
  store.imgUrl = null,
  store.instructionsRead = false,
  store.isInstruction = false,
  store.label = null,
  store.resultText = null,
  store.uploadMessage = null
})

const needRefresh = ref(false)

const updateSW = registerSW({
  // immediate: true,
  onNeedRefresh () {
    needRefresh.value = true
  },
  onOfflineReady () {},
})
</script>

<template>
  <HeaderMain v-show="store.isDisplayHeader" />
  <DsfrCallout
    v-show="needRefresh"
    class="col-lg-6  mx-auto"
    content=""
    title="Une mise à jour est disponible"
  >
    <DsfrButton
      secondary
      @click="updateSW()"
    >
      <DsfrButton
        secondary
        @click="updateSW()"
      >
        Mettre à jour
      </DsfrButton>
    </dsfrbutton>
  </DsfrCallout>
  <router-view />
  <FooterMain v-show="store.isDisplayFooter" />
</template>

<style scoped>
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

:deep(.fr-callout) {
  padding: 1rem 2rem;
  z-index: 999;
}

</style>
