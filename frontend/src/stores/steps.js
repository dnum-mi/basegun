import { defineStore } from 'pinia'
import { computed } from 'vue'
import { useLocalStorage } from '@vueuse/core'
import { serializer } from '@/utils/storage-utils.js'

export const useStepsStore = defineStore('steps', () => {
  const currentStep = useLocalStorage('currentStep', 1)
  const currentOptionStep = useLocalStorage('currentOptionStep', {})

  const selectedAmmo = useLocalStorage('selectedAmmo', undefined, { serializer })
  const selectedOptionStep1 = useLocalStorage('selectedOptionStep1', undefined, { serializer })
  const selectedOptionStep2 = useLocalStorage('selectedOptionStep2', undefined, { serializer })
  const selectedOptionStep3 = useLocalStorage('selectedOptionStep3', undefined, { serializer })
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
    currentOptionStep.value = { ...currentOptionStep, [step]: value }
  }

  function setOptionStep1 (option) {
    selectedOptionStep1.value = option
  }
  function setOptionStep2 (option) {
    selectedOptionStep2.value = option
  }
  function setOptionStep3 (option) {
    selectedOptionStep3.value = option
  }

  return {
    currentStep,
    currentOptionStep,
    selectedAmmo,
    selectedOptionStep1,
    selectedOptionStep2,
    selectedOptionStep3,
    tutorialFeedback,
    setOptionStep,
    isDummy,
    isModalTransparentAmmoOpened,
    setCurrentStep,
    setAmmo,
    setOptionStep1,
    setOptionStep2,
    setOptionStep3,
  }
})
