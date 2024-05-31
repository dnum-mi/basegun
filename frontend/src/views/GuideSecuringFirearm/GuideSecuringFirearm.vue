<script lang="ts" setup>
import { isUserUsingCrosscall } from '@/utils/isUserUsingCrosscall'

import StepsGuide from '@/components/StepsGuide.vue'
import SecuringFooter from './SecuringFooter.vue'

const steps = ['Mise en garde', 'Consignes de sécurité', 'Photo']
const currentStep = ref(0)

</script>

<template>
  <div class="fr-container mt-5">
    <div class="fr-col-12 fr-col-lg-6 fr-px-1w  mx-auto">
      <StepsGuide
        class="my-auto"
        :steps="steps"
        :current-step="currentStep + 1"
      />
      <h2 class="fr-mt-2w">
        Mettre en sécurité mon arme
      </h2>

      <template v-if="currentStep === 0">
        <div v-if="isUserUsingCrosscall()">
          <p class="leading-7 mt-3">
            Vous allez recevoir des <span class="font-bold">instructions</span> pour <span class="font-bold">extraire des munitions</span> de l’arme.
            En cas de doute, <span class="font-bold">arrêtez vous et faites appel à un expert</span>.
          </p>
          <div class="fr-col-sm-6 fr-col-lg-8 mx-auto text-center">
            <img
              src="@/assets/guide-mise-en-securite/icones/preconisations.jpg"
              alt="alt"
              class="img-deco"
            >
          </div>
        </div>
        <div v-else>
          <p class="leading-7 mt-3 pb-4">
            Vous allez recevoir des instructions pour <span class="font-bold">extraire des munitions</span> de l’arme.
            Si vous avez le <span class="font-bold">moindre doute</span> quant à votre capacité à effectuer en toute sécurité les manœuvres qui suivent, <span class="font-bold">n’essayez pas de suivre les étapes suivantes</span>.
            Contactez <span class="font-bold">la gendarmerie ou le commissariat le plus proche</span>.
          </p>
          <div class="fr-col-sm-6 fr-col-lg-8 mx-auto text-center">
            <img
              src="@/assets/guide-mise-en-securite/icones/take-care.jpg"
              alt="alt"
              class="w-60 w-fr-mt-n4w"
            >
          </div>
        </div>
      </template>
      <template v-if="currentStep === 1">
        <p class="leading-7 mt-3">
          Une arme doit <span class="font-bold">toujours</span> être <span class="font-bold">considérée comme chargée</span>.
        </p>
        <p>
          <span class="font-bold">Toujours</span> maintenir l'arme dans une <span class="font-bold">DIRECTION
            SÛRE</span>, en maintenant <span class="font-bold">le doigt hors du pontet</span>.
        </p>
        <div class="fr-col-sm-6 fr-col-lg-8 mx-auto text-center">
          <img
            src="@/assets/guide-mise-en-securite/icones/consignes-securite.jpg"
            alt="alt"
            class="w-80 fr-mt-2w"
          >
        </div>
      </template>
      <template v-if="currentStep === 2">
        <p class="leading-7 mt-3">
          Pour que Basegun vous propose un <span class="font-bold">tutoriel adapté à votre arme</span>, vous serez
          invité à prendre en photo votre arme et à préciser certains mécanismes sur l'arme.
        </p>
        <div class="fr-col-sm-6 fr-col-lg-8 mx-auto text-center">
          <img
            src="@/assets/guide-mise-en-securite/icones/instructions.jpg"
            alt="alt"
            class="w-100 fr-mt-5w"
          >
        </div>
      </template>
    </div>
    <SecuringFooter
      @back-click="currentStep > 0 ? currentStep-- : $router.push({ name: 'StartPage' })"
      @next-click="currentStep < 2 ? currentStep++ : $router.push({ name: 'InstructionsPage', query: { securingTutorial: 'true' } })"
    />
  </div>
</template>
