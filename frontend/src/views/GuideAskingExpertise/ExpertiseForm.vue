<template>
  <div class="fr-container fr-col-12">
    <h1 class="fr-mt-3w flex justify-center titlePage">
      <div>Questionnaire demande</div>
      <div><span style="color: blue"> d'avis</span></div>
    </h1>

    <div class="fr-col-12 fr-col-lg-6 mx-auto">
      <div class="fr-mb-5w">
        <StepsGuide
          class="!fr-container"
          :steps="steps"
          :current-step="currentStep"
        />
      </div>

      <p><span style="color: red">*</span> : Champ obligatoire</p>

      <div v-if="currentStep === 1">
        <Teleport to="body">
          <DsfrModal
            title="Avertissement"
            :opened="showWarning"
            icon="ri-error-warning-line"
            @close="onClose()"
          >
            <template #default>
              <div class="fr-alert fr-alert--warning">
                <p>
                  Avant de procéder à cette demande de contact, veuillez noter
                  que vous êtes sur le point d'envoyer une demande d'avis à un
                  expert auprès de l'IRCGN. <br />
                  <br />
                  <span class="font-bold"
                    >Assurez-vous que cette demande est conforme aux règles en
                    vigueur et que vous disposez de toutes les autorisations
                    nécessaires.
                  </span>
                  <br />
                  <br />
                  En cas de doute, veuillez contacter votre supérieur
                  hiérarchique ou le service compétent. En procédant,
                  <span class="font-bold"
                    >vous confirmez votre compréhension et votre engagement à
                    établir une procédure d'expertise.</span
                  >
                </p>
              </div>
              <div class="fr-mt-3w">
                <DsfrButton
                  class="justify-center confirm-button flex !w-full"
                  icon="ri-checkbox-circle-line"
                  label="Je confirme avoir pris connaissance des consignes"
                  @click="showWarning = false"
                />
              </div>
            </template>
          </DsfrModal>
        </Teleport>

        <div class="justify-center fr-pb-15w">
          <DsfrInput
            v-model="lastname"
            class="mb-5"
            label="Nom"
            label-visible
            required="true"
            disabled="true"
          />
          <DsfrInput
            v-model="firstname"
            class="mb-5"
            label="Prénom"
            label-visible
            required="true"
            disabled="true"
          />
          <DsfrInput
            v-model="nigend"
            class="mb-5"
            label="NIGEND"
            label-visible
            required="true"
            disabled="true"
          />
          <DsfrInput
            v-model="service"
            class="mb-5"
            label="Service d'affectation"
            label-visible
          />
          <DsfrInput
            v-model="phone"
            class="mb-5"
            label="Numéro de téléphone"
            hint="Format attendu : 06 12 34 56 78"
            label-visible
            required="true"
          />
          <DsfrInput
            id="adresse"
            v-model="email"
            class="mb-5"
            label="Adresse électronique"
            type="email"
            label-visible
            required="true"
            disabled="true"
          />
        </div>
      </div>

      <div v-if="currentStep === 2">
        <div class="justify-center fr-pb-15w">
          <DsfrInput
            v-model="seizure"
            class="mb-5"
            label="Date de la saisie"
            type="date"
            label-visible
            required="true"
          />
          <DsfrInput
            v-model="una_or_procedure_number"
            class="mb-5"
            label="UNA / Numéro de procédure"
            label-visible
            required="true"
          />
          <DsfrSelect
            v-model="gun_type"
            class="mb-5"
            label="Type d'arme"
            :options="typeArmeOptions"
          />
          <DsfrInput
            v-model="gun_length"
            class="mb-5"
            label="Longueur de l'arme (en cm)"
            type="number"
            label-visible
          />
          <DsfrInput
            v-model="gun_barrel_length"
            class="mb-5"
            label="Longueur du canon (en cm)"
            type="number"
            label-visible
          />
          <DsfrInput
            v-if="showMarquage"
            v-model="markings_description"
            class="mb-5"
            label="Description des marquages"
            label-visible
          />
          <DsfrCheckbox
            class="fr-mt-2w fr-btn--sm"
            :label="buttonLabelMarquage"
            @click="toggleMarquage"
          />
        </div>
      </div>

      <div v-if="currentStep === 3">
        <Teleport to="body">
          <DsfrModal
            title="Consignes pour les prises de photos"
            icon="ri-arrow-right-line"
            size="lg"
            :opened="showModalPhotos"
            @close="onClose()"
          >
            <template #default>
              <div class="fr-alert fr-alert--warning">
                <div class="flex justify-content">
                  <p>
                    Pour faciliter l'analyse de votre demande, veuillez tenir
                    compte de la liste des photos à prendre en veillant à la
                    qualité de celles-ci
                    <span class="font-bold"
                      >(netteté, exposition, orientation, sans
                      perspective).</span
                    >
                  </p>
                </div>
              </div>
              <div class="fr-col-12 container-img">
                <div class="fr-col-6 fr-p-1w">
                  <span class="font-bold"
                    ><li>Vue d'ensemble de l'arme côté gauche</li></span
                  >
                  <img
                    src="@/assets/arme_cote_gauche.png"
                    width="90%"
                    alt="Vue d'ensemble de l'arme côté gauche"
                  />
                </div>
                <div class="fr-col-6 fr-p-1w">
                  <span class="font-bold"
                    ><li>Vue d'ensemble de l'arme côté droit</li></span
                  >
                  <img
                    src="@/assets/arme_cote_droit.png"
                    width="90%"
                    alt="Vue d'ensemble de l'arme côté droit"
                  />
                </div>
              </div>
              <div class="fr-col-12 container-img">
                <div class="fr-col-6 fr-p-1w">
                  <span class="font-bold"
                    ><li>
                      Vue(s) rapprochée(s) des marquages et poinçon(s)
                    </li></span
                  >
                  <img
                    src="@/assets/arme_vue_rapprochee.png"
                    width="90%"
                    alt="Vue(s) rapprochée(s) des marquages et poinçon(s)"
                  />
                </div>
                <div class="fr-col-6 fr-p-1w">
                  <span class="font-bold"><li>Une photo du chargeur</li></span>
                  <img
                    src="@/assets/chargeur.jpeg"
                    width="90%"
                    alt="Une photo du chargeur"
                  />
                </div>
              </div>
              <div class="fr-mt-3w">
                <DsfrButton
                  class="justify-center flex !w-full"
                  icon="ri-checkbox-circle-line"
                  label="Je confirme avoir pris connaissance des consignes"
                  @click="showModalPhotos = false"
                />
              </div>
            </template>
          </DsfrModal>
        </Teleport>

        <div class="fr-mt-2w fr-mb-2w">
          <a class="help" href="#" @click="showModalPhotos = true">
            Consignes de prise de photos
            <VIcon name="ri-mail-line" />
          </a>
        </div>

        <div class="justify-center fr-pb-15w">
          <div class="separatorUpload">
            <DsfrFileUpload
              v-model="left_picture"
              label="Vue d'ensemble côté gauche *"
              hint="Formats acceptés : .jpg, .png"
              :accept="['.jpg', '.png']"
              @change="handleFileChange"
            />
          </div>

          <div class="separatorUpload">
            <DsfrFileUpload
              v-model="right_picture"
              label="Vue d'ensemble côté droit *"
              hint="Formats acceptés : .jpg, .png"
              :accept="['.jpg', '.png']"
              @change="handleFileChange"
            />
          </div>

          <div class="separatorUpload">
            <DsfrFileUpload
              v-model="markings_pictures"
              label="Une vue rapprochée des marquages et poinçons *"
              hint="Formats acceptés : .jpg, .png"
              :accept="['.jpg', '.png']"
              @change="handleFileChange"
            />
          </div>

          <div class="separatorUpload fr-mb-4w">
            <DsfrFileUpload
              v-if="showChargeur"
              v-model="magazine_picture"
              label="Chargeur *"
              hint="Formats acceptés : .jpg, .png"
              :accept="['.jpg', '.png']"
              @change="handleFileChange"
            />

            <DsfrCheckbox
              class="fr-mt-2w fr-btn--sm"
              :label="buttonLabelChargeur"
              @click="toggleChargeur"
            />
          </div>

          <Teleport to="body">
            <DsfrModal
              title="Envoi du formulaire"
              icon="ri-arrow-right-line"
              :opened="showModalSubmit"
              @close="onClose()"
            >
              <template #default>
                <div
                  v-if="formSubmissionStatus === 'success'"
                  class="form-submission-status"
                >
                  <DsfrAlert
                    title="Succès"
                    description="Le formulaire a été envoyé avec succès."
                    type="success"
                  />
                  <p>
                    Vous recevrez prochainemenent une réponse sur votre adresse
                    mail professionnel.
                  </p>
                </div>
                <div v-else class="form-submission-status">
                  <DsfrAlert
                    title="Erreur"
                    description="Le formulaire n'a pas pu être envoyé. Veuillez réessayer plus tard."
                    type="error"
                  />
                </div>
                <div class="small-blank" />
                <div class="fr-col-12 fr-col-lg-6 footer-actions mx-auto">
                  <DsfrButton
                    class="flex justify-center"
                    icon="ri-home-4-line"
                    label="Retour à l'accueil"
                    @click="$router.push({ name: 'StartPage' })"
                  />
                </div>
              </template>
            </DsfrModal>
          </Teleport>
        </div>
      </div>
    </div>
  </div>

  <div class="footer">
    <div class="fr-col-12 fr-col-lg-6 footer-actions mx-auto">
      <DsfrButton
        class="flex justify-center !w-full"
        icon="ri-arrow-left-line"
        :secondary="true"
        label="Précédent"
        @click="routerFooter.back"
      />
      <DsfrButton
        class="flex justify-center !w-full"
        :icon="routerFooter.icon"
        label="Suivant"
        :disabled="!areRequiredFieldsFilled()"
        :icon-right="true"
        @click="routerFooter.next"
      />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, computed, onMounted, Ref } from "vue";
import { useRouter } from "vue-router";
import { sendExpertiseForm } from "@/api/api-client";
import { mgr } from "@/utils/authentication";
import { DateTime } from "luxon";

const formData = new FormData();
const steps = [
  "Identification du demandeur",
  "Informations sur l'arme",
  "Photos complémentaires",
];
const router = useRouter();
const currentStep = ref(1);
const todayDate = DateTime.now().setZone("Europe/Paris").toISODate();

const typeArmeOptions = ref([
  { text: "Je ne sais pas", value: "Je ne sais pas" },
  { text: "Arme de poing", value: "Arme de poing" },
  { text: "Arme d'épaule", value: "Arme d'épaule" },
]);

const [showWarning, showModalPhotos, showModalSubmit] = [
  ref(true),
  ref(true),
  ref(false),
];

function onClose() {
  [showWarning.value, showModalPhotos.value, showModalSubmit.value] = [
    false,
    false,
    false,
  ];
}

const [showChargeur, showMarquage] = [ref(true), ref(true)];

const [buttonLabelChargeur, buttonLabelMarquage] = [
  ref("Pas de chargeur"),
  ref("Pas de marquage"),
];

const toggleChargeur = () => {
  showChargeur.value = !showChargeur.value;
  buttonLabelChargeur.value = showChargeur.value
    ? "Pas de chargeur"
    : "Décocher s'il y a un chargeur";
};

const toggleMarquage = () => {
  showMarquage.value = !showMarquage.value;
  buttonLabelMarquage.value = showMarquage.value
    ? "Pas de marquages"
    : "Décocher s'il y a des marquages";
};

/* eslint-disable camelcase */
const routerFooter = computed(() => {
  if (currentStep.value === 1) {
    return {
      back: () => router.back(),
      next: () => goToNextStep(),
      icon: "ri-arrow-right-line",
    };
  } else if (currentStep.value === 2) {
    return {
      back: () => goToPreviousStep(),
      next: () => goToNextStep(),
      icon: "ri-arrow-right-line",
    };
  } else {
    return {
      back: () => goToPreviousStep(),
      next: () => handleSubmit(),
      icon: "ri-checkbox-circle-line",
    };
  }
});

const goToPreviousStep = () => (currentStep.value = currentStep.value - 1);

const goToNextStep = async () => {
  if (areRequiredFieldsFilled()) {
    await sendData();
    currentStep.value = currentStep.value + 1;
  }
};

// Récupération des données de l'utilisateur
const getUserData = async () => {
  try {
    const user = await mgr.getUser();
    email.value = user.profile.email;
    service.value = user.profile.service;
    nigend.value = user.profile.nigend;
    firstname.value = user.profile.given_name;
    lastname.value = user.profile.family_name;
    phone.value = user.profile.phone_number;
    seizure.value = todayDate;
    getAccessToken.value = user?.access_token;
  } catch (error) {
    console.error(
      "Erreur pendant la récupération des données de l'utilisateur :",
      error,
    );
  }
};

onMounted(async () => {
  await getUserData();
});

const lastname: Ref<string> = ref("");
const firstname: Ref<string> = ref("");
const nigend: Ref<string> = ref("");
const una_or_procedure_number: Ref<string> = ref("");
const service: Ref<string> = ref("");
const phone: Ref<string | undefined> = ref(undefined);
const email: Ref<string> = ref("");
const seizure: Ref<string> = ref("");
const gun_type: Ref<string> = ref("");
const gun_length: Ref<number | null> = ref(null);
const gun_barrel_length: Ref<number | null> = ref(null);
const markings_description: Ref<string> = ref("");
const left_picture: Ref<File | null> = ref(null);
const right_picture: Ref<File | null> = ref(null);
const markings_pictures: Ref<File | null> = ref(null);
const magazine_picture: Ref<File | null> = ref(null);
const files: Ref<File[]> = ref([]);
const getAccessToken: Ref<string> = ref("");

// Validation des champs
const stepValidations = {
  1: () =>
    lastname.value.trim() !== "" &&
    firstname.value.trim() !== "" &&
    nigend.value !== "" &&
    phone.value !== "" &&
    email.value.trim() !== "",
  2: () =>
    seizure.value.trim() !== "" && una_or_procedure_number.value.trim() !== "",
  3: () => {
    const baseValidation =
      left_picture.value && right_picture.value && markings_pictures.value;
    return showChargeur.value
      ? baseValidation && magazine_picture.value
      : baseValidation;
  },
};

const areRequiredFieldsFilled = () => {
  const validate = stepValidations[currentStep.value];
  return validate ? validate() : false;
};

// Mapping des données du formulaire
const stepFormMappings = {
  1: () => ({
    lastname: lastname.value,
    firstname: firstname.value,
    nigend: nigend.value,
    service: service.value,
    phone: phone.value,
    email: email.value,
  }),
  2: () => ({
    seizure: seizure.value,
    una_or_procedure_number: una_or_procedure_number.value,
    gun_type: gun_type.value,
    gun_length: gun_length.value,
    gun_barrel_length: gun_barrel_length.value,
    markings_description: markings_description.value,
  }),
  3: () => ({
    files: files.value,
  }),
};

const handleFileChange = (newFiles: FileList) => {
  files.value = files.value.concat(Array.from(newFiles));
};

const getCurrentFormData = () => {
  const formDataFunction = stepFormMappings[currentStep.value];
  return formDataFunction ? formDataFunction() : {};
};

const sendData = async () => {
  const formDataToUpdate = getCurrentFormData();
  handleFormDataUpdate(formDataToUpdate);
};

// Mise à jour des données du formulaire
const handleFormDataUpdate = (form: Record<string, number | string | File>) => {
  console.log("Données mises à jour:", form);

  for (const [key, value] of Object.entries(form)) {
    if (key === "files" && Array.isArray(value)) {
      value.forEach((file) => {
        if (file instanceof File) {
          formData.append("files", file);
        }
      });
    } else {
      formData.append(key, value);
    }
  }
};

// Envoi du formulaire vers l'endpoint
const sendFormData = async () => {
  try {
    const response = await sendExpertiseForm(formData, getAccessToken.value);
    console.log("Formulaire soumis avec succès :", response);
    formSubmissionStatus.value = "success";
  } catch (error) {
    console.error("Erreur lors de la soumission du formulaire :", error);
    formSubmissionStatus.value = "error";
  }
};

const formSubmissionStatus = ref("");

const handleSubmit = async () => {
  await sendData();
  await sendFormData();
  showModalSubmit.value = true;
};
</script>

<style scoped>
.titlePage {
  flex-direction: column;
  text-align: center;
}

:deep(.fr-label) {
  margin-bottom: 12px;
}

.separatorUpload {
  border-bottom: 1px solid #000000;
  padding-bottom: 8px;
  font-weight: bold;
  margin-bottom: 20px;
}

:deep(.required) {
  color: red;
}

.form-submission-status {
  margin-top: 10px;
  padding: 10px;
  border-radius: 5px;
}

.container-img {
  display: flex;
  justify-content: center;
  flex-direction: row;
  flex-wrap: wrap;
  align-items: center;
  text-align: center;
}
</style>
