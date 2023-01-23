import { reactive } from 'vue'

// Attention ceci n'est pas un store simplement un fonction reactive de vue
export const store = reactive({
  displayHeader: true,
  uploadMessage: null,
})
