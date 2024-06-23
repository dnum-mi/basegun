<script lang="ts" setup>
import { ref, computed } from "vue";
import { useRoute, useRouter } from "vue-router";

import { useSnackbarStore } from "@/stores/snackbar";
import { useStore } from "@/stores/result";
import SnackbarAlert from "@/components/SnackbarAlert.vue";
import { sendTutorialFeedback } from "@/api/api-client";

const { setMessage } = useSnackbarStore();
const store = useStore();
const router = useRouter();
const route = useRoute();
const { setMessage } = useSnackbarStore();
const store = useStore();
const router = useRouter();
const route = useRoute();

const typology = computed(() => store.typology);
const confidence = computed(() => store.confidence);
const confidenceLevel = computed(() => store.confidenceLevel);
const imgUrl = computed(() => store.imgUrl);
const typology = computed(() => store.typology);
const confidence = computed(() => store.confidence);
const confidenceLevel = computed(() => store.confidenceLevel);
const imgUrl = computed(() => store.imgUrl);

const showModal = ref(false);
const showModal = ref(false);

function onClose() {
  tutorialFeedback.value = "";
  showModal.value = false;
function onClose() {
  tutorialFeedback.value = "";
  showModal.value = false;
}

const tutorialFeedback = ref("");

async function sendTutorialFeedback() {
  const feedback = {
    image_url: imgUrl.value,
    tutorial_feedback: tutorialFeedback.value,
    label: typology.value,
    selected_options: store.selectedOptions,
    route_name: route.name,
    confidence: confidence.value,
    confidence_level: confidenceLevel.value,
  };
  await axios
    .post("/tutorial-feedback", feedback)
    .then(() => {
      setMessage({
        type: "success",
        message: "Votre message a été pris en compte",
      });
  };
  await axios
    .post("/tutorial-feedback", feedback)
    .then(() => {
      setMessage({
        type: "success",
        message: "Votre message a été pris en compte",
      });
    })
    .catch((error) => {
      console.log(error);
      setMessage({
        type: "error",
        message: "Une erreur a eu lieu en enregistrant de votre message.",
      });
    })
    .finally(() =>
      setTimeout(() => {
        router.push({ name: "ResultPage" });
      }, 3000),
    );
    .finally(() =>
      setTimeout(() => {
        router.push({ name: "ResultPage" });
      }, 3000),
    );
}
</script>
<template>
  <div class="text-center">
    <a class="help" href="#" @click="showModal = true">
    <a class="help" href="#" @click="showModal = true">
      Je n'arrive pas à réaliser cette étape
      <VIcon name="ri-information-line" />
      <VIcon name="ri-information-line" />
    </a>
  </div>
  <Teleport to="body">
    <DsfrModal title="" :opened="showModal" @close="onClose()">
    <DsfrModal title="" :opened="showModal" @close="onClose()">
      <div class="modal">
        <div class="modal-content">
          <div class="fr-modal__title fr-mb-2w">
            <VIcon name="ri-arrow-right-line" scale="1.5" />
          <div class="fr-modal__title fr-mb-2w">
            <VIcon name="ri-arrow-right-line" scale="1.5" />
            Je n'arrive pas à compléter une étape
          </div>
          </div>
          <p>
            Si vous rencontrez une difficulté pour poursuivre ce tutoriel, nous
            vous conseillons de faire appel à un expert. <br />
            <br />En attendant, vous pouvez nous permettre d'améliorer le
            contenu de ce tutoriel en nous décrivant votre problème ci-dessous.
            Si vous rencontrez une difficulté pour poursuivre ce tutoriel, nous
            vous conseillons de faire appel à un expert. <br />
            <br />En attendant, vous pouvez nous permettre d'améliorer le
            contenu de ce tutoriel en nous décrivant votre problème ci-dessous.
          </p>
          <DsfrInput
            v-model="tutorialFeedback"
            label="Décrivez votre problème"
            label-visible
            is-textarea
          />
          <SnackbarAlert class="text-center pt-3" />
          <DsfrButton
            class="mt-5 w-100"
            label="Valider et retour au résultat"
            :disabled="tutorialFeedback === ''"
            @click="sendTutorialFeedback()"
          />
        </div>
      </div>
    </DsfrModal>
  </Teleport>
</template>
<style scoped>
:deep(.fr-btn) span {
  margin: auto !important;
}
</style>
