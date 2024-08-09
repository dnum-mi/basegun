<script lang="ts" setup>
import { ref } from "vue";
import { DsfrButton } from "@gouvminint/vue-dsfr";
import { DateTime } from "luxon";
import { mgr } from "@/utils/authentication";
import { getContactDetails } from "@/api/api-client";

const getAccessToken: Ref<string> = ref("");
const authIDP: Ref<string> = ref("");

// Récupération des données de l'utilisateur
const getUserData = async () => {
  try {
    const user = await mgr.getUser();
    getAccessToken.value = user?.access_token;
    authIDP.value = user?.profile.auth_idp;
  } catch (error) {
    console.error(
      "Erreur pendant la récupération des données de l'utilisateur :",
      error,
    );
  }
};

const getIRCGNDetails = async () => {
  try {
    const response = await getContactDetails(getAccessToken.value);
    IRCGN.fixe = response[0];
    IRCGN.phone = response[1];
    console.log("Détails de contact récupérés avec succès :", response);
  } catch (error) {
    console.error(
      "Erreur lors de la récupération des détails de contact :",
      error,
    );
  }
};

onMounted(async () => {
  await getUserData();
  if (authIDP.value === "proxyma") {
    await getIRCGNDetails();
  }
});

const priority = ref("");

const IRCGN = {
  email: "db.dcpc.ircgn@gendarmerie.interieur.gouv.fr",
  fixe: "",
  phone: "",
};
const showIRCGNModal = ref(false);

const currentPhone = computed(() => {
  const currentHour = parseInt(
    DateTime.now().setZone("Europe/Paris").toFormat("HH"),
    10,
  );
  if (currentHour >= 8 && currentHour < 18) {
    return IRCGN.fixe;
  } else {
    return IRCGN.phone;
  }
});
</script>

<template>
  <div class="fr-container-fluid">
    <div class="fr-grid-row">
      <div class="fr-col">
        <div class="text-center mt-5 p-3">
          <h1>
            <VIcon name="ri-arrow-right-line" scale="1.7" />
            <span v-if="authIDP === 'proxyma'"
              >Contacter un expert de l'IRCGN</span
            >
            <span v-if="authIDP === 'cheops'">Contacter un expert en arme</span>
          </h1>
          <div v-if="authIDP === 'proxyma'">
            <p>Sélectionnez votre situation actuelle :</p>
          </div>
          <div v-if="authIDP === 'cheops'">
            <DsfrAlert type="error" title="Avertissement">
              Basegun ne fournit pas de
              <span class="font-bold"
                >moyen pour contacter les experts relatifs à votre
                service.</span
              >
              <br />
              <br />
              Nous vous recommandons de suivre votre procédure de contact
              habituelle.
            </DsfrAlert>
          </div>
          <div class="footer">
            <DsfrButton
              class="m-1 flex justify-center"
              icon="ri-home-4-line"
              label="Retour à l'accueil"
              @click="$router.push({ name: 'StartPage' })"
            />
          </div>
        </div>
      </div>
    </div>
    <div v-if="authIDP === 'proxyma'">
      <div class="fr-grid-row">
        <div class="fr-col-12 fr-col-lg-6 mx-auto">
          <div class="fr-grid-row">
            <div class="fr-col-12 fr-col-lg-6 fr-p-1v">
              <DsfrButton
                class="w-100 mx-auto"
                label="Situation urgente"
                @click="showIRCGNModal = true"
              />
            </div>
            <div class="fr-col-12 fr-col-lg-6 fr-p-1v">
              <DsfrButton
                class="w-100 mx-auto"
                label="Situation non urgente"
                @click="$router.push({ name: 'ExpertiseForm' })"
              />
            </div>
          </div>
        </div>
      </div>
      <Teleport to="body">
        <DsfrModal :opened="showIRCGNModal" @close="showIRCGNModal = false">
          <div class="modal">
            <div class="fr-modal__title fr-mb-2w">
              <VIcon name="ri-arrow-right-line" scale="1.5" />
              Contacter un expert de l'IRCGN
            </div>
            <div>
              <div class="fr-col-11 fr-col-lg-6 mx-auto">
                <p>
                  Vous trouverez ci-dessous le numéro de téléphone de la
                  permanence de l'IRCGN.<br /><br />
                  <span class="font-bold">{{ currentPhone }}</span>
                </p>
                <p v-if="priority === 'low'">
                  Veuilez cliquer sur l'adresse mail ci-dessous pour envoyer un
                  mail pré-rempli à l'IRCGN : <br /><br />
                  <span class="font-bold"
                    ><a :href="buildMailto(IRCGN.email)">{{
                      IRCGN.email
                    }}</a></span
                  >
                </p>
              </div>
              <div class="fr-col-11 fr-col-lg-6 footer-actions mx-auto">
                <DsfrButton
                  class="m-1 flex justify-center"
                  icon="ri-arrow-left-line"
                  label="Précédent"
                  @click="
                    showIRCGNModal = false;
                    priority = '';
                  "
                />
              </div>
            </div>
          </div>
        </DsfrModal>
      </Teleport>
    </div>
    <div v-if="authIDP === 'proxyma'" class="fr-grid-row">
      <div class="fr-col text-center">
        <div class="bg-purple p-8 fr-my-8w">
          <p>Exemple de cas d'urgences :</p>
          <ul class="list-none text-sm text-center">
            <li>
              Mise en sécurité d'une arme dans des conditions dégradées (scènes
              de crimes, ...)
            </li>
            <li>
              Mise en sécurité d'une arme potentiellement dangereuse (arme
              ancienne)
            </li>
            <li>Une procédure en temps contraint (garde à vue)</li>
          </ul>
        </div>
        <div class="footer">
          <DsfrButton
            class="m-1 flex justify-center"
            icon="ri-home-4-line"
            label="Retour à l'accueil"
            @click="$router.push({ name: 'StartPage' })"
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
  background-color: #e3e3fd;
}
</style>
