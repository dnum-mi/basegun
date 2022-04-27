<template>
    <div>
        <!-- Modale avec zone d'action  -->
        <dialog aria-labelledby="fr-modal-2-title" id="fr-modal-2" class="fr-modal" role="dialog" >
            <div class="fr-container fr-container--fluid fr-container-md">
                <div class="fr-grid-row fr-grid-row--center">
                    <div class="fr-col-12 fr-col-md-8 fr-col-lg-6">
                        <div class="fr-modal__body">
                            <div class="fr-modal__content">
                                <h1 id="fr-modal-2-title" class="fr-modal__title mt-3">
                                    <span class="fr-fi-arrow-right-line fr-fi--lg" aria-hidden="true"></span>
                                    Pour un résultat optimal :
                                </h1>
                                <ul class="modal-ul">
                                    <li>Ne photographier qu'<span class="bold-highlight">une seule</span> arme à la fois</li>
                                    <li>Placer l'arme <span class="bold-highlight">en entier</span> et <span class="bold-highlight">au centre</span> du cadre</li>
                                    <li>Présenter si possible le canon <span class="bold-highlight">vers la droite</span></li>
                                </ul>
                                <img src="../assets/good-photo-example.jpeg" alt="" class="modal-img">
                                <p class="modal-img-text fr-text--xs">Exemple d'une bonne photo</p>
                            </div>
                            <div class="fr-modal__footer">
                                <ul class="fr-btns-group fr-btns-group--right fr-btns-group--inline-reverse fr-btns-group--inline-lg fr-btns-group--icon-left">
                                    <li>
                                        <button class="fr-btn fr-fi-checkbox-line fr-btn--secondary" aria-controls="fr-modal-2" @click="closeModalAndLaunchInput">
                                            Fermer
                                        </button>
                                    </li>
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
