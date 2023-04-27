<script setup>
import { computed, watch } from 'vue'
import { useRoute } from 'vue-router'

import { useSnackbarStore } from '@/stores/snackbar.js'

const route = useRoute()
const snackbarStore = useSnackbarStore()

const message = computed(() => snackbarStore.message)
const show = computed(() => snackbarStore.show)
const type = computed(() => snackbarStore.type)

const closeSnackbar = () => snackbarStore.hideMessage()

watch(route, closeSnackbar)
</script>

<template>
  <transition>
    <div
      v-show="show"
      class="mx-auto snackbar"
    >
      <DsfrAlert
        :type="type"
        small
        data-testid="snackbar"
        :description="message"
        :closeable="type ==='error'"
        @close="closeSnackbar()"
      />
    </div>
  </transition>
</template>

<style scoped>
.snackbar {
  display: flex;
  justify-content: center;
  margin-bottom: 2em;
  background-color: white;
  width: 20em;
  align-items: center;
  z-index: 1000;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
