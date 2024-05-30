import { defineStore } from 'pinia'
import { computed } from 'vue'
import { useLocalStorage } from '@vueuse/core'
import { serializer } from '@/utils/storage-utils'

export const useStepsStore = defineStore('steps', () => {
  const selectedOptions = useLocalStorage<Array<string>>('selectedOptions', [])

  const selectedAmmo = useLocalStorage<string | undefined>('selectedAmmo', undefined, { serializer })
  const selectedAlarmGun = useLocalStorage<string | undefined>('selectedAlarmGun', undefined, { serializer })
  const tutorialFeedback = useLocalStorage('tutorialFeedback', '')

  const isDummy = useLocalStorage('isDummy', computed(() => !!(selectedAmmo.value === 'billes')), { serializer })

  const isModalTransparentAmmoOpened = useLocalStorage<boolean | undefined>('isModalTransparentAmmoOpened', undefined, { serializer })

  function setAmmo (ammo?: string) {
    selectedAmmo.value = ammo
  }

  function $reset () {
    selectedAlarmGun.value = ''
  }

  return {
    selectedOptions,
    selectedAmmo,
    selectedAlarmGun,
    tutorialFeedback,
    isDummy,
    setModalTransparentAmmoOpened (val?: boolean) {
      isModalTransparentAmmoOpened.value = val
    },
    isModalTransparentAmmoOpened,
    setAmmo,
    $reset,
  }
})
