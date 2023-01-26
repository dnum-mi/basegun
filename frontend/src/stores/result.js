import { defineStore } from 'pinia'
import { useLocalStorage } from '@vueuse/core'
import { serializer } from '@/utils/storage-utils.js'

export const useResultStore = defineStore('result', () => {
  const typology = useLocalStorage('typology', undefined, { serializer })
  const confidence = useLocalStorage('confidence', undefined, { serializer })
  const confidenceLevel = useLocalStorage('confidenceLevel', undefined, { serializer })
  const img = useLocalStorage('img', undefined, { serializer })
  const imgUrl = useLocalStorage('imgUrl', undefined, { serializer })
  const geolocation = useLocalStorage('geolocation', undefined, { serializer })
  const resultText = useLocalStorage('resultText', undefined, { serializer })

  const setResult = (result) => {
    typology.value = result.label
    confidence.value = result.confidence
    confidenceLevel.value = result.confidenceLevel
    img.value = result.img
    imgUrl.value = result.imgUrl
    geolocation.value = result.geolocation
    resultText.value = result.resultText
  }

  const setGeolocation = (geoloc) => {
    geolocation.value = geoloc
  }

  return {
    typology,
    confidence,
    confidenceLevel,
    img,
    imgUrl,
    geolocation,
    resultText,
    setResult,
    setGeolocation,
  }
})
