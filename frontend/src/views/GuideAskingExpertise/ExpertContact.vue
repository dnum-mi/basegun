<script lang="ts" setup>
import { ref } from "vue";
import { DateTime } from "luxon";
import { mgr } from "@/utils/authentication";
import { getContactDetails } from "@/api/api-client";

const user = ref<any>(null);

onMounted(async () => {
  await mgr.getUser().then((data) => {
    user.value = data;
    console.log(user.value);
  });

  await getContactDetails(user.value?.access_token)
    .then((response) => {
      IRCGN.fixe = response.data.cellphone;
      IRCGN.phone = response.data.phone;
    })
    .catch((error) => {
      console.error(
        "Erreur lors de la récupération des détails de contact :",
        error,
      );
    });
});

const IRCGN = {
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
  <div class="fr-container-fluid" v-if="user?.profile">
    <div class="fr-grid-row">
      <div class="fr-col">
        <div class="text-center mt-5 p-3">
          <h1>
            <VIcon name="ri-arrow-right-line" scale="1.7" />
            <span v-if="user.profile.idp === 'proxyma'">
              Contacter un expert de l'IRCGN
            </span>
            <span v-else>Contacter un expert en arme</span>
          </h1>
          <div v-if="user.profile.idp === 'proxyma'">
            <p>Sélectionnez votre situation actuelle :</p>
          </div>
          <div v-else>
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
              data-testid="back-home"
              @click="$router.push({ name: 'StartPage' })"
            />
          </div>
        </div>
      </div>
    </div>
    <div v-if="user.profile.idp === 'proxyma'">
      <div class="fr-grid-row">
        <div class="fr-col-12 fr-col-lg-6 mx-auto">
          <div class="fr-grid-row">
            <div class="fr-col-12 fr-col-lg-6 fr-p-1v">
              <DsfrButton
                class="w-100 mx-auto"
                label="Situation urgente"
                data-testid="situation-urgente"
                @click="showIRCGNModal = true"
              />
            </div>
            <div class="fr-col-12 fr-col-lg-6 fr-p-1v">
              <DsfrButton
                class="w-100 mx-auto"
                label="Situation non urgente"
                data-testid="situation-non-urgente"
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
              </div>
              <div class="fr-col-11 fr-col-lg-6 footer-actions mx-auto">
                <DsfrButton
                  class="m-1 flex justify-center"
                  icon="ri-arrow-left-line"
                  label="Précédent"
                  @click="showIRCGNModal = false"
                  data-testid="previous"
                />
              </div>
            </div>
          </div>
        </DsfrModal>
      </Teleport>
    </div>
    <div v-if="user.profile.idp === 'proxyma'" class="fr-grid-row">
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
            data-testid="back-home"
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
