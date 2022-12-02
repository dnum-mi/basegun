import { reactive, ref } from 'vue'

// Attention ceci n'est pas un store simplement un fonction reactive de vue
export const store = reactive({
  confidence: null,
  confidenceLevel: null,
  isHome: null,
  isDisplayHeader: true,
  isDisplayFooter: false,
  isFactice: true,
  isSemiAuto: null,
  geolocation: null,
  img: null,
  imgUrl: null,
  label: null,
  resultText: null,
  uploadMessage: null,
})

// export const resetStore = ref(
//     store.confidence = null,
//     store.confidenceLevel = null,
//     store.isHome = null,
//     store.isDisplayHeader = true,
//     store.isDisplayFooter = false,
//     store.isFactice = true,
//     store.isSemiAuto = null,
//     store.geolocation = null,
//     store.img = null,
//     store.imgUrl = null,
//     store.instructionsRead = false,
//     store.isInstruction = false,
//     store.label = null,
//     store.resultText = null,
//     store.uploadMessage = null,
// )
