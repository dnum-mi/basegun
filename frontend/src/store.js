// import { useStorage } from '@vueuse/core'
import { reactive } from 'vue'

// Attention ceci n'est pas un store simplement un fonction reactive de vue
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
  // guide factice
  isSemiAuto: null,
  isFactice: null,
  isLever: null,
  isButton: null,
  isCartridges: null,
  isBalls: null,
  isDisabledNextStep: null,
  isDisabledValidate: null,
})

// export const store = useStorage('basegun-store', {
//   confidence: null,
//   confidenceLevel: null,
//   isDisplayHeader: true,
//   geolocation: null,
//   img: null,
//   imgUrl: null,
//   label: null,
//   resultText: null,
//   uploadMessage: null,
//   // guide factice
//   isSemiAuto: null,
//   isFactice: null,
//   isLever: null,
//   isButton: null,
//   isCartridges: null,
//   isBalls: null,
// })
