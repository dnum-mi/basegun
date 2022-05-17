import { reactive } from 'vue'

export const store = reactive({
    label: null,
    confidence: null,
    imgName: null,
    resultText: null,
    uploadMessage: null,
    userId: null,
    geolocation: null,
    instructionsRead: false
})