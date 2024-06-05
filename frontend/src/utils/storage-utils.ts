import type { NavigationGuardWithThis } from 'vue-router'
import { useStore } from '@/stores/result'

export const serializer = {
  // @ts-ignore this uses dynamic values
  read: (v: unknown) => (v == null || v === 'null') ? undefined : JSON.parse(v),
  write: (v: unknown) => v == null ? 'null' : JSON.stringify(v),
}

export const clearLocalStorage: NavigationGuardWithThis<undefined> = (to, from, next) => {
  const store = useStore()

  store.$patch({
    typology: undefined,
    confidence: undefined,
    confidenceLevel: undefined,
    gunLength: undefined,
    gunBarrelLength: undefined,
    img: undefined,
    imgUrl: undefined,
    resultText: undefined,
    isModalTransparentAmmoOpened: undefined,
    selectedAmmo: undefined,
  })

  next()
}
