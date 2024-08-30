<script lang="ts" setup>
import GoodExamplePhoto from "@/assets/instruction-screen-gun.webp";

import { ref } from "vue";
import axios from "axios";
import { useRouter, useRoute } from "vue-router";

import { useStore } from "@/stores/result";
import { getNextRouteAfterResult } from "@/utils/firearms-utils/get-next-route-after-result";
import { isUserUsingComputer } from "@/utils/isUserUsingComputer";

const loading = ref(false);
const fileInput = ref<HTMLInputElement | null>(null);

const store = useStore();
const router = useRouter();
const route = useRoute();

const handledImageTypes =
  "image/jpeg, image/png, image/tiff, image/webp, image/bmp, image/gif";

async function uploadImage(base64: string, fileName: string) {
  const file = await srcToFile(base64, fileName, "image/jpeg");

  const fd = new FormData();
  fd.append("image", file, file.name);
  fd.append("date", "" + Date.now() / 1000); // date.now gives in milliseconds, convert to seconds

  try {
    const { data } = await axios.post("/upload", fd);
    store.$patch({
      typology: data.label,
      confidence: data.confidence,
      confidenceLevel: data.confidence_level,
      gunLength: data.gun_length,
      gunBarrelLength: data.gun_barrel_length,
      img: base64,
      imgUrl: data.path,
    });
    console.log(route.params);
    const nextRoute = getNextRouteAfterResult(
      Boolean(route.query.securingTutorial),
      store.confidenceLevel,
      store.typology,
      store.gunLength,
      store.gunBarrelLength,
    );
    router.push(nextRoute);
  } catch (error) {
    console.log(error);
    router.push({ name: "ErrorPage" });
  }

  try {
    if (
      store.typology === "pistolet_semi_auto_moderne" ||
      store.typology === "revolver"
    ) {
      const { data } = await axios.post("/identification-alarm-gun", fd);
      store.$patch({
        isAlarmGun: data.is_alarm_model,
        alarmGunException: data.exception,
      });
    }
  } catch (error) {
    console.log(error);
    router.push({ name: "ErrorPage" });
  }
}

onMounted(() => {
  console.log(window.navigator.userAgent);
});

const labelButton = computed(() => {
  if (isUserUsingComputer()) {
    return "Télécharger la photo";
  } else {
    return "Prendre ou choisir une photo";
  }
});

function resizeImage(uploadedFile: File) {
  const MAX_SIZE = 600;
  const reader = new FileReader();
  const image = new Image();
  const canvas = document.createElement("canvas");

  reader.readAsDataURL(uploadedFile);
  reader.onload = (event: ProgressEvent<FileReader>) => {
    image.src = event.target?.result as string;
  };
  return new Promise<string>((resolve, reject) => {
    image.onload = (e) => {
      let width = image.width;
      let height = image.height;
      if (width > height) {
        if (width > MAX_SIZE) {
          height *= MAX_SIZE / width;
          width = MAX_SIZE;
        }
      } else {
        if (height > MAX_SIZE) {
          width *= MAX_SIZE / height;
          height = MAX_SIZE;
        }
      }
      canvas.width = width;
      canvas.height = height;
      const ctx = canvas.getContext("2d");
      ctx?.drawImage(e.target as CanvasImageSource, 0, 0, width, height);
      resolve(ctx?.canvas.toDataURL("image/jpeg") as string);
    };
    image.onerror = (err) => reject(err);
  });
}

async function srcToFile(src: string, fileName: string, mimeType: string) {
  const res = await fetch(src);
  const buf = await res.arrayBuffer();
  return new File([buf], fileName, { type: mimeType });
}

async function onFileSelected(
  event: InputEvent & { target: InputEvent["target"] & { files: File[] } },
) {
  loading.value = true;
  const uploadedFile = event.target?.files[0];

  resizeImage(uploadedFile).then((resizedBase64Image) =>
    uploadImage(resizedBase64Image, uploadedFile.name),
  );
}
</script>

<template>
  <div class="lg:absolute lg:inset-x-0 fr-col-lg-6 fr-col-sm-9 mx-auto">
    <div class="fr-alert fr-alert--info mt-5 mx-5">
      <h1 class="fr-alert__title mb-8">Pour un résultat optimal :</h1>
      <p>
        1 - Présenter le <span class="font-bold">canon vers la droite</span>.
      </p>
      <p>
        2 - Ne photographier qu'<span class="font-bold">une seule</span> arme.
      </p>
      <p>
        3 - Placer l'arme <span class="font-bold">en entier</span> et
        <span class="font-bold">au centre de la photo</span>.
      </p>
      <p class="mt-3">Pour les armes d'épaule :</p>
      <p>
        4 - Placer
        <span class="font-bold">une carte à côté de l'arme</span> pour permettre
        de la mesurer.
      </p>
    </div>

    <div class="mt-5 text-center lg:flex">
      <DsfrPicture
        title="title"
        :src="GoodExamplePhoto"
        alt="Photo d'une carte posée au sol et d'une arme tournée vers la droite et centrée"
      />
    </div>
    <div class="footer">
      <div v-if="!loading" class="text-center">
        <div class="fr-col-11 fr-col-lg-6 mx-auto">
          <input
            ref="fileInput"
            data-testid="select-file"
            type="file"
            style="width: 0; height: 1px"
            :accept="handledImageTypes"
            @change="onFileSelected($event)"
          />
          <DsfrButton
            class="flex justify-center w-100"
            data-testid="take-a-picture"
            :label="labelButton"
            icon="ri-camera-fill"
            :icon-right="true"
            @click="
              $refs.fileInput.click();
              store.$reset();
            "
          />
        </div>
      </div>
      <div v-else class="text-center">
        <p class="loading font-bold">Analyse en cours</p>
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
  margin: 0.5rem auto;
}

:deep(.fr-content-media__caption) {
  margin: -0.5rem 0 0 0;
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
