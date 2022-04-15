<template>
    <div>
        <div>
            <div>
                <HeaderMain />
                <div class="centered text-center">
                    <img src="../assets/basegun.png" alt="">
                    <h1 class="accueil-title">Basegun</h1>
                    <p class="accueil-subtitle">Identification automatique des armes à feu</p>
                    <UploadButton />
                    <InstructionsButton />
                    <div>
                        <p> {{ store.uploadMessage }} </p>
                    </div>
                </div>
                <div class="footer-background footer-text">
                    Basegun est un outil d'aide à la décision. Il ne remplace en aucun cas l'avis d'un expert.
                </div>
            </div>
            <div>
                <!-- Fenêtre de Modale Simple  -->
                <dialog aria-labelledby="fr-modal-title-modal-1" role="dialog" id="fr-modal-1" class="fr-modal">
                    <div class="fr-container fr-container--fluid fr-container-md">
                        <div class="fr-grid-row fr-grid-row--center">
                            <div class="fr-col-12 fr-col-md-8 fr-col-lg-6">
                                <div class="fr-modal__body">
                                    <div class="fr-modal__header">
                                        <button class="fr-btn--close fr-btn" title="Fermer la fenêtre modale" aria-controls="fr-modal-1" @click="closeModalAndLaunchInput">Fermer</button>
                                    </div>
                                    <div class="fr-modal__content">
                                        <h1 id="fr-modal-title-modal-1" class="fr-modal__title"><span class="fr-fi-arrow-right-line fr-fi--lg" aria-hidden="true"></span>Titre de la modale</h1>
                                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas varius tortor nibh, sit amet tempor nibh finibus et. Aenean eu enim justo. Vestibulum aliquam hendrerit molestie. Mauris malesuada nisi sit amet augue accumsan tincidunt. Maecenas tincidunt, velit ac porttitor pulvinar, tortor eros facilisis libero, vitae commodo nunc quam et ligula. Ut nec ipsum sapien. Interdum et malesuada fames ac ante ipsum primis in faucibus. Integer id nisi nec nulla luctus lacinia non eu turpis. Etiam in ex imperdiet justo tincidunt egestas. Ut porttitor urna ac augue cursus tincidunt sit amet sed orci.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </dialog>
            </div>
        </div>
    </div>
</template>

<script>
    import { store } from '@/store.js';
    import HeaderMain from '@/components/HeaderMain.vue';
    import UploadButton from '@/components/UploadButton.vue';
    import InstructionsButton from '@/components/InstructionsButton.vue'

    export default {
        name: 'UploadComponent',
        components: {
            HeaderMain,
            UploadButton,
            InstructionsButton
        },
        data() {
            return {
                store,
            }
        },
        methods: {
            closeModalAndLaunchInput() {
                store.instructionsRead = true
                const modal = document.getElementById('modal')
                modal.style.display = "none"
                const demarrer = document.getElementById('demarrer')
                demarrer.style.display = "block"
                demarrer.firstChild.click()
            }
        }
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
