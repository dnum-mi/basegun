// @ts-check
import { defineStore } from 'pinia'
import { ref } from 'vue'

const DEFAULT_TIMEOUT = 3000

export const useSnackbarStore = defineStore('snackbar', () => {
  const timeoutId = ref<ReturnType<typeof setTimeout>>()
  const currentMessage = ref('')
  const show = ref(false)

  const currentType = ref<'success' | 'warning' | 'error' | 'info' | ''>('')

  function hideMessage () {
    show.value = false
  }

  type SetMessageParam = { message: string, type?: 'success' | 'warning' | 'error' | 'info' | '', timeout?: number }

  function setMessage ({ message, type = 'info', timeout = DEFAULT_TIMEOUT }: SetMessageParam) {
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
