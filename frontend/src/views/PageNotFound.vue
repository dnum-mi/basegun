<template>
  <div class="fr-container">
    <div class="text-center relative top-1/6 m-4">
      <h1>Page non trouvée</h1>
      <p>Vous avez saisi ou suivi un lien vers une page qui n'existe pas.</p>
      <router-link
        v-slot="{navigate}"
        :to="{name: 'Start'}"
      >
        <DsfrButton
          label="Retour"
          @click="navigate()"
        />
      </router-link>
    </div>
  </div>
</template>
