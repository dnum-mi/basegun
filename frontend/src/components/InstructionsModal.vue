<template>
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
                                <h1 id="fr-modal-title-modal-1" class="fr-modal__title"><span class="fr-fi-arrow-right-line fr-fi--lg" aria-hidden="true"></span>Pour optimiser le résultat :</h1>
                                <ul class="modal-ul">
                                    <li>Ne photographier qu'une seule arme à la fois</li>
                                    <li>Placer l'arme en entier et au centre du cadre</li>
                                    <li>Présenter si possible le profil droit</li>
                                    <img src="../assets/good-photo-example.jpeg" alt="" class="modal-img">
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </dialog>
    </div>
</template>

<script>
    import { store } from '@/store.js';

    export default {
        name: 'InstructionsModal',
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
    .modal-ul {
        list-style-position: inside;
    }
    .modal-img {
        height: 150px;
    }
</style>
