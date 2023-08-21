import { defineStore } from 'pinia'
import { computed } from 'vue'
import { useLocalStorage } from '@vueuse/core'
import { serializer } from '@/utils/storage-utils.js'

export const useStepsStore = defineStore('steps', () => {
  const currentStep = useLocalStorage('currentStep', 1)

  const selectedOptionStep2 = useLocalStorage('selectedOptionStep2', undefined, { serializer })
  const selectedAmmo = useLocalStorage('selectedAmmo', undefined, { serializer })
  const selectedOptionStep1 = useLocalStorage('selectedOptionStep1', undefined, { serializer })
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

  function setOptionStep1 (selection) {
    selectedOptionStep1.value = selection
  }

  function setOptionStep2 (option) {
    selectedOptionStep2.value = option
  }
  function setOptionStep3 (selection) {
    selectedOptionStep3.value = selection
  }

  return {
    currentStep,
    selectedOptionStep2,
    selectedAmmo,
    selectedOptionStep1,
    selectedOptionStep3,
    tutorialFeedback,
    isDummy,
    isModalTransparentAmmoOpened,
    setCurrentStep,
    setAmmo,
    setOptionStep1,
    setOptionStep2,
    setOptionStep3,
  }
})
