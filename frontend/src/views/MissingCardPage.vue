<template>
  <div class="fr-container my-5">
    <div class="fr-grid-row">
      <div class="fr-col">
        <div class="fr-alert fr-alert--error">
          <h3 class="fr-alert__title">
            Aucune carte détectée
          </h3>
          <p>Pour obtenir un résultat plus précis sur la catégorie légale de l’arme, <strong>nous vous invitons à reprendre la photo en ajoutant une carte à côté de l’arme</strong>.</p>
        </div>
      </div>
    </div>
    <div class="fr-grid-row">
      <div class="fr-col-6 fr-col-lg-3 mx-auto">
        <img
          src="@/assets/missing_card.png"
          alt=""
        >
      </div>
    </div>
  </div>
  <div class="footer">
    <div class="fr-grid-row">
      <div class="fr-col">
        <button
          class="fr-btn w-100 text-center"
          @click="$router.push({ name: 'InstructionsPage'})"
        >
          Reprendre la photo <span
            class="fr-icon-camera-fill mx-1"
            aria-hidden="true"
          />
        </button>
      </div>
    </div>
    <div class="fr-grid-row mt-1">
      <div class="fr-col">
        <button
          class="fr-btn w-100 text-center"
          @click="$router.push({ name: 'IdentificationTypologyResult'})"
        >
          Je souhaite tout de même poursuivre
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.text-center {
    justify-content: center;
}
img {
  width: 100%;
  margin-top: 5rem;
}
</style>
