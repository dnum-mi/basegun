import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useAppStore = defineStore('app', () => {
  const displayHeader = ref(false)
  const setDisplayHeader = (bool) => { displayHeader.value = bool }

  return {
    displayHeader,
    setDisplayHeader,
  }
})
