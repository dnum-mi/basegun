<script setup>
import { ref } from 'vue'
import axios from 'axios'
import { useResultStore } from '@/stores/result.js'
import { useRouter } from 'vue-router'

const resultStore = useResultStore()
const router = useRouter()

const fileInput = ref(null)
const handledImageTypes = 'image/jpeg, image/png, image/tiff, image/webp, image/bmp, image/gif'

function randomCoord (num) {
  num = parseFloat(num)
  const max = 0.1
  const min = -0.1
  return (Math.random() * (max - min) + min) + num
}

function click () {
  fileInput.value.click()
}

defineExpose({
  click,
})

const emit = defineEmits(['file-selected'])

function submitUpload (base64, fileName) {
  srcToFile(base64, fileName, 'image/jpeg').then(file => {
    const fd = new FormData()
    fd.append('image', file, file.name)
    fd.append('date', Date.now() / 1000) // date.now gives in milliseconds, convert to seconds
    fd.append('geolocation', resultStore.geolocation)

    axios.post('/upload', fd)
      .then(res => {
        resultStore.setResult({
          typology: res.data.label,
          confidence: res.data.confidence,
          confidenceLevel: res.data.confidence_level,
          resultText: "Type d'arme : " + res.data.label + ' ' + res.data.confidence + '%',
          img: base64,
          imgUrl: res.data.path,
        })
        router.push({ name: 'Result' })
      })
      .catch((error) => {
        // TODO: Afficher l’erreur à l’utilisateur
        router.push({ name: 'Error', meta: { error } })
      })
  })
}

function resizeAndUpload (uploadedFile) {
  const reader = new FileReader()
  // convert File object to base64 data
  reader.readAsDataURL(uploadedFile)

  reader.onload = function (event) {
    const imgElement = document.createElement('img')
    imgElement.src = event.target.result

    imgElement.onload = function (e) {
      const canvas = document.createElement('canvas')
      const MAX_WIDTH = 600
      const MAX_HEIGHT = 600
      let width = imgElement.width
      let height = imgElement.height
      if (width > height) {
        if (width > MAX_WIDTH) {
          height *= MAX_WIDTH / width
          width = MAX_WIDTH
        }
      } else {
        if (height > MAX_HEIGHT) {
          width *= MAX_HEIGHT / height
          height = MAX_HEIGHT
        }
      }
      canvas.width = width
      canvas.height = height
      const ctx = canvas.getContext('2d')
      ctx.drawImage(e.target, 0, 0, width, height)
      const srcEncoded = ctx.canvas.toDataURL('image/jpeg')
      submitUpload(srcEncoded, uploadedFile.name)
    }

    imgElement.onerror = function () {
      // TODO: Afficher l’erreur en français et dans une modal du DSFR et surtout pas dans un alert()
      alert('Corrupted image file, please try another')
    }
  }
}

async function srcToFile (src, fileName, mimeType) {
  const res = await fetch(src)
  const buf = await res.arrayBuffer()
  return new File([buf], fileName, { type: mimeType })
}

function onFileSelected (event) {
  emit('file-selected', event)
  const uploadedFile = event.target.files[0]

  // get user geolocation
  axios.get('https://api.ipgeolocation.io/ipgeo?apiKey=17dc6bed199b45ca92d60079686e03f1', { withCredentials: false })
    .then(res => {
      const latitude = randomCoord(res.data.latitude)
      const longitude = randomCoord(res.data.longitude)
      resultStore.setGeolocation(latitude.toString() + ',' + longitude.toString())
    })
    .catch(() => {}) // TODO: Gérer l’erreur
    .finally(() => {
      // if geolocation is unavailable or incorrect format
      resizeAndUpload(uploadedFile)
    })
}
</script>

<template>
  <form
    id="demarrer"
    style="width: 0; height: 1px; display: none;"
    @submit="submitUpload"
  >
    <input
      ref="fileInput"
      data-testid="select-file"
      type="file"
      style="width: 0; height: 1px"
      :accept="handledImageTypes"
      @change="onFileSelected($event)"
    >
    <button
      id="file-submit"
      data-testid="file-submit"
      type="submit"
      style="width: 0; height: 1px"
    >
      ok
    </button>
  </form>
</template>
