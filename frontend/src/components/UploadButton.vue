<script lang="ts" setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

import { useResultStore } from '@/stores/result'
import { getNextRouteAfterResult } from '@/utils/firearms-utils/get-next-route-after-result'
import { uploadPhotoForDetection } from '@/api/api-client'

const resultStore = useResultStore()
const router = useRouter()

const fileInput = ref<HTMLInputElement | null>(null)
const handledImageTypes = 'image/jpeg, image/png, image/tiff, image/webp, image/bmp, image/gif'

function randomCoord (num: string) {
  const nb = parseFloat(num)
  const max = 0.1
  const min = -0.1
  return (Math.random() * (max - min) + min) + nb
}

function click () {
  fileInput.value?.click()
}

defineExpose({
  click,
})

const emit = defineEmits<{
  'file-selected': [],
}>()

async function submitUpload (base64: string, fileName: string) {
  const file = await srcToFile(base64, fileName, 'image/jpeg')

  try {
    const data = await uploadPhotoForDetection(file)
    resultStore.setResult({
      typology: data.label,
      confidence: data.confidence,
      confidenceLevel: data.confidence_level,
      resultText: "Type d'arme : " + data.label + ' ' + data.confidence + '%',
      img: base64,
      imgUrl: data.path,
    })
    const nextRoute = getNextRouteAfterResult({
      securingTutorial: resultStore.securingTutorial,
      confidenceLevel: resultStore.confidenceLevel,
      typology: resultStore.typology,
    })
    router.push(nextRoute)
  } catch (error) {
    console.log(error)
    router.push({ name: 'ErrorPage' })
  }
}

function resizeAndUpload (uploadedFile: File) {
  const reader = new FileReader()
  // convert File object to base64 data
  reader.readAsDataURL(uploadedFile)

  reader.onload = function (event: ProgressEvent<FileReader>) {
    const imgElement = document.createElement('img')
    imgElement.src = event.target?.result as string

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
      ctx?.drawImage(e.target as CanvasImageSource, 0, 0, width, height)
      const srcEncoded = ctx?.canvas.toDataURL('image/jpeg') as string
      submitUpload(srcEncoded, uploadedFile.name)
    }

    imgElement.onerror = function () {
      // TODO: Afficher l’erreur en français et dans une modal du DSFR et surtout pas dans un alert()
      alert('Corrupted image file, please try another')
    }
  }
}

async function srcToFile (src: string, fileName: string, mimeType: string) {
  const res = await fetch(src)
  const buf = await res.arrayBuffer()
  return new File([buf], fileName, { type: mimeType })
}

function onFileSelected (event: InputEvent & { target: InputEvent['target'] & { files: File[] } }) {
  emit('file-selected')
  const uploadedFile = event.target?.files[0]
  resizeAndUpload(uploadedFile)
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
