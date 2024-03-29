import { defineStore } from 'pinia'
import { computed } from 'vue'
import { useLocalStorage } from '@vueuse/core'
import { serializer } from '@/utils/storage-utils'

type Step = Record<'1' | '2' | '3', string>

export const useStepsStore = defineStore('steps', () => {
  const currentStep = useLocalStorage<1 | 2 | 3>('currentStep', 1)
  const currentOptionStep = useLocalStorage<Partial<Step>>('currentOptionStep', {})

  const selectedAmmo = useLocalStorage<string | undefined>('selectedAmmo', undefined, { serializer })
  const selectedArmeAlarme = useLocalStorage<string | undefined>('selectedArmeAlarme', undefined, { serializer })
  const tutorialFeedback = useLocalStorage('tutorialFeedback', '')

  const isDummy = useLocalStorage('isDummy', computed(() => !!(selectedAmmo.value === 'billes')), { serializer })

  const isModalTransparentAmmoOpened = useLocalStorage<boolean | undefined>('isModalTransparentAmmoOpened', undefined, { serializer })

  function setCurrentStep (newStep: 1 | 2 | 3) {
    currentStep.value = newStep
  }

  function setAmmo (ammo?: string) {
    selectedAmmo.value = ammo
  }

  function setOptionStep (step: 1 | 2 | 3, value?: string) {
    currentOptionStep.value = { ...currentOptionStep.value, [step]: value }
  }

  return {
    currentStep,
    currentOptionStep,
    selectedAmmo,
    selectedArmeAlarme,
    tutorialFeedback,
    setOptionStep,
    isDummy,
    setModalTransparentAmmoOpened (val?: boolean) {
      isModalTransparentAmmoOpened.value = val
    },
    isModalTransparentAmmoOpened,
    setCurrentStep,
    setAmmo,
  }
})
