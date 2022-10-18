import { reactive } from 'vue'

export const store = reactive({
    confidence: null,
    confidence_level: null,
    isDisplay:true,
    geolocation: null,
    img: null,
    imgUrl: null,
    instructionsRead: false,
    isInstruction:false,
    label: null,
    resultText: null,
    uploadMessage: null,
})