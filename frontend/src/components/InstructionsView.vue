<template>
  <div class="container-alert  col-lg-6  col-xs-9  mx-auto">
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
    <div class="text-center">
      <p>{{ store.uploadMessage }}</p>
    </div>
    <div class="container-img  d-lg-flex">
      <div>
        <img
          src="../assets/good-photo-example.jpg"
          alt=""
          width="250px"
          height="140px"
          class="mx-2"
        >
        <p class="modal-img-text fr-text--xs">
          Exemple d'une bonne photo
        </p>
      </div>
      <div>
        <img
          src="../assets/bad-photo-exemple.jpeg"
          alt=""
          width="250px"
          height="140px"
          class="mx-2"
        >
        <p class="modal-img-text fr-text--xs">
          Exemple d'une mauvaise photo
        </p>
      </div>
    </div>
    <div class="btn-read-instruction text-center">
      <DsfrButton
        label="prendre la photo"
        icon="ri-camera-fill"
        @click="readInstruction"
      />
    </div>
  </div>
</template>

<script>
    import { store } from '@/store/store.js';

    export default {
        name: 'InstructionsView',
        components: {

        },
        data() {
            return {
                store,
                instructions: [
                "1 - Présenter le canon <b>&nbsp;vers la droite </b><br>",
                "2 - Ne photographier qu'une <b>&nbsp;seule &nbsp;</b> arme à la fois<br>",
                "3 - Placer l'arme <b>&nbsp;en entier&nbsp;</b> et au <b>&nbsp;centre&nbsp;</b> du cadre<br> ",
                ],
            }
        },
        methods: {
          readInstruction () {
            store.instructionsRead = true
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
  margin: 1em 1em 1em 1em;
}

@keyframes spin {
    from {
        transform:rotate(0deg);
    }
    to {
        transform:rotate(360deg);
    }
}


  .container-img {
    justify-content: center;
    text-align: center;
  }

  .img {
    margin: 1em;
  }

  .modal-img-text {
    font-style: italic;
  }

  .bold-highlight {
    font-weight: bold;
  }
</style>
