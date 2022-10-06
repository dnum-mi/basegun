<template>
  <div>
    <!--Bouton d'ouverture de la modale-->
    <div id="modal">
      <button
        class="fr-btn"
        data-fr-opened="false"
        aria-controls="fr-modal-2"
      >
        Démarrer
      </button>
    </div>
  </div>
</template>

<script>

    export default {
        name: 'InstructionsButton',
    }
</script>