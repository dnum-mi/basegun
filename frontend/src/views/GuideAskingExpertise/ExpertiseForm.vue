<template>
  <div>
    <h1 class="fr-mt-3w flex justify-center titlePage">
      <div>Questionnaire demande</div>
      <div><span style="color: blue"> d'avis</span></div>
    </h1>

    <div class="fr-col-11 fr-col-lg-6 mx-auto">
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
                  expert auprès d'un laboratoire de PTS ou de l'IRCGN. <br />
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
            v-model="last_name"
            class="mb-5"
            label="Nom"
            label-visible
            required="true"
            disabled="true"
          />
          <DsfrInput
            v-model="first_name"
            class="mb-5"
            label="Prénom"
            label-visible
            required="true"
            disabled="true"
          />
          <div v-if="police_matricule === undefined">
            <DsfrInput
              v-model="uid"
              class="mb-5"
              label="NIGEND"
              label-visible
              required="true"
              :disabled="true"
            />
          </div>
          <div v-else>
            <DsfrInput
              v-model="police_matricule"
              class="mb-5"
              label="RIO ou Matricule"
              label-visible
              required="true"
              :disabled="false"
            />
          </div>
          <DsfrInput
            v-model="service"
            class="mb-5"
            label="Service d'affectation"
            label-visible
          />
          <DsfrInput
            v-model="phone_number"
            class="mb-5"
            label="Numéro de téléphone"
            hint="Format attendu : 06 12 34 56 78"
            label-visible
            required="true"
            disabled="true"
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
            v-model="date"
            class="mb-5"
            label="Date de la saisie"
            type="date"
            label-visible
            required="true"
          />
          <DsfrInput
            v-model="numeroProcedure"
            class="mb-5"
            label="UNA / Numéro de procédure"
            label-visible
            required="true"
          />
          <DsfrSelect
            v-model="weapon_type"
            class="mb-5"
            label="Type d'arme"
            :options="typeArmeOptions"
          />
          <DsfrInput
            v-model="weapon_length"
            class="mb-5"
            label="Longueur de l'arme (en cm)"
            type="number"
            label-visible
          />
          <DsfrInput
            v-model="weapon_barrel_length"
            class="mb-5"
            label="Longueur du canon (en cm)"
            type="number"
            label-visible
          />
          <DsfrInput
            v-if="showMarquage"
            v-model="markings"
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
            :opened="showModalPhotos"
            @close="onClose()"
          >
            <template #default>
              <div class="fr-alert fr-alert--warning">
                <div class="flex justify-content">
                  <p>
                    Pour faciliter l'analyse de votre demande, veuillez tenir
                    compte de la liste des photos à prendre en veillant à la
                    qualité de celles-ci (<span class="font-bold"
                      >netteté, exposition, orientation, sans perspective)
                      :</span
                    >
                    <br />
                  </p>
                </div>
                <br />
                <li>
                  <span class="font-bold"
                    >Vue d'ensemble de l'arme côté gauche</span
                  >
                </li>
                <li>
                  <span class="font-bold"
                    >Vue d'ensemble de l'arme côté droite</span
                  >
                </li>
                <li>
                  <span class="font-bold"
                    >Vue(s) rapprochée(s) des marquages et poinçon(s)</span
                  >
                </li>
                <li><span class="font-bold">Une photo du chargeur</span></li>
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
              v-model="picture_left"
              label="Vue d'ensemble côté gauche *"
              hint="Formats acceptés : .jpg, .png"
              :accept="['.jpg', '.png']"
              @change="(files) => handleFileUpload(files, 'picture_left')"
            />
          </div>

          <div class="separatorUpload">
            <DsfrFileUpload
              v-model="picture_right"
              label="Vue d'ensemble côté droite *"
              hint="Formats acceptés : .jpg, .png"
              :accept="['.jpg', '.png']"
              @change="(files) => handleFileUpload(files, 'picture_right')"
            />
          </div>

          <div class="separatorUpload">
            <DsfrFileUpload
              v-model="picture_markings"
              label="Une ou plusieurs vue(s) rapprochée(s) des marquages et poinçons *"
              hint="Formats acceptés : .jpg, .png"
              :accept="['.jpg', '.png']"
              multiple
              @change="(files) => handleFileUpload(files, 'picture_markings')"
            />
          </div>

          <div class="separatorUpload fr-mb-4w">
            <DsfrFileUpload
              v-if="showChargeur"
              v-model="picture_charger"
              label="Chargeur *"
              hint="Formats acceptés : .jpg, .png"
              :accept="['.jpg', '.png']"
              @change="(files) => handleFileUpload(files, 'picture_charger')"
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
                  v-if="formSubmissionStatus === errorMessage"
                  class="form-submission-status"
                >
                  <DsfrAlert
                    title="Erreur"
                    description="Le formulaire n'a pas pu être envoyé. Veuillez réessayer plus tard."
                    type="error"
                  />
                </div>
                <div
                  v-else-if="formSubmissionStatus === successMessage"
                  class="form-submission-status"
                >
                  <DsfrAlert
                    title="Succès"
                    description="Le formulaire a été envoyé avec succès."
                    type="success"
                  />
                </div>
                <div>
                  <SnackbarAlert class="text-center fr-pt-3w" />
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
import { ref } from "vue";
import { useRouter } from "vue-router";
import { sendExpertiseForm } from "@/api/api-client";

const formData = new FormData();
const steps = [
  "Identification du demandeur",
  "Informations sur l'arme",
  "Photos complémentaires",
];
const router = useRouter();
const currentStep = ref(1);

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

const goToNextStep = () => {
  sendData();
  currentStep.value = currentStep.value + 1;
};

const last_name: Ref<string> = ref("");
const first_name: Ref<string> = ref("");
const uid: Ref<string | undefined> = ref(undefined);
const police_matricule: Ref<string | undefined> = ref(undefined);
const numeroProcedure: Ref<number | null> = ref(null);
const service: Ref<string> = ref("");
const phone_number: Ref<string> = ref("");
const email: Ref<string> = ref("");
const date: Ref<string> = ref("");
const weapon_type: Ref<string> = ref("");
const weapon_length: Ref<number | null> = ref(null);
const weapon_barrel_length: Ref<number | null> = ref(null);
const markings: Ref<string> = ref("");
const picture_left: Ref<File | null> = ref(null);
const picture_right: Ref<File | null> = ref(null);
const picture_markings: Ref<File[]> = ref([]);
const picture_charger: Ref<File | null> = ref(null);

const stepValidations = {
  1: () =>
    last_name.value.trim() !== "" &&
    first_name.value.trim() !== "" &&
    (police_matricule.value !== "" || uid.value !== "") &&
    phone_number.value.trim() !== "" &&
    email.value.trim() !== "",
  2: () => date.value.trim() !== "" && numeroProcedure.value !== 0,
  3: () => {
    const baseValidation =
      picture_left.value && picture_right.value && picture_markings.value;
    return showChargeur.value
      ? baseValidation && picture_charger.value
      : baseValidation;
  },
};

const areRequiredFieldsFilled = () => {
  const validate = stepValidations[currentStep.value];
  return validate ? validate() : false;
};

const stepFormMappings = {
  1: () => ({
    last_name: last_name.value,
    first_name: first_name.value,
    police_matricule: police_matricule.value,
    uid: uid.value,
    numeroProcedure: numeroProcedure.value,
    service: service.value,
    phone_number: phone_number.value,
    email: email.value,
  }),
  2: () => ({
    date: date.value,
    weapon_type: weapon_type.value,
    weapon_length: weapon_length.value,
    weapon_barrel_length: weapon_barrel_length.value,
    markings: markings.value,
  }),
  3: (fieldName: string, base64String: string) => ({
    [fieldName]: base64String,
  }),
};

const getCurrentFormData = (
  fieldName: string = "",
  base64String: string = "",
) => {
  const formDataFunction = stepFormMappings[currentStep.value];
  return formDataFunction ? formDataFunction(fieldName, base64String) : {};
};

const handleFileUpload = async (files, vModel) => {
  if (files && files.length > 0) {
    if (files.length === 1) {
      const file = files[0];
      const base64String = await readFileAsBase64(file);
      const base64Data = base64String.split(",")[1];
      const formDataToUpdate = getCurrentFormData(vModel, base64Data);
      handleFormDataUpdate(formDataToUpdate);
    } else {
      const fileArray = Array.from(files);
      const base64Strings = await Promise.all(
        fileArray.map((file) => readFileAsBase64(file)),
      );
      const formDataArray = base64Strings.map((base64String, index) => {
        const base64Data = base64String.split(",")[1];
        return getCurrentFormData(`${vModel}[${index}]`, base64Data);
      });
      formDataArray.forEach((formData) => {
        handleFormDataUpdate(formData);
      });
    }
  }
};

const sendData = () => {
  const formDataToUpdate = getCurrentFormData();
  handleFormDataUpdate(formDataToUpdate);
};

const handleFormDataUpdate = (form: Record<string, number | string | File>) => {
  Object.entries(form).forEach(([key, value]) => {
    if (formData.has(key)) {
      formData.set(key, value);
    } else {
      formData.append(key, value);
    }
  });
};

const readFileAsBase64 = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      const base64String = reader.result as string;
      resolve(base64String);
    };
    reader.onerror = (error) => {
      reject(error);
    };
    reader.readAsDataURL(file);
  });
};

const handleSubmit = async () => {
  await sendData();
  await sendFormData();
  showModalSubmit.value = true;
};

const sendFormData = () => {
  sendExpertiseForm(formData)
    .then(() => {
      formSubmissionStatus.value = successMessage;
    })
    .catch(() => {
      formSubmissionStatus.value = errorMessage;
    });
};

const formSubmissionStatus = ref<boolean | null>(null);
const [successMessage, errorMessage] = [ref(true), ref(false)];
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
</style>
