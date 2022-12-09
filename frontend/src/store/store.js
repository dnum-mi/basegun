import { reactive } from 'vue'

export const store = reactive({
  confidence: null,
  confidenceLevel: null,
  isDisplayHeader: true,
  geolocation: null,
  img: null,
  imgUrl: null,
  label: null,
  resultText: null,
  uploadMessage: null,
})
