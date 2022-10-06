<template>
  <div>
    <DsfrButton
      label="Demarrer"
      @click="showModal"
    />
    <BaseModal
      :is-opened="showPopin"
      title="Pour un résultat optimale:"
      @cancel="cancelAction()"
    >
      <template #content>
        <ul class="modal-ul">
          <li>Ne photographier qu'<span class="bold-highlight">une seule</span> arme à la fois</li>
          <li>Placer l'arme <span class="bold-highlight">en entier</span> et <span class="bold-highlight">au centre</span> du cadre</li>
          <li>Présenter si possible le canon <span class="bold-highlight">vers la droite</span></li>
        </ul>
        <img
          src="../assets/good-photo-example.jpeg"
          alt=""
          class="modal-img"
        >
        <p class="modal-img-text fr-text--xs">
          Exemple d'une bonne photo
        </p>
      </template>
    </BaseModal>
  </div>
</template>

<script>
    import { store } from '@/store/store.js';

    import BaseModal from '@/components/BaseModal.vue'

    export default {
        name: 'InstructionsModal',
        components: {
            BaseModal,
        },
        data() {
            return {
                store,
                showPopin: false,
            }
        },
        methods: {
            showModal () {
                this.showPopin = true
            },
            cancelAction () {
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
        list-style-position: inside;
    }
    .modal-img {
        height: 150px;
        text-align: center;
        margin: 0 auto;
        display: flex;
    }
    .modal-img-text {
        text-align: center;
        font-style: italic;
    }
    .bold-highlight {
        font-weight: bold;
    }
</style>
