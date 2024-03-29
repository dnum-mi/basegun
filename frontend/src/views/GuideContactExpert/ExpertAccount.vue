<template>
  <div>
    <div class="fr-col-11 fr-col-lg-6 mt-8 mx-auto">
      <div class="m-1 justify-center pb-30">
        <h5>Compte de l'agent</h5>
        <DsfrInputGroup>
          <DsfrSelect
            v-model="status"
            label="Statut"
            :options="statusOptions"
            default-unselected-text="Sélectionner un statut"
          />

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
            type="email"
            class="mb-5"
            label="NIGEND / Matricule (PN)"
            label-visible
            required="true"
          />

          <DsfrInput
            v-model="agent_email"
            type="email"
            class="mb-5"
            label="Adresse e-mail"
            hint="Format attendu : nom@interieur.gouv.fr"
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
        </DsfrInputGroup>
      </div>
    </div>

    <div class="footer">
      <div
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
          @click="handleSubmit; router.push({ name:'ExpertLogin'})"
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { sendAccountForm } from '@/api/api-client'

const formData = new FormData()
const router = useRouter()

const statusOptions = ref([
  { text: 'À créer', value: 'À créer' },
  { text: 'Actif', value: 'Actif' },
  { text: 'Inactif', value: 'Inactif' },
])

const status: Ref<string> = ref('')
const agent_firstname: Ref<string> = ref('')
const agent_lastname: Ref<string> = ref('')
const agent_identifier: Ref<number> = ref('')
const agent_email: Ref<string> = ref('')
const agent_phone_number: Ref<number> = ref('')

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
  formDataToUpdate = {
    status: status.value,
    agent_firstname: agent_firstname.value,
    agent_lastname: agent_lastname.value,
    agent_identifier: agent_identifier.value,
    agent_email: agent_email.value,
    agent_phone_number: agent_phone_number.value,
  }
  return formDataToUpdate
}

const handleSubmit = async () => {
  await sendData()
  await sendFormData()
}

const sendFormData = () => {
  sendAccountForm(formData).then(() => {
    formSubmissionStatus.value = successMessage
  })
    .catch(() => {
      formSubmissionStatus.value = errorMessage
    })
}

const formSubmissionStatus = ref<boolean | null>(null)

const areRequiredFieldsFilled = () => {
  return (
    status.value.trim() !== '' &&
    agent_lastname.value.trim() !== '' &&
    agent_firstname.value.trim() !== '' &&
    agent_identifier.value !== 0 &&
    agent_email.value.trim() !== '' &&
    agent_phone_number.value !== 0
  )
}

</script>

<style scoped>
@media only screen and (max-width: 600px) {
  .confirm-button {
    font-size: 12px;
  }
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
