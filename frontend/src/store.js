import { reactive } from 'vue'

export const store = reactive({
    label: null,
    confidence: null,
    confidence_level: null,
    imgName: null,
    resultText: null,
    uploadMessage: null,
    geolocation: null,
    instructionsRead: false
})