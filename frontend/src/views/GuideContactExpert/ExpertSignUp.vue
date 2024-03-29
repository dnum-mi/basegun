<template>
  <div>
    <div class="fr-col-11 fr-col-lg-6 mt-8 mx-auto">
      <div class="mb-5">
        <StepsGuide
          class="!fr-container steps-guide"
          :steps="steps"
          :current-step="currentStep"
        />
      </div>

      <div v-if="currentStep === 1">
        <div class="m-1 justify-center pb-30">
          <h5>Se créer un compte avec son adresse mail professionnelle (interieur.gouv.fr)</h5>
          <DsfrInputGroup>
            <DsfrInput
              v-model="agent_email"
              type="email"
              class="mb-5"
              label="Identifiant"
              hint="Format attendu : nom@interieur.gouv.fr"
              label-visible
              required="true"
            />
            <h5>Créer un mot de passe</h5>
            <DsfrInput
              v-model="agent_password"
              :type="typeInput"
              class="mb-5"
              label="Saisir son mot de passe"
              label-visible
              required="true"
            />
            <DsfrButton
              class="mb-5"
              size="sm"
              @click="revealPassword"
            >
              {{ revealMessage }}
            </DsfrButton>

            <p>
              <DsfrBadge
                label="12 caractères minimum"
              />
              <DsfrBadge
                label="1 caractère spécial minimum"
              />
              <DsfrBadge
                label="1 chiffre minimum"
              />
            </p>

            <DsfrInput
              v-model="confirmPassword"
              :type="typeInput"
              :disabled="!isValide"
              class="mb-5"
              label="Confirmer le mot de passe"
              label-visible
              required="true"
            />
            <small
              v-if="confirmPassword.length"
              :class="isIdentique ? 'good' : 'bad' "
            >
              {{ isIdentiqueMessage }}</small>
            <DsfrButton
              class="mt-2 mb-5"
              size="sm"
              @click="revealPassword"
            >
              {{ revealMessage }}
            </DsfrButton>
          </DsfrInputGroup>
        </div>
      </div>

      <div v-if="currentStep === 2">
        <div class="m-1 justify-center pb-30">
          <DsfrInputGroup>
            <h5>Identité personnelle</h5>
            <DsfrInput
              v-model="agent_lastname"
              class="mb-5"
              label="Nom"
              label-visible
              required="true"
            />

            <DsfrInput
              v-model="agent_firstname"
              class="mb-5"
              label="Prénom"
              label-visible
              required="true"
            />

            <DsfrInput
              v-model="agent_identifier"
              type="number"
              class="mb-5"
              label="NIGEND / Matricule (PN)"
              label-visible
              required="true"
            />

            <DsfrInput
              v-model="agent_phone_number"
              type="number"
              class="mb-5"
              label="Numéro de téléphone"
              hint="Format attendu : +33 6 12 34 56 78"
              label-visible
              required="true"
            />

            <div class="fr-col-11 fr-col-lg-6 mx-auto">
              <h5>Entité de rattachement</h5>
              <DsfrButton
                class="m-1 pt-2 pb-2 flex justify-center !w-full"
                label="Gendarmerie"
                :disabled="disabledGendarmerie"
                @click="selectGendarmerie"
              />
              <DsfrButton
                class="m-1 pt-2 pb-2 flex justify-center !w-full mb-8"
                label="Police"
                :disabled="disabledPolice"
                @click="selectPolice"
              />
              <div v-if="showRadioButtonSet">
                <DsfrRadioButtonSet
                  v-model="checkboxEntity"
                  :inline="true"
                  :small="false"
                  :options="ptsOptions"
                  @click="selectPolice"
                />
              </div>
            </div>
          </DsfrInputGroup>

          <Teleport to="body">
            <DsfrModal
              title=""
              :opened="showModalSubmit"
              @close="onClose()"
            >
              <div class="modal">
                <div class="modal-content">
                  <h3>
                    <VIcon
                      name="ri-arrow-right-line"
                      scale="1.5"
                    />
                    Demande de création de compte
                  </h3>

                  <div
                    v-if="formSubmissionStatus === errorMessage"
                    class="form-submission-status"
                  >
                    <DsfrAlert
                      title="Erreur"
                      description="Votre demande de création de compte n'a pas pu être envoyé. Veuillez réessayer plus tard."
                      type="error"
                    />
                  </div>
                  <div
                    v-else-if="formSubmissionStatus === successMessage"
                    class="form-submission-status"
                  >
                    <DsfrAlert
                      title="Succès"
                      description="Votre demande de création de compte a été envoyé avec succès."
                      type="success"
                    />
                  </div>
                </div>
                <div>
                  <SnackbarAlert class="text-center pt-3" />
                </div>
                <div class="small-blank" />
                <div class="modal-footer fr-col-11 fr-col-lg-6 footer-actions mx-auto">
                  <router-link
                    v-slot="{navigate}"
                    class="navigate"
                    :to="{name: 'StartPage'}"
                  >
                    <DsfrButton
                      class="confirm-button m-1 flex justify-center"
                      icon="ri-home-4-line"
                      label="Retour à l'accueil"
                      @click="navigate()"
                    />
                  </router-link>
                  <div v-if="formSubmissionStatus === successMessage">
                    <DsfrButton
                      class="confirm-button m-1 flex justify-center"
                      icon="ri-checkbox-circle-line"
                      label="Vers la page de connexion"
                      :icon-right="true"
                      @click="router.push({ name: 'ExpertLogin' })"
                    />
                  </div>
                </div>
              </div>
            </DsfrModal>
          </Teleport>
        </div>
      </div>
    </div>

    <div class="footer">
      <div
        v-if="currentStep === 1"
        class="fr-col-11 fr-col-lg-6 footer-actions"
      >
        <DsfrButton
          class="m-1 flex justify-center"
          icon="ri-arrow-left-line"
          :secondary="true"
          label="Précédent"
          @click="router.back()"
        />
        <DsfrButton
          class="m-1 flex justify-center"
          icon="ri-arrow-right-line"
          label="Suivant"
          :disabled="!areRequiredFieldsFilled()"
          :icon-right="true"
          @click="goToNextStep();"
        />
      </div>

      <div
        v-else
        class="fr-col-11 fr-col-lg-6 footer-actions"
      >
        <DsfrButton
          class="m-1 flex justify-center"
          icon="ri-arrow-left-line"
          :secondary="true"
          label="Précédent"
          @click="goToPreviousStep()"
        />

        <DsfrButton
          class="m-1 flex justify-center"
          label="Valider"
          icon="ri-checkbox-circle-line"
          :disabled="!areRequiredFieldsFilled()"
          :icon-right="true"
          @click="handleSubmit()"
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed, ref } from 'vue'
import { useRouter } from 'vue-router'
import { sendSignUpForm } from '@/api/api-client'

const formData = new FormData()
const steps = ['Créer un identifiant', 'Renseigner une identité']
const stepsStore = useStepsStore()
const router = useRouter()

const ptsOptions = ref([
  { label: 'Lyon', value: 'Lyon' },
  { label: 'Lille', value: 'Lille' },
  { label: 'Paris', value: 'Paris' },
  { label: 'Marseille', value: 'Marseille' },
  { label: 'Toulouse', value: 'Toulouse' },
])

const showRadioButtonSet = ref(false)
const disabledGendarmerie = ref(false)
const disabledPolice = ref(false)

const selectGendarmerie = () => {
  checkboxEntity.value = 'IRCGN'
  showRadioButtonSet.value = false
  disabledGendarmerie.value = true
  disabledPolice.value = false
}

const selectPolice = () => {
  showRadioButtonSet.value = true
  disabledPolice.value = true
  disabledGendarmerie.value = false
}

const typePasswordInput = ref(true)

const typeInput = computed(() => typePasswordInput.value === true ? 'password' : 'text')
const revealMessage = computed(() => typePasswordInput.value === true ? 'Révéler les champs' : 'Masquer les champs')

function revealPassword () {
  typePasswordInput.value = !typePasswordInput.value
}

const isIdentique = computed(() => agent_password.value.length >= 12 && agent_password.value === confirmPassword.value)
const isIdentiqueMessage = computed(() => isIdentique.value ? 'Les mots de passe correspondent' : 'Les mots de passe ne correspondent pas')
const isValide = computed(() =>
  agent_password.value.length >= 12 &&
  agent_password.value.length > 0 &&
  /\d/.test(agent_password.value) &&
  /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/.test(agent_password.value),
)

const showAvertissement = ref(true)
const showModalSubmit = ref(false)
function onClose () {
  showAvertissement.value = false
  showModalSubmit.value = false
}
const currentStep = computed<1 | 2>({
  get () {
    return stepsStore.currentStep + 1 as 1 | 2
  },
  set (value: 1 | 2) {
    stepsStore.setCurrentStep(value)
  },
})

const agent_email: Ref<string> = ref('')
const agent_password: Ref<string> = ref('')
const confirmPassword: Ref<string> = ref('')
const agent_firstname: Ref<string> = ref('')
const agent_lastname: Ref<string> = ref('')
const agent_identifier: Ref<number> = ref(null)
const agent_phone_number: Ref<number> = ref(null)
const checkboxEntity: Ref<string> = ref('')

const goToPreviousStep = () => (
  currentStep.value = currentStep.value - 2 as 1 | 2
)

const goToNextStep = () => {
  sendData()
  currentStep.value = currentStep.value + 0 as 1 | 2
}

const sendData = () => {
  const formDataToUpdate = getCurrentFormData()
  console.log('Données à envoyer à handleFormDataUpdate :', formDataToUpdate)
  handleFormDataUpdate(formDataToUpdate)
}

const handleFormDataUpdate = (form: Record<string | number>) => {
  console.log('Données mises à jour:', form)
  Object.entries(form).forEach(([key, value]) => {
    if (formData.has(key)) {
      formData.set(key, value)
    } else {
      formData.append(key, value)
    }
  })
  console.log('Toutes les données:', formData)
}

const getCurrentFormData = () => {
  let formDataToUpdate: Record<string | number> = {}
  if (currentStep.value === 1) {
    formDataToUpdate = {
      agent_email: agent_email.value,
      agent_password: agent_password.value,
      confirmPassword: confirmPassword.value,
    }
  } else if (currentStep.value === 2) {
    formDataToUpdate = {
      agent_firstname: agent_firstname.value,
      agent_lastname: agent_lastname.value,
      agent_identifier: agent_identifier.value,
      agent_phone_number: agent_phone_number.value,
      checkboxEntity: checkboxEntity.value,
    }
  }
  return formDataToUpdate
}

const handleSubmit = async () => {
  await sendData()
  await sendFormData()
  showModalSubmit.value = true
}

const sendFormData = () => {
  sendSignUpForm(formData).then(() => {
    formSubmissionStatus.value = successMessage
  })
    .catch(() => {
      formSubmissionStatus.value = errorMessage
    })
}

const formSubmissionStatus = ref<boolean | null>(null)
const successMessage = true
const errorMessage = false

const areRequiredFieldsFilled = () => {
  if (currentStep.value === 1) {
    return (
      agent_email.value.trim() !== '' &&
      agent_password.value.trim() !== '' &&
      confirmPassword.value.trim() !== '' &&
      isIdentique.value === true
    )
  } else if (currentStep.value === 2) {
    return (
      agent_firstname.value.trim() !== '' &&
      agent_lastname.value.trim() !== '' &&
      agent_identifier.value !== 0 &&
      agent_phone_number.value !== 0 &&
      checkboxEntity.value.trim() !== ''
    )
  }
}
</script>

<style scoped>
@media only screen and (max-width: 600px) {
  .confirm-button {
    font-size: 12px;
  }
}

.infos-password {
  display: flex;
  flex-direction: column;
  margin-top: 1rem;
}

.questionnaire-title {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
}
.footer {
  background-color: #fff;
  box-shadow: 0 -4px 16px rgb(0 0 0 / 25%);
}
.footer button {
  width: 50%;
}
.steps-guide {
  margin: auto;
}
:deep(div.fr-stepper__steps) {
  border-radius: 5px 5px 5px 5px;
}
:deep(.fr-stepper__state::after) {
  content: " :\a";
}
:deep(.fr-label) {
  margin-bottom: 12px;
}
.desc {
  border-bottom: 1px solid grey;
  padding-bottom: -4px;
  font-weight: bold;
}
.descPhotos {
  border-bottom: 1px solid grey;
  padding-bottom: 8px;
  font-weight: bold;
}
:deep(.required) {
  color:red;
}
.form-submission-status {
  margin-top: 10px;
  padding: 10px;
  border-radius: 5px;
}
</style>
