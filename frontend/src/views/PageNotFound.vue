<!-- <script setup>
const buttons = [
  {
    label: "Page d'accueil",
    link: 'https://www.systeme-de-design.gouv.fr/',
  },
  {
    label: 'Contactez-nous',
    secondary: true,
    link: 'https://www.systeme-de-design.gouv.fr/',
  },
]

const description = 'test'
</script> -->
<template>
  <div class="fr-container">
    <div class="text-center relative top-1/6 m-4">
      <h1>Page non trouvée</h1>
      <p>Vous avez saisi ou suivi un lien vers une page qui n'existe pas.</p>
      <router-link
        v-slot="{navigate}"
        :to="{name: 'StartPage'}"
      >
        <DsfrButton
          label="Retour"
          @click="navigate()"
        />
      </router-link>
    </div>
  </div>
  <!-- <DsfrErrorPage
    :description="description"
    :buttons="buttons"
  /> -->
</template>
