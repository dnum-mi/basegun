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

const typology = computed(() => store.typology);
const confidence = computed(() => store.confidence);
const confidenceLevel = computed(() => store.confidenceLevel);
const imgUrl = computed(() => store.imgUrl);

const showModal = ref(false);

function onClose() {
  store.tutorialFeedback = "";
  showModal.value = false;
}

async function submitTutorialFeedback() {
  const feedback = {
    image_url: imgUrl.value,
    tutorial_feedback: store.tutorialFeedback,
    label: typology.value,
    tutorial_option: store.currentOptionStep[store.currentStep] || null,
    route_name: route.name,
    confidence: confidence.value,
    confidence_level: confidenceLevel.value,
  };
  await axios
    .post("/tutorial-feedback", feedback)
    .then(async () => {
      store.tutorialFeedback = feedback.tutorial_feedback;
      setMessage({
        type: "success",
        message: "Votre message a été pris en compte",
      });
    })
    .catch(async (err) => {
      import.meta.env.DEV && console.log(err);
      setMessage({
        type: "error",
        message: "Une erreur a eu lieu en enregistrant de votre message.",
      });
    })
    .finally(() =>
      setTimeout(() => {
        store.tutorialFeedback = "";
        router.push({ name: "ResultPage" });
      }, 3000),
    );
}
</script>
<template>
  <div class="text-center">
    <a class="help" href="#" @click="showModal = true">
      Je n'arrive pas à réaliser cette étape
      <VIcon name="ri-information-line" />
    </a>
  </div>
  <Teleport to="body">
    <DsfrModal title="" :opened="showModal" @close="onClose()">
      <div class="modal">
        <div class="modal-content">
          <div class="fr-modal__title fr-mb-2w">
            <VIcon name="ri-arrow-right-line" scale="1.5" />
            Je n'arrive pas à compléter une étape
          </div>
          <p>
            Si vous rencontrez une difficulté pour poursuivre ce tutoriel, nous
            vous conseillons de faire appel à un expert. <br />
            <br />En attendant, vous pouvez nous permettre d'améliorer le
            contenu de ce tutoriel en nous décrivant votre problème ci-dessous.
          </p>
          <DsfrInput
            v-model="store.tutorialFeedback"
            label="Décrivez votre problème"
            label-visible
            is-textarea
          />
        </div>
        <div>
          <SnackbarAlert class="text-center pt-3" />
        </div>
        <div class="small-blank" />
        <div class="modal-footer">
          <DsfrButton
            label="Valider et retour au résultat"
            :disabled="!store.tutorialFeedback"
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

.modal {
  display: flex;
  flex-direction: column;
}

.modal-content {
  flex: 1;
  overflow-y: auto;
}

.modal-footer {
  position: sticky;
  bottom: 0;
  text-align: center;
  background-color: #f5f5fe;
  box-shadow: 0 -4px 16px rgb(0 0 0 / 25%);
  padding: 1rem !important;
  width: 100%;
}
.modal-footer button {
  width: 100%;
}
</style>
