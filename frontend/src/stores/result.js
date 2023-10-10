import { defineStore } from 'pinia'
import { useLocalStorage } from '@vueuse/core'

import { serializer } from '@/utils/storage-utils.js'

export const useResultStore = defineStore('result', () => {
  const typology = useLocalStorage('typology', null, { serializer })
  const confidence = useLocalStorage('confidence', null, { serializer })
  const confidenceLevel = useLocalStorage('confidenceLevel', null, { serializer })
  const img = useLocalStorage('img', null, { serializer })
  const imgUrl = useLocalStorage('imgUrl', null, { serializer })
  const geolocation = useLocalStorage('geolocation', null, { serializer })
  const resultText = useLocalStorage('resultText', null, { serializer })
  const securingTutorial = useLocalStorage('securingTutorial', false, { serializer })

  const setResult = (result) => {
    typology.value = result.typology
    confidence.value = result.confidence
    confidenceLevel.value = result.confidenceLevel
    img.value = result.img
    imgUrl.value = result.imgUrl
    geolocation.value = result.geolocation
    resultText.value = result.resultText
  }

  const setSecuringTutorial = (newValue) => {
    securingTutorial.value = newValue
  }

  const setGeolocation = (geoloc) => {
    geolocation.value = geoloc
  }

  const updateTypology = (selectedOptionStep) => {
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
