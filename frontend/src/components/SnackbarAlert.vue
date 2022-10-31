<template>
  <transition name="bounce">
    <div
      v-show="show"
      class="snackbar"
    >
      <DsfrAlert
        class="shadow-md  m-0"
        :class="type"
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

<script setup>
import { computed, watch } from 'vue'
import { useRoute } from 'vue-router'

import { useSnackbarStore } from '../stores/snackbar.js'

const route = useRoute()
const snackbarStore = useSnackbarStore()

const message = computed(() => snackbarStore.message)
const show = computed(() => snackbarStore.show)
const type = computed(() => snackbarStore.type)

const closeSnackbar = () =>   snackbarStore.hideMessage()

watch(route, closeSnackbar)
</script>

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

.bounce-enter-active,
.snackbar-leave-active {
  transition: all 0.2s ease-in-out;
}
.bounce-enter,
.bounce-leave-to {
  opacity: 0;
  transition: all 0.3s ease-in-out;
}
</style>
