<template>
  <div class="container-alert">
    <div class="fr-alert fr-alert--info">
      <h3 class="fr-alert__title">
        Pour un résultat optimal
      </h3>
      <span 
        v-for="instruction in instructions"
        :key="instruction.id"
        class="read-instruction-wrapper"
        v-html="instruction"
      />
    </div>
     
    <div class="container-img">
      <div>
        <img
          src="../assets/good-photo-example.jpg"
          alt=""
          class="modal-img"
        >
        <p class="modal-img-text fr-text--xs">
          Exemple d'une bonne photo
        </p>
      </div>
      <div>
        <img
          src="../assets/bad-photo-exemple.jpeg"
          alt=""
          class="modal-img"
        >
        <p class="modal-img-text fr-text--xs">
          Exemple d'une mauvaise photo
        </p>
      </div>
      <DsfrButton
        class="button-read-instruction"
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
        name: 'InstructionsModal',
        components: {

        },
        data() {
            return {
                store,
                instructions: [
                "1 - Présenter le canon <b>&nbsp;vers la droite </b>",
                "2 - Ne photographier qu'une <b>&nbsp;seule &nbsp;</b> arme à la fois<br>",
                "3 - Placer l'arme <b>&nbsp;en entier&nbsp;</b> et au <b>&nbsp;centre&nbsp;</b> du cadre<br> ",
                ],
            }
        },
        methods: {
          readInstruction () {
            console.log(store)
            this.showPopin = false
            store.instructionsRead = true
            const demarrer = document.getElementById('demarrer')
            demarrer.firstChild.click()
          },
        },
    }
</script>

<style scoped>

.container-alert {
  margin: auto;
  width: 52%;
}

.fr-alert {
  margin-top: 9em;
}
.read-instruction-wrapper {
  display: flex;
  flex-wrap: wrap;
}

  .title {
    margin: 1em;
  }



@media (min-width:600px) {
  .modal-img {
    margin: 1em;
    height: 160px;
    text-align: center;
  }

}


@media screen and (min-width: 769px) {
  .modal-img {
    height: 140px;
    text-align: center;
  }
}

@media screen and (min-device-width: 481px) and (max-device-width: 768px) { 
  .modal-img {
    height: 100px;
    text-align: center;
  }



}

@media only screen and (max-device-width: 480px) {
  .modal-img {
    height: 7em;
    text-align: center;
  }

  .read-instruction-wrapper {
  margin: auto;
  display: flex;
  flex-wrap: wrap;
}

.container-alert {
  width: 100%;
}

:deep(.fr-alert) {
  margin: 1em 1em 1em 1em;
}

}



  .container-img {
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    text-align: center;

  }

  .img {
    margin: 1em;
  }

  .modal-img-text {
    /* text-align: center; */
    font-style: italic;
  }

  .bold-highlight {
    font-weight: bold;
  }
</style>
