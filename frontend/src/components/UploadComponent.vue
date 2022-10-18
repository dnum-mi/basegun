<template>
  <div>
    <div>
      <div>
        <div
          v-show="!store.isInstruction"
          class="centered text-center"
        >
          <img
            src="../assets/basegun.png"
            alt=""
          >
          <h1 class="accueil-title">
            Basegun <label class="fr-tag fr-tag--sm">beta</label>
          </h1>
          <p class="accueil-subtitle">
            Identification automatique des armes à feu
          </p>
          <UploadButton />
          <DsfrButton
            label="Demarrer"
            @click="showInstruction"
          />
        </div>
        
        <InstructionsModal v-show="store.isInstruction" />
        
        <div
          v-show="!store.isInstruction"
          class="footer-background footer-text"
        >
          Basegun est un outil d'aide à la décision. Il ne remplace en aucun cas l'avis d'un expert.
        </div>
      </div>
      <div />
    </div>
  </div>
</template>

<script>
     import { store } from '@/store/store.js';
    import UploadButton from '@/components/UploadButton.vue';
   import InstructionsModal from '@/components/InstructionsModal.vue'

    export default {
        name: 'UploadComponent',
        components: {
    UploadButton,
    InstructionsModal,
},

       

        data() {
            return {
                store,
            }
        },
        methods: {
          showInstruction () {
            store.isDisplay = false
            store.isInstruction = true
            console.log(store.isDisplay)
            
            },
            InstructionRead () {
                store.isInstruction = false
                store.instructionsRead = true
                store.isDisplay = false
                const demarrer = document.getElementById('demarrer')
                demarrer.firstChild.click()
            },
        },
    }
</script>

<style scoped>
  .centered {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 100%
  }

  .accueil-title {
    font-size: 28px;
    margin-top: -20px;
    margin-bottom: 0;
  }

  .accueil-subtitle {
    font-size: 14px;
  }

  .footer-background {
    position: fixed;
    top: 100%;
    left: 50%;
    transform: translate(-50%, -100%);
    background-color: #f5f5fe;
    width: 100%;
  }

  .footer-text {
    padding: 20px 10px;
    text-align: center;
  }
</style>
