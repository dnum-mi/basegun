import { useResultStore } from '@/stores/result.js'
import { useStepsStore } from '@/stores/steps.js'

export const serializer = {
  read: (v) => (v == null || v === 'null') ? undefined : JSON.parse(v),
  write: (v) => v === undefined ? 'null' : JSON.stringify(v),
}

export const clearLocalStorage = (to, from, next) => {
  const { setOption, setAmmo, setCurrentStep } = useStepsStore()
  const { setResult } = useResultStore()

  useStepsStore.isModalTransparentAmmoOpened = undefined
  setOption(undefined)
  setAmmo(undefined)
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
