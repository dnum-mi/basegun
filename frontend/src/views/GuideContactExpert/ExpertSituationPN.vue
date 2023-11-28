<script lang="ts" setup>
import { DsfrButton } from '@gouvminint/vue-dsfr'
import { useRouter } from 'vue-router'

const router = useRouter()

</script>

<template>
  <div class="text-center mt-5">
    <h2>
      <VIcon
        name="ri-arrow-right-line"
        scale="1.5"
      />
      Contact à un expert arme
    </h2>
    <p>
      Vous rencontrez une situation et souhaitez contacter un expert arme ?
    </p> <br>
    <p>
      Sélectionnez tout d'abord votre situation actuelle ci-dessous
    </p>
    <div class="fr-col-11 fr-col-lg-6 mx-auto">
      <DsfrButton
        class="m-1 flex justify-center w-80"
        label="Situation urgente"
        @click="router.push({ name:'ExpertPTS'})"
      />
      <DsfrButton
        class="m-1 flex justify-center w-80"
        label="Situation non urgente"
        @click="router.push({ name:'ExpertPTSNU'})"
      />
    </div>
    <div class="manipulations -mx-8 p-8">
      <p>
        Situation pouvant faire office d'urgence : <br>
      </p>
      <ul class="list-none text-sm">
        <li>Garde à vue</li>
        <li>Garde à vue</li>
        <li>Garde à vue</li>
        <li>Garde à vue</li>
      </ul>
    </div>
  </div>
  <div class="footer">
    <div class="fr-col-11 fr-col-lg-6 footer-actions mx-auto">
      <DsfrButton
        class="m-1 flex justify-center"
        icon="ri-arrow-left-line"
        :secondary="true"
        label="Précédent"
        @click="router.back()"
      />
    </div>
  </div>
</template>

<style>
.manipulations {
  background-color: #E3E3FD;
  margin-top: 40px;
  margin-bottom: 24px;
}
</style>
