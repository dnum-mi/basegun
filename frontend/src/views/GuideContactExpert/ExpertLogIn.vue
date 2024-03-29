<template>
  <div>
    <h2 class="m-2.5 mt-10 mb-10 flex justify-center questionnaire-title">
      <div>Connexion à l'outil de réponse aux demandes d'identification</div>
    </h2>

    <div class="fr-col-11 fr-col-lg-6 mx-auto">
      <div>
        <div class="m-1 justify-center pb-30">
          <DsfrInputGroup>
            <DsfrInput
              v-model="agent_identifier"
              class="mb-5"
              label="Identifiant"
              hint="Format attendu : nom@interieur.gouv.fr"
              label-visible
              required="true"
            />
            <DsfrInput
              v-model="agent_password"
              :type="typeInput"
              class="mb-5"
              label="Mot de passe"
              label-visible
              required="true"
            />
            <DsfrButton
              class="mr-1"
              size="sm"
              @click="revealPassword"
            >
              {{ revealMessage }}
            </DsfrButton>
            <a
              href="forget-password"
              class="fr-link"
            >Mot de passe oublié ?</a>
          </DsfrInputGroup>
          <DsfrCheckbox
            v-model="rememberMe"
            label="Se souvenir de moi"
            :small="true"
          />
          <div class="flex justify-center items-center desc">
            <DsfrButton
              class="m-1 pt-2 pb-2"
              label="Se connecter"
              icon="ri-checkbox-circle-line"
              @click="handleSubmit"
            />
          </div>

          <h3 class="m-2.5 mt-10 flex questionnaire-title">
            <div>Vous n'avez pas de compte ?</div>
          </h3>
          <div class="flex justify-center items-center">
            <DsfrButton
              class="m-1 pt-2"
              label="Créer un compte"
              :secondary="true"
              @click="router.push({ name:'ExpertSignUp'})"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed, ref } from 'vue'
import { useRouter } from 'vue-router'

import { sendLoginForm } from '@/api/api-client'

const formData = new FormData()
const router = useRouter()

const agent_identifier: Ref<string> = ref(null)
const agent_password: Ref<string> = ref(null)

const rememberMe = ref(false)
const validMessage = 'Connexion en cours...'
const errorMessage = 'Le mot de passe ou l\'identifiant est incorrect'

const typePasswordInput = ref(true)

const typeInput = computed(() => typePasswordInput.value === true ? 'password' : 'text')
const revealMessage = computed(() => typePasswordInput.value === true ? 'Révéler les champs' : 'Masquer les champs')

function revealPassword () {
  typePasswordInput.value = !typePasswordInput.value
}

watch(rememberMe, (newValue) => {
  if (newValue && agent_identifier.value) {
    // Enregistrer agent_identifier dans le stockage local
    localStorage.setItem('agentIdentifier', agent_identifier.value)
  } else {
    // Supprimer agentIdentifier du stockage local si rememberMe est décoché
    localStorage.removeItem('agentIdentifier')
  }
})

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
    agent_identifier: agent_identifier.value,
    agent_password: agent_password.value,
  }

  return formDataToUpdate
}

const handleSubmit = async () => {
  await sendData()
  await sendFormData()
  showModalSubmit.value = true
}

const sendFormData = () => {
  sendLoginForm(formData).then(() => {
    formSubmissionStatus.value = successMessage
  })
    .catch(() => {
      formSubmissionStatus.value = errorMessage
    })
}

const formSubmissionStatus = ref<boolean | null>(null)

const storedAgentIdentifier = localStorage.getItem('agentIdentifier')
if (storedAgentIdentifier) {
  agent_identifier.value = storedAgentIdentifier
  rememberMe.value = true
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
  padding-bottom: 40px;
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
