<template>
  <div class="centered text-center">
    <h2>
      Pour un résultat optimal
    </h2>
    <ul class="modal-ul">
      <li>1 - Ne photographier qu'<span class="bold-highlight">une seule</span> arme à la fois</li>
      <li>2 - Placer l'arme <span class="bold-highlight">en entier</span> et <span class="bold-highlight">au centre</span> du cadre</li>
      <li>3 - Présenter le canon <span class="bold-highlight">vers la droite</span></li>
    </ul>

    <div class="container-img">
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
      <div>
        <img
          src="../assets/good-photo-example.jpeg"
          alt=""
          class="modal-img"
        >
        <p class="modal-img-text fr-text--xs">
          Exemple d'une bonne photo
        </p>
      </div>
    </div>

    <DsfrButton
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
  .modal-ul {
    display: flex;
    justify-items:flex-start;
    flex-direction: column;
    flex-wrap: wrap;
    list-style: none;
    list-style-position: inside;
  }

  .modal-img {
    margin: 1em;
    height: 150px;
    text-align: center;
  }

  .container-img {
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    text-align: center;

  }

  .modal-img-text {
    /* text-align: center; */
    font-style: italic;
  }

  .bold-highlight {
    font-weight: bold;
  }
</style>
