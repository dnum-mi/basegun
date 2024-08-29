<script lang="ts" setup>
import { computed } from "vue";
import { useRouter } from "vue-router";

import { useStore } from "@/stores/result";
import axios from "axios";

const store = useStore();
const router = useRouter();

const img = computed(() => store.unresizeImage);
const alarmModel = computed(() => store.alarmModel);
const isAlarmGunMissingText = computed(() => store.isAlarmGunMissingText);
const isAlarmGunLowQuality = computed(() => store.isAlarmGunLowQuality);

const title = computed(() => {
  if (isAlarmGunMissingText.value === true) {
    return "Marquages non détéctés";
  } else if (isAlarmGunLowQuality.value === true) {
    return "Qualité d'image insuffisante";
  } else {
    return "Identification d'une arme d'alarme";
  }
});

function base64ToDataURL(base64: string): string {
  if (!base64.startsWith("data:")) {
    return `data:image/jpeg;base64,${base64}`;
  }
  return base64;
}

async function srcToFile(
  src: string,
  fileName: string,
  mimeType: string,
): Promise<File> {
  const res = await fetch(src);
  const buf = await res.arrayBuffer();
  return new File([buf], fileName, { type: mimeType });
}

async function uploadImage(base64: string, fileName: string) {
  try {
    const dataURL = base64ToDataURL(base64);
    const file = await srcToFile(dataURL, fileName, "image/jpeg");

    const fd = new FormData();
    fd.append("image", file, file.name);

    const response = await axios.post("/identification-blank-gun", fd, {});
    console.log("Réponse de l'API:", response);
    store.$patch({
      alarmModel: response.data.alarm_model,
      isAlarmGunLowQuality: response.data.low_quality,
      isAlarmGunMissingText: response.data.missing_text,
    });
    console.log("Modèle d'arme d'alarme détecté :", response.data.alarm_model);
  } catch (error) {
    console.error("Erreur lors de l'envoi du fichier:", error);
  }
}

onMounted(async () => {
  const base64String = img.value;
  if (base64String) {
    console.log("Chaîne Base64 récupérée pour l'envoi:", base64String);
    await uploadImage(base64String, "image.jpg");
  } else {
    console.error("La chaîne Base64 est vide ou non définie.");
  }
  if (alarmModel.value === "Alarm_model" || alarmModel.value === "Not_alarm") {
    setTimeout(() => {
      router.push({ name: "IdentificationFinalResult" });
    }, 5000);
  }
});

const alert = computed(() => {
  if (isAlarmGunMissingText.value === true) {
    return {
      title: "Nos algorithmes n'ont pas pu détecté de marquages sur l'image",
      description: "",
      type: "info",
    };
  } else if (isAlarmGunLowQuality.value === true) {
    return {
      title: "Détection défaillante en raison de la qualité de la photo",
      description:
        "La qualité de la photo est insuffisante pour lire les marquages. Nous vous invitons à prendre une photo plus rapprochée du marquage ou de meilleure qualité.",
      type: "info",
    };
  } else if (
    alarmModel.value === "Alarm_model" ||
    alarmModel.value === "Not_alarm"
  ) {
    return {
      title: "Détection réussie",
      description:
        "Les marquages présents sur l'arme ont été détectés avec succès.",
      type: "info",
    };
  } else {
    return {
      title: "",
      description: "",
      type: "",
    };
  }
});
</script>
<template>
  <h2 class="fr-mt-3w flex justify-center titlePage">
    <span> {{ title }}</span>
  </h2>

  <div class="fr-p-1w">
    <DsfrAlert
      :title="alert.title"
      :description="alert.description"
      :type="alert.type"
      is="h2"
    />
  </div>

  <div
    class="fr-mt-8w fr-col-sm-6 fr-col-lg-8 mx-auto text-center"
    v-show="isAlarmGunLowQuality || isAlarmGunMissingText"
  >
    <img src="@/assets/missing_marking.png" width="60%" class="img-deco" />
  </div>

  <div class="fr-mt-5w flex justify-center" v-show="isAlarmGunMissingText">
    <p><span class="font-bold">Voyez-vous des marquages sur l'arme ?</span></p>
  </div>
</template>
<style scoped>
.titlePage {
  flex-direction: column;
  text-align: center;
}
.img-deco {
  margin-top: auto;
  margin-bottom: 1em;
  width: 75%;
}
</style>
