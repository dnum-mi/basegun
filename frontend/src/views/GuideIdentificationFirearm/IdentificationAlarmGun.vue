<script lang="ts" setup>
import { computed } from "vue";

import { useStore } from "@/stores/result";

const store = useStore();

const alarmGunException = computed(() => store.alarmGunException);
const isAlarmGun = computed(() => store.isAlarmGun);

const titleMap = {
  MissingText: "Marquages non détectés",
  LowQuality: "Qualité d'image insuffisante",
};

const title = computed(
  () =>
    titleMap[alarmGunException.value] || "Identification d'une arme d'alarme",
);
</script>
<template>
  <h1 class="fr-mt-3w flex justify-center titlePage">
    <span data-testid="title-page"> {{ title }}</span>
  </h1>

  <div class="fr-p-1w">
    <div v-if="isAlarmGun">
      <DsfrAlert
        title="Détection réussie"
        description="Les marquages présents sur l'arme ont été détectés avec succès."
        type="info"
      />
    </div>

    <div v-else-if="alarmGunException === 'LowQuality'">
      <DsfrAlert
        title="Détection défaillante en raison de la qualité de la photo"
        description="La qualité de la photo est insuffisante pour lire les marquages. Nous vous invitons à prendre une photo plus rapprochée du marquage ou de meilleure qualité."
        type="info"
      />
    </div>

    <div v-else-if="alarmGunException === 'MissingText'">
      <DsfrAlert
        title="Nos algorithmes n'ont pas pu détecter de marquages sur l'image."
        type="info"
      />
    </div>
  </div>

  <div class="fr-mt-8w fr-col-sm-6 fr-col-lg-8 mx-auto text-center">
    <div v-if="alarmGunException !== undefined">
      <img src="@/assets/missing_markings.png" class="img-deco" />
    </div>
    <div v-else>
      <img src="@/assets/markings.png" class="img-deco" />
    </div>
  </div>

  <div
    class="fr-mt-5w flex justify-center"
    v-show="alarmGunException === 'MissingText'"
  >
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
  padding-bottom: 5em;
  width: 65%;
}
</style>
