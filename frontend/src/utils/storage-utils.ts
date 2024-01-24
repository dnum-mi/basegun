import type { NavigationGuardWithThis } from 'vue-router'
import { useResultStore } from '@/stores/result'
import { useStepsStore } from '@/stores/steps'

export const serializer = {
  // @ts-ignore this uses dynamic values
  read: (v: unknown) => (v == null || v === 'null') ? undefined : JSON.parse(v),
  write: (v: unknown) => v == null ? 'null' : JSON.stringify(v),
}

export const clearLocalStorage: NavigationGuardWithThis<undefined> = (to, from, next) => {
  const { setAmmo, setOptionStep, setCurrentStep } = useStepsStore()
  const resultStore = useResultStore()

  useStepsStore.isModalTransparentAmmoOpened = undefined
  setAmmo(undefined)
  setOptionStep(1, undefined)
  setOptionStep(2, undefined)
  setOptionStep(3, undefined)
  setCurrentStep(0)

  resultStore.$patch({
    typology: undefined,
    confidence: undefined,
    confidenceLevel: undefined,
    img: undefined,
    imgUrl: undefined,
    resultText: undefined,
  })

  next()
}
