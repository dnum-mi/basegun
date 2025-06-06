<script lang="ts" setup>
import { computed } from "vue";

import { useStore } from "@/stores/result";
import {
  MEASURED_GUNS_TYPOLOGIES,
  TYPOLOGIES,
} from "@/utils/firearms-utils/index";
import { isUserUsingCrosscall } from "@/utils/isUserUsingCrosscall";

const store = useStore();

const typology = computed(() => store.typology);
const isCardDetected = computed(
  () => store.gunLength !== null && store.gunBarrelLength !== null,
);

function goToMissingCardPageIfMissing() {
  if (
    isCardDetected.value === false &&
    MEASURED_GUNS_TYPOLOGIES.includes(typology.value)
  ) {
    return "MissingCard";
  }
  return store.selectedOptions[0] !== "revolver_black_powder"
    ? "IdentificationTypologyResult"
    : "IdentificationFinalResult";
}
</script>

<template>
  <div class="fr-container">
    <div class="result fr-col-11 fr-col-lg-6 m-auto">
      <div
        v-if="
          TYPOLOGIES[typology]?.securingSteps &&
          store.selectedOptions[0] !== 'revolver_black_powder'
        "
      >
        <h1 class="mt-5 text-center">Fin de la mise en sécurité de l’arme</h1>
        <p class="ending font-600 text-center">
          Vous venez de sécuriser votre arme !
        </p>
        <p>
          La manipulation étant terminée, vous pouvez identifier votre arme ou
          retourner au menu.
        </p>
        <div class="fr-col-sm-6 fr-col-lg-8 mx-auto text-center">
          <img
            src="@/assets/guide-mise-en-securite/icones/fin-mise-en-securite-ok.jpg"
            alt=""
            class="img-deco"
            aria-hidden="true"
          />
        </div>
      </div>
      <div v-else>
        <h1 class="mt-5 text-center">
          Pas de guide de mise en sécurité pour votre arme
        </h1>
        <div class="text-center">
          <p class="text-red font-600">
            Il s’agit d’une arme dont les manipulations sont complexes.
            <span class="font-bold"
              >Nous vous conseillons de faire appel à un expert</span
            >.
          </p>
          <p>
            Souhaitez-vous l'identifier quand même ? <br />
            Sinon vous pouvez retourner au menu.
          </p>
        </div>
        <div class="fr-col-sm-6 fr-col-lg-8 mx-auto text-center">
          <img
            src="@/assets/guide-mise-en-securite/icones/fin-mise-en-securite-nok.jpg"
            alt=""
            class="img-deco"
            aria-hidden="true"
          />
        </div>
        <ContactExpert v-if="isUserUsingCrosscall()" />
      </div>
    </div>
  </div>
  <div class="footer">
    <div class="fr-col-11 fr-col-lg-6 mx-auto">
      <DsfrButton
        class="flex justify-center !w-full"
        label="Je veux identifier mon arme"
        icon="ri-arrow-right-line"
        :icon-right="true"
        data-testid="go-to-identification"
        @click="$router.push({ name: goToMissingCardPageIfMissing() })"
      />
      <DsfrButton
        class="mt-3 flex justify-center !w-full"
        label="Retour à l'accueil"
        icon="ri-home-4-line"
        :icon-right="true"
        secondary
        @click="$router.push({ name: 'StartPage' })"
      />
    </div>
  </div>
</template>

<style scoped>
.img-deco {
  margin-bottom: 1em;
  margin-top: 2rem;
  width: 75%;
}

.ending {
  color: #00c8c7;
}

:deep(.fr-icon-home-3-line) {
  color: var(--blue-france-sun-113-625);
}
</style>
