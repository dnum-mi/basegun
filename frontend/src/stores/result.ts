import { defineStore } from 'pinia'
import { useLocalStorage } from '@vueuse/core'

import { serializer } from '@/utils/storage-utils'
import type { resultTree } from '@/utils/firearms-utils'

type TypologyKey = keyof typeof resultTree

export const useResultStore = defineStore('result', () => {
  const typology = useLocalStorage<TypologyKey>('typology', null, { serializer })
  const confidence = useLocalStorage<number>('confidence', null, { serializer })
  const confidenceLevel = useLocalStorage<string>('confidenceLevel', null, { serializer })
  const img = useLocalStorage<string>('img', null, { serializer })
  const imgUrl = useLocalStorage<string>('imgUrl', null, { serializer })
  const resultText = useLocalStorage<string>('resultText', null, { serializer })
  const securingTutorial = useLocalStorage<boolean>('securingTutorial', false, { serializer })

  type FirearmIdentificationResult = {
    typology?: TypologyKey
    confidence?: number
    confidenceLevel?: string
    img?: string
    imgUrl?: string
    resultText?: string
  }

  const setResult = (result: FirearmIdentificationResult) => {
    typology.value = result.typology
    confidence.value = result.confidence
    confidenceLevel.value = result.confidenceLevel
    img.value = result.img
    imgUrl.value = result.imgUrl
    resultText.value = result.resultText
  }

  const setSecuringTutorial = (newValue: boolean) => {
    securingTutorial.value = newValue
  }

  const updateTypology = (selectedOptionStep: TypologyKey) => {
    const extra = (selectedOptionStep === 'revolver_black_powder' ? '_black_powder' : '')
    typology.value = typology.value + extra as TypologyKey
  }

  return {
    typology,
    updateTypology,
    confidence,
    confidenceLevel,
    img,
    imgUrl,
    resultText,
    securingTutorial,
    setResult,
    setSecuringTutorial,
  }
})
