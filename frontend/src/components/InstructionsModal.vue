<template>
  <div class="text-center">
    <h2 class="title text-center">
      Pour un résultat optimal
    </h2>
    <div class="read-instruction-wrapper">
      <DsfrCallout
        v-for="instruction in instructions"
        :key="instruction.id"
        :title="instruction.step"
        :content="instruction.description"
      />
    <!-- <span>1 - Ne photographier qu'<span class="bold-highlight">une seule</span> arme à la fois</span>
      <span>2 - Placer l'arme <span class="bold-highlight">en entier</span> et <span class="bold-highlight">au centre</span> du cadre</span>
      <span>3 - Présenter le canon <span class="bold-highlight">vers la droite</span></span> -->
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
    </div>

    <DsfrButton
      class="button-read-instruction"
      label="prendre la photo"
      icon="ri-camera-fill"
      @click="readInstruction"
    />
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
                  {
                    step: "Etape 1",
                    description: "Ne photographier qu'une seule arme à la fois",
                    
                  },
                  {
                    step: "Etape 2",
                    description: "Placer l'arme en entier et au centre du cadre",
                    
                  },
                  {
                    step: "Etape 3",
                    description: "Présenter le canon vers la droite",
                  },
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

.read-instruction-wrapper {
  margin: 0 20em 0 20em;
}

  :deep(.fr-callout) {
    padding: 0;
    display: flex;
    justify-content: center;
    flex-direction: column;
    flex-wrap: wrap;
  }

  :deep(.fr-callout__text) {
    font-size: 1rem;
  }

  :deep(.fr-callout__title) {
    font-size:1rem;
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
  .read-instruction-wrapper {
  margin: 0 20% 0 20%;
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
  .read-instruction-wrapper {
  margin: 5%
}

}

@media only screen and (max-device-width: 480px) {
  .modal-img {
    height: 7em;
    text-align: center;
  }
  .read-instruction-wrapper {
  margin: 2%;
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
