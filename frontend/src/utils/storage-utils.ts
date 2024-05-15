import type { NavigationGuardWithThis } from 'vue-router'
import { useResultStore } from '@/stores/result'
import { useStepsStore } from '@/stores/steps'

export const serializer = {
  // @ts-ignore this uses dynamic values
  read: (v: unknown) => (v == null || v === 'null') ? undefined : JSON.parse(v),
  write: (v: unknown) => v == null ? 'null' : JSON.stringify(v),
}

export const clearLocalStorage: NavigationGuardWithThis<undefined> = (to, from, next) => {
  const { setAmmo, setOptionStep, setModalTransparentAmmoOpened } = useStepsStore()
  const resultStore = useResultStore()

  setModalTransparentAmmoOpened(undefined)
  setAmmo(undefined)
  setOptionStep(1, undefined)
  setOptionStep(2, undefined)
  setOptionStep(3, undefined)

  resultStore.$patch({
    typology: undefined,
    confidence: undefined,
    confidenceLevel: undefined,
    gunLength: undefined,
    gunBarrelLength: undefined,
    img: undefined,
    imgUrl: undefined,
    resultText: undefined,
  })

  next()
}
