import { reactive } from 'vue'

// Attention ceci n'est pas un store simplement un fonction reactive de vue
export const store = reactive({
  displayHeader: true,
  uploadMessage: null,
  // issue: null,
  // confidence: null,
  // confidenceLevel: null,
  // geolocation: null,
  // img: null,
  // imgUrl: null,
  // label: null,
  // resultText: null,
})
