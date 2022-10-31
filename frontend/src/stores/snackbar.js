// @ts-check
import { defineStore } from 'pinia'
import { ref } from 'vue'

const DEFAULT_TIMEOUT = 3000

export const useSnackbarStore = defineStore('snackbar', () => {
  const timeoutId = ref()
  const currentMessage = ref('')
  const show = ref(false)

  /** @type {import('vue').Ref<'success' | 'warning' | 'error' | 'info' | ''>} */
  const currentType = ref('')

  function hideMessage () {
    show.value = false
  }

  function setMessage ({ message, type = 'info', timeout = DEFAULT_TIMEOUT }) {
    if (timeoutId.value) {
      clearTimeout(timeoutId.value)
    }
    currentMessage.value = message
    
    currentType.value = type
    show.value = true

    timeoutId.value = setTimeout(() => {
      currentMessage.value = ''
      show.value = false
    }, timeout)
  }

  return {
    setMessage,
    message: currentMessage,
    show,
    type: currentType,
    hideMessage,
  }
})