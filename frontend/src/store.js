import { reactive } from 'vue'

// Attention ceci n'est pas un store simplement un fonction reactive de vue
export const store = reactive({
  confidence: null,
  confidenceLevel: null,
  isDisplayHeader: true,
  isFactice: undefined,
  isSemiAuto: undefined,
  geolocation: null,
  img: null,
  imgUrl: null,
  label: null,
  resultText: null,
  uploadMessage: null,
})
