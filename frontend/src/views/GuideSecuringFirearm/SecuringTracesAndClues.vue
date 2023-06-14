
<template>
  <div class="mx-auto fr-col-11 fr-col-lg-6 flex justify-between">
    <div class="fr-container m-5">
      <router-link
        :to="{ name: 'StartPage' }"
      >
        <VIcon
          class="absolute right-3 fr-icon-home-3-line"
          name="ri-home-3-line"
          scale="1.2"
        />
      </router-link>
    </div>
  </div>
  <div class="fr-container">
    <div class="result fr-col-11 fr-col-lg-6 mt-12 mx-auto">
      <h4 class="mt-5">
        Mettre en sécurité mon arme
      </h4>
      <p class="warning font-600 text-center">
        Précaution avant la manipulation
      </p>
      <p>
        S’il s’agit d’une mise en sécurité dans le cadre d’une <span class="font-bold">enquête</span>, pensez à
        <span class="font-bold">mettre des gants</span> si possible afin de <span class="font-bold">ne pas compromettre
          les traces et indices</span>
        pouvant se trouver sur l’arme.
      </p>
    </div>
    <div class="fr-col-sm-6 fr-col-lg-8 mx-auto text-center">
      <img
        src="@/assets/guide-mise-en-securite/icones/gants-traces-et-indices.jpeg"
        alt="alt"
        class="img-deco"
      >
    </div>
  </div>
  <div class="footer">
    <div class="fr-col-11 fr-col-lg-6 mx-auto">
      <router-link
        v-slot="{navigate}"
        :to="{name: 'SecuringAchievement'}"
      >
        <DsfrButton
          class="flex justify-center w-full"
          label="Commencer"
          icon="ri-arrow-right-line"
          :icon-right="true"
          @click="navigate()"
        />
      </router-link>
      <router-link
        v-slot="{navigate}"
        :to="{name:'StartPage'}"
      >
        <DsfrButton
          class="mt-3 flex justify-center w-full"
          label="Retour au menu"
          icon="ri-arrow-go-back-fill"
          :icon-right="true"
          secondary
          @click="navigate()"
        />
      </router-link>
    </div>
  </div>
</template>

<style scoped>
.img-deco {
  margin-bottom: 1em;
  margin-top: 0;
  width: 75%;
}

.warning {
  color : var(--red-marianne-425-625)
}

:deep(.fr-icon-home-3-line) {
  color: #000091;
}
.footer {
  text-align: center;
}

</style>
