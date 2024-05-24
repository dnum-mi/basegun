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
  fixe: '01 78 47 31 46',
  phone: '06 07 98 40 09',
}
const shownLPS = ref<null | string>(null)
const showIRCGNModal = ref(false)

function buildMailto (email: string) {
  const subject = "[Basegun] Demande d'identification"
  const body = "NIGEND / matricule :%0D%0AN° de procédure :%0D%0ATéléphone :%0D%0AService d'affectation :%0D%0ATypologie de l'arme (épaule ou poing) :%0D%0APrécision sur les marquages présents sur l'arme :%0D%0A"
  return `mailto:${email}?subject=${subject}&body=${body}`
}

const currentPhone = computed(() => {
  const currentHour = new Date().getHours()
  if (currentHour >= 8 && currentHour < 18) {
    return IRCGN.fixe
  } else {
    return IRCGN.phone
  }
})

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
            <span v-if="lawEnforcementType === 'gendarmerie'">Contacter un expert de l'IRCGN</span>
            <span v-if="lawEnforcementType === 'police'">Contacter un expert en armes</span>
          </h2>
          <div v-if="lawEnforcementType === 'gendarmerie'">
            <p>
              Sélectionnez votre situation actuelle :
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
            <div class="justify-content">
              <p>
                Cette fonctionnalité est <span class="font-bold">en cours de développement</span>.<br>
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
              Sélectionnez ci-dessous votre PTS afin d'avoir le numéro de téléphone de la permanence, ainsi que son adresse mail.
            </p>
            <p
              v-if="priority === 'low'"
              class="fr-mt-5v"
            >
              Sélectionnez ci-dessous votre PTS afin d'avoir l'adresse email de la permanence.
            </p>
          </div>
        </div>
        <div class="fr-grid-row">
          <div class="fr-col-12 fr-col-lg-3 mx-auto">
            <div class="fr-grid-row">
              <div
                v-for="lps, lps_key in LPS"
                :key="lps_key"
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
                    Ci-dessous le numéro de téléphone de la permanence, ainsi que l'adresse mail de votre PTS.
                  </p>
                  <p
                    v-if="priority === 'low'"
                    class="fr-mt-5v"
                  >
                    Ci-dessous l'adresse email de la permanence de votre PTS.
                  </p>
                  <p>
                    <span v-if="priority === 'high'">{{ LPS[shownLPS].phone }}</span><br>
                    <a :href="buildMailto(LPS[shownLPS].email)">{{ LPS[shownLPS].email }}</a>
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
              Contacter un expert de l'IRCGN
            </h2>
            <div>
              <div class="fr-col-11 fr-col-lg-6 mx-auto">
                <p v-if="priority === 'high'">
                  Vous trouverez ci-dessous le numéro de téléphone de la permanence de l'IRCGN.<br><br>
                  <span class="font-bold">{{ currentPhone }}</span>
                </p>
                <p v-if="priority === 'low'">
                  Vous trouverez ci-dessous l'adresse mail de la permanence de l'IRCGN.<br><br>
                  <span class="font-bold"><a :href="buildMailto(IRCGN.email)">{{ IRCGN.email }}</a></span>
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
        <PopupContact />
        <div class="bg-purple p-8 fr-my-8w">
          <p>Exemple de cas d'urgences :</p>
          <ul class="list-none text-sm text-center">
            <li>Mise en sécurité d'une arme dans des conditions dégradées (scènes de crimes, ...)</li>
            <li>Mise en sécurité d'une arme potentiellement dangereuse (arme ancienne)</li>
            <li>Une procédure en temps contraint (garde à vue)</li>
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

</style>
