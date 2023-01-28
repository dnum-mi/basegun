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

  const setResult = (result) => {
    typology.value = result.typology
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
