import { defineStore } from 'pinia'
import { computed } from 'vue'
import { useLocalStorage } from '@vueuse/core'
import { serializer } from '@/utils/storage-utils.js'

export const useStepsStore = defineStore('steps', () => {
  const typology = useLocalStorage('typology', undefined, { serializer })
  const selectedOption = useLocalStorage('selectedOption', undefined, { serializer })

  const selectedAmmo = useLocalStorage('selecteAmmo', undefined, { serializer })

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
