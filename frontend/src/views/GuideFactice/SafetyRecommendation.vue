<template>
  <div>
    <h2>
      Vérifier si une arme est factice
    </h2>

    <p>
      Vous allez recevoir des instructions pour extraire des munitions de l’arme.
    </p>

    <DsfrAlert
      title="Attention"
      type="warning"
      description="Une arme doit toujours être considérée comme chargée.
      En cas de doute, s’arrêter et faire appel à un expert.
      Avant de manipuler une arme, toujours s’assurer qu’elle est mise en sécurité.
      Veiller à la préservation des traces et indices éventuels lors des manipulations."
    />

    <RouterLink
      v-slot="{ href, navigate }"
      to="/guide-factice"
      custom
    >
      <DsfrButton
        :href="href"
        class="m-1  flex justify-content-center"
        label="Commencer"
        @click="navigate"
      />
    </RouterLink>

    <RouterLink
      v-slot="{ href, navigate }"
      to="/resultat"
      custom
    >
      <DsfrButton
        :href="href"
        class="m-1  flex justify-content-center"
        label="Retour au resultat"
        secondary
        @click="navigate"
      />
    </RouterLink>
  </div>
</template>