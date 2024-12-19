<script lang="ts" setup>
import { useRoute } from "vue-router";

const route = useRoute();
const errorStatus = route.query.status || 0o0;

const errorMessage = computed(() => {
  if (errorStatus == 429) {
    return {
      title: " - Trop de requêtes",
      description:
        "Il semblerait que vous ayez effectué plusieurs requêtes en quelques minutes. Veuillez réessayer plus tard.",
    };
  } else if (errorStatus == 500) {
    return {
      title: " - Erreur interne du serveur",
      description:
        "Une erreur interne lié au serveur est survenue. Veuillez réessayer plus tard.",
    };
  } else if (errorStatus == 401) {
    return {
      title: " - Non autorisé",
      description:
        "Vous n'êtes pas autorisé à accéder à cette page. Veuillez vous authentifier.",
    };
  } else if (errorStatus == 404) {
    return {
      title: " - Page non trouvée",
      description:
        "Vous avez saisi ou suivi un lien vers une page qui n'existe pas.",
    };
  } else {
    return {
      title: " - Erreur inconnue",
      description: "Une erreur est survenue. Veuillez réessayer plus tard.",
    };
  }
});
</script>

<template>
  <div class="fr-container">
    <div class="text-center relative top-1/6 <md:top-4 m-4">
      <DsfrErrorPage
        :title="'Erreur ' + errorStatus.concat('', errorMessage.title)"
        subtitle=""
        :description="errorMessage.description"
        help="Si vous êtes sur cette page, c'est que vous avez rencontré un problème. Réessayer plus tard et si le problème persiste, contactez-nous."
      />

      <p>
        Vous pouvez retourner vers la page d'accueil ou
        <strong
          ><router-link :to="{ name: 'ContactPage' }">
            nous contacter.
          </router-link></strong
        >
      </p>
      <router-link v-slot="{ navigate }" :to="{ name: 'StartPage' }">
        <DsfrButton
          icon="ri-home-4-line"
          label="Retour vers l'accueil"
          @click="navigate()"
        />
      </router-link>
    </div>
  </div>
</template>
