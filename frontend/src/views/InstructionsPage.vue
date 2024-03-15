<script lang="ts" setup>
import GoodExamplePhoto from '@/assets/new-good-photo-example.png'
import BadExamplePhoto from '@/assets/bad-photo-example.jpg'

import { ref } from 'vue'
import axios from 'axios'
import { useRouter } from 'vue-router'

import { useResultStore } from '@/stores/result'
import { getNextRouteAfterResult } from '@/utils/firearms-utils/get-next-route-after-result'

const loading = ref(false)
const fileInput = ref<HTMLInputElement | null>(null)

const resultStore = useResultStore()
const router = useRouter()

const handledImageTypes = 'image/jpeg, image/png, image/tiff, image/webp, image/bmp, image/gif'

async function uploadImage (base64: string, fileName: string) {
  const file = await srcToFile(base64, fileName, 'image/jpeg')

  const fd = new FormData()
  fd.append('image', file, file.name)
  fd.append('date', '' + (Date.now() / 1000)) // date.now gives in milliseconds, convert to seconds

  try {
    const { data } = await axios.post('/upload', fd)
    resultStore.$patch({
      typology: data.label,
      confidence: data.confidence,
      confidenceLevel: data.confidence_level,
      gunLength: data.gun_length,
      gunBarrelLength: data.gun_barrel_length,
      resultText: "Type d'arme : " + data.label + ' ' + data.confidence + '%',
      img: base64,
      imgUrl: data.path,
    })
    const nextRoute = getNextRouteAfterResult({
      securingTutorial: resultStore.securingTutorial,
      confidenceLevel: resultStore.confidenceLevel,
      typology: resultStore.typology,
      gunLength: resultStore.gunLength,
      gunBarrelLength: resultStore.gunBarrelLength,
    })
    router.push(nextRoute)
  } catch (error) {
    console.log(error)
    router.push({ name: 'ErrorPage' })
  }
}

function resizeImage (uploadedFile: File) {
  const MAX_SIZE = 600
  const reader = new FileReader()
  const image = new Image()
  const canvas = document.createElement('canvas')

  reader.readAsDataURL(uploadedFile)
  reader.onload = (event: ProgressEvent<FileReader>) => {
    image.src = event.target?.result as string
  }
  return new Promise<string>((resolve, reject) => {
    image.onload = (e) => {
      let width = image.width
      let height = image.height
      if (width > height) {
        if (width > MAX_SIZE) {
          height *= MAX_SIZE / width
          width = MAX_SIZE
        }
      } else {
        if (height > MAX_SIZE) {
          width *= MAX_SIZE / height
          height = MAX_SIZE
        }
      }
      canvas.width = width
      canvas.height = height
      const ctx = canvas.getContext('2d')
      ctx?.drawImage(e.target as CanvasImageSource, 0, 0, width, height)
      resolve(ctx?.canvas.toDataURL('image/jpeg') as string)
    }
    image.onerror = (err) => reject(err)
  })
}

async function srcToFile (src: string, fileName: string, mimeType: string) {
  const res = await fetch(src)
  const buf = await res.arrayBuffer()
  return new File([buf], fileName, { type: mimeType })
}

function onFileSelected (event: InputEvent & { target: InputEvent['target'] & { files: File[] } }) {
  loading.value = true
  const uploadedFile = event.target?.files[0]

  resizeImage(uploadedFile).then((resizedBase64Image) => (
    uploadImage(resizedBase64Image, uploadedFile.name)
  ))
}
</script>

<template>
  <div
    class="lg:absolute  lg:inset-y-1\/3  lg:inset-x-0  fr-col-lg-6  fr-col-sm-9  mx-auto"
  >
    <div class="fr-alert fr-alert--info mt-15 mr-5 ml-5">
      <h3 class="fr-alert__title mb-8">
        <span class="font-bold">Pour un résultat optimal</span>
      </h3>
      <p>1 - Présenter le <span class="font-bold">canon vers la droite</span>.</p>
      <p>2 - Ne photographier qu'<span class="font-bold">une seule</span> arme.</p>
      <p>3 - Placer l'arme <span class="font-bold">en entier</span> et <span class="font-bold">au centre de la photo</span>.</p>
      <p>4 - Placer <span class="font-bold">une carte à côté de l'arme</span> (n'importe quelle carte au format standard).</p>
    </div>

    <div class="mt-5 text-center lg:flex">
      <DsfrPicture
        title="title"
        :src="GoodExamplePhoto"
        alt="photo d'une carte posée au sol et arme tournée vers la droite et centrée"
      />
    </div>
    <div class="big-blank" />
    <div class="footer">
      <div
        v-if="!loading"
        class="btn-read-instruction text-center"
      >
        <div
          class="fr-col-11 fr-col-lg-6 mx-auto"
        >
          <input
            ref="fileInput"
            data-testid="select-file"
            type="file"
            style="width: 0; height: 1px"
            :accept="handledImageTypes"
            @change="onFileSelected($event)"
          >
          <DsfrButton
            class="flex justify-center"
            data-testid="take-a-picture"
            label="Prendre la photo"
            icon="ri-camera-fill"
            :icon-right="true"
            @click="$refs.fileInput.click()"
          />
        </div>
      </div>
      <div
        v-else
        class="text-center bold"
      >
        <p class="loading font-bold">
          Analyse en cours
        </p>
      </div>
    </div>
  </div>
</template>

<style scoped>

:deep([class*=" fr-ratio"]) {
  width: auto !important;
  max-width: 95%;
  object-fit: contain;
}

:deep(.fr-content-media) {
  margin: .5rem auto;
}

:deep(.fr-content-media__caption) {
  margin: -.5rem 0 0 0;
}

:deep(.fr-notice) {
  margin-top: 1.5rem;
}

:deep(.fr-notice__body) {
  padding: 0 .5rem 0 2.5rem;
}

:deep(.fr-notice__title) {
  color: var(--text-default-info);
  font-size: 1.1rem;
}

img {
  max-width: 100%;
  max-height: 200px;
  padding: 0 0.5rem;
}

/* upload loading dots */
.loading {
  color: var(--blue-france-sun-113-625);
}

.loading::after {
  content: " .";
  animation: dots 1s steps(5, end) infinite;
}

@keyframes dots {
  0%,
  20% {
    color: rgb(0 0 0 / 0%);
    text-shadow:
      0.25em 0 0 rgb(0 0 0 / 0%),
      0.5em 0 0 rgb(0 0 0 / 0%);
  }

  40% {
    color: var(--blue-france-sun-113-625);
    text-shadow:
      0.25em 0 0 rgb(0 0 0 / 0%),
      0.5em 0 0 rgb(0 0 0 / 0%);
  }

  60% {
    text-shadow:
      0.25em 0 0 var(--blue-france-sun-113-625),
      0.5em 0 0 rgb(0 0 0 / 0%);
  }

  80%,
  100% {
    text-shadow:
      0.25em 0 0 var(--blue-france-sun-113-625),
      0.5em 0 0 var(--blue-france-sun-113-625);
  }
}
</style>
