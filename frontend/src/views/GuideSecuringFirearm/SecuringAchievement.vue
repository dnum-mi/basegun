<script setup>
import { computed } from 'vue'
import { useResultStore } from '@/stores/result.js'
import { useStepsStore } from '@/stores/steps.js'
import { resultats } from '@/utils/securing-firearms-utils.js'

const resultStore = useResultStore()
const stepsStore = useStepsStore()

const typology = computed(() => resultStore.typology)
const selectedOptionStep1 = computed({
  get () {
    return stepsStore.selectedOptionStep1
  },
  set (selection) {
    stepsStore.setOptionStep1(selection)
  },
})
</script>

<template>
  <div class="mx-auto fr-col-11 fr-col-lg-6 flex justify-between">
    <div class="fr-container m-5">
      <router-link
        :to="{ name: 'StartPage' }"
      >
        <VIcon
          class="absolute right-3 fr-icon-home-3-line"
          name="ri-home-3-line"
          scale="1.2"
        />
      </router-link>
    </div>
  </div>
  <div class="fr-container">
    <div class="result fr-col-11 fr-col-lg-6 mt-12 mx-auto">
      <h4 class="mt-5 text-center">
        Fin de la mise en sécurité de l’arme
      </h4>
      <div
        v-if="selectedOptionStep1 === 'revolver_black_powder'"
        class="text-center"
      >
        <p class="text-red font-600">
          Il s’agit d’une arme dont les manipulations sont complexes. <span class="font-bold">Nous vous conseillons de faire appel à un expert</span>.
        </p>
        <p>Souhaitez-vous l'identifier quand même ? <br> Sinon vous pouvez retourner au menu.</p>
      </div>
      <div
        v-else-if="!resultats[typology]?.isSecuringOptions"
        class="text-center"
      >
        <p class="ending font-600">
          Votre arme ne possède pas de guide de mise en sécurité.
        </p>
        <p>Souhaitez-vous l'identifier quand même ? <br> Sinon vous pouvez retourner au menu.</p>
      </div>
      <div v-else>
        <p class="ending font-600 text-center">
          Vous venez de sécuriser votre arme !
        </p>
        <p>
          La manipulation étant terminée, vous pouvez identifier votre arme ou retourner au menu.
        </p>
      </div>
    </div>
    <div class="fr-col-sm-6 fr-col-lg-8 mx-auto text-center">
      <img
        src="@/assets/guide-mise-en-securite/icones/fin-mise-en-securite.jpeg"
        alt="alt"
        class="img-deco"
      >
    </div>
  </div>
  <div class="footer">
    <div class="fr-col-11 fr-col-lg-6 mx-auto">
      <router-link
        v-slot="{navigate}"
        class="navigate"
        :to="{name: 'TypologyResult'}"
      >
        <DsfrButton
          class="flex justify-center w-full"
          label="Je veux identifier mon arme"
          icon="ri-arrow-right-line"
          :icon-right="true"
          @click="navigate()"
        />
      </router-link>
      <router-link
        v-slot="{navigate}"
        :to="{name:'StartPage'}"
      >
        <DsfrButton
          class="mt-3 flex justify-center w-full"
          label="Retour au menu"
          icon="ri-arrow-go-back-fill"
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
  color: #000091;
}
.footer {
  text-align: center;
}

</style>
