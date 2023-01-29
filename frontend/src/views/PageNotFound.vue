<template>
  <div class="fr-container">
    <div class="centered text-center m-4">
      <h1>Page non trouvée</h1>
      <p>Vous avez saisi ou suivi un lien vers une page qui n'existe pas.</p>
      <router-link
        v-slot="{navigate}"
        :to="{name: 'Home'}"
      >
        <DsfrButton
          label="Retour"
          @click="navigate()"
        />
      </router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: 'PageNotFound',
}
</script>
