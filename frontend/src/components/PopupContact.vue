<script lang="ts" setup>
const showModal = ref(false)

function onClose () {
  showModal.value = false
}
</script>

<template>
  <Teleport to="body">
    <DsfrModal
      title=""
      :opened="showModal"
      @close="onClose()"
    >
      <div class="modal">
        <div class="modal-content">
          <div class="fr-alert fr-alert--warning">
            <h3>
              <VIcon
                name="ri-arrow-right-line"
                scale="1.5"
              />
              Consignes pour l'envoi de mail
            </h3>
            <div class="flex justify-content">
              <p>
                Pour l'envoi d'un mail, vous devrez transmettre plusieurs informations dont des photos de l'arme. Assurez-vous d'une qualité optimale de celles-ci : <span class="font-bold">netteté, exposition, orientation, sans perspective.</span>  <br>
              </p>
            </div>
            <br><p>Envoyer les prises de vue suivante à votre mail :</p>
            <li><span class="font-bold">Une vue d'ensemble de l'arme côté gauche</span></li>
            <li><span class="font-bold">Une vue d'ensemble de l'arme côté droite</span></li>
            <li><span class="font-bold">Une ou plusieurs vue(s) rapprochée(s) avec les marquages / poinçon(s)</span></li>
            <li><span class="font-bold">Une photo du chargeur</span></li>
            <p>Décrivez aussi les marquages et autres informations visibles sur l'arme</p>
            <br>Cela facilite l'analyse pour <span class="font-bold">des résultats précis</span>. Merci pour votre attention à ces détails importants.
          </div>
        </div>
        <div>
          <SnackbarAlert class="text-center pt-3" />
        </div>
        <div class="small-blank" />
        <div class="modal-footer fr-col-11 fr-col-lg-6 footer-actions mx-auto">
          <DsfrButton
            class="confirm-button"
            icon="ri-checkbox-circle-line"
            label="Je confirme avoir pris connaissances des consignes"
            @click="showModal = false"
          />
        </div>
      </div>
    </DsfrModal>
  </Teleport>

  <div class="mt-5 mb-5">
    <a
      class="help"
      href="#"
      @click="showModal = true"
    >
      Consignes d'envoi de mail
      <VIcon
        name="ri-mail-line"
      />
    </a>
  </div>
</template>

<style scoped>

@media only screen and (max-width: 600px) {
  .confirm-button {
    font-size: 12px;
  }
}

</style>
