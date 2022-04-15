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
                                <h1 id="fr-modal-title-modal-1" class="fr-modal__title"><span class="fr-fi-arrow-right-line fr-fi--lg" aria-hidden="true"></span>Titre de la modale</h1>
                                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas varius tortor nibh, sit amet tempor nibh finibus et. Aenean eu enim justo. Vestibulum aliquam hendrerit molestie. Mauris malesuada nisi sit amet augue accumsan tincidunt. Maecenas tincidunt, velit ac porttitor pulvinar, tortor eros facilisis libero, vitae commodo nunc quam et ligula. Ut nec ipsum sapien. Interdum et malesuada fames ac ante ipsum primis in faucibus. Integer id nisi nec nulla luctus lacinia non eu turpis. Etiam in ex imperdiet justo tincidunt egestas. Ut porttitor urna ac augue cursus tincidunt sit amet sed orci.</p>
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
    
</style>
