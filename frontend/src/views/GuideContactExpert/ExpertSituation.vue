<script lang="ts" setup>
import { DsfrButton } from '@gouvminint/vue-dsfr'
import { useRouter } from 'vue-router'

const router = useRouter()

let lawEnforcementType: String
if (router.currentRoute.value.name === 'ExpertSituationPN') { lawEnforcementType = 'police' }
if (router.currentRoute.value.name === 'ExpertSituationGN') { lawEnforcementType = 'gendarmerie' }

const priority = ref('')

const LPS = {
  LILLE: {
    email: 'snps-lps59@interieur.gouv.fr',
    phone: '03 20 12 89 89',
  },
  MARSEILLE: {
    email: 'snps-lps13@interieur.gouv.fr',
    phone: '04 91 62 85 00',
  },
  TOULOUSE: {
    email: 'snps-lps31@interieur.gouv.fr',
    phone: '05 61 12 79 00',
  },
  PARIS: {
    email: 'snps-lps75@interieur.gouv.fr',
    phone: '01 71 92 65 02',
  },
  LYON: {
    email: 'snps-lps69@interieur.gouv.fr',
    phone: '04 72 86 89 70',
  },
}

const IRCGN = {
  email: 'db.dcpc.ircgn@gendarmerie.interieur.gouv.fr',
  phone: '01 78 47 31 46 ',
}
const shownLPS = ref<null | string>(null)
const showIRCGNModal = ref(false)

</script>

<template>
  <div class="fr-container-fluid">
    <div class="fr-grid-row">
      <div class="fr-col">
        <div class="text-center mt-5">
          <h2>
            <VIcon
              name="ri-arrow-right-line"
              scale="1.5"
            />
            Contacter un expert arme {{ lawEnforcementType }}
          </h2>
          <div v-if="lawEnforcementType === 'gendarmerie'">
            <p>
              Vous rencontrez une situation et souhaitez contacter un expert arme ?
            </p>
            <p>
              Sélectionnez tout d'abord votre situation actuelle ci-dessous.
            </p>
          </div>

          <div
            v-if="lawEnforcementType === 'police'"
            class="fr-alert fr-alert--warning"
          >
            <h3>
              <VIcon
                name="ri-error-warning-line"
                scale="1.5"
              />
              Avertissement
            </h3>
            <div class="flex justify-content">
              <p>
                Cette fonctionnalité est <span class="font-bold">en cours de développement </span> <br>
                <br>
                Les contacts des laboratoires de police scientifique seront mis à jour prochainement.
              </p>
            </div>

            <div class="footer">
              <DsfrButton
                class="m-1 flex justify-center"
                icon="ri-arrow-left-line"
                :secondary="true"
                label="Précédent"
                @click="router.back()"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- <div v-if="lawEnforcementType === 'police'">
      <div class="fr-grid-row">
        <div class="fr-col-12 fr-col-lg-6 mx-auto">
          <div class="fr-grid-row">
            <div class="fr-col-12 fr-col-lg-6 fr-p-1v">
              <DsfrButton
                class="w-100 mx-auto"
                label="Situation urgente"
                :disabled="priority === 'high' ? true : false"
                @click="priority = 'high'"
              />
            </div>
            <div class="fr-col-12 fr-col-lg-6 fr-p-1v">
              <DsfrButton
                class="w-100 mx-auto"
                label="Situation non urgente"
                :disabled="priority === 'low' ? true : false"
                @click="priority = 'low'"
              />
            </div>
          </div>
        </div>
      </div>
      <div v-if="priority">
        <div class="fr-grid-row">
          <div class="fr-col-12 fr-col-lg-6 mx-auto">
            <p
              v-if="priority === 'high'"
              class="fr-mt-5v"
            >
              Sélectionnez ci-dessous votre PTS afin d'avoir le numéro de téléphone de la permanance, ainsi que son adresse mail.
            </p>
            <p
              v-if="priority === 'low'"
              class="fr-mt-5v"
            >
              Sélectionnez ci-dessous votre PTS afin d'avoir l'adresse email de la permanance.
            </p>
          </div>
        </div>
        <div class="fr-grid-row">
          <div class="fr-col-12 fr-col-lg-3 mx-auto">
            <div class="fr-grid-row">
              <div
                v-for="lps, lps_key in LPS"
                class="fr-col-12 mx-auto"
              >
                <DsfrButton
                  class="m-1 w-100"
                  :label="'PTS ' + lps_key"
                  @click="shownLPS = lps_key"
                />
              </div>
            </div>
          </div>
        </div>
        <Teleport to="body">
          <DsfrModal
            :opened="shownLPS"
            @close="shownLPS = null"
          >
            <div class="modal">
              <h2>
                <VIcon
                  name="ri-arrow-right-line"
                  scale="1.5"
                />
                Laboratoire PTS {{ shownLPS }}
              </h2>
              <div>
                <div class="fr-col-11 fr-col-lg-6 mx-auto">
                  <p
                    v-if="priority == 'high'"
                    class="fr-mt-5v"
                  >
                    Ci-dessous le numéro de téléphone de la permanance, ainsi que l'adresse mail de votre PTS.
                  </p>
                  <p
                    v-if="priority === 'low'"
                    class="fr-mt-5v"
                  >
                    Ci-dessous l'adresse email de la permanance de votre PTS.
                  </p>
                  <p>
                    <span v-if="priority === 'high'">{{ LPS[shownLPS].phone }}</span><br>
                    {{ LPS[shownLPS].email }}
                  </p>
                </div>
              </div>
              <div class="fr-col-11 fr-col-lg-6 footer-actions mx-auto">
                <DsfrButton
                  class="m-1 flex justify-center"
                  icon="ri-arrow-left-line"
                  label="Précédent"
                  @click="shownLPS = null"
                />
              </div>
            </div>
          </DsfrModal>
        </Teleport>
      </div>
    </div> -->
    <div v-if="lawEnforcementType === 'gendarmerie'">
      <div class="fr-grid-row">
        <div class="fr-col-12 fr-col-lg-6 mx-auto">
          <div class="fr-grid-row">
            <div class="fr-col-12 fr-col-lg-6 fr-p-1v">
              <DsfrButton
                class="w-100 mx-auto"
                label="Situation urgente"
                :disabled="priority === 'high' ? true : false"
                @click="priority = 'high'; showIRCGNModal = true"
              />
            </div>
            <div class="fr-col-12 fr-col-lg-6 fr-p-1v">
              <DsfrButton
                class="w-100 mx-auto"
                label="Situation non urgente"
                :disabled="priority === 'low' ? true : false"
                @click="priority = 'low'; showIRCGNModal = true"
              />
            </div>
          </div>
        </div>
      </div>
      <Teleport to="body">
        <DsfrModal
          :opened="showIRCGNModal"
          @close="showIRCGNModal = false; priority = ''"
        >
          <div class="modal">
            <h2>
              <VIcon
                name="ri-arrow-right-line"
                scale="1.5"
              />
              Contact à un expert arme
            </h2>
            <div>
              <div class="fr-col-11 fr-col-lg-6 mx-auto">
                <p v-if="priority === 'high'">
                  Vous trouverez ci-dessous le numéro de téléphone de la permanance, ainsi que l'adresse mail de l'IRGCN
                </p>
                <p v-if="priority === 'low'">
                  Vous trouverez ci-dessous l'adresse mail de la permanence de l'IRGCN
                </p>
                <p>
                  <span v-if="priority === 'high'">{{ IRCGN.phone }}<br></span>
                  {{ IRCGN.email }}
                </p>
              </div>
              <div class="fr-col-11 fr-col-lg-6 footer-actions mx-auto">
                <DsfrButton
                  class="m-1 flex justify-center"
                  icon="ri-arrow-left-line"
                  label="Précédent"
                  @click="showIRCGNModal = false; priority = ''"
                />
              </div>
            </div>
          </div>
        </DsfrModal>
      </Teleport>
    </div>
    <div
      v-if="lawEnforcementType === 'gendarmerie'"
      class="fr-grid-row"
    >
      <div class="fr-col text-center">
        <div class="bg-purple p-8 fr-my-8w">
          <p>Situation pouvant faire office d'urgence :</p>
          <ul class="list-none text-sm">
            <li>Garde à vue</li>
          </ul>
        </div>
        <div class="footer">
          <DsfrButton
            class="m-1 flex justify-center"
            icon="ri-arrow-left-line"
            :secondary="true"
            label="Précédent"
            @click="router.back()"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>

:deep(.fr-btn) span {
  margin: auto !important;
}

.bg-purple {
  background-color: #E3E3FD;
}

.w-100 {
  width: 100% !important;
}

</style>
