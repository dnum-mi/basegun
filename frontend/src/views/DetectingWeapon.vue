<template>
  <div class="fr-container">
    <div class="flex justify-content-center">
      <!-- TODO Deplacer <resultComponent v-if"UploadImg"/> -->
      <!-- TODO Créer  un composant Info et consigne de sécurité v-if"SeeToTutorial"/> -->
      <!--Afficher le composant des etapes si les consigne de sécurité on été lu et accepter
 <--Afficher de nouveau resultComponent avec cette fois l'information si arme factice ou pas-->
    </div>

    <div
      class="d-md-none bg-transparent fixed-bottom"
    >
      <div class="wrapper-btn">
        <DsfrButton
          class="m-1  flex justify-content-center"
          label="Reprendre une photo"
        />
        <DsfrButton
          class="m-1  flex justify-content-center"
          label="Commencer"
        />
        <DsfrButton
          class="m-1  flex justify-content-center"
          label="Refaire le tutoriel"
          secondary
        />

        <DsfrButton
          class="m-1  flex  justify-content-center"
          label="Retourner au résultat"
          secondary
        />
        <DsfrButton
          class="m-1  flex  justify-content-center"
          label="Retourner à l'étape précédente"
          secondary
        />
      </div>
    </div>
  </div>
</template>

<style>

.fr-link--close {
  visibility: hidden;
}

/* .fr-container {
  box-shadow: -1px -2px 10px 0px rgba(0,0,0,0.75);
} */

.wrapper-btn {
  margin: 0.8em;
  padding: 0;
  display: flex;
  justify-content: center;
  flex-direction: column;
}

</style>