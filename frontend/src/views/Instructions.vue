<template>
  <div
    class="info container-alert  col-lg-6  col-xs-9  mx-auto"
  >
    <div class="fr-alert fr-alert--info">
      <h3 class="fr-alert__title">
        Pour un résultat optimal
      </h3>
      <span
        v-for="instruction in instructions"
        :key="instruction.id"
        class="m-auto-lg d-lg-flex flex-wrap"
        v-html="instruction"
      />
    </div>

    <div class="container-img  d-lg-flex">
      <div>
        <img
          src="../assets/good-photo-example.jpg"
          alt="photo d'une arme tournée vers la droite et centrée"
        >
        <p class="modal-img-text fr-text--xs">
          Exemple d'une bonne photo
        </p>
      </div>
      <div>
        <img
          src="../assets/bad-photo-example.jpg"
          alt="photo d'une arme tournée vers la gauche et partiellement coupée"
        >
        <p class="modal-img-text fr-text--xs">
          Exemple d'une mauvaise photo
        </p>
      </div>
    </div>
  </div>
  <div class="blank" />
  <div class="footer-background">
    <div
      v-if="!store.uploadMessage"
      class="btn-read-instruction text-center"
    >
      <div
        class="col-11 col-lg-6 footer-actions"
      >
        <UploadButton />
        <DsfrButton
          label="Prendre la photo"
          icon="ri-camera-fill"
          @click="readInstruction"
        />
      </div>
    </div>
    <div
      v-else
      class="text-center bold"
    >
      <p>{{ store.uploadMessage }}</p>
    </div>
  </div>
</template>

<script>
import UploadButton from '@/components/UploadButton.vue'
import { store } from '@/store.js'
export default {
  name: 'Instructions',
  components: {
    UploadButton,
  },
  data () {
    return {
      store,
      instructions: [
        '1 - Présenter le<b>&nbsp;canon vers la droite</b><br>',
        "2 - Ne photographier qu'<b>&nbsp;une seule &nbsp;</b>arme <br>",
        "3 - Placer l'arme<b>&nbsp;en entier&nbsp;</b> et <b>&nbsp;centrée&nbsp;</b> <br> ",
      ],
    }
  },

  methods: {
    readInstruction () {
      const demarrer = document.getElementById('demarrer')
      demarrer.firstChild.click()
    },
  },
}
</script>

<style scoped>
.fr-alert {
  margin-top: 9em;
}

.title {
  margin: 1em;
}

:deep(.fr-alert) {
margin: 1em;
}

.container-img {
  justify-content: center;
  text-align: center;
  padding: 0 0.5rem;
}

img {
  max-width: 100%;
  max-height: 200px;
  padding: 0 0.5rem;
}

.modal-img-text {
  font-style: italic;
}

</style>
