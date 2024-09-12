<template>
  <div class="fr-container fr-col-12">
    <h1 class="fr-mt-3w flex justify-center titlePage">
      <div>Questionnaire demande</div>
      <div><span style="color: blue"> d'avis</span></div>
    </h1>

    <div
      v-if="formSubmissionStatus == ''"
      class="fr-col-12 fr-col-lg-6 mx-auto"
    >
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
            @close="showWarning = false"
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
            v-model.number="gun_length"
            class="mb-5"
            label="Longueur de l'arme (en cm)"
            type="number"
            label-visible
          />
          <DsfrInput
            v-model.number="gun_barrel_length"
            class="mb-5"
            label="Longueur du canon (en cm)"
            type="number"
            label-visible
          />
          <DsfrInput
            v-if="hasMarkings"
            v-model="markings_description"
            class="mb-5"
            label="Description des marquages"
            label-visible
          />
          <DsfrCheckbox
            class="fr-mt-2w fr-btn--sm"
            :label="
              hasMarkings
                ? 'Pas de marquages'
                : 'Décocher s\'il y a des marquages'
            "
            @click="hasMarkings = !hasMarkings"
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
            @close="showModalPhotos = false"
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
              v-if="hasMagazine"
              v-model="magazine_picture"
              label="Chargeur *"
              hint="Formats acceptés : .jpg, .png"
              :accept="['.jpg', '.png']"
              @change="handleFileChange"
            />

            <DsfrCheckbox
              class="fr-mt-2w fr-btn--sm"
              :label="
                hasMagazine
                  ? 'Pas de chargeur'
                  : 'Décocher s\'il y a un chargeur'
              "
              @click="hasMagazine = !hasMagazine"
            />
          </div>
        </div>
      </div>
    </div>
    <div v-else>
      <DsfrAlert
        v-if="formSubmissionStatus === 'success'"
        title="Le formulaire a été envoyé avec succès !"
        description="Vous recevrez prochainemenent une réponse sur votre adresse mail
          professionnel."
        type="success"
      />
      <DsfrAlert
        v-else
        title="Une erreur est survenue."
        description="Le formulaire n'a pas pu être envoyé. Veuillez réessayer plus tard."
        type="error"
      />
    </div>
  </div>

  <div class="footer">
    <div class="fr-col-12 fr-col-lg-6 footer-actions mx-auto">
      <template v-if="formSubmissionStatus == ''">
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
          :disabled="!areRequiredFieldsFilled() || loading"
          :icon-right="true"
          @click="routerFooter.next"
        />
      </template>
      <template v-else>
        <DsfrButton
          class="flex justify-center w-100"
          icon="ri-home-4-line"
          label="Retour à l'accueil"
          @click="$router.push({ name: 'StartPage' })"
        />
      </template>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, computed, onMounted, Ref } from "vue";
import { useRouter } from "vue-router";
import { sendExpertiseForm } from "@/api/api-client";
import { mgr } from "@/utils/authentication";
import { DateTime } from "luxon";

const test = ref("");
const steps = [
  "Identification du demandeur",
  "Informations sur l'arme",
  "Photos complémentaires",
];
const router = useRouter();
const currentStep = ref(1);
const todayDate = DateTime.now().setZone("Europe/Paris").toISODate();
const loading = ref(false);

const typeArmeOptions = [
  { text: "Je ne sais pas", value: "Je ne sais pas" },
  { text: "Arme de poing", value: "Arme de poing" },
  { text: "Arme d'épaule", value: "Arme d'épaule" },
];

const [showWarning, showModalPhotos] = [ref(true), ref(true)];

const hasMagazine = ref(true);
const hasMarkings = ref(true);

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
      next: () => sendFormData(),
      icon: "ri-checkbox-circle-line",
    };
  }
});

const goToPreviousStep = () => (currentStep.value = currentStep.value - 1);

const goToNextStep = async () => {
  if (areRequiredFieldsFilled()) {
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
    access_token = user?.access_token;
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

const formSubmissionStatus = ref("");

const lastname = ref<string>("");
const firstname = ref<string>("");
const nigend = ref<string>("");
const una_or_procedure_number = ref<string>("");
const service = ref<string>("");
const phone = ref<string | undefined>(undefined);
const email = ref<string>("");
const seizure = ref<string>("");
const gun_type = ref<string>("");
const gun_length = ref<number | null>(null);
const gun_barrel_length = ref<number | null>(null);
const markings_description = ref<string>("");
const left_picture = ref<File | null>(null);
const right_picture = ref<File | null>(null);
const markings_pictures = ref<File | null>(null);
const magazine_picture = ref<File | null>(null);

var files = [];
var access_token = "";

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
    return hasMagazine.value
      ? baseValidation && magazine_picture.value
      : baseValidation;
  },
};

const areRequiredFieldsFilled = () => {
  const validate = stepValidations[currentStep.value];
  return validate ? validate() : false;
};

const handleFileChange = (newFiles: FileList) => {
  files = files.concat(Array.from(newFiles));
};

// Envoi du formulaire vers l'endpoint
const sendFormData = async () => {
  loading.value = true;
  sendExpertiseForm(
    {
      lastname: lastname.value,
      firstname: firstname.value,
      nigend: nigend.value,
      service: service.value,
      phone: phone.value,
      email: email.value,
      seizure: seizure.value,
      una_or_procedure_number: una_or_procedure_number.value,
      gun_type: gun_type.value,
      gun_length: gun_length.value,
      gun_barrel_length: gun_barrel_length.value,
      markings_description: markings_description.value,
      files: files,
    },
    access_token,
  )
    .then((response) => {
      formSubmissionStatus.value = "success";
    })
    .catch((error) => {
      formSubmissionStatus.value = "error";
    })
    .finally(() => {
      loading.value = false;
    });
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

.container-img {
  display: flex;
  justify-content: center;
  flex-direction: row;
  flex-wrap: wrap;
  align-items: center;
  text-align: center;
}
</style>
