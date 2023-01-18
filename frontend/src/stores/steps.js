import { defineStore } from 'pinia'
import { computed } from 'vue'
import { useLocalStorage } from '@vueuse/core'

export const useStepsStore = defineStore('steps', () => {
  const typology = useLocalStorage('typology')
  const selectedOption = useLocalStorage('selectedOption', undefined, {
    serializer: {
      read: (v) => (v == null || v === 'null') ? undefined : JSON.parse(v),
      write: (v) => v === undefined ? 'null' : JSON.stringify(v),
    },
  })
  const selectedAmmo = useLocalStorage('selecteAmmo', undefined, {
    serializer: {
      read: (v) => (v == null || v === 'null') ? undefined : JSON.parse(v),
      write: (v) => v === undefined ? 'null' : JSON.stringify(v),
    },
  })

  const isFactice = computed(() => selectedAmmo === 'billes')

  const currentStep = useLocalStorage('currentStep', 1)

  function setCurrentStep (newStep) {
    currentStep.value = newStep
  }

  function setOption (option) {
    selectedOption.value = option
  }

  function setAmmo (ammo) {
    selectedAmmo.value = ammo
  }

  return {
    isFactice,
    typology,
    selectedOption,
    selectedAmmo,
    currentStep,
    setCurrentStep,
    setOption,
    setAmmo,
  }
})
