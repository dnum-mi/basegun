import { defineStore } from 'pinia'
import { useLocalStorage } from '@vueuse/core'

import { serializer } from '@/utils/storage-utils'

export const useResultStore = defineStore('result', () => {
  const typology = useLocalStorage<string>('typology', null, { serializer })
  const confidence = useLocalStorage<number>('confidence', null, { serializer })
  const confidenceLevel = useLocalStorage<string>('confidenceLevel', null, { serializer })
  const img = useLocalStorage<string>('img', null, { serializer })
  const imgUrl = useLocalStorage<string>('imgUrl', null, { serializer })
  const geolocation = useLocalStorage<string>('geolocation', null, { serializer })
  const resultText = useLocalStorage<string>('resultText', null, { serializer })
  const securingTutorial = useLocalStorage<boolean>('securingTutorial', false, { serializer })

  type FirearmIdentificationResult = {
    typology?: string
    confidence?: number
    confidenceLevel?: string
    img?: string
    imgUrl?: string
    geolocation?: string
    resultText?: string
  }

  const setResult = (result: FirearmIdentificationResult) => {
    typology.value = result.typology
    confidence.value = result.confidence
    confidenceLevel.value = result.confidenceLevel
    img.value = result.img
    imgUrl.value = result.imgUrl
    geolocation.value = result.geolocation
    resultText.value = result.resultText
  }

  const setSecuringTutorial = (newValue: boolean) => {
    securingTutorial.value = newValue
  }

  const setGeolocation = (geoloc: string) => {
    geolocation.value = geoloc
  }

  const updateTypology = (selectedOptionStep: string) => {
    typology.value = typology.value + (selectedOptionStep === 'revolver_black_powder' ? '_black_powder' : '')
  }

  return {
    typology,
    updateTypology,
    confidence,
    confidenceLevel,
    img,
    imgUrl,
    geolocation,
    resultText,
    securingTutorial,
    setResult,
    setSecuringTutorial,
    setGeolocation,
  }
})
