<script lang="ts" setup>
import { computed } from 'vue'

import { useResultStore } from '@/stores/result'
import { resultTree } from '@/utils/firearms-utils/index'
import { isUserUsingCrosscall } from '@/utils/isUserUsingCrosscall'
import { DsfrButton } from '@gouvminint/vue-dsfr'

const resultStore = useResultStore()

const typology = computed(() => resultStore.typology)
</script>

<template>
  <div class="fr-container">
    <div class="result fr-col-11 fr-col-lg-6 m-auto">
      <div v-if="!resultTree[typology]?.isSecuringOptions">
        <h2 class="mt-5 text-center">
          Pas de guide de mise en sécurité pour votre arme
        </h2>
        <div

          class="text-center"
        >
          <p class="text-red font-600">
            Il s’agit d’une arme dont les manipulations sont complexes. <span class="font-bold">Nous vous conseillons de faire appel à un expert</span>.
          </p>
          <p>Souhaitez-vous l'identifier quand même ? <br> Sinon vous pouvez retourner au menu.</p>
        </div>
        <div class="fr-col-sm-6 fr-col-lg-8 mx-auto text-center">
          <img
            src="@/assets/guide-mise-en-securite/icones/fin-mise-en-securite-nok.jpg"
            alt="alt"
            class="img-deco"
          >
        </div>
        <ContactExpert v-if="isUserUsingCrosscall()" />
      </div>
      <div v-else>
        <h2 class="mt-5 text-center">
          Fin de la mise en sécurité de l’arme
        </h2>
        <p class="ending font-600 text-center">
          Vous venez de sécuriser votre arme !
        </p>
        <p>
          La manipulation étant terminée, vous pouvez identifier votre arme ou retourner au menu.
        </p>
        <div class="fr-col-sm-6 fr-col-lg-8 mx-auto text-center">
          <img
            src="@/assets/guide-mise-en-securite/icones/fin-mise-en-securite-ok.jpg"
            alt="alt"
            class="img-deco"
          >
        </div>
      </div>
    </div>
  </div>
  <div class="footer">
    <div class="fr-col-11 fr-col-lg-6 mx-auto">
      <router-link
        v-slot="{navigate}"
        class="navigate"
        :to="{name: 'IdentificationTypologyResult'}"
      >
        <DsfrButton
          class="flex justify-center !w-full"
          label="Je veux identifier mon arme"
          icon="ri-arrow-right-line"
          :icon-right="true"
          data-testid="go-to-identification"
          @click="navigate()"
        />
      </router-link>
      <router-link
        v-slot="{navigate}"
        :to="{name:'StartPage'}"
      >
        <DsfrButton
          class="mt-3 flex justify-center !w-full"
          label="Retour à l'accueil"
          icon="ri-home-4-line"
          :icon-right="true"
          secondary
          @click="navigate()"
        />
      </router-link>
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
  color : #00C8C7
}

:deep(.fr-icon-home-3-line) {
  color: var(--blue-france-sun-113-625);
}
.footer {
  text-align: center;
}

</style>
