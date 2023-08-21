import { useResultStore } from '@/stores/result.js'
import { useStepsStore } from '@/stores/steps.js'

export const serializer = {
  read: (v) => (v == null || v === 'null') ? undefined : JSON.parse(v),
  write: (v) => v === undefined ? 'null' : JSON.stringify(v),
}

export const clearLocalStorage = (to, from, next) => {
  const { setAmmo, setOptionStep1, setOptionStep2, setOptionStep3, setCurrentStep } = useStepsStore()
  const { setResult } = useResultStore()

  useStepsStore.isModalTransparentAmmoOpened = undefined
  setAmmo(undefined)
  setOptionStep1(undefined)
  setOptionStep2(undefined)
  setOptionStep3(undefined)
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
