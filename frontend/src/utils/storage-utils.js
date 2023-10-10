import { useResultStore } from '@/stores/result.js'
import { useStepsStore } from '@/stores/steps.js'

export const serializer = {
  read: (v) => (v == null || v === 'null') ? undefined : JSON.parse(v),
  write: (v) => v == null ? 'null' : JSON.stringify(v),
}

export const clearLocalStorage = (to, from, next) => {
  const { setAmmo, setOptionStep, setCurrentStep } = useStepsStore()
  const { setResult } = useResultStore()

  useStepsStore.isModalTransparentAmmoOpened = undefined
  setAmmo(undefined)
  setOptionStep(1, undefined)
  setOptionStep(2, undefined)
  setOptionStep(3, undefined)
  setCurrentStep(0)

  setResult({
    typology: undefined,
    confidence: undefined,
    confidenceLevel: undefined,
    img: undefined,
    imgUrl: undefined,
    geolocation: undefined,
    resultText: undefined,
  })

  next()
}
