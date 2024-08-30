<script lang="ts" setup>
import { computed } from "vue";
import { useRoute, useRouter } from "vue-router";

import {
  identificationGuideSteps,
  identificationGuideStepsWithArmeAlarme,
  TYPOLOGIES,
  isAlarmGun,
} from "@/utils/firearms-utils/index";
import { useStore } from "@/stores/result";
import { uploadPhotoForAlarmGunDetection } from "@/api/api-client";

const store = useStore();
const router = useRouter();
const route = useRoute();

const confidenceLevel = computed(() => store.confidenceLevel);
const typology = computed(() => store.typology);
const alarmGunException = computed(() => store.alarmGunException);

const currentStep = ref(1);
const isLowConfidence = confidenceLevel.value === "low";

const steps = computed(() => {
  if (TYPOLOGIES[typology]?.dummyOptions || !isLowConfidence) {
    if (
      isAlarmGun() ||
      (!isAlarmGun() &&
        alarmGunException.value !== undefined &&
        store.selectedAmmo !== "billes")
    ) {
      return [
        "Typologie de l'arme",
        "Compléments",
        "Typologie de munitions",
        "Identification d'une arme d'alarme",
        "Résultat final",
      ];
    } else {
      return [
        "Typologie de l'arme",
        "Compléments",
        "Typologie de munitions",
        "Résultat final",
      ];
    }
  } else {
    return ["Résultat final"];
  }
});

const disabledValidation = computed(
  () => currentStep.value === 3 && store.selectedAmmo === undefined,
);

const goToNewRoute = () => {
  router.push({ name: identificationGuideSteps[currentStep.value - 1] });
};

const goToNewRouteWithArmeAlarme = () =>
  router.push({
    name: identificationGuideStepsWithArmeAlarme[currentStep.value - 1],
  });

const goOnAndFollow = computed(() =>
  currentStep.value === 1
    ? "Continuer"
    : currentStep.value === 3
      ? "Valider"
      : "Suivant",
);

const arrowOrCircleIcon = () =>
  currentStep.value === 4 ? "ri-checkbox-circle-line" : "ri-arrow-right-line";

const calculateRoute = (store) => {
  return store.selectedAmmo === "billes"
    ? { name: "IdentificationFinalResult" }
    : { name: "IdentificationAlarmGun" };
};

const handlePreviousButtonClick = () => {
  currentStep.value--;
  if (isAlarmGun() || (!isAlarmGun() && alarmGunException !== undefined)) {
    goToNewRouteWithArmeAlarme();
  } else {
    goToNewRoute();
  }
};

async function onFileSelected(event) {
  const uploadedFile = event.target.files[0];

  try {
    const result = await uploadPhotoForAlarmGunDetection(uploadedFile);

    if (result) {
      const { is_alarm_model, exception } = result;
      if (is_alarm_model === true) {
        store.$patch({ isAlarmGun: is_alarm_model });
      } else if (exception !== undefined) {
        store.$patch({
          isAlarmGun: is_alarm_model,
          alarmGunException: exception,
        });
      }
    }
    currentStep.value++;
    router.push({ name: "IdentificationFinalResult" });
  } catch (error) {
    console.error("Erreur lors de l'envoi de l'image :", error);
  }
}

const handledImageTypes = "image/jpeg, image/png, image/jpg";

const footerAlarmGun = computed(() => {
  if (alarmGunException === "LowQuality") {
    return {
      next: "Pas de marquages, passer à l'étape suivante",
      uploadPicture: "Reprendre la photo",
    };
  } else {
    return {
      next: "Non, passer à l'étape suivante",
      uploadPicture: "Oui, en prendre une photo rapprochée",
    };
  }
});

let alarmTimeout = ref<ReturnType<typeof setTimeout> | null>(null);
const alarmGunMounted = () => {
  if (
    isAlarmGun() ||
    (isAlarmGun() === false && alarmGunException === undefined)
  ) {
    alarmTimeout = setTimeout(() => {
      router.push({ name: "IdentificationFinalResult" });
      currentStep.value++;
    }, 5000);
  }
};

onBeforeUnmount(() => {
  if (alarmTimeout) {
    clearTimeout(alarmTimeout);
  }
});
</script>

<template>
  <div class="mt-5 fr-container">
    <div class="result fr-col-11 fr-col-lg-6 mx-auto">
      <StepsGuide
        v-if="
          TYPOLOGIES[typology]?.dummyOptions &&
          store.selectedOptions[0] !== 'revolver_black_powder'
        "
        class="!fr-container my-auto"
        :steps="steps"
        :current-step="currentStep"
      />
      <RouterView />
    </div>
  </div>
  <div
    v-if="
      $route.path === '/guide-identification/resultat-final' ||
      TYPOLOGIES[typology]?.dummyOptions == undefined
    "
    class="footer end z-1"
  >
    <div class="fr-col-11 fr-col-lg-6 mx-auto">
      <DsfrButton
        class="flex justify-center !w-full"
        label="Retour à l'accueil"
        icon="ri-home-4-line"
        data-testid="return-to-home-end"
        :icon-right="true"
        @click="$router.push({ name: 'StartPage' })"
      />
      <DsfrButton
        v-if="store.selectedOptions[0] !== 'revolver_black_powder'"
        class="mt-3 flex justify-center !w-full"
        label="Retourner à l'étape précédente"
        icon="ri-arrow-go-back-fill"
        :icon-right="true"
        secondary
        @click="handlePreviousButtonClick"
      />
    </div>
  </div>
  <div
    v-else-if="
      (isAlarmGun() || (!isAlarmGun() && alarmGunException)) &&
      route.path === '/guide-identification/munition-type'
    "
    class="footer content z-1"
  >
    <div class="fr-col-11 fr-col-lg-6 footer-actions mx-auto">
      <DsfrButton
        v-if="currentStep > 0"
        class="m-1 flex justify-center !w-full"
        icon="ri-arrow-left-line"
        :secondary="true"
        label="Précédent"
        @click="
          currentStep--;
          goToNewRoute();
        "
      />
      <DsfrButton
        class="fr-btn--md m-1 flex justify-center !w-full"
        :disabled="disabledValidation"
        data-testid="next-step"
        :icon="arrowOrCircleIcon()"
        :label="goOnAndFollow"
        :icon-right="true"
        @click="
          $router.push(calculateRoute(store));
          currentStep++;
        "
      />
    </div>
  </div>
  <div v-else class="footer z-1">
    <div v-if="confidenceLevel === 'low'" class="fr-col-11 fr-col-lg-6 mx-auto">
      <DsfrButton
        class="flex justify-center w-100"
        label="Identifier une nouvelle arme"
        icon="ri-camera-fill"
        :icon-right="true"
        @click="$router.push({ name: 'InstructionsPage' })"
      />
      <DsfrButton
        class="mt-3 flex justify-center w-100"
        label="Retour à l'accueil"
        icon="ri-home-4-line"
        :icon-right="true"
        secondary
        @click="$router.push({ name: 'StartPage' })"
      />
    </div>
    <div v-else class="fr-col-11 fr-col-lg-6 footer-actions mx-auto">
      <DsfrButton
        v-if="currentStep > 1"
        class="m-1 flex justify-center w-100"
        icon="ri-arrow-left-line"
        :secondary="true"
        label="Précédent"
        @click="
          currentStep--;
          goToNewRoute();
        "
      />
      <DsfrButton
        v-if="confidenceLevel !== 'low'"
        :disabled="disabledValidation"
        class="m-1 flex justify-center w-100"
        :icon="arrowOrCircleIcon()"
        :label="goOnAndFollow"
        :icon-right="true"
        data-testid="next-step"
        @click="
          currentStep++;
          goToNewRoute();
        "
      />
    </div>
  </div>

  <div
    v-if="$route.path === '/guide-identification/armes-alarme'"
    class="footer z-1"
  >
    <div v-if="alarmGunException !== undefined">
      <div class="fr-col-12 fr-col-lg-6 mx-auto">
        <input
          ref="fileInput"
          data-testid="select-file"
          type="file"
          style="width: 0; height: 1px"
          :accept="handledImageTypes"
          @change="onFileSelected($event)"
        />
        <DsfrButton
          class="flex justify-center !w-full fr-mb-1w"
          data-testid="take-a-picture"
          :label="footerAlarmGun.uploadPicture"
          icon="ri-camera-fill"
          :icon-right="true"
          @click="$refs.fileInput.click()"
        />

        <DsfrButton
          class="flex justify-center !w-full"
          data-testid="next-step"
          :label="footerAlarmGun.next"
          :icon-right="true"
          icon="ri-checkbox-circle-line"
          secondary
          @click="
            currentStep++;
            goToNewRouteWithArmeAlarme();
          "
        />
      </div>
    </div>
    <div v-else>
      <div class="flex justify-center fr-col-11 fr-col-lg-6 mx-auto">
        <IdentificationAlarmGun @vue:mounted="alarmGunMounted()" />
        <p>
          <VIcon name="ri:loop-left-line" animation="spin" scale="1.2" />
          Redirection vers la page <br />de résultat dans 5 secondes...
        </p>
      </div>
    </div>
  </div>
</template>

<style scoped>
.result {
  margin: 0 auto;
  max-width: 1000px;
}

:deep(.fr-icon-home-3-line) {
  color: var(--blue-france-sun-113-625);
}

p {
  color: var(--blue-france-sun-113-625);
}
</style>
