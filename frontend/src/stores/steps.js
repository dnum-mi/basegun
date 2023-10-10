import { defineStore } from 'pinia'
import { computed } from 'vue'
import { useLocalStorage } from '@vueuse/core'
import { serializer } from '@/utils/storage-utils.js'

export const useStepsStore = defineStore('steps', () => {
  const currentStep = useLocalStorage('currentStep', 1)
  const currentOptionStep = useLocalStorage('currentOptionStep', {})

  const selectedAmmo = useLocalStorage('selectedAmmo', undefined, { serializer })
  const tutorialFeedback = useLocalStorage('tutorialFeedback', '')

  const isDummy = useLocalStorage('isDummy', computed(() => !!(selectedAmmo.value === 'billes')), { serializer })

  const isModalTransparentAmmoOpened = useLocalStorage('isModalTransparentAmmoOpened', undefined, { serializer })

  function setCurrentStep (newStep) {
    currentStep.value = newStep
  }

  function setAmmo (ammo) {
    selectedAmmo.value = ammo
  }

  function setOptionStep (step, value) {
    currentOptionStep.value = { ...currentOptionStep.value, [step]: value }
  }

  return {
    currentStep,
    currentOptionStep,
    selectedAmmo,
    tutorialFeedback,
    setOptionStep,
    isDummy,
    isModalTransparentAmmoOpened,
    setCurrentStep,
    setAmmo,
  }
})
