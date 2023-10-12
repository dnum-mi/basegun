import { defineStore } from 'pinia'
import { computed } from 'vue'
import { useLocalStorage } from '@vueuse/core'
import { serializer } from '@/utils/storage-utils'

type Step = Record<'1' | '2' | '3', Record<string, unknown>>

export const useStepsStore = defineStore('steps', () => {
  const currentStep = useLocalStorage<number>('currentStep', 1)
  const currentOptionStep = useLocalStorage<Partial<Step>>('currentOptionStep', {})

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
